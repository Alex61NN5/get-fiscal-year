import fiscalData from './fiscalData.js';

let userLocation;

const getUserLocation = async () => {
	try {
		// fetch user location details from api
		let response = await fetch('http://ip-api.com/json/');
		let data = await response.json();
		return data;
	} catch (err) {
		// handle error
		console.error(err);
	}
};

const getFiscalYear = async (country = null, period = 'current') => {
	if (country) {
		eval(period + 'FiscalYear')(getCountryInfo(country));
	} else {
		if (!userLocation) {
			// if user location hasn't already been called
			// get the user location
			getUserLocation()
				.then(result => {
					// store user location for use later
					userLocation = result;
					eval(period + 'FiscalYear')(getCountryInfo(userLocation.countryCode));
				})
				.catch(err => {
					console.error(err);
				});
		} else {
			eval(period + 'FiscalYear')(getCountryInfo(userLocation.countryCode));
		}
	}
};

const getCountryInfo = country => {
	// check to see if country is a country code
	if (country.split('').length > 2) {
		let c = country.toLowerCase();
		// filter fiscalData by country name and return the value
		return fiscalData.data.filter(x => x.country.toLowerCase().includes(c))[0];
	} else {
		// filter fiscalData by the country code and return the value
		return fiscalData.data.filter(x => x.code === country)[0];
	}
};

const appendLeadingZero = number => {
	if (number <= 9) {
		return `0${number}`;
	} else {
		return number;
	}
};

const lastFiscalYear = country => {
	const currentDate = new Date();
	const fs = {
		month: Number(country.fiscalStart.split('/')[0]),
		day: Number(country.fiscalStart.split('/')[1])
	};
	const fe = {
		month: Number(country.fiscalEnd.split('/')[0]),
		day: Number(country.fiscalEnd.split('/')[1])
	};
	if (currentDate.getMonth() + 1 < fe.month) {
		console.log(`${currentDate.getFullYear() - 2}/${appendLeadingZero(fs.month)}/${appendLeadingZero(fs.day)}`);
		console.log(`${currentDate.getFullYear() - 1}/${appendLeadingZero(fe.month)}/${appendLeadingZero(fe.day)}`);
	} else {
		console.log(`${currentDate.getFullYear() - 1}/${appendLeadingZero(fs.month)}/${appendLeadingZero(fs.day)}`);
		console.log(`${currentDate.getFullYear()}/${appendLeadingZero(fe.month)}/${appendLeadingZero(fe.day)}`);
	}
};

const currentFiscalYear = country => {
	console.log(country);
	// get current financial year
};

const nextFiscalYear = country => {
	console.log(country);
	// get next financial year
};

// getUserLocation();
getFiscalYear('NZ', 'last');
