import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Package, DollarSign, Plus, Trash2, Check, MapPin, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '@/components/ui/page-transition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  quantity: string;
  price: string;
}

const chennaAreas = [
  'T. Nagar',
  'Anna Nagar',
  'Velachery',
  'Adyar',
  'Mylapore',
  'Nungambakkam',
  'Kodambakkam',
  'Guindy',
  'Porur',
  'Tambaram',
  'Chrompet',
  'Perungudi',
  'OMR',
  'ECR'
];

const Seller = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [area, setArea] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: '', quantity: '', price: '' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: '',
      quantity: '',
      price: ''
    };
    setProducts([...products, newProduct]);
  };

  const removeProduct = (id: string) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const updateProduct = (id: string, field: keyof Product, value: string) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleAreaSelect = (selectedArea: string) => {
    setArea(selectedArea);
    setIsDropdownOpen(false);
  };

  const isFormValid = () => {
    return phoneNumber.length >= 10 && 
           area.trim() !== '' &&
           products.every(p => p.name && p.quantity && p.price);
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;
    setIsSubmitting(true);
    try {
      // Send each product as a separate POST request
      await Promise.all(products.map(async (p) => {
        const payload = {
          phoneNumber: phoneNumber,
          area: area,
          productName: p.name,
          productQuantity: p.quantity,
          productPrice: p.price
        };
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/seller`, payload);
      }));
      toast({
        title: "Success! 🎉",
        description: "Your products have been listed successfully",
      });
      setIsSubmitting(false);
      navigate('/success');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to list products. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen p-6 pb-24">
        <motion.div 
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center"
            >
              <Package className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold">List Your Products</h1>
            <p className="text-muted-foreground mt-2">
              Add your products for street vendors to discover
            </p>
          </div>

          {/* Phone Number */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <label className="block text-sm font-medium mb-2">
              📞 Your Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-12 h-12 glass border-primary/20 focus:border-primary/40"
                maxLength={10}
              />
            </div>
          </motion.div>

          {/* Area Dropdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-6"
          >
            <label className="block text-sm font-medium mb-2">
              📍 Your Area
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground z-10" />
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full h-12 pl-12 pr-12 text-left glass border border-primary/20 hover:border-primary/40 focus:border-primary/40 rounded-lg bg-background flex items-center justify-between transition-colors"
              >
                <span className={area ? 'text-foreground' : 'text-muted-foreground'}>
                  {area || 'Select your area'}
                </span>
                <ChevronDown className={'h-5 w-5 text-muted-foreground transition-transform ' + (isDropdownOpen ? 'rotate-180' : '')} />
              </button>
              
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-1 glass border border-primary/20 rounded-lg bg-background shadow-lg z-20 max-h-48 overflow-y-auto"
                >
                  {chennaAreas.map((areaOption, index) => (
                    <button
                      key={areaOption}
                      type="button"
                      onClick={() => handleAreaSelect(areaOption)}
                      className="w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {areaOption}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 mb-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">🛒 Your Products</h3>
              <Button
                onClick={addProduct}
                variant="outline"
                size="sm"
                className="glass border-primary/20 hover:border-primary/40"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="glass border-primary/20 p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">Product {index + 1}</h4>
                    {products.length > 1 && (
                      <Button
                        onClick={() => removeProduct(product.id)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive/80"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <Input
                      placeholder="Product name (e.g., Tomatoes)"
                      value={product.name}
                      onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                      className="glass border-primary/20 focus:border-primary/40"
                    />
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Quantity (e.g., 10 kg)"
                        value={product.quantity}
                        onChange={(e) => updateProduct(product.id, 'quantity', e.target.value)}
                        className="glass border-primary/20 focus:border-primary/40"
                      />
                      
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Price (₹)"
                          value={product.price}
                          onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                          className="pl-10 glass border-primary/20 focus:border-primary/40"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid() || isSubmitting}
              className="w-full h-14 text-lg font-semibold btn-gradient disabled:opacity-50"
            >
              {isSubmitting ? (
                <motion.div className="flex items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Listing Products...
                </motion.div>
              ) : (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  List My Products
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Seller;
