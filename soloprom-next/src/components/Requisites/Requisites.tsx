'use client'
import React from 'react'

import './Requisites.scss'

export const Requisites: React.FC = () => {
  return (
    <section className="requisites section-offset">
      <div className="requisites__container">
        <h1 className="mb-10 text-3xl font-bold">
          Реквизиты ООО «Соло» Воронеж
        </h1>

        <table className="requisites__table w-full border-collapse overflow-hidden rounded font-medium shadow-custom">
          <tbody>
            <tr>
              <td>
                <p>Наименование контрагента</p>
              </td>
              <td>
                <p>ООО «СОЛО»</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Юридический, фактический и почтовый адрес</p>
              </td>
              <td>
                <p>
                  394016, г.Воронеж, ул.45-й Стрелковой дивизии, д.226а, кв.235,
                  офис 200
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Телефон</p>
              </td>
              <td>
                <p>+7-903-656-93-93</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>e-mail</p>
              </td>
              <td>
                <p>solo.vrn@mail.ru</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Генеральный директор</p>
              </td>
              <td>
                <p>Туренко Анна Николаевна</p>
                <p>действующий на основании Устава</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>ИНН/КПП</p>
              </td>
              <td>
                <p>3662264226 / 366201001</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>ОГРН</p>
              </td>
              <td>
                <p>1183668024451</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>ОКПО</p>
              </td>
              <td>
                <p>29747352</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>БАНК №1</p>
              </td>
              <td>
                <p>ПАО «СБЕРБАНК»</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Р/С</p>
              </td>
              <td>
                <p>40702810713000006370</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>БИК</p>
              </td>
              <td>
                <p>042007681</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>К/С</p>
              </td>
              <td>
                <p>30101810600000000681</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>БАНК №2</p>
              </td>
              <td>
                <p>АО «АЛЬФА-БАНК»</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Р/С</p>
              </td>
              <td>
                <p>40702810502060000682</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>БИК</p>
              </td>
              <td>
                <p>044525593</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>К/С</p>
              </td>
              <td>
                <p>30101810200000000593</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
