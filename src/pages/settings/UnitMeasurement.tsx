import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Ruler, Edit } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface UnitMeasurement {
  id: string;
  unitName: string;
  unitSymbol: string;
  category: 'weight' | 'volume' | 'length' | 'quantity' | 'temperature' | 'time';
  baseUnit: string;
  conversionFactor: number;
  description: string;
  isActive: boolean;
}

const UnitMeasurement = () => {
  const { toast } = useToast();
  
  const [units, setUnits] = useState<UnitMeasurement[]>([
    // Weight Units
    { id: '1', unitName: 'Kilogram', unitSymbol: 'kg', category: 'weight', baseUnit: 'kg', conversionFactor: 1, description: '1 kg = 1000 grams (Base unit)', isActive: true },
    { id: '2', unitName: 'Gram', unitSymbol: 'g', category: 'weight', baseUnit: 'kg', conversionFactor: 0.001, description: '1000 grams = 1 kg', isActive: true },
    { id: '3', unitName: 'Pound', unitSymbol: 'lb', category: 'weight', baseUnit: 'kg', conversionFactor: 0.453592, description: '1 pound = 453.592 grams', isActive: true },
    { id: '4', unitName: 'Ounce', unitSymbol: 'oz', category: 'weight', baseUnit: 'kg', conversionFactor: 0.0283495, description: '1 ounce = 28.35 grams', isActive: true },
    
    // Volume Units
    { id: '5', unitName: 'Liter', unitSymbol: 'l', category: 'volume', baseUnit: 'l', conversionFactor: 1, description: '1 liter = 1000 ml (Base unit)', isActive: true },
    { id: '6', unitName: 'Milliliter', unitSymbol: 'ml', category: 'volume', baseUnit: 'l', conversionFactor: 0.001, description: '1000 ml = 1 liter', isActive: true },
    { id: '7', unitName: 'Cup', unitSymbol: 'cup', category: 'volume', baseUnit: 'l', conversionFactor: 0.236588, description: '1 cup = 236.588 ml', isActive: true },
    { id: '8', unitName: 'Tablespoon', unitSymbol: 'tbsp', category: 'volume', baseUnit: 'l', conversionFactor: 0.0147868, description: '1 tbsp = 14.79 ml', isActive: true },
    { id: '9', unitName: 'Teaspoon', unitSymbol: 'tsp', category: 'volume', baseUnit: 'l', conversionFactor: 0.00492892, description: '1 tsp = 4.93 ml', isActive: true },
    
    // Quantity Units
    { id: '10', unitName: 'Pieces', unitSymbol: 'pcs', category: 'quantity', baseUnit: 'pcs', conversionFactor: 1, description: 'Count of individual items', isActive: true },
    { id: '11', unitName: 'Dozen', unitSymbol: 'doz', category: 'quantity', baseUnit: 'pcs', conversionFactor: 12, description: '12 pieces', isActive: true },
    { id: '12', unitName: 'Pair', unitSymbol: 'pair', category: 'quantity', baseUnit: 'pcs', conversionFactor: 2, description: '2 pieces', isActive: true },
    
    // Temperature Units
    { id: '13', unitName: 'Celsius', unitSymbol: '°C', category: 'temperature', baseUnit: '°C', conversionFactor: 1, description: 'Metric temperature', isActive: true },
    { id: '14', unitName: 'Fahrenheit', unitSymbol: '°F', category: 'temperature', baseUnit: '°C', conversionFactor: 1, description: 'Imperial temperature', isActive: true },
    
    // Time Units
    { id: '15', unitName: 'Minutes', unitSymbol: 'min', category: 'time', baseUnit: 'min', conversionFactor: 1, description: 'Cooking/preparation time', isActive: true },
    { id: '16', unitName: 'Hours', unitSymbol: 'hr', category: 'time', baseUnit: 'min', conversionFactor: 60, description: 'Long preparation time', isActive: true },
    { id: '17', unitName: 'Seconds', unitSymbol: 'sec', category: 'time', baseUnit: 'min', conversionFactor: 0.0166667, description: 'Short cooking time', isActive: true },
  ]);

  const [formData, setFormData] = useState({
    unitName: '',
    unitSymbol: '',
    category: '',
    baseUnit: '',
    conversionFactor: '',
    description: '',
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing unit
      setUnits(units.map(unit => 
        unit.id === editingId 
          ? {
              ...unit,
              unitName: formData.unitName,
              unitSymbol: formData.unitSymbol,
              category: formData.category as any,
              baseUnit: formData.baseUnit,
              conversionFactor: parseFloat(formData.conversionFactor),
              description: formData.description,
            }
          : unit
      ));
      toast({
        title: "Unit Updated",
        description: `${formData.unitName} has been updated successfully.`,
      });
      setEditingId(null);
    } else {
      // Add new unit
      const newUnit: UnitMeasurement = {
        id: Date.now().toString(),
        unitName: formData.unitName,
        unitSymbol: formData.unitSymbol,
        category: formData.category as any,
        baseUnit: formData.baseUnit,
        conversionFactor: parseFloat(formData.conversionFactor),
        description: formData.description,
        isActive: true,
      };
      setUnits([...units, newUnit]);
      toast({
        title: "Unit Added",
        description: `${formData.unitName} has been added to the measurement system.`,
      });
    }

    // Reset form
    setFormData({
      unitName: '',
      unitSymbol: '',
      category: '',
      baseUnit: '',
      conversionFactor: '',
      description: '',
    });
  };

  const handleEdit = (unit: UnitMeasurement) => {
    setFormData({
      unitName: unit.unitName,
      unitSymbol: unit.unitSymbol,
      category: unit.category,
      baseUnit: unit.baseUnit,
      conversionFactor: unit.conversionFactor.toString(),
      description: unit.description,
    });
    setEditingId(unit.id);
  };

  const handleDelete = (id: string) => {
    setUnits(units.filter(unit => unit.id !== id));
    toast({
      title: "Unit Deleted",
      description: "Unit measurement has been removed from the system.",
    });
  };

  const toggleActive = (id: string) => {
    setUnits(units.map(unit => 
      unit.id === id ? { ...unit, isActive: !unit.isActive } : unit
    ));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const filteredUnits = filterCategory === 'all' 
    ? units 
    : units.filter(unit => unit.category === filterCategory);

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'weight': return 'bg-blue-100 text-blue-800';
      case 'volume': return 'bg-green-100 text-green-800';
      case 'quantity': return 'bg-purple-100 text-purple-800';
      case 'temperature': return 'bg-red-100 text-red-800';
      case 'time': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/settings" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Settings
          </Link>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add/Edit Unit Form */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Ruler className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>{editingId ? 'Edit Unit' : 'Add New Unit'}</CardTitle>
                      <CardDescription>Manage measurement units for the system</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="unitName">Unit Name *</Label>
                      <Input
                        id="unitName"
                        name="unitName"
                        value={formData.unitName}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Kilogram"
                      />
                    </div>

                    <div>
                      <Label htmlFor="unitSymbol">Unit Symbol *</Label>
                      <Input
                        id="unitSymbol"
                        name="unitSymbol"
                        value={formData.unitSymbol}
                        onChange={handleChange}
                        required
                        placeholder="e.g., kg"
                      />
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
                          <SelectItem value="weight">Weight</SelectItem>
                          <SelectItem value="volume">Volume</SelectItem>
                          <SelectItem value="quantity">Quantity</SelectItem>
                          <SelectItem value="temperature">Temperature</SelectItem>
                          <SelectItem value="time">Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="baseUnit">Base Unit *</Label>
                      <Input
                        id="baseUnit"
                        name="baseUnit"
                        value={formData.baseUnit}
                        onChange={handleChange}
                        required
                        placeholder="e.g., kg, l, pcs"
                      />
                    </div>

                    <div>
                      <Label htmlFor="conversionFactor">Conversion Factor *</Label>
                      <Input
                        id="conversionFactor"
                        name="conversionFactor"
                        type="number"
                        step="0.000001"
                        value={formData.conversionFactor}
                        onChange={handleChange}
                        required
                        placeholder="e.g., 1, 0.001"
                      />
                      <p className="text-xs text-gray-600 mt-1">
                        Factor to convert to base unit
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Brief description"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        {editingId ? 'Update Unit' : 'Add Unit'}
                      </Button>
                      {editingId && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setEditingId(null);
                            setFormData({
                              unitName: '',
                              unitSymbol: '',
                              category: '',
                              baseUnit: '',
                              conversionFactor: '',
                              description: '',
                            });
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Units Table */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Unit Measurement Table</CardTitle>
                      <CardDescription>Standardized measurement units for recipes and inventory</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Select
                        value={filterCategory}
                        onValueChange={setFilterCategory}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="weight">Weight</SelectItem>
                          <SelectItem value="volume">Volume</SelectItem>
                          <SelectItem value="quantity">Quantity</SelectItem>
                          <SelectItem value="temperature">Temperature</SelectItem>
                          <SelectItem value="time">Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Unit Name</TableHead>
                          <TableHead>Symbol</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Base Unit</TableHead>
                          <TableHead>Conversion</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUnits.map((unit) => (
                          <TableRow key={unit.id}>
                            <TableCell className="font-medium">{unit.unitName}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{unit.unitSymbol}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getCategoryBadgeColor(unit.category)}>
                                {unit.category}
                              </Badge>
                            </TableCell>
                            <TableCell>{unit.baseUnit}</TableCell>
                            <TableCell>
                              {unit.conversionFactor === 1 ? 'Base' : `×${unit.conversionFactor}`}
                            </TableCell>
                            <TableCell className="text-sm text-gray-600 max-w-xs">
                              {unit.description}
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={unit.isActive ? "default" : "secondary"}
                                className="cursor-pointer"
                                onClick={() => toggleActive(unit.id)}
                              >
                                {unit.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => handleEdit(unit)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="destructive"
                                  onClick={() => handleDelete(unit.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitMeasurement;
