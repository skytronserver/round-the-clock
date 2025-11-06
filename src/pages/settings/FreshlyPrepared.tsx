import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

const FreshlyPrepared = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    dishName: '',
    description: '',
    category: '',
    vegNonVeg: '',
    courseType: '',
    spiceLevel: '',
    preparationType: 'raw-ingredients',
    price: '',
    preparationTime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Dish Added",
      description: "The freshly prepared dish has been successfully added.",
    });
    // Reset form
    setFormData({
      dishName: '',
      description: '',
      category: '',
      vegNonVeg: '',
      courseType: '',
      spiceLevel: '',
      preparationType: 'raw-ingredients',
      price: '',
      preparationTime: '',
    });
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
          <Link to="/mis/settings" className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Settings
          </Link>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Set/Create Freshly Prepared Dishes</h1>
          <p className="text-gray-600 mb-8">Add and configure freshly prepared menu items</p>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="courseType">Course Type *</Label>
                <Select
                  value={formData.courseType}
                  onValueChange={(value) => setFormData({ ...formData, courseType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select course type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appetizer">Appetizer</SelectItem>
                    <SelectItem value="soup">Soup</SelectItem>
                    <SelectItem value="salad">Salad</SelectItem>
                    <SelectItem value="main-course">Main Course</SelectItem>
                    <SelectItem value="dessert">Dessert</SelectItem>
                    <SelectItem value="beverage">Beverage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="spiceLevel">Spice Level *</Label>
                <Select
                  value={formData.spiceLevel}
                  onValueChange={(value) => setFormData({ ...formData, spiceLevel: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select spice level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mild">Mild</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hot">Hot</SelectItem>
                    <SelectItem value="extra-hot">Extra Hot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="mb-3 block">Preparation Type *</Label>
              <RadioGroup
                value={formData.preparationType}
                onValueChange={(value) => setFormData({ ...formData, preparationType: value })}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="raw-ingredients" id="raw-ingredients" />
                  <Label htmlFor="raw-ingredients" className="font-normal cursor-pointer">
                    Using raw ingredients
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ready-mixes" id="ready-mixes" />
                  <Label htmlFor="ready-mixes" className="font-normal cursor-pointer">
                    Using Ready Mixes Prepared in centralized facility
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Dish
              </Button>
              <Link to="/mis/settings">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FreshlyPrepared;
