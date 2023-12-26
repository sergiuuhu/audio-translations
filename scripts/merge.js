const path = require("path");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");

if (!process.argv[2]) {
  console.log("No path speficied.");
  process.exit(1);
}

if (!process.argv[3]) {
  console.log("No file name speficied.");
  process.exit(1);
}

const files = fs
  .readdirSync(process.argv[2])
  .filter((file) => file.endsWith(".mp3"));

const mp3Files = files.map((file) => path.join(process.argv[2], file));

// Output file name
const outputFileName = `${process.argv[3]}.mp3`;

// Function to merge MP3 files with a second of silence between each
function mergeMP3FilesWithSilence(audioFiles, output) {
  const command = ffmpeg();

  // Iterate through each input file
  audioFiles.forEach((af, index) => {
    const seconds = Math.ceil(files[index].length / 20 + 0.2);

    // command
    //   .input("anullsrc=r=44100:cl=stereo")
    //   .inputFormat("lavfi")
    //   .audioCodec("libmp3lame")
    //   .duration(seconds);

    command.input(af);

    for (let l = 0; l < seconds; l++) {
      command.input("./audio/silence.mp3");
    }
  });

  // Merge and output to the specified file
  command
    .mergeToFile(output, "./audio")
    .on("end", () => {
      console.log("Merging finished. Output file:", output);
    })
    .on("error", (err, stdout, stderr) => {
      console.error("Error:", err);
      console.error("FFmpeg Output:", stdout);
      console.error("FFmpeg Error:", stderr);
    });
}

// Call the function to merge MP3 files
mergeMP3FilesWithSilence(mp3Files, outputFileName);
