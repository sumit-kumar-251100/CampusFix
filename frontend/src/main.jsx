import React, { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("CampusFix ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#060913',
          color: '#ffffff',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'sans-serif'
        }}>
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '500px',
            boxShadow: '0 0 30px rgba(239, 68, 68, 0.2)'
          }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#ff4d6d' }}>
              Interface Notice
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              {this.state.error?.message || 'A render exception occurred.'}
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              style={{
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                border: 'none',
                color: '#fff',
                padding: '0.65rem 1.4rem',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 0 15px rgba(37, 99, 235, 0.5)'
              }}
            >
              Reload & Reset State
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
