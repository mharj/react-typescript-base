import {ActionCreatorsMapObject} from 'redux';

type ActionCreatorResponse<T extends (...args: any[]) => any> = ReturnType<ReturnType<T>>;
type IsValidArg<T> = T extends object ? (keyof T extends never ? false : true) : true;
type ReplaceReturnType<T, TNewReturn> = T extends (
	a: infer A,
	b: infer B,
	c: infer C,
	d: infer D,
	e: infer E,
	f: infer F,
	g: infer G,
	h: infer H,
	i: infer I,
	j: infer J,
) => infer R
	? (IsValidArg<J> extends true
			? (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => TNewReturn
			: IsValidArg<I> extends true
			? (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => TNewReturn
			: IsValidArg<H> extends true
			? (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => TNewReturn
			: IsValidArg<G> extends true
			? (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => TNewReturn
			: IsValidArg<F> extends true
			? (a: A, b: B, c: C, d: D, e: E, f: F) => TNewReturn
			: IsValidArg<E> extends true
			? (a: A, b: B, c: C, d: D, e: E) => TNewReturn
			: IsValidArg<D> extends true
			? (a: A, b: B, c: C, d: D) => TNewReturn
			: IsValidArg<C> extends true
			? (a: A, b: B, c: C) => TNewReturn
			: IsValidArg<B> extends true
			? (a: A, b: B) => TNewReturn
			: IsValidArg<A> extends true
			? (a: A) => TNewReturn
			: () => TNewReturn)
	: never;

export type RemapActionCreators<T extends ActionCreatorsMapObject> = {[K in keyof T]: ReplaceReturnType<T[K], ActionCreatorResponse<T[K]>>};
