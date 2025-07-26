import { motion } from 'framer-motion';
import { Store, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '@/components/ui/page-transition';
import { Card } from '@/components/ui/card';

const UserType = () => {
  const navigate = useNavigate();

  const userTypes = [
    {
      type: 'seller',
      title: 'I am a Seller',
      subtitle: 'List your products for street vendors',
      icon: Store,
      gradient: 'from-primary to-accent',
      path: '/seller'
    },
    {
      type: 'vendor',
      title: 'I am a Street Vendor',
      subtitle: 'Find products at best prices',
      icon: ShoppingCart,
      gradient: 'from-accent to-primary',
      path: '/vendor'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div 
          className="text-center w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-3">Welcome to Bazaro!</h1>
          <p className="text-muted-foreground mb-12">
            Choose how you want to use our platform
          </p>

          <div className="space-y-6">
            {userTypes.map((userType, index) => {
              const IconComponent = userType.icon;
              
              return (
                <motion.div
                  key={userType.type}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.2 + index * 0.1,
                    type: "spring",
                    bounce: 0.3
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(userType.path)}
                  className="cursor-pointer"
                >
                  <Card className="glass border-primary/20 hover:border-primary/40 p-8 transition-all duration-300">
                    <div className="flex flex-col items-center text-center space-y-4">
                      {/* Icon with gradient background */}
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${userType.gradient} flex items-center justify-center shadow-lg`}>
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                      
                      {/* Text content */}
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {userType.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {userType.subtitle}
                        </p>
                      </div>
                      
                      {/* Arrow indicator */}
                      <motion.div
                        className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <div className="w-3 h-3 border-r-2 border-b-2 border-primary rotate-[-45deg]" />
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-muted-foreground mt-8"
          >
            You can always switch between modes later
          </motion.p>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default UserType;