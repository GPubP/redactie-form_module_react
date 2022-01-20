import { BaseMultiEntityFacade } from '@redactie/utils';

import { formsApiService, FormsApiService } from '../../services/forms';

import { FormsQuery } from './forms.query';
import { FormsStore } from './forms.store';

import { formsQuery, formsStore } from '.';

export class FormsFacade extends BaseMultiEntityFacade<FormsStore, FormsApiService, FormsQuery> {
	/**
	 * API integration
	 */
	public async getForms(key: string, query: string, reload = false): Promise<void> {
		const oldValue = this.query.getItem(key);

		if (!reload && oldValue) {
			return;
		}

		reload && oldValue ? this.store.setItemIsFetching(key, true) : this.store.addItem(key);

		return this.service
			.getForms(query)
			.then(response => {
				if (response) {
					this.store.setItemValue(key, response._embedded);
				}
			})
			.catch(error => {
				this.store.setItemError(key, error);
			})
			.finally(() => {
				this.store.setItemIsFetching(key, false);
			});
	}
}

export const formsFacade = new FormsFacade(formsStore, formsApiService, formsQuery);
