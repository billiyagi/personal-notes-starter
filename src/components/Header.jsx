import React from "react";

export default function Header({ keyword, setKeyword }) {
	return (
		<header className="note-app__header">
			<h1>Notes App</h1>
			<div className="note-search">
				<input
					type="text"
					placeholder="search your note..."
					value={keyword}
					onChange={setKeyword}
				/>
			</div>
		</header>
	);
}
