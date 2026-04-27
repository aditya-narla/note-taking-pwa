function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('petpals-db', 1)

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result)

        request.onupgradeneeded = (event) => {
            const db = event.target.result

            if (!db.objectStoreNames.contains('notes')) {
                const store = db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true })
                store.createIndex('createdAt', 'createdAt')
            }
        }
    })
}

export async function addNote(note) {

    const db = await openDB()

    return new Promise((resolve, reject) => {

        const tx = db.transaction('notes', 'readwrite')
        const store = tx.objectStore('notes')
        note.createdAt = Date.now()
        const request = store.add(note)

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

export async function getAllNotes() {

    const db = await openDB()

    return new Promise((resolve, reject) => {

        const tx = db.transaction('notes', 'readonly')
        const store = tx.objectStore('notes')
        const request = store.getAll()

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

export async function getNoteById(id) {

    const db = await openDB()

    return new Promise((resolve, reject) => {

        const tx = db.transaction('notes', 'readonly')
        const store = tx.objectStore('notes')
        const request = store.get(id)

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

export async function updateNote(note) {

    const db = await openDB()

    return new Promise((resolve, reject) => {

        const tx = db.transaction('notes', 'readwrite')
        const store = tx.objectStore('notes')
        const request = store.put(note)

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

export async function deleteNote(id) {
    
    const db = await openDB()

    return new Promise((resolve, reject) => {

        const tx = db.transaction('notes', 'readwrite')
        const store = tx.objectStore('notes')
        const request = store.delete(id)

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}