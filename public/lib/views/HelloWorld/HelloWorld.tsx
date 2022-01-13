import React, { ReactElement } from 'react';

import translationsConnector from '../../connectors/translations';
import { MODULE_TRANSLATIONS } from '../../i18next/translations.const';

const HelloWorld = (): ReactElement => {
	const [t] = translationsConnector.useModuleTranslation();
	return <h1>{t(MODULE_TRANSLATIONS.HELLOWORLD_TITLE)}</h1>;
};

export default HelloWorld;
