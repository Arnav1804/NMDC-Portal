/* ============================================
   NMDC LIMITED, BACHELI COMPLEX — Shared JavaScript
   Common utilities across all pages
   ============================================ */

// ============================================
// DATA CONSTANTS (Single Source of Truth)
// ============================================
const DATA_CONSTANTS = {
  EMPLOYEES: '8,500+ (sample)',
  EMPLOYEES_NUM: '8,500+',
  DISCLAIMER: 'Prototype by Arnav Yadu, vocational training at NMDC Bacheli Complex, 2026. Not an official NMDC website. All data is sample data.'
};

// --- Date Helpers (relative to current date) ---
function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

function daysAgoISO(n, hours = 10, mins = 0) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(hours, mins, 0, 0);
  return d.toISOString();
}

function daysFromNowDateStr(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return d.toLocaleDateString('en-IN', options);
}

// --- HTML Escaping (XSS Prevention) ---
function escHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
const portalEsc = escHtml;

// --- Language Toggle (i18n) ---
let currentLang = 'en';
function setLang(lang) {
  currentLang = lang;
  const btnEn = document.getElementById('btnEn');
  const btnHi = document.getElementById('btnHi');
  if (btnEn) btnEn.classList.toggle('active', lang === 'en');
  if (btnHi) btnHi.classList.toggle('active', lang === 'hi');
  const dict = (typeof pageTranslations !== 'undefined') ? pageTranslations : ((typeof translations !== 'undefined') ? translations : null);
  if (dict && dict[lang]) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[lang][key]) {
        el.textContent = dict[lang][key];
      }
    });
  }
}

// --- Text Resize ---
let fontStep = 0;
function resizeText(dir) {
  if (dir === 0) { fontStep = 0; }
  else { fontStep = Math.max(-3, Math.min(3, fontStep + dir)); }
  document.documentElement.style.fontSize = (17 + fontStep * 2) + 'px';
}

// --- Mobile Menu ---
function toggleMobileMenu() {
  const nav = document.getElementById('navLinks');
  if (nav) nav.classList.toggle('open');
}

// --- Scroll Shadow ---
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
});

// --- Dropdown Toggle ---
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.nav-dropdown-toggle');
  if (toggle) {
    e.preventDefault();
    const dropdown = toggle.closest('.nav-dropdown');
    if (dropdown) {
      document.querySelectorAll('.nav-dropdown.open').forEach(d => {
        if (d !== dropdown) d.classList.remove('open');
      });
      dropdown.classList.toggle('open');
    }
    return;
  }
  // Close dropdowns on outside click
  if (!e.target.closest('.nav-dropdown')) {
    document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
  }
});

// ============================================
// AUTH & ROLE SYSTEM (localStorage-based mock)
// ============================================
const AUTH_KEY = 'nmdc_auth';
const ROLES = { ADMIN: 'admin', IT_OFFICER: 'it_officer', READ_ONLY: 'read_only' };

const MOCK_USERS = [
  { empId: 'NMDC-BC-ADM-001', password: 'admin123', name: 'Demo User 01 (Admin)', role: ROLES.ADMIN, department: 'CS&IT', designation: 'GM (IT)' },
  { empId: 'NMDC-BC-IT-042', password: 'officer123', name: 'Demo User 02 (Officer)', role: ROLES.IT_OFFICER, department: 'CS&IT', designation: 'Manager (Network)' },
  { empId: 'NMDC-BC-RO-100', password: 'viewer123', name: 'Demo User 03 (Viewer)', role: ROLES.READ_ONLY, department: 'CS&IT', designation: 'Assistant (IT)' }
];

function authenticateUser(empId, password) {
  const user = MOCK_USERS.find(u => u.empId === empId && u.password === password);
  if (user) {
    const session = { ...user, loginTime: new Date().toISOString() };
    delete session.password;
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    logAuditActivity('User Login', `${session.name} signed in successfully`, 'Authentication');
    return { success: true, user: session };
  }
  logAuditActivity('Login Failed', `Failed login attempt for ID: ${empId}`, 'Authentication');
  return { success: false, message: 'Invalid Employee ID or Password' };
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
  } catch { return null; }
}

function logout() {
  const session = getSession();
  if (session) {
    logAuditActivity('User Logout', `${session.name} signed out`, 'Authentication');
  }
  localStorage.removeItem(AUTH_KEY);
  window.location.href = 'portal-login.html';
}

function requireAuth() {
  const session = getSession();
  if (!session) {
    window.location.href = 'portal-login.html';
    return null;
  }
  return session;
}

function getRoleLabel(role) {
  const labels = {
    admin: 'Administrator',
    it_officer: 'IT Officer',
    read_only: 'Read Only User'
  };
  return labels[role] || role;
}

function getRoleShortName(role) {
  const names = {
    admin: 'Admin',
    it_officer: 'IT Officer',
    read_only: 'Viewer'
  };
  return names[role] || 'User';
}

function portalLogout() {
  logout();
}

function initPortalPage(activePage) {
  const session = requireAuth();
  if (!session) return;

  const userNameEl = document.getElementById('userName');
  const userRoleEl = document.getElementById('userRole');
  const roleBadgeEl = document.getElementById('roleBadge');

  if (userNameEl) {
    userNameEl.textContent = session.name || getRoleShortName(session.role);
  }
  if (userRoleEl) {
    userRoleEl.textContent = getRoleLabel(session.role);
  }
  if (roleBadgeEl) {
    roleBadgeEl.textContent = getRoleLabel(session.role);
    roleBadgeEl.className = 'role-badge ' + (session.role === 'admin' ? 'admin' : session.role === 'read_only' ? 'read-only' : '');
  }

  document.querySelectorAll('.portal-nav-link[data-page]').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-page') === activePage);
  });

  document.querySelectorAll('.portal-nav-link.disabled').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const module = link.getAttribute('data-module') || 'Module';
      showToast(`${module} module coming soon.`, 'info');
    });
  });

  renderNotificationBell();
  if (activePage === 'dashboard') {
    initCounters();
  }
}

function hasPermission(action) {
  const session = getSession();
  if (!session) return false;
  const perms = {
    admin: ['create', 'read', 'update', 'delete', 'upload', 'approve', 'manage_users'],
    it_officer: ['create', 'read', 'update', 'upload'],
    read_only: ['read']
  };
  return (perms[session.role] || []).includes(action);
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function getNotifications() {
  return [
    { id: 1, type: 'document', icon: '📄', title: 'New Document Uploaded', message: 'Network Topology Map v4.2 uploaded to repository', time: '5 min ago', read: false },
    { id: 2, type: 'ticket', icon: '🎫', title: 'Ticket Assigned', message: 'TKT-2026-100 assigned to Server Team — Critical priority', time: '18 min ago', read: false },
    { id: 3, type: 'asset', icon: '🖥️', title: 'Asset Updated', message: 'SRV-103 placed under maintenance for patching', time: '1 hr ago', read: false },
    { id: 4, type: 'system', icon: '🔧', title: 'Maintenance Scheduled', message: `Core switch maintenance on ${daysFromNowDateStr(3)}, 02:00–06:00 IST`, time: '2 hrs ago', read: true },
    { id: 5, type: 'document', icon: '📄', title: 'Document Approved', message: 'IT Security Policy v2.3 approved by GM (IT)', time: '4 hrs ago', read: true },
    { id: 6, type: 'system', icon: '⚠️', title: 'Warranty Expiry Alert', message: '3 UPS units warranty expiring within 30 days', time: '1 day ago', read: true }
  ];
}

function renderNotificationBell() {
  const bell = document.getElementById('notifBell');
  if (!bell) return;
  const notifs = getNotifications();
  const unread = notifs.filter(n => !n.read).length;
  bell.innerHTML = `
    <button class="notif-bell-btn" onclick="toggleNotifPanel()" aria-label="Notifications">
      🔔
      ${unread > 0 ? `<span class="notif-badge">${unread}</span>` : ''}
    </button>
    <div class="notif-panel" id="notifPanel">
      <div class="notif-panel-header">
        <span class="font-bold">Notifications</span>
        <button class="text-xs text-amber-500 hover:text-amber-400" onclick="markAllRead()">Mark all read</button>
      </div>
      <div class="notif-panel-body">
        ${notifs.map(n => `
          <div class="notif-item ${n.read ? '' : 'unread'}">
            <span class="notif-icon">${n.icon}</span>
            <div class="flex-1 min-w-0">
              <div class="notif-title">${n.title}</div>
              <div class="notif-message">${n.message}</div>
            </div>
            <span class="notif-time">${n.time}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function toggleNotifPanel() {
  const panel = document.getElementById('notifPanel');
  if (panel) panel.classList.toggle('open');
}

function markAllRead() {
  document.querySelectorAll('.notif-item.unread').forEach(el => el.classList.remove('unread'));
  const badge = document.querySelector('.notif-badge');
  if (badge) badge.remove();
}

// Close notification panel on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('#notifBell')) {
    const panel = document.getElementById('notifPanel');
    if (panel) panel.classList.remove('open');
  }
});

// ============================================
// PORTAL SIDEBAR TOGGLE
// ============================================
function togglePortalSidebar() {
  const sidebar = document.getElementById('portalSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('open');
}

// ============================================
// UTILITY: Count-up Animation
// ============================================
function animateCountUp(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  function update() {
    start += step;
    if (start >= target) {
      el.textContent = prefix + target.toLocaleString('en-IN') + suffix;
      return;
    }
    el.textContent = prefix + Math.floor(start).toLocaleString('en-IN') + suffix;
    requestAnimationFrame(update);
  }
  update();
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        animateCountUp(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach(c => observer.observe(c));
}

document.addEventListener('DOMContentLoaded', () => {
  if (!document.body.classList.contains('portal-body')) {
    initCounters();
  }
  if (document.getElementById('notifBell') && document.body.classList.contains('portal-body')) {
    renderNotificationBell();
  }
});

// ============================================
// UTILITY: Modal open/close
// ============================================
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
}

// Close modal on backdrop click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ============================================
// UTILITY: Toast Notification
// ============================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer') || (() => {
    const div = document.createElement('div');
    div.id = 'toastContainer';
    div.className = 'toast-container';
    document.body.appendChild(div);
    return div;
  })();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const span = document.createElement('span');
  span.textContent = `${icons[type] || ''} ${message}`;
  toast.appendChild(span);
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ============================================
// DEPARTMENT DIRECTORY DATA (Sample Data)
// ============================================
const departmentDirectory = [
  { name: 'Network Team', head: 'Demo User 04', designation: 'Manager (Network)', phone: 'Ext. 5101', email: 'network.bacheli@example.com', members: 8 },
  { name: 'Server Team', head: 'Demo User 05', designation: 'Manager (Server Admin)', phone: 'Ext. 5102', email: 'servers.bacheli@example.com', members: 6 },
  { name: 'ERP Team', head: 'Demo User 06', designation: 'Manager (ERP)', phone: 'Ext. 5103', email: 'erp.bacheli@example.com', members: 10 },
  { name: 'Helpdesk Team', head: 'Demo User 07', designation: 'Sr. Executive (Helpdesk)', phone: 'Ext. 5104', email: 'helpdesk.bacheli@example.com', members: 12 },
  { name: 'Cyber Security Team', head: 'Demo User 08', designation: 'Manager (Cyber Security)', phone: 'Ext. 5105', email: 'cybersec.bacheli@example.com', members: 5 }
];

// ============================================
// AUDIT LOG (prepared for future Audit module)
// ============================================
const AUDIT_KEY = 'nmdc_audit_log';

function logAuditActivity(action, details, module = 'Documents') {
  const session = getSession();
  const entry = {
    id: Date.now(),
    action,
    details,
    user: session ? session.name : 'System',
    empId: session ? session.empId : '—',
    role: session ? session.role : '—',
    module,
    timestamp: new Date().toISOString()
  };
  try {
    const log = JSON.parse(localStorage.getItem(AUDIT_KEY) || '[]');
    log.unshift(entry);
    localStorage.setItem(AUDIT_KEY, JSON.stringify(log.slice(0, 500)));
  } catch { /* ignore storage errors */ }
  return entry;
}

function getAuditLog() {
  try {
    const stored = JSON.parse(localStorage.getItem(AUDIT_KEY) || '[]');
    return stored.filter(e => !e.timestamp || !e.timestamp.startsWith('2026-06'));
  } catch {
    return [];
  }
}

// ============================================
// TICKET MANAGEMENT
// ============================================
const TICKETS_KEY = 'nmdc_tickets';

const DEFAULT_TICKETS = [
  { id: 'TKT-2026-101', title: 'ERP finance module access request', priority: 'Medium', assignedTo: 'ERP Team', status: 'Assigned', createdDate: daysAgo(0), description: 'Provide SAP finance module access for the new accounts officer.' },
  { id: 'TKT-2026-100', title: 'Server rack temperature alert', priority: 'Critical', assignedTo: 'Server Team', status: 'In Progress', createdDate: daysAgo(0), description: 'Investigate elevated temperature at Bacheli data center rack 4.' },
  { id: 'TKT-2026-099', title: 'Bacheli office printer offline', priority: 'High', assignedTo: 'Helpdesk Team', status: 'Open', createdDate: daysAgo(1), description: 'Shared multifunction printer is unavailable to all floor users.' },
  { id: 'TKT-2026-098', title: 'VPN connection failing for field team', priority: 'High', assignedTo: 'Network Team', status: 'In Progress', createdDate: daysAgo(1), description: 'Field users receive an authentication timeout when connecting to VPN.' },
  { id: 'TKT-2026-097', title: 'New laptop setup for HR manager', priority: 'Medium', assignedTo: 'Helpdesk Team', status: 'Assigned', createdDate: daysAgo(2), description: 'Configure standard applications, encryption, email, and VPN.' },
  { id: 'TKT-2026-096', title: 'SAP purchase order report error', priority: 'High', assignedTo: 'ERP Team', status: 'Resolved', createdDate: daysAgo(2), description: 'Purchase order report was returning incomplete vendor details.' },
  { id: 'TKT-2026-095', title: 'Reset email password for mine office', priority: 'Low', assignedTo: 'Helpdesk Team', status: 'Closed', createdDate: daysAgo(3), description: 'Password reset completed after identity verification.' },
  { id: 'TKT-2026-094', title: 'Core switch packet loss investigation', priority: 'Critical', assignedTo: 'Network Team', status: 'Resolved', createdDate: daysAgo(3), description: 'Intermittent packet loss observed on the Bacheli core network.' },
  { id: 'TKT-2026-093', title: 'CCTV camera feed unavailable', priority: 'High', assignedTo: 'Cyber Security Team', status: 'Assigned', createdDate: daysAgo(4), description: 'Camera 18 at the Bacheli mine perimeter has no live feed.' },
  { id: 'TKT-2026-092', title: 'Install approved GIS software', priority: 'Medium', assignedTo: 'Helpdesk Team', status: 'Open', createdDate: daysAgo(4), description: 'Install the approved GIS application on three survey workstations.' },
  { id: 'TKT-2026-091', title: 'Shared drive permission update', priority: 'Low', assignedTo: 'Server Team', status: 'Closed', createdDate: daysAgo(5), description: 'Updated department shared drive access for the procurement team.' },
  { id: 'TKT-2026-090', title: 'Backup job failed on file server', priority: 'Critical', assignedTo: 'Server Team', status: 'In Progress', createdDate: daysAgo(5), description: 'Nightly backup job failed for the regional file server.' },
  { id: 'TKT-2026-089', title: 'Wi-Fi coverage issue in conference room', priority: 'Medium', assignedTo: 'Network Team', status: 'Resolved', createdDate: daysAgo(6), description: 'Signal strength improved after access point channel adjustment.' },
  { id: 'TKT-2026-088', title: 'Antivirus definition update pending', priority: 'High', assignedTo: 'Cyber Security Team', status: 'Assigned', createdDate: daysAgo(7), description: 'Several isolated workstations have pending antivirus definitions.' },
  { id: 'TKT-2026-087', title: 'Replace damaged keyboard', priority: 'Low', assignedTo: 'Helpdesk Team', status: 'Closed', createdDate: daysAgo(8), description: 'Replacement keyboard issued and tested.' }
];

function portalEsc(value) {
  return escHtml(value);
}

function portalFormatDate(dateValue, includeTime = false) {
  const date = new Date(dateValue);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  if (includeTime) Object.assign(options, { hour: '2-digit', minute: '2-digit' });
  return date.toLocaleString('en-IN', options);
}

function getTickets() {
  try {
    const stored = localStorage.getItem(TICKETS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length && parsed[0].createdDate && parsed[0].createdDate.startsWith('2026-06')) {
        localStorage.setItem(TICKETS_KEY, JSON.stringify(DEFAULT_TICKETS));
        return [...DEFAULT_TICKETS];
      }
      return parsed;
    }
  } catch { /* use defaults */ }
  localStorage.setItem(TICKETS_KEY, JSON.stringify(DEFAULT_TICKETS));
  return [...DEFAULT_TICKETS];
}

function saveTickets(tickets) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

function ticketBadgeClass(value) {
  return {
    Open: 'pending',
    Assigned: 'approved',
    'In Progress': 'active',
    Resolved: 'active',
    Closed: 'archived',
    Low: 'archived',
    Medium: 'approved',
    High: 'pending',
    Critical: 'draft'
  }[value] || 'draft';
}

const TicketManager = {
  tickets: [],
  search: '',
  filter: 'all',
  editingId: null,

  init() {
    this.tickets = getTickets();
    if (!hasPermission('create')) document.getElementById('createTicketBtn').style.display = 'none';
    this.bindEvents();
    this.render();
  },

  bindEvents() {
    document.getElementById('ticketSearch').addEventListener('input', (event) => {
      this.search = event.target.value.toLowerCase();
      this.render();
    });
    document.querySelectorAll('#ticketFilters .filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#ticketFilters .filter-chip').forEach((item) => item.classList.remove('active'));
        chip.classList.add('active');
        this.filter = chip.dataset.filter;
        this.render();
      });
    });
    document.getElementById('createTicketBtn').addEventListener('click', () => this.openCreate());
    document.getElementById('ticketForm').addEventListener('submit', (event) => {
      event.preventDefault();
      this.save();
    });
    document.getElementById('ticketFormCancel').addEventListener('click', () => closeModal('ticketModal'));
    document.getElementById('ticketModalClose').addEventListener('click', () => closeModal('ticketModal'));
  },

  openCreate() {
    if (!hasPermission('create')) return showToast('You do not have permission to create tickets.', 'error');
    this.editingId = null;
    document.getElementById('ticketModalTitle').textContent = 'Create Ticket';
    document.getElementById('ticketFormSubmit').textContent = 'Create Ticket';
    document.getElementById('ticketTitle').value = '';
    document.getElementById('ticketPriority').value = 'Medium';
    document.getElementById('ticketStatus').value = 'Open';
    document.getElementById('ticketAssignedTo').value = '';
    document.getElementById('ticketDescription').value = '';
    openModal('ticketModal');
  },

  openEdit(id) {
    if (!hasPermission('update')) return showToast('You do not have permission to edit tickets.', 'error');
    const ticket = this.tickets.find((item) => item.id === id);
    if (!ticket) return;
    this.editingId = id;
    document.getElementById('ticketModalTitle').textContent = 'Edit Ticket';
    document.getElementById('ticketFormSubmit').textContent = 'Save Changes';
    document.getElementById('ticketTitle').value = ticket.title;
    document.getElementById('ticketPriority').value = ticket.priority;
    document.getElementById('ticketStatus').value = ticket.status;
    document.getElementById('ticketAssignedTo').value = ticket.assignedTo;
    document.getElementById('ticketDescription').value = ticket.description || '';
    openModal('ticketModal');
  },

  save() {
    const title = document.getElementById('ticketTitle').value.trim();
    const assignedTo = document.getElementById('ticketAssignedTo').value.trim();
    if (!title || !assignedTo) return showToast('Please fill in all required fields.', 'error');

    const values = {
      title,
      priority: document.getElementById('ticketPriority').value,
      status: document.getElementById('ticketStatus').value,
      assignedTo,
      description: document.getElementById('ticketDescription').value.trim()
    };

    if (this.editingId) {
      const ticket = this.tickets.find((item) => item.id === this.editingId);
      Object.assign(ticket, values);
      logAuditActivity('Ticket Updated', `${ticket.id} - ${ticket.title}`, 'Tickets');
      showToast(`Ticket ${ticket.id} updated successfully.`, 'success');
    } else {
      const numbers = this.tickets.map((item) => Number(item.id.split('-').pop())).filter(Number.isFinite);
      const next = numbers.length ? Math.max(...numbers) + 1 : 1;
      const ticket = { id: `TKT-${new Date().getFullYear()}-${String(next).padStart(3, '0')}`, ...values, createdDate: new Date().toISOString().split('T')[0] };
      this.tickets.unshift(ticket);
      logAuditActivity('Ticket Created', `${ticket.id} - ${ticket.title}`, 'Tickets');
      showToast(`Ticket ${ticket.id} created successfully.`, 'success');
    }
    saveTickets(this.tickets);
    closeModal('ticketModal');
    this.render();
  },

  render() {
    const filtered = this.tickets.filter((ticket) => {
      const matchesFilter = this.filter === 'all' || ticket.status === this.filter || ticket.priority === this.filter;
      const haystack = `${ticket.id} ${ticket.title} ${ticket.priority} ${ticket.assignedTo} ${ticket.status}`.toLowerCase();
      return matchesFilter && haystack.includes(this.search);
    });
    const canEdit = hasPermission('update');
    document.getElementById('ticketTableBody').innerHTML = filtered.length ? filtered.map((ticket) => `
      <tr>
        <td class="doc-id">${portalEsc(ticket.id)}</td>
        <td>${portalEsc(ticket.title)}</td>
        <td><span class="doc-status-badge ${ticketBadgeClass(ticket.priority)}">${portalEsc(ticket.priority)}</span></td>
        <td>${portalEsc(ticket.assignedTo)}</td>
        <td><span class="doc-status-badge ${ticketBadgeClass(ticket.status)}">${portalEsc(ticket.status)}</span></td>
        <td>${portalFormatDate(ticket.createdDate)}</td>
        <td><div class="doc-actions">${canEdit ? `<button class="btn-action primary" onclick="TicketManager.openEdit('${portalEsc(ticket.id)}')">Edit</button>` : ''}</div></td>
      </tr>
    `).join('') : '<tr><td colspan="7"><div class="docs-no-results">No tickets match your search or filter criteria.</div></td></tr>';
  }
};

// ============================================
// AUDIT LOGS
// ============================================
const DEFAULT_AUDIT_LOGS = [
  [daysAgoISO(0, 9, 42), 'Demo User 02 (Officer)', 'Ticket Created', 'Tickets', 'Created TKT-2026-101 for ERP finance module access'],
  [daysAgoISO(0, 9, 31), 'Demo User 01 (Admin)', 'User Login', 'Authentication', 'Administrator signed in successfully'],
  [daysAgoISO(0, 9, 18), 'Demo User 05', 'Ticket Updated', 'Tickets', 'Moved TKT-2026-100 to In Progress'],
  [daysAgoISO(0, 8, 56), 'Demo User 04', 'Asset Update', 'Assets', 'Updated firmware record for NET-001'],
  [daysAgoISO(0, 8, 44), 'Demo User 07', 'Ticket Assigned', 'Tickets', 'Assigned TKT-2026-099 to Helpdesk Team'],
  [daysAgoISO(1, 17, 22), 'Demo User 02 (Officer)', 'Document Upload', 'Documents', 'Uploaded Network Maintenance Checklist v1.0'],
  [daysAgoISO(1, 16, 48), 'Demo User 08', 'Asset Update', 'Assets', 'Updated CCTV-301 retention configuration'],
  [daysAgoISO(1, 15, 37), 'Demo User 06', 'Ticket Resolved', 'Tickets', 'Resolved TKT-2026-096 SAP report error'],
  [daysAgoISO(1, 14, 19), 'Demo User 01 (Admin)', 'Document Approved', 'Documents', 'Approved Backup and Recovery SOP v2.0'],
  [daysAgoISO(1, 13, 2), 'Demo User 05', 'Asset Update', 'Assets', 'Placed SRV-103 under maintenance'],
  [daysAgoISO(1, 11, 46), 'Demo User 03 (Viewer)', 'User Login', 'Authentication', 'Read-only user signed in successfully'],
  [daysAgoISO(1, 10, 15), 'Demo User 04', 'Ticket Created', 'Tickets', 'Created TKT-2026-098 for VPN connection failure'],
  [daysAgoISO(2, 17, 40), 'Demo User 07', 'Ticket Updated', 'Tickets', 'Added setup checklist to TKT-2026-097'],
  [daysAgoISO(2, 16, 11), 'Demo User 02 (Officer)', 'Document Update', 'Documents', 'Updated Fiber Ring SOP to version 2.1'],
  [daysAgoISO(2, 15, 24), 'Demo User 05', 'Asset Update', 'Assets', 'Updated warranty details for STG-401'],
  [daysAgoISO(2, 14, 7), 'Demo User 01 (Admin)', 'User Login', 'Authentication', 'Administrator signed in successfully'],
  [daysAgoISO(2, 12, 38), 'Demo User 08', 'Ticket Assigned', 'Tickets', 'Assigned TKT-2026-093 to Cyber Security Team'],
  [daysAgoISO(2, 11, 16), 'Demo User 06', 'Document Download', 'Documents', 'Downloaded ERP User Guide v3.0'],
  [daysAgoISO(3, 17, 52), 'Demo User 07', 'Ticket Resolved', 'Tickets', 'Resolved TKT-2026-095 password reset request'],
  [daysAgoISO(3, 16, 30), 'Demo User 04', 'Ticket Resolved', 'Tickets', 'Resolved TKT-2026-094 core switch packet loss'],
  [daysAgoISO(3, 14, 43), 'Demo User 02 (Officer)', 'Asset Update', 'Assets', 'Reassigned LPT-043 to Network Team'],
  [daysAgoISO(3, 12, 18), 'Demo User 01 (Admin)', 'Document Archived', 'Documents', 'Archived Quarterly Audit Notice'],
  [daysAgoISO(4, 16, 5), 'Demo User 03 (Viewer)', 'User Login', 'Authentication', 'Read-only user signed in successfully'],
  [daysAgoISO(4, 13, 41), 'Demo User 05', 'Asset Update', 'Assets', 'Updated backup storage capacity record'],
  [daysAgoISO(4, 10, 27), 'Demo User 07', 'Ticket Created', 'Tickets', 'Created TKT-2026-092 for GIS software installation']
].map((entry, index) => ({ id: `mock-${index}`, timestamp: entry[0], user: entry[1], action: entry[2], module: entry[3], details: entry[4] }));

const AuditLogManager = {
  search: '',
  filter: 'all',

  init() {
    document.getElementById('auditSearch').addEventListener('input', (event) => {
      this.search = event.target.value.toLowerCase();
      this.render();
    });
    document.querySelectorAll('#auditFilters .filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#auditFilters .filter-chip').forEach((item) => item.classList.remove('active'));
        chip.classList.add('active');
        this.filter = chip.dataset.filter;
        this.render();
      });
    });
    this.render();
  },

  render() {
    const entries = [...getAuditLog(), ...DEFAULT_AUDIT_LOGS]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .filter((entry) => {
        const matchesFilter = this.filter === 'all' || entry.module === this.filter;
        const haystack = `${entry.user} ${entry.action} ${entry.module} ${entry.details}`.toLowerCase();
        return matchesFilter && haystack.includes(this.search);
      });
    document.getElementById('auditTableBody').innerHTML = entries.length ? entries.map((entry) => `
      <tr>
        <td class="doc-id">${portalFormatDate(entry.timestamp, true)}</td>
        <td>${portalEsc(entry.user)}</td>
        <td>${portalEsc(entry.action)}</td>
        <td><span class="doc-status-badge approved">${portalEsc(entry.module)}</span></td>
        <td>${portalEsc(entry.details)}</td>
      </tr>
    `).join('') : '<tr><td colspan="5"><div class="docs-no-results">No audit entries match your search or filter criteria.</div></td></tr>';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('ticketTableBody')) {
    initPortalPage('tickets');
    TicketManager.init();
  }
  if (document.getElementById('auditTableBody')) {
    initPortalPage('audit');
    AuditLogManager.init();
  }
});
