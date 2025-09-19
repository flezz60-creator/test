/* Remote featured card artwork mapping. */
(function (global) {
  const remoteArtEntries = [
    [
      "ancient-treant",
      "https://github.com/flezz60-creator/test/blob/bbe64f2576318157c1bcb844ccd33d0cc62274ac/ancient%20treant.jpg?raw=1",
    ],
    [
      "avatar-of-the-grove",
      "https://github.com/flezz60-creator/test/blob/befd0c7ef08e4bbbd4d534d70d8a3aff42503b81/avatar%20of%20the%20grove.jpg?raw=1",
    ],
    [
      "druid-of-the-grove",
      "https://github.com/flezz60-creator/test/blob/befd0c7ef08e4bbbd4d534d70d8a3aff42503b81/druid%20of%20the%20grove.jpg?raw=1",
    ],
    [
      "elder-dryad",
      "https://github.com/flezz60-creator/test/blob/befd0c7ef08e4bbbd4d534d70d8a3aff42503b81/elder%20dryad.jpg?raw=1",
    ],
    [
      "forest-guardian",
      "https://github.com/flezz60-creator/test/blob/befd0c7ef08e4bbbd4d534d70d8a3aff42503b81/forest%20guardian.png?raw=1",
    ],
  ];

  const artMap = new Map(remoteArtEntries);
  if (global && typeof global === "object") {
    global.embeddedCardArt = artMap;
  }
})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : {}));
