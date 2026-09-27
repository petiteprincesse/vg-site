import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  'aria-hidden': true,
  focusable: false,
} as const;

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M7 17L17 7M17 17V7H7"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M7 10L12.0008 14.58L17 10"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <g transform="translate(3.25 4.25)">
        <path
          d="M6.87389 0.232271C7.15956 -0.0672483 7.63364 -0.0785598 7.93346 0.20688C8.23341 0.492545 8.24549 0.967479 7.95983 1.26743L2.49987 6.99985H16.7499C17.1641 6.99985 17.4999 7.33564 17.4999 7.74985C17.4999 8.16406 17.1641 8.49985 16.7499 8.49985H2.49987L7.95983 14.2323C8.24549 14.5322 8.23341 15.0072 7.93346 15.2928C7.63364 15.5783 7.15956 15.5669 6.87389 15.2674L0.206897 8.26743C-0.0689655 7.97777 -0.0689655 7.52193 0.206897 7.23227L6.87389 0.232271Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <g transform="translate(3.25 4.25)">
        <path
          d="M9.56641 0.20688C9.86622 -0.0785596 10.3403 -0.0672486 10.626 0.232271L17.293 7.23227C17.5688 7.52193 17.5688 7.97777 17.293 8.26743L10.626 15.2674C10.3403 15.5669 9.86622 15.5783 9.56641 15.2928C9.26646 15.0072 9.25437 14.5322 9.54004 14.2323L15 8.49985H0.75C0.335787 8.49985 0 8.16406 0 7.74985C0 7.33564 0.335786 6.99985 0.75 6.99985H15L9.54004 1.26743C9.25437 0.967479 9.26646 0.492545 9.56641 0.20688Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M12 19V5M12 5L6 11M12 5L18 11"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
