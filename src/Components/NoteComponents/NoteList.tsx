import type { LoginStatus, Note, NoteListProps } from "../../data/types";
import { NoteCard } from "./NoteCard";

export function NoteList({loginStatus, allNotes, filteredNotes, getNotes, updateFilteredNotes}: NoteListProps): React.JSX.Element {

    function renderNoteList() {
        if (loginStatus.user) {
            if (filteredNotes.length > 0)
            {
                return (
                    filteredNotes.map((note: Note) => (
                        <NoteCard key={note.id} {...note} />))
                );
            } else {
                return (<p>There are no notes.</p>);
            }

        } else {
            return (<p>Unable to load user.</p>);
        }
    }

    return (
        <>
            <h2>Notes</h2>
            {renderNoteList()}
        </>
    );
}

