"use client";
import { useEffect, useState } from "react";
import { Graph as VisxGraph, DefaultNode } from "@visx/network";
import { dummyGraphData } from "@/app/data/dummyGraphData";

interface GraphProps {
  content: string;
}

export default function Graph({ content }: GraphProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const dotSize = 1;
  const spacing = 30;
  const patternId = "dot-pattern";
  const background = "#262626";

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById("graph-container");
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (dimensions.width === 0 || dimensions.height === 0) return null;

  return (
    <div id="graph-container" className="w-full h-full">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <defs>
          <pattern
            id={patternId}
            x={0}
            y={0}
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={spacing / 2}
              cy={spacing / 2}
              r={dotSize}
              fill="#404040"
            />
          </pattern>
        </defs>

        <rect
          width={dimensions.width}
          height={dimensions.height}
          fill={background}
          className="w-full h-full"
          rx={10}
        />
        <rect
          width={dimensions.width}
          height={dimensions.height}
          fill={`url(#${patternId})`}
          className="w-full h-full"
          rx={10}
        />

        <VisxGraph
          graph={dummyGraphData}
          top={20}
          left={20}
          nodeComponent={({ node }) => (
            <g>
              <DefaultNode
                fill="#FA60D4"
                radius={20}
                stroke="#ffffff"
                strokeWidth={2}
              />
            </g>
          )}
          linkComponent={({ link }) => (
            <line
              x1={link.source.x}
              y1={link.source.y}
              x2={link.target.x}
              y2={link.target.y}
              strokeWidth={2}
              stroke="#bdc3c7"
              strokeOpacity={0.3}
            />
          )}
        />
      </svg>
    </div>
  );
}
