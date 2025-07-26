import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Phone, MapPin, Filter, TrendingUp } from 'lucide-react';
import { PageTransition } from '@/components/ui/page-transition';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
  quantity: string;
  price: string;
}

interface Seller {
  phone: string;
  products: Product[];
  location: string;
  timestamp: string;
}

const Vendor = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'recent'>('price');
  const userLocation = localStorage.getItem('bazaro-location') || '';

  useEffect(() => {
    // Load sellers from localStorage
    const storedSellers = JSON.parse(localStorage.getItem('bazaro-sellers') || '[]');
    // Filter by same location
    const localSellers = storedSellers.filter((seller: Seller) => 
      seller.location === userLocation
    );
    setSellers(localSellers);
  }, [userLocation]);

  // Flatten all products from all sellers for search
  const allProducts = sellers.flatMap(seller => 
    seller.products.map(product => ({
      ...product,
      seller: seller
    }))
  );

  // Filter products based on search
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === 'price') {
      return parseFloat(a.price) - parseFloat(b.price);
    } else {
      return new Date(b.seller.timestamp).getTime() - new Date(a.seller.timestamp).getTime();
    }
  });

  const makePhoneCall = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_self');
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
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center"
            >
              <Search className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold">Find Products</h1>
            <div className="flex items-center justify-center mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{userLocation}</span>
            </div>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4 mb-6"
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 glass border-primary/20 focus:border-primary/40"
              />
            </div>

            {/* Sort Options */}
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'price' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('price')}
                className={sortBy === 'price' ? 'btn-gradient' : 'glass border-primary/20'}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Lowest Price
              </Button>
              <Button
                variant={sortBy === 'recent' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('recent')}
                className={sortBy === 'recent' ? 'btn-gradient' : 'glass border-primary/20'}
              >
                <Filter className="h-4 w-4 mr-2" />
                Most Recent
              </Button>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {sortedProducts.length === 0 ? (
              <Card className="glass border-primary/20 p-8 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? `No products match "${searchQuery}"`
                    : `No sellers in ${userLocation} yet`
                  }
                </p>
              </Card>
            ) : (
              sortedProducts.map((product, index) => (
                <motion.div
                  key={`${product.seller.phone}-${product.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="glass border-primary/20 p-4 hover:border-primary/40 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span>📦 {product.quantity}</span>
                          <Badge variant="secondary" className="bg-success/10 text-success">
                            ₹{product.price}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        📞 {product.seller.phone}
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={() => makePhoneCall(product.seller.phone)}
                          size="sm"
                          className="btn-gradient"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call Seller
                        </Button>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Stats */}
          {sortedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center text-sm text-muted-foreground"
            >
              Found {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''} 
              {searchQuery && ` for "${searchQuery}"`}
            </motion.div>
          )}
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Vendor;