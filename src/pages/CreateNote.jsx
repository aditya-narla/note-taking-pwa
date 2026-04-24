import { useState } from "react"
import { useNotes } from "../hooks/useNotes";
import { useNavigate } from "react-router-dom";

function CreateNote() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { add } = useNotes();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        add({ title, content });
        navigate('/');
    }

    return (
        <main>
            <h1>Create Note</h1>

            <form onSubmit={handleSubmit}>

                <label>Title</label>
                <input type="text" placeholder="Title"
                value={title} onChange={e => setTitle(e.target.value)} />

                <label>Content</label>
                <textarea value={content} 
                onChange={e => setContent(e.target.value)}></textarea>

                <button type="submit">Save</button>

            </form>
        </main>
    )
}

export default CreateNote