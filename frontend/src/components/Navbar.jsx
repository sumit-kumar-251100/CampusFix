import React from 'react';
import { 
  Wrench, 
  UserCheck, 
  ShieldAlert, 
  PlusCircle, 
  Moon, 
  Sun,
  GraduationCap,
  Building2,
  RotateCcw
} from 'lucide-react';

export default function Navbar({ 
  role, 
  setRole, 
  theme, 
  toggleTheme, 
  onOpenNewComplaint,
  onResetData 
}) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <div className="brand-wrapper" id="brand-home" title="CampusFix - Campus Grievance System">
          <div className="brand-logo-icon">
            <Wrench size={22} strokeWidth={2.4} />
          </div>
          <div className="brand-text">
            <h1>Campus<span>Fix</span></h1>
            <p className="brand-subtitle">Campus Grievance & Facility Portal</p>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="nav-actions">
          {/* Role Switcher */}
          <div className="role-switcher" role="group" aria-label="Role Switcher">
            <button
              id="role-btn-student"
              className={`role-btn ${role === 'student' ? 'active' : ''}`}
              onClick={() => setRole('student')}
              title="Switch to Student Dashboard view"
            >
              <GraduationCap size={16} />
              <span>Student View</span>
            </button>
            <button
              id="role-btn-admin"
              className={`role-btn ${role === 'admin' ? 'active' : ''}`}
              onClick={() => setRole('admin')}
              title="Switch to Admin Management view"
            >
              <Building2 size={16} />
              <span>Admin Portal</span>
              <span className="role-badge">Staff</span>
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            id="theme-toggle-btn"
            className="btn btn-ghost"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Dark/Light Mode"
          >
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} />}
          </button>

          {/* Reset Demo Data Button */}
          <button
            id="reset-demo-data-btn"
            className="btn btn-ghost"
            onClick={onResetData}
            title="Reset to Initial Sample Data"
          >
            <RotateCcw size={16} />
          </button>

          {/* New Complaint Button */}
          <button
            id="btn-report-issue-nav"
            className="btn btn-primary"
            onClick={onOpenNewComplaint}
          >
            <PlusCircle size={18} />
            <span>Report Issue</span>
          </button>
        </div>
      </div>
    </header>
  );
}
