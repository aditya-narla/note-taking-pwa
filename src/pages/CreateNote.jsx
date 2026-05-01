import { useState } from "react"
import { useNotes } from "../hooks/useNotes";
import { useNavigate } from "react-router-dom";
import { isAllowedFile } from "../utils/fileUtils";

function CreateNote() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState(null);
    const [attachments, setAttachments] = useState([]);
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordings, setRecordings] = useState([]);

    const { add } = useNotes();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (!content.trim()) {
            alert('Content is required.');
            return;
        }
        add({ title, content, photo, attachments, recordings });
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

    function handleAttachment(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Unsupported file type
        if (!isAllowedFile(file)) {
            alert('File type not supported.');
            e.target.value = '';
            return;
        }

        // Duplicate filename
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

    async function handleRecord() {
        if (recording) {
            mediaRecorder.stop();
            setRecording(false);
            return;
        }
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks = [];

        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/webm' });
            const reader = new FileReader();
            reader.onload = () => {
                const name = `recording-${Date.now()}.webm`;
                setRecordings(prev => [...prev, { name, type: 'audio/webm', data: reader.result }]);
            };
            reader.readAsDataURL(blob);
            stream.getTracks().forEach(t => t.stop());
        };

        recorder.start();
        setMediaRecorder(recorder);
        setRecording(true);
    }

    function handleRemoveRecording(index) {
        setRecordings(prev => prev.filter((_, i) => i !== index));
    }

    return (
        <main>
            <h2>Create Note</h2>

            <form onSubmit={handleSubmit}>

                <label>Title</label>
                <input type="text" placeholder="Pet Day 4/21"
                    value={title} onChange={e => setTitle(e.target.value)} />

                <label>Content *</label>
                <textarea value={content}
                    onChange={e => setContent(e.target.value)}></textarea>

                {photo && <img src={photo} alt="note photo" style={{
                    width: '80px', height: '80px', objectFit: 'cover',
                    borderRadius: '8px'
                }} />}

                <label>Add thumbnail</label>
                <input type="file" accept="image/*" capture="environment"
                    onChange={handlePhoto} />

                <label>Attachments</label>
                <input type="file"
                    accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.txt,.mp3,.wav,.mp4,.mov"
                    onChange={handleAttachment} />

                <ul className="attachment-list">
                    {attachments.map((a, i) => (
                        <li key={i}>
                            <span title={a.name} style={{
                                flex: 1, maxWidth: '200px',
                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                cursor: 'default'
                            }}>
                                {i + 1}. {a.name}
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
                                    {i + 1}. {r.name}
                                    <button type="button" className="remove-attachment-btn"
                                        onClick={() => handleRemoveRecording(i)}>x</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button type="submit">Save</button>

            </form>
        </main >
    )
}

export default CreateNote