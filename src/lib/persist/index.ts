import {Slice, SliceCaseReducers} from '@reduxjs/toolkit';
import {Action, Reducer} from 'redux';
import {PersistedState, PersistMigrate, PersistState, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import {appError} from '../../reducers/common';

export const ignoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, appError.type];

export function getKey(key: string): string {
	return 'persist_' + key;
}

export const initialPersistState: PersistState = {
	version: -1,
	rehydrated: false,
};

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

export function buildSliceConfig<T extends string, S, A extends Action = Action>(
	slice: Slice<S, SliceCaseReducers<S>, T>,
	reducer?: Reducer<S, A>,
): NamedReducerConfig<T, S, A> {
	return {
		initialState: {
			[slice.name]: slice.getInitialState(),
		} as Record<T, S>,
		reducer: {
			[slice.name]: reducer || slice.reducer,
		} as Record<T, Reducer<S, A>>,
	};
}
