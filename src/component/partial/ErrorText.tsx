import IconSvg from '@/component/partial/IconSvg'

export default function ErrorText({
  text
}: {
  text?: string
}) {
  if (!text) return null
  return (
    <div className="flex space-x-1 text-red-600">
      <IconSvg name="warning-triangle" className="h-4 w-4 mt-1" />
      <span>{text}</span>
    </div>
  )
}
