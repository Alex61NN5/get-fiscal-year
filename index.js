import fiscalData from './fiscalData.js';

let userLocation;

const getUserLocation = async () => {
  try {
    let response = await fetch('http://ip-api.com/json/');
    let data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

const getFiscalYear = async (country = null, period = 'current') => {
  if (country) {
    eval(period + 'FiscalYear')(getCountryInfo(country));
  } else {
    if (!userLocation) {
      getUserLocation()
        .then((result) => {
          userLocation = result;
          eval(period + 'FiscalYear')(getCountryInfo(userLocation.countryCode));
        })
        .catch((err) => {
          console.error(err);
        })
    } else {
      eval(period + 'FiscalYear')(getCountryInfo(userLocation.countryCode));
    }
  }
}

const getCountryInfo = (country) => {
  if (country.split('').length > 2) {
    let c = country.toLowerCase();
    return fiscalData.data.filter(x => x.country.toLowerCase().includes(c))[0];
  } else {
    return fiscalData.data.filter(x => x.code === country)[0];
  }
}

const lastFiscalYear = (country) => {
  console.log(country);
  // get last financial year
}

const currentFiscalYear = (country) => {
  console.log(country);
  // get current financial year
}

const nextFiscalYear = (country) => {
  console.log(country);
  // get next financial year
}

// getUserLocation();
getFiscalYear('New Zealand', 'last');