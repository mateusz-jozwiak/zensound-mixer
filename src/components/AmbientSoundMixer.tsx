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
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import SoundTile from "./SoundTile";
import TimerSelector from "./TimerSelector";
import { cn } from "@/lib/utils";

interface Sound {
  id: string;
  name: string;
  icon: LucideIcon;
  // Replace these with actual MP3 URLs
  audioUrl: string;
}

const sounds: Sound[] = [
  {
    id: "rain",
    name: "Deszcz",
    icon: CloudRain,
    audioUrl: "https://cdn.pixabay.com/audio/2022/05/16/audio_1808fbf07a.mp3", // Rain sound
  },
  {
    id: "storm",
    name: "Burza",
    icon: CloudLightning,
    audioUrl: "https://cdn.pixabay.com/audio/2022/10/30/audio_f6c7a7cf6c.mp3", // Thunder storm
  },
  {
    id: "forest",
    name: "Las",
    icon: TreePine,
    audioUrl: "https://cdn.pixabay.com/audio/2022/03/10/audio_4dedf5bf94.mp3", // Forest ambience
  },
  {
    id: "fire",
    name: "Kominek",
    icon: Flame,
    audioUrl: "https://cdn.pixabay.com/audio/2021/10/07/audio_d47906aec8.mp3", // Fireplace
  },
  {
    id: "waves",
    name: "Fale",
    icon: Waves,
    audioUrl: "https://cdn.pixabay.com/audio/2022/06/07/audio_b9bd4170e4.mp3", // Ocean waves
  },
  {
    id: "wind",
    name: "Wiatr",
    icon: Wind,
    audioUrl: "https://cdn.pixabay.com/audio/2022/03/24/audio_77577b9380.mp3", // Wind sound
  },
  {
    id: "cafe",
    name: "Kawiarnia",
    icon: Coffee,
    audioUrl: "https://cdn.pixabay.com/audio/2022/10/18/audio_69a61cd6d6.mp3", // Cafe ambience
  },
  {
    id: "birds",
    name: "Ptaki",
    icon: Bird,
    audioUrl: "https://cdn.pixabay.com/audio/2022/02/23/audio_ea70ad08e2.mp3", // Birds chirping
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
        const audio = new Audio(sound.audioUrl);
        audio.loop = true;
        audio.preload = "auto";
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
    Object.entries(soundStates).forEach(([id, state]) => {
      const audio = audioRefs.current[id];
      if (!audio) return;

      const effectiveVolume = isMuted ? 0 : state.volume / 100;
      audio.volume = effectiveVolume;

      if (state.isActive && !isMuted) {
        audio.play().catch(console.error);
      } else if (!state.isActive || isMuted) {
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
            Object.keys(current).reduce(
              (acc, key) => ({
                ...acc,
                [key]: { ...current[key], isActive: false },
              }),
              {}
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
      [id]: { ...prev[id], isActive: !prev[id].isActive },
    }));
  }, []);

  const setVolume = useCallback((id: string, volume: number) => {
    setSoundStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], volume },
    }));
  }, []);

  const handleMuteAll = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const activeSoundsCount = Object.values(soundStates).filter(
    (s) => s.isActive
  ).length;

  return (
    <div className="min-h-screen gradient-bg gradient-mesh">
      <div className="container mx-auto px-4 py-8 md:py-12">
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

        {/* Sound Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {sounds.map((sound, index) => (
            <div
              key={sound.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <SoundTile
                name={sound.name}
                icon={sound.icon}
                isActive={soundStates[sound.id].isActive}
                volume={soundStates[sound.id].volume}
                onToggle={() => toggleSound(sound.id)}
                onVolumeChange={(volume) => setVolume(sound.id, volume)}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-muted-foreground text-sm">
          <p>Kliknij w kafelek, aby włączyć dźwięk. Użyj suwaka, aby dostosować głośność.</p>
        </footer>
      </div>
    </div>
  );
};

export default AmbientSoundMixer;
