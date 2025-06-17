import Link from 'next/link'

export default function Footer() {
  return (
    <div className="pt-6 pb-2 text-center">
      Made with&nbsp;
      <Link href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
        next.js
      </Link>
      &nbsp;by&nbsp;
      <Link href="https://caksaji.netlify.app" target="_blank" rel="noopener noreferrer">
        Aji Caksa
      </Link>
    </div>
  )
}
