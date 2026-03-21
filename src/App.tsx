import { useEffect, useRef, useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXModule } from 'mdx/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HashNavigation, Keyboard, Mousewheel, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ContentPage } from './components/ContentPage';
import { SkillChartPage } from './components/SkillChartPage';
import { CasePage } from './components/CasePage';
import { ImageModal } from './components/ImageModal';
import { ParticlesBackground } from './components/ParticlesBackground';
interface BaseFrontmatter {
  slug: string;
}

interface PageFrontmatter extends BaseFrontmatter {
  layout?: 'page' | 'skillchart' | undefined;
  image: string | undefined;
  image_alt: string | undefined;
}

interface CaseFrontmatter extends BaseFrontmatter {
  layout: 'case';
  image?: string | undefined;
  image_alt?: string | undefined;
  link?: string | undefined;
  tech?: string | undefined;
}

interface SkillChartFrontmatter extends BaseFrontmatter {
  layout: 'skillchart';
}

interface Page extends MDXModule {
  frontmatter: PageFrontmatter | CaseFrontmatter | SkillChartFrontmatter;
}

const content = import.meta.glob<Page>('./content/*.mdx', { eager: true });

declare global {
  interface Window {
    particlesJS: any;
  }
}

// MDX components for styling with Tailwind
const mdxComponents = {
  h1: (props: any) => (
    <h1 className="text-[2em] font-bold mb-2 leading-snug whitespace-nowrap">
      <span className="text-secondary">.</span>
      <span className="text-primary">{props.children}</span>
    </h1>
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside -space-y-1">
      {props.children}
    </ul>
  ),
  p: (props: any) => <p className="leading-snug">{props.children}</p>,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-primary pl-4 my-4 italic">
      {props.children}
    </blockquote>
  ),
  strong: (props: any) => <span className="text-secondary font-bold">{props.children}</span>,
};

// Get content entries as array for indexing
const contentEntries = Object.entries(content);

function App() {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    // Add swiper-init class after a short delay for animations
    setTimeout(() => {
      document.documentElement.classList.add('swiper-init');
    }, 200);
  }, []);

  const openModal = (imageSrc: string | undefined) => {
    if (imageSrc) setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    closeModal();
  };

  return (
    <MDXProvider components={mdxComponents}>
      <ParticlesBackground />
      <Swiper
        modules={[Mousewheel, Keyboard, HashNavigation, Pagination]}
        direction="vertical"
        slidesPerView={1}
        mousewheel={true}
        keyboard={{
          enabled: true,
        }}
        hashNavigation={{
          watchState: true,
        }}
        pagination={{
          clickable: true,
        }}
        speed={600}
        loop={true}
        noSwiping={true}
        noSwipingSelector="#teck-stack-svg g, #teck-stack-svg g *"
        touchStartPreventDefault={false}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        style={{ height: '100vh', width: '100%' }}
      >
        {contentEntries.map(([key, value]) => {
          const id = value.frontmatter.slug;
          const Component = value.default;
          const frontmatter = value.frontmatter;

          if (frontmatter.layout === 'case') {
            return (
              <SwiperSlide key={id} data-hash={id}>
                {({ isActive }) => (
                  <CasePage
                    id={id}
                    image={frontmatter.image}
                    link={frontmatter.link}
                    tech={frontmatter.tech}
                    onImageClick={openModal}
                    isActive={isActive}
                  >
                    <Component />
                  </CasePage>
                )}
              </SwiperSlide>
            );
          } else if (frontmatter.layout === 'skillchart') {
            return (
              <SwiperSlide key={id} data-hash={id}>
                {({ isActive }) => <SkillChartPage isActive={isActive} />}
              </SwiperSlide>
            );
          }

          return (
            <SwiperSlide key={id} data-hash={id}>
              {({ isActive }) => (
                <ContentPage
                  id={id}
                  image={frontmatter.image}
                  image_alt={frontmatter.image_alt}
                  isActive={isActive}
                >
                  <Component />
                </ContentPage>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <ImageModal imageSrc={modalImage} onClose={closeModal} />
    </MDXProvider>
  );
}

export default App;
