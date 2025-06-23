export default function Skeleton({
  className,
  style
}: {
  className?: string,
  style?: CSSProperties
}) {
  return (
    <div className={`skeleton duration-300 ${className}`} style={style} />
  )
}
