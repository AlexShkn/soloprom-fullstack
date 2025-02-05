export const renderDescriptionItem = (
  name: string,
  value: string | number | undefined,
  unit?: string,
) => {
  if (value === undefined || value === null) return null
  return (
    <div className="flex items-center justify-between border-b border-grayColor pb-1 text-sm [&:not(:last-child)]:mb-1.5">
      <div className="">{name}</div>
      <div className="font-bold">
        {value}
        {unit || ''}
      </div>
    </div>
  )
}
