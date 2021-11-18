const fs = require("fs");

module.exports = (fileList, targetPath) => {
  let content = "";

  if (!Array.isArray(fileList)) {
    console.error("file list is not correct.");
    process.exit(0);
  }

  for (let i of fileList) {
    const fsContent = fs.readFileSync(i, { encoding: "utf8" });

    console.log(`include types from ${i}`);

    content += `# include from ${/(.*)?\/(.*\/.*)$/.exec(i)?.[2]}`;

    content += "\r\n";
    content += fsContent;
    content += "\r\n";
    content += "\r\n";
  }

  console.log("schemal.graphql is generated.");

  fs.writeFileSync(targetPath, content, { encoding: "utf8" });
};
