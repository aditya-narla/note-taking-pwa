import { Link } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import { useNotes } from "../hooks/useNotes";

function Home() {

    const { notes, loading } = useNotes();

    if (loading) {
        return <p>Loading...</p>
    }

    else if (notes.length === 0) {
        return (
            <main>
                <Link to="/create" className="create-btn">+ Create Note</Link>
                <p>No notes yet.</p>
            </main>
        )
    }

    return (
        <main>
            <Link to="/create" className="create-btn">+ Create Note</Link>
            {notes.map(note => (
                <NoteCard key={note.id} note={note} />
            ))}
        </main>
    )
}

export default Home