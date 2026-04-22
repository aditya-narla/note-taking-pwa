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