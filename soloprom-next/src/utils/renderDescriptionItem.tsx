export const renderDescriptionItem = (
  name: string,
  value: string | number | undefined,
  unit?: string,
) => {
  if (value === undefined || value === null) return null
  return (
    <div className="product-card__descr-item">
      <div className="product-card__descr-item-name">{name}</div>
      <div className="product-card__descr-item-value">
        {value}
        {unit || ''}
      </div>
    </div>
  )
}
