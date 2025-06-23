import { baseUrl } from '@/lib/localUtil'

export async function getAll() {
  const res = await fetch(`${baseUrl}/sample`)
  return res.json()
}
