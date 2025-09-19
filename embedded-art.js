/* Remote featured card artwork mapping. */
(function (global) {
  const remoteArtEntries = [
    [
      "ancient-treant",
      "https://github.com/flezz60-creator/test/blob/bbe64f2576318157c1bcb844ccd33d0cc62274ac/ancient%20treant.jpg?raw=1",
    ],
  ];

  const artMap = new Map(remoteArtEntries);
  if (global && typeof global === "object") {
    global.embeddedCardArt = artMap;
  }
})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : {}));
