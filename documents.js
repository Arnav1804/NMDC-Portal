/* ============================================
   BML CS&IT PORTAL — Document Management
   ============================================ */

const DOCUMENTS_KEY = 'bml_documents';
const DOCUMENTS_SEED_KEY = 'bml_documents_seeded';

const DOC_CATEGORIES = [
  'Notice',
  'Circular',
  'Policy',
  'SOP',
  'Meeting Minutes',
  'IT Documentation'
];

const DOC_STATUSES = ['Active', 'Draft', 'Pending Review', 'Archived', 'Approved'];

const STATUS_CLASS = {
  'Active': 'active',
  'Draft': 'draft',
  'Pending Review': 'pending',
  'Archived': 'archived',
  'Approved': 'approved'
};

const ALLOWED_EXTENSIONS = ['pdf', 'docx', 'xlsx', 'csv'];

function getDefaultDocuments() {
  return [
    { id: 'DOC-2026-001', title: 'Network Maintenance Notice', category: 'Notice', status: 'Active', uploadedBy: 'Shri B.N. Prasad', uploadDate: '2026-05-28', version: '1.2', description: 'Scheduled network maintenance across Bacheli and Kirandul mine sites for core switch upgrades.', fileName: 'network-maintenance-notice.pdf' },
    { id: 'DOC-2026-002', title: 'ERP User Guide', category: 'IT Documentation', status: 'Active', uploadedBy: 'Shri D.K. Mohanty', uploadDate: '2026-05-25', version: '3.0', description: 'Comprehensive SAP S/4HANA user guide for Finance, MM, and HR modules.', fileName: 'erp-user-guide.pdf' },
    { id: 'DOC-2026-003', title: 'Fiber Ring SOP', category: 'SOP', status: 'Approved', uploadedBy: 'Smt. Priya Sharma', uploadDate: '2026-05-22', version: '2.1', description: 'Standard operating procedure for fiber ring network monitoring and fault escalation.', fileName: 'fiber-ring-sop.pdf' },
    { id: 'DOC-2026-004', title: 'Cyber Security Policy', category: 'Policy', status: 'Active', uploadedBy: 'Shri V.S. Rajan', uploadDate: '2026-05-20', version: '2.3', description: 'Enterprise cyber security policy aligned with CERT-In advisories and ISO 27001 controls.', fileName: 'cyber-security-policy.pdf' },
    { id: 'DOC-2026-005', title: 'Monthly IT Review Minutes', category: 'Meeting Minutes', status: 'Approved', uploadedBy: 'Shri R.K. Verma', uploadDate: '2026-05-18', version: '1.0', description: 'Minutes of the May 2026 CS&IT department monthly review meeting, Bacheli Regional Office.', fileName: 'it-review-minutes-may2026.pdf' },
    { id: 'DOC-2026-006', title: 'Server Maintenance Circular', category: 'Circular', status: 'Active', uploadedBy: 'Smt. Kavita Rao', uploadDate: '2026-05-15', version: '1.0', description: 'Circular regarding scheduled server patching window for Bacheli Data Center.', fileName: 'server-maintenance-circular.pdf' },
    { id: 'DOC-2026-007', title: 'Helpdesk Escalation SOP', category: 'SOP', status: 'Pending Review', uploadedBy: 'Shri P. Lakshman', uploadDate: '2026-05-12', version: '1.1', description: 'Revised helpdesk ticket escalation matrix and SLA response timelines.', fileName: 'helpdesk-escalation-sop.docx' },
    { id: 'DOC-2026-008', title: 'Data Center Access Policy', category: 'Policy', status: 'Draft', uploadedBy: 'Shri R.K. Verma', uploadDate: '2026-05-10', version: '0.9', description: 'Draft policy for physical and logical access control to Bacheli and Bhubaneswar data centers.', fileName: 'dc-access-policy-draft.pdf' },
    { id: 'DOC-2026-009', title: 'VPN Configuration Guide', category: 'IT Documentation', status: 'Active', uploadedBy: 'Shri B.N. Prasad', uploadDate: '2026-05-08', version: '1.4', description: 'Step-by-step VPN client configuration for remote mine site connectivity.', fileName: 'vpn-config-guide.pdf' },
    { id: 'DOC-2026-010', title: 'Quarterly Audit Notice', category: 'Notice', status: 'Archived', uploadedBy: 'Shri R.K. Verma', uploadDate: '2026-03-31', version: '1.0', description: 'Q1 2026 internal IT audit schedule and compliance checklist for all regional offices.', fileName: 'q1-audit-notice.pdf' },
    { id: 'DOC-2026-011', title: 'Backup & Recovery SOP', category: 'SOP', status: 'Active', uploadedBy: 'Smt. Kavita Rao', uploadDate: '2026-05-05', version: '2.0', description: 'Disaster recovery and backup verification procedures for dual data center architecture.', fileName: 'backup-recovery-sop.pdf' },
    { id: 'DOC-2025-089', title: 'Legacy Network Diagram', category: 'IT Documentation', status: 'Archived', uploadedBy: 'Shri B.N. Prasad', uploadDate: '2025-12-15', version: '4.2', description: 'Superseded network topology diagram — replaced by v5.0 in active repository.', fileName: 'legacy-network-diagram.pdf' }
  ];
}

function initDocumentsStore() {
  if (localStorage.getItem(DOCUMENTS_SEED_KEY)) {
    try {
      return JSON.parse(localStorage.getItem(DOCUMENTS_KEY) || '[]');
    } catch {
      return getDefaultDocuments();
    }
  }
  const docs = getDefaultDocuments();
  localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(docs));
  localStorage.setItem(DOCUMENTS_SEED_KEY, 'true');
  return docs;
}

function getDocuments() {
  try {
    const stored = localStorage.getItem(DOCUMENTS_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* fall through */ }
  return initDocumentsStore();
}

function saveDocuments(docs) {
  localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(docs));
}

function generateDocId() {
  const year = new Date().getFullYear();
  const docs = getDocuments();
  const nums = docs
    .map(d => d.id.match(/DOC-\d{4}-(\d+)/))
    .filter(Boolean)
    .map(m => parseInt(m[1], 10));
  const next = nums.length ? Math.max(...nums) + 1 : 1;
  return `DOC-${year}-${String(next).padStart(3, '0')}`;
}

function getDocStats(docs) {
  return {
    total: docs.length,
    active: docs.filter(d => d.status === 'Active' || d.status === 'Approved').length,
    pending: docs.filter(d => d.status === 'Pending Review').length,
    archived: docs.filter(d => d.status === 'Archived').length
  };
}

function statusBadgeClass(status) {
  return STATUS_CLASS[status] || 'draft';
}

function filterDocuments(docs, search, filter) {
  let result = [...docs];

  if (filter === 'archived') {
    result = result.filter(d => d.status === 'Archived');
  } else if (filter === 'pending') {
    result = result.filter(d => d.status === 'Pending Review');
  } else if (filter === 'notice') {
    result = result.filter(d => d.category === 'Notice');
  } else if (filter === 'circular') {
    result = result.filter(d => d.category === 'Circular');
  } else if (filter === 'policy') {
    result = result.filter(d => d.category === 'Policy');
  } else if (filter === 'sop') {
    result = result.filter(d => d.category === 'SOP');
  }

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.id.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.uploadedBy.toLowerCase().includes(q)
    );
  }

  return result;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// --- Document Manager UI ---
const DocumentManager = {
  documents: [],
  search: '',
  filter: 'all',
  editingId: null,
  selectedFile: null,

  init() {
    initDocumentsStore();
    this.documents = getDocuments();
    if (!hasPermission('upload')) {
      const uploadBtn = document.getElementById('uploadDocBtn');
      if (uploadBtn) uploadBtn.style.display = 'none';
    }
    this.bindEvents();
    this.render();
  },

  bindEvents() {
    document.getElementById('docSearch').addEventListener('input', (e) => {
      this.search = e.target.value;
      this.renderTable();
    });

    document.querySelectorAll('.docs-filters .filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.docs-filters .filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.filter = chip.getAttribute('data-filter');
        this.renderTable();
      });
    });

    document.getElementById('uploadDocBtn').addEventListener('click', () => {
      if (!hasPermission('upload')) {
        showToast('You do not have permission to upload documents.', 'error');
        return;
      }
      this.openUploadModal();
    });

    document.getElementById('emptyUploadBtn')?.addEventListener('click', () => {
      if (!hasPermission('upload')) {
        showToast('You do not have permission to upload documents.', 'error');
        return;
      }
      this.openUploadModal();
    });

    document.getElementById('docForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });

    document.getElementById('docFormCancel').addEventListener('click', () => {
      closeModal('docModal');
      this.resetForm();
    });

    document.getElementById('docModalClose').addEventListener('click', () => {
      closeModal('docModal');
      this.resetForm();
    });

    document.getElementById('viewModalClose').addEventListener('click', () => closeModal('viewModal'));
    document.getElementById('viewModalOk').addEventListener('click', () => closeModal('viewModal'));

    this.setupDropZone();
  },

  setupDropZone() {
    const zone = document.getElementById('dropZone');
    const input = document.getElementById('fileInput');
    const browse = document.getElementById('browseFile');

    zone.addEventListener('click', () => input.click());
    browse.addEventListener('click', (e) => { e.stopPropagation(); input.click(); });

    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('dragover');
    });

    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('dragover');
      if (e.dataTransfer.files.length) this.handleFileSelect(e.dataTransfer.files[0]);
    });

    input.addEventListener('change', () => {
      if (input.files.length) this.handleFileSelect(input.files[0]);
    });
  },

  handleFileSelect(file) {
    const ext = file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      showToast(`Unsupported file type. Allowed: ${ALLOWED_EXTENSIONS.join(', ').toUpperCase()}`, 'error');
      return;
    }
    this.selectedFile = file;
    document.getElementById('dropZoneFile').textContent = `📎 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
  },

  openUploadModal() {
    this.editingId = null;
    this.selectedFile = null;
    document.getElementById('docModalTitle').textContent = 'Upload Document';
    document.getElementById('docFormSubmit').textContent = 'Upload';
    document.getElementById('dropZoneWrap').style.display = '';
    document.getElementById('dropZoneFile').textContent = '';
    document.getElementById('fileInput').value = '';
    document.getElementById('uploadProgress').classList.remove('visible');
    this.resetFormFields();
    openModal('docModal');
  },

  openEditModal(id) {
    if (!hasPermission('update')) {
      showToast('You do not have permission to edit documents.', 'error');
      return;
    }
    const doc = this.documents.find(d => d.id === id);
    if (!doc) return;

    this.editingId = id;
    document.getElementById('docModalTitle').textContent = 'Edit Document';
    document.getElementById('docFormSubmit').textContent = 'Save Changes';
    document.getElementById('dropZoneWrap').style.display = 'none';
    document.getElementById('docTitle').value = doc.title;
    document.getElementById('docCategory').value = doc.category;
    document.getElementById('docDescription').value = doc.description || '';
    document.getElementById('docVersion').value = doc.version;
    openModal('docModal');
  },

  resetFormFields() {
    document.getElementById('docTitle').value = '';
    document.getElementById('docCategory').value = 'Notice';
    document.getElementById('docDescription').value = '';
    document.getElementById('docVersion').value = '1.0';
  },

  resetForm() {
    this.editingId = null;
    this.selectedFile = null;
    this.resetFormFields();
  },

  handleFormSubmit() {
    const title = document.getElementById('docTitle').value.trim();
    const category = document.getElementById('docCategory').value;
    const description = document.getElementById('docDescription').value.trim();
    const version = document.getElementById('docVersion').value.trim();

    if (!title) {
      showToast('Document title is required.', 'error');
      return;
    }
    if (!version) {
      showToast('Version number is required.', 'error');
      return;
    }

    if (this.editingId) {
      this.saveEdit(title, category, description, version);
    } else {
      if (!this.selectedFile) {
        showToast('Please select a file to upload.', 'error');
        return;
      }
      this.simulateUpload(title, category, description, version);
    }
  },

  simulateUpload(title, category, description, version) {
    const progress = document.getElementById('uploadProgress');
    const fill = document.getElementById('uploadProgressFill');
    const text = document.getElementById('uploadProgressText');
    const submitBtn = document.getElementById('docFormSubmit');

    progress.classList.add('visible');
    submitBtn.disabled = true;
    let pct = 0;

    const interval = setInterval(() => {
      pct += Math.random() * 18 + 8;
      if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
        fill.style.width = '100%';
        text.textContent = 'Upload complete';

        setTimeout(() => {
          const session = getSession();
          const newDoc = {
            id: generateDocId(),
            title,
            category,
            status: 'Pending Review',
            uploadedBy: session ? session.name : 'Unknown',
            uploadDate: new Date().toISOString().split('T')[0],
            version,
            description,
            fileName: this.selectedFile.name
          };
          this.documents.unshift(newDoc);
          saveDocuments(this.documents);
          logAuditActivity('Document Uploaded', `${newDoc.id} — ${title} (${category}) v${version}`);
          closeModal('docModal');
          this.resetForm();
          submitBtn.disabled = false;
          progress.classList.remove('visible');
          fill.style.width = '0%';
          showToast(`Document "${title}" uploaded successfully.`, 'success');
          this.render();
        }, 400);
      } else {
        fill.style.width = pct + '%';
        text.textContent = `Uploading… ${Math.floor(pct)}%`;
      }
    }, 120);
  },

  saveEdit(title, category, description, version) {
    const idx = this.documents.findIndex(d => d.id === this.editingId);
    if (idx === -1) return;

    const doc = this.documents[idx];
    doc.title = title;
    doc.category = category;
    doc.description = description;
    doc.version = version;
    saveDocuments(this.documents);
    logAuditActivity('Document Updated', `${doc.id} — ${title} updated to v${version}`);
    closeModal('docModal');
    this.resetForm();
    showToast(`Document "${title}" updated successfully.`, 'success');
    this.render();
  },

  viewDocument(id) {
    const doc = this.documents.find(d => d.id === id);
    if (!doc) return;

    document.getElementById('viewModalBody').innerHTML = `
      <div class="view-detail-row"><span class="view-detail-label">Document ID</span><span class="view-detail-value doc-id">${doc.id}</span></div>
      <div class="view-detail-row"><span class="view-detail-label">Title</span><span class="view-detail-value">${doc.title}</span></div>
      <div class="view-detail-row"><span class="view-detail-label">Category</span><span class="view-detail-value">${doc.category}</span></div>
      <div class="view-detail-row"><span class="view-detail-label">Status</span><span class="view-detail-value"><span class="doc-status-badge ${statusBadgeClass(doc.status)}">${doc.status}</span></span></div>
      <div class="view-detail-row"><span class="view-detail-label">Version</span><span class="view-detail-value">${doc.version}</span></div>
      <div class="view-detail-row"><span class="view-detail-label">Uploaded By</span><span class="view-detail-value">${doc.uploadedBy}</span></div>
      <div class="view-detail-row"><span class="view-detail-label">Upload Date</span><span class="view-detail-value">${formatDate(doc.uploadDate)}</span></div>
      <div class="view-detail-row"><span class="view-detail-label">File</span><span class="view-detail-value">${doc.fileName || '—'}</span></div>
      <div class="view-detail-row"><span class="view-detail-label">Description</span><span class="view-detail-value">${doc.description || '—'}</span></div>
    `;
    openModal('viewModal');
  },

  downloadDocument(id) {
    const doc = this.documents.find(d => d.id === id);
    if (!doc) return;
    logAuditActivity('Document Downloaded', `${doc.id} — ${doc.title} (${doc.fileName || 'file'})`);
    showToast(`Download started: ${doc.fileName || doc.title}`, 'success');
  },

  archiveDocument(id) {
    if (!hasPermission('delete') && !hasPermission('update')) {
      showToast('You do not have permission to archive documents.', 'error');
      return;
    }
    const doc = this.documents.find(d => d.id === id);
    if (!doc || doc.status === 'Archived') return;

    doc.status = 'Archived';
    saveDocuments(this.documents);
    logAuditActivity('Document Archived', `${doc.id} — ${doc.title}`);
    showToast(`Document "${doc.title}" archived.`, 'warning');
    this.render();
  },

  render() {
    this.renderKPIs();
    this.renderTable();
  },

  renderKPIs() {
    const stats = getDocStats(this.documents);
    document.getElementById('kpiTotal').textContent = stats.total;
    document.getElementById('kpiActive').textContent = stats.active;
    document.getElementById('kpiPending').textContent = stats.pending;
    document.getElementById('kpiArchived').textContent = stats.archived;
  },

  renderTable() {
    const emptyState = document.getElementById('docsEmptyState');
    const tableWrap = document.getElementById('docsTableWrap');
    const toolbar = document.getElementById('docsToolbar');
    const filters = document.getElementById('docsFilters');

    if (this.documents.length === 0) {
      emptyState.style.display = '';
      tableWrap.style.display = 'none';
      toolbar.style.display = 'none';
      filters.style.display = 'none';
      document.getElementById('kpiGrid').style.display = 'none';
      return;
    }

    emptyState.style.display = 'none';
    tableWrap.style.display = '';
    toolbar.style.display = '';
    filters.style.display = '';
    document.getElementById('kpiGrid').style.display = '';

    const filtered = filterDocuments(this.documents, this.search, this.filter);
    const tbody = document.getElementById('docTableBody');
    const canEdit = hasPermission('update');
    const canArchive = hasPermission('delete') || hasPermission('update');

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8"><div class="docs-no-results">No documents match your search or filter criteria.</div></td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(doc => `
      <tr>
        <td class="doc-id">${escHtml(doc.id)}</td>
        <td>${escHtml(doc.title)}</td>
        <td>${escHtml(doc.category)}</td>
        <td><span class="doc-status-badge ${statusBadgeClass(doc.status)}">${escHtml(doc.status)}</span></td>
        <td>${escHtml(doc.uploadedBy)}</td>
        <td>${formatDate(doc.uploadDate)}</td>
        <td>${escHtml(doc.version)}</td>
        <td>
          <div class="doc-actions">
            <button class="btn-action primary" onclick="DocumentManager.viewDocument('${escHtml(doc.id)}')">View</button>
            <button class="btn-action" onclick="DocumentManager.downloadDocument('${escHtml(doc.id)}')">Download</button>
            ${canEdit ? `<button class="btn-action" onclick="DocumentManager.openEditModal('${escHtml(doc.id)}')">Edit</button>` : ''}
            ${canArchive && doc.status !== 'Archived' ? `<button class="btn-action danger" onclick="DocumentManager.archiveDocument('${escHtml(doc.id)}')">Archive</button>` : ''}
          </div>
        </td>
      </tr>
    `).join('');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('docTableBody')) {
    initPortalPage('documents');
    DocumentManager.init();
  }
});
