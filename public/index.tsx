import { FormSelect } from './lib/components';
import formRendererConnector from './lib/connectors/formRenderer';

formRendererConnector.api.fieldRegistry.add([
	{
		name: 'formsReference',
		module: 'forms',
		component: FormSelect,
	},
]);
