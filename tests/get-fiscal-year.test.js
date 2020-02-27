import GetFiscalYear from '../src/get-fiscal-year.js';

describe('#getFiscalYear()', () => {
	let gfy = new GetFiscalYear();

	test('Should return current fiscal year', () => {
		expect(gfy.getFiscalYear('AU')).toMatchObject({
			period: 'current',
			fiscalYearStart: expect.any(String),
			fiscalYearEnd: expect.any(String)
		});
		expect(gfy.getFiscalYear('Australia')).toMatchObject({
			period: 'current',
			fiscalYearStart: expect.any(String),
			fiscalYearEnd: expect.any(String)
		});
	});

	test('Should return last fiscal year', () => {
		expect(gfy.getFiscalYear('GB', 'last')).toMatchObject({
			period: 'last',
			fiscalYearStart: expect.any(String),
			fiscalYearEnd: expect.any(String)
		});
		expect(gfy.getFiscalYear('United Kingdom', 'last')).toMatchObject({
			period: 'last',
			fiscalYearStart: expect.any(String),
			fiscalYearEnd: expect.any(String)
		});
	});

	test('Should return next fiscal year', () => {
		expect(gfy.getFiscalYear('US', 'next')).toMatchObject({
			period: 'next',
			fiscalYearStart: expect.any(String),
			fiscalYearEnd: expect.any(String)
		});
		expect(gfy.getFiscalYear('United States', 'next')).toMatchObject({
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
		expect(consoleSpy).toHaveBeenCalledWith(
			'GetFiscalYear: Country is not valid, or was not found. If you believe this to be a mistake, create an issue https://github.com/Alex61NN5/get-fiscal-year/issues'
		);
	});
});

describe('#getFiscalYearByDate()', () => {
	let gfy = new GetFiscalYear();

	test('Should return current fiscal year', () => {
		expect(gfy.getFiscalYearByDate('06/30')).toMatchObject({
			period: 'current',
			fiscalYearStart: expect.stringContaining('07/01'),
			fiscalYearEnd: expect.stringContaining('06/30')
		});
	});

	test('Should return last fiscal year', () => {
		expect(gfy.getFiscalYearByDate('06/30', 'last')).toMatchObject({
			period: 'last',
			fiscalYearStart: expect.stringContaining('07/01'),
			fiscalYearEnd: expect.stringContaining('06/30')
		});
	});

	test('Should return next fiscal year', () => {
		expect(gfy.getFiscalYearByDate('06/30', 'next')).toMatchObject({
			period: 'next',
			fiscalYearStart: expect.stringContaining('07/01'),
			fiscalYearEnd: expect.stringContaining('06/30')
		});
	});

	test('Should return undefined and log error if no date input provided', () => {
		const consoleSpy = jest.spyOn(console, 'error');
		expect(gfy.getFiscalYearByDate()).toBeUndefined();
		expect(consoleSpy).toHaveBeenCalledWith('GetFiscalYear: Date is invalid.');
	});

	test('Should return undefined and log error if period is incorrect', () => {
		const consoleSpy = jest.spyOn(console, 'error');
		expect(gfy.getFiscalYearByDate('06/30', 'wrong')).toBeUndefined();
		expect(consoleSpy).toHaveBeenCalledWith('GetFiscalYear: Time period is not valid.');
	});

	test('Should return undefined and log error if date format is not valid', () => {
		const consoleSpy = jest.spyOn(console, 'error');
		expect(gfy.getFiscalYearByDate('111/111')).toBeUndefined();
		expect(consoleSpy).toHaveBeenCalledWith('GetFiscalYear: Date is invalid.');
	});
});