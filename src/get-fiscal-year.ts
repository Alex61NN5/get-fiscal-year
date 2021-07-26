import { CountryInfo } from "./classes/country-info.class.js";
import { DateBreakdown } from "./classes/date-breakdown.class.js";
import { FiscalData } from "./classes/fiscal-data.class.js";
import fiscalData from "./fiscal-data.js";

export default class GetFiscalYear {
  currentDate: Date;
  constructor() {
    this.currentDate = new Date();
  }

  /**
   * This takes the country and the period and returns the FiscalData
   * @param {string} country This is the country the user would like fiscal year data on
   * @param {string} period This is the fiscal year time period valid options are 'last', 'next', 'current'
   */
  public getFiscalYear(
    country: string,
    period: "last" | "current" | "next" = "current"
  ): FiscalData {
    if (country) {
      if (this.checkPeriod(period)) {
        return this[period + "FiscalYear"](this.getCountryInfo(country), null);
      } else {
        this.error("Time period is not valid.");
        return;
      }
    } else {
      this.error("No country provided.");
      return;
    }
  }

  /**
   * This takes the end date and the period and returns the FiscalData
   * @param {string} date This is fiscal end date
   * @param {string} period This is the fiscal year time period valid options are 'last', 'next', 'current'
   */
  public getFiscalYearByDate(
    date: string,
    period: "last" | "current" | "next" = "current"
  ): FiscalData {
    date = this.checkLeadingZero(date);
    if (date && this.checkDate(date)) {
      if (this.checkPeriod(period)) {
        return this[period + "FiscalYear"](null, date);
      } else {
        this.error("Time period is not valid.");
        return;
      }
    } else {
      this.error("Date is invalid.");
      return;
    }
  }

  /**
   * This take a message and logs an error to the console
   */
  private error(message: string): void {
    message && console.error(`GetFiscalYear: ${message}`);
  }

  /**
   * This checks to see if the date passed in is valid
   */
  private checkDate(date: any): boolean {
    const regex = /^([0-9]{2}\/[0-9]{2})$/;
    // Check to see if date format is valid
    if (regex.test(date)) {
      const month = date.split("/")[0];
      const day = date.split("/")[1];
      // check to see if month and day set is valid
      return month <= 12 && day <= 31 ? true : false;
    } else {
      return false;
    }
  }

  /**
   * This checks to see if the date string has a leading zero or not
   */
  private checkLeadingZero(date: string): string {
    const regex = /^([0-9]{1}\/[0-9]{2})$/;
    // Check to see if the date is missing a leading zero
    if (regex.test(date)) {
      // if it is add the leading zero
      return `0${date}`;
    } else {
      // if not return date
      return date;
    }
  }

  /**
   * This checks to see if the period is a correct value
   */
  private checkPeriod(period: string): boolean {
    const validPeriods = {
      current: true,
      last: true,
      next: true,
    };
    return validPeriods[period] ? true : false;
  }

  /**
   * This takes in the country the user input and matches the data to the fiscalData
   */
  private getCountryInfo(country: string): CountryInfo | undefined {
    // check to see if country is a country code
    const c = country.toUpperCase();
    let countryInfo: CountryInfo;
    if (country.split("").length > 2) {
      countryInfo = fiscalData.filter((x) =>
        x.country.toUpperCase().includes(c)
      )[0];
    } else {
      countryInfo = fiscalData.filter((x) => x.code === c)[0];
    }
    return this.checkCountry(countryInfo) ? countryInfo : undefined;
  }

  /**
   * Checks to see if a valid country was found
   */
  private checkCountry(country: CountryInfo): boolean {
    if (country) {
      return true;
    } else {
      this.error(
        "Country is not valid, or was not found. If you are using a country's full name, try using the country's ISO code. If you believe this to be a mistake, create an issue https://github.com/Alex61NN5/get-fiscal-year/issues"
      );
      return false;
    }
  }

  /**
   * This function appends a leading zero
   */
  private appendLeadingZero(number: number): number | string {
    if (number <= 9) {
      return `0${number}`;
    } else {
      return number;
    }
  }

  /**
   * This returns the date breakdown as a usable object
   */
  private getDateBreakdownByCountry(country: CountryInfo): DateBreakdown {
    return {
      fs: {
        month: Number(country.fiscalStart.split("/")[0]),
        day: Number(country.fiscalStart.split("/")[1]),
      },
      fe: {
        month: Number(country.fiscalEnd.split("/")[0]),
        day: Number(country.fiscalEnd.split("/")[1]),
      },
    };
  }

  /**
   * This returns the date breakdown as a usable object
   */
  private getDateBreakdownByDate(date: string): DateBreakdown {
    console.log("getDateBreakdownByDate", date);
    const end = new Date(this.currentDate.getFullYear(), Number(date.split("/")[0]) -1, Number(date.split("/")[1]));
    const start = new Date(
      new Date(this.currentDate.getFullYear(), Number(date.split("/")[0]) -1, Number(date.split("/")[1])).setDate(
        end.getDate() + 1
      )
    );
    return {
      fs: {
        month: Number(start.getMonth() + 1),
        day: Number(start.getDate()),
      },
      fe: {
        month: Number(date.split("/")[0]),
        day: Number(date.split("/")[1]),
      },
    };
  }

  /**
   * Returns last fiscal year data
   */
  private lastFiscalYear(country: CountryInfo, date: string): FiscalData {
    if (country || date) {
      const breakdown = country
        ? this.getDateBreakdownByCountry(country)
        : this.getDateBreakdownByDate(date);
      if (
        this.currentDate.getMonth() + 1 <= breakdown.fe.month &&
        this.currentDate.getDate() <= breakdown.fe.day
      ) {
        return {
          period: "last",
          fiscalYearStart: this.createISODateString(
            "fs",
            breakdown,
            this.currentDate.getFullYear() - 2
          ),
          fiscalYearEnd: this.createISODateString(
            "fe",
            breakdown,
            this.currentDate.getFullYear() - 1
          ),
        };
      } else {
        return {
          period: "last",
          fiscalYearStart: this.createISODateString(
            "fs",
            breakdown,
            this.currentDate.getFullYear() - 1
          ),
          fiscalYearEnd: this.createISODateString(
            "fe",
            breakdown,
            this.currentDate.getFullYear()
          ),
        };
      }
    } else {
      return;
    }
  }

  /**
   * Returns current fiscal year data
   */
  private currentFiscalYear(country: CountryInfo, date: string): FiscalData {
    if (country || date) {
      const breakdown = country
        ? this.getDateBreakdownByCountry(country)
        : this.getDateBreakdownByDate(date);
      if (
        this.currentDate.getMonth() + 1 <= breakdown.fe.month &&
        this.currentDate.getDate() <= breakdown.fe.day
      ) {
        return {
          period: "current",
          fiscalYearStart: this.createISODateString(
            "fs",
            breakdown,
            this.currentDate.getFullYear() - 1
          ),
          fiscalYearEnd: this.createISODateString(
            "fe",
            breakdown,
            this.currentDate.getFullYear()
          ),
        };
      } else {
        return {
          period: "current",
          fiscalYearStart: this.createISODateString(
            "fs",
            breakdown,
            this.currentDate.getFullYear()
          ),
          fiscalYearEnd: this.createISODateString(
            "fe",
            breakdown,
            this.currentDate.getFullYear() + 1
          ),
        };
      }
    } else {
      return;
    }
  }

  /**
   * Returns next fiscal year data
   */
  private nextFiscalYear(country: CountryInfo, date: string): FiscalData {
    if (country || date) {
      const breakdown = country
        ? this.getDateBreakdownByCountry(country)
        : this.getDateBreakdownByDate(date);
      if (
        this.currentDate.getMonth() + 1 <= breakdown.fe.month &&
        this.currentDate.getDate() <= breakdown.fe.day
      ) {
        return {
          period: "next",
          fiscalYearStart: this.createISODateString(
            "fs",
            breakdown,
            this.currentDate.getFullYear()
          ),
          fiscalYearEnd: this.createISODateString(
            "fe",
            breakdown,
            this.currentDate.getFullYear() + 1
          ),
        };
      } else {
        return {
          period: "next",
          fiscalYearStart: this.createISODateString(
            "fs",
            breakdown,
            this.currentDate.getFullYear() + 1
          ),
          fiscalYearEnd: this.createISODateString(
            "fe",
            breakdown,
            this.currentDate.getFullYear() + 2
          ),
        };
      }
    } else {
      return;
    }
  }

  /**
   * Creates the date ISO String
   */
  private createISODateString(
    period: "fs" | "fe",
    breakdown: DateBreakdown,
    year: number
  ): string {
    return new Date(
      year,
      breakdown[period].month -1,
      breakdown[period].day
    ).toISOString();
  }
}
