import { LoadingState, useObservable } from '@redactie/utils';
import { useMemo } from 'react';

import { FormModel, formsFacade } from '../../store/forms';

const useForms = (key: string): [LoadingState, FormModel[]] => {
	const isFetching$ = useMemo(() => formsFacade.selectItemIsFetching(key), [key]);
	const forms$ = useMemo(() => formsFacade.selectItemValue(key), [key]);
	const error$ = useMemo(() => formsFacade.selectItemError(key), [key]);

	const loading = useObservable(isFetching$, LoadingState.Loading);
	const forms = useObservable(forms$, []);
	const error = useObservable(error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, forms as FormModel[]];
};

export default useForms;
