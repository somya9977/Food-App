import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5e6dc',
      minHeight: '100vh',
      padding: '0'
    },
    heroSection: {
      backgroundColor: '#f5e6dc',
      padding: '60px 20px',
      textAlign: 'center'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '30px'
    },
    logoIcon: {
      fontSize: '3rem',
      marginRight: '15px'
    },
    logoText: {
      fontSize: '3.5rem',
      fontWeight: 'bold',
      color: '#2c3e50',
      margin: '0'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#7f8c8d',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6'
    },
    contactCards: {
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      padding: '40px 20px',
      flexWrap: 'wrap',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    contactCard: {
      backgroundColor: '#fff',
      padding: '40px 30px',
      borderRadius: '10px',
      textAlign: 'center',
      minWidth: '280px',
      flex: '1',
      maxWidth: '350px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    },
    cardIcon: {
      fontSize: '2.5rem',
      color: '#ff6b35',
      marginBottom: '20px'
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '15px'
    },
    cardText: {
      fontSize: '1rem',
      color: '#7f8c8d'
    },
    getInTouchSection: {
      backgroundColor: '#f5e6dc',
      padding: '60px 20px 40px',
      textAlign: 'center'
    },
    sectionIcon: {
      fontSize: '2.5rem',
      color: '#ff6b35',
      marginRight: '15px'
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    sectionSubtitle: {
      fontSize: '1.1rem',
      color: '#7f8c8d',
      maxWidth: '500px',
      margin: '0 auto 50px'
    },
    formSection: {
      backgroundColor: '#fff',
      padding: '50px 20px',
      textAlign: 'center'
    },
    formTitle: {
      fontSize: '2rem',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '15px'
    },
    formSubtitle: {
      fontSize: '1rem',
      color: '#7f8c8d',
      marginBottom: '40px'
    },
    form: {
      maxWidth: '800px',
      margin: '0 auto'
    },
    formRow: {
      display: 'flex',
      gap: '20px',
      marginBottom: '25px',
      flexWrap: 'wrap'
    },
    formGroup: {
      flex: '1',
      minWidth: '250px',
      textAlign: 'left'
    },
    formGroupFull: {
      width: '100%',
      textAlign: 'left',
      marginBottom: '25px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      color: '#2c3e50'
    },
    required: {
      color: '#e74c3c'
    },
    input: {
      width: '100%',
      padding: '15px',
      fontSize: '1rem',
      border: '1px solid #ddd',
      borderRadius: '5px',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      boxSizing: 'border-box',
      backgroundColor: '#fff'
    },
    inputFocus: {
      borderColor: '#ff6b35'
    },
    textarea: {
      width: '100%',
      padding: '15px',
      fontSize: '1rem',
      border: '1px solid #ddd',
      borderRadius: '5px',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      boxSizing: 'border-box',
      minHeight: '120px',
      resize: 'vertical',
      backgroundColor: '#fff'
    },
    select: {
      width: '100%',
      padding: '15px',
      fontSize: '1rem',
      border: '1px solid #ddd',
      borderRadius: '5px',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      boxSizing: 'border-box',
      backgroundColor: '#fff',
      cursor: 'pointer'
    },
    error: {
      color: '#e74c3c',
      fontSize: '0.9rem',
      marginTop: '5px'
    },
    button: {
      backgroundColor: '#ff6b35',
      color: '#fff',
      padding: '15px 40px',
      fontSize: '1.1rem',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      fontWeight: '600',
      marginTop: '20px'
    },
    buttonDisabled: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed'
    },
    successMessage: {
      backgroundColor: '#d4edda',
      color: '#155724',
      padding: '15px',
      borderRadius: '5px',
      marginBottom: '20px',
      border: '1px solid #c3e6cb'
    },
    errorMessage: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '15px',
      borderRadius: '5px',
      marginBottom: '20px',
      border: '1px solid #f5c6cb'
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setSubmitMessage('Thank you for your message! We will get back to you soon.');
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = styles.inputFocus.borderColor;
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = styles.input.borderColor;
  };

  const handleButtonHover = (e) => {
    if (!isSubmitting) {
      e.target.style.backgroundColor = '#e55a2b';
      e.target.style.transform = 'translateY(-2px)';
    }
  };

  const handleButtonLeave = (e) => {
    if (!isSubmitting) {
      e.target.style.backgroundColor = styles.button.backgroundColor;
      e.target.style.transform = 'none';
    }
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>👨‍🍳</span>
          <h1 style={styles.logoText}>Tasty Delights</h1>
        </div>
        <p style={styles.subtitle}>
          Experience the finest flavors delivered fresh to your doorstep. From gourmet dishes to comfort food, we've got your cravings covered.
        </p>
      </div>

      {/* Contact Cards */}
      <div style={styles.contactCards}>
        <div style={styles.contactCard}>
          <div style={styles.cardIcon}>📞</div>
          <h3 style={styles.cardTitle}>Call Us</h3>
          <p style={styles.cardText}>(555) 123-FOOD</p>
        </div>
        <div style={styles.contactCard}>
          <div style={styles.cardIcon}>✉️</div>
          <h3 style={styles.cardTitle}>Email Us</h3>
          <p style={styles.cardText}>hello@tastydelights.com</p>
        </div>
        <div style={styles.contactCard}>
          <div style={styles.cardIcon}>📍</div>
          <h3 style={styles.cardTitle}>Visit Us</h3>
          <p style={styles.cardText}>123 Food Street, Flavor City</p>
        </div>
      </div>

      {/* Get in Touch Section */}
      <div style={styles.getInTouchSection}>
        <h2 style={styles.sectionTitle}>
          <span style={styles.sectionIcon}>🍴</span>
          Get in Touch
        </h2>
        <p style={styles.sectionSubtitle}>
          Have a question about our menu? Want to cater an event? Or just want to share your feedback? We'd love to hear from you!
        </p>
      </div>

      {/* Contact Form */}
      <div style={styles.formSection}>
        <h2 style={styles.formTitle}>Send us a Message</h2>
        <p style={styles.formSubtitle}>
          Fill out the form below and we'll respond as soon as possible
        </p>

        <div style={styles.form}>
          {submitMessage && (
            <div style={submitMessage.includes('Thank you') ? styles.successMessage : styles.errorMessage}>
              {submitMessage}
            </div>
          )}

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>
                Full Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                style={styles.input}
                placeholder="Enter your full name"
              />
              {errors.name && <div style={styles.error}>{errors.name}</div>}
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email Address <span style={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                style={styles.input}
                placeholder="Enter your email"
              />
              {errors.email && <div style={styles.error}>{errors.email}</div>}
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label htmlFor="phone" style={styles.label}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                style={styles.input}
                placeholder="(555) 123-4567"
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="subject" style={styles.label}>
                Subject <span style={styles.required}>*</span>
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                style={styles.select}
              >
                <option value="">Select a subject</option>
                <option value="menu">Menu Question</option>
                <option value="catering">Catering Event</option>
                <option value="feedback">Feedback</option>
                <option value="complaint">Complaint</option>
                <option value="general">General Inquiry</option>
                <option value="other">Other</option>
              </select>
              {errors.subject && <div style={styles.error}>{errors.subject}</div>}
            </div>
          </div>

          <div style={styles.formGroupFull}>
            <label htmlFor="message" style={styles.label}>
              Message <span style={styles.required}>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              style={styles.textarea}
              placeholder="Tell us how we can help you..."
            />
            {errors.message && <div style={styles.error}>{errors.message}</div>}
          </div>

          <button
            type="button"
            disabled={isSubmitting}
            style={{
              ...styles.button,
              ...(isSubmitting ? styles.buttonDisabled : {})
            }}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;