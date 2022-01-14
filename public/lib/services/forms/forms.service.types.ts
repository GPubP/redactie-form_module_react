/**
 * Response types
 */

export interface FormsResponse {
	_embedded: FormResponse[];
}

export interface FormResponse {
	id: string;
	slug: string;
}
