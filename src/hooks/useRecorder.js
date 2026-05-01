import { useState } from "react";

export function useRecorder() {
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordings, setRecordings] = useState([]);

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

    return { recording, recordings, setRecordings, handleRecord, handleRemoveRecording };
}