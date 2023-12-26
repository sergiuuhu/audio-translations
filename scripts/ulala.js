const fs = require("fs");
const axios = require("axios");

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

const processModules = async () => {
  const mpath = `../public/modules`;

  const mfiles = fs.readdirSync(mpath);

  for (const f of mfiles) {
    if (!f.endsWith(".txt")) continue;

    const m = f.replace(".txt", "");

    const mdata = fs.readFileSync(`${mpath}/${f}`, "utf8");
    const mlines = mdata.split("\n");

    for (const l of mlines) {
      if (!l) continue;

      for (const v in voices) {
        const vid = voices[v];
        const lpath = `${mpath}/${v}/${m}`;

        if (!fs.existsSync(`${lpath}/${l}.mp3`)) {
          await generateAudio(vid, l, lpath);
        }
      }
    }

    fs.unlinkSync(`${mpath}/${f}`);
    console.log(`File deleted: ${f}`);
  }

  generateModulesJson();

  console.log("Done!");
};

const generateAudio = (voice, text, path) => {
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
      const writer = fs.createWriteStream(`${path}/${text}.mp3`);

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

const generateModulesJson = () => {
  const modules = fs.readdirSync("../public/modules");

  let json = {
    modules: {},
  };

  console.log(modules);

  for (const m of modules) {
    json["modules"][m] = {};

    const dirs = fs.readdirSync(`../public/modules/${m}`);

    for (const d of dirs) {
      const dPath = `../public/modules/${m}/${d}`;
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

  console.log(json);

  // fs.unlinkSync(`./src/modules.json`);

  fs.writeFileSync(`../src/modules.json`, JSON.stringify(json));
};

processModules();

const privacy = `
# Privacy Policy

Last Updated: 26 September 2023

## Introduction

3M DIGITAL LTD, trading as English Flow ("we," "us," or "our"), is committed to protecting the privacy and personal information of our users. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our website and services. By accessing or using our services, you agree to the terms and practices described in this Privacy Policy.

## Information We Collect

We may collect the following types of information:

- Personal Information: We may collect personal information, including but not limited to your name, email address, and other contact details when you provide them voluntarily.

- Usage Data: We may collect data about your interactions with our website and services, including IP addresses, browser information, and other usage details.

## How We Use Your Information

We use your information for the following purposes:

- To provide and improve our services, including delivering content, features, and customer support.

- To communicate with you, including sending updates, newsletters, and promotional materials.

- To analyze and enhance user experience and to monitor the usage of our services.

## Information Sharing

We do not sell, rent, or trade your personal information to third parties. However, we may share your information with trusted service providers who assist us in delivering our services. We require these service providers to uphold the same level of data protection and security as we do.

## Security

We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.

## Your Choices

You can review and update your personal information by contacting us at [team@englishflow.ai](mailto:team@englishflow.ai). You may also unsubscribe from our communications at any time.

## Changes to this Privacy Policy

We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting a revised Privacy Policy on our website.

## Contact Us

If you have any questions or concerns about our Privacy Policy or data practices, please contact us at:

3M DIGITAL LTD - Trading as English Flow.  
Registered Office: 71-75 Shelton Street, Covent Garden, WC2H 9JQ, London, United Kingdom.  
Email: [team@englishflow.ai](mailto:team@englishflow.ai)
`;

const terms = `
# Terms of Use

Last Updated: 26 September 2023

## Terms of Use

Welcome to English Flow, a product offered by 3M DIGITAL LTD (referred to as "we," "us," or "our"). These Terms of Use govern your use of our website and services. By accessing or using our services, you agree to abide by these terms and conditions.

## Use of Our Services

You must use our services in compliance with these terms and all applicable laws and regulations. You may use our services for personal, non-commercial purposes.

## Intellectual Property

All content and materials provided on our website, including but not limited to text, graphics, logos, images, and software, are protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from our content without our prior written consent.

## User Content

When you use our services, you may submit user-generated content. By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute that content for the purpose of providing our services.

You are responsible for the content you submit, and it must not violate any applicable laws or infringe upon the rights of others.

## Privacy

Your use of our services is also governed by our Privacy Policy, which can be found at [Privacy Policy](/privacy-policy). Please review this policy to understand how we collect, use, and protect your information.

## Termination

We reserve the right to terminate or suspend your access to our services at our discretion, without notice, if you violate these terms or engage in any conduct that we deem harmful to other users or us.

## Disclaimers

- Our services are provided "as is" and "as available," without warranties of any kind, either express or implied.

- We do not guarantee the accuracy or completeness of any content on our website.

## Limitation of Liability

We shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of our services.

## Governing Law

These Terms of Use are governed by the laws of England and Wales. Any disputes arising from or related to these terms shall be subject to the exclusive jurisdiction of the courts in England and Wales.

## Contact Us

If you have any questions or concerns about these Terms of Use, please contact us at:

3M DIGITAL LTD - Trading as English Flow.  
Registered Office: 71-75 Shelton Street, Covent Garden, WC2H 9JQ, London, United Kingdom.  
Email: [team@englishflow.ai](mailto:team@englishflow.ai)
`;
