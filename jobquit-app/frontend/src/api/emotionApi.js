export async function getEntries() {
  const res = await fetch('/api/entries', { credentials: 'include' });
  return await res.json();
}

export async function postEntry(reason) {
  const res = await fetch('/api/entries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ reason })
  });
  return await res.json();
}
