import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface RecipeIngredient {
  id: string;
  ingredientName: string;
  quantity: string;
  unit: string;
  source: 'raw-ingredient' | 'ready-mix';
}

export interface PreparationStep {
  id: string;
  stepNumber: number;
  instruction: string;
  duration: string; // in minutes
}

export interface Recipe {
  id: string;
  dishName: string;
  description: string;
  category: string;
  vegNonVeg: string;
  preparationType: 'raw-ingredients' | 'ready-mixes';
  price: string;
  preparationTime: string;
  servings: string;
  ingredients: RecipeIngredient[];
  preparationSteps: PreparationStep[];
  createdAt: string;
  updatedAt: string;
}

interface RecipeContextType {
  recipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;
  getRecipe: (id: string) => Recipe | undefined;
  getRecipesByType: (preparationType: 'raw-ingredients' | 'ready-mixes') => Recipe[];
  getRecipesByCategory: (category: string) => Recipe[];
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  // Initialize with some sample recipes
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: '1',
      dishName: 'Margherita Pizza',
      description: 'Classic Italian pizza with tomato sauce, mozzarella cheese, and fresh basil',
      category: 'italian',
      vegNonVeg: 'veg',
      preparationType: 'raw-ingredients',
      price: '299',
      preparationTime: '25',
      servings: '2',
      ingredients: [
        { id: '1', ingredientName: 'Pizza Base', quantity: '1', unit: 'pcs', source: 'raw-ingredient' },
        { id: '2', ingredientName: 'Tomatoes', quantity: '200', unit: 'g', source: 'raw-ingredient' },
        { id: '3', ingredientName: 'Cheese', quantity: '150', unit: 'g', source: 'raw-ingredient' },
        { id: '4', ingredientName: 'Cooking Oil', quantity: '2', unit: 'tbsp', source: 'raw-ingredient' },
      ],
      preparationSteps: [
        { id: '1', stepNumber: 1, instruction: 'Preheat oven to 220°C', duration: '5' },
        { id: '2', stepNumber: 2, instruction: 'Spread tomato sauce on pizza base', duration: '3' },
        { id: '3', stepNumber: 3, instruction: 'Add cheese and toppings', duration: '5' },
        { id: '4', stepNumber: 4, instruction: 'Bake in oven until golden brown', duration: '12' },
      ],
      createdAt: '2024-11-08',
      updatedAt: '2024-11-08',
    },
    {
      id: '2',
      dishName: 'Chicken Biryani',
      description: 'Aromatic basmati rice cooked with spiced chicken and herbs',
      category: 'indian',
      vegNonVeg: 'non-veg',
      preparationType: 'ready-mixes',
      price: '399',
      preparationTime: '45',
      servings: '3',
      ingredients: [
        { id: '1', ingredientName: 'Biryani Mix', quantity: '1', unit: 'kg', source: 'ready-mix' },
        { id: '2', ingredientName: 'Marinated Chicken', quantity: '500', unit: 'g', source: 'ready-mix' },
        { id: '3', ingredientName: 'Rice', quantity: '300', unit: 'g', source: 'raw-ingredient' },
      ],
      preparationSteps: [
        { id: '1', stepNumber: 1, instruction: 'Soak rice for 30 minutes', duration: '30' },
        { id: '2', stepNumber: 2, instruction: 'Cook chicken with biryani mix', duration: '20' },
        { id: '3', stepNumber: 3, instruction: 'Layer rice and chicken, cook on dum', duration: '25' },
      ],
      createdAt: '2024-11-08',
      updatedAt: '2024-11-08',
    },
    {
      id: '3',
      dishName: 'Butter Chicken',
      description: 'Creamy tomato-based curry with tender chicken pieces',
      category: 'indian',
      vegNonVeg: 'non-veg',
      preparationType: 'ready-mixes',
      price: '349',
      preparationTime: '30',
      servings: '2',
      ingredients: [
        { id: '1', ingredientName: 'Curry Base', quantity: '200', unit: 'ml', source: 'ready-mix' },
        { id: '2', ingredientName: 'Marinated Chicken', quantity: '300', unit: 'g', source: 'ready-mix' },
        { id: '3', ingredientName: 'Milk', quantity: '100', unit: 'ml', source: 'raw-ingredient' },
      ],
      preparationSteps: [
        { id: '1', stepNumber: 1, instruction: 'Cook marinated chicken until tender', duration: '15' },
        { id: '2', stepNumber: 2, instruction: 'Add curry base and simmer', duration: '10' },
        { id: '3', stepNumber: 3, instruction: 'Add milk and cook for 5 minutes', duration: '5' },
      ],
      createdAt: '2024-11-08',
      updatedAt: '2024-11-08',
    },
  ]);

  const addRecipe = (recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setRecipes(prev => [...prev, newRecipe]);
  };

  const updateRecipe = (id: string, recipeData: Partial<Recipe>) => {
    setRecipes(prev =>
      prev.map(recipe =>
        recipe.id === id
          ? { ...recipe, ...recipeData, updatedAt: new Date().toISOString().split('T')[0] }
          : recipe
      )
    );
  };

  const deleteRecipe = (id: string) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };

  const getRecipe = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };

  const getRecipesByType = (preparationType: 'raw-ingredients' | 'ready-mixes') => {
    return recipes.filter(recipe => recipe.preparationType === preparationType);
  };

  const getRecipesByCategory = (category: string) => {
    return recipes.filter(recipe => recipe.category === category);
  };

  const value: RecipeContextType = {
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipe,
    getRecipesByType,
    getRecipesByCategory,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};
