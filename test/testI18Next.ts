import * as chai from 'chai';
import {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiSubset from 'chai-subset';
import 'cross-fetch/polyfill';
import {exists, t} from 'i18next';
import 'mocha';
import '../src/i18n';

chai.use(chaiAsPromised);

chai.use(chaiSubset);

describe('test i18next instance', () => {
	it('should not found transation key', async () => {
		expect(exists('hello')).to.be.eq(true);
	});
	it('should translate helloe', async () => {
		expect(t('hello')).to.be.eq('Hello');
	});
});
