import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';

const AudioPlayer = ({ defaultAudioFile = null, autoplay = false }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioFile, setAudioFile] = useState(defaultAudioFile);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        if (defaultAudioFile) {
            setAudioFile(defaultAudioFile);
            if (audioRef.current) {
                audioRef.current.load();
                if (autoplay) {
                    (async () => {
                        try {
                            await audioRef.current.play();
                            setIsPlaying(true);
                        } catch (error) {
                            if (error.name !== 'AbortError') {
                                console.error(error);
                            }
                        }
                    })();
                }
            }
        }
    }, [defaultAudioFile, autoplay]);

    useEffect(() => {
        const handleDefaultAudio = (event) => {
            if (event.audioPath) {
                setAudioFile(event.audioPath);
                if (audioRef.current) {
                    audioRef.current.load();
                    if (autoplay) {
                        (async () => {
                            try {
                                await audioRef.current.play();
                                setIsPlaying(true);
                            } catch (error) {
                                if (error.name !== 'AbortError') {
                                    console.error(error);
                                }
                            }
                        })();
                    }
                }
            }
        };

        window.addEventListener('audioLoad', handleDefaultAudio);
        return () => window.removeEventListener('audioLoad', handleDefaultAudio);
    }, [autoplay]);

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setCurrentTime(audioRef.current.currentTime);
            }, 100);
            return () => clearInterval(interval);
        }
    }, [isPlaying]);

    const togglePlayPause = async () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            try {
                await audioRef.current.play();
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error(error);
                }
            }
        }
        setIsPlaying(!isPlaying);
    };

    const skipForward = () => {
        if (audioRef.current) audioRef.current.currentTime += 10;
    };

    const skipBackward = () => {
        if (audioRef.current) audioRef.current.currentTime -= 10;
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setAudioFile(fileURL);
            if (audioRef.current) audioRef.current.load();
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    };

    const handleDurationChange = () => {
        if (audioRef.current) setDuration(audioRef.current.duration);
    };

    const handleSliderChange = (event) => {
        const newTime = event.target.value;
        if (audioRef.current) audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    return (
        <div className="bg-zinc-900  rounded-lg shadow-lg  text-center w-full text-white py-4">
            <div className="mt-4">
                <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="text-gray-400 mb-4"
                />

                {audioFile && (
                    <div className="custom-audio-player">
                        <audio
                            ref={audioRef}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleDurationChange}
                            className="hidden"
                            loop
                        >
                            <source src={audioFile} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                )}
            </div>
            <div className="mt-4 relative">
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSliderChange}
                    className="w-full bg-gray-700 appearance-none h-2 rounded-lg"
                    style={{
                        background: `linear-gradient(to right, rgb(193, 42, 251) ${((currentTime / duration) * 100)}%, #4B5563 ${((currentTime / duration) * 100)}%)`,
                        transition: 'background 0.1s linear'
                    }}
                />
                <style jsx={'true'}>{`
                    input[type="range"]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 0;
                        height: 0;
                        background-color: transparent;
                    }

                    input[type="range"]::-moz-range-thumb {
                        width: 0;
                        height: 0;
                        background-color: transparent;
                    }
                `}</style>
            </div>
            <div className="mt-4 flex gap-16 justify-center items-center">
                <button onClick={skipBackward} className="text-neon hover:text-neon-light">
                    <FaBackward size={20}/>
                </button>
                <button onClick={togglePlayPause} className="text-neon hover:text-neon-light">
                    {isPlaying ? <FaPause size={20}/> : <FaPlay size={20}/>}
                </button>
                <button onClick={skipForward} className="text-neon hover:text-neon-light">
                    <FaForward size={20} />
                </button>
            </div>
        </div>
    );
};

export default AudioPlayer;
