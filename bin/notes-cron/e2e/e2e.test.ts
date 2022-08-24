import fs from "fs/promises";
import { run } from "../index";
import path from "path";
import moment from "moment";

const fp = (filePath: string = "") =>
  path.join(__dirname, "test-notes", filePath);
const date = moment().subtract(3, "years").format("MMM YYYY"); // eg: Jan 2019

describe("e2e tests", () => {
  beforeEach(async () => {
    await fs.rm(fp(), { recursive: true, force: true });
    await fs.mkdir(fp('dir'), { recursive: true });
    await fs.writeFile(
      fp("1.md"),
      `testing ago(${date}), ago(${date} ~ 2 months ago)`
    );

    await fs.writeFile(
      fp("dir/2.md"),
      `testing duration(${date}), duration(${date} ~ 2 months ago)\ntesting age(${date}), age(${date} ~ 2 months ago), remind(June 2020 ~ Test reminder)`
    );
  });

  afterEach(async () => {
    await fs.rm(fp(), { recursive: true, force: true });
  });

  test("test everything", async () => {
    await run(fp());
    const content1 = await fs.readFile(fp("1.md"), "utf8");
    expect(content1).toBe(
      `testing ago(${date} ~ 3 years ago), ago(${date} ~ 3 years ago)`
    );

    const content2 = await fs.readFile(fp("dir/2.md"), "utf8");
    expect(content2).toBe(
      `testing duration(${date} ~ for 3 years), duration(${date} ~ for 3 years)\ntesting age(${date} ~ 3 years old), age(${date} ~ 3 years old), reminded(June 2020 ~ Test reminder)`
    );
  });
});
