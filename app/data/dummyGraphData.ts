export const dummyGraphData = {
  nodes: [
    // Topic root
    { id: "topic-root", x: 800, y: 50, label: "Topic Root" },

    // First tree (left)
    { id: "1-1", x: 600, y: 200, label: "Root Node (Tree 1)" },
    { id: "2-1", x: 500, y: 400, label: "Child Node 1" },
    { id: "3-1", x: 600, y: 400, label: "Child Node 2" },
    { id: "4-1", x: 700, y: 400, label: "Child Node 3" },
    { id: "5-1", x: 450, y: 600, label: "Grandchild Node 1" },
    { id: "6-1", x: 550, y: 600, label: "Grandchild Node 2" },
    { id: "7-1", x: 650, y: 600, label: "Grandchild Node 3" },
    { id: "8-1", x: 750, y: 600, label: "Grandchild Node 4" },

    // Second tree (right)
    { id: "1-2", x: 1000, y: 200, label: "Root Node (Tree 2)" },
    { id: "2-2", x: 900, y: 400, label: "Child Node 1 (2)" },
    { id: "3-2", x: 1000, y: 400, label: "Child Node 2 (2)" },
    { id: "4-2", x: 1100, y: 400, label: "Child Node 3 (2)" },
    { id: "5-2", x: 850, y: 600, label: "Grandchild Node 1 (2)" },
    { id: "6-2", x: 950, y: 600, label: "Grandchild Node 2 (2)" },
    { id: "7-2", x: 1050, y: 600, label: "Grandchild Node 3 (2)" },
    { id: "8-2", x: 1150, y: 600, label: "Grandchild Node 4 (2)" },
  ],
  links: [
    // Topic root links to tree roots
    { source: { x: 800, y: 50 }, target: { x: 600, y: 200 } },
    { source: { x: 800, y: 50 }, target: { x: 1000, y: 200 } },

    // First tree links
    { source: { x: 600, y: 200 }, target: { x: 500, y: 400 } },
    { source: { x: 600, y: 200 }, target: { x: 600, y: 400 } },
    { source: { x: 600, y: 200 }, target: { x: 700, y: 400 } },
    { source: { x: 500, y: 400 }, target: { x: 450, y: 600 } },
    { source: { x: 600, y: 400 }, target: { x: 550, y: 600 } },
    { source: { x: 700, y: 400 }, target: { x: 650, y: 600 } },
    { source: { x: 700, y: 400 }, target: { x: 750, y: 600 } },

    // Second tree links
    { source: { x: 1000, y: 200 }, target: { x: 900, y: 400 } },
    { source: { x: 1000, y: 200 }, target: { x: 1000, y: 400 } },
    { source: { x: 1000, y: 200 }, target: { x: 1100, y: 400 } },
    { source: { x: 900, y: 400 }, target: { x: 850, y: 600 } },
    { source: { x: 1000, y: 400 }, target: { x: 950, y: 600 } },
    { source: { x: 1100, y: 400 }, target: { x: 1050, y: 600 } },
    { source: { x: 1100, y: 400 }, target: { x: 1150, y: 600 } },
  ],
};
