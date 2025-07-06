import React from "react";
import { getActiveNotes } from "../utils";
import NoteList from "./NoteList";

export default function NoteActive({ notes }) {
	return (
		<div>
			<h2>Catatan Aktif</h2>
			<NoteList notes={notes} />
		</div>
	);
}
