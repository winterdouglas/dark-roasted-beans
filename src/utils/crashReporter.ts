import i18n from "~lib/i18n/i18n";

export enum ErrorType {
  /**
   * An error that would normally cause a red screen
   */
  FATAL = "Fatal",
  /**
   * An error caught by try/catch
   */
  HANDLED = "Handled",
}

export const reportCrash = (error: any, type: ErrorType = ErrorType.FATAL) => {
  if (__DEV__) {
    const message = error.message || i18n.t("unknown");
    console.error(error);
    console.log(message, type);
  } else {
    // AppCenter
    // Sentry.captureException(error)
  }
};
