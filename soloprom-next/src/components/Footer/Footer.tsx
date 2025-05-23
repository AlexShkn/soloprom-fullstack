'use client'

import Link from 'next/link'
import Image from 'next/image'

import './Footer.scss'
import { useModalsStore } from '@/store/useModalsStore'

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
  const { modalCallbackStateChange } = useModalsStore()

  return (
    <footer className="relative z-10 mt-auto bg-darkBlue py-9 pb-24 mds:pb-5">
      <div className="page-container">
        <div className="mb-5 flex flex-col justify-between gap-7 border-b border-gray-300 pb-5 lg:flex-row lg:gap-5">
          <div className="grid grid-cols-2 grid-rows-2 mdl:flex mdl:justify-between md:gap-7">
            <div className="footer__nav">
              <div className="mb-4 text-lg font-medium uppercase text-[#969cb8]">
                КАТАЛОГ
              </div>
              <ul className="flex flex-col gap-2.5">
                {catalogList.map((item, index) => (
                  <li key={index} className="footer__nav-item max-w-[250px]">
                    <Link
                      href={item.link}
                      className="link-hover hover:text-linkHoverColor focus:text-linkHoverColor w-full text-sm font-medium leading-5 text-white"
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
                      className="link-hover hover:text-linkHoverColor focus:text-linkHoverColor w-full text-sm font-medium leading-5 text-white"
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
                    className="link-hover hover:text-linkHoverColor focus:text-linkHoverColor w-full text-sm font-medium leading-5 text-white" // Added hover and focus states
                  >
                    Соглашение об использовании персональных данных
                  </Link>
                </li>
                <li className="footer__nav-item max-w-[250px]">
                  <Link
                    href="/policy"
                    className="link-hover hover:text-linkHoverColor focus:text-linkHoverColor w-full text-sm font-medium leading-5 text-white" // Added hover and focus states
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
                  alt="Методы оплаты"
                  width={200}
                  height={40}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 mdl:flex-row mdl:justify-between lg:flex-col">
            <div className="flex justify-start gap-5 mdl:justify-between md:gap-7">
              <div className="footer__contacts-block">
                <div className="mb-4 text-lg font-medium uppercase text-[#969cb8]">
                  КОНТАКТЫ
                </div>
                <ul className="footer__contacts-list">
                  <li className="mb-2.5 text-sm font-medium leading-5 text-white md:text-base">
                    <a
                      href="tel:+79036569393"
                      className="link-hover hover:text-linkHoverColor focus:text-linkHoverColor whitespace-nowrap"
                    >
                      +7 (903) 656-93-93
                    </a>
                  </li>
                  <li className="mb-2.5 text-sm font-medium leading-5 text-white md:text-base">
                    <a
                      href="mailto:solo.vrn@mail.ru"
                      className="link-hover hover:text-linkHoverColor focus:text-linkHoverColor whitespace-nowrap"
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
                  <li className="text-sm font-medium leading-5 text-white md:text-base">
                    <address className="max-w-64 not-italic leading-5 lg:max-w-52">
                      г.Воронеж, ул.45-й Стрелковой дивизии, д.224, офис 200
                    </address>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-5">
              <div className="flex flex-col items-center gap-2.5 whitespace-nowrap text-sm text-[#969cb8] md:text-base lg:flex-row">
                Мы онлайн, воспользуйтесь
                <button
                  onClick={() => modalCallbackStateChange(true)}
                  type="button"
                  className="link-hover hover:text-linkHoverColor focus:text-linkHoverColor text-white underline"
                >
                  Формой обратной связи
                </button>
              </div>

              <div className="relative text-center before:absolute before:left-[50%] before:top-[50%] before:h-[1px] before:w-full before:translate-x-[-50%] before:translate-y-[-50%] before:bg-white before:bg-opacity-80">
                <ul className="relative z-[1] inline-flex items-center gap-2.5 bg-darkBlue px-6">
                  {socialList.map((link, index) => (
                    <li
                      key={index}
                      className={`footer__social-item footer__social-item--${link.id} inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-custom opacity-50 transition-colors`}
                    >
                      <a
                        href={link.href}
                        className="-m-2.5 p-2.5"
                        target="_blank"
                        aria-label={`Свяжитесь с нами в ${link.id.replace('footer-', '')}`}
                      >
                        <svg className="icon relative h-5 w-5 fill-grayColor">
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

        <div className="text-ss font-medium text-[#e1e5f8] mds:text-sm">
          2018 © ООО «Соло» - запчасти для сельскохозяйственной и специальной
          техники
        </div>
      </div>
    </footer>
  )
}

export default Footer
