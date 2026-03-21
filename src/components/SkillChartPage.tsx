import { useEffect } from "react";

interface SkillChartPageProps {
  isActive?: boolean;
}

const d3Bubble = import('../d3-techs-bubblechart');

export function SkillChartPage({ isActive = false }: SkillChartPageProps) {
  useEffect(() => {
    d3Bubble.then((module) => {
      module.initD3TechStackBubble(runAnimation => {
        runAnimation();
      });
    });
  }, []);

  return (
    <div className={`fixed-page text-white h-full`} style={{ pointerEvents: isActive ? 'all' : 'none' }}>
      <svg
        id="teck-stack-svg"
        width="100%"
        height="100%"
        fontFamily="sans-serif"
        fontSize="10"
        textAnchor="middle"
      ></svg>
    </div>
  );
}
