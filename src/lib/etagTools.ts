export interface IEtagData<T = any> {
	etag: string | null,
	data: T;
}

export const wrapEtag = <T = any>(data: T, etag: string | null): IEtagData<T> => {
	return {
		data,
		etag,
	};
};

export const unWrapEtag = <T = any> (etagData: IEtagData<T> | null | undefined): T | null => {
	if (etagData === undefined || etagData === null ) {
		return null;
	}
	return etagData.data;
}

export const getEtagHeader = (res: Response): string | null => {
	let etag: string | null = null;
	if (res.headers.has('ETag')) {
		etag = res.headers.get('ETag');
	}
	return etag;
}