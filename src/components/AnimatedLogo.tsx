import { useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { motion } from "framer-motion";
import { logoClaroPaths, logoEscuroPaths, type LogoPath } from "./logoPaths";

type AnimatedLogoProps = {
  theme: "light" | "dark";
  className?: string;
  interactive?: boolean;
};

const STAGGER = 0.045;
const DRAW_DURATION = 0.7;
const VIEWBOX_WIDTH = 1050;
const VIEWBOX_HEIGHT = 350;
const REPEL_RADIUS = 90;
const REPEL_STRENGTH = 22;

// Aproxima o "centro" de cada traço pela média das coordenadas do path —
// suficiente para calcular a repulsão em relação ao cursor sem medir o DOM.
function getPathCenter(d: string): { x: number; y: number } {
  const nums = d.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  let sumX = 0;
  let sumY = 0;
  let count = 0;
  for (let i = 0; i < nums.length - 1; i += 2) {
    sumX += nums[i];
    sumY += nums[i + 1];
    count++;
  }
  return count ? { x: sumX / count, y: sumY / count } : { x: 0, y: 0 };
}

export function AnimatedLogo({
  theme,
  className = "",
  interactive = true,
}: AnimatedLogoProps) {
  const paths: LogoPath[] = theme === "dark" ? logoEscuroPaths : logoClaroPaths;
  const svgRef = useRef<SVGSVGElement>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  const centers = useMemo(() => paths.map((p) => getPathCenter(p.d)), [paths]);

  const handlePointerMove = (e: PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * VIEWBOX_WIDTH,
      y: ((e.clientY - rect.top) / rect.height) * VIEWBOX_HEIGHT,
    });
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      className={className}
      style={{ overflow: "visible" }}
      onPointerMove={interactive ? handlePointerMove : undefined}
      onPointerLeave={interactive ? () => setMouse(null) : undefined}
    >
      {paths.map((path, index) => {
        const center = centers[index];
        let dx = 0;
        let dy = 0;

        if (mouse) {
          const distX = center.x - mouse.x;
          const distY = center.y - mouse.y;
          const distance = Math.sqrt(distX * distX + distY * distY) || 1;
          if (distance < REPEL_RADIUS) {
            const force = (REPEL_RADIUS - distance) / REPEL_RADIUS;
            dx = (distX / distance) * force * REPEL_STRENGTH;
            dy = (distY / distance) * force * REPEL_STRENGTH;
          }
        }

        return (
          <motion.path
            key={index}
            d={path.d}
            fill="none"
            stroke={path.color}
            strokeWidth={3.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1, x: dx, y: dy }}
            transition={{
              pathLength: {
                duration: DRAW_DURATION,
                delay: index * STAGGER,
                ease: "easeInOut",
              },
              opacity: {
                duration: 0.15,
                delay: index * STAGGER,
              },
              x: { type: "spring", stiffness: 300, damping: 20 },
              y: { type: "spring", stiffness: 300, damping: 20 },
            }}
          />
        );
      })}
    </svg>
  );
}
