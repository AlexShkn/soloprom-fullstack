'use client'

import React, { Suspense, useMemo } from 'react'
import './PageArticle.scss'
import { Loading } from '../../ui'

interface Props {
  articleName: string
  category: string
}

const PageArticle: React.FC<Props> = ({ articleName, category }) => {
  const MDXComponent = useMemo(() => {
    return React.lazy(
      () => import(`@/data/articles/${category}/${articleName}.mdx`),
    )
  }, [articleName])

  if (!MDXComponent) return

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
