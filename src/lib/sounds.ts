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
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface Sound {
  id: string;
  name: string;
  icon: LucideIcon;
  audioUrl: string;
  category: "nature" | "urban" | "special" | "chooj";
}

/**
 * ============================================
 * LISTA DŹWIĘKÓW AMBIENT
 * ============================================
 * 
 * Aby dodać nowy dźwięk:
 * 1. Zaimportuj odpowiednią ikonę z lucide-react na górze pliku
 *    Pełna lista ikon: https://lucide.dev/icons
 * 2. Dodaj nowy obiekt do odpowiedniej sekcji (nature/urban/special)
 * 
 * Przykład dodania nowego dźwięku:
 * {
 *   id: "unique-id",        // unikalny identyfikator
 *   name: "Nazwa",          // nazwa wyświetlana w UI
 *   icon: IconName,         // ikona z lucide-react
 *   audioUrl: "https://...", // URL do pliku MP3
 *   category: "nature",     // kategoria: "nature" | "urban" | "special"
 * },
 */

export const sounds: Sound[] = [
  // ==================== DŹWIĘKI NATURY ====================
  {
    id: "rain",
    name: "Deszcz",
    icon: CloudRain,
    audioUrl: "/sounds/rain.mp3",
    category: "nature",
  },
  {
    id: "storm",
    name: "Burza",
    icon: CloudLightning,
    audioUrl: "/sounds/storm.mp3",
    category: "nature",
  },
  {
    id: "forest",
    name: "Las",
    icon: TreePine,
    audioUrl: "/sounds/forest.mp3",
    category: "nature",
  },
  {
    id: "fire",
    name: "Kominek",
    icon: Flame,
    audioUrl: "/sounds/fire.mp3",
    category: "nature",
  },
  {
    id: "waves",
    name: "Fale oceanu",
    icon: Waves,
    audioUrl: "/sounds/waves.mp3",
    category: "nature",
  },
  {
    id: "wind",
    name: "Wiatr",
    icon: Wind,
    audioUrl: "/sounds/wind.mp3",
    category: "nature",
  },
  {
    id: "birds",
    name: "Ptaki",
    icon: Bird,
    audioUrl: "/sounds/birds.mp3",
    category: "nature",
  },
  {
    id: "night",
    name: "Noc",
    icon: Moon,
    audioUrl: "/sounds/night.mp3",
    category: "nature",
  },
  {
    id: "water",
    name: "Strumień",
    icon: Droplets,
    audioUrl: "/sounds/water.mp3",
    category: "nature",
  },

  // ==================== DŹWIĘKI MIEJSKIE ====================
  {
    id: "cafe",
    name: "Kawiarnia",
    icon: Coffee,
    audioUrl: "/sounds/cafe.mp3",
    category: "urban",
  },
  {
    id: "train",
    name: "Pociąg",
    icon: Train,
    audioUrl: "/sounds/train.mp3",
    category: "urban",
  },
  {
    id: "airplane",
    name: "Samolot",
    icon: Plane,
    audioUrl: "/sounds/airplane.mp3",
    category: "urban",
  },
  {
    id: "traffic",
    name: "Ulica",
    icon: Car,
    audioUrl: "/sounds/traffic.mp3",
    category: "urban",
  },
  {
    id: "clock",
    name: "Zegar",
    icon: Clock,
    audioUrl: "/sounds/clock.mp3",
    category: "urban",
  },

  // ==================== DŹWIĘKI SPECJALNE ====================
  {
    id: "heartbeat",
    name: "Bicie serca",
    icon: Heart,
    audioUrl: "/sounds/heartbeat.mp3",
    category: "special",
  },
  {
    id: "electricity",
    name: "Prąd",
    icon: Zap,
    audioUrl: "/sounds/electricity.mp3",
    category: "special",
  },

  {
    id: "heartbeat1",
    name: "Bicie serca",
    icon: Heart,
    audioUrl: "/sounds/heartbeat.mp3",
    category: "chooj",
  },
  {
    id: "electricity1",
    name: "Prąd",
    icon: Zap,
    audioUrl: "/sounds/electricity.mp3",
    category: "chooj",
  },
];