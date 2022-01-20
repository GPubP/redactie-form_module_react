import { StoreConfig } from '@datorama/akita';
import { BaseMultiEntityStore } from '@redactie/utils';

import { FormsState } from './forms.model';

@StoreConfig({ name: 'forms', idKey: 'id', resettable: true })
export class FormsStore extends BaseMultiEntityStore<FormsState> {
	constructor(initialState: Partial<FormsState>) {
		super(initialState);
	}
}

export const formsStore = new FormsStore({});
