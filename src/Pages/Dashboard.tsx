import { useEffect, useState } from "react"
import type { LoginStatus, Note, User } from "../data/types"
import { Login } from "../Components/UserComponents/Login"
import { UpdateUser } from "../Components/UserComponents/UpdateUser"
import { NewUser } from "../Components/UserComponents/NewUser"
import { NoteList } from "../Components/NoteComponents/NoteList"
import { CreateNote } from "../Components/NoteComponents/CreateNote"

export function Dashboard () {

    const [createUser, setCreateUser] = useState<boolean>(false)

    const [loginStatus, setLoginStatus] = useState<LoginStatus>(
            {
                user: null,
                loginStatus: false
            }
    )

    const [allNotes, setAllNotes] = useState<Note[]>([]);

    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

    const [searchTag, setSearchTag] = useState<string>('');

    // const [switch, setSwitch] = useState<boolean>(false);

    const createUserProp = (input: boolean):void  => {
        setCreateUser(input)
    }

    const updateLoginStatus = (input: LoginStatus):void => {
        setLoginStatus(input)
    }

    async function getNotes(): Promise<void> {
        try {
            const response = await fetch("http://localhost:3001/notes");
            if (!response.ok) {
                throw new Error("Unable to load notes")
            }
            // Get json from response
            const data = await response.json();
            // Set all notes
            setAllNotes(data);
        } catch (error) {
            console.error(error)
        }
    }

    function updateFilteredNotes(notes: Note[], user: User): void {        
        // Filter by user
        console.log(`Start of updateFilteredNotes()`);
        console.log("user.id:", user.id);
        console.log("user.name:", user.name)
        if (loginStatus.user && loginStatus.loginStatus) {
            console.log("Passed login status condition");
            console.log("input notes:", notes);
            for (const note of notes) {
                console.log("note:", note)
                console.log("note.userId:", note.userId)
            }
            const userNotes = notes.filter((note) => (note.userId === user.id.toString()));
            console.log("userNotes:", userNotes);
            setFilteredNotes(userNotes);
        }
        // Filter tag
        if (searchTag) {
            const taggedNotes: Note[] = [];
            // Loop over all notes
            for (const note of filteredNotes) {
                // For every note, loop over all tags
                if (note.tags) {
                    for (const tag of note.tags) {
                        // If searchTag matches a tag, include that note
                        if (searchTag == tag)
                            taggedNotes.push(note);
                    }
                }
            }
            setFilteredNotes(taggedNotes);
        }
    }

    // function toggleSwitch() {
    //     if (switch) {
    //         setSwitch(false)
    //     } else {
    //         setSwitch(true)
    //     }
    // }

    // When login status changes, load all notes
    useEffect(() => {
        console.log('useEffect after login status change:', loginStatus);
        getNotes();        
        console.log("allNotes after getNotes():", allNotes);
    }, [loginStatus]);

    // When all notes changes, filter notes
    useEffect(() => {
        console.log("useEffect after all notes change")
        console.log("allNotes after allNotes change:", allNotes);
        if (loginStatus.user && allNotes) {
            updateFilteredNotes(allNotes, loginStatus.user);
        }
        console.log("filteredNotes:", filteredNotes);
    }, [allNotes]);

    // When input tag search changes, filter notes
    // useEffect(() => {
    //     console.log('useEffect after tag search change.');
    //     if (loginStatus.user) {
    //         updateFilteredNotes(allNotes, loginStatus.user);
    //     }
    //     console.log("filteredNotes:", filteredNotes);
    // }, [searchTag]);

    useEffect(() => {
        console.log('useEffect after change to filtered notes.');
        console.log("filteredNotes:", filteredNotes);
    }, [filteredNotes]);

    function renderDashboard () {
        if(loginStatus.loginStatus) {
            return (
            <>
                <UpdateUser { ...loginStatus } />
                <CreateNote { ...loginStatus } />
                {/* Pass allNotes, filteredNotes, getNotes, and updateFilteredNotes to NoteList */}
                <NoteList loginStatus={loginStatus} allNotes={allNotes} filteredNotes={filteredNotes} getNotes={getNotes} updateFilteredNotes={updateFilteredNotes} />
            </>
        );
        } else {
            if (createUser) {
                return <NewUser />
            } else {
                return (
                    <Login
                        createUser={createUser}
                        loginStatus={loginStatus}
                        updateLoginStatus={updateLoginStatus}
                        createUserProp={createUserProp}                        
                    />
                )
            }
        }   
    }

    return (
        <>
            <div>
                {renderDashboard()}
            </div>            
        </>
    )
}