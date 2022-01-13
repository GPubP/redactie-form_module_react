import Core from '@redactie/redactie-core';

import { HelloWorld } from './views/HelloWorld';

Core.routes.register({
	path: '/demo',
	component: HelloWorld,
	navigation: {
		label: 'Demo',
	},
});
