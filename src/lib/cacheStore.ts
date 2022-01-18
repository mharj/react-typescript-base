import {WebStorage} from 'redux-persist';

export const cacheStore: WebStorage = {
	async getItem(key: string): Promise<string | null> {
		const [root, path] = key.split(':', 2);
		const cache = await window.caches.open(root);
		const req = new Request(`/${path}`);
		const res = await cache.match(req, {});
		return res?.text() || null;
	},
	async setItem(key: string, value: string): Promise<void> {
		const [root, path] = key.split(':', 2);
		const req = new Request(`/${path}`);
		const res = new Response(value, {headers: {'Content-type': 'application/json'}});
		const cache = await window.caches.open(root);
		return cache.put(req, res);
	},
	async removeItem(key: string): Promise<void> {
		const [root, path] = key.split(':', 2);
		const req = new Request(`/${path}`);
		const cache = await window.caches.open(root);
		await cache.delete(req);
	},
};
