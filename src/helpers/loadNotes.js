import { db } from "../firebase/firebase-config";

export const loadNotes = async (uid) => {
    const notesSnap = await db.collection(`${uid}/journal/notes`).get();

    const notes = [];

    notesSnap.forEach(child => {
        notes.push({
            id: child.id,
            ...child.data()
        });
    });

    return notes;
}