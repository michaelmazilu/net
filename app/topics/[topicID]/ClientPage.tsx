"use client";
import { Graph as VisxGraph, DefaultNode } from "@visx/network";
import { generateLearningPath } from "@/utils/api";
import { useEffect, useState, useRef } from "react";
import { organizeGraphData } from "@/utils/organizeGraphData";
import { GraphData } from "@/app/types";

interface ClientPageProps {
  topicTitle: string;
  topicId: string;
}

export default function ClientPage({ topicTitle, topicId }: ClientPageProps) {
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [graphData, setGraphData] = useState<GraphData | undefined>(undefined);
  const isFirstRender = useRef(true);

  const dotSize = 1;
  const spacing = 30;
  const patternId = "dot-pattern";
  const background = "#262626";

  useEffect(() => {
    if (!isFirstRender.current) return;
    isFirstRender.current = false;

    const generateContent = async () => {
      try {
        const data = await generateLearningPath(topicTitle);
        const cleanJson = data.choices[0].message.content
          .replace(/^```json\s*/, "") // Remove leading ```json
          .replace(/```$/, ""); // Remove trailing ```
        const organized = await organizeGraphData(cleanJson, topicId);
        console.log(organized);
        // setGraphData(organized);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    generateContent();
  }, [topicTitle, topicId]);

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

  if (loading || dimensions.width === 0 || dimensions.height === 0) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex-1 min-h-screen">
      <div id="graph-container" className="flex-1 h-screen bg-[#2d2d2d] p-4">
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
            graph={graphData}
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
                <text
                  dx={30}
                  dy={5}
                  fontSize={12}
                  fill="white"
                  style={{ pointerEvents: "none" }}
                >
                  {node.label}
                </text>
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
    </main>
  );
}
