const fs = require("fs");
const axios = require("axios");
const path = require("path");

const voices = [
  "American (Male)",
  "American (Female)",
  "British (Male)",
  "British (Female)",
];

const processModules = async () => {
  const folder = "../texts/free";

  const mfiles = fs.readdirSync(folder);

  for (const module of mfiles) {
    const moduleTitle = module.replace(".txt", "");

    const mdata = fs.readFileSync(`${folder}/${module}`, "utf8");
    const textLines = mdata.split("\n");

    for (const lineIndex in textLines) {
      const line = textLines[lineIndex];

      if (!line) continue;

      for (const voice of voices) {
        const oldFileName = `${Buffer.from(line.trim()).toString("hex")}.mp3`;
        const newFileName = `${lineIndex.padStart(3, "0")}.mp3`;

        const oldPath = path.join(
          "../modules",
          voice,
          moduleTitle,
          oldFileName,
        );
        const newPath = path.join(
          "../modules",
          voice,
          moduleTitle,
          newFileName,
        );

        try {
          fs.renameSync(oldPath, newPath);
        } catch (error) {
          console.log("couldnt rename", oldPath, newPath);
        }
      }
    }
  }

  console.log("Done!");
};

processModules();
