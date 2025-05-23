import {
  Truck,
  ShieldCheck,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Settings,
  Brush,
  RotateCcw,
  Droplet,
  Zap,
  Waves,
  Webhook,
  LucideIcon,
} from 'lucide-react' // Временные иконки

export interface AdvantageTypes {
  subtitle: string
  list: {
    title: string
    description: string
    icon: LucideIcon
  }[]
}

interface Advantages {
  tires: AdvantageTypes
  battery: AdvantageTypes
  oils: AdvantageTypes
}

export const advantages: Advantages = {
  tires: {
    subtitle: 'Преимущества наших спецшин',
    list: [
      {
        title: 'Увеличенный срок службы',
        description:
          'Спецшины разработаны для интенсивной эксплуатации и способны выдерживать высокие нагрузки.',
        icon: Clock,
      },
      {
        title: 'Повышенная безопасность',
        description:
          'Обеспечивают стабильное сцепление с поверхностью, снижая риск аварий.',
        icon: ShieldCheck,
      },
      {
        title: 'Улучшенная проходимость',
        description:
          'Спецшины для экскаваторов и другой спецтехники способны работать в сложных условиях, преодолевая препятствия.',
        icon: Truck,
      },
      {
        title: 'Энергоэффективность',
        description: 'Сокращение сопротивления качению снижает расход топлива.',
        icon: CheckCircle,
      },
    ],
  },
  battery: {
    subtitle: 'Преимущества наших аккумуляторов для спецтехники',
    list: [
      {
        title: 'Высокая пусковая мощность',
        description:
          'Гарантированный запуск двигателя даже в условиях низких температур.',
        icon: Zap,
      },
      {
        title: 'Устойчивость к вибрациям',
        description:
          'Специальная конструкция для работы в условиях повышенной вибрации, характерной для спецтехники.',
        icon: Waves,
      },
      {
        title: 'Долгий срок службы',
        description:
          'Увеличенный срок службы благодаря использованию современных технологий и материалов.',
        icon: Clock,
      },
      {
        title: 'Широкий диапазон применения',
        description:
          'Подходят для различных видов спецтехники: экскаваторов, бульдозеров, погрузчиков и т.д.',
        icon: Webhook,
      },
    ],
  },
  oils: {
    subtitle: 'Преимущества наших масел для спецтехники',
    list: [
      {
        title: 'Защита двигателя от износа',
        description:
          'Специальные присадки обеспечивают надежную защиту двигателя от износа и коррозии.',
        icon: Droplet,
      },
      {
        title: 'Увеличенный интервал замены',
        description:
          'Современные масла позволяют увеличить интервал между заменами, снижая эксплуатационные расходы.',
        icon: RotateCcw,
      },
      {
        title: 'Предотвращение образования отложений',
        description:
          'Содержат моющие присадки, предотвращающие образование отложений и поддерживающие чистоту двигателя.',
        icon: Brush,
      },
      {
        title: 'Совместимость с различными видами техники',
        description:
          'Подходят для различных типов двигателей спецтехники, включая дизельные и бензиновые.',
        icon: Settings,
      },
    ],
  },
}
