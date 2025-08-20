import React, { useState } from 'react';
import { ShoppingCart, User } from 'lucide-react';

export default function TomatoCheckout({ cartItems = [], deliveryFee = 5.00 }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  // Calculate totals from actual cart items
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully! Thank you for choosing Tomato.');
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    },
    header: {
      backgroundColor: 'white',
      padding: '1rem 2rem',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#f97316'
    },
    nav: {
      display: 'flex',
      gap: '2rem',
      alignItems: 'center'
    },
    navLink: {
      color: '#666',
      textDecoration: 'none',
      fontSize: '1rem'
    },
    headerIcons: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    },
    iconButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem'
    },
    cartIcon: {
      position: 'relative'
    },
    cartBadge: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      backgroundColor: '#f97316',
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    main: {
      display: 'flex',
      maxWidth: '1200px',
      margin: '2rem auto',
      gap: '3rem',
      padding: '0 2rem'
    },
    leftSection: {
      flex: 2,
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      height: 'fit-content'
    },
    rightSection: {
      flex: 1,
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      height: 'fit-content'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      color: '#333'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    inputRow: {
      display: 'flex',
      gap: '1rem'
    },
    inputGroup: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    input: {
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s',
      backgroundColor: '#f9fafb'
    },
    inputFocus: {
      borderColor: '#f97316'
    },
    cartSummary: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5rem 0'
    },
    subtotalRow: {
      color: '#666'
    },
    deliveryRow: {
      color: '#666',
      borderBottom: '1px solid #e5e7eb',
      paddingBottom: '1rem'
    },
    totalRow: {
      fontWeight: 'bold',
      fontSize: '1.1rem',
      color: '#333',
      paddingTop: '1rem'
    },
    checkoutButton: {
      backgroundColor: '#f97316',
      color: 'white',
      border: 'none',
      padding: '1rem 2rem',
      borderRadius: '4px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '1.5rem',
      transition: 'background-color 0.2s'
    },
    checkoutButtonHover: {
      backgroundColor: '#ea580c'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        
        
      
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Left Section - Delivery Information Form */}
        <div style={styles.leftSection}>
          <h2 style={styles.sectionTitle}>Delivery Information</h2>
          <div style={styles.form}>
            <div style={styles.inputRow}>
              <div style={styles.inputGroup}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={formData.street}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputRow}>
              <div style={styles.inputGroup}>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.inputRow}>
              <div style={styles.inputGroup}>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
          </div>
        </div>

        {/* Right Section - Cart Totals */}
        <div style={styles.rightSection}>
          <h2 style={styles.sectionTitle}>Cart Totals</h2>
          <div style={styles.cartSummary}>
            <div style={{...styles.summaryRow, ...styles.subtotalRow}}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{...styles.summaryRow, ...styles.deliveryRow}}>
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div style={{...styles.summaryRow, ...styles.totalRow}}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              style={styles.checkoutButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = styles.checkoutButtonHover.backgroundColor}
              onMouseLeave={(e) => e.target.style.backgroundColor = styles.checkoutButton.backgroundColor}
              onClick={handleSubmit}
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}