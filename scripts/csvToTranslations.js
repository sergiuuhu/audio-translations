const csvToTranslations = (text) => {
  const langs = [
    {
      language: "EN",
      name: "English",
      supports_formality: false,
      flag: "🇬🇧",
      speakers: "approximately 3 billion",
      speakers_int: 3000000000,
    },
    {
      language: "ZH",
      name: "Chinese",
      name2: "Chinese (simplified)",
      supports_formality: false,
      flag: "🇨🇳",
      speakers: "approximately 1.2 billion",
      speakers_int: 1200000000,
    },
    {
      language: "ES",
      name: "Spanish",
      supports_formality: true,
      flag: "🇪🇸",
      speakers: "approximately 460 million",
      speakers_int: 460000000,
    },
    // {
    //   language: "EN-US",
    //   name: "English (American)",
    //   supports_formality: false,
    //   flag: "🇺🇸",
    //   speakers: "approximately 331 million",
    //   speakers_int: 331000000,
    // },
    {
      language: "RU",
      name: "Russian",
      supports_formality: true,
      flag: "🇷🇺",
      speakers: "approximately 258 million",
      speakers_int: 258000000,
    },
    {
      language: "PT-BR",
      name: "Portuguese",
      name2: "Portuguese (Brazilian)",
      supports_formality: true,
      flag: "🇧🇷",
      speakers: "approximately 214 million",
      speakers_int: 214000000,
    },
    {
      language: "JA",
      name: "Japanese",
      supports_formality: true,
      flag: "🇯🇵",
      speakers: "approximately 128 million",
      speakers_int: 128000000,
    },
    {
      language: "DE",
      name: "German",
      supports_formality: true,
      flag: "🇩🇪",
      speakers: "approximately 90 million",
      speakers_int: 90000000,
    },
    {
      language: "TR",
      name: "Turkish",
      supports_formality: false,
      flag: "🇹🇷",
      speakers: "approximately 84 million",
      speakers_int: 84000000,
    },
    {
      language: "KO",
      name: "Korean",
      supports_formality: false,
      flag: "🇰🇷",
      speakers: "approximately 77 million",
      speakers_int: 77000000,
    },
    {
      language: "FR",
      name: "French",
      supports_formality: true,
      flag: "🇫🇷",
      speakers: "approximately 76 million",
      speakers_int: 76000000,
    },
    // {
    //   language: "EN-GB",
    //   name: "English (British)",
    //   supports_formality: false,
    //   flag: "🇬🇧",
    //   speakers: "approximately 67 million",
    //   speakers_int: 67000000,
    // },
    {
      language: "IT",
      name: "Italian",
      supports_formality: true,
      flag: "🇮🇹",
      speakers: "approximately 67 million",
      speakers_int: 67000000,
    },
    {
      language: "ID",
      name: "Indonesian",
      supports_formality: false,
      flag: "🇮🇩",
      speakers: "approximately 43 million",
      speakers_int: 43000000,
    },
    {
      language: "PL",
      name: "Polish",
      supports_formality: true,
      flag: "🇵🇱",
      speakers: "approximately 40 million",
      speakers_int: 40000000,
    },
    {
      language: "UK",
      name: "Ukrainian",
      supports_formality: false,
      flag: "🇺🇦",
      speakers: "approximately 37 million",
      speakers_int: 37000000,
    },
    {
      language: "NL",
      name: "Dutch",
      supports_formality: true,
      flag: "🇳🇱",
      speakers: "approximately 24 million",
      speakers_int: 24000000,
    },
    {
      language: "RO",
      name: "Romanian",
      supports_formality: false,
      flag: "🇷🇴",
      speakers: "approximately 24 million",
      speakers_int: 24000000,
    },
    {
      language: "EL",
      name: "Greek",
      supports_formality: false,
      flag: "🇬🇷",
      speakers: "approximately 13 million",
      speakers_int: 13000000,
    },
    {
      language: "HU",
      name: "Hungarian",
      supports_formality: false,
      flag: "🇭🇺",
      speakers: "approximately 13 million",
      speakers_int: 13000000,
    },
    {
      language: "CS",
      name: "Czech",
      supports_formality: false,
      flag: "🇨🇿",
      speakers: "approximately 10 million",
      speakers_int: 10000000,
    },
    {
      language: "PT-PT",
      name: "Portuguese",
      name2: "Portuguese (European)",
      supports_formality: true,
      flag: "🇵🇹",
      speakers: "approximately 10 million",
      speakers_int: 10000000,
    },
    {
      language: "SV",
      name: "Swedish",
      supports_formality: false,
      flag: "🇸🇪",
      speakers: "approximately 10 million",
      speakers_int: 10000000,
    },
    {
      language: "BG",
      name: "Bulgarian",
      supports_formality: false,
      flag: "🇧🇬",
      speakers: "approximately 9 million",
      speakers_int: 9000000,
    },
    {
      language: "DA",
      name: "Danish",
      supports_formality: false,
      flag: "🇩🇰",
      speakers: "approximately 5.5 million",
      speakers_int: 5500000,
    },
    {
      language: "FI",
      name: "Finnish",
      supports_formality: false,
      flag: "🇫🇮",
      speakers: "approximately 5.5 million",
      speakers_int: 5500000,
    },
    {
      language: "SK",
      name: "Slovak",
      supports_formality: false,
      flag: "🇸🇰",
      speakers: "approximately 5.4 million",
      speakers_int: 5400000,
    },
    {
      language: "NB",
      name: "Norwegian",
      name2: "Norwegian (Bokmål)",
      supports_formality: false,
      flag: "🇳🇴",
      speakers: "approximately 5.3 million",
      speakers_int: 5300000,
    },
    {
      language: "LT",
      name: "Lithuanian",
      supports_formality: false,
      flag: "🇱🇹",
      speakers: "approximately 2.8 million",
      speakers_int: 2800000,
    },
    {
      language: "SL",
      name: "Slovenian",
      supports_formality: false,
      flag: "🇸🇮",
      speakers: "approximately 2.5 million",
      speakers_int: 2500000,
    },
    {
      language: "LV",
      name: "Latvian",
      supports_formality: false,
      flag: "🇱🇻",
      speakers: "approximately 1.5 million",
      speakers_int: 1500000,
    },
    {
      language: "ET",
      name: "Estonian",
      supports_formality: false,
      flag: "🇪🇪",
      speakers: "approximately 1.3 million",
      speakers_int: 1300000,
    },
  ];

  const byLine = text.split("\n");

  const translations = {};

  for (const lineIndex in byLine) {
    const line = byLine[lineIndex];
    const byTab = line.split("\t");

    translations[byTab[0]] = {};

    for (const tabIndex in byTab) {
      if (tabIndex == 0) continue;

      const value = byTab[tabIndex];

      translations[byTab[0]][langs[tabIndex]["language"]] = value;
    }
  }

  return translations;
};

export default csvToTranslations;
