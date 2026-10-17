import React from 'react';
import { 
  FileText, 
  Clock, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export default function DashboardStats({ complaints, onFilterByStatus }) {
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const inProgress = complaints.filter(c => c.status === 'In Progress').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;
  const critical = complaints.filter(c => c.priority === 'Critical' && c.status !== 'Resolved').length;

  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;
  const resolvedPct = total > 0 ? (resolved / total) * 100 : 0;
  const progressPct = total > 0 ? (inProgress / total) * 100 : 0;
  const pendingPct = total > 0 ? (pending / total) * 100 : 0;

  return (
    <section className="stats-section" aria-label="Dashboard Statistics">
      <div className="stats-grid">
        {/* Total */}
        <div 
          className="stat-card" 
          id="stat-card-total"
          onClick={() => onFilterByStatus('All')}
          style={{ cursor: 'pointer' }}
          title="Click to view all complaints"
        >
          <div className="stat-icon-wrapper total">
            <FileText size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{total}</span>
            <span className="stat-label">Total Complaints</span>
            <span className="stat-subtext">Registered across campus</span>
          </div>
        </div>

        {/* Pending */}
        <div 
          className="stat-card" 
          id="stat-card-pending"
          onClick={() => onFilterByStatus('Pending')}
          style={{ cursor: 'pointer' }}
          title="Click to filter pending complaints"
        >
          <div className="stat-icon-wrapper pending">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{pending}</span>
            <span className="stat-label">Pending Action</span>
            <span className="stat-subtext">Awaiting administrative triage</span>
          </div>
        </div>

        {/* In Progress */}
        <div 
          className="stat-card" 
          id="stat-card-progress"
          onClick={() => onFilterByStatus('In Progress')}
          style={{ cursor: 'pointer' }}
          title="Click to filter in-progress complaints"
        >
          <div className="stat-icon-wrapper in-progress">
            <RefreshCw size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{inProgress}</span>
            <span className="stat-label">In Progress</span>
            <span className="stat-subtext">Field technician dispatched</span>
          </div>
        </div>

        {/* Resolved */}
        <div 
          className="stat-card" 
          id="stat-card-resolved"
          onClick={() => onFilterByStatus('Resolved')}
          style={{ cursor: 'pointer' }}
          title="Click to filter resolved complaints"
        >
          <div className="stat-icon-wrapper resolved">
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{resolved}</span>
            <span className="stat-label">Resolved</span>
            <span className="stat-subtext">{resolutionRate}% resolution efficiency</span>
          </div>
        </div>
      </div>

      {/* Progress Breakdown Bar */}
      <div className="resolution-meter-card" style={{ marginTop: '1.25rem' }}>
        <div className="meter-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="meter-title">Campus Resolution Overview</span>
            {critical > 0 && (
              <span className="priority-badge priority-critical" style={{ fontSize: '0.7rem' }}>
                <span className="pulse-dot"></span>
                {critical} Critical Urgent Issue{critical > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <span className="meter-value">{resolutionRate}% Completed</span>
        </div>

        <div className="progress-track" aria-label="Resolution distribution track">
          <div 
            className="progress-bar-resolved" 
            style={{ width: `${resolvedPct}%` }}
            title={`Resolved: ${resolved} (${Math.round(resolvedPct)}%)`}
          />
          <div 
            className="progress-bar-progress" 
            style={{ width: `${progressPct}%` }}
            title={`In Progress: ${inProgress} (${Math.round(progressPct)}%)`}
          />
          <div 
            className="progress-bar-pending" 
            style={{ width: `${pendingPct}%` }}
            title={`Pending: ${pending} (${Math.round(pendingPct)}%)`}
          />
        </div>

        <div className="meter-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#10b981' }} />
            <span>Resolved ({resolved})</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#0284c7' }} />
            <span>In Progress ({inProgress})</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#f59e0b' }} />
            <span>Pending ({pending})</span>
          </div>
        </div>
      </div>
    </section>
  );
}
