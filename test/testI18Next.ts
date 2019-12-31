import * as chai from 'chai';
import {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiSubset from 'chai-subset';
import 'cross-fetch/polyfill';
import i18next from 'i18next';
import 'mocha';
import '../src/i18n';

chai.use(chaiAsPromised);

chai.use(chaiSubset);

describe('test i18next instance', () => {
	it('should not found transation key', async () => {
		expect(i18next.exists('hello')).to.be.eq(true);
	});
	it('should translate helloe', async () => {
		expect(i18next.t('hello')).to.be.eq('Hello');
	});
});
