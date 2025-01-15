'use client'
import React, { useEffect, useState, Suspense } from 'react'
import './PageArticle.scss'
import { Loading } from '../ui'

interface Props {
  articleName: string
}

const DynamicMDX = ({ articleName }: Props) => {
  const MDXComponent = React.lazy(
    () => import(`@/data/articles/${articleName}.mdx`),
  )
  return (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      <MDXComponent />
    </Suspense>
  )
}

export const PageArticle: React.FC<Props> = ({ articleName }) => {
  return (
    <section className="page-article">
      <div className="page-article__container">
        <DynamicMDX articleName={articleName} />
      </div>
    </section>
  )
}
