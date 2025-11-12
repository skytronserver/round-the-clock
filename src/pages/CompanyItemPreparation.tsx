import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChefHat, Save, Building2, Clock, Users, Calculator } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRecipes } from '@/contexts/RecipeContext';

interface ProductionRecord {
  id: string;
  recipeId: string;
  recipeName: string;
  quantity: number;
  unit: string;
  productionDate: string;
  estimatedCost: number;
  status: 'planned' | 'in-progress' | 'completed';
  staffAssigned: string;
}

const CompanyItemPreparation = () => {
  const { toast } = useToast();
  const { recipes } = useRecipes();
  
  const [formData, setFormData] = useState({
    selectedRecipe: '',
    quantity: '',
    productionDate: new Date().toISOString().split('T')[0],
    staffAssigned: '',
    notes: '',
  });

  const [productionRecords, setProductionRecords] = useState<ProductionRecord[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedRecipe = recipes.find(r => r.id === formData.selectedRecipe);
    if (!selectedRecipe) {
      toast({
        title: "Error",
        description: "Please select a recipe",
        variant: "destructive",
      });
      return;
    }

    const quantity = parseInt(formData.quantity);
    const estimatedCost = parseFloat(selectedRecipe.price) * quantity;

    const newRecord: ProductionRecord = {
      id: Date.now().toString(),
      recipeId: selectedRecipe.id,
      recipeName: selectedRecipe.dishName,
      quantity: quantity,
      unit: 'portions',
      productionDate: formData.productionDate,
      estimatedCost: estimatedCost,
      status: 'planned',
      staffAssigned: formData.staffAssigned,
    };

    setProductionRecords([...productionRecords, newRecord]);

    toast({
      title: "Production Scheduled",
      description: `${quantity} portions of ${selectedRecipe.dishName} scheduled for production. Estimated cost: ₹${estimatedCost}`,
    });

    // Reset form
    setFormData({
      selectedRecipe: '',
      quantity: '',
      productionDate: new Date().toISOString().split('T')[0],
      staffAssigned: '',
      notes: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const selectedRecipe = recipes.find(r => r.id === formData.selectedRecipe);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/company-preparation" className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Company Preparation
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Production Form */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Building2 className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle>Schedule Production</CardTitle>
                    <CardDescription>Select recipe and quantity for centralized production</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="selectedRecipe">Select Recipe *</Label>
                    <Select
                      value={formData.selectedRecipe}
                      onValueChange={(value) => setFormData({ ...formData, selectedRecipe: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a recipe to produce" />
                      </SelectTrigger>
                      <SelectContent>
                        {recipes.map((recipe) => (
                          <SelectItem key={recipe.id} value={recipe.id}>
                            <div className="flex items-center justify-between w-full">
                              <span>{recipe.dishName}</span>
                              <Badge variant="outline" className="ml-2">
                                ₹{recipe.price}/portion
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedRecipe && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Recipe Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-blue-600">Category:</span>
                          <span className="ml-2">{selectedRecipe.category}</span>
                        </div>
                        <div>
                          <span className="text-blue-600">Type:</span>
                          <span className="ml-2">{selectedRecipe.vegNonVeg}</span>
                        </div>
                        <div>
                          <span className="text-blue-600">Prep Time:</span>
                          <span className="ml-2">{selectedRecipe.preparationTime} min</span>
                        </div>
                        <div>
                          <span className="text-blue-600">Cost/Portion:</span>
                          <span className="ml-2">₹{selectedRecipe.price}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantity (Portions) *</Label>
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        placeholder="e.g., 50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="productionDate">Production Date *</Label>
                      <Input
                        id="productionDate"
                        name="productionDate"
                        type="date"
                        value={formData.productionDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="staffAssigned">Assign Staff</Label>
                    <Select
                      value={formData.staffAssigned}
                      onValueChange={(value) => setFormData({ ...formData, staffAssigned: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select chef/staff" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chef-raj">Chef Raj Kumar</SelectItem>
                        <SelectItem value="chef-priya">Chef Priya Singh</SelectItem>
                        <SelectItem value="chef-amit">Chef Amit Sharma</SelectItem>
                        <SelectItem value="kitchen-team">Kitchen Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.quantity && selectedRecipe && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">Cost Estimation</span>
                      </div>
                      <div className="text-sm text-green-700">
                        <div>Quantity: {formData.quantity} portions</div>
                        <div>Cost per portion: ₹{selectedRecipe.price}</div>
                        <div className="font-semibold">Total Estimated Cost: ₹{(parseFloat(selectedRecipe.price) * parseInt(formData.quantity || '0')).toFixed(2)}</div>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="notes">Production Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Any special instructions or notes..."
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Schedule Production
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Production Schedule */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Production Schedule</CardTitle>
                    <CardDescription>Upcoming production tasks</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productionRecords.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <ChefHat className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No production scheduled yet</p>
                      <p className="text-sm">Schedule your first production task</p>
                    </div>
                  ) : (
                    productionRecords.map((record) => (
                      <div key={record.id} className="border rounded-lg p-4 bg-white">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{record.recipeName}</h4>
                          <Badge variant="secondary">{record.status}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <div>Quantity: {record.quantity} portions</div>
                          <div>Date: {record.productionDate}</div>
                          <div>Cost: ₹{record.estimatedCost.toFixed(2)}</div>
                          <div>Staff: {record.staffAssigned || 'Unassigned'}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyItemPreparation;
