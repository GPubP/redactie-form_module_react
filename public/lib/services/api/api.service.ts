import Core from '@redactie/redactie-core';
import ky from 'ky';
import { stringify } from 'query-string';

import { FORM_REQUEST_PREFIX_URL } from './api.service.const';
import { SearchParams } from './api.service.types';

export type KyInstance = typeof ky;

const CoreConfig = Core.config.getValue('core') || {};

// Create ky instance with defaults
const api: KyInstance = ky.create({
	prefixUrl: FORM_REQUEST_PREFIX_URL,
	timeout: false,
	headers: {
		'x-tenant-id': CoreConfig.tenantId,
	},
});

export const parseSearchParams = <Params = SearchParams>(searchParams: Params): string => {
	return stringify(searchParams, { arrayFormat: 'comma', skipNull: true, skipEmptyString: true });
};

export default api;
