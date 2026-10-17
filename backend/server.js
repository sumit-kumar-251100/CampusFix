import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  getAllComplaints,
  getComplaintById,
  createComplaint,
  updateComplaintStatus,
  updateComplaintNotes,
  resetDatabase
} from '../database/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for local Vite dev server and common frontend origins
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ],
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'CampusFix Backend API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 1. GET /api/complaints - Retrieve all complaints
app.get('/api/complaints', (req, res) => {
  try {
    const complaints = getAllComplaints();
    res.json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (err) {
    console.error('Error fetching complaints:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve complaints from database'
    });
  }
});

// 2. GET /api/complaints/:id - Retrieve a specific complaint
app.get('/api/complaints/:id', (req, res) => {
  try {
    const { id } = req.params;
    const complaint = getComplaintById(id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        error: `Complaint with ID '${id}' was not found`
      });
    }

    res.json({
      success: true,
      data: complaint
    });
  } catch (err) {
    console.error(`Error fetching complaint ${req.params.id}:`, err);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve complaint'
    });
  }
});

// 3. POST /api/complaints - Create a new complaint
app.post('/api/complaints', (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      priority,
      submittedBy,
      studentId,
      contactEmail,
      isAnonymous,
      attachment
    } = req.body;

    // Validation
    const errors = [];
    if (!title || typeof title !== 'string' || !title.trim()) {
      errors.push('Title is required and must be non-empty.');
    }
    if (!location || typeof location !== 'string' || !location.trim()) {
      errors.push('Location is required (e.g. Hostel Block B, Room 214).');
    }
    if (!description || typeof description !== 'string' || description.trim().length < 5) {
      errors.push('Description is required and must be at least 5 characters long.');
    }
    if (!category || typeof category !== 'string' || !category.trim()) {
      errors.push('Category is required.');
    }

    const validPriorities = ['Critical', 'High', 'Medium', 'Low'];
    if (priority && !validPriorities.includes(priority)) {
      errors.push(`Priority must be one of: ${validPriorities.join(', ')}`);
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }

    const newComplaint = createComplaint({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      location: location.trim(),
      priority: priority || 'Medium',
      submittedBy: isAnonymous ? 'Anonymous Student' : (submittedBy || 'Student'),
      studentId: isAnonymous ? 'Hidden' : (studentId || ''),
      contactEmail: isAnonymous ? 'anonymous@campus.edu' : (contactEmail || ''),
      isAnonymous: Boolean(isAnonymous),
      attachment: attachment || null
    });

    res.status(201).json({
      success: true,
      message: 'Complaint created successfully',
      data: newComplaint
    });
  } catch (err) {
    console.error('Error creating complaint:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to create complaint in database'
    });
  }
});

// 4. PATCH /api/complaints/:id/status - Update complaint status
app.patch('/api/complaints/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const validStatuses = ['Pending', 'In Progress', 'Resolved'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const updated = updateComplaintStatus(id, status, note);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: `Complaint with ID '${id}' was not found`
      });
    }

    res.json({
      success: true,
      message: `Status updated to ${status}`,
      data: updated
    });
  } catch (err) {
    console.error(`Error updating status for ${req.params.id}:`, err);
    res.status(500).json({
      success: false,
      error: 'Failed to update complaint status'
    });
  }
});

// 5. PATCH /api/complaints/:id/notes - Update admin notes
app.patch('/api/complaints/:id/notes', (req, res) => {
  try {
    const { id } = req.params;
    const { adminNotes, status } = req.body;

    if (adminNotes === undefined) {
      return res.status(400).json({
        success: false,
        error: 'adminNotes field is required'
      });
    }

    if (status) {
      const validStatuses = ['Pending', 'In Progress', 'Resolved'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
        });
      }
    }

    const updated = updateComplaintNotes(id, adminNotes, status);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: `Complaint with ID '${id}' was not found`
      });
    }

    res.json({
      success: true,
      message: 'Admin notes updated successfully',
      data: updated
    });
  } catch (err) {
    console.error(`Error updating notes for ${req.params.id}:`, err);
    res.status(500).json({
      success: false,
      error: 'Failed to update admin notes'
    });
  }
});

// 6. POST /api/complaints/reset - Reset to default seed data
app.post('/api/complaints/reset', (req, res) => {
  try {
    const resetList = resetDatabase();
    res.json({
      success: true,
      message: 'Database reset to initial sample complaints successfully',
      count: resetList.length,
      data: resetList
    });
  } catch (err) {
    console.error('Error resetting database:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to reset database'
    });
  }
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `API route not found: ${req.method} ${req.originalUrl}`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[CampusFix Server Error]:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error occurred'
  });
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 CampusFix API Server running on port ${PORT}`);
  console.log(`📡 URL: http://localhost:${PORT}/api/complaints`);
  console.log(`===============================================`);
});

export default app;
