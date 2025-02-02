export async function generateLearningPath(topic: string) {
  try {
    console.log("topic: ", topic);
    const response = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer sk-7213718d79044d80aac7f7a9343fa7d1`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: `You are a learning path generator. When given a topic, generate a structured learning path with units and lessons.
              
The output should be a JSON object following this schema:

export interface LLMResponse {
  topicId: number;
  topicName: string;
  units: Unit[];
}

export interface Unit {
  unitId: number;
  unitName: string;
  lessons: Lesson[];
}

export interface Lesson {
  lessonId: number;
  lessonName: string;
  lesson: string;
  conversations?: Conversation[];
}

export interface Conversation {
  messageId: number;
  text: string;
}


Rules:
- For the lesson, generate a full lesson be very in-depth and detailed. Provide examples for what you're teaching when appropriate. This is not a summary of the topic, but a full lesson on the topic. DO NOT be general, be specific. DO NOT summarize anything.
- Conversations will be questions from the user so DO NOT generate them 
- Generate 2-5 units
- Each unit should have 2-4 lessons
- Use sequential numbers for all IDs
- Ensure all content is educational and focused on the topic
- Keep lesson names concise but descriptive
- Make explanations clear and thorough
- Make sure the JSON is valid and no additional text is included.`,
            },
            {
              role: "user",
              content: topic,
            },
          ],
          stream: false,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to generate learning path");
  }
}
