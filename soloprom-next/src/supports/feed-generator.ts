import { CardDataProps } from '@/types/products.types'

const categoryIdMap: { [key: string]: string } = {
  Трансмиссионное: '2141612659', // Трансмиссионное масло G-energy
  Моторное: '1367818059', // Моторное масло G-energy
  Гидравлическое: '3242451713', // Гидравлическое масло G-energy
  'Охлаждающая жидкость': '2686196840', // Антифризы G-energy
  Полутяговая: '1258420381', // Полутяговые аккумуляторы
  Тяговая: '1583590430', // Тяговые аккумуляторы
  Камера: '2238822025', // Камеры для спецтехники
  Пневматическая: '3963419845', // Шины пневматические
  Цельнолитая: '3668160926', // Шины цельнолитые
  Бандажная: '1378897408', // Шины бандажные
  Бескамерная: '3963419845', // Шины пневматические (можно уточнить, если есть отдельная категория)
  Легковая: '1352486809', // Шины легковые
}

export async function generateYmlFeed(
  products: CardDataProps[],
): Promise<string> {
  const now = new Date()
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

  let offersXml = ''
  for (const product of products) {
    const categoryId = categoryIdMap[product.productType] || '2229656180'
    const productId = product.productId.replace(/[^a-zA-Z0-9]/g, '')

    offersXml += `
      <offer id="${productId}" available="true">
        <url>
          ${process.env.NEXT_PUBLIC_CLIENT_URL}${product.url}
        </url>
        <price>
          ${product.defaultPrice === 0 ? 1000 : product.defaultPrice}
        </price>
        <currencyId>
          RUB
        </currencyId>
        <categoryId>
          ${categoryId}
        </categoryId>
        <picture>
          ${process.env.NEXT_PUBLIC_CLIENT_URL}/img/catalog/${product.img}.jpg
        </picture>
        <delivery>
          true
        </delivery>
        <name>
          ${product.name}
        </name>
        <description>
          ${product.descr || product.name}
        </description>
      </offer>
    `
  }

  const yml = `<?xml version="1.0" encoding="utf-8"?>
<!-- created with Генератор товарных фидов -->
<!DOCTYPE yml_catalog SYSTEM "shops.dtd">
<yml_catalog date="${formattedDate}">
  <shop>
    <name>
      Soloprom
    </name>
    <company>
      СОЛОПРОМ
    </company>
    <url>
      ${process.env.NEXT_PUBLIC_CLIENT_URL}
    </url>
    <currencies>
      <currency id="RUB" rate="1" />
    </currencies>
    <categories>
      <category id="2229656180">
        Каталог
      </category>
      <category id="145824018" parentId="2229656180">
        Шины для спецтехники
      </category>
      <category id="3963419845" parentId="145824018">
        Шины пневматические
      </category>
      <category id="3668160926" parentId="145824018">
        Шины цельнолитые
      </category>
      <category id="1352486809" parentId="145824018">
        Шины легковые
      </category>
      <category id="1378897408" parentId="145824018">
        Шины бандажные
      </category>
      <category id="2238822025" parentId="145824018">
        Камеры для спецтехники
      </category>
      <category id="3408898165" parentId="2229656180">
        Аккумуляторы
      </category>
      <category id="1583590430" parentId="3408898165">
        Тяговые аккумуляторы
      </category>
      <category id="1258420381" parentId="3408898165">
        Полутяговые аккумуляторы
      </category>
      <category id="1629133871" parentId="2229656180">
        Мала и антифризы
      </category>
      <category id="3242451713" parentId="1629133871">
        Гидравлическое масло G-energy
      </category>
      <category id="2686196840" parentId="1629133871">
        Антифризы G-energy
      </category>
      <category id="1367818059" parentId="1629133871">
        Моторное масло G-energy
      </category>
      <category id="2141612659" parentId="1629133871">
        Трансмиссионное масло G-energy
      </category>
    </categories>
    <offers>
      ${offersXml}
    </offers>
  </shop>
</yml_catalog>`

  return yml
}
