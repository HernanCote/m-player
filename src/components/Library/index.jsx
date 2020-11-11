import React from 'react';

import LibrarySong from '../LibrarySong';

const Library = ({
	audioRef,
	songs,
	setSongs,
	isPlaying,
	setCurrentSong,
	openLibrary,
}) => (
	<div className={`library ${openLibrary && 'active-library'}`}>
		<h2>Library</h2>
		<div className="library-songs">
			{songs.map(song => 
				<LibrarySong 
					key={song.id}  
					setSongs={setSongs}
					song={song}
					songs={songs}
					setCurrentSong={setCurrentSong}
					audioRef={audioRef}
					isPlaying={isPlaying}
				/>)}
		</div>
	</div>
);

export default Library;
