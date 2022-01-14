import { apiService, parseSearchParams } from '../api';
import { FORMS_REQUEST_PREFIX_URL } from '../api/api.service.const';

import { FormsResponse } from './forms.service.types';

export class FormsApiService {
	public async getForms(query: string): Promise<FormsResponse> {
		return await apiService
			.get(FORMS_REQUEST_PREFIX_URL, {
				searchParams: parseSearchParams({ query }),
			})
			.json<FormsResponse>();
	}
}

export const formsApiService = new FormsApiService();
