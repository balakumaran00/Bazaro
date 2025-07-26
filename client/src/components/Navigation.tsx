import { Home, User, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: User, path: '/profile', label: 'Profile' },
    { icon: Settings, path: '/settings', label: 'Settings' }
  ];

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 mx-4 mb-4"
    >
      <div className="glass rounded-2xl p-2">
        <div className="flex justify-around items-center">
          {navItems.map(({ icon: Icon, path, label }) => {
            const isActive = location.pathname === path;
            
            return (
              <motion.button
                key={path}
                onClick={() => navigate(path)}
                className={`relative flex flex-col items-center p-3 rounded-xl touch-target ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className="h-6 w-6 mb-1" />
                <span className="text-xs font-medium">{label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;