export async function getLocalCatalog() {
  const res = await fetch('/catalog.json');
  if (!res.ok) throw new Error('catalog unavailable');
  return res.json();
}
