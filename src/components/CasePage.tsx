import { ReactNode } from 'react';
import { DynamicResize } from './DynamicResize';
import { Glitch } from './Glitch';

type CasePageVariant = 'full' | 'mobile-text' | 'mobile-image';

interface CasePageProps {
  id: string;
  image?: string | undefined;
  link?: string | undefined;
  tech?: string | undefined;
  children?: ReactNode;
  onImageClick: (imageSrc: string | undefined) => void;
  image_alt?: string | undefined;
  isActive?: boolean;
  variant?: CasePageVariant;
}

export function CasePage(
  {
    id,
    image,
    image_alt,
    children,
    onImageClick,
    isActive = false,
    variant = 'full',
  }: CasePageProps,
) {
  if (variant === 'mobile-image') {
    return (
      <div
        data-anchor={`case-${id}-image`}
        id={`case-${id}-image`}
        className={isActive ? 'swiper-slide-active' : ''}
      >
        <div className="page">
          <div className="container text-white">
            <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
              <Glitch className={`w-full page-animation ${isActive ? 'active' : ''}`}>
                <img
                  loading="lazy"
                  className="w-full max-h-[65vh] object-contain cursor-pointer border-[6px] border-white"
                  src={image}
                  alt={image_alt}
                  onClick={() => onImageClick(image)}
                />
              </Glitch>
              <p className="text-secondary text-sm text-center">
                Tap image to enlarge
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'mobile-text') {
    return (
      <div
        data-anchor={`case-${id}`}
        id={`case-${id}`}
        className={isActive ? 'swiper-slide-active' : ''}
      >
        <div className="page">
          <div className="container text-white">
            <DynamicResize
              enabled={isActive}
              className="h-[80vh] flex flex-col justify-center relative z-10 page-animation-wrapper"
            >
              {children}
              <p className="text-secondary text-sm mt-6 page-animation">
                ↓ swipe down to view screenshot
              </p>
            </DynamicResize>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      data-anchor={`case-${id}`}
      id={`case-${id}`}
      className={isActive ? 'swiper-slide-active' : ''}
    >
      <div className="page">
        <div className="container text-white">
          <div className="flex flex-row items-center h-[80vh]">
            <DynamicResize
              enabled={isActive}
              className="basis-1/2 h-[80vh] flex-col content-around shrink-0 grow-0 relative z-10 page-animation-wrapper"
            >
              {children}
            </DynamicResize>
            <div
              className={`basis-1/2 shrink-0 grow-0 relative z-0 page-animation ${
                isActive ? 'active' : ''
              }`}
            >
              <Glitch className={`case-image-wrapper ml-10 -mr-125 ${isActive ? 'active' : ''}`}>
                <img
                  loading="lazy"
                  className="cursor-pointer"
                  src={image}
                  alt={image_alt}
                  onClick={() => onImageClick(image)}
                />
              </Glitch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
