'use client'
import Image from 'next/image'

import { useModalsStore } from '@/store/useModalsStore'

export const Callback = () => {
  const { modalCallbackStateChange } = useModalsStore()

  return (
    <section className="callback section-offset">
      <div className="page-container">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          <div className="rounded-custom bg-white p-10 px-5 shadow-custom">
            <h2 className="mb-5 px-2.5 text-center font-bold leading-5 mds:mb-7 mds:px-16">
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
          <div className="relative flex flex-col justify-center rounded-custom bg-accentBlue px-5 py-9 text-center shadow-custom before:absolute before:inset-0 before:z-[1] before:h-full before:w-full before:bg-black before:bg-opacity-30 xs:px-7 xs:py-12 before:mdl:hidden lg:p-5">
            <div className="relative z-[2] mdl:max-w-[70%] lg:max-w-[60%]">
              <div className="mb-5 text-xl font-bold leading-5 text-white">
                Нужна помощь в выборе запчастей?
              </div>
              <div className="mx-auto mb-5 max-w-[400px] font-medium leading-5 text-white lg:mx-0 lg:max-w-max">
                Оставьте заявку на бесплатную консультацию и наш специалист
                свяжется вами.
              </div>
              <button
                onClick={() => modalCallbackStateChange(true)}
                type="button"
                className="button w-full max-w-[550px] bg-greenColor p-5 lg:max-w-72"
              >
                Получить консультацию
              </button>
            </div>

            <Image
              className="absolute -right-12 -top-12 h-[400px] w-[400px] object-contain md:right-[-32%] md:top-[-33%] md:h-[170%] md:w-full lg:right-[-10%] lg:top-[-10%] lg:h-[139%] lg:w-[80%] xl:w-[74%]"
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
