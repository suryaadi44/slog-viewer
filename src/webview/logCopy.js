"use strict";

(function (root, factory) {
  const utils = factory();
  root.SlogViewerLogCopy = utils;

  if (typeof module === "object" && module.exports) {
    module.exports = utils;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  /**
   * Text placed on the clipboard by a log row's copy button.
   *
   * otherFields holds every field of the source log, so it is pretty-printed
   * as JSON. A log without fields falls back to its raw line so the button
   * never copies a bare `{}`.
   *
   * @param {{ otherFields?: Record<string, unknown>, raw?: string }} log
   * @returns {string}
   */
  function formatLogForCopy(log) {
    const fields = log.otherFields;
    if (fields && Object.keys(fields).length > 0) {
      return JSON.stringify(fields, null, 2);
    }
    return log.raw || "";
  }

  return {
    formatLogForCopy,
  };
});
