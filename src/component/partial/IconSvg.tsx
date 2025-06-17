export default function IconSvg({
  name
}: {
  name: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="flex-shrink-0 stroke-2 stroke-current transform"
      style={{strokeLinecap: 'round', strokeLinejoin: 'round'}}
    >
      {name === 'arrow-right' &&
        <path d="M3 12L21 12M21 12L12.5 3.5M21 12L12.5 20.5" />
      }
    </svg>
  )
}
