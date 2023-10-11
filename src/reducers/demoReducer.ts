import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {buildSliceConfig, getKey, initialPersistState, migrateInit} from '../lib/persist';
import {resetAction} from './common';
import {PersistPartial} from 'redux-persist/lib/persistReducer';
import {ToDo} from '../types/ToDo';

/**
 * Redux state interface
 */
interface IState extends PersistPartial {
	todo: ToDo | undefined;
}

/**
 * Initial redux state
 */
const initialState: IState = {
	todo: undefined,
	_persist: initialPersistState,
};

const slice = createSlice({
	name: 'demo',
	initialState,
	reducers: {
		setDemo: (state, action: PayloadAction<ToDo>) => {
			state.todo = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(resetAction, () => initialState);
	},
});

export const {setDemo} = slice.actions; // export actions

export const reducerConfig = buildSliceConfig(
	slice,
	persistReducer(
		{
			key: getKey(slice.name),
			storage,
			migrate: migrateInit(initialState),
		},
		slice.reducer,
	),
);
