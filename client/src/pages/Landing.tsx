import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '@/components/ui/page-transition';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

const Landing = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedLocation) {
      // Store location in localStorage for later use
      localStorage.setItem('bazaro-location', selectedLocation);
      navigate('/user-type');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <motion.div 
          className="text-center z-10 w-full max-w-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Logo and branding */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-primary rounded-2xl flex items-center justify-center">
              <MapPin className="h-12 w-12 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Bazaro
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Connect. Trade. Prosper.
            </p>
          </motion.div>

          {/* Location selection */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            <div className="text-left">
              <h2 className="text-2xl font-semibold mb-2">Choose your location</h2>
              <p className="text-muted-foreground">
                Select your area in Chennai to find nearby sellers
              </p>
            </div>

            <div className="space-y-4">
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="h-14 glass border-primary/20 hover:border-primary/40">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <SelectValue placeholder="Select your area..." />
                  </div>
                </SelectTrigger>
                <SelectContent className="glass border-primary/20">
                  {chennaAreas.map((area) => (
                    <SelectItem key={area} value={area} className="hover:bg-primary/10">
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleContinue}
                  disabled={!selectedLocation}
                  className="w-full h-14 text-lg font-semibold btn-gradient disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Features preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 grid grid-cols-2 gap-4 text-sm"
          >
            <div className="glass p-4 rounded-xl">
              <div className="text-primary font-medium">🛒 For Sellers</div>
              <div className="text-muted-foreground">List your products easily</div>
            </div>
            <div className="glass p-4 rounded-xl">
              <div className="text-primary font-medium">📱 For Vendors</div>
              <div className="text-muted-foreground">Find best prices nearby</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Landing;