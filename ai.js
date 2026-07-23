import { InferenceClient } from "@huggingface/inference"

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients
and suggests a recipe the user can make.

Format the response in markdown.
`

const hf = new InferenceClient(
    import.meta.env.VITE_HF_ACCESS_TOKEN
)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")

    try {
        const response = await hf.chatCompletion({
            model: "openai/gpt-oss-120b:fastest",
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT
                },
                {
                    role: "user",
                    content: `I have these ingredients: ${ingredientsString}. Please recommend a recipe I can make.`
                }
            ],
            max_tokens: 1500
        })

        return response.choices[0].message.content
    } catch (error) {
        console.error("Full Hugging Face error:", error)
        throw error
    }
}