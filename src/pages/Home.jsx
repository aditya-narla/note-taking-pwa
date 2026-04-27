import NoteCard from "../components/NoteCard";
import { useNotes } from "../hooks/useNotes";

function Home() {

    const { notes, loading } = useNotes();

    if (loading) {
        return <p>Loading...</p>
    }
    
    else if (notes.length === 0) {
        return <p>No notes yet.</p>
    }

    return (
        <main>
            {notes.map(note => (
                <NoteCard key={note.id} note={note} />
            ))} 
        </main>
    )
}

export default Home