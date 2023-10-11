import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

i18next
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		defaultNS: 'common',
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false, // not needed for react!!
			formatSeparator: ',',
		},
		keySeparator: false, // we use content as keys
		ns: ['common'],
		parseMissingKeyHandler: (key: string) => {
			return process.env.NODE_ENV === 'development' ? '#' + key + '#' : key;
		},
		react: {
			useSuspense: false,
		},
		resources: {
			en: {
				todo: {
					completed: 'Completed',
					id: 'Todo ID',
					title: 'Title',
					user_id: 'User ID',
				},
				common: {
					broken: 'Broken',
					eng: 'English',
					example: 'Example',
					fatal_error: 'Fatal error',
					fin: 'Finnish',
					hello: 'Hello',
					home: 'Home',
					login: 'Login',
					logout: 'Logout',
					no: 'No',
					secret: 'Secret',
					sve: 'Swedish',
					world: 'world',
					yes: 'Yes',
				},
			},
			fi: {
				todo: {
					completed: 'Valmis',
					id: 'Lista ID',
					title: 'Otsikko',
					user_id: 'Käyttäjä ID',
				},
				common: {
					broken: 'Rikki',
					eng: 'Englanti',
					example: 'Esimerkki',
					fatal_error: 'Vakava virhe',
					fin: 'Suomi',
					hello: 'Hei',
					home: 'Koti',
					login: 'Kirjaudu sisään',
					logout: 'Kirjaudu ulos',
					no: 'Ei',
					secret: 'Salainen',
					sve: 'Ruotsi',
					world: 'maailma',
					yes: 'Kyllä',
				},
			},
			sv: {
				todo: {
					completed: 'Avslutad',
					id: 'Lista ID',
					title: 'Titel',
					user_id: 'Användar ID',
				},
				common: {
					broken: 'Bruten',
					eng: 'Engelska',
					example: 'Exempel',
					fatal_error: 'Allvarligt fel',
					fin: 'Finska',
					hello: 'Hej',
					home: 'Hem',
					login: 'Anmelden',
					logout: 'Abmelden',
					no: 'Nej',
					secret: 'Memlighet',
					sve: 'Svenska',
					world: 'världen',
					yes: 'Ja',
				},
			},
		},
	});
