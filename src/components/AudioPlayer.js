// import { CircularProgress } from '@material-ui/core';
// import { PauseRounded, PlayArrowRounded } from '@material-ui/icons';
// import React, { useState, useRef, useEffect } from 'react';
import React from 'react';
import './AudioPlayer.css';
import ReactAudioPlayer from 'react-audio-player';

export default function AudioPlayer({
  audioID,
  setAudioID,
  sender,
  audioUrl,
  roomID,
  id,
}) {
  // const [isPlaying, setPlaying] = useState(false);
  // const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [isMetaDataLoaded, setIsMetaDataLoaded] = useState(false);
  // const [sliderValue, setSliderValue] = useState(0);
  // const [duration, setDuration] = useState(false);

  // const totalDuration = useRef('');
  // const audio = useRef(new Audio(audioUrl));
  // const interval = useRef();
  // const isUploading = useRef(audioUrl === 'uploading');

  // React.useEffect(() => {
  //   if (isUploading.current && audioUrl !== 'uploading') {
  //     audio.current = new Audio(audioUrl);
  //     audio.current.load();
  //     setIsLoaded(true);
  //   } else if (isUploading.current === false) {
  //     setIsLoaded(true);
  //   }
  // }, [audioUrl]);

  // function getAudioDuration(media) {
  //   return new Promise((resolve) => {
  //     media.onloadedmetadata = () => {
  //       media.currentTime = Number.MAX_SAFE_INTEGER;
  //       media.ontimeupdate = () => {
  //         media.ontimeupdate = () => {};
  //         media.currentTime = 0.1;
  //         resolve(media.duration);
  //       };
  //     };
  //   });
  // }

  // useEffect(() => {
  //   if (isLoaded) {
  //     getAudioDuration(audio.current).then(() => {
  //       setIsMetaDataLoaded(true);
  //     });
  //   }
  // }, [isLoaded]);

  // useEffect(() => {
  //   if (isMetaDataLoaded) {
  //     audio.current.addEventListener('canplaythrough', () => {
  //       if (!totalDuration.current) {
  //         setIsMediaLoaded(true);
  //         const time = formatTime(audio.current.duration);
  //         totalDuration.current = time;
  //         setDuration(totalDuration.current);
  //       }
  //     });

  //     audio.current.addEventListener('ended', () => {
  //       clearInterval(interval.current);
  //       setDuration(totalDuration.current);
  //       setSliderValue(0);
  //       setPlaying(false);
  //     });
  //   }
  // }, [isMetaDataLoaded]);

  // useEffect(() => {
  //   if (audioID !== id) {
  //     audio.current.pause();
  //     setPlaying(false);
  //   }
  // }, [audioID, id]);

  // function formatTime(time) {
  //   let minutes = Math.floor(time / 60);
  //   let seconds = Math.floor(time - minutes * 60);

  //   if (minutes < 10) {
  //     minutes = `0${minutes}`;
  //   }
  //   if (seconds < 10) {
  //     seconds = `0${seconds}`;
  //   }
  //   return `${minutes}:${seconds}`;
  // }

  // function playAudio() {
  //   setPlaying(true);
  //   audio.current.play();
  //   if (audioID !== id) {
  //     setAudioID(id);
  //   }
  //   interval.current = setInterval(updateSlider, 100);
  // }

  // function updateSlider() {
  //   let sliderPosition = 0;
  //   const { currentTime, duration } = audio.current;
  //   if (typeof duration === 'number') {
  //     sliderPosition = currentTime * (100 / duration);
  //     setSliderValue(sliderPosition);
  //     const time = formatTime(currentTime);
  //     setDuration(time);
  //   }
  // }

  // function stopAudio() {
  //   audio.current.pause();
  //   clearInterval(interval.current);
  //   setPlaying(false);
  //   setDuration(totalDuration.current);
  // }

  // function scrubAudio(event) {
  //   const value = event.target.value;
  //   const { duration } = audio.current;

  //   if (isMediaLoaded) {
  //     const seekTo = duration * (value / 100);
  //     audio.current.currentTime = seekTo;
  //     setSliderValue(value);
  //   }
  // }

  return (
    <>
      <div className={`audioplayer ${sender ? '' : 'audioplayer__alt'}`}>
        <ReactAudioPlayer src={audioUrl} controls />
        {/* {!isMediaLoaded ? (
          <CircularProgress />
        ) : isPlaying ? (
          <PauseRounded className="pause" onClick={stopAudio} />
        ) : !isPlaying ? (
          <PlayArrowRounded onClick={playAudio} />
        ) : null}
        <div>
          <span
            style={{ width: `${sliderValue}` }}
            className="audioplayer__slider--played"
          />
          <input
            type="range"
            min="1"
            max="100"
            value={sliderValue}
            className="audioplayer__slider"
            onChange={scrubAudio}
          />
        </div> */}
      </div>
      {/* <span className="chat__timestamp audioplayer__time">{duration}</span> */}
    </>
  );
}
