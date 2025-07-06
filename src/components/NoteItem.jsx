import React from "react";
import { showFormattedDate } from "../utils";

export default function NoteItem({
	note,
	onDeleteHandler,
	onArchiveHandler,
	onUnarchiveHandler,
}) {
	const handleArchive = () => {
		if (note.archived) {
			onUnarchiveHandler(note.id);
		} else {
			onArchiveHandler(note.id);
		}
	};

	return (
		<div className="note-item">
			<div className="note-item__content">
				<h3 className="note-item__title">{note.title}</h3>
				<p className="note-item__date">
					{showFormattedDate(note.createdAt)}
				</p>
				<p className="note-item__body">{note.body}</p>
			</div>
			<div className="note-item__action">
				<button
					className="note-item__delete-button"
					onClick={() => onDeleteHandler(note.id)}
				>
					Delete
				</button>
				<button
					className="note-item__archive-button"
					onClick={handleArchive}
				>
					Arsipkan
				</button>
			</div>
		</div>
	);
}
