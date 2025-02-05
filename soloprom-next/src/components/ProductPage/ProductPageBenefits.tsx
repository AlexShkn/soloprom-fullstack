'use client'

const items = [
  { name: 'Удобная доставка', icon: 'delivery-best' },
  {
    name: 'Гарантия качества',
    icon: 'kachestvo',
  },
  {
    name: 'Доступные цены',
    icon: 'best-prices',
  },
]

export const ProductPageBenefits = () => {
  return (
    <div className="product-page-benefits">
      <div className="page-container">
        <ul className="flex flex-wrap items-center justify-center gap-7 border-b border-t border-grayColor py-5 lg:justify-around">
          {items.map((item) => (
            <li
              key={item.icon}
              className="flex items-center gap-2.5 text-base lg:text-lg"
            >
              <img
                src={`/img/icons/${item.icon}.svg`}
                className="h-7 w-7 lg:h-10 lg:w-10"
                alt=""
              />
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
