import React from 'react';

const Library = ({
	cover,
	name,
	artist,
}) => (
	<div className="library-song">
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

export default Library;
