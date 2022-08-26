import { run, TFnDef } from "./index";
import { File } from "./utils/File";
import { EmailClient } from "./services/EmailClient";

import mockFs from "mock-fs";
import { IContext } from "./template-functions";

jest.mock("./services/EmailClient");

describe("index -> run", () => {
  beforeEach(() => {
    (EmailClient as unknown as jest.Mock<EmailClient>).mockClear();
  });

  const fnDefs: TFnDef[] = [
    [
      "allCaps",
      (ctx: IContext) => {
        return { ...ctx, currentValue: ctx.param.toUpperCase() };
      },
    ],
    [
      "double",
      (ctx: IContext) => {
        return {
          ...ctx,
          currentValue: ctx.param + ctx.param + "",
        };
      },
    ],
  ];
  const fileTree = {
    notes: {
      "1.md": "first allCaps(note) double(test)",
      "ignore.jpg": "",
      dir: {
        "2.md": "second note double(test ~ testtest)",
        "3.md": "no changes",
        "4.md": "remind(July 2020 ~ Test reminder)",
        "ignore.pdf": "",
      },
    },
  };

  beforeEach(() => {
    mockFs(fileTree);
  });

  afterEach(() => {
    mockFs.restore();
  });

  // TODO fix test
  // test("throws if missing email", async () => {
  //   await expect(() => run('notes', '', '+12345678', fnDefs)).toThrowError();
  // })

  test("runs template function correctly", async () => {
    await run("notes", "testemail@example.com", "+12345678", fnDefs);
    const newContent1 = await File.read("notes/1.md");
    expect(newContent1).toBe(
      "first allCaps(note ~ NOTE) double(test ~ testtest)"
    );

    const newContent2 = await File.read("notes/dir/2.md");
    expect(newContent2).toBe("second note double(test ~ testtest)");

    const newContent3 = await File.read("notes/dir/3.md");
    expect(newContent3).toBe("no changes");
  });
});
