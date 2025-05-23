const fs = require('fs')
const path = require('path')

const PUBLIC_DIR = path.join(__dirname, 'public')
const SITEMAP_PATH = path.join(__dirname, 'public', 'sitemap.xml')
const BASE_URL = 'https://soloprom.ru'

async function generateSitemap() {
  try {
    const urls = new Set() // Используем Set для исключения дубликатов

    // Добавляем основную страницу
    urls.add(BASE_URL)

    // Функция для чтения и обработки JSON файлов
    async function processJsonFile(filePath) {
      try {
        const fileContent = await fs.promises.readFile(filePath, 'utf8')
        const data = JSON.parse(fileContent)

        if (Array.isArray(data)) {
          data.forEach((url) => {
            // Проверяем, что url является строкой и не является пустым
            if (typeof url === 'string' && url.trim() !== '') {
              // Добавляем URL с базовым URL, если он не абсолютный
              const fullUrl = url.startsWith('http')
                ? url
                : `${BASE_URL}${url.startsWith('/') ? url : '/' + url}`
              urls.add(fullUrl)
            } else {
              console.warn(`Invalid URL found in ${filePath}:`, url)
            }
          })
        } else {
          console.warn(`File ${filePath} does not contain an array.`)
        }
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error)
      }
    }

    await processJsonFile(path.join(PUBLIC_DIR, 'catalog.json'))
    await processJsonFile(path.join(PUBLIC_DIR, 'products-list.json'))
    await processJsonFile(path.join(PUBLIC_DIR, 'catalog-pagination.json'))
    await processJsonFile(path.join(PUBLIC_DIR, 'static-pages.json'))

    // Преобразуем Set в массив, если это необходимо
    const urlList = Array.from(urls)

    // Генерируем XML
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urlList
          .map(
            (url, index) => `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>${index === 0 ? '1.0' : '0.8'}</priority>
            </url>
          `,
          )
          .join('')}
      </urlset>`

    // Записываем sitemap.xml в папку public
    await fs.promises.writeFile(SITEMAP_PATH, sitemapXml)

    console.log('sitemap.xml generated successfully!')
  } catch (error) {
    console.error('Error generating sitemap.xml:', error)
  }
}

generateSitemap()
