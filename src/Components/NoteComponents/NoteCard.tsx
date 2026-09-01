import type { Note } from "../../data/types";

export function NoteCard(note: Note): React.JSX.Element {
    function renderNoteCard() {
        return (
            <div>
                <div>
                    <h3>{note.title}</h3>
                    <p>{note.tags}</p>
                </div>
                <p>{note.content}</p>
                {/* <p>{note.creationDate && `${note.creationDate.getFullYear()}-${note.creationDate.getMonth()}-${note.creationDate.getDate()}`}</p> */}
                {note.creationDate && <p>{`${note.creationDate}`}</p>}
            </div>
        );
    }
    
    return (
        <>
            {renderNoteCard()}
        </>
    );
}
