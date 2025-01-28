'use client' // Чётко указываем, что это Client Component, иначе Next.js может смешивать обработку

import React, { Suspense, useMemo } from 'react'
import './PageArticle.scss'
import { Loading } from '../ui'

interface Props {
  articleName: string
}

const PageArticle: React.FC<Props> = ({ articleName }) => {
  // Используем useMemo для создания lazy импорта, зависящего только от articleName
  const MDXComponent = useMemo(() => {
    return React.lazy(() => import(`@/data/articles/${articleName}.mdx`))
  }, [articleName])

  return (
    <section className="page-article">
      <div className="page-article__container">
        <Suspense fallback={<Loading />}>
          <MDXComponent />
        </Suspense>
      </div>
    </section>
  )
}

export default PageArticle
