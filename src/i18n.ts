import * as i18n from 'i18next';
import * as LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).init({
	defaultNS: 'translation',
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false, // not needed for react!!
		formatSeparator: ',',
	},
	keySeparator: false, // we use content as keys
	ns: ['translation'],
	react: {
		wait: true,
	},
	resources: {
		en: {
			translation: {
				broken: 'Broken',
				eng: 'English',
				fatal_error: 'Fatal error',
				fin: 'Finnish',
				hello: 'Hello',
				home: 'Home',
				login: 'Login',
				logout: 'Logout',
				secret: 'Secret',
				sve: 'Swedish',
				world: 'world',
			},
		},
		fi: {
			translation: {
				broken: 'Rikki',
				eng: 'Englanti',
				fatal_error: 'Vakava virhe',
				fin: 'Suomi',
				hello: 'Hei',
				home: 'Koti',
				login: 'Kirjaudu sisään',
				logout: 'Kirjaudu ulos',
				secret: 'Salainen',
				sve: 'Ruotsi',
				world: 'maailma',
			},
		},
		sv: {
			translation: {
				broken: 'Bruten',
				eng: 'Engelska',
				fatal_error: 'Allvarligt fel',
				fin: 'Finska',
				hello: 'Hej',
				home: 'Hem',
				login: 'Anmelden',
				logout: 'Abmelden',
				secret: 'Memlighet',
				sve: 'Svenska',
				world: 'världen',
			},
		},
	},
});
export default i18n;