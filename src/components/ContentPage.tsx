import { ReactNode } from 'react';
import { Glitch } from './Glitch';

interface ContentPageProps {
  id: string;
  children: ReactNode;
  image?: string;
  image_alt?: string;
  isActive?: boolean;
}

export function ContentPage({ id, children, image, image_alt, isActive = false }: ContentPageProps) {
  return (
    <div data-anchor={id} id={id} className={isActive ? 'swiper-slide-active' : ''}>
      <div className="page">
        <div className="container text-white">
          <div className="flex flex-row items-center h-[80vh]">
            <div className="flex-[2_0_0] relative z-10 page-animation-wrapper">{children}</div>
            {image ? (
              <div className="flex-[1_0_0] -ml-6 relative z-0">
                <Glitch className="ml-auto float-right">
                  <img
                    loading='lazy'
                    className={`max-w-75 w-full border-[6px] border-white page-animation ${isActive ? 'active' : ''}`}
                    src={image}
                    alt={image_alt}
                  />
                </Glitch>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
