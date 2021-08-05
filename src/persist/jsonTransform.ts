import {createTransform, Transform} from 'redux-persist';

function toJson({logger}: {logger?: Console | undefined} = {}) {
	return (data: any): any => {
		if (Array.isArray(data)) {
			return data.map(toJson({logger}));
		} else if (typeof data === 'object') {
			// check direct types
			if (data instanceof Date) {
				logger?.debug('jsonConvert: date to JSON {$date}');
				return {$date: (data as Date).getTime()};
			}
			// check object key/valus
			for (const key in data) {
				if (Array.isArray(data[key])) {
					data[key].map(toJson({logger}));
				} else {
					data[key] = toJson({logger})(data[key]);
				}
			}
		}
		return data;
	};
}

function fromJson({logger}: {logger?: Console | undefined} = {}) {
	return (data: any): any => {
		if (Array.isArray(data)) {
			return data.map(fromJson({logger}));
		} else if (typeof data === 'object') {
			// check direct types
			if (data.hasOwnProperty('$date')) {
				logger?.debug('jsonConvert: date from JSON {$date}');
				return new Date(data.$date);
			}
			// check object key/valus
			for (const key in data) {
				if (Array.isArray(data[key])) {
					data[key].map(fromJson({logger}));
				} else {
					data[key] = fromJson({logger})(data[key]);
				}
			}
		}
		return data;
	};
}


/**
 * this persist tranform change Date => {$date: number} on store and back {$date: number} => Date on load
 */
const jsonConvert: <K = any>(props: {logger?: Console}) => Transform<K, K, K, K> = ({logger} = {}) =>
	createTransform(
		// transform state on its way to being serialized and persisted.
		(inboundState: any, key) => {
			const converted = toJson({logger})(inboundState);
			return {...converted};
		},
		// transform state being rehydrated
		(outboundState: any, key) => {
			const converted = fromJson({logger})(outboundState);
			return {...converted};
		},
		{blacklist: ['_persist']},
	);

export default jsonConvert;
