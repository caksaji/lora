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
      {name === 'sun-light' &&
        <>
          <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" />
          <path d="M22 12L23 12" />
          <path d="M12 2V1" />
          <path d="M12 23V22" />
          <path d="M20 20L19 19" />
          <path d="M20 4L19 5" />
          <path d="M4 20L5 19" />
          <path d="M4 4L5 5" />
          <path d="M1 12L2 12" />
        </>
      }
      {name === 'half-moon' &&
        <path d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z" />
      }
    </svg>
  )
}
