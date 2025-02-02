"use client";
import { Graph as VisxGraph, DefaultNode } from "@visx/network";
import { generateLearningPath } from "@/utils/api";
import { useEffect, useState, useRef } from "react";
import { organizeGraphData } from "@/utils/organizeGraphData";
import { GraphData } from "@/app/types";
import { Loader2 } from "lucide-react";
import { supabaseClient } from "@/utils/supabase/client";

interface GraphNetworkProps {
  topicTitle: string;
  topicId: string;
}

export default function GraphNetwork({
  topicTitle,
  topicId,
}: GraphNetworkProps) {
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [graphData, setGraphData] = useState<GraphData | undefined>(undefined);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const isFirstRender = useRef(true);

  const dotSize = 1;
  const spacing = 30;
  const patternId = "dot-pattern";
  const background = "#262626";

  // Add ref for container
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFirstRender.current) return;
    isFirstRender.current = false;

    const generateContent = async () => {
      try {
        // Check if topic exists with content
        const { data: existingTopic } = await supabaseClient
          .from("topics")
          .select("body")
          .eq("id", topicId)
          .single();

        if (existingTopic?.body) {
          // Use existing data
          const organized = await organizeGraphData(
            JSON.stringify(existingTopic.body),
            topicId
          );
          setGraphData(organized);
        } else {
          // Generate new data
          const data = await generateLearningPath(topicTitle);
          const cleanJson = data.choices[0].message.content
            .replace(/^```json\s*/, "")
            .replace(/```$/, "");
          const organized = await organizeGraphData(cleanJson, topicId);
          setGraphData(organized);
        }
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

  // Prevent default zoom
  useEffect(() => {
    const preventDefault = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    document.addEventListener("wheel", preventDefault, { passive: false });
    return () => document.removeEventListener("wheel", preventDefault);
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    // Get mouse position relative to container
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate position in scaled space
    const x = (mouseX - offset.x) / scale;
    const y = (mouseY - offset.y) / scale;

    // Calculate new scale with increased sensitivity
    const scaleChange = e.deltaY * -0.006;
    const newScale = Math.min(Math.max(0.1, scale + scaleChange), 4);

    // Calculate new offset to keep mouse position fixed
    const newOffset = {
      x: mouseX - x * newScale,
      y: mouseY - y * newScale,
    };

    setScale(newScale);
    setOffset(newOffset);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  if (loading || dimensions.width === 0 || dimensions.height === 0) {
    return (
      <main className="flex-1 min-h-screen">
        <div id="graph-container" className="flex-1 h-screen bg-[#2d2d2d] p-4">
          <div className="flex flex-col justify-center items-center h-full">
            <p className="text-white text-2xl mb-4">Deepseek sucks sorry </p>
            <Loader2 className="animate-spin text-[#B061FF]" size={70} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 min-h-screen">
      <div
        ref={containerRef}
        id="graph-container"
        className="flex-1 h-screen bg-[#2d2d2d] p-4 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onWheel={handleWheel}
      >
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

          <g transform={`translate(${offset.x}, ${offset.y}) scale(${scale})`}>
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
                    dx={0}
                    dy={35}
                    fontSize={12}
                    fill="white"
                    style={{ pointerEvents: "none", textAnchor: "middle" }}
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
          </g>
        </svg>
      </div>
    </main>
  );
}
