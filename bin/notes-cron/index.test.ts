import { run, TFnDef } from "./index";
import { File } from "./utils/File";

import mockFs from "mock-fs";
import { IContext } from "./template-functions";
describe("index", () => {
  describe("run", () => {
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

    test("runs ago correctly", async () => {
      await run("notes", fnDefs);
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
});
