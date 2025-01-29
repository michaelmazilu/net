const getRandomOffset = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate nodes with random positions
const nodes = [
  // Topic root
  {
    id: "topic-root",
    x: 400 + getRandomOffset(-50, 50),
    y: 150 + getRandomOffset(-50, 50),
    label: "Topic Root",
  },
  // First tree (left)
  {
    id: "1-1",
    x: 200 + getRandomOffset(-50, 50),
    y: 300 + getRandomOffset(-50, 50),
    label: "Root Node (Tree 1)",
  },
  {
    id: "2-1",
    x: 100 + getRandomOffset(-50, 50),
    y: 500 + getRandomOffset(-50, 50),
    label: "Child Node 1",
  },
  {
    id: "3-1",
    x: 200 + getRandomOffset(-50, 50),
    y: 500 + getRandomOffset(-50, 50),
    label: "Child Node 2",
  },
  {
    id: "4-1",
    x: 300 + getRandomOffset(-50, 50),
    y: 500 + getRandomOffset(-50, 50),
    label: "Child Node 3",
  },
  {
    id: "5-1",
    x: 50 + getRandomOffset(-50, 50),
    y: 700 + getRandomOffset(-50, 50),
    label: "Grandchild Node 1",
  },
  {
    id: "6-1",
    x: 150 + getRandomOffset(-50, 50),
    y: 700 + getRandomOffset(-50, 50),
    label: "Grandchild Node 2",
  },
  {
    id: "7-1",
    x: 250 + getRandomOffset(-50, 50),
    y: 700 + getRandomOffset(-50, 50),
    label: "Grandchild Node 3",
  },
  {
    id: "8-1",
    x: 350 + getRandomOffset(-50, 50),
    y: 700 + getRandomOffset(-50, 50),
    label: "Grandchild Node 4",
  },
  // Second tree (right)
  {
    id: "1-2",
    x: 600 + getRandomOffset(-50, 50),
    y: 300 + getRandomOffset(-50, 50),
    label: "Root Node (Tree 2)",
  },
  {
    id: "2-2",
    x: 500 + getRandomOffset(-50, 50),
    y: 500 + getRandomOffset(-50, 50),
    label: "Child Node 1 (2)",
  },
  {
    id: "3-2",
    x: 600 + getRandomOffset(-50, 50),
    y: 500 + getRandomOffset(-50, 50),
    label: "Child Node 2 (2)",
  },
  {
    id: "4-2",
    x: 700 + getRandomOffset(-50, 50),
    y: 500 + getRandomOffset(-50, 50),
    label: "Child Node 3 (2)",
  },
  {
    id: "5-2",
    x: 450 + getRandomOffset(-50, 50),
    y: 700 + getRandomOffset(-50, 50),
    label: "Grandchild Node 1 (2)",
  },
  {
    id: "6-2",
    x: 550 + getRandomOffset(-50, 50),
    y: 700 + getRandomOffset(-50, 50),
    label: "Grandchild Node 2 (2)",
  },
  {
    id: "7-2",
    x: 650 + getRandomOffset(-50, 50),
    y: 700 + getRandomOffset(-50, 50),
    label: "Grandchild Node 3 (2)",
  },
  {
    id: "8-2",
    x: 750 + getRandomOffset(-50, 50),
    y: 700 + getRandomOffset(-50, 50),
    label: "Grandchild Node 4 (2)",
  },
];

// Generate links dynamically based on node relationships
const links = [
  { source: "topic-root", target: "1-1" },
  { source: "topic-root", target: "1-2" },

  { source: "1-1", target: "2-1" },
  { source: "1-1", target: "3-1" },
  { source: "1-1", target: "4-1" },
  { source: "2-1", target: "5-1" },
  { source: "3-1", target: "6-1" },
  { source: "4-1", target: "7-1" },
  { source: "4-1", target: "8-1" },

  { source: "1-2", target: "2-2" },
  { source: "1-2", target: "3-2" },
  { source: "1-2", target: "4-2" },
  { source: "2-2", target: "5-2" },
  { source: "3-2", target: "6-2" },
  { source: "4-2", target: "7-2" },
  { source: "4-2", target: "8-2" },
];

// Map the links to actual positions
const mappedLinks = links.map((link) => {
  const sourceNode = nodes.find((node) => node.id === link.source);
  const targetNode = nodes.find((node) => node.id === link.target);

  if (!sourceNode || !targetNode) {
    throw new Error(`Invalid link: ${link.source} -> ${link.target}`);
  }

  return {
    source: { x: sourceNode.x, y: sourceNode.y },
    target: { x: targetNode.x, y: targetNode.y },
  };
});

export const dummyGraphData = {
  nodes,
  links: mappedLinks,
};
