import { FC } from 'react';

import formRendererConnector from '../../connectors/formRenderer';

import { FormSelect } from './FormSelect';
export * from './FormSelect';

formRendererConnector.api.fieldRegistry.add([
	{
		name: 'formReference',
		module: 'form',
		component: FormSelect as FC<any>,
	},
]);
