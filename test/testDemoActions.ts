import * as chai from 'chai';
import {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiSubset from 'chai-subset';
import 'cross-fetch/polyfill';
import 'mocha';
import {Dispatch} from 'redux';
import * as demo from '../src/actions/demoActions';
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

describe('test demo actions', () => {
	describe('thunk actions', () => {
		before(() => {
			rebuildStorage();
		});
		it('should do getHome', async () => {
			// initial state
			expect(getState()).to.containSubset({demo: {todo: {data: undefined, etag: null}}});
			await dispatch(demo.getHome());
			expect(getState()).to.containSubset({demo: {todo: {data: {userId: 1, id: 1, title: 'delectus aut autem', completed: false}}}});
		});
	});
});
