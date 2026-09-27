export type TeamMember = {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly featured?: boolean;
  readonly photo: { readonly src: string; readonly width: number; readonly height: number; readonly position?: string };
};

export type TeamGroup = {
  readonly id: string;
  readonly title: string;
  readonly members: readonly TeamMember[];
};

export const teamSection = {
  eyebrow: 'Наша команда',
  title: 'Организаторы',
} as const;

export const teamGroups: readonly TeamGroup[] = [
  {
    id: 'leads',
    title: 'Руководители проекта',
    members: [
      {
        id: 'andrey-taburinskiy',
        name: 'Андрей Табуринский',
        role: 'Founder Daily Challenge',
        featured: true,
        photo: { src: '/img/team/andrey-taburinskiy.jpg', width: 1471, height: 1800, position: 'center 6%' },
      },
      {
        id: 'viktoriya-guseynova',
        name: 'Виктория Гусейнова',
        role: 'Младший партнёр, руководитель проекта «Венчурные игры»',
        photo: { src: '/img/team/viktoriya-guseynova.jpg', width: 1275, height: 1800, position: 'center 22%' },
      },
    ],
  },
  {
    id: 'heads',
    title: 'Руководители',
    members: [
      {
        id: 'anastasiya-grishaeva',
        name: 'Анастасия Гришаева',
        role: 'Руководитель проекта «Лига вузов»',
        photo: { src: '/img/team/anastasiya-grishaeva.jpg', width: 700, height: 975, position: 'center 18%' },
      },
      {
        id: 'igor-pomazkov',
        name: 'Игорь Помазков',
        role: 'Руководитель Венчурных игр для стартапов старших стадий',
        photo: { src: '/img/team/igor-pomazkov.jpg', width: 1243, height: 1800, position: 'center 4%' },
      },
    ],
  },
];
