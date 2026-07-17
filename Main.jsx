import React from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"
import { getRecipeFromChefClaude } from "./ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)

    async function getRecipe() {
        try {
            setIsLoading(true)

            const recipeMarkdown =
                await getRecipeFromChefClaude(ingredients)

            setRecipe(recipeMarkdown)
        } catch (error) {
            console.error("Error getting recipe:", error)
        } finally {
            setIsLoading(false)
        }
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")?.trim()

        if (!newIngredient) {
            return
        }

        setIngredients(prevIngredients => [
            ...prevIngredients,
            newIngredient
        ])
    }

    return (
        <main>
            <form
                action={addIngredient}
                className="add-ingredient-form"
            >
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />

                <button type="submit">
                    Add ingredient
                </button>
            </form>

            {ingredients.length > 0 && (
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            )}

            {isLoading && <p>Generating recipe...</p>}

            {recipe && (
                <ClaudeRecipe recipe={recipe} />
            )}
        </main>
    )
}