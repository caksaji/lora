export default function ErrorData404({
  className,
  children
}: {
  className?: string,
  children: React.ReactNode
}) {
  return (
    <div className={`w-full space-y-4 ${className}`}>
      <div className="w-full bg-[url(/img/illu/error-data404.png)] bg-contain bg-no-repeat bg-center h-24 md:h-16" />
      <div className="text-center">
        {children}
      </div>
    </div>
  )
}
