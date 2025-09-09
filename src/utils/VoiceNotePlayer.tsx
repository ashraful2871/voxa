import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

interface VoiceNotePlayerProps {
  src: string;
}

export default function VoiceNotePlayer({ src }: VoiceNotePlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState("0:00");

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleLoadedMetadata = () => {
        const mins = Math.floor(audio.duration / 60);
        const secs = Math.floor(audio.duration % 60)
          .toString()
          .padStart(2, "0");
        setDuration(`${mins}:${secs} min`);
      };

      audio.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-[#20201E] rounded-lg p-1 flex flex-col">
      {/* Hidden Audio */}
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Play button + fake waveform */}
      <div className="flex items-center gap-2 ">
        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        {/* Fake waveform bars */}
        <div className="flex gap-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-gray-400 rounded mt-3"
              style={{
                height: `${Math.random() * 20 + 10}px`, // random static heights
              }}
            />
          ))}
        </div>
      </div>

      {/* Duration */}
      <p className="text-xs text-secondary mt-2">{duration}</p>
    </div>
  );
}
