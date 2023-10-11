/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
import * as chai from 'chai';
import {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiSubset from 'chai-subset';
import 'cross-fetch/polyfill';
import 'mocha';
import {Dispatch} from 'redux';
import * as demo from '../src/actions/demoActions';
import {createTestStore} from './lib/configureTestStore';

chai.use(chaiAsPromised);

chai.use(chaiSubset);

let dispatch: Dispatch<any>;
let getState: () => any;
const rebuildStorage = () => {
	const config = createTestStore();
	dispatch = config.store.dispatch;
	getState = config.store.getState;
};

describe('test demo actions', () => {
	describe('thunk actions', () => {
		before(() => {
			rebuildStorage();
		});
		it('should do getHome', async () => {
			// initial state
			expect(getState().demo.todo).to.be.eql(undefined);
			await dispatch(demo.getTodo(1));
			expect(getState().demo.todo).to.be.eql({userId: 1, id: 1, title: 'delectus aut autem', completed: false});
		});
	});
});
