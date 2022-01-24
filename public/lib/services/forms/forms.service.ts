import { apiService, parseSearchParams } from '../api';
import { FORMS_PREFIX_URL, SITE_FORMS_PREFIX_URL } from '../api/api.service.const';

import { FormsResponse } from './forms.service.types';

export class FormsApiService {
	public async getForms(query: string, siteId: string): Promise<FormsResponse> {
		const path = siteId
			? `${SITE_FORMS_PREFIX_URL}/${siteId}/forms`
			: `${FORMS_PREFIX_URL}/forms`;

		return apiService
			.get(path, {
				searchParams: parseSearchParams({ q: query }),
			})
			.json<FormsResponse>();
	}
}

export const formsApiService = new FormsApiService();
