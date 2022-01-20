import { apiService, parseSearchParams } from '../api';

import { FormsResponse } from './forms.service.types';

export class FormsApiService {
	public async getForms(query: string): Promise<FormsResponse> {
		return await apiService
			.get('form', {
				searchParams: parseSearchParams({ query }),
			})
			.json<FormsResponse>();
	}
}

export const formsApiService = new FormsApiService();
