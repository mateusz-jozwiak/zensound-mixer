import {
  CloudRain,
  CloudLightning,
  TreePine,
  Flame,
  Waves,
  Wind,
  Coffee,
  Bird,
  Moon,
  Droplets,
  Train,
  Plane,
  Car,
  Clock,
  Heart,
  Zap,
  Beaker,
  Utensils,
  Music,
  AlertCircle,
  Building2,
  Footprints,
  Fish,
  Radio,
  Fan,
  Hammer,
  Smile,
  Book,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface Sound {
  id: string;
  name: string;
  icon: LucideIcon;
  audioUrl: string;
  category: "nature" | "urban" | "animals" | "places" | "things" | "transport" | "rain" | "special";
}

/**
 * ============================================
 * LISTA DŹWIĘKÓW AMBIENT
 * ============================================
 * 
 * Aby dodać nowy dźwięk:
 * 1. Zaimportuj odpowiednią ikonę z lucide-react na górze pliku
 *    Pełna lista ikon: https://lucide.dev/icons
 * 2. Dodaj nowy obiekt do odpowiedniej sekcji (nature/urban/animals/places/things/transport/rain/special)
 * 
 * Przykład dodania nowego dźwięku:
 * {
 *   id: "unique-id",        // unikalny identyfikator
 *   name: "Nazwa",          // nazwa wyświetlana w UI
 *   icon: IconName,         // ikona z lucide-react
 *   audioUrl: "/sounds/...", // ścieżka do pliku MP3
 *   category: "nature",     // kategoria
 * },
 */

export const sounds: Sound[] = [
  // ==================== DŹWIĘKI NATURY ====================
  {
    id: "nature-campfire",
    name: "Kominek",
    icon: Flame,
    audioUrl: "/sounds/nature/campfire.mp3",
    category: "nature",
  },
  {
    id: "nature-droplets",
    name: "Krople wody",
    icon: Droplets,
    audioUrl: "/sounds/nature/droplets.mp3",
    category: "nature",
  },
  {
    id: "nature-howling-wind",
    name: "Zawodzący wiatr",
    icon: Wind,
    audioUrl: "/sounds/nature/howling-wind.mp3",
    category: "nature",
  },
  {
    id: "nature-jungle",
    name: "Dżungla",
    icon: TreePine,
    audioUrl: "/sounds/nature/jungle.mp3",
    category: "nature",
  },
  {
    id: "nature-river",
    name: "Rzeka",
    icon: Waves,
    audioUrl: "/sounds/nature/river.mp3",
    category: "nature",
  },
  {
    id: "nature-walk-in-snow",
    name: "Spacer na śniegu",
    icon: Footprints,
    audioUrl: "/sounds/nature/walk-in-snow.mp3",
    category: "nature",
  },
  {
    id: "nature-walk-on-gravel",
    name: "Spacer po żwirowaniu",
    icon: Footprints,
    audioUrl: "/sounds/nature/walk-on-gravel.mp3",
    category: "nature",
  },
  {
    id: "nature-walk-on-leaves",
    name: "Spacer po liściach",
    icon: Footprints,
    audioUrl: "/sounds/nature/walk-on-leaves.mp3",
    category: "nature",
  },
  {
    id: "nature-waterfall",
    name: "Wodospad",
    icon: Waves,
    audioUrl: "/sounds/nature/waterfall.mp3",
    category: "nature",
  },
  {
    id: "nature-waves",
    name: "Fale morskie",
    icon: Waves,
    audioUrl: "/sounds/nature/waves.mp3",
    category: "nature",
  },
  {
    id: "nature-wind-in-trees",
    name: "Wiatr w drzewach",
    icon: Wind,
    audioUrl: "/sounds/nature/wind-in-trees.mp3",
    category: "nature",
  },
  {
    id: "nature-wind",
    name: "Wiatr",
    icon: Wind,
    audioUrl: "/sounds/nature/wind.mp3",
    category: "nature",
  },

  // ==================== DESZCZ ====================
  {
    id: "rain-heavy",
    name: "Intensywny deszcz",
    icon: CloudRain,
    audioUrl: "/sounds/rain/heavy-rain.mp3",
    category: "rain",
  },
  {
    id: "rain-light",
    name: "Lekki deszcz",
    icon: CloudRain,
    audioUrl: "/sounds/rain/light-rain.mp3",
    category: "rain",
  },
  {
    id: "rain-car-roof",
    name: "Deszcz na dachu samochodu",
    icon: Car,
    audioUrl: "/sounds/rain/rain-on-car-roof.mp3",
    category: "rain",
  },
  {
    id: "rain-leaves",
    name: "Deszcz na liściach",
    icon: TreePine,
    audioUrl: "/sounds/rain/rain-on-leaves.mp3",
    category: "rain",
  },
  {
    id: "rain-tent",
    name: "Deszcz na namiocie",
    icon: CloudRain,
    audioUrl: "/sounds/rain/rain-on-tent.mp3",
    category: "rain",
  },
  {
    id: "rain-umbrella",
    name: "Deszcz na parasolu",
    icon: CloudRain,
    audioUrl: "/sounds/rain/rain-on-umbrella.mp3",
    category: "rain",
  },
  {
    id: "rain-window",
    name: "Deszcz na oknie",
    icon: CloudRain,
    audioUrl: "/sounds/rain/rain-on-window.mp3",
    category: "rain",
  },
  {
    id: "rain-thunder",
    name: "Grom",
    icon: CloudLightning,
    audioUrl: "/sounds/rain/thunder.mp3",
    category: "rain",
  },

  // ==================== ZWIERZĘTA ====================
  {
    id: "animals-beehive",
    name: "Ul pszczelny",
    icon: Bird,
    audioUrl: "/sounds/animals/beehive.mp3",
    category: "animals",
  },
  {
    id: "animals-birds",
    name: "Ptaki",
    icon: Bird,
    audioUrl: "/sounds/animals/birds.mp3",
    category: "animals",
  },
  {
    id: "animals-cat-purring",
    name: "Mruczenie kota",
    icon: Smile,
    audioUrl: "/sounds/animals/cat-purring.mp3",
    category: "animals",
  },
  {
    id: "animals-chickens",
    name: "Kury",
    icon: Bird,
    audioUrl: "/sounds/animals/chickens.mp3",
    category: "animals",
  },
  {
    id: "animals-cows",
    name: "Krowy",
    icon: Bird,
    audioUrl: "/sounds/animals/cows.mp3",
    category: "animals",
  },
  {
    id: "animals-crickets",
    name: "Świerszcze",
    icon: Bird,
    audioUrl: "/sounds/animals/crickets.mp3",
    category: "animals",
  },
  {
    id: "animals-crows",
    name: "Wrony",
    icon: Bird,
    audioUrl: "/sounds/animals/crows.mp3",
    category: "animals",
  },
  {
    id: "animals-dog-barking",
    name: "Szczekanie psa",
    icon: Bird,
    audioUrl: "/sounds/animals/dog-barking.mp3",
    category: "animals",
  },
  {
    id: "animals-frog",
    name: "Żaba",
    icon: Bird,
    audioUrl: "/sounds/animals/frog.mp3",
    category: "animals",
  },
  {
    id: "animals-horse-gallop",
    name: "Galop konia",
    icon: Bird,
    audioUrl: "/sounds/animals/horse-gallop.mp3",
    category: "animals",
  },
  {
    id: "animals-owl",
    name: "Sowa",
    icon: Bird,
    audioUrl: "/sounds/animals/owl.mp3",
    category: "animals",
  },
  {
    id: "animals-seagulls",
    name: "Mewy",
    icon: Bird,
    audioUrl: "/sounds/animals/seagulls.mp3",
    category: "animals",
  },
  {
    id: "animals-sheep",
    name: "Owce",
    icon: Bird,
    audioUrl: "/sounds/animals/sheep.mp3",
    category: "animals",
  },
  {
    id: "animals-whale",
    name: "Wieloryb",
    icon: Fish,
    audioUrl: "/sounds/animals/whale.mp3",
    category: "animals",
  },
  {
    id: "animals-wolf",
    name: "Wilk",
    icon: Bird,
    audioUrl: "/sounds/animals/wolf.mp3",
    category: "animals",
  },
  {
    id: "animals-woodpecker",
    name: "Dzięcioł",
    icon: Bird,
    audioUrl: "/sounds/animals/woodpecker.mp3",
    category: "animals",
  },

  // ==================== MIEJSCA ====================
  {
    id: "places-airport",
    name: "Lotnisko",
    icon: Plane,
    audioUrl: "/sounds/places/airport.mp3",
    category: "places",
  },
  {
    id: "places-cafe",
    name: "Kawiarnia",
    icon: Coffee,
    audioUrl: "/sounds/places/cafe.mp3",
    category: "places",
  },
  {
    id: "places-carousel",
    name: "Karuzela",
    icon: Music,
    audioUrl: "/sounds/places/carousel.mp3",
    category: "places",
  },
  {
    id: "places-church",
    name: "Kościół",
    icon: Building2,
    audioUrl: "/sounds/places/church.mp3",
    category: "places",
  },
  {
    id: "places-construction",
    name: "Plac budowy",
    icon: Hammer,
    audioUrl: "/sounds/places/construction-site.mp3",
    category: "places",
  },
  {
    id: "places-crowded-bar",
    name: "Pełny bar",
    icon: Coffee,
    audioUrl: "/sounds/places/crowded-bar.mp3",
    category: "places",
  },
  {
    id: "places-laboratory",
    name: "Laboratorium",
    icon: Beaker,
    audioUrl: "/sounds/places/laboratory.mp3",
    category: "places",
  },
  {
    id: "places-laundry",
    name: "Pralnia",
    icon: Building2,
    audioUrl: "/sounds/places/laundry-room.mp3",
    category: "places",
  },
  {
    id: "places-library",
    name: "Biblioteka",
    icon: Book,
    audioUrl: "/sounds/places/library.mp3",
    category: "places",
  },
  {
    id: "places-night-village",
    name: "Nocna wioska",
    icon: Moon,
    audioUrl: "/sounds/places/night-village.mp3",
    category: "places",
  },
  {
    id: "places-office",
    name: "Biuro",
    icon: Building2,
    audioUrl: "/sounds/places/office.mp3",
    category: "places",
  },
  {
    id: "places-restaurant",
    name: "Restauracja",
    icon: Utensils,
    audioUrl: "/sounds/places/restaurant.mp3",
    category: "places",
  },
  {
    id: "places-subway",
    name: "Stacja metra",
    icon: Train,
    audioUrl: "/sounds/places/subway-station.mp3",
    category: "places",
  },
  {
    id: "places-supermarket",
    name: "Supermarket",
    icon: Building2,
    audioUrl: "/sounds/places/supermarket.mp3",
    category: "places",
  },
  {
    id: "places-temple",
    name: "Świątynia",
    icon: Building2,
    audioUrl: "/sounds/places/temple.mp3",
    category: "places",
  },
  {
    id: "places-underwater",
    name: "Pod wodą",
    icon: Fish,
    audioUrl: "/sounds/places/underwater.mp3",
    category: "places",
  },

  // ==================== RZECZY ====================
  {
    id: "things-boiling-water",
    name: "Wrząca woda",
    icon: Flame,
    audioUrl: "/sounds/things/boiling-water.mp3",
    category: "things",
  },
  {
    id: "things-bubbles",
    name: "Bąbelki",
    icon: Droplets,
    audioUrl: "/sounds/things/bubbles.mp3",
    category: "things",
  },
  {
    id: "things-ceiling-fan",
    name: "Wiatrak sufitowy",
    icon: Fan,
    audioUrl: "/sounds/things/ceiling-fan.mp3",
    category: "things",
  },
  {
    id: "things-clock",
    name: "Zegar",
    icon: Clock,
    audioUrl: "/sounds/things/clock.mp3",
    category: "things",
  },
  {
    id: "things-dryer",
    name: "Suszarka",
    icon: Fan,
    audioUrl: "/sounds/things/dryer.mp3",
    category: "things",
  },
  {
    id: "things-keyboard",
    name: "Klawiatura",
    icon: Music,
    audioUrl: "/sounds/things/keyboard.mp3",
    category: "things",
  },
  {
    id: "things-morse-code",
    name: "Kod morse'a",
    icon: Radio,
    audioUrl: "/sounds/things/morse-code.mp3",
    category: "things",
  },
  {
    id: "things-paper",
    name: "Papier",
    icon: Book,
    audioUrl: "/sounds/things/paper.mp3",
    category: "things",
  },
  {
    id: "things-singing-bowl",
    name: "Miska śpiewająca",
    icon: Music,
    audioUrl: "/sounds/things/singing-bowl.mp3",
    category: "things",
  },
  {
    id: "things-slide-projector",
    name: "Projektor slajdów",
    icon: Music,
    audioUrl: "/sounds/things/slide-projector.mp3",
    category: "things",
  },
  {
    id: "things-tuning-radio",
    name: "Strojenie radia",
    icon: Radio,
    audioUrl: "/sounds/things/tuning-radio.mp3",
    category: "things",
  },
  {
    id: "things-typewriter",
    name: "Maszyna do pisania",
    icon: Music,
    audioUrl: "/sounds/things/typewriter.mp3",
    category: "things",
  },
  {
    id: "things-vinyl-effect",
    name: "Efekt winylu",
    icon: Music,
    audioUrl: "/sounds/things/vinyl-effect.mp3",
    category: "things",
  },
  {
    id: "things-washing-machine",
    name: "Pralka",
    icon: Fan,
    audioUrl: "/sounds/things/washing-machine.mp3",
    category: "things",
  },
  {
    id: "things-wind-chimes",
    name: "Dzwonki wietrzne",
    icon: Music,
    audioUrl: "/sounds/things/wind-chimes.mp3",
    category: "things",
  },
  {
    id: "things-windshield-wipers",
    name: "Wycieraczki szyby",
    icon: Car,
    audioUrl: "/sounds/things/windshield-wipers.mp3",
    category: "things",
  },

  // ==================== TRANSPORT ====================
  {
    id: "transport-airplane",
    name: "Samolot",
    icon: Plane,
    audioUrl: "/sounds/transport/airplane.mp3",
    category: "transport",
  },
  {
    id: "transport-train-inside",
    name: "Wewnątrz pociągu",
    icon: Train,
    audioUrl: "/sounds/transport/inside-a-train.mp3",
    category: "transport",
  },
  {
    id: "transport-rowing-boat",
    name: "Łódź wiosłowa",
    icon: Waves,
    audioUrl: "/sounds/transport/rowing-boat.mp3",
    category: "transport",
  },
  {
    id: "transport-sailboat",
    name: "Żaglówka",
    icon: Waves,
    audioUrl: "/sounds/transport/sailboat.mp3",
    category: "transport",
  },
  {
    id: "transport-submarine",
    name: "Łódź podwodna",
    icon: Fish,
    audioUrl: "/sounds/transport/submarine.mp3",
    category: "transport",
  },
  {
    id: "transport-train",
    name: "Pociąg",
    icon: Train,
    audioUrl: "/sounds/transport/train.mp3",
    category: "transport",
  },

  // ==================== MIEJSKI RUCH ====================
  {
    id: "urban-ambulance",
    name: "Syrena karetki",
    icon: AlertCircle,
    audioUrl: "/sounds/urban/ambulance-siren.mp3",
    category: "urban",
  },
  {
    id: "urban-busy-street",
    name: "Ruchliwa ulica",
    icon: Car,
    audioUrl: "/sounds/urban/busy-street.mp3",
    category: "urban",
  },
  {
    id: "urban-crowd",
    name: "Tłum",
    icon: Coffee,
    audioUrl: "/sounds/urban/crowd.mp3",
    category: "urban",
  },
  {
    id: "urban-fireworks",
    name: "Fajerwerki",
    icon: Zap,
    audioUrl: "/sounds/urban/fireworks.mp3",
    category: "urban",
  },
  {
    id: "urban-highway",
    name: "Autostrada",
    icon: Car,
    audioUrl: "/sounds/urban/highway.mp3",
    category: "urban",
  },
  {
    id: "urban-road",
    name: "Droga",
    icon: Car,
    audioUrl: "/sounds/urban/road.mp3",
    category: "urban",
  },
  {
    id: "urban-traffic",
    name: "Ruch drogowy",
    icon: Car,
    audioUrl: "/sounds/urban/traffic.mp3",
    category: "urban",
  },

  // ==================== SPECJALNE ====================
  {
    id: "alarm",
    name: "Alarm",
    icon: AlertCircle,
    audioUrl: "/sounds/alarm.mp3",
    category: "special",
  },
];