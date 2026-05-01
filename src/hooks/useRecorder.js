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
        const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
        const recorder = new MediaRecorder(stream, { mimeType });
        const chunks = [];

        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: mimeType });
            const reader = new FileReader();
            reader.onload = () => {
                const ext = mimeType === 'audio/webm' ? 'webm' : 'mp4';
                const name = `recording-${Date.now()}.${ext}`;
                setRecordings(prev => [...prev, { name, type: mimeType, data: reader.result }]);
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