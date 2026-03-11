export default function Badge({ status }) {
  const cls = status?.toLowerCase().replace(/\s+/g, '-') || 'pending';
  return <span className={`badge ${cls}`}>{status}</span>;
}
