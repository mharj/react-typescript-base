import {createAction} from '@reduxjs/toolkit';

export const resetAction = createAction('global/reset');

/**
 * Build an action creator for app errors as payload can be Error which is not serializable
 */
export const appError = createAction<unknown>('app/error');
