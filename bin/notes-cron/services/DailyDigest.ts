import { File } from "../utils/File";
import showdown from "showdown";
import path from "path";
import { EmailClient } from "./EmailClient";
type TFileList = string[];

interface IPriorityBuckets {
  ["LOW"]: string[];
  ["MEDIUM"]: string[];
  ["HIGH"]: string[];
}

export class DailyDigest {
  notesPath: string;
  email: string;

  constructor(notesPath: string, email: string) {
    if (!notesPath) {
      throw new Error("missing notesPath");
    }

    if (!email) {
      throw new Error("missing email");
    }

    this.notesPath = notesPath;
    this.email = email;
  }

  async run() {
    const fileList: TFileList = await File.list(this.notesPath);
    const allPriorityContent = await this.getAllPriorityContent(fileList);
    const reducedPriorityContent =
      this.reducePriorityContent(allPriorityContent);
    const sortedPriorityContent = reducedPriorityContent.sort((a, b) =>
      a.length > b.length ? 1 : -1
    );
    const htmlContent = this.convertToHTML(sortedPriorityContent);
    return EmailClient.send(this.email, 'Daily Digest', htmlContent);
  }

  async getAllPriorityContent(fileList: TFileList): Promise<IPriorityBuckets> {
    const priorityBuckets: IPriorityBuckets = {
      LOW: [], // box3,
      MEDIUM: [], // box2,
      HIGH: [], // box3
    };

    for (const file of fileList) {
      const content = await File.read(file);
      addPriorityContent(path.basename(file, ".md"), content);
    }

    function addPriorityContent(filename: string, content: string) {
      function getPriorityBucket(contentChunk: string) {
        if (/\[\[box1\]\]/i.test(contentChunk)) {
          return "HIGH";
        }

        if (/\[\[box2\]\]/i.test(contentChunk)) {
          return "MEDIUM";
        }
        if (/\[\[box3\]\]/i.test(contentChunk)) {
          return "LOW";
        }
      }

      const firstLine = (content || " ").match(/^.*$/m)![0];
      const firstLinePriorityBucket = getPriorityBucket(firstLine);
      if (firstLinePriorityBucket) {
        priorityBuckets[firstLinePriorityBucket].push(
          `# ${filename}\n\n${content}`
        );
      }

      const paragraphs = content.split(/\n\s*\n/);
      paragraphs.forEach((paragraph, i) => {
        if (firstLinePriorityBucket && i === 0) return;

        paragraph = paragraph.trim();
        const priorityBucket = getPriorityBucket(paragraph);

        if (priorityBucket) {
          priorityBuckets[priorityBucket].push(`# ${filename}\n\n${paragraph}`);
        }
      });
    }

    return priorityBuckets;
  }

  reducePriorityContent(allPriorityContent: IPriorityBuckets): string[] {
    let content = [];
    for (let bucket of ["HIGH", "HIGH", "HIGH", "MEDIUM", "MEDIUM", "LOW"]) {
      const randomIndex = getRandomInt(
        0,
        allPriorityContent[bucket as keyof IPriorityBuckets].length - 1
      );

      const randomPriorityContentChunk = allPriorityContent[
        bucket as keyof IPriorityBuckets
      ].splice(randomIndex, 1);
      content.push(randomPriorityContentChunk[0]);
    }

    return content;

    function getRandomInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  }

  convertToHTML(content: string[]): string {
    const converter = new showdown.Converter();
    const html = [];
    for (let md of content) {
      html.push(converter.makeHtml(md));
    }

    return html.join("\n<hr>\n");
  }
}
