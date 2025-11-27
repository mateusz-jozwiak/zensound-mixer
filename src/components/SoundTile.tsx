import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface SoundTileProps {
  name: string;
  icon: LucideIcon;
  isActive: boolean;
  volume: number;
  onToggle: () => void;
  onVolumeChange: (value: number) => void;
  url?: string;
  onUrlChange?: (url: string) => void;
}

const SoundTile = ({
  name,
  icon: Icon,
  isActive,
  volume,
  onToggle,
  onVolumeChange,
    url,
    onUrlChange,
}: SoundTileProps) => {
  const [inputUrl, setInputUrl] = useState(url ?? "");
  return (
    <div
      className={cn(
        "glass-card p-6 transition-all duration-500 ease-out",
        "hover:border-primary/30 group cursor-pointer",
        isActive && "glow-active border-primary/40"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex flex-col items-center gap-4 focus:outline-none"
      >
        <div
          className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300",
            "bg-secondary/50 group-hover:bg-secondary",
            isActive && "bg-primary/20 text-primary"
          )}
        >
          <Icon
            className={cn(
              "w-8 h-8 transition-all duration-300",
              isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
            )}
          />
        </div>
        <span
          className={cn(
            "text-sm font-medium transition-colors duration-300",
            isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
          )}
        >
          {name}
        </span>
      </button>
      
      <div className="mt-4 px-2">
        <Slider
          value={[volume]}
          onValueChange={(values) => onVolumeChange(values[0])}
          max={100}
          step={1}
          className={cn(
            "cursor-pointer",
            !isActive && "opacity-40"
          )}
        />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">0</span>
          <span className={cn(
            "text-xs font-medium",
            isActive ? "text-primary" : "text-muted-foreground"
          )}>
            {volume}%
          </span>
          <span className="text-xs text-muted-foreground">100</span>
        </div>

        <div className="mt-3">
          <label className="text-xs text-muted-foreground">Link do dźwięku</label>
          <div className="flex gap-2 mt-1">
            <input
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Wklej URL pliku audio"
              className="flex-1 rounded-md border px-2 py-1 text-sm"
            />
            <button
              onClick={() => onUrlChange?.(inputUrl)}
              className="rounded-md bg-primary px-3 py-1 text-sm text-white"
            >
              Zapisz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundTile;
