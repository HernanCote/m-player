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
	});
	const [openLibrary, setOpenLibrary] = useState(false);


	const timeUpdateHandler = e => {
		const currentTime = e.target.currentTime;
		const duration = e.target.duration;
    
		setSongInfo({ 
			...songInfo, 
			currentTime,
			duration, 
		});
	};

	return (
		<div className="App">
			<Nav 
				openLibrary={openLibrary}
				setOpenLibrary={setOpenLibrary}
			/>
			<Song {...currentSong} />
			<Player 
				currentSong={currentSong} 
				isPlaying={isPlaying}
				audioRef={audioRef}
				songInfo={songInfo}
				setIsPlaying={setIsPlaying}
				setSongInfo={setSongInfo}
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
				ref={audioRef}
				src={currentSong.audio}
			></audio>
		</div>
	);};

export default App;
