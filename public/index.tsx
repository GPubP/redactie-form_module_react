import { FC } from 'react';

import { FormSelect } from './lib/components';
import formRendererConnector from './lib/connectors/formRenderer';

formRendererConnector.api.fieldRegistry.add([
	{
		name: 'formReference',
		module: 'form',
		component: FormSelect as FC<any>,
	},
]);
