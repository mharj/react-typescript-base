import {TypedUseSelectorHook, useSelector as useReduxSelector} from 'react-redux';
import {Action, combineReducers} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import * as app from './appReducer';
import * as demo from './demoReducer';

/**
 * This enum is meant for types which might affect all reducers
 */
export type GlobalTypes = 'global/RESET';
// Global actions
interface IGlobalResetAction extends Action<GlobalTypes> {
	type: 'global/RESET';
}

// Merge global actions
export type IGlobalAction = IGlobalResetAction;

/**
 * Combine all initial states
 * @see {@link createStore/default}
 */
export const initialState: ReduxState = {
	app: app.initialState,
	demo: demo.initialState,
};

/**
 * Combine all reducers with names
 */
export const rootReducer = combineReducers({
	app: app.reducer,
	demo: demo.reducer,
});

/**
 * mapStateToProps "hook"
 * @example
 * const data = useSelector((state) => ({
 *   qwe: state.demo.todo,
 * }));
 */
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

export type ReduxState = ReturnType<typeof rootReducer>;

export type ThunkResult<R> = ThunkAction<R, ReduxState, undefined, Action>;

export type RootThunkDispatch = ThunkDispatch<ReduxState, undefined, Action>;
