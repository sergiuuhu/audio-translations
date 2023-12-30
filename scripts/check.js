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

      const fileName = `${lineIndex.padStart(3, "0")}.mp3`;

      let allGood = true;

      for (const voice of voices) {
        const checkPath = path.join("../modules", voice, moduleTitle, fileName);

        if (!fs.existsSync(checkPath)) {
          console.log("File does not exist", checkPath);
        }
      }

      // if (fs.existsSync(checkPath)) {
      //   console.log("File does not exist", checkPath);
      // }
    }
  }

  console.log("Done!");
};

processModules();
