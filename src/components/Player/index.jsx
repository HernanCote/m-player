import React, { useEffect } from 'react';

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
	audioRef,
	setSongInfo,
	songInfo,
	songs,
	currentSong,
	setSongs,
	setIsPlaying,
	setCurrentSong,
	skipTrackHandler,
}) => {

	useEffect(() => {
		setSongInfo(async () => {
			await setCurrentSong(currentSong);
		
			const newSongs = songs.map(s => s.id === currentSong.id 
				? { 
					...s, 
					active: true, 
				} 
				: { 
					...s, 
					active: false, 
				});
			setSongs(newSongs);
			isPlaying && audioRef.current.play();
		});
	}, [currentSong]);

	const playSongHandler = () => {
		if(isPlaying) {
			audioRef.current.pause();
			setIsPlaying(false);
		} else {
			audioRef.current.play();
			setIsPlaying(true);
		}
	};
  

	const { 
		currentTime, 
		duration, 
		animationPercentage,
	} = songInfo;

	const trackAnimation = {
		transform: `translateX(${animationPercentage}%)`,
	};

	const dragHandler = e => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ 
			...songInfo, 
			currentTime: e.target.value,
			animationPercentage: (currentTime/duration) * 100, 
		});
	};

	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(currentTime)}</p>
				<div 
					className="track"
					style={{ background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})` }}
				>
					<input 
						type="range"
						min={0}
						max={duration || 0}
						value={currentTime || 0}
						onChange={dragHandler}
					/>
					<div 
						style={trackAnimation}
						className="animate-track"
					></div>
				</div>
				<p>{getTime(duration)}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon 
					onClick={() => skipTrackHandler(-1)}
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
					onClick={() => skipTrackHandler()}
					size="2x"
					className="skip-forward" 
					icon={faAngleRight}
				/>
			</div>
		</div>
	);};

export default Player;
