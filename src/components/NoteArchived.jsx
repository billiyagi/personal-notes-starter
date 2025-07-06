import React from "react";
import NoteList from "./NoteList";
import { getArchivedNotes } from "../utils";

export default function NoteArchived() {
	return (
		<div>
			<h2>Catatan yang diarsipkan</h2>
			<NoteList notes={getArchivedNotes()} />
		</div>
	);
}
