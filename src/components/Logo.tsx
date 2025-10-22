export default function Logo() {
  return (
    <div className="flex gap-2 items-center">
      <span>
        <svg
          viewBox="0 0 100 100"
          width={40}
          height={40}
          fill="none"
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="45" fill="#0EA5E9" />
          <rect x="45" y="25" width="10" height="50" fill="white" rx="2" />
          <rect x="25" y="45" width="50" height="10" fill="white" rx="2" />
        </svg>
      </span>
      <h1 className="font-bold text-3xl">Mediconnect</h1>
    </div>
  );
}
