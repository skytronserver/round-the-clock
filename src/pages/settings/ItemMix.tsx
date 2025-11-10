import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Blend, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Ingredient {
  id: string;
  ingredientName: string;
  quantity: string;
  unit: string;
  source: 'raw-ingredient';
}

interface PreparationStep {
  id: string;
  stepNumber: number;
  instruction: string;
  duration: string; // in minutes
}

// Available raw ingredients for mix creation
const availableRawIngredients = [
  { name: 'Tomatoes', unit: 'kg', category: 'vegetables' },
  { name: 'Onions', unit: 'kg', category: 'vegetables' },
  { name: 'Garlic', unit: 'kg', category: 'spices' },
  { name: 'Ginger', unit: 'kg', category: 'spices' },
  { name: 'Red Chili Powder', unit: 'kg', category: 'spices' },
  { name: 'Turmeric Powder', unit: 'kg', category: 'spices' },
  { name: 'Coriander Powder', unit: 'kg', category: 'spices' },
  { name: 'Cumin Powder', unit: 'kg', category: 'spices' },
  { name: 'Garam Masala', unit: 'kg', category: 'spices' },
  { name: 'Salt', unit: 'kg', category: 'spices' },
  { name: 'Sugar', unit: 'kg', category: 'others' },
  { name: 'Vinegar', unit: 'l', category: 'liquids' },
  { name: 'Lemon Juice', unit: 'l', category: 'liquids' },
  { name: 'Cooking Oil', unit: 'l', category: 'oils' },
  { name: 'Flour', unit: 'kg', category: 'grains' },
  { name: 'Cornstarch', unit: 'kg', category: 'others' },
  { name: 'Baking Powder', unit: 'kg', category: 'others' },
  { name: 'Vanilla Extract', unit: 'l', category: 'extracts' },
  { name: 'Cocoa Powder', unit: 'kg', category: 'others' },
  { name: 'Herbs Mix', unit: 'kg', category: 'herbs' },
];

const ItemMix = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    mixName: '',
    description: '',
    category: '',
    vegNonVeg: '',
    preparationType: 'raw-ingredients',
    shelfLife: '',
    storageCondition: '',
    minimumStock: '',
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', ingredientName: '', quantity: '', unit: '', source: 'raw-ingredient' }
  ]);

  const [preparationSteps, setPreparationSteps] = useState<PreparationStep[]>([
    { id: '1', stepNumber: 1, instruction: '', duration: '' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Item Mix Created",
      description: "The item mix has been successfully created and configured.",
    });
    // Reset form
    setCurrentStep(1);
    setFormData({
      mixName: '',
      description: '',
      category: '',
      vegNonVeg: '',
      preparationType: 'raw-ingredients',
      shelfLife: '',
      storageCondition: '',
      minimumStock: '',
    });
    setIngredients([{ id: '1', ingredientName: '', quantity: '', unit: '', source: 'raw-ingredient' }]);
    setPreparationSteps([{ id: '1', stepNumber: 1, instruction: '', duration: '' }]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

  const handleAddIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      ingredientName: '',
      quantity: '',
      unit: '',
      source: 'raw-ingredient'
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const handleRemoveIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
    }
  };

  const handleIngredientChange = (id: string, field: keyof Ingredient, value: string) => {
    setIngredients(ingredients.map(ingredient => {
      if (ingredient.id === id) {
        const updatedIngredient = { ...ingredient, [field]: value };
        // Auto-populate unit when ingredient is selected
        if (field === 'ingredientName') {
          const selectedItem = availableRawIngredients.find(item => item.name === value);
          if (selectedItem) {
            updatedIngredient.unit = selectedItem.unit;
          }
        }
        return updatedIngredient;
      }
      return ingredient;
    }));
  };

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
      // Renumber steps
      const renumberedSteps = updatedSteps.map((step, index) => ({
        ...step,
        stepNumber: index + 1
      }));
      setPreparationSteps(renumberedSteps);
    }
  };

  const handleStepChange = (id: string, field: keyof PreparationStep, value: string) => {
    setPreparationSteps(preparationSteps.map(step => 
      step.id === id ? { ...step, [field]: value } : step
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/settings" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Settings
          </Link>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Set/Create Item Mix</h1>
          <p className="text-gray-600 mb-8">Configure ready-to-use ingredient mixes for centralized preparation</p>

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
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    onClick={() => goToStep(step)}
                  >
                    {step < currentStep ? <Check className="w-5 h-5" /> : step}
                  </div>
                  <div className="ml-3 text-sm">
                    <div className={`font-medium ${step <= currentStep ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step === 1 && 'Basic Info'}
                      {step === 2 && 'Mix Details'}
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
                    Enter the basic details of your item mix
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="mixName">Mix Name *</Label>
                    <Input
                      id="mixName"
                      name="mixName"
                      value={formData.mixName}
                      onChange={handleChange}
                      required
                      placeholder="Enter mix name (e.g., Pizza Sauce Mix, Biryani Spice Mix)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter mix description and usage instructions"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="category">Category / Classification *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spice-mixes">Spice Mixes</SelectItem>
                          <SelectItem value="sauce-bases">Sauce Bases</SelectItem>
                          <SelectItem value="dough-mixes">Dough Mixes</SelectItem>
                          <SelectItem value="marinade-mixes">Marinade Mixes</SelectItem>
                          <SelectItem value="dessert-mixes">Dessert Mixes</SelectItem>
                          <SelectItem value="soup-bases">Soup Bases</SelectItem>
                          <SelectItem value="curry-bases">Curry Bases</SelectItem>
                          <SelectItem value="batter-mixes">Batter Mixes</SelectItem>
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
                          <SelectItem value="egg">Contains Egg</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Mix Details */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="secondary">Step 2 of 4</Badge>
                    Mix Details
                  </CardTitle>
                  <CardDescription>
                    Configure storage, shelf life, and stock management
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="shelfLife">Shelf Life (days) *</Label>
                      <Input
                        id="shelfLife"
                        name="shelfLife"
                        type="number"
                        value={formData.shelfLife}
                        onChange={handleChange}
                        required
                        placeholder="Enter shelf life in days"
                      />
                    </div>

                    <div>
                      <Label htmlFor="minimumStock">Minimum Stock Level *</Label>
                      <Input
                        id="minimumStock"
                        name="minimumStock"
                        type="number"
                        value={formData.minimumStock}
                        onChange={handleChange}
                        required
                        placeholder="Enter minimum stock"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="storageCondition">Storage Condition *</Label>
                    <Select
                      value={formData.storageCondition}
                      onValueChange={(value) => setFormData({ ...formData, storageCondition: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select storage condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="room-temperature">Room Temperature</SelectItem>
                        <SelectItem value="refrigerated">Refrigerated (2-8°C)</SelectItem>
                        <SelectItem value="frozen">Frozen (-18°C or below)</SelectItem>
                        <SelectItem value="cool-dry">Cool & Dry Place</SelectItem>
                        <SelectItem value="airtight">Airtight Container</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Mix Ingredients */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="secondary">Step 3 of 4</Badge>
                    Mix Ingredients
                  </CardTitle>
                  <CardDescription>
                    Add raw ingredients needed for this mix (e.g., Red Chili Powder 500g, Turmeric 200g)
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
                            <TableHead>Raw Ingredient</TableHead>
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
                                    <SelectValue placeholder="Select ingredient" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableRawIngredients.map((item) => (
                                      <SelectItem key={item.name} value={item.name}>
                                        {item.name} ({item.unit})
                                      </SelectItem>
                                    ))}
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
                                <Input
                                  value={ingredient.unit}
                                  disabled
                                  className="w-20 bg-gray-100"
                                  placeholder="Auto"
                                />
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

            {/* Step 4: Preparation Instructions */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="secondary">Step 4 of 4</Badge>
                    Preparation Instructions
                  </CardTitle>
                  <CardDescription>
                    Add step-by-step mixing/preparation instructions
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
                            <div className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                              {step.stepNumber}
                            </div>
                            <div className="flex-1 space-y-3">
                              <div>
                                <Label htmlFor={`instruction-${step.id}`}>Instruction</Label>
                                <Textarea
                                  id={`instruction-${step.id}`}
                                  value={step.instruction}
                                  onChange={(e) => handleStepChange(step.id, 'instruction', e.target.value)}
                                  placeholder="Enter step instruction (e.g., Mix all dry spices in a large bowl, sift through fine mesh)"
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
                    Save Mix
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

export default ItemMix;
