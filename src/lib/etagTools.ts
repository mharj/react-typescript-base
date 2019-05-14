export interface IEtagObject<T = any> {
	etag: string | null,
	data: T;
}

/**
 * Build ETag Object
 * @param data data inside of object
 * @param etag ETag or null
 * @return {IEtagObject<T>}
 */
export const wrapEtag = <T = any>(data: T, etag: string | null): IEtagObject<T> => {
	return {
		data,
		etag,
	};
};

/**
 * return data from Etag Object
 * @param etagData ETag Object
 * @return {<T>} object data
 */
export const unWrapEtag = <T = any> (etagData: IEtagObject<T> | null | undefined): T | undefined => {
	if (etagData === undefined || etagData === null ) {
		return undefined;
	}
	return etagData.data;
}

/**
 * get ETag from response header
 */
export const getEtagHeader = (res: Response): string | null => {
	let etag: string | null = null;
	if (res.headers.has('ETag')) {
		etag = res.headers.get('ETag');
	}
	return etag;
}

/**
 * validates Etag Object
 */
export const isEtagObject = (data: any): data is IEtagObject => {
	return data && 'etag' in data && 'data' in data;
}
