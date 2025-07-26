import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Moon, Sun, Info, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '@/components/ui/page-transition';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useTheme } from '@/context/ThemeContext';

const Settings = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const settingsOptions = [
    {
      title: 'Theme',
      description: 'Switch between light and dark mode',
      icon: theme === 'dark' ? Moon : Sun,
      action: <ThemeToggle />
    },
    {
      title: 'About Bazaro',
      description: 'Learn more about our platform',
      icon: Info,
      action: (
        <Button variant="ghost" size="sm">
          View
        </Button>
      )
    }
  ];

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
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-3"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Customize your Bazaro experience</p>
            </div>
          </div>

          {/* Settings Options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {settingsOptions.map((option, index) => {
              const IconComponent = option.icon;
              
              return (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="glass border-primary/20 p-4 hover:border-primary/40 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{option.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      {option.action}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* App Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <Card className="glass border-primary/20 p-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.8 }}
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center"
              >
                <SettingsIcon className="h-8 w-8 text-white" />
              </motion.div>
              
              <h3 className="text-lg font-semibold mb-2">Bazaro</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connecting sellers and street vendors across Chennai
              </p>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Version 1.0.0</div>
                <div>Built with ❤️ for local commerce</div>
              </div>
            </Card>
          </motion.div>

          {/* Future Features Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-6"
          >
            <Card className="glass border-primary/20 p-4">
              <h4 className="font-medium mb-2">🚀 Coming Soon</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Tamil language support</li>
                <li>• Voice instructions</li>
                <li>• Map view of sellers</li>
                <li>• Real-time inventory updates</li>
              </ul>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Settings;