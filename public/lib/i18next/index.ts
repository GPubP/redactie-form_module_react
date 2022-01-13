import translations from '../../assets/i18n/locales/template.json';
import translationsConnector from '../connectors/translations';

export const registerTranslations = (): void => {
	// TODO: change the module name
	translationsConnector.modules.addTranslation('boilerplate', 'nl', translations);
};
