import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="relative h-10 w-40">
        <svg
          width="200"
          height="50"
          viewBox="0 0 200 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          {/* Square with rounded corners */}
          <rect x="2" y="5" width="40" height="40" rx="5" stroke="black" strokeWidth="2.5" fill="white" />

          {/* Blue accent in top right */}
          <path d="M42 5 L42 20 L27 5 Z" fill="#00A7E1" />

          {/* Hammer/gavel icon */}
          <path d="M15 35 L30 20 L25 15 L10 30 Z" stroke="black" strokeWidth="2.5" fill="white" />
          <path d="M30 20 L35 25" stroke="black" strokeWidth="2.5" />
          <path d="M10 30 L5 35" stroke="black" strokeWidth="2.5" />

          {/* TRIAR text */}
          <text x="50" y="30" fontFamily="Arial" fontWeight="bold" fontSize="20" fill="black">
            TRIAR
          </text>

          {/* Line under TRIAR */}
          <line x1="50" y1="35" x2="110" y2="35" stroke="black" strokeWidth="1.5" />

          {/* CONTABILIDADE text */}
          <text x="50" y="45" fontFamily="Arial" fontWeight="bold" fontSize="10" fill="black">
            CONTABILIDADE
          </text>
        </svg>
      </div>
    </Link>
  )
}
