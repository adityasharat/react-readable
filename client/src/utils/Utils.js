export function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleString();
}

export function random() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

export function guid() {
  return random();
}