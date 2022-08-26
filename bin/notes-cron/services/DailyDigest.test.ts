import { DailyDigest } from "./DailyDigest";
import mockFs from "mock-fs";
import { EmailClient } from "./EmailClient";

jest.mock("./EmailClient");

const fileTree = {
  notes: {
    "First Note.md": `#First Note
    
    Important Text [[Box1]]
    
    [[Box1]]
    Important Paragraph`,
    "ignore.jpg": "",
    dir: {
      "Second Note.md": `#Second Note

      [[box2]] important text
      
      [[box3]] test`,
      "ignore.pdf": "",
    },
  },
};

describe("DailyDigest", () => {
  beforeEach(() => {
    (EmailClient as unknown as jest.Mock<EmailClient>).mockClear();
  });

  describe("setup", () => {
    test("it throws an error if no NOTES_PATH found", () => {
      expect(() => new DailyDigest("", "test@email.com")).toThrowError(
        "missing notesPath"
      );
    });

    test("it throws an error if no NOTES_PATH found", () => {
      expect(() => new DailyDigest("notespath", "")).toThrowError(
        "missing email"
      );
    });
  });

  describe("happy path", () => {
    beforeEach(() => {
      mockFs(fileTree);
    });

    afterEach(() => {
      mockFs.restore();
    });

    test("it correctly creates an HTML file of priority content", async () => {
      const dd = new DailyDigest("notes/**/*.md", "test@email.com");

      await dd.run();
      const expectedHTML = `<h1 id=\"secondnote\">Second Note</h1>
<p>[[box3]] test</p>
<hr>
<h1 id=\"firstnote\">First Note</h1>
<p>Important Text [[Box1]]</p>
<hr>
<h1 id=\"secondnote\">Second Note</h1>
<p>[[box2]] important text</p>
<hr>
<h1 id=\"firstnote\">First Note</h1>
<p>[[Box1]]
    Important Paragraph</p>
<hr>

<hr>
`;

      expect(EmailClient.send).toHaveBeenCalledTimes(1);
      expect(EmailClient.send).toHaveBeenCalledWith(
        "test@email.com",
        "Daily Digest",
        expectedHTML
      );
    });
  });
});
