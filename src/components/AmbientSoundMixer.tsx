import { useState, useRef, useEffect, useCallback } from "react";
import { VolumeX, Volume2 } from "lucide-react";
import SoundTile from "./SoundTile";
import TimerSelector from "./TimerSelector";
import BackgroundMusic from "./BackgroundMusic";
import PresetSelector from "./PresetSelector";
import { cn } from "@/lib/utils";
import { sounds, Sound } from "@/lib/sounds";

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

  const handleLoadPreset = useCallback((presetSounds: Record<string, SoundState>) => {
    setSoundStates((prev) => {
      const newState = { ...prev };
      // First deactivate all
      Object.keys(newState).forEach((key) => {
        newState[key] = { ...newState[key], isActive: false };
      });
      // Then apply preset
      Object.entries(presetSounds).forEach(([id, settings]) => {
        if (newState[id]) {
          newState[id] = settings;
        }
      });
      return newState;
    });
  }, []);

  const activeSoundsCount = Object.values(soundStates).filter(
    (s) => s?.isActive
  ).length;

  const natureSounds = sounds.filter((s) => s.category === "nature");
  const rainSounds = sounds.filter((s) => s.category === "rain");
  const animalSounds = sounds.filter((s) => s.category === "animals");
  const placesSounds = sounds.filter((s) => s.category === "places");
  const thingsSounds = sounds.filter((s) => s.category === "things");
  const transportSounds = sounds.filter((s) => s.category === "transport");
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

          <PresetSelector
            currentSounds={soundStates}
            onLoadPreset={handleLoadPreset}
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
        {renderSoundGrid(rainSounds, "Deszcz i burze")}
        {renderSoundGrid(animalSounds, "Zwierzęta")}
        {renderSoundGrid(placesSounds, "Miejsca")}
        {renderSoundGrid(thingsSounds, "Przedmioty")}
        {renderSoundGrid(transportSounds, "Transport")}
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
