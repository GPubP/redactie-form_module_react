import { I18NextTranslations } from '@redactie/translations-module';

import translationsConnector from '../connectors/translations';

const tKey = translationsConnector.core.tKey;

// TODO: Place all your copy here
const MODULE_TRANSLATIONS = Object.freeze<I18NextTranslations>({
	HELLOWORLD_TITLE: tKey('BOILERPLATE_HELLOWORLD_TITLE', 'Hello World!'),
});

export { MODULE_TRANSLATIONS };
