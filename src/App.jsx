import React, { useState, useEffect } from 'react';

import ContactForm from "./components/ContactForm.jsx";
import TomatoCheckout from "./components/TomatoCheckout.jsx";
import './App.css';


export default function TomatoRestaurant() {
  // State for cart functionality
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // State for authentication
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [user, setUser] = useState(null);
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    name: ''
  });

  // State for food categories
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Food categories
  const foodCategories = [
    { id: 'All', name: 'All', icon: '🍽️' },
    { id: 'Salad', name: 'Salad', icon: '🥗' },
    { id: 'Fish', name: 'Sandwitch', icon: '🥪' },
    { id: 'Meat', name: 'Rolls', icon: '🌯' },
    { id: 'Chicken', name: 'Chicken', icon: '🍗' },
    { id: 'Dessert', name: 'Dessert', icon: '🍰' },
    { id: 'Drinks', name: 'Drinks', icon: '🥤' }
    
  ];

  // Updated menu items with categories
  const menuItems = [
    { id: 1, name: "Onion Mushroom Sandwich", price: 18.99, image: "/images/mushroom-onion-grilled-cheese-16.jpg", category: "Fish" },
    { id: 2, name: "Caesar Salad", price: 14.99, image: "/images/Caesar-salad_-4.jpg", category: "Salad" },
    { id: 3, name: "Chicken Teriyaki", price: 16.99, image: "/images/chicken-teriyaki-500x500.webp", category: "Chicken" },
    { id: 4, name: "Mediterranean Wrap", price: 12.99, image: "/images/mediterranean-chicken-wrap-20.jpg", category: "Salad" },
    { id: 5, name: "Veg Spring Rolls ", price: 24.99, image: "/images/spring-rolls-with-vegetables.jpg", category: "Meat" },
    { id: 6, name: "Mediterranean Vegetable Sandwich", price: 15.99, image: "images/Mediterranean Vegetable Sandwich.webp", category: "Fish" },
    { id: 7, name: "Kathi Roll ", price: 22.99, image: "/images/kathi-roll-recipe.jpg", category: "Meat" },
    { id: 8, name: "Grilled Chicken", price: 17.99, image: "images/Grilled-Chicken-Breast-24SQ1200.jpg", category: "Chicken" },
    { id: 9, name: "Greek Salad", price: 13.99, image: "/images/Greek-Salad-TIMG.jpg", category: "Salad" },
    { id: 10, name: "Chocolate Cake", price: 8.99, image: "/images/chocolate-cake-with-chocolate-ganache-12.jpg", category: "Dessert" },
    { id: 11, name: "Chocolate shake", price: 4.99, image: "/images/110924172603295266e12c388cc54.webp", category: "Drinks" },
    { id: 12, name: "Tiramisu", price: 7.99, image: "/images/Tiramisu-1200.jpg", category: "Dessert" }
  ];

  // Filter menu items based on selected category
  const filteredMenuItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  // Check for existing user session on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  // Authentication functions
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUpMode ? 'register' : 'login';
    
    try {
      const response = await fetch(`http://localhost:3001/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authForm),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setIsSignInOpen(false);
        setAuthForm({ email: '', password: '', name: '' });
        alert(isSignUpMode ? 'Account created successfully!' : 'Welcome back!');
      } else {
        alert(data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('Connection error. Please try again.');
    }
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      localStorage.removeItem('token');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    alert('Signed out successfully!');
  };

  const handleAuthInputChange = (e) => {
    setAuthForm({
      ...authForm,
      [e.target.name]: e.target.value
    });
  };

  // Cart functions
  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(cartItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

const [showCheckout, setShowCheckout] = useState(false);


  // Custom SVG Icons
  const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  );

  const ShoppingBagIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  );

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      margin: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    
    header: {
      backgroundColor: 'white',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    },
    headerContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64px'
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#f97316',
      margin: 0
    },
    nav: {
      display: 'flex',
      gap: '32px'
    },
    navLink: {
      color: '#374151',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
      fontSize: '16px'
    },
    navLinkHover: {
      color: '#f97316'
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    iconButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#6b7280',
      transition: 'color 0.3s ease',
      padding: '8px'
    },
    cartContainer: {
      position: 'relative',
      display: 'inline-block'
    },
    cartBadge: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      backgroundColor: '#f97316',
      color: 'white',
      fontSize: '12px',
      borderRadius: '50%',
      width: '16px',
      height: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    signInButton: {
      border: '1px solid #d1d5db',
      padding: '8px 16px',
      borderRadius: '9999px',
      color: '#374151',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px'
    },
    heroSection: {
      background: 'linear-gradient(to right, #fb923c, #f97316)',
      position: 'relative',
      overflow: 'hidden'
    },
    heroContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '64px 24px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '48px',
      alignItems: 'center'
    },
    textContent: {
      color: 'white'
    },
    heroTitle: {
      fontSize: '56px',
      fontWeight: 'bold',
      lineHeight: '1.1',
      marginBottom: '24px',
      margin: 0
    },
    heroDescription: {
      fontSize: '18px',
      color: '#fed7aa',
      lineHeight: '1.6',
      marginBottom: '32px',
      maxWidth: '500px'
    },
    viewMenuButton: {
      backgroundColor: 'white',
      color: '#f97316',
      padding: '12px 32px',
      borderRadius: '9999px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s ease'
    },
    imageContainer: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    plateContainer: {
      position: 'relative',
      maxWidth: '400px',
      width: '100%'
    },
    plate: {
      backgroundColor: 'white',
      borderRadius: '50%',
      padding: '32px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      position: 'relative'
    },
    foodImage: {
      width: '320px',
      height: '320px',
      background: 'linear-gradient(135deg, #4ade80, #16a34a)',
      borderRadius: '50%',
      position: 'relative',
      overflow: 'hidden'
    },
    broccoli1: {
      position: 'absolute',
      top: '48px',
      left: '48px',
      width: '64px',
      height: '64px',
      backgroundColor: '#22c55e',
      borderRadius: '50%',
      opacity: 0.8
    },
    broccoli2: {
      position: 'absolute',
      top: '32px',
      right: '64px',
      width: '48px',
      height: '48px',
      backgroundColor: '#16a34a',
      borderRadius: '50%',
      opacity: 0.7
    },
    broccoli3: {
      position: 'absolute',
      bottom: '80px',
      left: '80px',
      width: '56px',
      height: '56px',
      backgroundColor: '#4ade80',
      borderRadius: '50%',
      opacity: 0.9
    },
    protein: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) rotate(12deg)',
      width: '128px',
      height: '80px',
      backgroundColor: '#fbb6ce',
      borderRadius: '8px',
      opacity: 0.8
    },
    garnish1: {
      position: 'absolute',
      top: '96px',
      right: '96px',
      width: '12px',
      height: '12px',
      backgroundColor: 'white',
      borderRadius: '50%'
    },
    garnish2: {
      position: 'absolute',
      bottom: '128px',
      right: '80px',
      width: '8px',
      height: '8px',
      backgroundColor: 'white',
      borderRadius: '50%'
    },
    garnish3: {
      position: 'absolute',
      top: '128px',
      left: '112px',
      width: '8px',
      height: '8px',
      backgroundColor: '#fef08a',
      borderRadius: '50%'
    },
    fork: {
      position: 'absolute',
      right: '-32px',
      top: '50%',
      transform: 'translateY(-50%)'
    },
    forkHandle: {
      width: '16px',
      height: '128px',
      backgroundColor: '#4b5563',
      borderRadius: '9999px'
    },
    forkTines: {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    forkTine: {
      width: '4px',
      height: '16px',
      backgroundColor: '#4b5563',
      borderRadius: '9999px'
    },
    bread: {
      position: 'absolute',
      top: '-32px',
      left: '-32px',
      width: '80px',
      height: '48px',
      backgroundColor: '#fef3c7',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      transform: 'rotate(12deg)'
    },
    decorCircle1: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '256px',
      height: '256px',
      backgroundColor: '#fdba74',
      borderRadius: '50%',
      opacity: 0.2,
      transform: 'translate(128px, -128px)'
    },
    decorCircle2: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '192px',
      height: '192px',
      backgroundColor: '#ea580c',
      borderRadius: '50%',
      opacity: 0.2,
      transform: 'translate(-96px, 96px)'
    },
    mobileNav: {
      display: 'none'
    },
    // Cart Styles
    cartOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 2000,
      display: 'flex',
      justifyContent: 'flex-end'
    },
    cartPanel: {
      backgroundColor: 'white',
      width: '400px',
      height: '100vh',
      padding: '24px',
      overflowY: 'auto',
      boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.15)'
    },
    cartHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      borderBottom: '1px solid #e5e7eb',
      paddingBottom: '16px'
    },
    cartTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#111827',
      margin: 0
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#6b7280',
      padding: '4px'
    },
    cartItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid #f3f4f6'
    },
    cartItemInfo: {
      flex: 1
    },
    cartItemName: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#111827',
      margin: '0 0 4px 0'
    },
    cartItemPrice: {
      fontSize: '14px',
      color: '#6b7280',
      margin: 0
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    quantityButton: {
      backgroundColor: '#f97316',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      width: '24px',
      height: '24px',
      cursor: 'pointer',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    quantity: {
      fontSize: '16px',
      fontWeight: '500',
      minWidth: '20px',
      textAlign: 'center'
    },
    cartTotal: {
      marginTop: '24px',
      paddingTop: '16px',
      borderTop: '2px solid #e5e7eb'
    },
    totalText: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#111827',
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0 0 16px 0'
    },
    checkoutButton: {
      width: '100%',
      backgroundColor: '#f97316',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    emptyCart: {
      textAlign: 'center',
      color: '#6b7280',
      fontSize: '16px',
      marginTop: '48px'
    },
    // Menu Section Styles
    menuSection: {
      maxWidth: '1280px',
      margin: '64px auto',
      padding: '0 24px'
    },
    menuTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#111827',
      marginBottom: '48px'
    },
    menuGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px'
    },
    menuCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    menuItemImage: {
      fontSize: '48px',
      textAlign: 'center',
      marginBottom: '16px'
    },
    menuItemName: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '8px',
      textAlign: 'center'
    },
    menuItemPrice: {
      fontSize: '16px',
      color: '#f97316',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '16px'
    },
    addToCartButton: {
      width: '100%',
      backgroundColor: '#f97316',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    // Authentication Modal Styles
    authOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 2000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    authModal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '32px',
      width: '400px',
      maxWidth: '90vw',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    authHeader: {
      textAlign: 'center',
      marginBottom: '24px'
    },
    authTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#111827',
      margin: '0 0 8px 0'
    },
    authSubtitle: {
      color: '#6b7280',
      fontSize: '14px',
      margin: 0
    },
    authForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    authInput: {
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'border-color 0.3s ease'
    },
    authButton: {
      backgroundColor: '#f97316',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    authToggle: {
      textAlign: 'center',
      marginTop: '16px',
      color: '#6b7280',
      fontSize: '14px'
    },
    authLink: {
      color: '#f97316',
      cursor: 'pointer',
      textDecoration: 'underline'
    },
    userMenu: {
      position: 'relative',
      display: 'inline-block'
    },
    userButton: {
      backgroundColor: '#f97316',
      color: 'white',
      border: 'none',
      borderRadius: '9999px',
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    // Food Categories Styles
    categoriesSection: {
      maxWidth: '1280px',
      margin: '48px auto 0',
      padding: '0 24px'
    },
    categoriesTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#111827',
      marginBottom: '32px'
    },
    categoriesGrid: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '16px',
      marginBottom: '48px'
    },
    categoryItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'transform 0.3s ease'
    },
    categoryIcon: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '32px',
      marginBottom: '8px',
      border: '3px solid transparent',
      transition: 'all 0.3s ease'
    },
    categoryIconActive: {
      border: '3px solid #f97316',
      backgroundColor: '#fef2f2'
    },
    categoryIconInactive: {
      backgroundColor: '#f9fafb',
      border: '3px solid #e5e7eb'
    },
    categoryName: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      textAlign: 'center'
    },
    categoryNameActive: {
      color: '#f97316',
      fontWeight: '600'
    }

    

  };

  // Media query styles for mobile
  const mobileStyles = `
    @media (max-width: 768px) {
      .hero-content {
        grid-template-columns: 1fr !important;
        gap: 32px !important;
        padding: 48px 24px !important;
        text-align: center;
      }
      .hero-title {
        font-size: 36px !important;
      }
      .nav {
        display: none !important;
      }
      .hero-description {
        font-size: 16px !important;
      }
      .food-image {
        width: 280px !important;
        height: 280px !important;
      }
    }
  `;

  return (


    
    <>

      <style>{mobileStyles}</style>
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerContent}>
            {/* Logo */}
            <div>
              <h1 style={styles.logo}>Foddie Express.</h1>
            </div>
            
            {/* Navigation */}
            <nav style={styles.nav} className="nav">
              <a 
                href="#" 
                style={styles.navLink}
                onMouseEnter={(e) => e.target.style.color = styles.navLinkHover.color}
                onMouseLeave={(e) => e.target.style.color = styles.navLink.color}
              >
                HOME
              </a>
              <a 
                href="#menu" 
                style={styles.navLink}
                onMouseEnter={(e) => e.target.style.color = styles.navLinkHover.color}
                onMouseLeave={(e) => e.target.style.color = styles.navLink.color}
              >
                MENU
              </a>
              <a 
                href="#" 
                style={styles.navLink}
                onMouseEnter={(e) => e.target.style.color = styles.navLinkHover.color}
                onMouseLeave={(e) => e.target.style.color = styles.navLink.color}
              >
                MOBILE APP
              </a>
              <a 
                href="#Contact" 
                style={styles.navLink}
                onMouseEnter={(e) => e.target.style.color = styles.navLinkHover.color}
                onMouseLeave={(e) => e.target.style.color = styles.navLink.color}
              >
                CONTACT US
              </a>
            </nav>
            
            {/* Right side icons */}
            <div style={styles.rightSection}>
              <button 
                style={styles.iconButton}
                onMouseEnter={(e) => e.target.style.color = '#f97316'}
                onMouseLeave={(e) => e.target.style.color = '#6b7280'}
              >
                <SearchIcon />
              </button>
              <div style={styles.cartContainer}>
                <button 
                  style={styles.iconButton}
                  onClick={toggleCart}
                  onMouseEnter={(e) => e.target.style.color = '#f97316'}
                  onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                >
                  <ShoppingBagIcon />
                </button>
                <span style={styles.cartBadge}>{getTotalItems()}</span>
              </div>
              {user ? (
                <div style={styles.userMenu}>
                  <button style={styles.userButton}>
                    👤 {user.name}
                  </button>
                  <button 
                    onClick={handleSignOut}
                    style={{
                      ...styles.signInButton,
                      marginLeft: '8px',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      border: 'none'
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  style={styles.signInButton}
                  onClick={() => setIsSignInOpen(true)}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = '#f97316';
                    e.target.style.color = '#f97316';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.color = '#374151';
                  }}
                >
                  sign in
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section style={styles.heroSection}>
          <div style={styles.heroContent} className="hero-content">
            {/* Text Content */}
            <div style={styles.textContent}>
              <h2 style={styles.heroTitle} className="hero-title">
                Order your<br />
                favourite food here
              </h2>
              <p style={styles.heroDescription} className="hero-description">
                Choose from a diverse menu featuring a delectable array of dishes crafted with the finest 
                ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your 
                dining experience, one delicious meal at a time.
              </p>
              <button 
                style={styles.viewMenuButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#fef2f2'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                onClick={() => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  }}
              >
                View Menu
              </button>
            </div>
            
            {/* Food Image */}
            <div style={styles.imageContainer}>
              <div style={styles.plateContainer}>
                {/* Main dish plate */}
                <div style={styles.plate}>
                  <div style={styles.foodImage} className="food-image">
                    {/* Broccoli representation */}
                    <div style={styles.broccoli1}></div>
                    <div style={styles.broccoli2}></div>
                    <div style={styles.broccoli3}></div>
                    
                    {/* Fish/protein representation */}
                    <div style={styles.protein}></div>
                    
                    {/* Garnish dots */}
                    <div style={styles.garnish1}></div>
                    <div style={styles.garnish2}></div>
                    <div style={styles.garnish3}></div>
                  </div>
                </div>
                
                {/* Fork */}
                <div style={styles.fork}>
                  <div style={styles.forkHandle}></div>
                  <div style={styles.forkTines}>
                    <div style={styles.forkTine}></div>
                    <div style={styles.forkTine}></div>
                    <div style={styles.forkTine}></div>
                    <div style={styles.forkTine}></div>
                  </div>
                </div>
                
                {/* Bread/side dish */}
                <div style={styles.bread}></div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div style={styles.decorCircle1}></div>
          <div style={styles.decorCircle2}></div>
        </section>

        {/* Food Categories Section */}
        <section id="menu"  style={styles.categoriesSection}>
          <h2 style={styles.categoriesTitle}>Explore Our Menu</h2>
          <div style={styles.categoriesGrid}>
            {foodCategories.map(category => (
              <div 
                key={category.id}
                style={styles.categoryItem}
                onClick={() => setSelectedCategory(category.id)}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div 
                  style={{
                    ...styles.categoryIcon,
                    ...(selectedCategory === category.id ? styles.categoryIconActive : styles.categoryIconInactive)
                  }}
                >
                  {category.icon}
                </div>
                <span 
                  style={{
                    ...styles.categoryName,
                    ...(selectedCategory === category.id ? styles.categoryNameActive : {})
                  }}
                >
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Menu Section */}
        <section  style={styles.menuSection}>
          <h2 style={styles.menuTitle}>
            {selectedCategory === 'All' ? 'Our Popular Menu' : `${selectedCategory} Menu`}
          </h2>
          <div style={styles.menuGrid}>
            {filteredMenuItems.map(item => (
              <div 
                key={item.id} 
                style={styles.menuCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={styles.menuItemImage}>
                <img src={item.image} alt={item.name} style={{ width: '100%', borderRadius: '12px' }} />
                </div>
                <h3 style={styles.menuItemName}>{item.name}</h3>
                <p style={styles.menuItemPrice}>${item.price}</p>
                <button 
                  style={styles.addToCartButton}
                  onClick={() => addToCart(item)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#ea580c'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#f97316'}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Authentication Modal */}
        {isSignInOpen && (
          <div style={styles.authOverlay} onClick={() => setIsSignInOpen(false)}>
            <div style={styles.authModal} onClick={(e) => e.stopPropagation()}>
              <div style={styles.authHeader}>
                <h2 style={styles.authTitle}>
                  {isSignUpMode ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p style={styles.authSubtitle}>
                  {isSignUpMode ? 'Join us for delicious food!' : 'Sign in to your account'}
                </p>
              </div>
              
              <form style={styles.authForm} onSubmit={handleAuthSubmit}>
                {isSignUpMode && (
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={authForm.name}
                    onChange={handleAuthInputChange}
                    style={styles.authInput}
                    required
                  />
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={authForm.email}
                  onChange={handleAuthInputChange}
                  style={styles.authInput}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={authForm.password}
                  onChange={handleAuthInputChange}
                  style={styles.authInput}
                  required
                />
                <button 
                  type="submit" 
                  style={styles.authButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#ea580c'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#f97316'}
                >
                  {isSignUpMode ? 'Create Account' : 'Sign In'}
                </button>
              </form>
              
              <div style={styles.authToggle}>
                {isSignUpMode ? 'Already have an account? ' : "Don't have an account? "}
                <span 
                  style={styles.authLink}
                  onClick={() => setIsSignUpMode(!isSignUpMode)}
                >
                  {isSignUpMode ? 'Sign In' : 'Sign Up'}
                </span>
              </div>
            </div>
          </div>
        )}
              <section id='Contact'>
               <ContactForm />
               </section>

        {/* Cart Panel */}
        {isCartOpen && (
          <div style={styles.cartOverlay} onClick={toggleCart}>
            <div style={styles.cartPanel} onClick={(e) => e.stopPropagation()}>
              <div style={styles.cartHeader}>
                <h3 style={styles.cartTitle}>Your Cart</h3>
                <button style={styles.closeButton} onClick={toggleCart}>×</button>
              </div>
              
              {cartItems.length === 0 ? (
                <div style={styles.emptyCart}>
                  <p>Your cart is empty</p>
                  <p>Add some delicious items from our menu!</p>
                </div>
              ) : (
                <>
                  {cartItems.map(item => (
                    <div key={item.id} style={styles.cartItem}>
                      <div style={styles.cartItemInfo}>
                        <h4 style={styles.cartItemName}>{item.name}</h4>
                        <p style={styles.cartItemPrice}>${item.price}</p>
                      </div>
                      <div style={styles.quantityControls}>
                        <button 
                          style={styles.quantityButton}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#ea580c'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#f97316'}
                        >
                          -
                        </button>
                        <span style={styles.quantity}>{item.quantity}</span>
                        <button 
                          style={styles.quantityButton}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#ea580c'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#f97316'}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div style={styles.cartTotal}>
                    <div style={styles.totalText}>
                      <span>Total: ${getTotalPrice().toFixed(2)}</span>
                    </div>

                   {showCheckout && (
  <TomatoCheckout
    cartItems={cartItems}
    deliveryFee={5.00}
    onClose={() => setShowCheckout(false)} // Optional close button in the form
  />
)}

                    <button 
                      style={styles.checkoutButton}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#ea580c'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#f97316'}
                      onClick={() => setShowCheckout(true)} 
                    >
                      Proceed to Payment
                    </button>



                  </div>

                         

                </>
              )}
            </div>
          </div>
        )}
        
      </div>


      
    </>
  );
}