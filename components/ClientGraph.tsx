"use client";
import { useEffect, useState } from "react";
import GraphComponent from "./GraphComponent";

export default function ClientGraph({ content }: { content: string }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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

  return (
    <div id="graph-container" className="w-full h-full">
      <GraphComponent width={dimensions.width} height={dimensions.height} />
    </div>
  );
}
