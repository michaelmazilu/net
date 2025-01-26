export const dummyGraphData = {
  nodes: [
    // First main node group (top)
    { id: "1-1", x: 100, y: 1000, label: "Root Node" },
    { id: "2-1", x: 100, y: 800, label: "Child Node 1" },
    { id: "3-1", x: 100, y: 600, label: "Child Node 2" },
    { id: "4-1", x: 100, y: 400, label: "Grandchild Node 1" },
    { id: "5-1", x: 100, y: 200, label: "Grandchild Node 2" },

    // Second main node group (middle)
    { id: "1-2", x: 300, y: 1000, label: "Root Node (2)" },
    { id: "2-2", x: 300, y: 800, label: "Child Node 1 (2)" },
    { id: "3-2", x: 300, y: 600, label: "Child Node 2 (2)" },
    { id: "4-2", x: 300, y: 400, label: "Grandchild Node 1 (2)" },
    { id: "5-2", x: 300, y: 200, label: "Grandchild Node 2 (2)" },

    // Third main node group (bottom)
    { id: "1-3", x: 500, y: 1000, label: "Root Node (3)" },
    { id: "2-3", x: 500, y: 800, label: "Child Node 1(3)" },
    { id: "3-3", x: 500, y: 600, label: "Child Node 2(3)" },
    { id: "4-3", x: 500, y: 400, label: "Grandchild Node 1(3)" },
    { id: "5-3", x: 500, y: 200, label: "Grandchild Node 2(3)" },
  ],
  links: [
    // First main node group links (vertical)
    { source: { x: 100, y: 1000 }, target: { x: 100, y: 800 } },
    { source: { x: 100, y: 800 }, target: { x: 100, y: 600 } },
    { source: { x: 100, y: 600 }, target: { x: 100, y: 400 } },
    { source: { x: 100, y: 400 }, target: { x: 100, y: 200 } },

    // Second main node group links (vertical)
    { source: { x: 300, y: 1000 }, target: { x: 300, y: 800 } },
    { source: { x: 300, y: 800 }, target: { x: 300, y: 600 } },
    { source: { x: 300, y: 600 }, target: { x: 300, y: 400 } },
    { source: { x: 300, y: 400 }, target: { x: 300, y: 200 } },

    // Third main node group links (vertical)
    { source: { x: 500, y: 1000 }, target: { x: 500, y: 800 } },
    { source: { x: 500, y: 800 }, target: { x: 500, y: 600 } },
    { source: { x: 500, y: 600 }, target: { x: 500, y: 400 } },
    { source: { x: 500, y: 400 }, target: { x: 500, y: 200 } },
  ],
};
