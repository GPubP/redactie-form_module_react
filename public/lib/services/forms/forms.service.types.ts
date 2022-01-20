/**
 * Response types
 */

export interface FormsResponse {
	_embedded: {
		resourceList: FormResponse[];
	};
}

export interface FormResponse {
	apps: string[];
	createdAt: string;
	createdBy: string;
	hasDraftChanges: boolean;
	id: string;
	identifier: string;
	name: string;
	online: boolean;
	publishedAt: string;
	publishedBy: string;
	status: string;
	tags: string[];
	updatedAt: string;
	updatedBy: string;
}
