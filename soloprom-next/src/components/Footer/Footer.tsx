'use client'

import Link from 'next/link'
import Image from 'next/image'

import './Footer.scss'
import { useModalsStore } from '@/zustand/modalsStore'

const catalogList = [
  { title: 'Каталог запчастей', link: '/catalog' },
  { title: 'Аккумуляторы', link: '/catalog/battery' },
  { title: 'Шины', link: '/catalog/tires' },
  { title: 'Масла', link: '/catalog/oils' },
]
const infoList = [
  { title: 'Оплата и доставка', link: '/payment-delivery' },
  { title: 'О магазине', link: '/#about' },
  { title: 'Контактная информация', link: '/#contacts' },
]

const socialList = [
  { href: 'https://t.me/+79036569393', id: 'footer-tg' },
  { href: 'https://wa.me/79036569393', id: 'footer-wp' },
  { href: 'https://vk.com', id: 'footer-vk' },
  { href: 'https://fb.com', id: 'footer-fb' },
]

const Footer = () => {
  const modalCallbackStateChange = useModalsStore(
    (state) => state.modalCallbackStateChange,
  )

  return (
    <footer className="footer relative z-10 bg-darkBlue py-9 pb-5">
      <div className="footer__container">
        <div className="footer__body mb-5 flex justify-between gap-5 pb-5">
          <div className="footer__left flex justify-between gap-7">
            <div className="footer__nav">
              <div className="mb-4 text-lg font-medium uppercase text-[#969cb8]">
                КАТАЛОГ
              </div>
              <ul className="flex flex-col gap-2.5">
                {catalogList.map((item, index) => (
                  <li key={index} className="footer__nav-item max-w-[250px]">
                    <Link
                      href={item.link}
                      className="footer__nav-link link-hover w-full font-medium leading-5 text-white"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer__nav">
              <div className="mb-4 text-lg font-medium uppercase text-[#969cb8]">
                Информация
              </div>
              <ul className="flex flex-col gap-2.5">
                {infoList.map((item, index) => (
                  <li key={index} className="footer__nav-item max-w-[250px]">
                    <Link
                      href={item.link}
                      className="footer__nav-link link-hover w-full font-medium leading-5 text-white"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer__nav">
              <div className="mb-4 text-lg font-medium uppercase text-[#969cb8]">
                ИНФОРМАЦИЯ
              </div>
              <ul className="flex flex-col gap-2.5">
                <li className="footer__nav-item max-w-[250px]">
                  <Link
                    href="/agreement"
                    className="footer__nav-link link-hover w-full font-medium leading-5 text-white"
                  >
                    Соглашение об использовании персональных данных
                  </Link>
                </li>
                <li className="footer__nav-item max-w-[250px]">
                  <Link
                    href="/policy"
                    className="footer__nav-link link-hover w-full font-medium leading-5 text-white"
                  >
                    Политика конфиденциальности
                  </Link>
                </li>
              </ul>
              <div className="mt-5 text-white">
                <div>Мы принимаем</div>
                <Image
                  className="mt-2.5 inline-block h-10 w-[200px] object-contain"
                  src="/img/icons/payments/payments.png"
                  alt=""
                  width={200}
                  height={40}
                />
              </div>
            </div>
          </div>
          <div className="footer__right flex flex-col gap-5">
            <div className="footer__row flex justify-between">
              <div className="footer__contacts-block">
                <div className="mb-4 text-lg font-medium uppercase text-[#969cb8]">
                  КОНТАКТЫ
                </div>
                <ul className="footer__contacts-list">
                  <li className="footer__contacts-item mb-2.5 font-medium leading-5 text-white">
                    <a
                      href="tel:+79036569393"
                      className="link-hover whitespace-nowrap"
                    >
                      +7 (903) 656-93-93
                    </a>
                  </li>
                  <li className="footer__contacts-item mb-2.5 font-medium leading-5 text-white">
                    <a
                      href="mailto:solo.vrn@mail.ru"
                      className="link-hover whitespace-nowrap"
                    >
                      solo.vrn@mail.ru
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer__contacts-block">
                <div className="mb-4 text-lg font-medium uppercase text-[#969cb8]">
                  АДРЕС
                </div>
                <ul className="footer__contacts-list">
                  <li className="footer__contacts-item font-medium leading-5 text-white">
                    <address className="max-w-[200px] not-italic leading-5">
                      г.Воронеж, ул.45-й Стрелковой дивизии, д.224, офис 200
                    </address>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-5">
              <div className="footer__callback flex items-center gap-2.5 whitespace-nowrap text-[#969cb8]">
                Мы онлайн, воспользуйтесь
                <button
                  onClick={() => modalCallbackStateChange(true)}
                  type="button"
                  className="link-hover text-white underline"
                >
                  Формой обратной связи
                </button>
              </div>

              <div className="footer__social-block relative text-center">
                <ul className="relative z-[1] inline-flex items-center gap-2.5 bg-darkBlue px-6">
                  {socialList.map((link, index) => (
                    <li
                      key={index}
                      className={`footer__social-item footer__social-item--${link.id} inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded opacity-50 transition-colors`}
                    >
                      <a
                        href={link.href}
                        className="-m-2.5 p-2.5"
                        target="_blank"
                      >
                        <svg className="icon -5 relative w-5 fill-grayColor">
                          <use xlinkHref={`/img/sprite.svg#${link.id}`}></use>
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__copyright text-sm font-medium text-[#e1e5f8]">
          2018 © ООО «Соло» - запчасти для сельскохозяйственной и специальной
          техники
        </div>
      </div>
    </footer>
  )
}

export default Footer
