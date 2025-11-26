import { useState, useRef, useEffect, useCallback } from "react";
import { Music, Upload, Youtube, Play, Pause, X, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface BackgroundMusicProps {
  isMuted: boolean;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  destroy: () => void;
  getPlayerState: () => number;
}

const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const BackgroundMusic = ({ isMuted }: BackgroundMusicProps) => {
  const [mp3File, setMp3File] = useState<File | null>(null);
  const [mp3Url, setMp3Url] = useState<string | null>(null);
  const [mp3Playing, setMp3Playing] = useState(false);
  const [mp3Volume, setMp3Volume] = useState(50);
  
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeId, setYoutubeId] = useState<string | null>(null);
  const [youtubeVolume, setYoutubeVolume] = useState(50);
  const [youtubePlaying, setYoutubePlaying] = useState(false);
  const [youtubeReady, setYoutubeReady] = useState(false);
  
  const mp3Ref = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ytPlayerRef = useRef<YTPlayer | null>(null);
  const ytContainerRef = useRef<HTMLDivElement>(null);

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT) return;
    
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }, []);

  // Initialize YouTube player when ID changes
  useEffect(() => {
    if (!youtubeId) {
      if (ytPlayerRef.current) {
        ytPlayerRef.current.destroy();
        ytPlayerRef.current = null;
      }
      setYoutubeReady(false);
      setYoutubePlaying(false);
      return;
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) {
        setTimeout(initPlayer, 100);
        return;
      }

      if (ytPlayerRef.current) {
        ytPlayerRef.current.destroy();
      }

      ytPlayerRef.current = new window.YT.Player("yt-player", {
        videoId: youtubeId,
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: youtubeId,
          controls: 1,
          modestbranding: 1,
        },
        events: {
          onReady: (event) => {
            setYoutubeReady(true);
            event.target.setVolume(youtubeVolume);
          },
          onStateChange: (event) => {
            // 1 = playing, 2 = paused
            setYoutubePlaying(event.data === 1);
          },
        },
      });
    };

    initPlayer();

    return () => {
      if (ytPlayerRef.current) {
        ytPlayerRef.current.destroy();
        ytPlayerRef.current = null;
      }
    };
  }, [youtubeId]);

  // Handle YouTube volume changes
  useEffect(() => {
    if (ytPlayerRef.current && youtubeReady) {
      const effectiveVolume = isMuted ? 0 : youtubeVolume;
      ytPlayerRef.current.setVolume(effectiveVolume);
    }
  }, [youtubeVolume, isMuted, youtubeReady]);

  // Handle YouTube play/pause with mute
  useEffect(() => {
    if (ytPlayerRef.current && youtubeReady && isMuted && youtubePlaying) {
      ytPlayerRef.current.setVolume(0);
    } else if (ytPlayerRef.current && youtubeReady && !isMuted) {
      ytPlayerRef.current.setVolume(youtubeVolume);
    }
  }, [isMuted, youtubePlaying, youtubeReady, youtubeVolume]);

  // Handle MP3 file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "audio/mpeg") {
      setMp3File(file);
      const url = URL.createObjectURL(file);
      setMp3Url(url);
      setMp3Playing(false);
    }
  };

  // Initialize MP3 audio
  useEffect(() => {
    if (mp3Url) {
      if (mp3Ref.current) {
        mp3Ref.current.pause();
        URL.revokeObjectURL(mp3Ref.current.src);
      }
      const audio = new Audio(mp3Url);
      audio.loop = true;
      mp3Ref.current = audio;
    }

    return () => {
      if (mp3Ref.current) {
        mp3Ref.current.pause();
        if (mp3Url) URL.revokeObjectURL(mp3Url);
      }
    };
  }, [mp3Url]);

  // Handle MP3 play/pause
  useEffect(() => {
    if (!mp3Ref.current) return;
    
    const effectiveVolume = isMuted ? 0 : mp3Volume / 100;
    mp3Ref.current.volume = effectiveVolume;

    if (mp3Playing && !isMuted) {
      mp3Ref.current.play().catch(console.error);
    } else {
      mp3Ref.current.pause();
    }
  }, [mp3Playing, mp3Volume, isMuted]);

  // Handle YouTube URL submission
  const handleYoutubeSubmit = () => {
    const id = extractYouTubeId(youtubeUrl);
    if (id) {
      setYoutubeId(id);
    }
  };

  // Toggle YouTube play/pause
  const toggleYoutube = useCallback(() => {
    if (!ytPlayerRef.current || !youtubeReady) return;
    
    if (youtubePlaying) {
      ytPlayerRef.current.pauseVideo();
    } else {
      ytPlayerRef.current.playVideo();
    }
  }, [youtubePlaying, youtubeReady]);

  // Remove MP3
  const removeMp3 = () => {
    if (mp3Ref.current) {
      mp3Ref.current.pause();
    }
    if (mp3Url) URL.revokeObjectURL(mp3Url);
    setMp3File(null);
    setMp3Url(null);
    setMp3Playing(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Remove YouTube
  const removeYoutube = () => {
    setYoutubeId(null);
    setYoutubeUrl("");
  };

  return (
    <div className="glass-card p-6 max-w-2xl mx-auto mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Music className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Muzyka w tle</h2>
          <p className="text-sm text-muted-foreground">Dodaj własną muzykę pod dźwięki ambient</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* MP3 Upload Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Upload className="w-4 h-4" />
            <span>Własny plik MP3</span>
          </div>
          
          {!mp3File ? (
            <label className="block cursor-pointer">
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Kliknij lub przeciągnij plik MP3</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/mpeg,audio/mp3"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          ) : (
            <div className="bg-secondary/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground truncate max-w-[150px]">
                  {mp3File.name}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMp3Playing(!mp3Playing)}
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                      mp3Playing ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80"
                    )}
                  >
                    {mp3Playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={removeMp3}
                    className="w-8 h-8 rounded-lg bg-destructive/20 text-destructive flex items-center justify-center hover:bg-destructive/30 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <Slider
                  value={[mp3Volume]}
                  onValueChange={(v) => setMp3Volume(v[0])}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-8">{mp3Volume}%</span>
              </div>
            </div>
          )}
        </div>

        {/* YouTube Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Youtube className="w-4 h-4" />
            <span>YouTube</span>
          </div>
          
          {!youtubeId ? (
            <div className="space-y-3">
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="Wklej link do YouTube..."
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                onClick={handleYoutubeSubmit}
                disabled={!youtubeUrl}
                className={cn(
                  "w-full py-2.5 rounded-xl text-sm font-medium transition-colors",
                  youtubeUrl
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-muted-foreground cursor-not-allowed"
                )}
              >
                Dodaj wideo
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary">
                <div id="yt-player" ref={ytContainerRef} className="absolute inset-0 w-full h-full" />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleYoutube}
                  disabled={!youtubeReady}
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                    youtubePlaying ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80",
                    !youtubeReady && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {youtubePlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <Slider
                  value={[youtubeVolume]}
                  onValueChange={(v) => setYoutubeVolume(v[0])}
                  max={100}
                  step={1}
                  className="flex-1"
                  disabled={!youtubeReady}
                />
                <span className="text-xs text-muted-foreground w-8">{youtubeVolume}%</span>
                <button
                  onClick={removeYoutube}
                  className="w-8 h-8 rounded-lg bg-destructive/20 text-destructive flex items-center justify-center hover:bg-destructive/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackgroundMusic;
