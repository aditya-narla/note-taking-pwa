import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNoteById } from "../db/db";
import { useNotes } from "../hooks/useNotes";

function EditNote() {

    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState(null);
    const [createdAt, setCreatedAt] = useState(null);

    const { update, remove } = useNotes();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadNote() {
            const note = await getNoteById(Number(id));
            setTitle(note.title);
            setContent(note.content);
            setPhoto(note.photo || null);
            setCreatedAt(note.createdAt);
        }
        loadNote();
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();
        if (!content.trim()) {
            alert('Content is required.');
            return;
        }
        update({ id: Number(id), title, content, photo, createdAt });
        navigate('/');
    }

    function handleDelete() {
        if (!window.confirm('Delete this note?'))
            return;
        remove(Number(id));
        navigate('/');
    }

    function handlePhoto(e) {
        const file = e.target.files[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = () => setPhoto(reader.result);
        reader.readAsDataURL(file);
    }

    function handleRemovePhoto() {
        if (!window.confirm('Remove this photo?'))
            return;
        setPhoto(null);
    }

    return (
        <main>
            <div className="edit-header">
                <h2>Edit Note</h2>
                <button type="button" className="delete-btn"
                    onClick={handleDelete}>Delete</button>
            </div>

            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" placeholder="Title"
                    value={title} onChange={e => setTitle(e.target.value)} />

                <label>Content *</label>
                <textarea value={content}
                    onChange={e => setContent(e.target.value)}>
                </textarea>

                {photo && (
                    <div style={{ position: 'relative', display: 'inline-block', width: 'fit-content'}}>
                        <img src={photo} alt="note photo"
                            style={{
                                width: '80px', height: '80px', objectFit: 'cover',
                                borderRadius: '8px', marginBottom: '0.5rem'
                            }} />
                            <button type="button" className="remove-photo-btn"
                            onClick={handleRemovePhoto} >x</button>
                    </div>
                )}

                <label>Change image</label>
                <input type="file" accept="image/*"
                    capture="environment" onChange={handlePhoto} />

                <button type="submit">Save</button>
            </form>
        </main>
    )
}

export default EditNote