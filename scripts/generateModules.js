const fs = require("fs");

const folder = `../modules`;

const generateModulesJson = () => {
  const modules = fs.readdirSync(folder);

  let json = {
    modules: {},
  };

  console.log(modules);

  for (const m of modules) {
    json["modules"][m] = {};

    const dirs = fs.readdirSync(`${folder}/${m}`);

    for (const d of dirs) {
      const dPath = `${folder}/${m}/${d}`;
      const dir = fs.readdirSync(dPath);

      // let sorted = dir.sort((a, b) => {
      //  let aStat = fs.statSync(`${dPath}/${a}`),
      //   bStat = fs.statSync(`${dPath}/${b}`);

      //  return (
      //   new Date(aStat.birthtime).getTime() -
      //   new Date(bStat.birthtime).getTime()
      //  );
      // });

      const texts = fs.readFileSync(`../texts/free/${d}.txt`, "utf8");
      const textsArr = texts.split("\n");

      const filesJson = {};

      for (const lineIndex in textsArr) {
        const text = textsArr[lineIndex];
        const fileName = `${lineIndex.padStart(3, "0")}.mp3`;

        const found = dir.find((o) => o === fileName);

        if (found) {
          filesJson[fileName] = text;
        }
      }

      json["modules"][m][d] = filesJson;
    }
  }

  fs.writeFileSync(`../modules.json`, JSON.stringify(json));
};

generateModulesJson();
