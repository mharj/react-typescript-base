/**
 * Check if browser is online, non browser environments are considered online
 * @returns
 */
export function isOnline(): boolean {
	if (typeof window !== 'undefined' && window.navigator) {
		return window.navigator.onLine;
	}
	return true;
}
