import GetFiscalYear from '../src/get-fiscal-year.js';

describe('#getFiscalYear()', () => {
	let gfy = new GetFiscalYear();

	test('Should return current fiscal year', () => {
		expect(gfy.getFiscalYear('AU')).toMatchObject({
			period: 'current',
			fiscalYearStart: expect.any(String),
			fiscalYearEnd: expect.any(String)
		});
	});

	test('Should return last fiscal year', () => {
		expect(gfy.getFiscalYear('AU', 'last')).toMatchObject({
			period: 'last',
			fiscalYearStart: expect.any(String),
			fiscalYearEnd: expect.any(String)
		});
	});

	test('Should return next fiscal year', () => {
		expect(gfy.getFiscalYear('AU', 'next')).toMatchObject({
			period: 'next',
			fiscalYearStart: expect.any(String),
			fiscalYearEnd: expect.any(String)
		});
	});

	test('Should return undefined and log error if no country input provided', () => {
		const consoleSpy = jest.spyOn(console, 'error');
		expect(gfy.getFiscalYear()).toBeUndefined();
		expect(consoleSpy).toHaveBeenCalledWith('GetFiscalYear: No country provided.');
	});

	test('Should return undefined and log error if period is incorrect', () => {
		const consoleSpy = jest.spyOn(console, 'error');
		expect(gfy.getFiscalYear('AU', 'wrong')).toBeUndefined();
		expect(consoleSpy).toHaveBeenCalledWith('GetFiscalYear: Time period is not valid.');
	});

	test('Should return undefined and log error if country was not found', () => {
		const consoleSpy = jest.spyOn(console, 'error');
		expect(gfy.getFiscalYear('UK')).toBeUndefined();
		expect(consoleSpy).toHaveBeenCalledWith('GetFiscalYear: Country is not valid, or was not found.');
	})
});