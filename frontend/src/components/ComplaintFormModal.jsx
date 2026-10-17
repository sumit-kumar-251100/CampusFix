import React, { useState } from 'react';
import { 
  X, 
  Send, 
  MapPin, 
  AlertTriangle, 
  Upload, 
  Check, 
  User, 
  ShieldCheck,
  Building
} from 'lucide-react';
import { CATEGORIES, CURRENT_STUDENT } from '../data/mockData';

const FORM_CATEGORIES = CATEGORIES.filter(c => c !== 'All');

export default function ComplaintFormModal({ onClose, onSubmitComplaint }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(FORM_CATEGORIES[0]);
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [attachmentName, setAttachmentName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a short summary/title of the issue.');
      return;
    }
    if (!location.trim()) {
      setError('Please specify the campus location (e.g. Hostel Block B, Room 304).');
      return;
    }
    if (!description.trim() || description.length < 10) {
      setError('Please provide a more detailed description (at least 10 characters).');
      return;
    }

    const newComplaint = {
      title: title.trim(),
      category,
      location: location.trim(),
      priority,
      description: description.trim(),
      submittedBy: isAnonymous ? 'Anonymous Student' : CURRENT_STUDENT.name,
      studentId: isAnonymous ? 'Hidden' : CURRENT_STUDENT.studentId,
      contactEmail: isAnonymous ? 'anonymous@campus.edu' : CURRENT_STUDENT.email,
      attachment: attachmentName || null
    };

    onSubmitComplaint(newComplaint);
  };

  const handleMockAttachment = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachmentName(e.target.files[0].name);
    }
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose} id="new-complaint-backdrop">
      <div 
        className="modal-content animate-scale-up" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-form-heading"
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 id="modal-form-heading" className="modal-title">Submit Campus Complaint</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Report facility, infrastructure, or service issues for prompt resolution.
            </p>
          </div>
          <button 
            type="button" 
            className="btn btn-ghost" 
            onClick={onClose}
            id="btn-close-form-modal"
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div style={{
                background: 'var(--prio-critical-bg)',
                color: 'var(--prio-critical-text)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}>
                <AlertTriangle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Issue Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="complaint-title-input">
                <span>Issue Title *</span>
                <span className="form-label-desc">Briefly summarize the problem</span>
              </label>
              <input
                id="complaint-title-input"
                type="text"
                className="form-input"
                placeholder="e.g., Water leakage in 2nd floor corridor washroom"
                value={title}
                onChange={(e) => { setTitle(e.target.value); setError(''); }}
                required
              />
            </div>

            {/* Category & Location */}
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="complaint-category-select">Category *</label>
                <select
                  id="complaint-category-select"
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {FORM_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="complaint-location-input">Specific Location *</label>
                <input
                  id="complaint-location-input"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Hostel Block B - Room 214"
                  value={location}
                  onChange={(e) => { setLocation(e.target.value); setError(''); }}
                  required
                />
              </div>
            </div>

            {/* Priority Selector */}
            <div className="form-group">
              <label className="form-label">
                <span>Priority Level</span>
                <span className="form-label-desc">Indicate urgency of maintenance</span>
              </label>
              <div className="priority-selector">
                {['Low', 'Medium', 'High', 'Critical'].map((prio) => (
                  <button
                    key={prio}
                    type="button"
                    className={`prio-btn ${priority === prio ? `active ${prio.toLowerCase()}` : ''}`}
                    onClick={() => setPriority(prio)}
                  >
                    {prio}
                  </button>
                ))}
              </div>
            </div>

            {/* Problem Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="complaint-description-input">
                <span>Detailed Description *</span>
                <span className="form-label-desc">{description.length}/500 chars</span>
              </label>
              <textarea
                id="complaint-description-input"
                className="form-textarea"
                rows="4"
                maxLength={500}
                placeholder="Describe what happened, equipment involved, and any potential hazard to students..."
                value={description}
                onChange={(e) => { setDescription(e.target.value); setError(''); }}
                required
              />
            </div>

            {/* Photo Attachment (Optional) */}
            <div className="form-group">
              <label className="form-label" htmlFor="complaint-photo-upload">
                <span>Attachment / Photo (Optional)</span>
                <span className="form-label-desc">Help technicians identify the issue</span>
              </label>
              <div style={{
                border: '1px dashed var(--border-glass-top)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(12px)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--specular-inner)'
              }}>
                <input
                  type="file"
                  id="complaint-photo-upload"
                  style={{ display: 'none' }}
                  onChange={handleMockAttachment}
                  accept="image/*"
                />
                <label htmlFor="complaint-photo-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.45rem' }}>
                  <Upload size={22} color="#60a5fa" />
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#93c5fd' }}>
                    {attachmentName ? `Selected: ${attachmentName}` : 'Click to attach photo or file proof'}
                  </span>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-light)' }}>
                    Supports PNG, JPG, or PDF up to 10MB
                  </span>
                </label>
              </div>
            </div>

            {/* Submitter & Privacy Options */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border-glass)',
              borderTop: '1px solid var(--border-glass-top)',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              boxShadow: 'var(--specular-inner)'
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>
                  Reporting as: <span style={{ color: '#60a5fa' }}>{isAnonymous ? 'Anonymous' : `${CURRENT_STUDENT.name} (${CURRENT_STUDENT.studentId})`}</span>
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                  {isAnonymous ? 'Your identity is masked from public views.' : CURRENT_STUDENT.hostel}
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.825rem', cursor: 'pointer', userSelect: 'none', color: '#e2e8f0' }}>
                <input
                  type="checkbox"
                  id="anonymous-checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <span>Submit Anonymously</span>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-outline" 
              onClick={onClose}
              id="btn-cancel-complaint"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              id="btn-submit-complaint"
            >
              <Send size={16} />
              <span>Submit Complaint</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
