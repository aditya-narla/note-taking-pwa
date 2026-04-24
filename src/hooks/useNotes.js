import { useState, useEffect } from "react";
import { getAllNotes, addNote, deleteNote, updateNote } from '../db/db';

export function useNotes() {

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNotes();
    }, []);

    async function loadNotes() {
        setLoading(true);
        const all = await getAllNotes();
        setNotes(all);
        setLoading(false);
    }

    async function add(note) {
        await addNote(note);
        await loadNotes();
    }

    async function remove(id) {
        await deleteNote(id);
        await loadNotes();
    }

    async function update(note) {
        await updateNote(note);
        await loadNotes();
    }

    return { notes, loading, add, remove, update };

}