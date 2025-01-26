export const dummyGraphData = {
    nodes: [
        // Topic root
        { id: "topic-root", x: 400, y: 150, label: "Topic Root" },

        // First tree (left)
        { id: "1-1", x: 200, y: 300, label: "Root Node (Tree 1)" },
        { id: "2-1", x: 100, y: 500, label: "Child Node 1" },
        { id: "3-1", x: 200, y: 500, label: "Child Node 2" },
        { id: "4-1", x: 300, y: 500, label: "Child Node 3" },
        { id: "5-1", x: 50, y: 700, label: "Grandchild Node 1" },
        { id: "6-1", x: 150, y: 700, label: "Grandchild Node 2" },
        { id: "7-1", x: 250, y: 700, label: "Grandchild Node 3" },
        { id: "8-1", x: 350, y: 700, label: "Grandchild Node 4" },

        // Second tree (right)
        { id: "1-2", x: 600, y: 300, label: "Root Node (Tree 2)" },
        { id: "2-2", x: 500, y: 500, label: "Child Node 1 (2)" },
        { id: "3-2", x: 600, y: 500, label: "Child Node 2 (2)" },
        { id: "4-2", x: 700, y: 500, label: "Child Node 3 (2)" },
        { id: "5-2", x: 450, y: 700, label: "Grandchild Node 1 (2)" },
        { id: "6-2", x: 550, y: 700, label: "Grandchild Node 2 (2)" },
        { id: "7-2", x: 650, y: 700, label: "Grandchild Node 3 (2)" },
        { id: "8-2", x: 750, y: 700, label: "Grandchild Node 4 (2)" },
    ],
    links: [
        // Topic root links to tree roots
        { source: { x: 400, y: 150 }, target: { x: 200, y: 300 } },
        { source: { x: 400, y: 150 }, target: { x: 600, y: 300 } },

        // First tree links
        { source: { x: 200, y: 300 }, target: { x: 100, y: 500 } },
        { source: { x: 200, y: 300 }, target: { x: 200, y: 500 } },
        { source: { x: 200, y: 300 }, target: { x: 300, y: 500 } },
        { source: { x: 100, y: 500 }, target: { x: 50, y: 700 } },
        { source: { x: 200, y: 500 }, target: { x: 150, y: 700 } },
        { source: { x: 300, y: 500 }, target: { x: 250, y: 700 } },
        { source: { x: 300, y: 500 }, target: { x: 350, y: 700 } },

        // Second tree links
        { source: { x: 600, y: 300 }, target: { x: 500, y: 500 } },
        { source: { x: 600, y: 300 }, target: { x: 600, y: 500 } },
        { source: { x: 600, y: 300 }, target: { x: 700, y: 500 } },
        { source: { x: 500, y: 500 }, target: { x: 450, y: 700 } },
        { source: { x: 600, y: 500 }, target: { x: 550, y: 700 } },
        { source: { x: 700, y: 500 }, target: { x: 650, y: 700 } },
        { source: { x: 700, y: 500 }, target: { x: 750, y: 700 } },
    ],
};
