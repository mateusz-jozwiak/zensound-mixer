export interface Preset {
  id: string;
  name: string;
  emoji: string;
  sounds: Record<string, { isActive: boolean; volume: number }>;
  isCustom?: boolean;
}

/**
 * Domyślne presety miksów ambient
 * Możesz dodać własne presety tutaj lub zapisać je przez UI
 */
export const defaultPresets: Preset[] = [
  {
    id: "focus",
    name: "Focus",
    emoji: "🎯",
    sounds: {
      rain: { isActive: true, volume: 40 },
      cafe: { isActive: true, volume: 25 },
      fire: { isActive: false, volume: 50 },
    },
  },
  {
    id: "relax",
    name: "Relax",
    emoji: "🧘",
    sounds: {
      waves: { isActive: true, volume: 50 },
      birds: { isActive: true, volume: 30 },
      wind: { isActive: true, volume: 20 },
    },
  },
  {
    id: "sleep",
    name: "Sleep",
    emoji: "😴",
    sounds: {
      rain: { isActive: true, volume: 35 },
      night: { isActive: true, volume: 25 },
      fire: { isActive: true, volume: 20 },
    },
  },
  {
    id: "storm",
    name: "Burza",
    emoji: "⛈️",
    sounds: {
      rain: { isActive: true, volume: 50 },
      storm: { isActive: true, volume: 60 },
      wind: { isActive: true, volume: 40 },
    },
  },
  {
    id: "nature",
    name: "Natura",
    emoji: "🌲",
    sounds: {
      forest: { isActive: true, volume: 45 },
      birds: { isActive: true, volume: 35 },
      water: { isActive: true, volume: 30 },
    },
  },
];

const STORAGE_KEY = "ambient-mixer-presets";

export const loadCustomPresets = (): Preset[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn("Failed to load custom presets:", e);
  }
  return [];
};

export const saveCustomPreset = (preset: Preset): void => {
  try {
    const existing = loadCustomPresets();
    const updated = [...existing.filter((p) => p.id !== preset.id), preset];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Failed to save preset:", e);
  }
};

export const deleteCustomPreset = (presetId: string): void => {
  try {
    const existing = loadCustomPresets();
    const updated = existing.filter((p) => p.id !== presetId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Failed to delete preset:", e);
  }
};
