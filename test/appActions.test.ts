/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
import * as chai from 'chai';
import {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiSubset from 'chai-subset';
import 'cross-fetch/polyfill';
import 'mocha';
import {Dispatch} from 'redux';
import {appLoading, appLogin, appLogout} from '../src/reducers/appReducer';
import {doLogin} from '../src/actions/appActions';
import {createTestStore} from './lib/configureTestStore';
import {appError, resetAction} from '../src/reducers/common';

chai.use(chaiAsPromised);

chai.use(chaiSubset);

let dispatch: Dispatch<any>;
let getState: () => any;
const rebuildStorage = () => {
	const config = createTestStore();
	dispatch = config.store.dispatch;
	getState = config.store.getState;
};

describe('test app actions', () => {
	describe('actions', () => {
		describe('loading state', () => {
			before(() => {
				rebuildStorage();
			});
			it("be false as it's initial state", async () => {
				expect(getState()).to.containSubset({app: {isLoading: false}});
			});
			it('should set loading true', async () => {
				dispatch(appLoading(true));
				expect(getState()).to.containSubset({app: {isLoading: true}});
			});
			it('should set loading false', async () => {
				dispatch(appLoading(false));
				expect(getState()).to.containSubset({app: {isLoading: false}});
			});
			it('should check value after reset', async () => {
				dispatch(appLoading(true));
				expect(getState()).to.containSubset({app: {isLoading: true}});
				dispatch(resetAction());
				expect(getState()).to.containSubset({app: {isLoading: false}});
			});
		});
		describe('error state', () => {
			before(() => {
				rebuildStorage();
			});
			it("be undefined as it's initial state", async () => {
				expect(getState()).to.containSubset({app: {error: undefined}});
			});
			it('should set error message', async () => {
				dispatch(appError('test'));
				expect(getState()).to.containSubset({app: {error: 'test'}});
			});
			it('should clear error message', async () => {
				dispatch(appError(undefined));
				expect(getState()).to.containSubset({app: {error: undefined}});
			});
			it('should check value after reset', async () => {
				dispatch(appError('test'));
				expect(getState()).to.containSubset({app: {error: 'test'}});
				dispatch(resetAction());
				expect(getState()).to.containSubset({app: {error: undefined}});
			});
		});
		describe('login state', () => {
			before(() => {
				rebuildStorage();
			});
			it("be undefined as it's initial state", async () => {
				expect(getState()).to.containSubset({app: {isLoggedIn: false}});
			});
			it('should set login true', async () => {
				dispatch(appLogin(true));
				expect(getState()).to.containSubset({app: {isLoggedIn: true}});
			});
			it('should set login false', async () => {
				dispatch(appLogin(false));
				expect(getState()).to.containSubset({app: {isLoggedIn: false}});
			});
			it('should do logout', async () => {
				dispatch(appLogin(true));
				expect(getState()).to.containSubset({app: {isLoggedIn: true}});
				dispatch(appLogout());
				expect(getState()).to.containSubset({app: {isLoggedIn: false}});
			});
		});
	});
	describe('thunk actions', () => {
		describe('login', () => {
			before(() => {
				rebuildStorage();
			});
			it('should do login', async () => {
				// initial state
				expect(getState()).to.containSubset({app: {isLoggedIn: false}});
				await dispatch(doLogin('test', 'password'));
				expect(getState()).to.containSubset({app: {isLoggedIn: true}});
			});
			it('should not login with wrong credentials', async () => {
				const status = await dispatch(doLogin('1234', '1234'));
				expect(status).to.be.false;
				expect(getState()).to.containSubset({app: {isLoggedIn: false, error: 'account or password not match'}});
			});
			it('should do logout', async () => {
				await dispatch(doLogin('test', 'password'));
				expect(getState()).to.containSubset({app: {isLoggedIn: true}});
				dispatch(appLogout());
				expect(getState()).to.containSubset({app: {isLoggedIn: false}});
			});
		});
	});
});
