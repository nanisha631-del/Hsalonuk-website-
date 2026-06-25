import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react";

export default function AestheticVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState<string>("/frame video.mp4");

  // Dynamically resolve the active source as a background check or fallback
  useEffect(() => {
    const backupUrl = "https://assets.mixkit.co/videos/preview/mixkit-beauty-treatment-fluid-dripping-44358-large.mp4";
    const videoName = "Scalp health is so important💗Using the Scalp Silk from @hsalon.uk to nourish my scalp and give .mp4";
    const candidates = [
      "/frame video.mp4",
      "/frame%20video.mp4",
      `/${videoName}`,
      encodeURI(`/${videoName}`)
    ];

    const checkSources = async () => {
      for (const src of candidates) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 400);
          
          const response = await fetch(src, { method: "HEAD", signal: controller.signal });
          clearTimeout(timeoutId);

          if (response.ok) {
            const contentLength = response.headers.get("content-length");
            if (contentLength && parseInt(contentLength, 10) > 1000) {
              setVideoSrc(src);
              return;
            }
          }
        } catch (e) {
          // Fall through
        }
      }
    };

    checkSources();
  }, []);

  // Sync isMuted state with the actual modern HTML5 video tag
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
    }
  }, [isMuted]);

  // Attempt to autoplay elegantly once video source is ready
  useEffect(() => {
    const video = videoRef.current;
    if (video && videoSrc) {
      video.muted = isMuted;
      video.load();
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch((err) => {
            // Autoplay blocked under browser policy (safe silent catch)
            setIsPlaying(false);
            setIsLoading(false);
          });
      }
    }
  }, [videoSrc]);

  // Event handlers bound to native video tag to guarantee single source of truth representation
  const onNativePlay = () => {
    setIsPlaying(true);
    setIsLoading(false);
  };

  const onNativePause = () => {
    setIsPlaying(false);
  };

  const onNativePlaying = () => {
    setIsPlaying(true);
    setIsLoading(false);
  };

  const onNativeWaiting = () => {
    setIsLoading(true);
  };

  const handlePlayPause = async (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const video = videoRef.current;
    if (!video) return;

    try {
      if (video.paused) {
        setIsLoading(true);
        await video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.warn("Failed play action:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const targetMute = !isMuted;
    video.muted = targetMute;
    setIsMuted(targetMute);
    
    // Ensure it keeps playing on mute toggle
    if (video.paused && isPlaying) {
      video.play().catch(() => {});
    }
  };

  return (
    <div 
      className="relative w-full h-full group cursor-pointer select-none bg-[#EAEAEE] overflow-hidden rounded-2xl"
      onClick={() => handlePlayPause()}
    >
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          loop
          playsInline
          autoPlay
          muted={isMuted}
          preload="auto"
          poster="/image frame 1.jpeg"
          onPlay={onNativePlay}
          onPause={onNativePause}
          onPlaying={onNativePlaying}
          onWaiting={onNativeWaiting}
          onCanPlay={() => setIsLoading(false)}
          className="w-full h-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.06] hover:scale-[1.06] [will-change:transform]"
        />
      )}

      {/* Dark luxury overlay gradients for excellent readability and design harmony */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-60" />
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/30 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-40" />

      {/* Center status loader when buffering */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px] transition-all duration-300">
          <Loader2 className="w-8 h-8 text-white animate-spin stroke-[2]" />
        </div>
      )}

      {/* Active Control Buttons (Fixed in layout) */}
      <div className="absolute bottom-6 right-6 flex items-center gap-3 z-10">
        {/* Play / Pause Overlay Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePlayPause(e);
          }}
          className="w-12 h-12 rounded-full bg-white/95 hover:bg-white text-brand-black flex items-center justify-center shadow-lg transition-all active:scale-90 hover:scale-105 duration-200"
          title={isPlaying ? "Pause" : "Play"}
          id="video-play-pause-btn"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current text-brand-black" />
          ) : (
            <Play className="w-5 h-5 fill-current text-brand-black ml-0.5" />
          )}
        </button>

        {/* Mute / Unmute Overlay Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleMuteToggle(e);
          }}
          className="w-12 h-12 rounded-full bg-white/95 hover:bg-white text-brand-black flex items-center justify-center shadow-lg transition-all active:scale-90 hover:scale-105 duration-200"
          title={isMuted ? "Unmute" : "Mute"}
          id="video-mute-unmute-btn"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-brand-black stroke-[2.5]" />
          ) : (
            <Volume2 className="w-5 h-5 text-brand-black stroke-[2.5]" />
          )}
        </button>
      </div>

      {/* Premium centrally aligned micro hover active state visual */}
      {!isLoading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100">
          <div className="w-16 h-16 rounded-full bg-black/30 backdrop-blur-xs flex items-center justify-center text-white border border-white/20 transform scale-90 group-hover:scale-100 transition-transform duration-300">
            {isPlaying ? (
              <Pause className="w-6 h-6 stroke-[2]" />
            ) : (
              <Play className="w-6 h-6 stroke-[2] pl-0.5 fill-current" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
