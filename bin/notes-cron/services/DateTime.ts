import moment from "moment";

export interface IDateTimeClient {
  (dateString: string | Date): {
    isValid: () => boolean;
    fromNow: () => string;
  };
}

export class DateTime {
  dateTimeClient: IDateTimeClient;
  constructor(dateTimeClient: IDateTimeClient = moment) {
    this.dateTimeClient = dateTimeClient;
  }

  ago(dateString: string) {
    // Convert to date to avoid moment.js deprecation warning, as it's ok we're using the Date 
    // constructor; despite its deficiencies it works fine for the date strings we'll use in notes
    const d = this.dateTimeClient(new Date(dateString));
    if (!d.isValid()) {
      throw new Error("Invalid date");
    }

    return d.fromNow();
  }

  age(dateString: string) {
    const agoString = this.ago(dateString);
    return agoString.replace("ago", "old");
  }

  duration(dateString: string) {
    const agoString = this.ago(dateString);
    return "for " + agoString.replace("ago", "").trim();
  }

  isPast(dateString: string) {
    const agoString = this.ago(dateString);
    return agoString.includes('ago'); // TODO fix this hackiness and add tests
  }
}
