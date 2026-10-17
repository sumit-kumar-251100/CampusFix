import React from 'react';
import { 
  MapPin, 
  Clock, 
  Zap, 
  Droplets, 
  Wifi, 
  Home, 
  BookOpen, 
  Trash2, 
  Utensils, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Electrical':
      return <Zap size={13} />;
    case 'Plumbing':
      return <Droplets size={13} />;
    case 'IT & Internet':
      return <Wifi size={13} />;
    case 'Hostel & Infrastructure':
      return <Home size={13} />;
    case 'Academic Facilities':
      return <BookOpen size={13} />;
    case 'Cleanliness & Sanitation':
      return <Trash2 size={13} />;
    case 'Mess & Canteen':
      return <Utensils size={13} />;
    default:
      return <HelpCircle size={13} />;
  }
};

export default function ComplaintCard({ 
  complaint, 
  onViewDetails, 
  role, 
  onUpdateStatus 
}) {
  const {
    id,
    title,
    category,
    location,
    priority,
    status,
    submittedBy,
    submittedAt,
    description,
    assignedTo
  } = complaint;

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  const statusClass = status.toLowerCase().replace(' ', '-');
  const prioClass = priority.toLowerCase();
  const statusGlowClass = `card-status-${statusClass}`;
  const prioGlowClass = `card-prio-${prioClass}`;

  return (
    <article 
      className={`complaint-card ${statusGlowClass} ${prioGlowClass} animate-fade-in`}
      id={`card-${id}`}
      onClick={() => onViewDetails(complaint)}
    >
      {/* Top Header */}
      <div className="card-top">
        <div className="card-id-category">
          <span className="complaint-id">{id}</span>
          <span className="category-badge">
            {getCategoryIcon(category)}
            <span>{category}</span>
          </span>
        </div>

        {/* Priority Badge */}
        <span className={`priority-badge priority-${prioClass}`}>
          {priority === 'Critical' && <span className="pulse-dot" />}
          <span>{priority}</span>
        </span>
      </div>

      {/* Title & Location */}
      <h3 className="card-title">{title}</h3>

      <div className="card-location">
        <MapPin size={14} color="var(--primary)" />
        <span>{location}</span>
      </div>

      {/* Description Snippet */}
      <p className="card-desc">{description}</p>

      {/* Bottom Bar */}
      <div className="card-bottom" onClick={(e) => e.stopPropagation()}>
        <div className="card-reporter">
          <div className="reporter-avatar">
            {submittedBy ? submittedBy[0] : 'S'}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{submittedBy}</div>
            <div style={{ fontSize: '0.7rem' }}>{formatDate(submittedAt)}</div>
          </div>
        </div>

        {role === 'admin' ? (
          <div className="admin-card-actions">
            <select
              id={`select-status-${id}`}
              className="admin-status-select"
              value={status}
              onChange={(e) => onUpdateStatus(id, e.target.value)}
              title="Quickly change status"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        ) : (
          <span className={`status-badge ${statusClass}`}>
            {status === 'Resolved' && <CheckCircle2 size={13} />}
            <span>{status}</span>
          </span>
        )}
      </div>
    </article>
  );
}
