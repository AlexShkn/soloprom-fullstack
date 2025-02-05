'use client'
import React from 'react'

import './About.scss'

export const About: React.FC = ({}) => {
  return (
    <section id="about" className="mds:py-40 relative bg-darkBlue py-16">
      <div className="squares absolute inset-0 h-full w-full opacity-40">
        <div className="square"></div>
        <div className="square square2"></div>
        <div className="square square3"></div>
        <div className="square square4"></div>
        <div className="square square5"></div>
      </div>
      <div className="about__container">
        <h2 className="section-title section-title--white relative z-[1]">
          О компании
        </h2>
        <div className="about__body relative z-[1] text-white">
          <p>
            <b>ООО «СОЛО»</b> - компания, основанная в 2018 году,
            специализирующаяся на поставках продукции для сельскохозяйственной и
            специальной техники. За время своего существования нам удалось стать
            надёжным партнёром для многих предприятий и фермеров.
          </p>
          <p>
            Мы стремимся обеспечить наших клиентов качественной и инновационной
            продукцией, которая соответствует самым высоким стандартам отрасли.
            Наша цель — помогать сельскохозяйственным и другим предприятиям
            повысить эффективность своей работы, предлагая надёжные и
            современные решения.
          </p>
          <p>
            "СОЛО" отличается индивидуальным подходом к каждому клиенту. Мы
            тщательно изучаем их потребности и предлагаем оптимальные варианты
            продукции, учитывая специфику их бизнеса. Наша команда
            профессионалов всегда готова помочь в подборе необходимых решений и
            консультировать по всем вопросам.
          </p>
        </div>
      </div>
    </section>
  )
}
