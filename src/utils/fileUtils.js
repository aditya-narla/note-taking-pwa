const ALLOWED_TYPES = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'audio/mpeg', 'audio/wav',
    'video/mp4', 'video/quicktime'
];

export function isAllowedFile(file) {
    return ALLOWED_TYPES.includes(file.type);
}