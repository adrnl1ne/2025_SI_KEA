export function parseTXT(data) {
    return data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
}