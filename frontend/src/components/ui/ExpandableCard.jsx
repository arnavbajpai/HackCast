"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { formatDistanceToNow } from "date-fns";
import { BASEURL } from "../../App";

const AudioPlayer = ({ card }) => {
  const fetchAudio = (audioFileId) => {
    return `${BASEURL}/audio/${audioFileId}`;
  };
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Helper function to format time (convert seconds to MM:SS)
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progressPercent =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progressPercent);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const seekTime =
        (e.nativeEvent.offsetX / e.target.offsetWidth) * duration;
      audioRef.current.currentTime = seekTime;
    }
  };

  return (
    <div className="w-full bg-gray-100 dark:bg-neutral-800 rounded-lg p-4 mt-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          {card.title}
        </h4>
        <button
          onClick={togglePlay}
          className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition-colors"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>

      <div className="flex items-center space-x-2 mb-2">
        <span className="text-xs text-neutral-600 dark:text-neutral-400">
          {formatTime(currentTime)}
        </span>
        <div
          className="flex-grow bg-gray-300 dark:bg-neutral-700 h-1 rounded-full cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="bg-green-500 h-1 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-xs text-neutral-600 dark:text-neutral-400">
          {formatTime(duration)}
        </span>
      </div>

      <audio
        ref={audioRef}
        src={fetchAudio(card.audio_file_id)}
        type="audio/mpeg"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  );
};

export function ExpandableCard({ cards }) {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`author-time-${active._id}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.author}{" "}
                      {formatDistanceToNow(new Date(active.created_at * 1000), {
                        addSuffix: true,
                      })}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="px-4 pb-4">
                  <AudioPlayer card={active} />
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base max-h-[300px] 
                                md:max-h-[400px] overflow-y-auto pb-10 flex flex-col items-start 
                                gap-4 dark:text-neutral-400 
                                [&::-webkit-scrollbar]:w-2
                                [&::-webkit-scrollbar-track]:bg-gray-100
                                [&::-webkit-scrollbar-thumb]:bg-gray-300
                                dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card, index) => {
          const timeAgo = formatDistanceToNow(
            new Date(card.created_at * 1000),
            {
              addSuffix: true,
            }
          );
          return (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={`card-${card.title}-${card._id}`}
              onClick={() => setActive(card)}
              className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-col md:flex-row ">
                <div className="">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`author-time-${card._id}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                  >
                    {card.author} {timeAgo}
                  </motion.p>
                </div>
              </div>
              <motion.button
                layoutId={`button-${card.title}-${id}`}
                className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
              >
                Listen
              </motion.button>
            </motion.div>
          );
        })}
      </ul>
    </>
  );
}

// Rest of the code remains the same...

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
