import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="toast-container" aria-live="polite">
      <div className={`toast ${toast.type || 'info'}`} id="app-toast-notification">
        {toast.type === 'success' ? (
          <CheckCircle2 size={18} color="#34d399" />
        ) : toast.type === 'error' ? (
          <AlertCircle size={18} color="#f87171" />
        ) : (
          <Info size={18} color="#60a5fa" />
        )}
        <span style={{ flex: 1 }}>{toast.message}</span>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
          aria-label="Dismiss toast"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
