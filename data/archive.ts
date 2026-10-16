const P = "/images/";
const img = (f: string) => P + encodeURI(f);
export const collections = [
  {
    title: "Photography",
    description:
      "Documentary work, portraits, the people and places seen through the lens.",
    image: img("Image@2x (3).webp"),
  },
  {
    title: "Music",
    description:
      "Genres, artists, recordings, and the movements shaped by sound.",
    image: img("Image@2x (4).webp"),
  },
  {
    title: "Fashion",
    description:
      "Designers, textiles, silhouettes, and the evolution of Nigerian style.",
    image: img("Image@2x (5).webp"),
  },
  {
    title: "Art",
    description:
      "Painting, sculpture and visual art that carry Nigerian stories across generations.",
    image: img("Image@2x (6).webp"),
  },
  {
    title: "Design",
    description:
      "Graphic design, typography, posters, publishing, and the objects that shaped a visual landscape.",
    image: img("Image@2x (7).webp"),
  },
  {
    title: "Stories",
    description:
      "Essays, cultural notes and narratives that connect the collections.",
    image: img("Image@2x (8).webp"),
  },
];
export const featured = [
  {
    title: "ife memorial head",
    caption: "Yoruba · particularly around the 14th–15th centuries",
    image: img("Image (1).webp"),
  },
  {
    title: "BRONZE WARRIOR FIGURE",
    caption: "Edo · date to be confirmed",
    image: img("Image@2x.webp"),
  },
  {
    title: "QUEEN MOTHER PENDANT MASK (Iyoba)",
    caption: "Kingdom of Benin · 16th century, likely early 1500s",
    image: img("Image@2x (1).webp"),
  },
  {
    title: "memorial bust of a queen mother",
    caption: "Edo · early 16th century, approximately 1500–1550 AD",
    image: img("Image@2x (2).webp"),
  },
];
export const people: {
  title: string;
  caption: string;
  image: string;
  alternate?: string;
}[] = [
  {
    title: "VIsual artist",
    caption: "Njideka Akunyili Crosby (The Beautyful ones)",
    image: img("Image@2x (9).webp"),
    alternate: img("beautyfulones.webp"),
  },
  {
    title: "Musician",
    caption: "Davido (Hayya Hayya - Better Together)",
    image: img("Image@2x (10).webp"),
    alternate: img("hayyahayya.webp"),
  },
  {
    title: "Fashion designer",
    caption: "Duro Olowu (The Duro Dress)",
    image: img("Image@2x (11).webp"),
    alternate: img("durodress.webp"),
  },
  {
    title: "visual artist",
    caption: "Peju Alatise (TheMail)",
    image: img("Image@2x (12).webp"),
    alternate: img("Image@2x (6).webp"),
  },
];
export const categories = [
  {
    title: "Music",
    sentence: "The artists and recordings that defined a movement.",
    image: collections[1].image,
  },
  {
    title: "Fashion",
    sentence: "The clothing and styling its performers made visible.",
    image: img("fashion.webp"),
  },
  {
    title: "Design",
    sentence: "The fashion, silhouettes, and iconic structures that shaped the streets.",
    image: img("design.webp"),
  },
  {
    title: "Photography",
    sentence: "The photographers who documented its people and nights.",
    image: img("photography.webp"),
  },
];
export const acrossDefaultImage = img("Image@2x (13).webp");
export const aboutImage = img("Image@2x (14).webp");
export const aboutRows = [
  [
    "Why we exist",
    "Nigerian creative work is made every day and lost just as often. Archive documents it so it stays open to everyone.",
  ],
  [
    "What we keep",
    "Photographs, recordings, garments, posters and print, from every period and region.",
  ],
  [
    "How it works",
    "Four collections, one timeline. Each story links the people, objects and places behind it.",
  ],
  [
    "Contribute",
    "Hold photographs, recordings, garments or posters worth keeping? Share them or the knowledge behind them.",
  ],
];
export const trailImages = [...people, ...featured, ...collections].map(
  (i) => i.image,
);
export const nav: [string, string | null][] = [
  ["Explore", "#collections"],
  ["Timeline", null],
  ["Stories", null],
  ["About", "#about"],
];
