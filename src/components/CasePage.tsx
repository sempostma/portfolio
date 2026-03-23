import { ReactNode } from 'react';
import { DynamicResize } from './DynamicResize';
import { Glitch } from './Glitch';

interface CasePageProps {
  id: string;
  image?: string | undefined;
  link?: string | undefined;
  tech?: string | undefined;
  children: ReactNode;
  onImageClick: (imageSrc: string | undefined) => void;
  image_alt?: string | undefined;
  isActive?: boolean;
}

export function CasePage(
  { id, image, image_alt, children, onImageClick, isActive = false }: CasePageProps,
) {
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
