export default function FeedbackMessage({ message, type }) {
  if (!message) return null;

  const color =
    type === "success"
      ? "bg-green-100 text-green-800 border-green-400"
      : "bg-red-100 text-red-800 border-red-400";

  return (
    <div
      className={`border px-4 py-2 rounded mb-4 text-sm font-medium ${color}`}
    >
      {message}
    </div>
  );
}