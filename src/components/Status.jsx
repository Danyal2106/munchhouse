export default function Status({ status }) {
  const tone = status.soon ? "is-soon" : status.open ? "is-open" : "";
  return (
    <p className="status" role="status">
      <span className={`dot ${tone}`} />
      {status.text}
    </p>
  );
}

export function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
