import { useState } from "react";
import type { Note } from "../../data/types";
import { EditNote } from "./EditNote";

export function NoteCard(note: Note): React.JSX.Element {
    const [editState, setEditState] = useState<boolean>(false)

    const changeEditState = () => {
        setEditState((prevState) => !prevState)
    }

    function renderNoteCard() {
        return (
            <div>
                <div>
                    <h3>{note.title}</h3>
                    <ul>{note.tags?.map((tag) => (
                        <li key={note.id}>{tag}</li>
                    ))}</ul>
                </div>
                <p>{note.content}</p>
                {note.creationDate && <p>{`${note.creationDate}`}</p>}
                <div>
                    {editState && (
                        <EditNote note={note} changeEditState={changeEditState} />
                    )}
                </div>
                <button onClick={changeEditState}>{!editState ? 'EditNote' : 'Close' }</button>
            </div>
        );
    }


    
    return (
        <>
            {renderNoteCard()}
        </>
    );
}
