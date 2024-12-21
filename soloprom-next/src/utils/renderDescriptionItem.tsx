export const renderDescriptionItem = (
  name: string,
  value: string | number | undefined,
  unit?: string,
) => {
  if (value === undefined || value === null) return null
  return (
    <div className="product-card__descr-item flex items-center justify-between pb-1 text-sm">
      <div className="product-card__descr-item-name">{name}</div>
      <div className="font-bold">
        {value}
        {unit || ''}
      </div>
    </div>
  )
}
