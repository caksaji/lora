export default function IconSvg({
  className,
  name
}: {
  className?: string,
  name: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={`flex-shrink-0 stroke-2 stroke-current transform ${className}`}
      style={{strokeLinecap: 'round', strokeLinejoin: 'round'}}
    >
      {name === 'arrow-right' &&
        <path d="M3 12L21 12M21 12L12.5 3.5M21 12L12.5 20.5" />
      }
      {name === 'nav-arrow-right' &&
        <path d="M9 6L15 12L9 18" />
      }
      {name === 'nav-arrow-left' &&
        <path d="M15 6L9 12L15 18" />
      }
    </svg>
  )
}
