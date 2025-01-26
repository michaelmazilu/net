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
    // Define the grid pattern
    const dotSize = 1;
    const spacing = 30;
    const patternId = "dot-pattern";

    // Don't render if dimensions aren't set
    if (width === 0 || height === 0) return null;

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
            {/* Define the dot pattern */}
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

            {/* Background with dot pattern */}
            <rect
                width={width}
                height={height}
                fill={background}
                className="w-full h-full"
                rx={10}
            />
            <rect
                width={width}
                height={height}
                fill={`url(#${patternId})`}
                className="w-full h-full"
                rx={10}
            />

            <Graph
                graph={dummyGraphData}
                top={20}
                left={20}
                nodeComponent={({ node }) => (
                    <g>
                        <DefaultNode
                            fill="#FA60D4" // Darker nodes for contrast
                            radius={20} // Slightly larger nodes for visibility
                            stroke="#ffffff" // White border
                            strokeWidth={2} // Border width
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
                        stroke="#bdc3c7" // Light, subtle link color
                        strokeOpacity={0.3}
                    />
                )}
            />
        </svg>
    );
}
