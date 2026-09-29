/* eslint-disable @typescript-eslint/no-var-requires */
const {
  formatLogForCopy,
}: {
  formatLogForCopy: (log: {
    otherFields?: Record<string, unknown>;
    raw?: string;
  }) => string;
} = require("./logCopy.js");

describe("webview logCopy", () => {
  describe("formatLogForCopy", () => {
    it("should pretty-print all fields as JSON with 2-space indentation", () => {
      const log = {
        otherFields: { time: "2024-01-01T00:00:00Z", level: "INFO", msg: "hello" },
        raw: '{"time":"2024-01-01T00:00:00Z","level":"INFO","msg":"hello"}',
      };

      expect(formatLogForCopy(log)).toBe(
        '{\n  "time": "2024-01-01T00:00:00Z",\n  "level": "INFO",\n  "msg": "hello"\n}',
      );
    });

    it("should pretty-print nested objects and arrays", () => {
      const log = {
        otherFields: { user: { id: 1, tags: ["a", "b"] } },
        raw: "",
      };

      expect(formatLogForCopy(log)).toBe(
        '{\n  "user": {\n    "id": 1,\n    "tags": [\n      "a",\n      "b"\n    ]\n  }\n}',
      );
    });

    it("should fall back to the raw line when there are no fields", () => {
      expect(formatLogForCopy({ otherFields: {}, raw: "plain text line" })).toBe(
        "plain text line",
      );
      expect(formatLogForCopy({ raw: "plain text line" })).toBe("plain text line");
    });

    it("should return an empty string when there are no fields and no raw line", () => {
      expect(formatLogForCopy({ otherFields: {} })).toBe("");
    });
  });
});
