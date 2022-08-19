import mockFs from "mock-fs";
import { File } from "./File";

const fileTree = {
  notes: {
    "1.md": "first note",
    "ignore.jpg": "",
    dir: {
      "2.md": "second note",
      "ignore.pdf": "",
    },
  },
};

describe("File", () => {
  beforeEach(() => {
    mockFs(fileTree);
  });

  afterEach(() => {
    mockFs.restore();
  });

  describe("list", () => {
    test("lists files according to glob", async () => {
      const list = await File.list("**/*.md");
      expect(list).toEqual(["notes/1.md", "notes/dir/2.md"]);
    });

    test("returns [] if no matches", async () => {
      const list = await File.list("**/*.nope");
      expect(list).toEqual([]);
    });
  });

  describe("read", () => {
    test("correctly reads an existing file", async () => {
      const content = await File.read("notes/dir/2.md");
      expect(content).toBe("second note");
    });

    test("rejects if invalid file path", async () => {
      expect.assertions(1);
      await expect(File.read("notes/dir/nope.md")).rejects.toEqual(
        new Error("ENOENT, no such file or directory 'notes/dir/nope.md'")
      );
    });
  });

  describe("write", () => {
    test("correctly reads an existing file", async () => {
      const file = "notes/dir/2.md";
      const expectedContent = "test content";
      await File.write(file, expectedContent);
      const content = await File.read(file);
      expect(content).toBe(expectedContent);
    });

    test("rejects if invalid file path", async () => {
      expect.assertions(1);
      await expect(
        File.write("notes/dir/nope.md", "test content")
      ).rejects.toEqual(
        new Error(
          "File does not exist, or you do not have permission to write to it"
        )
      );
    });
  });
});
