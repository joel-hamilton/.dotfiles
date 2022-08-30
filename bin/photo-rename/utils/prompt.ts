const readline = require("readline");

export const promptBoolean = (query: string): Promise<boolean> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans: string) => {
      rl.close();
      resolve(ans.toLowerCase() === "y");
    })
  );
};
