import { useEffect } from "react";

interface SkillChartPageProps {
  isActive?: boolean;
}

export function SkillChartPage({ isActive = false }: SkillChartPageProps) {
  useEffect(() => {
    window.initD3TechStackBubble((runAnimation) => {
      console.log('run animation')
      runAnimation();
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
