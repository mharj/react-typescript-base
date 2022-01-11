import {Storage} from 'redux-persist';
// TODO: later build own module
let mockStorage: any = {};
export const storage: Storage = {
	getItem(key: string, ...args: any[]) {
		return mockStorage[key];
	},
	setItem(key: string, value: any, ...args: any[]) {
		mockStorage[key] = value;
	},
	removeItem(key: string, ...args: any[]) {
		delete mockStorage[key];
	},
};
export const resetStore = () => {
	mockStorage = {};
};
