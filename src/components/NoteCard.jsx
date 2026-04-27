import { formatDate } from "../utils/formatDate"

function NoteCard({ note }) {
    return (
        <div className="note-card">
            <h3> {note.title} </h3>
            <p> {note.content} </p>
            <p> {note.createdAt && formatDate(note.createdAt)} </p>
            {note.photo && <img src={note.photo} alt="note photo" />}
        </div>
    )
}

export default NoteCard