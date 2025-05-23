'use client'
import React, { useRef, useState } from 'react'
import { getAdaptiveValue } from '@/utils/getAdaptiveValue'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useCartStore } from '@/store/useCartStore'
import { wordAdaptive } from '@/supports/adaptiveDto'

interface Props {
  setVariantValue: (value: string) => void
  variantValue: string
  categoryName: string
  productId: string
  sizes?: { [key: string]: number } | null
}

// .product-card-dropdown

// .product-card-dropdown {
//   &.show {
//     .product-card-dropdown__list {
//       visibility: visible;
//       opacity: 1;
//     }

//     img {
//       transform: rotate(90deg);
//     }
//   }

//   // .product-card-dropdown__item

//   &__item {
//     label {
//       position: relative;
//       display: block;
//       padding: 10px 40px;
//       cursor: pointer;

//       &.selected {
//         background-color: variables.$hoverAccentColor;
//         color: #fff;
//         &::before {
//           content: '';
//           position: absolute;
//           right: 5px;
//           top: 50%;
//           transform: translateY(-50%);
//           background: url('/img/icons/availability.svg') center / cover
//             no-repeat;
//           width: 15px;
//           height: 14px;
//         }
//       }
//     }

//     input {
//       position: absolute;
//       opacity: 0;
//       cursor: pointer;
//       height: 0;
//       width: 0;

//       &:checked ~ label {
//         background-position: 0 0;
//         color: #fff;
//         background-color: variables.$accentColor;
//       }
//     }
//   }
// }

export const SizesRow: React.FC<Props> = ({
  sizes,
  categoryName,
  variantValue,
  setVariantValue,
  productId,
}) => {
  const [dropOpen, setDropOpen] = useState(false)
  const dropRef = useRef(null)
  const { cartState } = useCartStore()

  const selectedVariant = (value: string) => {
    setVariantValue(value)
    setDropOpen(false)
  }

  useClickOutside(dropRef, () => {
    setDropOpen(false)
  })

  if (!sizes) {
    return null
  }

  return (
    <div className="flex items-center justify-between border-b border-grayColor pb-1 text-sm [&:not(:last-child)]:mb-1.5">
      <div className="">
        {getAdaptiveValue(wordAdaptive, 'sizes', categoryName)}
      </div>
      <div className="font-bold">
        {Object.keys(sizes).length === 1 ? (
          variantValue
        ) : (
          <div
            ref={dropRef}
            className={`product-card-dropdown relative z-[2] ${dropOpen ? 'show' : ''}`}
          >
            <button
              onClick={() => setDropOpen((prev) => !prev)}
              className="relative inline-flex items-center pr-2.5 font-bold"
            >
              <span className="pointer-events-none select-none">
                {variantValue}
              </span>
              <img
                className="pointer-events-none absolute -right-2.5 -top-[3px] h-6 w-6 select-none transition-transform"
                src="/img/icons/arrow-right.svg"
                alt=""
              />
            </button>
            <ul className="product-card-dropdown__list scroll-bar invisible absolute -right-1 top-[100%] mt-1 max-h-[200px] w-auto overflow-y-auto overscroll-contain rounded-b-md border-t border-blue-800 bg-white opacity-0 shadow-custom">
              {Object.keys(sizes).map((itemSize, index) => (
                <li
                  key={itemSize}
                  className={`product-card-dropdown__item transition-colors hover:bg-accentBlue hover:text-white ${itemSize === variantValue ? 'bg-accentBlue text-white' : ''}`}
                  onClick={() => selectedVariant(itemSize)}
                >
                  <input
                    id={itemSize}
                    type="radio"
                    value={itemSize}
                    name={productId + itemSize}
                  />
                  <label
                    className={
                      cartState.some(
                        (item) => item.storeId === `${productId}-${itemSize}`,
                      )
                        ? 'selected'
                        : ''
                    }
                    htmlFor={productId + itemSize}
                  >
                    <span>{itemSize}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
