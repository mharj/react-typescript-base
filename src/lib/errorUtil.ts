export function isError(obj: unknown): obj is Error {
	return typeof obj === 'object' && obj instanceof Error;
}
