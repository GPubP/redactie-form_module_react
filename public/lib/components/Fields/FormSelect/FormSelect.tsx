import { Autocomplete } from '@acpaas-ui/react-components';
import { Tooltip } from '@acpaas-ui/react-editorial-components';
import { InputFieldProps } from '@redactie/form-renderer-module';
import { DataLoader } from '@redactie/utils';
import classNames from 'classnames';
import { getIn } from 'formik';
import debounce from 'lodash.debounce';
import React, { FC, ReactElement, useCallback, useMemo, useRef, useState } from 'react';
import { first } from 'rxjs/operators';

import formRendererConnector from '../../../connectors/formRenderer';
import { FormModel, formsFacade } from '../../../store/forms';

import { FORM_SELECT_TOOLTIP_DELAY, FORM_SELECT_TOOLTIP_TYPE } from './FormSelect.const';

const FormSelect: FC<InputFieldProps> = ({ fieldSchema, fieldProps, fieldHelperProps }) => {
	const config = fieldSchema.config || {};
	const { field, form } = fieldProps;

	const touch = getIn(form.touched, field.name);
	const error = getIn(form.errors, field.name);

	const state = !!error && !!touch ? 'error' : '';
	const autoCompleteRef = useRef(null);
	const [isVisible, setVisibility] = useState(false);
	const [isHoveringTooltip, setHoveringTooltip] = useState(false);
	const [delayShowLoop, setDelayShowLoop] = useState<NodeJS.Timeout>();
	const [delayHideLoop, setDelayHideLoop] = useState<NodeJS.Timeout>();
	const keyInteraction = useRef<boolean>(false);
	const [items, setItems] = useState<any[]>([]);
	const currentItem = useMemo(() => {
		const item = items.find(i => i.value === field.value);

		return item;
	}, [field.value, items]);
	const debouncedGetItems = debounce(async (query, cb) => {
		await formsFacade.getForms(`search_${fieldSchema.name}`, query);

		formsFacade
			.selectItemValue(`search_${fieldSchema.name}`)
			.pipe(first())
			.subscribe(forms => {
				const newItems = ((forms as FormModel[]) || []).map(form => ({
					id: form.id,
					slug: form.slug,
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

	const setContentValue = (uuid: string): void => {
		keyInteraction.current = false;

		const item = items.find(item => item.value === uuid);

		if (item) {
			return fieldHelperProps.setValue(item.id);
		}
	};

	/**
	 * Render
	 */

	const renderFormFields = (): ReactElement | null => {
		return (
			<>
				<div
					ref={autoCompleteRef}
					className={classNames('a-input', 'a-form-select-input')}
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
						defaultValue={field.value}
						showSearchIcon={true}
						disabled={!!config.disabled}
						// loading={contentLoadingState === LoadingState.Loading}
						onSelection={setContentValue}
						asyncItems={(query: string, cb: (options: any[]) => void) => {
							debouncedGetItems(query, cb);
						}}
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

	return <DataLoader loadingState={true} render={renderFormFields} />;
};

export default FormSelect;
