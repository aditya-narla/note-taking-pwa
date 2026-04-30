import { useState } from "react"
import { useNotes } from "../hooks/useNotes";
import { useNavigate } from "react-router-dom";

function CreateNote() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState(null);

    const { add } = useNotes();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            alert('Title and content are required.');
            return;
        }
        add({ title, content, photo });
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

    return (
        <main>
            <h2>Create Note</h2>

            <form onSubmit={handleSubmit}>

                <label>Title *</label>
                <input type="text" placeholder="Pet Day 4/21"
                    value={title} onChange={e => setTitle(e.target.value)} />

                <label>Content *</label>
                <textarea value={content}
                    onChange={e => setContent(e.target.value)}></textarea>

                {photo && <img src={photo} alt="note photo" style={{
                    width: '80px', height: '80px', objectFit: 'cover',
                    borderRadius: '8px'
                }} />}

                <label>Add image</label>
                <input type="file" accept="image/*" capture="environment"
                    onChange={handlePhoto} />

                <button type="submit">Save</button>

            </form>
        </main>
    )
}

export default CreateNote