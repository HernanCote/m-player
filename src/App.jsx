import React, { useState, useRef } from 'react';

import Song from './components/Song';
import Player from './components/Player';
import Library from './components/Library';
import Nav from './components/Nav';

import data from './data';

import './styles/app.scss';

const App = () => {
	
	const audioRef = useRef(null);

	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs.filter(x => x.active)[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
		animationPercentage: 0,
	});
	const [openLibrary, setOpenLibrary] = useState(false);


	const timeUpdateHandler = e => {
		const currentTime = e.target.currentTime;
		const duration = e.target.duration;
    
		setSongInfo({ 
			...songInfo, 
			currentTime,
			duration,
			animationPercentage: (currentTime/duration) * 100,
		});
	};

	const skipTrackHandler = async (direction = 1) => {
		if (typeof(direction) !== 'number') return;
		const currentIndex = 	songs.findIndex(x => x.id === currentSong.id);
		const index = (currentIndex + direction) % songs.length >= 0 ? ((currentIndex + direction) % songs.length) : (songs.length - 1);
		setSongInfo({ 
			...songInfo, 
			animationPercentage: 0,
		});
		await setCurrentSong(songs[index]);
		isPlaying && audioRef.current.play();
	};

	return (
		<div 
			className={`App ${openLibrary && 'library-active'}`}
		>
			<Nav 
				openLibrary={openLibrary}
				setOpenLibrary={setOpenLibrary}
			/>
			<Song {...currentSong} />
			<Player 
				setSongs={setSongs}
				songs={songs}
				currentSong={currentSong} 
				isPlaying={isPlaying}
				audioRef={audioRef}
				songInfo={songInfo}
				setCurrentSong={setCurrentSong}
				setIsPlaying={setIsPlaying}
				setSongInfo={setSongInfo}
				skipTrackHandler={skipTrackHandler}
			/>
			<Library 
				openLibrary={openLibrary}
				audioRef={audioRef}
				songs={songs}
				setSongs={setSongs}
				isPlaying={isPlaying}
				setCurrentSong={setCurrentSong}
			/>
			<audio 
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				onEnded={() => skipTrackHandler()}
				ref={audioRef}
				src={currentSong.audio}
			></audio>
		</div>
	);};

export default App;
