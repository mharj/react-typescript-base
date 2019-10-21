import * as chai from 'chai';
import {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiSubset from 'chai-subset';
import 'cross-fetch/polyfill';
import 'mocha';
import {Dispatch} from 'redux';
import * as app from '../src/actions/appActions';
import * as global from '../src/actions/globalActions';
import {createTestStore} from '../src/configureTestStore';

chai.use(chaiAsPromised);

chai.use(chaiSubset);

let dispatch: Dispatch<any>;
let getState: () => any;
const rebuildStorage = () => {
	const store = createTestStore();
	dispatch = store.dispatch;
	getState = store.getState;
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
				dispatch(app.appLoading(true));
				expect(getState()).to.containSubset({app: {isLoading: true}});
			});
			it('should set loading false', async () => {
				dispatch(app.appLoading(false));
				expect(getState()).to.containSubset({app: {isLoading: false}});
			});
			it('should check value after reset', async () => {
				dispatch(app.appLoading(true));
				expect(getState()).to.containSubset({app: {isLoading: true}});
				dispatch(global.doReset());
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
				dispatch(app.appError('test'));
				expect(getState()).to.containSubset({app: {error: 'test'}});
			});
			it('should clear error message', async () => {
				dispatch(app.appError(undefined));
				expect(getState()).to.containSubset({app: {error: undefined}});
			});
			it('should check value after reset', async () => {
				dispatch(app.appError('test'));
				expect(getState()).to.containSubset({app: {error: 'test'}});
				dispatch(global.doReset());
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
				dispatch(app.appLogin(true));
				expect(getState()).to.containSubset({app: {isLoggedIn: true}});
			});
			it('should set login false', async () => {
				dispatch(app.appLogin(false));
				expect(getState()).to.containSubset({app: {isLoggedIn: false}});
			});
			it('should do logout', async () => {
				dispatch(app.appLogin(true));
				expect(getState()).to.containSubset({app: {isLoggedIn: true}});
				dispatch(app.appLogout());
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
				expect(getState()).to.containSubset({app: {isLoggedIn: false, error: undefined}});
				await dispatch(app.doLogin('test', 'password'));
				expect(getState()).to.containSubset({app: {isLoggedIn: true, error: undefined}});
			});
			it('should not login with wrong credentials', async () => {
				await expect(dispatch(app.doLogin('1234', '1234'))).to.be.rejected;
				expect(getState()).to.containSubset({app: {isLoggedIn: false, error: 'account or password not match'}});
			});
			it('should do logout', async () => {
				await dispatch(app.doLogin('test', 'password'));
				expect(getState()).to.containSubset({app: {isLoggedIn: true, error: undefined}});
				await expect(dispatch(app.doLogout())).to.be.fulfilled;
				expect(getState()).to.containSubset({app: {isLoggedIn: false, error: undefined}});
			});
		});
	});
});
