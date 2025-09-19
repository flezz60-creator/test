/* Remote featured card artwork mapping. */
(function (global) {
  const remoteArtEntries = [
    [
      "ancient-treant",
      "https://raw.githubusercontent.com/flezz60-creator/test/bbe64f2576318157c1bcb844ccd33d0cc62274ac/ancient%20treant.jpg",
    ],
    [
      "embercap-shaman",
      "https://raw.githubusercontent.com/flezz60-creator/test/bbe64f2576318157c1bcb844ccd33d0cc62274ac/embercap%20shaman.jpg",
    ],
    [
      "petal-warden",
      "https://raw.githubusercontent.com/flezz60-creator/test/bbe64f2576318157c1bcb844ccd33d0cc62274ac/petal%20warden.jpg",
    ],
  ];

  const artMap = new Map(remoteArtEntries);
  if (global && typeof global === "object") {
    global.embeddedCardArt = artMap;
  }
})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : {}));
