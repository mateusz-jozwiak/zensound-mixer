import { Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimerSelectorProps {
  selectedTimer: number | null;
  onSelectTimer: (minutes: number | null) => void;
  remainingTime: number | null;
}

const timerOptions = [15, 30, 60];

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const TimerSelector = ({
  selectedTimer,
  onSelectTimer,
  remainingTime,
}: TimerSelectorProps) => {
  return (
    <div className="glass-card p-4 inline-flex items-center gap-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Timer className="w-5 h-5" />
        <span className="text-sm font-medium">Timer</span>
      </div>
      
      <div className="flex items-center gap-2">
        {timerOptions.map((minutes) => (
          <button
            key={minutes}
            onClick={() =>
              onSelectTimer(selectedTimer === minutes ? null : minutes)
            }
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
              "hover:bg-secondary",
              selectedTimer === minutes
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground"
            )}
          >
            {minutes}m
          </button>
        ))}
      </div>
      
      {remainingTime !== null && (
        <div className="flex items-center gap-2 ml-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-mono text-primary">
            {formatTime(remainingTime)}
          </span>
        </div>
      )}
    </div>
  );
};

export default TimerSelector;
