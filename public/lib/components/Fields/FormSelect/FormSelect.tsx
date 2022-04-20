import { Autocomplete } from '@acpaas-ui/react-components';
import { Tooltip } from '@acpaas-ui/react-editorial-components';
import { LoadingState, useSiteContext } from '@redactie/utils';
import classNames from 'classnames';
import { getIn } from 'formik';
import debounce from 'lodash.debounce';
import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { first } from 'rxjs/operators';

import formRendererConnector from '../../../connectors/formRenderer';
import { useForms } from '../../../hooks';
import { FormModel, formsFacade } from '../../../store/forms';

import { FORM_SELECT_TOOLTIP_DELAY, FORM_SELECT_TOOLTIP_TYPE } from './FormSelect.const';
import styles from './FormSelect.module.scss';
import { FormSelectFieldProps } from './FormSelect.types';

const cx = classNames.bind(styles);

const FormSelect: FC<FormSelectFieldProps> = ({ fieldSchema, fieldProps, fieldHelperProps }) => {
	const config = fieldSchema.config || {};
	const { field, form } = fieldProps;

	const touch = getIn(form.touched, field.name);
	const error = getIn(form.errors, field.name);

	const { siteId } = useSiteContext();
	const state = !!error && !!touch ? 'error' : '';
	const autoCompleteRef = useRef(null);
	const [isVisible, setVisibility] = useState(false);
	const [formsLoadingState] = useForms(`search_${fieldSchema.name}`);
	const [isHoveringTooltip, setHoveringTooltip] = useState(false);
	const [delayShowLoop, setDelayShowLoop] = useState<NodeJS.Timeout>();
	const [delayHideLoop, setDelayHideLoop] = useState<NodeJS.Timeout>();
	const keyInteraction = useRef<boolean>(false);
	const [items, setItems] = useState<{ label: string; value: string }[]>([]);
	const [prevQuery, setPrevQuery] = useState('');
	const currentItem = useMemo(() => {
		const item = items.find(i => i.value === field.value?.identifier);

		if (item && item?.label !== prevQuery) {
			setPrevQuery(item?.label || '');
		}

		return item;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [field.value, items]);

	const debouncedGetItems = debounce(async (query, cb) => {
		await formsFacade.getForms(`search_${fieldSchema.name}`, query, siteId, true);

		formsFacade
			.selectItemValue(`search_${fieldSchema.name}`)
			.pipe(first())
			.subscribe(forms => {
				const newItems = ((forms as FormModel[]) || []).map(form => ({
					label: form.name,
					value: form.identifier,
				}));

				setItems(newItems);

				cb(newItems);
			});
	}, 500);

	const FormRendererFieldTitle = formRendererConnector.api.FormRendererFieldTitle;
	const ErrorMessage = formRendererConnector.api.ErrorMessage;

	/**
	 * Hooks
	 */

	// Fetch forms and set initial value

	/**
	 * Methods
	 */
	const handleMouseEnter = (): void => {
		if (delayHideLoop) {
			clearTimeout(delayHideLoop);
		}
		setDelayShowLoop(
			setTimeout(() => {
				setVisibility(true);
			}, FORM_SELECT_TOOLTIP_DELAY)
		);
	};

	const handleMouseLeave = useCallback(() => {
		if (delayShowLoop) {
			clearTimeout(delayShowLoop);
		}
		setDelayHideLoop(
			setTimeout(() => {
				!isHoveringTooltip && setVisibility(false);
			}, FORM_SELECT_TOOLTIP_DELAY)
		);
	}, [delayShowLoop, isHoveringTooltip]);

	const handleTooltipMouseEnter = (): void => {
		if (isHoveringTooltip) return;

		setHoveringTooltip(true);
	};

	const handleTooltipMouseLeave = (): void => {
		setDelayHideLoop(
			setTimeout(() => {
				setVisibility(false);
				setHoveringTooltip(false);
			}, FORM_SELECT_TOOLTIP_DELAY)
		);
	};

	const handleKeyDown = (): void => {
		keyInteraction.current = true;
	};

	const setFormValue = (uuid: string): void => {
		keyInteraction.current = false;

		const item = items.find(item => item.value === uuid);

		fieldHelperProps.setValue({
			identifier: item?.value,
		});
	};

	const getItems = (query: string, cb: (options: any[]) => void): void => {
		if (currentItem && query !== currentItem?.label && query !== currentItem?.value) {
			setFormValue('');
		}

		if (currentItem && query === prevQuery) {
			debouncedGetItems(currentItem.value, cb);
			return;
		}

		setPrevQuery(query);
		debouncedGetItems(query, cb);
	};

	/**
	 * Render
	 */

	return (
		<>
			<div
				ref={autoCompleteRef}
				className={cx('a-input', 'a-form-select-input')}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onKeyDown={handleKeyDown}
			>
				<FormRendererFieldTitle isRequired={!!fieldSchema.config?.required}>
					{fieldSchema?.label}
				</FormRendererFieldTitle>
				<Autocomplete
					ref={autoCompleteRef}
					id={fieldSchema.name}
					state={state}
					multipleSelect={false}
					defaultValue={field.value?.identifier}
					showSearchIcon={true}
					disabled={!!config.disabled}
					loading={formsLoadingState === LoadingState.Loading}
					onSelection={setFormValue}
					asyncItems={getItems}
				/>
			</div>
			<Tooltip
				type={FORM_SELECT_TOOLTIP_TYPE}
				isVisible={!!currentItem?.label && (isVisible || isHoveringTooltip)}
				targetRef={autoCompleteRef}
				onMouseEnter={handleTooltipMouseEnter}
				onMouseLeave={handleTooltipMouseLeave}
			>
				{currentItem?.label}
			</Tooltip>
			{config.description ? (
				<div className="a-input a-input__wrapper">
					<small>{config.description}</small>
				</div>
			) : null}
			<ErrorMessage name={field.name} />
		</>
	);
};

export default FormSelect;
