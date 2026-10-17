export const INITIAL_COMPLAINTS = [
  {
    id: "CF-2401",
    title: "Ceiling fan sparking and vibrating vigorously",
    category: "Electrical",
    location: "Hostel Block B - Room 214",
    priority: "Critical",
    status: "In Progress",
    submittedBy: "Rahul Verma",
    studentId: "2024CS1042",
    contactEmail: "rahul.v@campus.edu",
    submittedAt: "2026-10-17T09:30:00",
    description: "The main ceiling fan started sparking near the regulator socket and vibrates loudly when turned above speed 2. It poses an electrical fire hazard and needs urgent inspection.",
    assignedTo: "Electrical Maintenance Team",
    estimatedResolution: "Within 24 hours",
    adminNotes: "Technician Rajesh assigned. Power to socket isolated. Replacement motor ordered.",
    timeline: [
      { status: "Submitted", timestamp: "Oct 17, 2026 - 09:30 AM", note: "Complaint logged by Rahul Verma" },
      { status: "Under Review", timestamp: "Oct 17, 2026 - 10:15 AM", note: "Triaged as Critical priority" },
      { status: "In Progress", timestamp: "Oct 17, 2026 - 11:00 AM", note: "Assigned to Electrical Maintenance Team" }
    ]
  },
  {
    id: "CF-2402",
    title: "Wi-Fi access point dead in Central Library 2nd Floor",
    category: "IT & Internet",
    location: "Central Library - Reading Hall 2B",
    priority: "High",
    status: "Pending",
    submittedBy: "Ananya Sharma",
    studentId: "2023EC2015",
    contactEmail: "ananya.s@campus.edu",
    submittedAt: "2026-10-17T11:15:00",
    description: "The primary CampusNet-5G AP router in the silent study section has a red blinking LED. Over 40 students preparing for midterms cannot access the intranet research portals.",
    assignedTo: "Campus IT Network Services",
    estimatedResolution: "Pending Triage",
    adminNotes: "",
    timeline: [
      { status: "Submitted", timestamp: "Oct 17, 2026 - 11:15 AM", note: "Complaint logged by Ananya Sharma" }
    ]
  },
  {
    id: "CF-2403",
    title: "Severe pipe leakage in 1st floor washroom",
    category: "Plumbing",
    location: "Academic Block 3 - 1st Floor East Wing",
    priority: "High",
    status: "In Progress",
    submittedBy: "David Miller",
    studentId: "2024ME1120",
    contactEmail: "david.m@campus.edu",
    submittedAt: "2026-10-16T14:20:00",
    description: "Under-sink drainage pipe burst, causing clean water to pool into the corridor right in front of Chemistry Lab 104. Slippery hazard for passing students.",
    assignedTo: "Sanitary & Plumbing Cell",
    estimatedResolution: "Today by 5:00 PM",
    adminNotes: "Main valve temporarily shut off. Replacement gasket and PVC pipe section being fitted.",
    timeline: [
      { status: "Submitted", timestamp: "Oct 16, 2026 - 02:20 PM", note: "Complaint logged by David Miller" },
      { status: "Under Review", timestamp: "Oct 16, 2026 - 02:45 PM", note: "Inspected by campus supervisor" },
      { status: "In Progress", timestamp: "Oct 16, 2026 - 03:30 PM", note: "Plumbing team dispatched to site" }
    ]
  },
  {
    id: "CF-2404",
    title: "Broken window latch allowing rain inside room",
    category: "Hostel & Infrastructure",
    location: "Hostel Block A - Room 408",
    priority: "Medium",
    status: "Pending",
    submittedBy: "Priya Nair",
    studentId: "2025BT1088",
    contactEmail: "priya.n@campus.edu",
    submittedAt: "2026-10-16T18:00:00",
    description: "The metal latch on the north-facing window frame broke off. During windy rain, water splashes directly onto study desk and book shelves.",
    assignedTo: "Carpentry & Estate Dept",
    estimatedResolution: "Within 2-3 business days",
    adminNotes: "",
    timeline: [
      { status: "Submitted", timestamp: "Oct 16, 2026 - 06:00 PM", note: "Complaint logged by Priya Nair" }
    ]
  },
  {
    id: "CF-2405",
    title: "Smart projector HDMI port broken and flickering",
    category: "Academic Facilities",
    location: "Aryabhatta Lecture Complex - Hall 201",
    priority: "Medium",
    status: "Resolved",
    submittedBy: "Prof. S. Sengupta (Rep by Council)",
    studentId: "2023CS3004",
    contactEmail: "student.rep@campus.edu",
    submittedAt: "2026-10-15T08:45:00",
    description: "The podium HDMI connector has bent pins causing green color tint and periodic disconnection during engineering lectures.",
    assignedTo: "Audiovisual & Lab Support",
    estimatedResolution: "Resolved",
    adminNotes: "Wall plate HDMI extender and cable replaced. Color calibration tested with lecturer laptop.",
    timeline: [
      { status: "Submitted", timestamp: "Oct 15, 2026 - 08:45 AM", note: "Complaint logged" },
      { status: "Under Review", timestamp: "Oct 15, 2026 - 09:15 AM", note: "Verified by AV staff" },
      { status: "In Progress", timestamp: "Oct 15, 2026 - 10:00 AM", note: "Hardware replacement under way" },
      { status: "Resolved", timestamp: "Oct 15, 2026 - 11:30 AM", note: "Replaced HDMI socket & tested successfully" }
    ]
  },
  {
    id: "CF-2406",
    title: "Drinking water cooler dispensing warm water",
    category: "Plumbing",
    location: "Sports Complex & Gymnasium - Ground Floor",
    priority: "Low",
    status: "Resolved",
    submittedBy: "Karan Patel",
    studentId: "2024CV1092",
    contactEmail: "karan.p@campus.edu",
    submittedAt: "2026-10-14T16:30:00",
    description: "The UV water cooler compressor wasn't kicking in after evening sports sessions, leaving only warm water available.",
    assignedTo: "HVAC & Coolers Maintenance",
    estimatedResolution: "Resolved",
    adminNotes: "Thermostat sensor replaced and condenser coils cleaned. Water temperature now reading 12°C.",
    timeline: [
      { status: "Submitted", timestamp: "Oct 14, 2026 - 04:30 PM", note: "Complaint logged" },
      { status: "In Progress", timestamp: "Oct 15, 2026 - 09:00 AM", note: "Technician inspected compressor" },
      { status: "Resolved", timestamp: "Oct 15, 2026 - 02:15 PM", note: "Compressor relay fixed and water chilled" }
    ]
  },
  {
    id: "CF-2407",
    title: "Flickering emergency exit lights in stairwell",
    category: "Electrical",
    location: "Hostel Block C - Staircase 2",
    priority: "Medium",
    status: "Pending",
    submittedBy: "Alex Chen",
    studentId: "2024CS1042",
    contactEmail: "alex.c@campus.edu",
    submittedAt: "2026-10-17T12:00:00",
    description: "The LED fixture between 3rd and 4th floors turns on and off every few seconds. At night the stairway is pitch dark intermittently.",
    assignedTo: "Electrical Maintenance Team",
    estimatedResolution: "Within 48 hours",
    adminNotes: "",
    timeline: [
      { status: "Submitted", timestamp: "Oct 17, 2026 - 12:00 PM", note: "Complaint logged by Alex Chen" }
    ]
  },
  {
    id: "CF-2408",
    title: "Food waste bins overflowing behind Dining Hall 1",
    category: "Cleanliness & Sanitation",
    location: "Central Dining Hall 1 - Service Alley",
    priority: "High",
    status: "In Progress",
    submittedBy: "Meera Joshi",
    studentId: "2023EE1012",
    contactEmail: "meera.j@campus.edu",
    submittedAt: "2026-10-16T19:40:00",
    description: "Bins have not been emptied since yesterday evening. Attracting stray dogs and campus monkeys, causing hygiene issues near the kitchen.",
    assignedTo: "Campus Sanitation Division",
    estimatedResolution: "Immediate disposal",
    adminNotes: "Special waste truck deployed. Bins cleared and sanitizing spray applied to alleyway.",
    timeline: [
      { status: "Submitted", timestamp: "Oct 16, 2026 - 07:40 PM", note: "Complaint logged" },
      { status: "In Progress", timestamp: "Oct 17, 2026 - 08:00 AM", note: "Waste disposal crew scheduled" }
    ]
  }
];

export const CATEGORIES = [
  "All",
  "Electrical",
  "Plumbing",
  "Hostel & Infrastructure",
  "IT & Internet",
  "Academic Facilities",
  "Cleanliness & Sanitation",
  "Mess & Canteen"
];

export const PRIORITIES = [
  "All",
  "Critical",
  "High",
  "Medium",
  "Low"
];

export const STATUS_LIST = [
  "All",
  "Pending",
  "In Progress",
  "Resolved"
];

export const CURRENT_STUDENT = {
  name: "Alex Chen",
  studentId: "2024CS1042",
  email: "alex.c@campus.edu",
  department: "Computer Science & Engineering",
  hostel: "Hostel Block C - Room 312"
};
