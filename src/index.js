import fiscalData from './fiscalData.js';

const currentDate = new Date();
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
          return eval(period + 'FiscalYear')(getCountryInfo(userLocation.countryCode));
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
    return fiscalData.filter(x => x.country.toLowerCase().includes(c))[0];
  } else {
    // filter fiscalData by the country code and return the value
    return fiscalData.filter(x => x.code === country)[0];
  }
};

const appendLeadingZero = number => {
  if (number <= 9) {
    return `0${number}`;
  } else {
    return number;
  }
};

const getDateBreakdown = country => {
  return {
    fs: {
      month: Number(country.fiscalStart.split('/')[0]),
      day: Number(country.fiscalStart.split('/')[1])
    },
    fe: {
      month: Number(country.fiscalEnd.split('/')[0]),
      day: Number(country.fiscalEnd.split('/')[1])
    }
  }
}

const lastFiscalYear = country => {
  const breakdown = getDateBreakdown(country);
  if (currentDate.getMonth() + 1 < breakdown.fe.month) {
    return {
      period: 'last',
      fiscalYearStart: `${currentDate.getFullYear() - 2}/${appendLeadingZero(breakdown.fs.month)}/${appendLeadingZero(breakdown.fs.day)}`,
      fiscalYearEnd: `${currentDate.getFullYear() - 1}/${appendLeadingZero(breakdown.fe.month)}/${appendLeadingZero(breakdown.fe.day)}`
    }
  } else {
    return {
      period: 'last',
      fiscalYearStart: `${currentDate.getFullYear() - 1}/${appendLeadingZero(breakdown.fs.month)}/${appendLeadingZero(breakdown.fs.day)}`,
      fiscalYearEnd: `${currentDate.getFullYear()}/${appendLeadingZero(breakdown.fe.month)}/${appendLeadingZero(breakdown.fe.day)}`
    }
  }
};

const currentFiscalYear = country => {
  const breakdown = getDateBreakdown(country);
  if (currentDate.getMonth() + 1 < breakdown.fe.month) {
    return {
      period: 'current',
      fiscalYearStart: `${currentDate.getFullYear() - 1}/${appendLeadingZero(breakdown.fs.month)}/${appendLeadingZero(breakdown.fs.day)}`,
      fiscalYearEnd: `${currentDate.getFullYear()}/${appendLeadingZero(breakdown.fe.month)}/${appendLeadingZero(breakdown.fe.day)}`
    }
  } else {
    return {
      period: 'current',
      fiscalYearStart: `${currentDate.getFullYear()}/${appendLeadingZero(breakdown.fs.month)}/${appendLeadingZero(breakdown.fs.day)}`,
      fiscalYearEnd: `${currentDate.getFullYear() + 1}/${appendLeadingZero(breakdown.fe.month)}/${appendLeadingZero(breakdown.fe.day)}`
    }
  }
};

const nextFiscalYear = country => {
  const breakdown = getDateBreakdown(country);
  if (currentDate.getMonth() + 1 < breakdown.fe.month) {
    return {
      period: 'next',
      fiscalYearStart: `${currentDate.getFullYear()}/${appendLeadingZero(breakdown.fs.month)}/${appendLeadingZero(breakdown.fs.day)}`,
      fiscalYearEnd: `${currentDate.getFullYear() + 1}/${appendLeadingZero(breakdown.fe.month)}/${appendLeadingZero(breakdown.fe.day)}`
    }
  } else {
    return {
      period: 'next',
      fiscalYearStart: `${currentDate.getFullYear() + 1}/${appendLeadingZero(breakdown.fs.month)}/${appendLeadingZero(breakdown.fs.day)}`,
      fiscalYearEnd: `${currentDate.getFullYear() + 2}/${appendLeadingZero(breakdown.fe.month)}/${appendLeadingZero(breakdown.fe.day)}`
    }
  }
};