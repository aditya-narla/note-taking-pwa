import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNoteById } from "../db/db";
import { useNotes } from "../hooks/useNotes";
import { isAllowedFile } from "../utils/fileUtils";
import { useRecorder } from "../hooks/useRecorder";

function EditNote() {

    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState(null);
    const [createdAt, setCreatedAt] = useState(null);
    const [attachments, setAttachments] = useState([]);

    const { update, remove } = useNotes();
    const navigate = useNavigate();
    const { recording, recordings, setRecordings, handleRecord, handleRemoveRecording } = useRecorder();

    useEffect(() => {
        async function loadNote() {
            const note = await getNoteById(Number(id));
            setTitle(note.title);
            setContent(note.content);
            setPhoto(note.photo || null);
            setCreatedAt(note.createdAt);
            setAttachments(note.attachments || []);
            setRecordings(note.recordings || []);
        }
        loadNote();
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();
        if (!content.trim()) {
            alert('Content is required.');
            return;
        }
        update({ id: Number(id), title, content, photo, createdAt, attachments, recordings });
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

    function handleAttachment(e) {
        const file = e.target.files[0];
        if (!file) return;
        if (!isAllowedFile(file)) {
            alert('File type not supported.');
            e.target.value = '';
            return;
        }
        if (attachments.some(a => a.name === file.name)) {
            alert(`${file.name} is already attached.`);
            e.target.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setAttachments(prev => [...prev,
            { name: file.name, type: file.type, data: reader.result }
            ]);
            e.target.value = '';
        };
        reader.onerror = () => {
            alert('Failed to read file. Please try again.');
            e.target.value = '';
        };
        reader.readAsDataURL(file);
    }

    function handleRemoveAttachment(index) {
        setAttachments(prev => prev.filter((_, i) => i !== index));
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
                    <div style={{ position: 'relative', display: 'inline-block', width: 'fit-content' }}>
                        <img src={photo} alt="note photo"
                            style={{
                                width: '80px', height: '80px', objectFit: 'cover',
                                borderRadius: '8px', marginBottom: '0.5rem'
                            }} />
                        <button type="button" className="remove-photo-btn"
                            onClick={handleRemovePhoto} >x</button>
                    </div>
                )}

                <label>Change thumbnail</label>
                <input type="file" accept="image/*"
                    capture="environment" onChange={handlePhoto} />

                <label>Attachments</label>
                <input type="file"
                    accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.txt,.mp3,.wav,.mp4,.mov"
                    onChange={handleAttachment} />

                <ul className="attachment-list">
                    {attachments.map((a, i) => (
                        <li key={i}>
                            <span title={a.name} style={{
                                flex: 1, maxWidth: '200px', overflow: 'hidden',
                                textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'default'
                            }}>{i + 1}. {a.name}
                            </span>
                            <button type="button" className="remove-attachment-btn"
                                onClick={() => handleRemoveAttachment(i)}>x</button>
                        </li>
                    ))}
                </ul>

                <div className="voice-section">
                    <button type="button" className="record-btn" onClick={handleRecord}>
                        {recording ? 'Stop recording' : 'Record audio'}
                    </button>
                    {recordings.length > 0 && (
                        <ul className="attachment-list">
                            {recordings.map((r, i) => (
                                <li key={i}>
                                    🎵 {r.name}
                                    <button type="button" className="remove-attachment-btn"
                                        onClick={() => handleRemoveRecording(i)}>x</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button type="submit">Save</button>
            </form>
        </main>
    )
}

export default EditNote