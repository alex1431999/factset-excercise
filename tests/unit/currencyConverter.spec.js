/* eslint-disable no-undef, import/no-unresolved */
import { assert, expect } from 'chai';

import CurrencyConverter from '@/lib/currencyConverter';
import currencies from '@/data/currencies';

describe('currencyCoverter tests', () => {
  const currencyConverter = new CurrencyConverter(currencies);

  beforeAll(() => assert.isAtLeast(currencies.length, 1), 'There should be currencies');

  it('test get rate invalid', () => {
    const invalidBase = 'invalid base';
    const invalidTarget = 'invalid target';

    const rateResult = currencyConverter.getRate(invalidBase, invalidTarget);

    assert.isNull(rateResult, 'Null should be returned if the currency cant be found');
  });

  it('test get rate', () => {
    const { base, target, rate } = currencyConverter.currencies[0];

    const rateResult = currencyConverter.getRate(base, target);

    assert.equal(rate, rateResult, 'The correct rate should have been returned');
  });

  it('test get rate reverse', () => {
    const { base, target, rate } = currencyConverter.currencies[0];

    const rateResult = currencyConverter.getRate(target, base);
    const rateExpected = 1 / rate;

    assert.equal(rateExpected, rateResult, 'The converted rate should have been returned');
  });

  it('test convert', () => {
    const { base, target, rate } = currencyConverter.currencies[0];
    const value = Math.random();

    const conversion = currencyConverter.convert(base, target, value);
    const conversionExpected = (value * rate).toFixed(2);

    assert.equal(conversion, conversionExpected, 'The currency should have been correclty converted');
  });

  it('test convert unsupported currency', () => {
    const invalidBase = 'invalid base';
    const invalidTarget = 'invalid target';
    const value = Math.random();

    expect(() => currencyConverter.convert(invalidBase, invalidTarget, value)).to.throw();
  });
});
