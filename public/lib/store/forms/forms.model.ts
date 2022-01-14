import { BaseMultiEntityState } from '@redactie/utils';

import { FormResponse } from '../../services/forms';

export type FormModel = FormResponse;

export type FormsState = BaseMultiEntityState<FormModel[] | null, string>;
