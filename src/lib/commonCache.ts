/**
 * cacheMatch
 * @param req
 * @param options
 * @throws Error if no cache data and browser is offline
 */
const getCacheOptions = (data: (CacheQueryOptions & Record<string, any>) | undefined): CacheQueryOptions => {
	const out: CacheQueryOptions = {};
	if (data) {
		if ('ignoreMethod' in data) {
			out.ignoreMethod = data.ignoreMethod;
		}
		if ('ignoreSearch' in data) {
			out.ignoreSearch = data.ignoreSearch;
		}
		if ('ignoreVary' in data) {
			out.ignoreVary = data.ignoreVary;
		}
	}
	return out;
};

export const cacheMatch = async (req: Request, options?: {ifNoneMatch?: boolean} & CacheQueryOptions, cacheName = 'default'): Promise<Response | undefined> => {
	if (typeof window !== 'undefined' && window.caches) {
		const cache = await window.caches.open(cacheName);
		const resp = await cache.match(req, getCacheOptions(options));
		if (resp && options && options.ifNoneMatch) {
			const etag = resp.headers.get('ETag');
			if (etag) {
				req.headers.set('if-none-match', etag);
			}
		}
		if (!navigator.onLine && !resp) {
			throw new Error('browser is offline and no data found');
		}
		return resp;
	}
	return undefined;
};

export const cacheStore = async (req: Request, res: Response, cacheName = 'default'): Promise<void> => {
	if (typeof window !== 'undefined' && window.caches && res.status === 200) {
		const cache = await window.caches.open(cacheName);
		req.headers.delete('Authorization');
		return cache.put(req, res.clone());
	}
};

export const cleanCache = async (basePath: string, matchUrl: string[], cacheName = 'default') => {
	if (typeof window !== 'undefined' && window.caches) {
		const cache = await window.caches.open(cacheName);
		const notFound = (await cache.keys()).filter((res) => res.url.startsWith(basePath) && matchUrl.indexOf(res.url) === -1);
		for (const req of notFound) {
			await cache.delete(req);
		}
	}
};

export const deleteCache = async (cacheName = 'default'): Promise<void> => {
	if (typeof window !== 'undefined' && window.caches) {
		await window.caches.delete(cacheName);
	}
};

export const isOnline = () => {
	if (typeof window !== 'undefined' && window.navigator) {
		return window.navigator.onLine;
	}
	return true;
};

const wrapHeaders = (hrd: Headers | undefined): Record<string, string> => {
	const out: Record<string, string> = {};
	if (hrd) {
		hrd.forEach((e, k) => {
			out[k] = e;
		});
	}
	return out;
};
export interface IRequestLikeObject {
	url: Request['url'];
	method: Request['method'];
	headers: Record<string, string>;
	body: Request['body'];
}

export const toRequestObject = (req: Request): IRequestLikeObject => {
	const headers = new Headers(req.headers);
	headers.delete('Authorization');
	return {
		body: req.body,
		headers: wrapHeaders(headers),
		method: req.method,
		url: req.url,
	};
};

export const fromObjectToReqeust = (data: IRequestLikeObject): Request => {
	const {url, ...rest} = data;
	return new Request(url, rest);
};
