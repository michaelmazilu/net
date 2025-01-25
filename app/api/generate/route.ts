import { NextResponse } from "next/server";

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
                                "The user will prompt you with a topic they want to learn about. You will then generate units and lessons for that topic. For each unit, you will generate a list of lessons that are related to that unit. Do around 3-5 units and lessons. Generate contect for each lesson not just the title.",
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
