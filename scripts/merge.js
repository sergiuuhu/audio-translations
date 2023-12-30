const path = require("path");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");

const voice = "British (Male)";
const moduleName = "01. Sounding authentic";
const modulePath = `../business/${voice}/${moduleName}`;

const files = fs
  .readdirSync(modulePath)
  .filter((file) => file.endsWith(".mp3"));

const mp3Files = files
  .filter((o) => !o.includes("Play"))
  .map((file) => path.join(modulePath, file));

// Function to merge MP3 files with a second of silence between each
function mergeMP3FilesWithSilence(audioFiles, output, repeat = 1) {
  const command = ffmpeg();

  const texts = fs.readFileSync(`../texts/business/${moduleName}.txt`, "utf8");
  const textsArr = texts.split("\n");

  // Iterate through each input file
  audioFiles.forEach((af, index) => {
    const seconds = Math.ceil(textsArr[index].length / 20 + 0.2);

    for (let i = 0; i < repeat; i++) {
      command.input(af);

      for (let l = 0; l < seconds; l++) {
        command.input("./audio/silence.mp3");
      }
    }
  });

  const writeTo = path.join(modulePath, output);

  if (fs.existsSync(writeTo)) {
    fs.unlinkSync(writeTo);
  }

  // Merge and output to the specified file
  command
    .mergeToFile(writeTo)
    .on("end", () => {
      console.log("Merging finished. Output file:", output);
    })
    .on("error", (err, stdout, stderr) => {
      console.error("Error:", err);
      console.error("FFmpeg Output:", stdout);
      console.error("FFmpeg Error:", stderr);
    });
}

mergeMP3FilesWithSilence(mp3Files, `PlayAll.mp3`, 1);
