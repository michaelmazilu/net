export const dummyData = [
    {
      topicId: 1,
      topicName: "Mathematics",
      units: [
        {
          unitId: 1,
          unitName: "Algebra",
          lessons: [
            {
              lessonId: 1,
              lessonName: "Linear Equations",
              conversations: [
                { messageId: 1, text: "What is a linear equation?" },
                {
                  messageId: 2,
                  text: "It's an equation of the form y = mx + b.",
                },
              ],
            },
            {
              lessonId: 2,
              lessonName: "Quadratic Equations",
              conversations: [
                { messageId: 1, text: "What is the quadratic formula?" },
                { messageId: 2, text: "It's x = (-b ± √(b²-4ac)) / 2a." },
              ],
            },
          ],
        },
      ],
    },
    {
      topicId: 2,
      topicName: "Physics",
      units: [
        {
          unitId: 1,
          unitName: "Kinematics",
          lessons: [
            {
              lessonId: 1,
              lessonName: "1D Motion",
              conversations: [
                { messageId: 1, text: "What is a linear equation?" },
                {
                  messageId: 2,
                  text: "It's an equation of the form y = mx + b.",
                },
              ],
            },
            {
              lessonId: 2,
              lessonName: "2D Motion",
              conversations: [
                { messageId: 1, text: "What is the quadratic formula?" },
                { messageId: 2, text: "It's x = (-b ± √(b²-4ac)) / 2a." },
              ],
            },
          ],
        },
      ],
    },
  ];