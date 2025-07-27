import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '@/components/ui/page-transition';
import { Button } from '@/components/ui/button';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = (): void => {
    navigate('/user-type');
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
          className="text-center z-10 w-full max-w-2xl"
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
          </motion.div>

          {/* Welcome message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Welcome to Bazaro!</h2>
              <h3 className="text-xl font-semibold text-primary mb-4">
                Connecting Local Street Vendors with You.
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Discover fresh, affordable products from nearby sellers or start selling your goods in just a few clicks.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8"
            >
              <Button
                onClick={handleContinue}
                className="w-full h-14 text-lg font-semibold btn-gradient"
              >
                Get Started
              </Button>
            </motion.div>
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
