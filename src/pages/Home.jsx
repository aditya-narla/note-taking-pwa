import { useNotes } from "../hooks/useNotes";

function Home() {

    const { notes, loading } = useNotes();
    console.log(notes, loading);

    return (
        <main>
            <h1>Home</h1>
        </main>
    )
}

export default Home