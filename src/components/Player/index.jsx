import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
	faPlay, 
	faAngleLeft, 
	faAngleRight,
	faPause,
} from '@fortawesome/free-solid-svg-icons';

import { getTime } from '../../utils';

const Player = ({
	isPlaying,
	setIsPlaying,
	audioRef,
	setSongInfo,
	songInfo,
}) => {

	const playSongHandler = () => {
		if(isPlaying) {
			audioRef.current.pause();
			setIsPlaying(false);
		} else {
			audioRef.current.play();
			setIsPlaying(true);
		}
	};
  
	const dragHandler = e => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ 
			...songInfo, 
			currentTime: e.target.value, 
		});
	};
  
	const { currentTime, duration } = songInfo;
  
	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(currentTime)}</p>
				<input 
					type="range"
					min={0}
					max={duration || 0}
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
		</div>
	);};

export default Player;
