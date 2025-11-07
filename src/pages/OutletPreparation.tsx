import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChefHat, Save, Plus, Trash2, Store } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Ingredient {
  id: string;
  ingredientName: string;
  quantity: string;
  unit: string;
  source: 'raw-ingredient' | 'ready-mix';
}

// Available raw ingredients at outlet level (from dispatch/purchase/local)
const availableRawIngredients = [
  { name: 'Tomatoes', unit: 'kg', available: 45, source: 'purchase' },
  { name: 'Onions', unit: 'kg', available: 15, source: 'purchase' },
  { name: 'Potatoes', unit: 'kg', available: 35, source: 'purchase' },
  { name: 'Rice', unit: 'kg', available: 150, source: 'local' },
  { name: 'Chicken', unit: 'kg', available: 8, source: 'local' },
  { name: 'Milk', unit: 'l', available: 25, source: 'local' },
  { name: 'Paneer', unit: 'kg', available: 5, source: 'local' },
];

// Available ready mixes from company (dispatched from centralized facility)
const availableReadyMixes = [
  { name: 'Pizza Sauce', unit: 'l', available: 12, source: 'dispatch' },
  { name: 'Biryani Mix', unit: 'kg', available: 15, source: 'dispatch' },
  { name: 'Curry Base', unit: 'kg', available: 8, source: 'dispatch' },
  { name: 'Tandoori Masala', unit: 'kg', available: 10, source: 'dispatch' },
  { name: 'Naan Dough', unit: 'kg', available: 12, source: 'dispatch' },
  { name: 'Pizza Base', unit: 'pcs', available: 20, source: 'dispatch' },
  { name: 'Marinated Chicken', unit: 'kg', available: 5, source: 'dispatch' },
  { name: 'Gravy Base', unit: 'l', available: 18, source: 'dispatch' },
];

const OutletPreparation = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    itemName: '',
    preparationType: 'raw-ingredients', // 'raw-ingredients' or 'ready-mixes'
    category: '',
    outlet: 'main',
    preparationDate: new Date().toISOString().split('T')[0],
    preparationTime: '',
    outputQuantity: '',
    outputUnit: '',
    estimatedCost: '',
    instructions: '',
    chefName: '',
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', ingredientName: '', quantity: '', unit: '', source: 'raw-ingredient' }
  ]);

  const handleAddIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      ingredientName: '',
      quantity: '',
      unit: '',
      source: formData.preparationType === 'raw-ingredients' ? 'raw-ingredient' : 'ready-mix'
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

  const handlePreparationTypeChange = (value: string) => {
    setFormData({ ...formData, preparationType: value });
    // Reset ingredients when preparation type changes
    setIngredients([{ 
      id: '1', 
      ingredientName: '', 
      quantity: '', 
      unit: '', 
      source: value === 'raw-ingredients' ? 'raw-ingredient' : 'ready-mix' 
    }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const preparationMethod = formData.preparationType === 'raw-ingredients' ? 'raw ingredients' : 'ready mixes from company';
    
    toast({
      title: "Item Prepared Successfully",
      description: `${formData.itemName} (${formData.outputQuantity} ${formData.outputUnit}) prepared using ${preparationMethod} at ${formData.outlet} outlet.`,
    });

    // Reset form
    setFormData({
      itemName: '',
      preparationType: 'raw-ingredients',
      category: '',
      outlet: 'main',
      preparationDate: new Date().toISOString().split('T')[0],
      preparationTime: '',
      outputQuantity: '',
      outputUnit: '',
      estimatedCost: '',
      instructions: '',
      chefName: '',
    });
    setIngredients([{ id: '1', ingredientName: '', quantity: '', unit: '', source: 'raw-ingredient' }]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getAvailableItems = () => {
    return formData.preparationType === 'raw-ingredients' ? availableRawIngredients : availableReadyMixes;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/inventory/outlet" className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Outlet Inventory
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <ChefHat className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-3xl">Outlet Fresh Preparation</CardTitle>
                  <CardDescription>Prepare fresh items at outlet using raw ingredients or ready mixes from company</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="itemName">Item Name *</Label>
                    <Input
                      id="itemName"
                      name="itemName"
                      value={formData.itemName}
                      onChange={handleChange}
                      required
                      placeholder="Enter item name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="outlet">Outlet *</Label>
                    <Select
                      value={formData.outlet}
                      onValueChange={(value) => setFormData({ ...formData, outlet: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select outlet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Branch</SelectItem>
                        <SelectItem value="downtown">Downtown Branch</SelectItem>
                        <SelectItem value="airport">Airport Branch</SelectItem>
                        <SelectItem value="mall">Mall Branch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pizza">Pizza</SelectItem>
                        <SelectItem value="biryani">Biryani</SelectItem>
                        <SelectItem value="curry">Curry</SelectItem>
                        <SelectItem value="tandoori">Tandoori</SelectItem>
                        <SelectItem value="bread">Bread</SelectItem>
                        <SelectItem value="dessert">Dessert</SelectItem>
                        <SelectItem value="rice">Rice</SelectItem>
                        <SelectItem value="appetizer">Appetizer</SelectItem>
                        <SelectItem value="beverage">Beverage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Preparation Type Selection */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <Label className="mb-4 block text-lg font-semibold">Preparation Method *</Label>
                  <RadioGroup
                    value={formData.preparationType}
                    onValueChange={handlePreparationTypeChange}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-3 p-4 border rounded-lg bg-white">
                      <RadioGroupItem value="raw-ingredients" id="raw-ingredients" />
                      <div>
                        <Label htmlFor="raw-ingredients" className="font-medium cursor-pointer">
                          Using Raw Ingredients
                        </Label>
                        <p className="text-sm text-gray-600">Use raw ingredients available at outlet (from purchase/local stock)</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg bg-white">
                      <RadioGroupItem value="ready-mixes" id="ready-mixes" />
                      <div>
                        <Label htmlFor="ready-mixes" className="font-medium cursor-pointer">
                          Using Ready Mixes
                        </Label>
                        <p className="text-sm text-gray-600">Use ready mixes dispatched from company's centralized facility</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Date, Time, and Chef Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="preparationDate">Preparation Date *</Label>
                    <Input
                      id="preparationDate"
                      name="preparationDate"
                      type="date"
                      value={formData.preparationDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="preparationTime">Preparation Time *</Label>
                    <Input
                      id="preparationTime"
                      name="preparationTime"
                      type="time"
                      value={formData.preparationTime}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="chefName">Chef/Preparer Name *</Label>
                    <Input
                      id="chefName"
                      name="chefName"
                      value={formData.chefName}
                      onChange={handleChange}
                      required
                      placeholder="Enter chef name"
                    />
                  </div>
                </div>

                {/* Output Quantity Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="outputQuantity">Output Quantity (Items Prepared) *</Label>
                    <Input
                      id="outputQuantity"
                      name="outputQuantity"
                      type="number"
                      step="0.01"
                      value={formData.outputQuantity}
                      onChange={handleChange}
                      required
                      placeholder="Total quantity prepared"
                    />
                  </div>

                  <div>
                    <Label htmlFor="outputUnit">Unit *</Label>
                    <Select
                      value={formData.outputUnit}
                      onValueChange={(value) => setFormData({ ...formData, outputUnit: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pcs">Pieces</SelectItem>
                        <SelectItem value="kg">Kg</SelectItem>
                        <SelectItem value="l">Liter</SelectItem>
                        <SelectItem value="portions">Portions</SelectItem>
                        <SelectItem value="plates">Plates</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Ingredients/Mixes Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-lg font-semibold">
                      {formData.preparationType === 'raw-ingredients' ? 'Raw Ingredients Used' : 'Ready Mixes Used'}
                    </Label>
                    <Button type="button" onClick={handleAddIngredient} variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add {formData.preparationType === 'raw-ingredients' ? 'Ingredient' : 'Mix'}
                    </Button>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>
                            {formData.preparationType === 'raw-ingredients' ? 'Ingredient Name' : 'Ready Mix Name'}
                          </TableHead>
                          <TableHead>Quantity Used</TableHead>
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
                                  <SelectValue placeholder={`Select ${formData.preparationType === 'raw-ingredients' ? 'ingredient' : 'mix'}`} />
                                </SelectTrigger>
                                <SelectContent>
                                  {getAvailableItems().map((item) => (
                                    <SelectItem key={item.name} value={item.name}>
                                      {item.name} (Available: {item.available} {item.unit})
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

                {/* Cost */}
                <div>
                  <Label htmlFor="estimatedCost">Estimated Preparation Cost (₹) *</Label>
                  <Input
                    id="estimatedCost"
                    name="estimatedCost"
                    type="number"
                    step="0.01"
                    value={formData.estimatedCost}
                    onChange={handleChange}
                    required
                    placeholder="Total preparation cost"
                  />
                </div>

                {/* Preparation Instructions */}
                <div>
                  <Label htmlFor="instructions">Preparation Instructions</Label>
                  <Textarea
                    id="instructions"
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    placeholder="Enter step-by-step preparation instructions"
                    rows={4}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Complete Preparation
                  </Button>
                  <Link to="/mis/inventory/outlet">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OutletPreparation;
