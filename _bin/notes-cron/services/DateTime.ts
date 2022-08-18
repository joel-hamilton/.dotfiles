import moment from "moment";

export interface IDateTimeClient {
  (dateString: string): {
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
    const d = this.dateTimeClient(dateString);
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
}
