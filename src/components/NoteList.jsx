import React from "react";
import NoteItem from "./NoteItem";

export default function NoteList({ notes }) {
	return (
		<>
			<div className="notes-list">
				{notes.map((note) => (
					<NoteItem key={note.id} note={note} />
				))}
			</div>
			<div>
				{notes.length === 0 && (
					<div className="notes-list-empty">
						<p>No notes available.</p>
					</div>
				)}
			</div>
		</>
	);
}
