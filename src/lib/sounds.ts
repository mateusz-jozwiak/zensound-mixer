export type SoundItem = {
  id: string;
  name: string;
  url: string; // paste your audio file URL here
};

export type SoundCategory = {
  id: string;
  name: string;
  items: SoundItem[];
};

export const SOUNDS: SoundCategory[] = [
  {
    id: "nature-rivers",
    name: "Rivers & Water",
    items: [
      { id: "river", name: "River", url: "" },
      { id: "waves", name: "Waves", url: "" },
      { id: "campfire", name: "Campfire", url: "" },
    ],
  },
  {
    id: "wind",
    name: "Wind",
    items: [
      { id: "wind", name: "Wind", url: "" },
      { id: "howling-wind", name: "Howling Wind", url: "" },
      { id: "wind-in-trees", name: "Wind in Trees", url: "" },
    ],
  },
  {
    id: "rain",
    name: "Rain",
    items: [
      { id: "rain", name: "Rain", url: "" },
      { id: "light-rain", name: "Light Rain", url: "" },
      { id: "heavy-rain", name: "Heavy Rain", url: "" },
      { id: "thunder", name: "Thunder", url: "" },
      { id: "rain-on-window", name: "Rain on Window", url: "" },
      { id: "rain-on-car-roof", name: "Rain on Car Roof", url: "" },
      { id: "rain-on-umbrella", name: "Rain on Umbrella", url: "" },
    ],
  },
  {
    id: "animals",
    name: "Animals",
    items: [
      { id: "birds", name: "Birds", url: "" },
      { id: "seagulls", name: "Seagulls", url: "" },
      { id: "crickets", name: "Crickets", url: "" },
      { id: "wolf", name: "Wolf", url: "" },
      { id: "owl", name: "Owl", url: "" },
      { id: "frog", name: "Frog", url: "" },
    ],
  },
  {
    id: "urban",
    name: "Urban",
    items: [
      { id: "highway", name: "Highway", url: "" },
      { id: "road", name: "Road", url: "" },
      { id: "ambulance-siren", name: "Ambulance Siren", url: "" },
      { id: "busy-street", name: "Busy Street", url: "" },
      { id: "crowd", name: "Crowd", url: "" },
      { id: "traffic", name: "Traffic", url: "" },
    ],
  },
  {
    id: "places",
    name: "Places",
    items: [
      { id: "cafe", name: "Cafe", url: "" },
      { id: "airport", name: "Airport", url: "" },
      { id: "church", name: "Church", url: "" },
      { id: "temple", name: "Temple", url: "" },
      { id: "construction", name: "Construction Site", url: "" },
      { id: "underwater", name: "Underwater", url: "" },
    ],
  },
  {
    id: "transport",
    name: "Transport",
    items: [
      { id: "train", name: "Train", url: "" },
      { id: "inside-train", name: "Inside a Train", url: "" },
      { id: "airplane", name: "Airplane", url: "" },
      { id: "submarine", name: "Submarine", url: "" },
      { id: "sailboat", name: "Sailboat", url: "" },
      { id: "rowing-boat", name: "Rowing Boat", url: "" },
    ],
  },
  {
    id: "things",
    name: "Things",
    items: [
      { id: "keyboard", name: "Keyboard", url: "" },
      { id: "typewriter", name: "Typewriter", url: "" },
      { id: "paper", name: "Paper", url: "" },
      { id: "clock", name: "Clock", url: "" },
      { id: "wind-chimes", name: "Wind Chimes", url: "" },
      { id: "singing-bowl", name: "Singing Bowl", url: "" },
    ],
  },
  {
    id: "noise",
    name: "Noise",
    items: [
      { id: "white-noise", name: "White Noise", url: "" },
      { id: "pink-noise", name: "Pink Noise", url: "" },
      { id: "brown-noise", name: "Brown Noise", url: "" },
    ],
  },
];

export default SOUNDS;
