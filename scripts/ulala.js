const fs = require("fs");
const axios = require("axios");
const path = require("path");

if (!process.argv[2]) {
  console.log("No elevenlabs key specified.");
  process.exit(1);
}

const key = process.argv[2];

const voices = {
  // Liam, american, narration, young, male, TX3LPaxmHKxFdv7VOQHJ
  "American (Male)": "TX3LPaxmHKxFdv7VOQHJ",
  // Matilda, american, warm, young, female, XrExE9yKIg1WjnnlVkGX
  "American (Female)": "XrExE9yKIg1WjnnlVkGX",
  // Matthew, british, calm, middle aged, male, Yko7PKHZNXotIFUBG7I9
  "British (Male)": "Yko7PKHZNXotIFUBG7I9",
  // Dorothy, british
  "British (Female)": "ThT5KcBeYPX3keUQqHPh",
};

const folder = "../business"

const processModules = async () => {
  const mpath = folder;

  const mfiles = fs.readdirSync(mpath);

  for (const f of mfiles) {
    if (!f.endsWith(".txt")) continue;

    const m = f.replace(".txt", "");

    const mdata = fs.readFileSync(`${mpath}/${f}`, "utf8");
    const mlines = mdata.split("\n");

    for (const li in mlines) {
      const l = mlines[li];

      if (!l) continue;

      for (const v in voices) {
        const vid = voices[v];

        const lpath = path.join(mpath, v, m);

        const checkFileName = encodeURIComponent(l.trim());

        const fileNumber = li.padStart(3, "0");

        if (!fs.existsSync(`${lpath}/${fileNumber}.mp3`)) {
          await generateAudio(vid, l, lpath, fileNumber);
        }
      }
    }

    fs.unlinkSync(`${mpath}/${f}`);
    console.log(`File deleted: ${f}`);
  }

  console.log("Done!");
};

const generateAudio = (voice, text, path, fileNumber) => {
  text = text.trim();

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice}`;

  const headers = {
    Accept: "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": key,
  };

  const data = {
    text: `  ${text}  `,
    model_id: "eleven_monolingual_v1",
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.5,
    },
  };

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  return axios
    .post(url, data, { headers, responseType: "stream" })
    .then((response) => {
      const writer = fs.createWriteStream(`${path}/${fileNumber}.mp3`);

      response.data.on("data", (chunk) => {
        writer.write(chunk);
      });

      response.data.on("end", () => {
        writer.end();
        console.log(`${text}.mp3 downloaded successfully!`);
      });
    })
    .catch((error) => {
      console.error(`Error downloading ${text}.mp3`, error);
      process.exit(0);
    });
};


processModules();
