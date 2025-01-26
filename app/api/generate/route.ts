import { NextResponse } from "next/server";

export async function GET(req: Request) {
export async function GET(req: Request) {
    try {
        // Get the topic from URL parameters
        const { searchParams } = new URL(req.url);
        const topic = searchParams.get("topic");

        if (!topic) {
            return NextResponse.json(
                { error: "Topic is required" },
                { status: 400 }
            );
        }

        const response = await fetch(
            "https://api.deepseek.com/v1/chat/completions",
            {
                method: "POST", // DeepSeek API requires POST
                method: "POST", // DeepSeek API requires POST
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: [
                        {
                            role: "system",
                            content:
                                "The user will prompt you with a topic they want to learn about. You will then generate units and lessons for that topic. For each unit, you will generate a list of lessons that are related to that unit. Do around 3-5 units and 5-7 lessons. Generate content for each lesson not just the title.\n\n" +
                                "Return the data in JSON format like this:\n" +
                                "{\n" +
                                "  topicId: 1,\n" +
                                "  topicName: '[Topic Name]',\n" +
                                "  units: [\n" +
                                "    {\n" +
                                "      unitId: [number],\n" +
                                "      unitName: '[Unit Name]',\n" +
                                "      lessons: [\n" +
                                "        {\n" +
                                "          lessonId: [number],\n" +
                                "          lessonName: '[Lesson Name]',\n" +
                                "          conversations: [\n" +
                                "            {\n" +
                                "              messageId: [number],\n" +
                                "              text: '[Key Question/Concept]'\n" +
                                "            },\n" +
                                "            {\n" +
                                "              messageId: [number],\n" +
                                "              text: '[Detailed Explanation]'\n" +
                                "            }\n" +
                                "          ]\n" +
                                "        }\n" +
                                "      ]\n" +
                                "    }\n" +
                                "  ]\n" +
                                "}\n" +
                                "Each lesson should have 2 conversation messages: a key question/concept and its detailed explanation.",
                        },
                        {
                            role: "user",
                            content: topic,
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

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Failed to generate learning path" },
            { status: 500 }
        );
    }
}
