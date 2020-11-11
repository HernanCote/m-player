import React, { useState } from 'react';

import Song from './components/Song';
import Player from './components/Player';
import Library from './components/Library';

import data from './data';

import './styles/app.scss';

const App = () => {
	
	const [songs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs.filter(x => x.active)[0]);
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<div className="App">
			<Song {...currentSong} />
			<Player 
				{...currentSong} 
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
			/>
			<Library 
				songs={songs}
			/>
		</div>
	);};

export default App;
