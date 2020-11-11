import React from 'react';

import LibrarySong from '../LibrarySong';

const Library = ({
	songs,
}) => (
	<div className="library">
		<h2>Library</h2>
		<div className="library-songs">
			{songs.map((song, idx) => <LibrarySong key={idx} {...song}/>)}
		</div>
	</div>
);

export default Library;
