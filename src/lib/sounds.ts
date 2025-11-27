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
  category: "nature" | "urban" | "special";
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
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3",
    category: "nature",
  },
  {
    id: "storm",
    name: "Burza",
    icon: CloudLightning,
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/1166/1166-preview.mp3",
    category: "nature",
  },
  {
    id: "forest",
    name: "Las",
    icon: TreePine,
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/1210/1210-preview.mp3",
    category: "nature",
  },
  {
    id: "fire",
    name: "Kominek",
    icon: Flame,
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2577/2577-preview.mp3",
    category: "nature",
  },
  {
    id: "waves",
    name: "Fale oceanu",
    icon: Waves,
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/1189/1189-preview.mp3",
    category: "nature",
  },
  {
    id: "wind",
    name: "Wiatr",
    icon: Wind,
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2461/2461-preview.mp3",
    category: "nature",
  },
  {
    id: "birds",
    name: "Ptaki",
    icon: Bird,
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2432/2432-preview.mp3",
    category: "nature",
  },
  {
    id: "night",
    name: "Noc",
    icon: Moon,
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3",
    category: "nature",
  },
  {
    id: "water",
    name: "Strumień",
    icon: Droplets,
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2513/2513-preview.mp3",
    category: "nature",
  },

  // ==================== DŹWIĘKI MIEJSKIE ====================
  {
    id: "cafe",
    name: "Kawiarnia",
    icon: Coffee,
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/371/371-preview.mp3",
    category: "urban",
  },
  {
    id: "train",
    name: "Pociąg",
    icon: Train,
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",
    category: "urban",
  },
  {
    id: "airplane",
    name: "Samolot",
    icon: Plane,
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2587/2587-preview.mp3",
    category: "urban",
  },
  {
    id: "traffic",
    name: "Ulica",
    icon: Car,
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2580/2580-preview.mp3",
    category: "urban",
  },
  {
    id: "clock",
    name: "Zegar",
    icon: Clock,
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3",
    category: "urban",
  },

  // ==================== DŹWIĘKI SPECJALNE ====================
  {
    id: "heartbeat",
    name: "Bicie serca",
    icon: Heart,
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3",
    category: "special",
  },
  {
    id: "electricity",
    name: "Prąd",
    icon: Zap,
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3",
    category: "special",
  },

  {
    id: "heartbeat1",
    name: "Bicie serca",
    icon: Heart,
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3",
    category: "chooj",
  },
  {
    id: "electricity1",
    name: "Prąd",
    icon: Zap,
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3",
    category: "chooj",
  },
];