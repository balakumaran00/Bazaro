import { motion } from 'framer-motion';
import { CheckCircle, Home, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '@/components/ui/page-transition';
import { Button } from '@/components/ui/button';

const Success = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div 
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            bounce: 0.4
          }}
        >
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 0.2,
              type: "spring", 
              bounce: 0.6,
              duration: 1
            }}
            className="relative mb-8"
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-success/20 rounded-full blur-3xl animate-pulse" />
            
            {/* Main success icon */}
            <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center">
              <CheckCircle className="h-16 w-16 text-white" />
            </div>
            
            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-success rounded-full"
                initial={{ 
                  scale: 0,
                  x: 0,
                  y: 0
                }}
                animate={{ 
                  scale: [0, 1, 0],
                  x: Math.cos(i * 60) * 60,
                  y: Math.sin(i * 60) * 60
                }}
                transition={{
                  duration: 2,
                  delay: 0.5 + i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                style={{
                  left: '50%',
                  top: '50%',
                  marginLeft: '-4px',
                  marginTop: '-4px'
                }}
              />
            ))}
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-3xl font-bold text-success">
              Success! 🎉
            </h1>
            <p className="text-lg text-muted-foreground">
              Your products have been listed successfully
            </p>
            <p className="text-sm text-muted-foreground">
              Street vendors in your area can now discover and contact you for your products
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12 space-y-4"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => navigate('/seller')}
                className="w-full h-12 btn-gradient font-semibold"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add More Products
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full h-12 glass border-primary/20 hover:border-primary/40"
              >
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </motion.div>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="mt-8 p-4 glass rounded-xl border-primary/20"
          >
            <div className="text-sm text-muted-foreground">
              <div className="font-medium text-foreground mb-2">💡 Tips:</div>
              <ul className="space-y-1 text-left">
                <li>• Keep your phone accessible for vendor calls</li>
                <li>• Update your inventory regularly</li>
                <li>• Consider competitive pricing</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Success;