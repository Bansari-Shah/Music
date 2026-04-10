import React, { useState, useRef, useEffect } from "react";
import songs from "./data/songs";
import "./App.css";

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentSongIndex]);

  const playPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }

    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) =>
      prev === 0 ? songs.length - 1 : prev - 1
    );
  };

  return (
    <div className="player">
      <h2>{songs[currentSongIndex].title}</h2>
      <p>{songs[currentSongIndex].artist}</p>

      <img
        src={songs[currentSongIndex].cover}
        alt="cover"
        className="cover"
      />

      <audio
        ref={audioRef}
        src={songs[currentSongIndex].src}
        onEnded={nextSong}
      />

      <div className="controls">
        <button onClick={prevSong}>⏮</button>
        <button onClick={playPause}>
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button onClick={nextSong}>⏭</button>
      </div>
    </div>
  );
}

export default App;