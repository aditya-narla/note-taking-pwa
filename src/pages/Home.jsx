import { Link } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import { useNotes } from "../hooks/useNotes";
import { getAllNotes } from "../db/db";

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

    async function handleExport() {
        const notes = await getAllNotes();
        const json = JSON.stringify(notes, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'petpals-notes.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <main>
            <div className="home-actions">
                <button onClick={handleExport} className="export-btn">Export</button>
                <Link to="/create" className="create-btn">+ Create Note</Link>
            </div>
            {notes.map(note => (
                <NoteCard key={note.id} note={note} />
            ))}
        </main>
    )
}

export default Home