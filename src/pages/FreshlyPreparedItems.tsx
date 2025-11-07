import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChefHat, Save, Plus, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Ingredient {
  id: string;
  ingredientName: string;
  quantity: string;
  unit: string;
}

// Available raw ingredients from inventory
const availableIngredients = [
  { name: 'Tomatoes', unit: 'kg', available: 500 },
  { name: 'Onions', unit: 'kg', available: 180 },
  { name: 'Rice', unit: 'kg', available: 1500 },
  { name: 'Chicken', unit: 'kg', available: 150 },
  { name: 'Milk', unit: 'l', available: 300 },
  { name: 'Cooking Oil', unit: 'l', available: 250 },
  { name: 'Salt', unit: 'kg', available: 400 },
  { name: 'Sugar', unit: 'kg', available: 450 },
  { name: 'Flour', unit: 'kg', available: 800 },
  { name: 'Paneer', unit: 'kg', available: 80 },
  { name: 'Potatoes', unit: 'kg', available: 600 },
  { name: 'Ginger', unit: 'kg', available: 50 },
  { name: 'Garlic', unit: 'kg', available: 45 },
  { name: 'Spices Mix', unit: 'kg', available: 120 },
];

const FreshlyPreparedItems = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    itemName: '',
    itemType: 'item-mix', // 'item-mix' or 'complete-item'
    category: '',
    preparationDate: new Date().toISOString().split('T')[0],
    location: 'centralized',
    outputQuantity: '',
    outputUnit: '',
    estimatedCost: '',
    instructions: '',
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', ingredientName: '', quantity: '', unit: '' }
  ]);

  const handleAddIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      ingredientName: '',
      quantity: '',
      unit: ''
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const inventoryType = formData.itemType === 'item-mix' ? 'Item Mix' : 'Complete Item';
    const inventoryName = formData.itemType === 'item-mix' ? 'item mix inventory' : 'complete items inventory';
    
    toast({
      title: `${inventoryType} Created`,
      description: `${formData.itemName} (${formData.outputQuantity} ${formData.outputUnit}) has been added to ${inventoryName}.`,
    });

    // Reset form
    setFormData({
      itemName: '',
      itemType: 'item-mix',
      category: '',
      preparationDate: new Date().toISOString().split('T')[0],
      location: 'centralized',
      outputQuantity: '',
      outputUnit: '',
      estimatedCost: '',
      instructions: '',
    });
    setIngredients([{ id: '1', ingredientName: '', quantity: '', unit: '' }]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/inventory" className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Inventory
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <ChefHat className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-3xl">Create Items from Raw Ingredients</CardTitle>
                  <CardDescription>Create item mixes or complete items using raw ingredients</CardDescription>
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
                        <Label htmlFor="itemType">Item Type *</Label>
                        <Select
                          value={formData.itemType}
                          onValueChange={(value) => setFormData({ ...formData, itemType: value, category: '' })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="item-mix">Item Mix (Intermediate)</SelectItem>
                            <SelectItem value="complete-item">Complete Item (Final Product)</SelectItem>
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
                            {formData.itemType === 'item-mix' ? (
                              <>
                                <SelectItem value="sauces">Sauces</SelectItem>
                                <SelectItem value="spice-mix">Spice Mix</SelectItem>
                                <SelectItem value="dough">Dough</SelectItem>
                                <SelectItem value="prepared-meat">Prepared Meat</SelectItem>
                                <SelectItem value="dessert-mix">Dessert Mix</SelectItem>
                              </>
                            ) : (
                              <>
                                <SelectItem value="pizza">Pizza</SelectItem>
                                <SelectItem value="biryani">Biryani</SelectItem>
                                <SelectItem value="curry">Curry</SelectItem>
                                <SelectItem value="tandoori">Tandoori</SelectItem>
                                <SelectItem value="bread">Bread</SelectItem>
                                <SelectItem value="dessert">Dessert</SelectItem>
                                <SelectItem value="rice">Rice</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <Label htmlFor="location">Preparation Location *</Label>
                        <Select
                          value={formData.location}
                          onValueChange={(value) => setFormData({ ...formData, location: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="centralized">Centralized Facility</SelectItem>
                            <SelectItem value="cold-storage">Cold Storage</SelectItem>
                            <SelectItem value="warehouse">Central Warehouse</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Output Quantity Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <Label htmlFor="outputQuantity">Output Quantity (Item Mix Produced) *</Label>
                        <Input
                          id="outputQuantity"
                          name="outputQuantity"
                          type="number"
                          step="0.01"
                          value={formData.outputQuantity}
                          onChange={handleChange}
                          required
                          placeholder="Total quantity of item mix produced"
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
                            <SelectItem value="kg">Kg</SelectItem>
                            <SelectItem value="l">Liter</SelectItem>
                            <SelectItem value="pcs">Pieces</SelectItem>
                            <SelectItem value="bottles">Bottles</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Raw Ingredients Section */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-lg font-semibold">
                          Raw Ingredients
                        </Label>
                        <Button type="button" onClick={handleAddIngredient} variant="outline" size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Ingredient
                        </Button>
                      </div>

                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Ingredient Name</TableHead>
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
                                      {availableIngredients.map((item) => (
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
                      <Label htmlFor="estimatedCost">Estimated Production Cost (₹) *</Label>
                      <Input
                        id="estimatedCost"
                        name="estimatedCost"
                        type="number"
                        step="0.01"
                        value={formData.estimatedCost}
                        onChange={handleChange}
                        required
                        placeholder="Total production cost"
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
                        Create Item
                      </Button>
                      <Link to="/mis/inventory">
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

export default FreshlyPreparedItems;
