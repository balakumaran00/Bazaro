import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Phone, Package, Edit, LogOut, ArrowLeft, Save, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import decepticonsLogo from '@/assets/decepticons-logo.png';
import { PageTransition } from '@/components/ui/page-transition';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface UserData {
  userType: 'seller' | 'vendor' | null;
  location: string;
  phone?: string;
  productsCount?: number;
  name?: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    userType: null,
    location: '',
    phone: '',
    productsCount: 0,
    name: ''
  });
  
  const [nameInput, setNameInput] = useState('');
  const [isNameSaved, setIsNameSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    // Load user data from localStorage
    const location = localStorage.getItem('bazaro-location') || '';
    const name = localStorage.getItem('bazaro-user-name') || '';
    const sellers = JSON.parse(localStorage.getItem('bazaro-sellers') || '[]');
    
    // Check if user is a seller (has listed products)
    const userSeller = sellers.find((seller: any) => seller.phone);
    
    if (userSeller) {
      setUserData({
        userType: 'seller',
        location,
        phone: userSeller.phone,
        productsCount: userSeller.products.length,
        name
      });
    } else {
      setUserData({
        userType: 'vendor',
        location,
        phone: '',
        productsCount: 0,
        name
      });
    }
    
    setNameInput(name);
    // Show input only if no name is saved
    setShowNameInput(!name);
  }, []);

  const handleEditProfile = () => {
    // Navigate back to user type selection to switch roles
    navigate('/user-type');
  };

  const handleSaveName = async () => {
    if (!nameInput.trim()) return;
    
    setIsSaving(true);
    
    // Simulate save delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Save name to localStorage
    localStorage.setItem('bazaro-user-name', nameInput.trim());
    
    // Update userData state
    setUserData(prev => ({ ...prev, name: nameInput.trim() }));
    
    // Show success state
    setIsNameSaved(true);
    setIsSaving(false);
    
    // Hide success state and input box after 2 seconds
    setTimeout(() => {
      setIsNameSaved(false);
      setShowNameInput(false);
    }, 2000);
  };

  const handleEditName = () => {
    setShowNameInput(true);
    setIsNameSaved(false);
  };

  const handleClearData = () => {
    localStorage.removeItem('bazaro-location');
    localStorage.removeItem('bazaro-sellers');
    localStorage.removeItem('bazaro-user-name');
    navigate('/');
  };

  const statsCards = [
    {
      title: userData.userType === 'seller' ? 'Products Listed' : 'Searches Made',
      value: userData.userType === 'seller' ? userData.productsCount : '15+',
      icon: Package,
      color: 'from-primary to-accent'
    },
    {
      title: 'Active Since',
      value: 'Today',
      icon: User,
      color: 'from-accent to-primary'
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
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="sm"
              className="glass border-primary/20 hover:border-primary/40"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </motion.div>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center p-4"
            >
              <img 
                src={decepticonsLogo} 
                alt="Decepticons Logo" 
                className="w-full h-full object-contain"
              />
            </motion.div>
            <h1 className="text-2xl font-bold">
              {userData.name ? `Hello, ${userData.name}!` : 'Your Profile'}
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your Bazaro account
            </p>
          </div>

          {/* Name Section - Input or Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-6"
          >
            <Card className="glass border-primary/20 p-4">
              {showNameInput ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-primary" />
                    <label className="text-sm font-medium">Your Name</label>
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="flex-1 glass border-primary/20 focus:border-primary/40"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSaveName();
                        }
                      }}
                      autoFocus
                    />
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={handleSaveName}
                        disabled={!nameInput.trim() || isSaving}
                        size="sm"
                        className={`min-w-[80px] transition-all duration-300 ${
                          isNameSaved 
                            ? 'bg-success hover:bg-success text-white' 
                            : 'btn-gradient'
                        }`}
                      >
                        {isSaving ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : isNameSaved ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                  {isNameSaved && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-success flex items-center"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Name saved successfully!
                    </motion.p>
                  )}
                </div>
              ) : userData.name ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Name</h3>
                      <p className="text-lg font-semibold text-primary">
                        {userData.name}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={handleEditName}
                      variant="outline"
                      size="sm"
                      className="glass border-primary/20 hover:border-primary/40"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              ) : null}
            </Card>
          </motion.div>

          {/* User Type Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-6"
          >
            <Badge 
              variant="secondary" 
              className="px-4 py-2 text-sm font-semibold bg-primary/10 text-primary border-primary/20"
            >
              {userData.userType === 'seller' ? '🛒 Seller' : '📱 Street Vendor'}
            </Badge>
          </motion.div>

          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 mb-6"
          >
            <Card className="glass border-primary/20 p-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Location</h3>
                  <p className="text-sm text-muted-foreground">
                    {userData.location || 'Not set'}
                  </p>
                </div>
              </div>
            </Card>

            {userData.phone && (
              <Card className="glass border-primary/20 p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-success" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Phone Number</h3>
                    <p className="text-sm text-muted-foreground">
                      {userData.phone}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {statsCards.map((stat, index) => {
              const IconComponent = stat.icon;
              
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="glass border-primary/20 p-4 text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.title}</div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleEditProfile}
                variant="outline"
                className="w-full h-12 glass border-primary/20 hover:border-primary/40"
              >
                <Edit className="h-5 w-5 mr-2" />
                Switch User Type
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => navigate(userData.userType === 'seller' ? '/seller' : '/vendor')}
                className="w-full h-12 btn-gradient"
              >
                {userData.userType === 'seller' ? (
                  <>
                    <Package className="h-5 w-5 mr-2" />
                    Manage Products
                  </>
                ) : (
                  <>
                    <Package className="h-5 w-5 mr-2" />
                    Browse Products
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>

          {/* Clear Data */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-12 pt-6 border-t border-border/50"
          >
            <Card className="glass border-destructive/20 p-4">
              <div className="text-center space-y-3">
                <h4 className="font-medium text-destructive">Reset Account</h4>
                <p className="text-sm text-muted-foreground">
                  Clear all your data and start fresh
                </p>
                <Button
                  onClick={handleClearData}
                  variant="outline"
                  size="sm"
                  className="border-destructive/20 text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Profile;
