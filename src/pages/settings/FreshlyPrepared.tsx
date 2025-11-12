import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, ChefHat, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useRecipes, RecipeIngredient, PreparationStep } from '@/contexts/RecipeContext';

interface Ingredient {
  id: string;
  ingredientName: string;
  quantity: string;
  unit: string;
  source: 'raw-ingredient' | 'ready-mix';
}


// Available raw ingredients for recipe creation
const availableRawIngredients = [
  { name: 'Tomatoes', unit: 'kg', category: 'vegetables' },
  { name: 'Onions', unit: 'kg', category: 'vegetables' },
  { name: 'Potatoes', unit: 'kg', category: 'vegetables' },
  { name: 'Rice', unit: 'kg', category: 'grains' },
  { name: 'Chicken', unit: 'kg', category: 'meat' },
  { name: 'Milk', unit: 'l', category: 'dairy' },
  { name: 'Paneer', unit: 'kg', category: 'dairy' },
  { name: 'Ginger', unit: 'kg', category: 'spices' },
  { name: 'Garlic', unit: 'kg', category: 'spices' },
  { name: 'Cooking Oil', unit: 'l', category: 'oils' },
  { name: 'Salt', unit: 'kg', category: 'spices' },
  { name: 'Sugar', unit: 'kg', category: 'others' },
  { name: 'Flour', unit: 'kg', category: 'grains' },
  { name: 'Spices Mix', unit: 'kg', category: 'spices' },
  { name: 'Bell Peppers', unit: 'kg', category: 'vegetables' },
  { name: 'Mushrooms', unit: 'kg', category: 'vegetables' },
  { name: 'Cheese', unit: 'kg', category: 'dairy' },
  { name: 'Yogurt', unit: 'kg', category: 'dairy' },
  { name: 'Lemon', unit: 'kg', category: 'fruits' },
  { name: 'Coriander', unit: 'kg', category: 'vegetables' },
];

// Available ready mixes for recipe creation
const availableReadyMixes = [
  { name: 'Pizza Sauce', unit: 'l', category: 'sauces' },
  { name: 'Biryani Mix', unit: 'kg', category: 'spice-mix' },
  { name: 'Curry Base', unit: 'kg', category: 'sauces' },
  { name: 'Tandoori Masala', unit: 'kg', category: 'spice-mix' },
  { name: 'Naan Dough', unit: 'kg', category: 'dough' },
  { name: 'Pizza Base', unit: 'pcs', category: 'dough' },
  { name: 'Marinated Chicken', unit: 'kg', category: 'prepared-meat' },
  { name: 'Gravy Base', unit: 'l', category: 'sauces' },
  { name: 'Dessert Mix', unit: 'kg', category: 'dessert-mix' },
  { name: 'Soup Base', unit: 'l', category: 'sauces' },
];

const FreshlyPrepared = () => {
  const { toast } = useToast();
  const { addRecipe } = useRecipes();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    dishName: '',
    description: '',
    category: '',
    vegNonVeg: '',
    preparationTypes: ['raw-ingredients'] as string[],
    price: '',
    preparationTime: '',
    servings: '',
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', ingredientName: '', quantity: '', unit: '', source: 'raw-ingredient' }
  ]);

  const [preparationSteps, setPreparationSteps] = useState<PreparationStep[]>([
    { id: '1', stepNumber: 1, instruction: '', duration: '' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert ingredients to RecipeIngredient format
    const recipeIngredients: RecipeIngredient[] = ingredients.map(ingredient => ({
      id: ingredient.id,
      ingredientName: ingredient.ingredientName,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      source: ingredient.source,
    }));

    // Save recipe to context
    addRecipe({
      dishName: formData.dishName,
      description: formData.description,
      category: formData.category,
      vegNonVeg: formData.vegNonVeg,
      preparationType: formData.preparationTypes.join(', ') as 'raw-ingredients' | 'ready-mixes',
      price: formData.price,
      preparationTime: formData.preparationTime,
      servings: formData.servings,
      ingredients: recipeIngredients,
      preparationSteps: preparationSteps,
    });

    toast({
      title: "Recipe Saved Successfully",
      description: `${formData.dishName} recipe has been saved and can now be used in preparation workflows.`,
    });
    
    // Reset form
    setFormData({
      dishName: '',
      description: '',
      category: '',
      vegNonVeg: '',
      preparationTypes: ['raw-ingredients'],
      price: '',
      preparationTime: '',
      servings: '',
    });
    setIngredients([{ id: '1', ingredientName: '', quantity: '', unit: '', source: 'raw-ingredient' }]);
    setPreparationSteps([{ id: '1', stepNumber: 1, instruction: '', duration: '' }]);
    setCurrentStep(1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Ingredient management functions
  const handleAddIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      ingredientName: '',
      quantity: '',
      unit: '',
      source: formData.preparationTypes.includes('raw-ingredients') ? 'raw-ingredient' : 'ready-mix'
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const handleRemoveIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(item => item.id !== id));
    }
  };

  const handleIngredientChange = (id: string, field: keyof Ingredient, value: string) => {
    setIngredients(ingredients.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  // Preparation steps management functions
  const handleAddStep = () => {
    const newStep: PreparationStep = {
      id: Date.now().toString(),
      stepNumber: preparationSteps.length + 1,
      instruction: '',
      duration: ''
    };
    setPreparationSteps([...preparationSteps, newStep]);
  };

  const handleRemoveStep = (id: string) => {
    if (preparationSteps.length > 1) {
      const updatedSteps = preparationSteps.filter(step => step.id !== id);
      // Renumber the steps
      const renumberedSteps = updatedSteps.map((step, index) => ({
        ...step,
        stepNumber: index + 1
      }));
      setPreparationSteps(renumberedSteps);
    }
  };

  const handleStepChange = (id: string, field: keyof PreparationStep, value: string | number) => {
    setPreparationSteps(preparationSteps.map(step => step.id === id ? { ...step, [field]: value } : step));
  };

  const handlePreparationTypeChange = (value: string, checked: boolean) => {
    let newTypes = [...formData.preparationTypes];
    if (checked) {
      if (!newTypes.includes(value)) {
        newTypes.push(value);
      }
    } else {
      newTypes = newTypes.filter(type => type !== value);
    }
    setFormData({ ...formData, preparationTypes: newTypes });
    // Reset ingredients when preparation type changes
    setIngredients([{ 
      id: '1', 
      ingredientName: '', 
      quantity: '', 
      unit: '', 
      source: 'raw-ingredient' 
    }]);
  };

  const getAvailableIngredients = () => {
    // Return both raw ingredients and ready mixes if both are selected
    if (formData.preparationTypes.includes('raw-ingredients') && formData.preparationTypes.includes('ready-mixes')) {
      const rawWithSource = availableRawIngredients.map(item => ({ ...item, source: 'raw-ingredient' }));
      const mixesWithSource = availableReadyMixes.map(item => ({ ...item, source: 'ready-mix' }));
      return [...rawWithSource, ...mixesWithSource];
    } else if (formData.preparationTypes.includes('raw-ingredients')) {
      return availableRawIngredients.map(item => ({ ...item, source: 'raw-ingredient' }));
    } else {
      return availableReadyMixes.map(item => ({ ...item, source: 'ready-mix' }));
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/settings" className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Settings
          </Link>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Set/Create Freshly Prepared Dishes</h1>
          <p className="text-gray-600 mb-8">Add and configure freshly prepared menu items</p>

          {/* Step Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                      step < currentStep
                        ? 'bg-green-500 text-white'
                        : step === currentStep
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    onClick={() => goToStep(step)}
                  >
                    {step < currentStep ? <Check className="w-5 h-5" /> : step}
                  </div>
                  <div className="ml-3 text-sm">
                    <div className={`font-medium ${step <= currentStep ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step === 1 && 'Basic Info'}
                      {step === 2 && 'Recipe Details'}
                      {step === 3 && 'Ingredients'}
                      {step === 4 && 'Instructions'}
                    </div>
                  </div>
                  {step < 4 && (
                    <div className={`flex-1 h-0.5 mx-4 ${step < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="secondary">Step 1 of 4</Badge>
                    Basic Information
                  </CardTitle>
                  <CardDescription>
                    Enter the basic details of your dish
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="dishName">Dish Name *</Label>
                    <Input
                      id="dishName"
                      name="dishName"
                      value={formData.dishName}
                      onChange={handleChange}
                      required
                      placeholder="Enter dish name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter dish description"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="category">Category / Classification of Food *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="indian">Indian</SelectItem>
                          <SelectItem value="chinese">Chinese</SelectItem>
                          <SelectItem value="continental">Continental</SelectItem>
                          <SelectItem value="italian">Italian</SelectItem>
                          <SelectItem value="mexican">Mexican</SelectItem>
                          <SelectItem value="thai">Thai</SelectItem>
                          <SelectItem value="fusion">Fusion</SelectItem>
                          <SelectItem value="others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="vegNonVeg">Veg/Non-Veg *</Label>
                      <Select
                        value={formData.vegNonVeg}
                        onValueChange={(value) => setFormData({ ...formData, vegNonVeg: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="veg">Vegetarian</SelectItem>
                          <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                          <SelectItem value="vegan">Vegan</SelectItem>
                          <SelectItem value="egg">Egg</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Recipe Details */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="secondary">Step 2 of 4</Badge>
                    Recipe Details
                  </CardTitle>
                  <CardDescription>
                    Configure preparation method, pricing, and timing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="mb-3 block">Preparation Type * (Select one or both)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg bg-white">
                        <Checkbox 
                          id="raw-ingredients"
                          checked={formData.preparationTypes.includes('raw-ingredients')}
                          onCheckedChange={(checked) => handlePreparationTypeChange('raw-ingredients', checked as boolean)}
                        />
                        <div>
                          <Label htmlFor="raw-ingredients" className="font-medium cursor-pointer">
                            Using Raw Ingredients
                          </Label>
                          <p className="text-sm text-gray-600">Use fresh raw ingredients for preparation</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg bg-white">
                        <Checkbox 
                          id="ready-mixes"
                          checked={formData.preparationTypes.includes('ready-mixes')}
                          onCheckedChange={(checked) => handlePreparationTypeChange('ready-mixes', checked as boolean)}
                        />
                        <div>
                          <Label htmlFor="ready-mixes" className="font-medium cursor-pointer">
                            Using Ready Mixes
                          </Label>
                          <p className="text-sm text-gray-600">Use ready mixes from centralized facility</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="price">Price (₹) *</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        placeholder="Enter price"
                      />
                    </div>

                    <div>
                      <Label htmlFor="preparationTime">Preparation Time (minutes) *</Label>
                      <Input
                        id="preparationTime"
                        name="preparationTime"
                        type="number"
                        value={formData.preparationTime}
                        onChange={handleChange}
                        required
                        placeholder="Enter time in minutes"
                      />
                    </div>

                    <div>
                      <Label htmlFor="servings">Servings *</Label>
                      <Input
                        id="servings"
                        name="servings"
                        type="number"
                        value={formData.servings}
                        onChange={handleChange}
                        required
                        placeholder="Number of servings"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Recipe Ingredients */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="secondary">Step 3 of 4</Badge>
                    Recipe Ingredients
                  </CardTitle>
                  <CardDescription>
                    Add ingredients needed for this dish (e.g., Onion 1kg, Tomatoes 500g)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <Button type="button" onClick={handleAddIngredient} variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Ingredient
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>
                              {formData.preparationTypes.includes('raw-ingredients') && formData.preparationTypes.includes('ready-mixes') ? 'Ingredient/Mix' : 
                               formData.preparationTypes.includes('raw-ingredients') ? 'Raw Ingredient' : 'Ready Mix'}
                            </TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ingredients.map((ingredient) => (
                            <TableRow key={ingredient.id}>
                              <TableCell>
                                <Select
                                  value={ingredient.ingredientName}
                                  onValueChange={(value) => handleIngredientChange(ingredient.id, 'ingredientName', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder={`Select ${formData.preparationTypes.includes('raw-ingredients') && formData.preparationTypes.includes('ready-mixes') ? 'ingredient/mix' : 
                                      formData.preparationTypes.includes('raw-ingredients') ? 'ingredient' : 'ready mix'}`} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {formData.preparationTypes.includes('raw-ingredients') && formData.preparationTypes.includes('ready-mixes') ? (
                                      <>
                                        {/* Raw Ingredients Section */}
                                        <div className="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-50">Raw Ingredients</div>
                                        {availableRawIngredients.map((item) => (
                                          <SelectItem key={`raw-${item.name}`} value={item.name}>
                                            🥬 {item.name} ({item.unit})
                                          </SelectItem>
                                        ))}
                                        {/* Ready Mixes Section */}
                                        <div className="px-2 py-1 text-xs font-semibold text-orange-600 bg-orange-50 mt-1">Ready Mixes</div>
                                        {availableReadyMixes.map((item) => (
                                          <SelectItem key={`mix-${item.name}`} value={item.name}>
                                            🥫 {item.name} ({item.unit})
                                          </SelectItem>
                                        ))}
                                      </>
                                    ) : (
                                      getAvailableIngredients().map((item) => (
                                        <SelectItem key={item.name} value={item.name}>
                                          {item.name} ({item.unit})
                                        </SelectItem>
                                      ))
                                    )}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={ingredient.quantity}
                                  onChange={(e) => handleIngredientChange(ingredient.id, 'quantity', e.target.value)}
                                  required
                                  placeholder="Qty"
                                  className="w-24"
                                />
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={ingredient.unit}
                                  onValueChange={(value) => handleIngredientChange(ingredient.id, 'unit', value)}
                                >
                                  <SelectTrigger className="w-24">
                                    <SelectValue placeholder="Unit" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="kg">Kg</SelectItem>
                                    <SelectItem value="g">Gram</SelectItem>
                                    <SelectItem value="l">Liter</SelectItem>
                                    <SelectItem value="ml">ML</SelectItem>
                                    <SelectItem value="pcs">Pieces</SelectItem>
                                    <SelectItem value="cups">Cups</SelectItem>
                                    <SelectItem value="tbsp">Tablespoon</SelectItem>
                                    <SelectItem value="tsp">Teaspoon</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                {ingredients.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => handleRemoveIngredient(ingredient.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Preparation Steps */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="secondary">Step 4 of 4</Badge>
                    Preparation Steps
                  </CardTitle>
                  <CardDescription>
                    Add step-by-step cooking instructions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <Button type="button" onClick={handleAddStep} variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Step
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {preparationSteps.map((step) => (
                        <div key={step.id} className="border rounded-lg p-4">
                          <div className="flex items-start gap-4">
                            <div className="bg-orange-100 text-orange-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                              {step.stepNumber}
                            </div>
                            <div className="flex-1 space-y-3">
                              <div>
                                <Label htmlFor={`instruction-${step.id}`}>Instruction</Label>
                                <Textarea
                                  id={`instruction-${step.id}`}
                                  value={step.instruction}
                                  onChange={(e) => handleStepChange(step.id, 'instruction', e.target.value)}
                                  placeholder="Enter step instruction (e.g., Heat oil in a pan, add chopped onions and sauté until golden brown)"
                                  rows={2}
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor={`duration-${step.id}`}>Duration (minutes)</Label>
                                  <Input
                                    id={`duration-${step.id}`}
                                    type="number"
                                    value={step.duration}
                                    onChange={(e) => handleStepChange(step.id, 'duration', e.target.value)}
                                    placeholder="Time"
                                    className="w-full"
                                  />
                                </div>
                                <div className="flex items-end">
                                  {preparationSteps.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => handleRemoveStep(step.id)}
                                    >
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Remove Step
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <div>
                {currentStep > 1 && (
                  <Button type="button" onClick={prevStep} variant="outline">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                )}
              </div>
              
              <div className="flex gap-4">
                {currentStep < totalSteps ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Dish
                  </Button>
                )}
                <Link to="/mis/settings">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FreshlyPrepared;
