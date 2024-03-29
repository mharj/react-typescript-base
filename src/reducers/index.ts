import {shallowEqual, TypedUseSelectorHook, useDispatch, useSelector as useReduxSelector} from 'react-redux';
import {Action, combineReducers} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {reducerConfig as appReducerConfig} from './appReducer';
import {reducerConfig as demoReducerConfig} from './demoReducer';

/**
 * Combine all initial states
 * @see {@link createStore/default}
 */
export const initialState: ReduxState = {
	...appReducerConfig.initialState,
	...demoReducerConfig.initialState,
};

/**
 * Combine all reducers with names
 */
export const rootReducer = combineReducers({
	...appReducerConfig.reducer,
	...demoReducerConfig.reducer,
});

/**
 * Redux selector hook
 * @example
 * const todo = useSelector((state) => state.demo.todo);
 */
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/**
 * Redux shallow selector hook
 * @example
 * const {todo} = useShallowSelector((state) => ({
 *   todo: state.demo.todo,
 * }));
 */
export function useShallowSelector<TState = ReduxState, TSelected = unknown>(selector: (state: TState) => TSelected) {
	return useReduxSelector(selector, shallowEqual);
}

/**
 * useThunkDispatch hook
 * @example
 * const dispatch = useThunkDispatch();
 * dispatch(someThunkAction());
 */
export const useThunkDispatch = (): RootThunkDispatch => useDispatch<RootThunkDispatch>();

export type ReduxState = ReturnType<typeof rootReducer>;

export type RootThunkDispatch = ThunkDispatch<ReduxState, undefined, Action>;

/**
 * @example
 * export const someAsyncFunc = (): ThunkResult<Promise<void>> => async (dispatch, getState) => {
 *
 *}
 */
export type ThunkResult<R> = ThunkAction<R, ReduxState, undefined, Action>;

/**
 * @example
 * export const someAsyncFunc: ThunkFunc<{id: string}, Promise<void>> = ({id}) => async (dispatch, getState) => {
 *
 * }
 */
export type ThunkFunc<P, R> = (params: P) => ThunkResult<R>;
