import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import ComplaintFilterBar from './components/ComplaintFilterBar';
import ComplaintCard from './components/ComplaintCard';
import ComplaintDetailsModal from './components/ComplaintDetailsModal';
import ComplaintFormModal from './components/ComplaintFormModal';
import Toast from './components/Toast';
import { INITIAL_COMPLAINTS, CURRENT_STUDENT } from './data/mockData';
import { 
  PlusCircle, 
  Sparkles, 
  Inbox, 
  GraduationCap, 
  ShieldCheck, 
  Building,
  RotateCcw,
  SlidersHorizontal,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import './App.css';

const LOCAL_STORAGE_KEY = 'campusfix_complaints_v1';
const THEME_STORAGE_KEY = 'campusfix_theme';

export default function App() {
  // Theme state: defaults to dark for ambient neon glow
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
  });

  // Role state: 'student' | 'admin'
  const [role, setRole] = useState('student');

  // Student specific view: 'all' | 'my'
  const [studentScope, setStudentScope] = useState('all');

  // Complaints state with LocalStorage fallback
  const [complaints, setComplaints] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
    } catch {
      return INITIAL_COMPLAINTS;
    }
  });

  // Filtering states
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Sync theme attribute to HTML
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // Persist complaints to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(complaints));
    } catch (err) {
      console.error('Failed to save to localStorage', err);
    }
  }, [complaints]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Reset to sample initial data
  const handleResetData = () => {
    if (window.confirm('Reset all complaints to default sample data?')) {
      setComplaints(INITIAL_COMPLAINTS);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_COMPLAINTS));
      showToast('Sample data restored to defaults', 'info');
    }
  };

  // Add new complaint
  const handleCreateComplaint = (newComplaintData) => {
    const nextNumber = complaints.length + 2401;
    const newId = `CF-${nextNumber}`;
    const timestamp = new Date().toISOString();
    const formattedTime = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const complaintObj = {
      ...newComplaintData,
      id: newId,
      status: 'Pending',
      submittedAt: timestamp,
      assignedTo: 'Campus Central Helpdesk',
      estimatedResolution: 'Within 48 hours',
      adminNotes: '',
      timeline: [
        { 
          status: 'Submitted', 
          timestamp: formattedTime, 
          note: `Issue submitted by ${newComplaintData.submittedBy}` 
        }
      ]
    };

    setComplaints(prev => [complaintObj, ...prev]);
    setShowNewModal(false);
    showToast(`Complaint #${newId} logged successfully! Staff alerted.`);
  };

  // Update status (e.g. from Admin Card or Admin Modal)
  const handleUpdateStatus = (id, newStatus) => {
    const formattedTime = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        const newTimeline = [...(c.timeline || [])];
        newTimeline.push({
          status: newStatus,
          timestamp: formattedTime,
          note: `Status updated to ${newStatus} by Campus Administrator`
        });

        return {
          ...c,
          status: newStatus,
          timeline: newTimeline
        };
      }
      return c;
    }));

    // If modal is open for this complaint, update it as well
    if (selectedComplaint && selectedComplaint.id === id) {
      setSelectedComplaint(prev => ({
        ...prev,
        status: newStatus
      }));
    }

    showToast(`Complaint #${id} updated to ${newStatus}`, 'info');
  };

  // Update status and resolution notes from Detail Modal
  const handleUpdateStatusAndNotes = (id, newStatus, notes) => {
    const formattedTime = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        const timeline = [...(c.timeline || [])];
        if (c.status !== newStatus) {
          timeline.push({
            status: newStatus,
            timestamp: formattedTime,
            note: notes ? `Status set to ${newStatus}: "${notes}"` : `Status updated to ${newStatus}`
          });
        }

        return {
          ...c,
          status: newStatus,
          adminNotes: notes,
          timeline
        };
      }
      return c;
    }));

    setSelectedComplaint(prev => ({
      ...prev,
      status: newStatus,
      adminNotes: notes
    }));

    showToast(`Complaint #${id} administrative details saved`, 'success');
  };

  // Filter complaints
  const filteredComplaints = useMemo(() => {
    return complaints.filter(item => {
      // Role scope filter
      if (role === 'student' && studentScope === 'my') {
        const isStudentOwner = 
          item.submittedBy === CURRENT_STUDENT.name || 
          item.studentId === CURRENT_STUDENT.studentId;
        if (!isStudentOwner) return false;
      }

      // Status filter
      if (statusFilter !== 'All' && item.status !== statusFilter) {
        return false;
      }

      // Category filter
      if (categoryFilter !== 'All' && item.category !== categoryFilter) {
        return false;
      }

      // Priority filter
      if (priorityFilter !== 'All' && item.priority !== priorityFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchLocation = item.location.toLowerCase().includes(q);
        const matchId = item.id.toLowerCase().includes(q);
        const matchReporter = item.submittedBy.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        if (!matchTitle && !matchLocation && !matchId && !matchReporter && !matchDesc) {
          return false;
        }
      }

      return true;
    });
  }, [complaints, role, studentScope, statusFilter, categoryFilter, priorityFilter, searchQuery]);

  // Dynamic counts for status tabs
  const tabCounts = useMemo(() => {
    // calculate counts based on current scope, category, and priority
    const baseList = complaints.filter(item => {
      if (role === 'student' && studentScope === 'my') {
        return item.submittedBy === CURRENT_STUDENT.name || item.studentId === CURRENT_STUDENT.studentId;
      }
      return true;
    });

    return {
      all: baseList.length,
      pending: baseList.filter(c => c.status === 'Pending').length,
      inProgress: baseList.filter(c => c.status === 'In Progress').length,
      resolved: baseList.filter(c => c.status === 'Resolved').length
    };
  }, [complaints, role, studentScope]);

  const handleResetFilters = () => {
    setStatusFilter('All');
    setCategoryFilter('All');
    setPriorityFilter('All');
    setSearchQuery('');
  };

  return (
    <div className="app-container">
      {/* Blurred Mesh Gradients Background (Luminous Ambient Pools) */}
      <div className="mesh-gradient-container" aria-hidden="true">
        <div className="mesh-orb orb-1"></div>
        <div className="mesh-orb orb-2"></div>
        <div className="mesh-orb orb-3"></div>
        <div className="mesh-orb orb-4"></div>
        <div className="mesh-orb orb-5"></div>
      </div>

      {/* Top Navbar */}
      <Navbar
        role={role}
        setRole={setRole}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenNewComplaint={() => setShowNewModal(true)}
        onResetData={handleResetData}
      />

      <main className="main-content">
        {/* Welcome Banner */}
        <section className="welcome-banner animate-fade-in" aria-label="Campus Notice">
          <div className="banner-info">
            {role === 'student' ? (
              <>
                <h2>Student Resolution Hub</h2>
                
                {/* Student details point by point */}
                <ul className="student-points-list">
                  <li>
                    <span className="bullet-dot" />
                    <span><strong>Student Name:</strong> {CURRENT_STUDENT.name}</span>
                  </li>
                  <li>
                    <span className="bullet-dot" />
                    <span><strong>Roll Number:</strong> {CURRENT_STUDENT.studentId}</span>
                  </li>
                  <li>
                    <span className="bullet-dot" />
                    <span><strong>Department:</strong> {CURRENT_STUDENT.department}</span>
                  </li>
                  <li>
                    <span className="bullet-dot" />
                    <span><strong>Hostel / Residence:</strong> {CURRENT_STUDENT.hostel}</span>
                  </li>
                  <li>
                    <span className="bullet-dot" />
                    <span><strong>Campus Email:</strong> {CURRENT_STUDENT.email}</span>
                  </li>
                </ul>

                {/* Parenthesized notice with bold words at the last */}
                <p className="banner-notice-text">
                  (<strong>Report campus facility glitches</strong>, <strong>maintenance faults</strong>, or <strong>mess issues</strong> with <strong>live status tracking</strong>)
                </p>

                <div className="banner-chips">
                  <span className="banner-chip">
                    <ShieldCheck size={14} /> Anonymous Submissions Supported
                  </span>
                  <span className="banner-chip">
                    <Sparkles size={14} /> Avg Response Time: 3.2 hrs
                  </span>
                </div>
              </>
            ) : (
              <>
                <h2>Campus Facilities Administration</h2>
                <p>
                  Staff Management Console &bull; Triage reported student grievances, assign maintenance squads, and update ticket progress across all campus blocks.
                </p>
                <div className="banner-chips">
                  <span className="banner-chip">
                    <Building size={14} /> Campus Estate & Facilities
                  </span>
                  <span className="banner-chip">
                    <SlidersHorizontal size={14} /> Direct Quick Status Toggling
                  </span>
                  <span className="banner-chip">
                    <CheckCircle size={14} /> SLA Compliance Active
                  </span>
                </div>
              </>
            )}
          </div>

          <div>
            <button
              id="banner-btn-submit"
              className="btn btn-primary"
              onClick={() => setShowNewModal(true)}
              style={{ padding: '0.75rem 1.4rem', fontSize: '0.95rem' }}
            >
              <PlusCircle size={20} />
              <span>Report New Issue</span>
            </button>
          </div>
        </section>

        {/* Dashboard Statistics Overview */}
        <DashboardStats
          complaints={
            role === 'student' && studentScope === 'my'
              ? complaints.filter(c => c.submittedBy === CURRENT_STUDENT.name || c.studentId === CURRENT_STUDENT.studentId)
              : complaints
          }
          onFilterByStatus={(st) => setStatusFilter(st)}
        />

        {/* Student Specific Scope Switcher */}
        {role === 'student' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Viewing Mode:
            </span>
            <div className="role-switcher">
              <button
                id="btn-scope-all"
                className={`role-btn ${studentScope === 'all' ? 'active' : ''}`}
                onClick={() => setStudentScope('all')}
              >
                All Campus Issues
              </button>
              <button
                id="btn-scope-my"
                className={`role-btn ${studentScope === 'my' ? 'active' : ''}`}
                onClick={() => setStudentScope('my')}
              >
                My Submitted Issues
              </button>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <ComplaintFilterBar
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          counts={tabCounts}
          onResetFilters={handleResetFilters}
        />

        {/* Complaints List Section */}
        <section className="complaints-section" aria-label="Complaints List">
          <div className="section-header">
            <h2 className="section-title">
              <span>{statusFilter === 'All' ? 'Active & Past Issues' : `${statusFilter} Issues`}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                ({filteredComplaints.length} found)
              </span>
            </h2>

            {role === 'admin' && (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Tip: Use status dropdown on cards for rapid update
              </span>
            )}
          </div>

          {filteredComplaints.length > 0 ? (
            <div className="complaints-grid">
              {filteredComplaints.map(complaint => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  role={role}
                  onViewDetails={(item) => setSelectedComplaint(item)}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <Inbox size={32} />
              </div>
              <h3>No complaints found</h3>
              <p>
                {searchQuery || categoryFilter !== 'All' || priorityFilter !== 'All' || statusFilter !== 'All'
                  ? 'No issues match your active search and filter criteria. Try resetting the filters.'
                  : 'Great news! There are currently no recorded complaints in this category.'}
              </p>
              {(searchQuery || categoryFilter !== 'All' || priorityFilter !== 'All' || statusFilter !== 'All') && (
                <button 
                  className="btn btn-outline" 
                  onClick={handleResetFilters}
                  style={{ marginTop: '0.5rem' }}
                >
                  <RotateCcw size={15} />
                  <span>Clear All Filters</span>
                </button>
              )}
            </div>
          )}
        </section>
      </main>

      {/* New Complaint Modal */}
      {showNewModal && (
        <ComplaintFormModal
          onClose={() => setShowNewModal(false)}
          onSubmitComplaint={handleCreateComplaint}
        />
      )}

      {/* Complaint Details & Admin Action Modal */}
      {selectedComplaint && (
        <ComplaintDetailsModal
          complaint={selectedComplaint}
          role={role}
          onClose={() => setSelectedComplaint(null)}
          onUpdateStatusAndNotes={handleUpdateStatusAndNotes}
        />
      )}

      {/* Action Toast Notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
