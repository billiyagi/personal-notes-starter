import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NoteForm from "./components/NoteForm";
import { getActiveNotes, getArchivedNotes } from "./utils";
import NoteItem from "./components/NoteItem";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: "",
			activeNote: getActiveNotes(),
			archiveNote: [],
			form: {
				id: "",
				title: "",
				body: "",
				archived: false,
				createdAt: "",
			},
		};

		/**
		 * Action on Note Handler
		 */
		this.onDeleteHandler = this.onDeleteHandler.bind(this);
		this.onArchiveHandler = this.onArchiveHandler.bind(this);
		this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);

		/**
		 * Form Handler
		 */
		this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
		this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
		this.onSubmitHandler = this.onSubmitHandler.bind(this);

		/**
		 * Search Handler
		 */
		this.onSearchHandler = this.onSearchHandler.bind(this);
	}

	onSearchHandler(e) {
		this.setState({
			...this.state,
			keyword: e.target.value,
		});
	}

	onDeleteHandler(id, isArchive) {
		const notes = this.state.activeNote.filter((note) => note.id !== id);

		this.setState({
			...this.state,
			activeNote: notes,
		});
	}

	onDeleteArchiveHandler(id) {
		const notes = this.state.archiveNote.filter((note) => note.id !== id);

		this.setState({
			...this.state,
			archiveNote: notes,
		});
	}

	onArchiveHandler(id) {
		const note = this.state.activeNote.find((note) => note.id === id);
		if (!note) return;

		note.archived = true;

		this.setState({
			...this.state,
			activeNote: this.state.activeNote.filter((note) => note.id !== id),
			archiveNote: [...this.state.archiveNote, note],
		});
	}

	onUnarchiveHandler(id) {
		const note = this.state.archiveNote.find((note) => note.id === id);
		if (!note) return;

		note.archived = false;

		this.setState({
			...this.state,
			activeNote: [...this.state.activeNote, note],
			archiveNote: this.state.archiveNote.filter(
				(note) => note.id !== id
			),
		});
	}

	onTitleChangeHandler = (event) => {
		if (event.target.value.length > 50) {
			return;
		}

		this.setState({
			...this.state,
			form: {
				...this.state.form,
				title: event.target.value,
			},
		});
	};

	onBodyChangeHandler = (event) => {
		this.setState({
			...this.state,
			form: {
				...this.state.form,
				body: event.target.value,
			},
		});
	};

	onSubmitHandler = () => {
		this.state.activeNote.push({
			id: +new Date(),
			title: this.state.form.title,
			body: this.state.form.body,
			archived: false,
			createdAt: new Date().toISOString(),
		});

		this.setState(this.state);

		/**
		 * Reset form
		 */
		this.setState({
			...this.state,
			form: {
				id: "",
				title: "",
				body: "",
				archived: false,
				createdAt: "",
			},
		});
	};

	render() {
		/**
		 * Get the active note, with the search result if it exist keyword
		 */
		const activeNote = this.state.activeNote.filter((note) => {
			return note.title.toLowerCase().includes(this.state.keyword);
		});

		/**
		 * Get the archive note, with the search result if it exist keyword
		 */
		const archiveNote = this.state.archiveNote.filter((note) => {
			return note.title.toLowerCase().includes(this.state.keyword);
		});

		return (
			<>
				<Header
					keyword={this.state.keyword}
					setKeyword={this.onSearchHandler}
				/>
				<div className="note-app__body">
					<NoteForm
						title={this.state.form.title}
						onTitleChangeHandler={this.onTitleChangeHandler}
						body={this.state.form.body}
						onBodyChangeHandler={this.onBodyChangeHandler}
						onSubmitHandler={this.onSubmitHandler}
					/>

					<div>
						<h2>Catatan Aktif</h2>
						<div className="notes-list">
							{activeNote.map((note) => (
								<NoteItem
									key={note.id}
									note={note}
									onDeleteHandler={this.onDeleteHandler}
									onArchiveHandler={this.onArchiveHandler}
								/>
							))}
						</div>
						<div>
							{activeNote.length === 0 && (
								<div className="notes-list-empty">
									<p>No notes available.</p>
								</div>
							)}
						</div>
					</div>

					<div>
						<h2>Catatan yang diarsipkan</h2>
						<div className="notes-list">
							{archiveNote.map((note) => (
								<NoteItem
									key={note.id}
									note={note}
									onDeleteHandler={
										this.onDeleteArchiveHandler
									}
									onArchiveHandler={this.onArchiveHandler}
									onUnarchiveHandler={this.onUnarchiveHandler}
								/>
							))}
						</div>
						<div>
							{archiveNote.length === 0 && (
								<div className="notes-list-empty">
									<p>No notes available.</p>
								</div>
							)}
						</div>
					</div>
				</div>
				<Footer />
			</>
		);
	}
}

export default App;

// export default function App() {
// 	return (
// 		<>
// 			<Header />
// 			<div className="note-app__body">
// 				<NoteForm />
// 				<NoteActive />
// 				<NoteArchived />
// 			</div>
// 			<Footer />
// 		</>
// 	);
// }
