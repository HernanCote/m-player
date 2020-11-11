import React from 'react';


const LibrarySong = ({
	songs,
	setSongs,
	audioRef,
	song,
	isPlaying,
	setCurrentSong,
}) => {
	const { 
		id,
		cover,
		name,
		artist,
	} = song;

	const selectHandler = async () => {
		await setCurrentSong(song);
		
		const newSongs = songs.map(s => s.id === id 
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
	};
		
	return (
		<div 
			className={`library-song ${song.active && 'active'}`} 
			onClick={selectHandler}
		>
			<img 
				src={cover} 
				alt={name}
			></img>
			<div className="song-description">
				<h3>{name}</h3>
				<h4>{artist}</h4>
			</div>
		</div>
	);
};

export default LibrarySong;
