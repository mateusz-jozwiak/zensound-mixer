import { useState, useEffect } from "react";
import { Bookmark, Plus, Trash2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Preset,
  defaultPresets,
  loadCustomPresets,
  saveCustomPreset,
  deleteCustomPreset,
} from "@/lib/presets";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PresetSelectorProps {
  currentSounds: Record<string, { isActive: boolean; volume: number }>;
  onLoadPreset: (sounds: Record<string, { isActive: boolean; volume: number }>) => void;
}

const PresetSelector = ({ currentSounds, onLoadPreset }: PresetSelectorProps) => {
  const [customPresets, setCustomPresets] = useState<Preset[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState("");
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);

  useEffect(() => {
    setCustomPresets(loadCustomPresets());
  }, []);

  const allPresets = [...defaultPresets, ...customPresets];

  const handleLoadPreset = (preset: Preset) => {
    // Apply preset sounds, keeping other sounds at their current state
    const newSounds = { ...currentSounds };
    
    // First, deactivate all sounds
    Object.keys(newSounds).forEach((key) => {
      newSounds[key] = { ...newSounds[key], isActive: false };
    });
    
    // Then activate sounds from preset
    Object.entries(preset.sounds).forEach(([soundId, settings]) => {
      newSounds[soundId] = settings;
    });
    
    onLoadPreset(newSounds);
    setSavedFeedback(`Załadowano: ${preset.name}`);
    setTimeout(() => setSavedFeedback(null), 2000);
  };

  const handleSavePreset = () => {
    if (!newPresetName.trim()) return;

    const activeSounds: Record<string, { isActive: boolean; volume: number }> = {};
    Object.entries(currentSounds).forEach(([id, state]) => {
      if (state.isActive) {
        activeSounds[id] = state;
      }
    });

    if (Object.keys(activeSounds).length === 0) {
      setSavedFeedback("Włącz przynajmniej jeden dźwięk!");
      setTimeout(() => setSavedFeedback(null), 2000);
      return;
    }

    const newPreset: Preset = {
      id: `custom-${Date.now()}`,
      name: newPresetName.trim(),
      emoji: "⭐",
      sounds: activeSounds,
      isCustom: true,
    };

    saveCustomPreset(newPreset);
    setCustomPresets(loadCustomPresets());
    setNewPresetName("");
    setShowSaveForm(false);
    setSavedFeedback(`Zapisano: ${newPreset.name}`);
    setTimeout(() => setSavedFeedback(null), 2000);
  };

  const handleDeletePreset = (presetId: string) => {
    deleteCustomPreset(presetId);
    setCustomPresets(loadCustomPresets());
  };

  const hasActiveSounds = Object.values(currentSounds).some((s) => s.isActive);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            "glass-card px-6 py-3 flex items-center gap-3 transition-all duration-300",
            "hover:border-primary/30"
          )}
        >
          <Bookmark className="w-5 h-5 text-primary" />
          <span className="font-medium text-foreground">Presety</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-primary" />
            Presety miksów
          </DialogTitle>
        </DialogHeader>

        {savedFeedback && (
          <div className="flex items-center gap-2 px-3 py-2 bg-primary/20 rounded-lg text-sm text-primary">
            <Check className="w-4 h-4" />
            {savedFeedback}
          </div>
        )}

        <div className="space-y-4">
          {/* Default & Custom Presets */}
          <div className="grid grid-cols-2 gap-2">
            {allPresets.map((preset) => (
              <div
                key={preset.id}
                className="relative group"
              >
                <button
                  onClick={() => handleLoadPreset(preset)}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl text-left transition-all",
                    "bg-secondary/50 hover:bg-secondary border border-transparent",
                    "hover:border-primary/30"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{preset.emoji}</span>
                    <span className="text-sm font-medium text-foreground">
                      {preset.name}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {Object.keys(preset.sounds).length} dźwięków
                  </div>
                </button>
                {preset.isCustom && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePreset(preset.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-destructive/20 text-destructive opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/30"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Save New Preset */}
          <div className="border-t border-border pt-4">
            {!showSaveForm ? (
              <button
                onClick={() => setShowSaveForm(true)}
                disabled={!hasActiveSounds}
                className={cn(
                  "w-full px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all",
                  hasActiveSounds
                    ? "bg-primary/20 text-primary hover:bg-primary/30"
                    : "bg-secondary/30 text-muted-foreground cursor-not-allowed"
                )}
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Zapisz obecny miks</span>
              </button>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  placeholder="Nazwa presetu..."
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowSaveForm(false);
                      setNewPresetName("");
                    }}
                    className="flex-1 px-4 py-2 rounded-xl bg-secondary text-muted-foreground hover:bg-secondary/80 text-sm"
                  >
                    Anuluj
                  </button>
                  <button
                    onClick={handleSavePreset}
                    disabled={!newPresetName.trim()}
                    className={cn(
                      "flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                      newPresetName.trim()
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    Zapisz
                  </button>
                </div>
              </div>
            )}
            {!hasActiveSounds && !showSaveForm && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                Włącz dźwięki, aby zapisać preset
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PresetSelector;
