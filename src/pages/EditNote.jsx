import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNoteById } from "../db/db";
import { useNotes } from "../hooks/useNotes";

function EditNote() {

    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const { update } = useNotes();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadNote() {
            const note = await getNoteById(Number(id));
            setTitle(note.title);
            setContent(note.content);
        }
        loadNote();
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();
        update({ id: Number(id), title, content});
        navigate('/');
    }

    return (
        <main>
            <h2>Edit Note</h2>

            <form onSubmit={handleSubmit}>
                <label>Title *</label>
                <input type="text" placeholder="Title"
                value={title} onChange={e => setTitle(e.target.value)} />

                <label>Content *</label>
                <textarea value={content}
                onChange={e => setContent(e.target.value)}></textarea>

                <button type="submit">Save</button>
            </form>
        </main>
    )
}

export default EditNote