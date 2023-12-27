const fs = require("fs");
const path = require("path");

const processModules = async () => {
  const mpath = `../modules`;

  const dir1 = fs.readdirSync(mpath);

  for (const d1 of dir1) {
    const dir2 = fs.readdirSync(`${mpath}/${d1}`);

    for (const d2 of dir2) {
      const dir3 = fs.readdirSync(`${mpath}/${d1}/${d2}`);

      for (const d3 of dir3) {
        const newFileName = Buffer.from(decodeURIComponent(d3.slice(0, -4))).toString("hex");
        
        const from = path.join(mpath, d1, d2, d3)
        const to = path.join(mpath, d1, d2, `${newFileName}.mp3`)

        fs.renameSync(from, to);
      }
    }
  }
  
  console.log("Done!");
};

processModules();
