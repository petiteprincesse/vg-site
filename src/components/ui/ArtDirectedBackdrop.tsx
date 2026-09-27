import { getImageProps } from 'next/image';

type Props = {
  wide: string;
  narrow: string;
  className?: string;
  breakpoint?: number;
};

export function ArtDirectedBackdrop({ wide, narrow, className, breakpoint = 900 }: Props) {
  const common = { alt: '', fill: true, sizes: '100vw', quality: 90 } as const;
  const {
    props: { srcSet: wideSrcSet },
  } = getImageProps({ ...common, src: wide });
  const { props: narrowProps } = getImageProps({ ...common, src: narrow });

  return (
    <picture>
      <source media={`(min-width: ${breakpoint}px)`} srcSet={wideSrcSet} sizes="100vw" />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt="" arrives via the spread props */}
      <img {...narrowProps} className={className} aria-hidden />
    </picture>
  );
}
