import { BaseMultiEntityQuery } from '@redactie/utils';

import { FormsState } from './forms.model';
import { formsStore } from './forms.store';

export class FormsQuery extends BaseMultiEntityQuery<FormsState> {
	public forms$ = this.selectAll();
}

export const formsQuery = new FormsQuery(formsStore);
