'use client'
import Image from 'next/image'

import './Callback.scss'
import { useModalsStore } from '@/zustand/modalsStore'

export const Callback = () => {
  const modalCallbackStateChange = useModalsStore(
    (state) => state.modalCallbackStateChange,
  )

  return (
    <section className="callback section-offset">
      <div className="callback__container">
        <div className="callback__body grid grid-cols-2 gap-7">
          <div className="rounded bg-white p-10 px-5 shadow-custom">
            <h2 className="callback__slogan mb-7 px-16 text-center font-bold leading-5">
              Продукция высокого качества
              <br /> от надежных поставщиков
            </h2>
            <ul className="flex flex-wrap justify-center gap-2.5">
              <li className="h-[70px] w-[120px]">
                <Image
                  className="block h-full w-full object-contain"
                  src="/img/brands/advance.jpg"
                  alt=""
                  width={120}
                  height={70}
                />
              </li>
              <li className="h-[70px] w-[120px]">
                <Image
                  className="block h-full w-full object-contain"
                  src="/img/brands/apollo.png"
                  alt=""
                  width={120}
                  height={70}
                />
              </li>
              <li className="h-[70px] w-[120px]">
                <Image
                  className="block h-full w-full object-contain"
                  src="/img/brands/dunlop.png"
                  alt=""
                  width={120}
                  height={70}
                />
              </li>
              <li className="h-[70px] w-[120px]">
                <Image
                  className="block h-full w-full object-contain"
                  src="/img/brands/emrald.png"
                  alt=""
                  width={120}
                  height={70}
                />
              </li>
              <li className="h-[70px] w-[120px]">
                <Image
                  className="block h-full w-full object-contain"
                  src="/img/brands/enersys.png"
                  alt=""
                  width={120}
                  height={70}
                />
              </li>
              <li className="h-[70px] w-[120px]">
                <Image
                  className="block h-full w-full object-contain"
                  src="/img/brands/mrl.png"
                  alt=""
                  width={120}
                  height={70}
                />
              </li>
              <li className="h-[70px] w-[120px]">
                <Image
                  className="block h-full w-full object-contain"
                  src="/img/brands/naaats.png"
                  alt=""
                  width={120}
                  height={70}
                />
              </li>
              <li className="h-[70px] w-[120px]">
                <Image
                  className="block h-full w-full object-contain"
                  src="/img/brands/tyumen.png"
                  alt=""
                  width={120}
                  height={70}
                />
              </li>
            </ul>
          </div>
          <div className="callback__right relative flex flex-col justify-center rounded bg-accentBlue p-5 text-center shadow-custom">
            <div className="callback__right-body relative z-[2] max-w-[60%]">
              <div className="mb-5 text-xl font-bold leading-5 text-white">
                Нужна помощь в выборе запчастей?
              </div>
              <div className="callback__subtitle mb-5 font-medium leading-5 text-white">
                Оставьте заявку на бесплатную консультацию и наш специалист
                свяжется вами.
              </div>
              <button
                onClick={() => modalCallbackStateChange(true)}
                type="button"
                className="button callback__button w-full max-w-[300px] p-5"
              >
                Получить консультацию
              </button>
            </div>

            <Image
              className="callback__right-image absolute right-[-10%] top-[-10%] h-[139%] w-[74%] object-contain"
              src="/img/callback/truck-free.png"
              width={450}
              height={450}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  )
}
