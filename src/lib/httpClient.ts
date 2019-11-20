import 'cross-fetch/polyfill';
import {v4 as uuid} from 'uuid';

export class HttpClient {
	public static getInstance() {
		if (!HttpClient.instance) {
			HttpClient.instance = new HttpClient();
		}
		return HttpClient.instance;
	}
	private static instance: HttpClient | undefined;
	private delay = 100; // delay isLoadingCallback
	private isLoadingCallback: undefined | ((isLoading: boolean) => void);

	private loadingUuidList: string[] = [];
	private constructor() {
		// we should not call "new" outside
		this.fetch = this.fetch.bind(this);
	}
	public onLoading(callback: (isLoading: boolean) => void) {
		this.isLoadingCallback = callback;
	}
	public async fetch(input: RequestInfo, options?: RequestInit | undefined) {
		const id = uuid();
		if (this.addUuid(id) && this.isLoadingCallback) {
			this.isLoadingCallback(this.isLoading());
		}
		try {
			const res = await fetch(input, options);
			setTimeout(() => {
				if (this.dropUuid(id) && this.isLoadingCallback) {
					this.isLoadingCallback(this.isLoading());
				}
			}, this.delay);
			return Promise.resolve(res);
		} catch (err) {
			setTimeout(() => {
				if (this.dropUuid(id) && this.isLoadingCallback) {
					this.isLoadingCallback(this.isLoading());
				}
			}, this.delay);
			throw err;
		}
	}
	private dropUuid(id: string): boolean {
		const wasLoading = this.isLoading();
		const idx = this.loadingUuidList.findIndex((u) => u === id);
		if (idx !== -1) {
			this.loadingUuidList.splice(idx);
		}
		return wasLoading !== this.isLoading();
	}
	private addUuid(id: string): boolean {
		const wasLoading = this.isLoading();
		this.loadingUuidList.push(id);
		return wasLoading !== this.isLoading();
	}
	private isLoading(): boolean {
		return this.loadingUuidList.length !== 0;
	}
}
