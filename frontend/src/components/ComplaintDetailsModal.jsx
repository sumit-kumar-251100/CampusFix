import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  User, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MessageSquare,
  Wrench,
  Send
} from 'lucide-react';

export default function ComplaintDetailsModal({
  complaint,
  onClose,
  role,
  onUpdateStatusAndNotes
}) {
  if (!complaint) return null;

  const [currentStatus, setCurrentStatus] = useState(complaint.status);
  const [adminNote, setAdminNote] = useState(complaint.adminNotes || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleAdminUpdate = (e) => {
    e.preventDefault();
    onUpdateStatusAndNotes(complaint.id, currentStatus, adminNote);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const statusClass = complaint.status.toLowerCase().replace(' ', '-');
  const prioClass = complaint.priority.toLowerCase();

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose} id="details-modal-backdrop">
      <div 
        className="modal-content animate-scale-up" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-complaint-title"
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <span className="complaint-id" style={{ fontSize: '0.9rem' }}>{complaint.id}</span>
            <span className={`priority-badge priority-${prioClass}`}>
              {complaint.priority}
            </span>
            <span className={`status-badge ${statusClass}`}>
              {complaint.status}
            </span>
          </div>

          <button 
            className="btn btn-ghost" 
            onClick={onClose} 
            id="close-details-modal-btn"
            aria-label="Close details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div>
            <h2 id="modal-complaint-title" className="modal-title" style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
              {complaint.title}
            </h2>
            <div style={{ display: 'flex', gap: '1.25rem', color: 'var(--text-muted)', fontSize: '0.85rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={15} color="var(--primary)" />
                <span style={{ fontWeight: 600 }}>{complaint.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={15} />
                <span>{new Date(complaint.submittedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Category & Reporter Info Cards */}
          <div className="form-grid-2">
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.05)', 
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border-glass)',
              borderTop: '1px solid var(--border-glass-top)',
              padding: '0.9rem 1.1rem', 
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--specular-inner)'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#93c5fd', textTransform: 'uppercase', fontWeight: 700 }}>
                Category
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600, marginTop: '0.2rem', color: '#ffffff' }}>
                {complaint.category}
              </div>
            </div>

            <div style={{ 
              background: 'rgba(255, 255, 255, 0.05)', 
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border-glass)',
              borderTop: '1px solid var(--border-glass-top)',
              padding: '0.9rem 1.1rem', 
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--specular-inner)'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#93c5fd', textTransform: 'uppercase', fontWeight: 700 }}>
                Submitted By
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600, marginTop: '0.2rem', color: '#ffffff' }}>
                {complaint.submittedBy} <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>({complaint.studentId})</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="form-label">Full Problem Description</div>
            <div style={{ 
              background: 'rgba(7, 12, 28, 0.65)', 
              backdropFilter: 'blur(12px)',
              padding: '1.1rem', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--border-glass)',
              borderTop: '1px solid var(--border-glass-top)',
              fontSize: '0.925rem',
              lineHeight: 1.6,
              color: '#f8fafc',
              boxShadow: 'var(--specular-inner)'
            }}>
              {complaint.description}
            </div>
          </div>

          {/* Timeline / Resolution Progress */}
          <div className="stepper-container">
            <div className="stepper-header">Resolution Progress Timeline</div>
            <div className="timeline-list">
              {complaint.timeline && complaint.timeline.map((step, idx) => (
                <div 
                  key={idx} 
                  className={`timeline-item ${idx === complaint.timeline.length - 1 ? 'active' : 'completed'}`}
                >
                  <div className="timeline-dot">
                    {idx === complaint.timeline.length - 1 ? <Clock size={12} /> : <CheckCircle2 size={12} />}
                  </div>
                  <div className="timeline-info">
                    <div className="timeline-status">{step.status}</div>
                    <div className="timeline-timestamp">{step.timestamp}</div>
                    {step.note && <div className="timeline-note">{step.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Management Section */}
          {role === 'admin' ? (
            <form onSubmit={handleAdminUpdate} className="admin-action-box" id="admin-management-form">
              <h4>
                <Wrench size={16} />
                <span>Administrative Controls & Action</span>
              </h4>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="admin-modal-status-select">Update Status</label>
                  <select
                    id="admin-modal-status-select"
                    className="form-select"
                    value={currentStatus}
                    onChange={(e) => setCurrentStatus(e.target.value)}
                  >
                    <option value="Pending">Pending Review</option>
                    <option value="In Progress">In Progress (Assigned)</option>
                    <option value="Resolved">Resolved (Completed)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="admin-modal-assigned-to">Assigned Team / Technician</label>
                  <input
                    id="admin-modal-assigned-to"
                    type="text"
                    className="form-input"
                    value={complaint.assignedTo || 'Campus Facilities Team'}
                    readOnly
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="admin-resolution-note-input">
                  Resolution Notes / Action Log
                  <span className="form-label-desc">Visible in student status log</span>
                </label>
                <textarea
                  id="admin-resolution-note-input"
                  className="form-textarea"
                  rows="2"
                  placeholder="e.g., Technician arrived at site, replaced fuse, and re-tested..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.75rem' }}>
                {isSaved && (
                  <span style={{ color: '#10b981', fontSize: '0.825rem', fontWeight: 600 }}>
                    Changes updated!
                  </span>
                )}
                <button type="submit" className="btn btn-primary" id="btn-save-admin-notes">
                  <Send size={15} />
                  <span>Update Complaint</span>
                </button>
              </div>
            </form>
          ) : (
            complaint.adminNotes && (
              <div style={{
                background: 'var(--primary-light)',
                border: '1px solid var(--border-focus)',
                padding: '0.9rem 1.1rem',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.25rem' }}>
                  Latest Administrative Update:
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                  {complaint.adminNotes}
                </div>
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button 
            type="button" 
            className="btn btn-outline" 
            onClick={onClose}
            id="btn-close-details-footer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
