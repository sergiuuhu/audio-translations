const fs = require("fs");

const folder = `../modules`

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

   let sorted = dir.sort((a, b) => {
    let aStat = fs.statSync(`${dPath}/${a}`),
     bStat = fs.statSync(`${dPath}/${b}`);

    return (
     new Date(aStat.birthtime).getTime() -
     new Date(bStat.birthtime).getTime()
    );
   });

   json["modules"][m][d] = sorted;
  }
 }

 fs.writeFileSync(`../modules.json`, JSON.stringify(json));
};

generateModulesJson();