import { useState, useRef, useEffect, useCallback } from "react";
import {
  CloudRain,
  CloudLightning,
  TreePine,
  Flame,
  Waves,
  Wind,
  Coffee,
  Bird,
  VolumeX,
  Volume2,
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
import SoundTile from "./SoundTile";
import TimerSelector from "./TimerSelector";
import BackgroundMusic from "./BackgroundMusic";
import { cn } from "@/lib/utils";

interface Sound {
  id: string;
  name: string;
  icon: LucideIcon;
  audioUrl: string;
  category: "nature" | "urban" | "special";
}

// Audio URLs - Using Mixkit CDN
const sounds: Sound[] = [
  // Nature sounds
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
  // Urban sounds
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
  // Special sounds
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
];

interface SoundState {
  isActive: boolean;
  volume: number;
}

const AmbientSoundMixer = () => {
  const [soundStates, setSoundStates] = useState<Record<string, SoundState>>(
    () =>
      sounds.reduce(
        (acc, sound) => ({
          ...acc,
          [sound.id]: { isActive: false, volume: 50 },
        }),
        {}
      )
  );
  const [isMuted, setIsMuted] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  // Initialize audio elements
  useEffect(() => {
    sounds.forEach((sound) => {
      if (!audioRefs.current[sound.id]) {
        const audio = new Audio();
        audio.crossOrigin = "anonymous";
        audio.loop = true;
        audio.preload = "auto";
        audio.src = sound.audioUrl;
        
        // Better error handling
        audio.onerror = () => {
          console.warn(`Failed to load audio: ${sound.name}`);
        };
        
        audioRefs.current[sound.id] = audio;
      }
    });

    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
    };
  }, []);

  // Handle play/pause and volume changes
  useEffect(() => {
    sounds.forEach((sound) => {
      const state = soundStates[sound.id];
      const audio = audioRefs.current[sound.id];
      if (!audio || !state) return;

      const effectiveVolume = isMuted ? 0 : state.volume / 100;
      audio.volume = effectiveVolume;

      if (state.isActive && !isMuted) {
        audio.play().catch(console.error);
      } else {
        audio.pause();
      }
    });
  }, [soundStates, isMuted]);

  // Timer logic
  useEffect(() => {
    if (selectedTimer === null) {
      setRemainingTime(null);
      return;
    }

    setRemainingTime(selectedTimer * 60);

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          // Stop all sounds when timer ends
          setSoundStates((current) =>
            sounds.reduce(
              (acc, sound) => ({
                ...acc,
                [sound.id]: { 
                  isActive: false, 
                  volume: current[sound.id]?.volume ?? 50 
                },
              }),
              {} as Record<string, SoundState>
            )
          );
          setSelectedTimer(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedTimer]);

  const toggleSound = useCallback((id: string) => {
    setSoundStates((prev) => ({
      ...prev,
      [id]: { 
        isActive: !(prev[id]?.isActive ?? false), 
        volume: prev[id]?.volume ?? 50 
      },
    }));
  }, []);

  const setVolume = useCallback((id: string, volume: number) => {
    setSoundStates((prev) => ({
      ...prev,
      [id]: { 
        isActive: prev[id]?.isActive ?? false, 
        volume 
      },
    }));
  }, []);

  const handleMuteAll = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const activeSoundsCount = Object.values(soundStates).filter(
    (s) => s?.isActive
  ).length;

  const natureSounds = sounds.filter((s) => s.category === "nature");
  const urbanSounds = sounds.filter((s) => s.category === "urban");
  const specialSounds = sounds.filter((s) => s.category === "special");

  const renderSoundGrid = (soundList: Sound[], title: string) => (
    <div className="mb-10">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary" />
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {soundList.map((sound, index) => (
          <div
            key={sound.id}
            className="animate-scale-in"
            style={{ animationDelay: `${index * 30}ms` }}
          >
            <SoundTile
              name={sound.name}
              icon={sound.icon}
              isActive={soundStates[sound.id]?.isActive || false}
              volume={soundStates[sound.id]?.volume || 50}
              onToggle={() => toggleSound(sound.id)}
              onVolumeChange={(volume) => setVolume(sound.id, volume)}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen gradient-bg gradient-mesh">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Ambient Sound Mixer
          </h1>
          <p className="text-muted-foreground text-lg">
            Stwórz swoją idealną atmosferę do pracy i relaksu
          </p>
        </header>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10 animate-fade-in">
          <button
            onClick={handleMuteAll}
            className={cn(
              "glass-card px-6 py-3 flex items-center gap-3 transition-all duration-300",
              "hover:border-primary/30",
              isMuted && "border-destructive/40 bg-destructive/10"
            )}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-destructive" />
            ) : (
              <Volume2 className="w-5 h-5 text-primary" />
            )}
            <span className={cn(
              "font-medium",
              isMuted ? "text-destructive" : "text-foreground"
            )}>
              {isMuted ? "Wyciszono" : "Wycisz wszystko"}
            </span>
          </button>

          <TimerSelector
            selectedTimer={selectedTimer}
            onSelectTimer={setSelectedTimer}
            remainingTime={remainingTime}
          />

          {activeSoundsCount > 0 && (
            <div className="glass-card px-4 py-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">
                Aktywne: <span className="text-primary font-medium">{activeSoundsCount}</span>
              </span>
            </div>
          )}
        </div>

        {/* Background Music Section */}
        <BackgroundMusic isMuted={isMuted} />

        {/* Sound Categories */}
        {renderSoundGrid(natureSounds, "Dźwięki natury")}
        {renderSoundGrid(urbanSounds, "Dźwięki miejskie")}
        {renderSoundGrid(specialSounds, "Dźwięki specjalne")}

        {/* Footer */}
        <footer className="mt-8 text-center text-muted-foreground text-sm">
          <p>Kliknij w kafelek, aby włączyć dźwięk. Użyj suwaka, aby dostosować głośność.</p>
        </footer>
      </div>
    </div>
  );
};

export default AmbientSoundMixer;
