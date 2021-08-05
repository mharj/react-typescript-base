import {createTransform, Transform} from 'redux-persist';
import Joi from 'joi';

/**
 * validate redux states structure with Joi when persis loads data.
 */
function createValidationTransform<K = object>(builder: Record<Extract<keyof K, string>, Joi.AnySchema | undefined>, {logger, isFatal}: {logger?: Console; isFatal?: boolean} = {}): Transform<K, K, K, K> {
	return createTransform(
		// transform state on its way to being serialized and persisted.
		(inboundState: any, key) => {
			const validator = builder[key] as Joi.AnySchema | undefined;
			if (logger && validator) {
				const {error} = validator.validate(inboundState, {});
				if (error) {
					logger.error(`validationTransform: Joi persist state validate failed  key "${key}"`, error);
				}
			}
			return {...inboundState};
		},
		// transform state being rehydrated
		(outboundState: any, key) => {
			const validator = builder[key] as Joi.AnySchema | undefined;
			if (validator && Object.keys(outboundState).length !== 0) {
				const {error} = validator.validate(outboundState, {});
				if (error) {
					if (logger) {
						logger.error(`validationTransform: Joi rehydrated state failed key "${key}"`, error);
					}
					if (isFatal) {
						return {};
					}
				} else {
					if (logger) {
						logger.debug('validationTransform: Joi rehydrated state', key);
					}
				}
			}
			return {...outboundState};
		},
		{blacklist: ['_persist']},
	);
}

export default createValidationTransform;
