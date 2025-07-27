import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, Moon, Sun, Info, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '@/components/ui/page-transition';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useTheme } from '@/context/ThemeContext';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showAbout, setShowAbout] = useState<boolean>(false);

  const toggleAbout = (): void => {
    setShowAbout(!showAbout);
  };

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
        <Button variant="ghost" size="sm" onClick={toggleAbout}>
          {showAbout ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
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

          {/* About Bazaro Dropdown */}
          <AnimatePresence>
            {showAbout && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 overflow-hidden"
              >
                <Card className="glass border-primary/20 p-6">
                  <div className="space-y-6 text-sm">
                    <div>
                      <h3 className="text-xl font-bold mb-4">About Bazaro</h3>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary mb-2">🌱 What is Bazaro?</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Bazaro is a community-first platform designed to connect local street vendors, farmers, and small grocery shop owners with customers in their area. Whether it's fresh produce from a nearby farm or daily essentials from your trusted neighborhood store, Bazaro brings it all together in one simple, digital space.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary mb-2">🛍️ Our Mission</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        To empower local sellers and farmers by giving them a digital identity, and to provide customers with easy access to fresh, affordable, and local products.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mt-2">
                        We believe in building stronger communities by supporting the people who keep our local markets alive. Bazaro isn't just a platform — it's a movement to revive and digitize our traditional street economy.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary mb-2">🚀 What Can You Do on Bazaro?</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium">Buyers:</p>
                          <ul className="text-muted-foreground ml-4 list-disc space-y-1">
                            <li>Discover nearby vendors and farmers based on your location.</li>
                            <li>Access fresh groceries and products at fair prices.</li>
                            <li>Support local businesses and sustainable shopping.</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium">Sellers/Vendors:</p>
                          <ul className="text-muted-foreground ml-4 list-disc space-y-1">
                            <li>Easily list your products and update availability.</li>
                            <li>Reach more local customers without expensive setups.</li>
                            <li>Grow your business using just a phone and internet.</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary mb-2">📍 Where We Operate</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Bazaro currently focuses on vendors and sellers across Chennai, and we're expanding fast. Our goal is to reach every local market, street corner, and farming village — one area at a time.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary mb-2">🤝 Join the Movement</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Whether you're a customer looking for quality local products or a vendor ready to grow your business, Bazaro is here to help you connect, trade, and thrive — together.
                      </p>
                    </div>

                    {/* Privacy Policy Section */}
                    <div className="pt-6 border-t border-primary/20">
                      <h4 className="font-semibold text-primary mb-4">🔒 Privacy Policy for Bazaro</h4>
                      <p className="text-muted-foreground mb-4">Effective Date: [27.07.2025]</p>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        At Bazaro, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and protect your data.
                      </p>

                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium mb-2">1. What We Collect</h5>
                          <ul className="text-muted-foreground ml-4 list-disc space-y-1 text-xs">
                            <li>Personal Information: Name, phone number, email, address</li>
                            <li>Location Data: To show vendors and sellers near you</li>
                            <li>Product Information: If you're a vendor, we store product listings, prices, and availability</li>
                            <li>Usage Data: Device type, browser, and usage patterns</li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">2. How We Use Your Information</h5>
                          <ul className="text-muted-foreground ml-4 list-disc space-y-1 text-xs">
                            <li>To show relevant nearby vendors or sellers</li>
                            <li>To connect buyers with vendors</li>
                            <li>To improve user experience and app features</li>
                            <li>To notify you about updates or support</li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">3. Who Can Access Your Data</h5>
                          <ul className="text-muted-foreground ml-4 list-disc space-y-1 text-xs">
                            <li>Only Bazaro team members handling platform operations</li>
                            <li>Never shared or sold to third parties for ads or promotions</li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">4. Your Rights</h5>
                          <ul className="text-muted-foreground ml-4 list-disc space-y-1 text-xs">
                            <li>You can request to view, update, or delete your data anytime</li>
                            <li>You can disable location permissions from your device settings</li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">5. Security</h5>
                          <p className="text-muted-foreground text-xs">
                            We use secure servers, encrypted communication, and limited access to protect your data.
                          </p>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">6. Changes to This Policy</h5>
                          <p className="text-muted-foreground text-xs">
                            We may update this policy occasionally. We'll notify users of any major changes via email or app notification.
                          </p>
                        </div>

                        <div className="pt-2">
                          <p className="text-muted-foreground text-xs">
                            📧 For privacy concerns, contact: <span className="text-primary">bazaro104041@gmail.com</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Terms & Conditions Section */}
                    <div className="pt-6 border-t border-primary/20">
                      <h4 className="font-semibold text-primary mb-4">📜 Terms & Conditions for Bazaro</h4>
                      <p className="text-muted-foreground mb-4">Effective Date: [27.07.2025]</p>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Welcome to Bazaro! By using our platform, you agree to the following terms and conditions.
                      </p>

                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium mb-2">1. Who Can Use Bazaro</h5>
                          <ul className="text-muted-foreground ml-4 list-disc space-y-1 text-xs">
                            <li>Anyone aged 18 or older</li>
                            <li>Vendors, farmers, and sellers must provide valid contact info and real product details</li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">2. User Responsibilities</h5>
                          <ul className="text-muted-foreground ml-4 list-disc space-y-1 text-xs">
                            <li>Vendors must update product prices, quantities, and availability honestly</li>
                            <li>Buyers must use the platform respectfully, without misuse or fake orders</li>
                            <li>No abusive language, scams, or illegal products allowed</li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">3. Location Services</h5>
                          <ul className="text-muted-foreground ml-4 list-disc space-y-1 text-xs">
                            <li>Bazaro uses your location to show nearby sellers</li>
                            <li>You can choose to allow or deny location access</li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">4. Bazaro Rights</h5>
                          <ul className="text-muted-foreground ml-4 list-disc space-y-1 text-xs">
                            <li>We reserve the right to remove any account violating these terms</li>
                            <li>We may temporarily suspend services for updates or maintenance</li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">5. Limitation of Liability</h5>
                          <p className="text-muted-foreground text-xs mb-2">
                            Bazaro is a platform to connect buyers and sellers. We are not responsible for:
                          </p>
                          <ul className="text-muted-foreground ml-4 list-disc space-y-1 text-xs">
                            <li>Quality of products delivered (handled by individual vendors)</li>
                            <li>Losses or damages caused by buyer-seller disputes</li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">6. Changes to Terms</h5>
                          <p className="text-muted-foreground text-xs">
                            We may update these terms at any time. Users will be notified of changes through the app or website.
                          </p>
                        </div>

                        <div className="pt-2">
                          <p className="text-muted-foreground text-xs">
                            📧 For legal concerns or clarifications, contact: <span className="text-primary">bazaro104041@gmail.com</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

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
                <div>lots of love  from creaters!</div>
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
