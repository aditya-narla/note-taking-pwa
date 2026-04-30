import { Link } from "react-router-dom"
import { formatDate } from "../utils/formatDate"

function NoteCard({ note }) {
    return (
        <Link to={`/edit/${note.id}`} className="note-card">
            {note.photo && <img src={note.photo} alt="note photo" />}
            <div>
                <div className="note-card-header">
                    <h3> {note.title} </h3>
                    <div className="note-dates">
                        <p>Created: {note.createdAt && formatDate(note.createdAt)}</p>
                        <p>Last edited: {note.lastEdited && formatDate(note.lastEdited)}</p>
                    </div>
                </div>
                <p className="note-content"> {note.content} </p>
            </div>
        </Link>
    )
}

export default NoteCard