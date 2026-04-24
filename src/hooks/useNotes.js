import { useState, useEffect } from "react";
import { getAllNotes } from '../db/db';

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

    return { notes, loading };

}