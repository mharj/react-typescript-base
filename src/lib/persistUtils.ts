import {Action, Reducer} from 'redux';
import {PersistedState, PersistMigrate} from 'redux-persist';

export type NamedReducerConfig<T extends string, S, A extends Action = Action> = {
	initialState: Record<T, S>;
	reducer: Record<T, Reducer<S, A>>;
};

export const migrateInit: (initialState: PersistedState) => PersistMigrate = (initialState) => {
	return (state, version) => {
		return state?._persist.version === version ? Promise.resolve(state) : Promise.resolve(initialState);
	};
};

export function buildReduceConfig<T extends string, S, A extends Action = Action>(key: T, state: S, reducer: Reducer<S, A>): NamedReducerConfig<T, S, A> {
	return {
		initialState: {
			[key]: state,
		} as Record<T, S>,
		reducer: {
			[key]: reducer,
		} as Record<T, Reducer<S, A>>,
	};
}
