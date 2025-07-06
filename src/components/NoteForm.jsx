import React from "react";

export default function NoteForm({
	onTitleChangeHandler,
	title,
	onBodyChangeHandler,
	body,
	onSubmitHandler,
}) {
	let maxLength = 50 - title.length;

	return (
		<div className="note-input">
			<h2>Tambah Catatan</h2>
			<form>
				<p className="note-input__title__char-limit">
					Sisa Karakter Judul:{maxLength}
				</p>
				<input
					type="text"
					className="note-input__title"
					placeholder="Title"
					value={title}
					onChange={onTitleChangeHandler}
					required
				/>
				<textarea
					className="note-input__body"
					required
					placeholder="Write your note here ..."
					onChange={onBodyChangeHandler}
					value={body}
				></textarea>
				<button type="button" onClick={onSubmitHandler}>
					Simpan
				</button>
			</form>
		</div>
	);
}
