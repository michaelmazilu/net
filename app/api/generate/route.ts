import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { topic } = await req.json();

        const response = await fetch(
            "https://api.deepseek.com/v1/chat/completions",
            {
                method: "POST",
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
                                "You are an expert in creating learning paths. Generate a network graph of concepts that need to be learned for a given topic. Return the response as a JSON object with nodes and edges.",
                        },
                        {
                            role: "user",
                            content: `Create a learning path for: ${topic}`,
                        },
                    ],
                }),
            }
        );

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
