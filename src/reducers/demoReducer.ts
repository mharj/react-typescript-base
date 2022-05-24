import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {IToDo} from '../actions/demoActions';
import {buildSliceConfig, getKey, migrateInit} from '../lib/persistUtils';
import {resetAction} from './common';

/**
 * Redux state interface
 */
interface IState {
	todo: IToDo | undefined;
	_persist: any;
}

/**
 * Initial redux state
 */
const initialState: IState = {
	todo: undefined,
	_persist: undefined,
};

const slice = createSlice({
	name: 'demo',
	initialState,
	reducers: {
		setDemo: (state, action: PayloadAction<IToDo>) => {
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
