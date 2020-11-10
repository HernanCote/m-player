import React, { useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
	faPlay, 
	faAngleLeft, 
	faAngleRight,
	faPause,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
	audio,
	isPlaying,
	setIsPlaying,
}) => {

	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	});

	const audioRef = useRef(null);

	const playSongHandler = () => {
		if(isPlaying) {
			audioRef.current.pause();
			setIsPlaying(false);
		} else {
			audioRef.current.play();
			setIsPlaying(true);
		}
	};
  
	const timeUpdateHandler = e => {
		const currentTime = e.target.currentTime;
		const duration = e.target.duration;
    
		setSongInfo({ 
			...songInfo, 
			currentTime,
			duration, 
		});
	};
  
	const dragHandler = e => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ 
			...songInfo, 
			currentTime: e.target.value, 
		});
	};
  
	const getTime = time => `${Math.floor(time / 60)}:${('0' + Math.floor(time % 60)).slice(-2)}`;
  
	const { currentTime, duration } = songInfo;
  
	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(currentTime)}</p>
				<input 
					type="range"
					min={0}
					max={duration}
					value={currentTime}
					onChange={dragHandler}
				/>
				<p>{getTime(duration)}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon 
					size="2x"
					className="skip-back" 
					icon={faAngleLeft}
				/>
				<FontAwesomeIcon 
					size="2x"
					className="play" 
					icon={isPlaying ? faPause : faPlay}
					onClick={playSongHandler}
				/>
				<FontAwesomeIcon 
					size="2x"
					className="skip-forward" 
					icon={faAngleRight}
				/>
			</div>
			<audio 
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				ref={audioRef}
				src={audio}
			></audio>
		</div>
	);};

export default Player;
