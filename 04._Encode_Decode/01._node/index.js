const message = 'Hello, World!';

const encoded = btoa(message);

const decoded = atob(encoded);

console.log('Original:', message);
console.log('Encoded:', encoded);
console.log('Decoded:', decoded);