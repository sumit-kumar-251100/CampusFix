import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../data/mockData';

export default function ComplaintFilterBar({
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  priorityFilter,
  setPriorityFilter,
  searchQuery,
  setSearchQuery,
  counts,
  onResetFilters
}) {
  const hasActiveFilters = 
    statusFilter !== 'All' || 
    categoryFilter !== 'All' || 
    priorityFilter !== 'All' || 
    searchQuery.trim() !== '';

  return (
    <div className="filter-toolbar">
      {/* Status Filter Tabs */}
      <div className="filter-row-top">
        <div className="status-tabs" role="tablist">
          <button
            id="tab-status-all"
            role="tab"
            aria-selected={statusFilter === 'All'}
            className={`status-tab ${statusFilter === 'All' ? 'active' : ''}`}
            onClick={() => setStatusFilter('All')}
          >
            <span>All Issues</span>
            <span className="tab-count">{counts.all}</span>
          </button>

          <button
            id="tab-status-pending"
            role="tab"
            aria-selected={statusFilter === 'Pending'}
            className={`status-tab ${statusFilter === 'Pending' ? 'active' : ''}`}
            onClick={() => setStatusFilter('Pending')}
          >
            <span>Pending</span>
            <span className="tab-count">{counts.pending}</span>
          </button>

          <button
            id="tab-status-in-progress"
            role="tab"
            aria-selected={statusFilter === 'In Progress'}
            className={`status-tab ${statusFilter === 'In Progress' ? 'active' : ''}`}
            onClick={() => setStatusFilter('In Progress')}
          >
            <span>In Progress</span>
            <span className="tab-count">{counts.inProgress}</span>
          </button>

          <button
            id="tab-status-resolved"
            role="tab"
            aria-selected={statusFilter === 'Resolved'}
            className={`status-tab ${statusFilter === 'Resolved' ? 'active' : ''}`}
            onClick={() => setStatusFilter('Resolved')}
          >
            <span>Resolved</span>
            <span className="tab-count">{counts.resolved}</span>
          </button>
        </div>

        {hasActiveFilters && (
          <button
            id="btn-clear-filters"
            className="btn btn-ghost"
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
            onClick={onResetFilters}
          >
            <X size={14} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Search and Secondary Dropdowns */}
      <div className="filter-row-bottom">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            id="search-complaints-input"
            type="text"
            className="search-input"
            placeholder="Search by title, location, issue ID, or student..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-light)'
              }}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <select
          id="select-category-filter"
          className="select-filter"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter by Category"
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

        {/* Priority Filter */}
        <select
          id="select-priority-filter"
          className="select-filter"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          aria-label="Filter by Priority"
        >
          {PRIORITIES.map(prio => (
            <option key={prio} value={prio}>
              {prio === 'All' ? 'All Priorities' : `${prio} Priority`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
