import React from "react";
import { Graph, DefaultNode } from "@visx/network";
import { dummyGraphData } from "@/app/data/dummyGraphData";

// Define the NetworkProps type for GraphComponent
export type NetworkProps = {
  width: number;
  height: number;
};

// Background color for minimalistic look
export const background = "#262626";

// GraphComponent now uses dummyGraphData directly
export default function GraphComponent({ width, height }: NetworkProps) {
  const zoomFactor = 0.6; // Scale the graph to be 30% of its original size

  return width < 10 ? null : (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width / zoomFactor} ${height / zoomFactor}`} // Zoomed-out view
    >
      <rect width="100%" height="100%" rx={14} fill={background} />
      <Graph
        graph={dummyGraphData}
        top={20}
        left={20}
        nodeComponent={({ node }) => (
          <g>
            <DefaultNode
              fill="#FA60D4" // Darker nodes for contrast
              radius={20 * zoomFactor} // Adjust radius for scaled-down size
            />
            <text
              x={node.x + 25 * zoomFactor}
              y={node.y + 5 * zoomFactor}
              fill="black"
              fontSize={14 * zoomFactor}
              fontWeight="500"
              textAnchor="start"
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
            strokeWidth={2 * zoomFactor} // Scaled-down stroke width
            stroke="#bdc3c7" // Light, subtle link color
            strokeOpacity={0.3}
          />
        )}
      />
    </svg>
  );
}
