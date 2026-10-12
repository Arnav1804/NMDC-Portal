/* ============================================
   NMDC CS&IT PORTAL — Asset Management
   ============================================ */

const ASSETS_KEY = 'nmdc_assets';
const ASSETS_SEED_KEY = 'nmdc_assets_seeded';

const ASSET_CATEGORIES = [
  'Networking', 'Server', 'Desktop', 'Laptop', 'Printer',
  'Software License', 'CCTV', 'Storage Device'
];

const ASSET_STATUSES = ['Active', 'Maintenance', 'Inactive', 'Retired', 'Warranty Expiring'];

const ASSET_STATUS_CLASS = {
  'Active': 'active',
  'Maintenance': 'maintenance',
  'Inactive': 'inactive',
  'Retired': 'retired',
  'Warranty Expiring': 'warranty-expiring'
};

function getDefaultAssets() {
  return [
    { id: 'NET-001', name: 'Cisco Core Switch — Catalyst 9500', category: 'Networking', location: 'Bacheli DC', assignedUser: 'Demo User 04', status: 'Active', purchaseDate: daysAgo(500), vendor: 'Cisco Systems India', warrantyExpiry: daysFromNow(400), lastUpdated: daysAgo(5), description: 'Primary core switch for Bacheli data center fiber ring aggregation.' },
    { id: 'SRV-102', name: 'HP ProLiant DL380 Gen10', category: 'Server', location: 'Bacheli DC', assignedUser: 'Demo User 05', status: 'Active', purchaseDate: daysAgo(400), vendor: 'HPE India', warrantyExpiry: daysFromNow(20), lastUpdated: daysAgo(3), description: 'Virtualization host for ERP and file services cluster node 1.' },
    { id: 'SRV-103', name: 'Dell PowerEdge R750', category: 'Server', location: 'Bacheli DC', assignedUser: 'Demo User 05', status: 'Maintenance', purchaseDate: daysAgo(300), vendor: 'Dell Technologies', warrantyExpiry: daysFromNow(350), lastUpdated: daysAgo(1), description: 'Under scheduled firmware upgrade — cluster node 2, taken offline for patching.' },
    { id: 'DSK-015', name: 'Dell OptiPlex 7090 Desktop', category: 'Desktop', location: 'Bacheli Complex', assignedUser: 'Demo User 07', status: 'Active', purchaseDate: daysAgo(200), vendor: 'Dell Technologies', warrantyExpiry: daysFromNow(25), lastUpdated: daysAgo(4), description: 'Helpdesk team workstation with dual monitor setup.' },
    { id: 'DSK-016', name: 'Dell OptiPlex 7090 Desktop', category: 'Desktop', location: 'Kirandul Mine Office', assignedUser: 'Demo User 03 (Viewer)', status: 'Active', purchaseDate: daysAgo(250), vendor: 'Dell Technologies', warrantyExpiry: daysFromNow(365), lastUpdated: daysAgo(10), description: 'Mine site IT support desk workstation.' },
    { id: 'LPT-042', name: 'Lenovo ThinkPad T14 Gen 3', category: 'Laptop', location: 'Corporate HQ — Hyderabad', assignedUser: 'Demo User 01 (Admin)', status: 'Active', purchaseDate: daysAgo(150), vendor: 'Lenovo India', warrantyExpiry: daysFromNow(500), lastUpdated: daysAgo(7), description: 'GM (IT) mobile workstation with VPN and encryption enabled.' },
    { id: 'LPT-043', name: 'Lenovo ThinkPad T14 Gen 3', category: 'Laptop', location: 'Bacheli Complex', assignedUser: 'Demo User 02 (Officer)', status: 'Active', purchaseDate: daysAgo(150), vendor: 'Lenovo India', warrantyExpiry: daysFromNow(500), lastUpdated: daysAgo(2), description: 'Network team manager field laptop for mine site visits.' },
    { id: 'PRT-008', name: 'Canon imageRUNNER ADVANCE C5535i', category: 'Printer', location: 'Bacheli Complex', assignedUser: 'CS&IT Shared Pool', status: 'Active', purchaseDate: daysAgo(350), vendor: 'Canon India', warrantyExpiry: daysFromNow(180), lastUpdated: daysAgo(12), description: 'Department multifunction network printer — scan, print, copy.' },
    { id: 'PRT-009', name: 'HP LaserJet Enterprise M507dn', category: 'Printer', location: 'Kirandul Mine Office', assignedUser: 'CS&IT Shared Pool', status: 'Inactive', purchaseDate: daysAgo(800), vendor: 'HP India', warrantyExpiry: daysAgo(100), lastUpdated: daysAgo(30), description: 'Decommissioned pending replacement — toner supply discontinued.' },
    { id: 'LIC-201', name: 'Windows Server 2022 Datacenter License', category: 'Software License', location: 'Bacheli DC', assignedUser: 'Demo User 05', status: 'Active', purchaseDate: daysAgo(300), vendor: 'Microsoft India', warrantyExpiry: daysFromNow(700), lastUpdated: daysAgo(15), description: 'Volume license for 4-node Hyper-V cluster at Bacheli data center.' },
    { id: 'LIC-202', name: 'SAP S/4HANA Enterprise License', category: 'Software License', location: 'Corporate HQ — Hyderabad', assignedUser: 'Demo User 06', status: 'Active', purchaseDate: daysAgo(600), vendor: 'SAP India', warrantyExpiry: daysFromNow(450), lastUpdated: daysAgo(14), description: 'Enterprise ERP license covering Finance, MM, HR, and PM modules.' },
    { id: 'CCTV-301', name: 'CCTV Control Station — Hikvision NVR', category: 'CCTV', location: 'Bacheli Mine Perimeter', assignedUser: 'Demo User 08', status: 'Active', purchaseDate: daysAgo(280), vendor: 'Hikvision India', warrantyExpiry: daysFromNow(300), lastUpdated: daysAgo(6), description: '32-channel NVR for mine perimeter surveillance with 90-day retention.' },
    { id: 'CCTV-302', name: 'CCTV Control Station — Dahua NVR', category: 'CCTV', location: 'Kirandul Processing Plant', assignedUser: 'Demo User 08', status: 'Active', purchaseDate: daysAgo(240), vendor: 'Dahua Technology', warrantyExpiry: daysFromNow(260), lastUpdated: daysAgo(8), description: '16-channel NVR for processing plant and weighbridge monitoring.' },
    { id: 'NET-002', name: 'Fiber Distribution Switch — Juniper EX4300', category: 'Networking', location: 'Kirandul Mine Office', assignedUser: 'Demo User 04', status: 'Active', purchaseDate: daysAgo(350), vendor: 'Juniper Networks', warrantyExpiry: daysFromNow(320), lastUpdated: daysAgo(4), description: 'Distribution switch for Kirandul mine site fiber connectivity.' },
    { id: 'NET-003', name: 'Fortinet FortiGate 600E Firewall', category: 'Networking', location: 'Bacheli DC', assignedUser: 'Demo User 08', status: 'Active', purchaseDate: daysAgo(290), vendor: 'Fortinet India', warrantyExpiry: daysFromNow(600), lastUpdated: daysAgo(9), description: 'Perimeter firewall with IPS, SSL inspection, and VPN termination.' },
    { id: 'STG-401', name: 'NetApp FAS8300 Storage Array', category: 'Storage Device', location: 'Bacheli DC', assignedUser: 'Demo User 05', status: 'Active', purchaseDate: daysAgo(400), vendor: 'NetApp India', warrantyExpiry: daysFromNow(380), lastUpdated: daysAgo(3), description: 'Primary SAN storage — 480 TB usable capacity for VM and backup workloads.' },
    { id: 'STG-402', name: 'Dell EMC PowerVault ME5024', category: 'Storage Device', location: 'Bhubaneswar DR Site', assignedUser: 'Demo User 05', status: 'Active', purchaseDate: daysAgo(320), vendor: 'Dell Technologies', warrantyExpiry: daysFromNow(650), lastUpdated: daysAgo(11), description: 'Disaster recovery storage replica for Bacheli primary data center.' },
    { id: 'SRV-104', name: 'IBM Power S1022 Server', category: 'Server', location: 'Bhubaneswar DR Site', assignedUser: 'Demo User 05', status: 'Retired', purchaseDate: daysAgo(900), vendor: 'IBM India', warrantyExpiry: daysAgo(120), lastUpdated: daysAgo(50), description: 'Legacy DR server decommissioned after migration to Dell PowerEdge platform.' },
    { id: 'NET-004', name: 'Aruba Wireless Controller 7240', category: 'Networking', location: 'Bellary Mine Office', assignedUser: 'Demo User 04', status: 'Warranty Expiring', purchaseDate: daysAgo(450), vendor: 'HPE Aruba', warrantyExpiry: daysFromNow(12), lastUpdated: daysAgo(2), description: 'Wireless LAN controller for Bellary-Hospet mine office campus Wi-Fi.' },
    { id: 'DSK-017', name: 'HP ProDesk 400 G9 Desktop', category: 'Desktop', location: 'Bellary Mine Office', assignedUser: 'Demo User 03 (Viewer)', status: 'Active', purchaseDate: daysAgo(180), vendor: 'HP India', warrantyExpiry: daysFromNow(400), lastUpdated: daysAgo(16), description: 'Mine office administrative workstation.' },
    { id: 'LPT-044', name: 'Dell Latitude 5540 Laptop', category: 'Laptop', location: 'Bhubaneswar DR Site', assignedUser: 'Demo User 06', status: 'Maintenance', purchaseDate: daysAgo(200), vendor: 'Dell Technologies', warrantyExpiry: daysFromNow(420), lastUpdated: daysAgo(5), description: 'Sent for keyboard replacement — ERP team field laptop.' },
    { id: 'LIC-203', name: 'VMware vSphere Enterprise Plus', category: 'Software License', location: 'Bacheli DC', assignedUser: 'Demo User 05', status: 'Active', purchaseDate: daysAgo(210), vendor: 'Broadcom (VMware)', warrantyExpiry: daysFromNow(300), lastUpdated: daysAgo(13), description: 'Virtualization platform license for 4-host cluster.' },
    { id: 'CCTV-303', name: 'Axis P3265-LVE Dome Camera (Batch)', category: 'CCTV', location: 'Bacheli Mine Perimeter', assignedUser: 'Demo User 08', status: 'Active', purchaseDate: daysAgo(100), vendor: 'Axis Communications', warrantyExpiry: daysFromNow(280), lastUpdated: daysAgo(18), description: 'Batch of 24 IP dome cameras deployed for perimeter monitoring.' },
    { id: 'STG-403', name: 'Synology RS3621xs+ NAS', category: 'Storage Device', location: 'Kirandul Mine Office', assignedUser: 'Demo User 04', status: 'Active', purchaseDate: daysAgo(230), vendor: 'Synology', warrantyExpiry: daysFromNow(340), lastUpdated: daysAgo(7), description: 'Local NAS for mine site backup and document cache.' }
  ];
}

function initAssetsStore() {
  try {
    const stored = JSON.parse(localStorage.getItem(ASSETS_KEY) || '[]');
    if (stored.length && (stored[0].assignedUser?.includes('Shri') || stored.some(a => a.location?.includes('Delhi')) || stored.some(a => a.purchaseDate?.startsWith('2021-08-12')))) {
      const assets = getDefaultAssets();
      localStorage.setItem(ASSETS_KEY, JSON.stringify(assets));
      return assets;
    }
    if (stored.length) return stored;
  } catch { /* use defaults */ }
  const assets = getDefaultAssets();
  localStorage.setItem(ASSETS_KEY, JSON.stringify(assets));
  localStorage.setItem(ASSETS_SEED_KEY, 'true');
  return assets;
}

function getAssets() {
  try {
    const stored = localStorage.getItem(ASSETS_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* fall through */ }
  return initAssetsStore();
}

function saveAssets(assets) {
  localStorage.setItem(ASSETS_KEY, JSON.stringify(assets));
}

function generateAssetId(category) {
  const prefix = {
    'Networking': 'NET', 'Server': 'SRV', 'Desktop': 'DSK', 'Laptop': 'LPT',
    'Printer': 'PRT', 'Software License': 'LIC', 'CCTV': 'CCTV', 'Storage Device': 'STG'
  }[category] || 'AST';
  const assets = getAssets();
  const nums = assets
    .filter(a => a.id.startsWith(prefix + '-'))
    .map(a => parseInt(a.id.split('-')[1], 10))
    .filter(n => !isNaN(n));
  const next = nums.length ? Math.max(...nums) + 1 : 1;
  return `${prefix}-${String(next).padStart(3, '0')}`;
}

function daysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}

function getWarrantyBadge(warrantyExpiry) {
  const days = daysUntil(warrantyExpiry);
  if (days < 0) return { cls: 'expired', label: 'Warranty Expired' };
  if (days <= 15) return { cls: 'warn-15', label: 'Warranty Expires in 15 Days' };
  if (days <= 30) return { cls: 'warn-30', label: 'Warranty Expires in 30 Days' };
  return null;
}

function getAssetStats(assets) {
  const warrantySoon = assets.filter(a => {
    const d = daysUntil(a.warrantyExpiry);
    return d >= 0 && d <= 30;
  }).length;
  return {
    total: assets.length,
    active: assets.filter(a => a.status === 'Active' || a.status === 'Warranty Expiring').length,
    maintenance: assets.filter(a => a.status === 'Maintenance').length,
    warrantySoon
  };
}

function filterAssets(assets, search, filter) {
  let result = [...assets];

  const categoryMap = {
    networking: 'Networking',
    servers: 'Server',
    computers: ['Desktop', 'Laptop'],
    printers: 'Printer',
    software: 'Software License'
  };

  if (filter === 'active') {
    result = result.filter(a => a.status === 'Active' || a.status === 'Warranty Expiring');
  } else if (filter === 'maintenance') {
    result = result.filter(a => a.status === 'Maintenance');
  } else if (filter === 'retired') {
    result = result.filter(a => a.status === 'Retired' || a.status === 'Inactive');
  } else if (categoryMap[filter]) {
    const cat = categoryMap[filter];
    result = result.filter(a =>
      Array.isArray(cat) ? cat.includes(a.category) : a.category === cat
    );
  }

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter(a =>
      a.id.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.location.toLowerCase().includes(q) ||
      a.assignedUser.toLowerCase().includes(q)
    );
  }

  return result;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function countByField(assets, field) {
  const counts = {};
  assets.forEach(a => {
    counts[a[field]] = (counts[a[field]] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

function renderBarChart(containerId, data, maxItems = 6) {
  const el = document.getElementById(containerId);
  if (!el || !data.length) {
    if (el) el.innerHTML = '<p class="text-sm text-gray-400">No data available</p>';
    return;
  }
  const top = data.slice(0, maxItems);
  const max = top[0][1];
  el.innerHTML = top.map(([label, count], i) => `
    <div class="bar-chart-item">
      <div class="bar-chart-label">
        <span>${escHtml(label)}</span>
        <span>${count}</span>
      </div>
      <div class="bar-chart-track">
        <div class="bar-chart-fill ${i % 4 === 1 ? 'alt-1' : i % 4 === 2 ? 'alt-2' : i % 4 === 3 ? 'alt-3' : ''}" style="width:${Math.round((count / max) * 100)}%"></div>
      </div>
    </div>
  `).join('');
}

const AssetManager = {
  assets: [],
  search: '',
  filter: 'all',
  editingId: null,
  deleteTargetId: null,
  sortField: 'id',
  sortDir: 'asc',
  currentPage: 1,
  pageSize: 10,

  init() {
    initAssetsStore();
    this.assets = getAssets();
    if (!hasPermission('create')) {
      const addBtn = document.getElementById('addAssetBtn');
      if (addBtn) addBtn.style.display = 'none';
    }
    this.bindEvents();
    this.render();
  },

  bindEvents() {
    document.getElementById('assetSearch').addEventListener('input', (e) => {
      this.search = e.target.value;
      this.currentPage = 1;
      this.renderTable();
    });

    document.querySelectorAll('.docs-filters .filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.docs-filters .filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.filter = chip.getAttribute('data-filter');
        this.currentPage = 1;
        this.renderTable();
      });
    });

    document.querySelectorAll('#assetTable .sortable-th').forEach(th => {
      th.style.cursor = 'pointer';
      th.addEventListener('click', () => {
        const field = th.dataset.sort;
        if (this.sortField === field) {
          this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortField = field;
          this.sortDir = 'asc';
        }
        this.currentPage = 1;
        this.renderTable();
      });
    });

    document.getElementById('addAssetBtn')?.addEventListener('click', () => this.openAddModal());
    document.getElementById('emptyAddBtn')?.addEventListener('click', () => this.openAddModal());

    document.getElementById('editForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveAsset();
    });

    document.getElementById('editFormCancel').addEventListener('click', () => {
      closeModal('editModal');
      this.editingId = null;
    });
    document.getElementById('editModalClose').addEventListener('click', () => {
      closeModal('editModal');
      this.editingId = null;
    });

    document.getElementById('viewModalClose').addEventListener('click', () => closeModal('viewModal'));
    document.getElementById('viewModalOk').addEventListener('click', () => closeModal('viewModal'));

    document.getElementById('deleteCancel').addEventListener('click', () => {
      closeModal('deleteModal');
      this.deleteTargetId = null;
    });
    document.getElementById('deleteModalClose').addEventListener('click', () => {
      closeModal('deleteModal');
      this.deleteTargetId = null;
    });
    document.getElementById('deleteConfirm').addEventListener('click', () => this.confirmDelete());
  },

  openAddModal() {
    if (!hasPermission('create')) {
      showToast('You do not have permission to add assets.', 'error');
      return;
    }
    this.editingId = null;
    document.getElementById('editModalTitle').textContent = 'Add Asset';
    document.getElementById('editFormSubmit').textContent = 'Add Asset';
    document.getElementById('editAssetName').value = '';
    document.getElementById('editCategory').value = 'Server';
    document.getElementById('editLocation').value = '';
    document.getElementById('editAssignedUser').value = '';
    document.getElementById('editStatus').value = 'Active';
    document.getElementById('editVendor').value = '';
    document.getElementById('editWarranty').value = '';
    openModal('editModal');
  },

  openEditModal(id) {
    if (!hasPermission('update')) {
      showToast('You do not have permission to edit assets.', 'error');
      return;
    }
    const asset = this.assets.find(a => a.id === id);
    if (!asset) return;

    this.editingId = id;
    document.getElementById('editModalTitle').textContent = 'Edit Asset';
    document.getElementById('editFormSubmit').textContent = 'Save Changes';
    document.getElementById('editAssetName').value = asset.name;
    document.getElementById('editCategory').value = asset.category;
    document.getElementById('editLocation').value = asset.location;
    document.getElementById('editAssignedUser').value = asset.assignedUser;
    document.getElementById('editStatus').value = asset.status;
    document.getElementById('editVendor').value = asset.vendor || '';
    document.getElementById('editWarranty').value = asset.warrantyExpiry;
    openModal('editModal');
  },

  saveAsset() {
    const name = document.getElementById('editAssetName').value.trim();
    const category = document.getElementById('editCategory').value;
    const location = document.getElementById('editLocation').value.trim();
    const assignedUser = document.getElementById('editAssignedUser').value.trim();
    const status = document.getElementById('editStatus').value;
    const vendor = document.getElementById('editVendor').value.trim();
    const warrantyExpiry = document.getElementById('editWarranty').value;

    if (!name || !location || !assignedUser || !warrantyExpiry) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    if (this.editingId) {
      const asset = this.assets.find(a => a.id === this.editingId);
      if (!asset) return;

      const prevStatus = asset.status;
      const prevUser = asset.assignedUser;

      asset.name = name;
      asset.category = category;
      asset.location = location;
      asset.assignedUser = assignedUser;
      asset.status = status;
      asset.vendor = vendor;
      asset.warrantyExpiry = warrantyExpiry;
      asset.lastUpdated = today;

      saveAssets(this.assets);
      logAuditActivity('Asset Updated', `${asset.id} — ${name}`, 'Assets');
      if (prevStatus !== status) {
        logAuditActivity('Asset Status Changed', `${asset.id} — ${prevStatus} → ${status}`, 'Assets');
      }
      if (prevUser !== assignedUser) {
        logAuditActivity('Asset Assigned', `${asset.id} — reassigned to ${assignedUser}`, 'Assets');
      }
      showToast(`Asset "${name}" updated successfully.`, 'success');
    } else {
      const newAsset = {
        id: generateAssetId(category),
        name,
        category,
        location,
        assignedUser,
        status,
        purchaseDate: today,
        vendor,
        warrantyExpiry,
        lastUpdated: today,
        description: `${category} asset registered at ${location}.`
      };
      this.assets.unshift(newAsset);
      saveAssets(this.assets);
      logAuditActivity('Asset Created', `${newAsset.id} — ${name}`, 'Assets');
      showToast(`Asset "${name}" created successfully.`, 'success');
    }

    closeModal('editModal');
    this.editingId = null;
    this.render();
  },

  viewAsset(id) {
    const asset = this.assets.find(a => a.id === id);
    if (!asset) return;

    const warranty = getWarrantyBadge(asset.warrantyExpiry);
    const warrantyHtml = warranty
      ? `<span class="warranty-badge ${warranty.cls}">${warranty.label}</span>`
      : '—';

    document.getElementById('viewModalBody').innerHTML = `
      <div class="view-detail-row"><span class="view-detail-label">Asset ID</span><span class="view-detail-value asset-id">${escHtml(asset.id)}</span></div>
      <div class="view-detail-row"><span class="view-detail-label">Asset Name</span><span class="view-detail-value">${escHtml(asset.name)}</span></div>
      <div class="view-detail-row"><span class="view-detail-label">Category</span><span class="view-detail-value">${escHtml(asset.category)}</span></div>
      <div class="view-detail-row"><span class="view-detail-label">Location</span><span class="view-detail-value">${escHtml(asset.location)}</span></div>
      <div class="view-detail-row"><span class="view-detail-label">Assigned User</span><span class="view-detail-value">${escHtml(asset.assignedUser)}</span></div>
      <div class="view-detail-row"><span class="view-detail-label">Purchase Date</span><span class="view-detail-value">${formatDate(asset.purchaseDate)}</span></div>
      <div class="view-detail-row"><span class="view-detail-label">Vendor</span><span class="view-detail-value">${escHtml(asset.vendor || '—')}</span></div>
      <div class="view-detail-row"><span class="view-detail-label">Warranty Expiry</span><span class="view-detail-value">${formatDate(asset.warrantyExpiry)} ${warrantyHtml}</span></div>
      <div class="view-detail-row"><span class="view-detail-label">Status</span><span class="view-detail-value"><span class="asset-status-badge ${ASSET_STATUS_CLASS[asset.status] || 'inactive'}">${escHtml(asset.status)}</span></span></div>
      <div class="view-detail-row"><span class="view-detail-label">Description</span><span class="view-detail-value">${escHtml(asset.description || '—')}</span></div>
    `;
    openModal('viewModal');
  },

  openDeleteModal(id) {
    if (!hasPermission('delete')) {
      showToast('You do not have permission to delete assets.', 'error');
      return;
    }
    const asset = this.assets.find(a => a.id === id);
    if (!asset) return;

    this.deleteTargetId = id;
    document.getElementById('deleteConfirmText').innerHTML =
      `Are you sure you want to remove Asset <strong>${escHtml(asset.id)}</strong>?<br><span style="font-size:0.85rem;margin-top:6px;display:block;">${escHtml(asset.name)}</span>`;
    openModal('deleteModal');
  },

  confirmDelete() {
    const asset = this.assets.find(a => a.id === this.deleteTargetId);
    if (!asset) return;

    this.assets = this.assets.filter(a => a.id !== this.deleteTargetId);
    saveAssets(this.assets);
    logAuditActivity('Asset Deleted', `${asset.id} — ${asset.name}`, 'Assets');
    closeModal('deleteModal');
    this.deleteTargetId = null;
    showToast(`Asset ${asset.id} removed.`, 'warning');
    this.render();
  },

  render() {
    this.renderKPIs();
    this.renderTable();
    this.renderAnalytics();
  },

  renderKPIs() {
    const stats = getAssetStats(this.assets);
    document.getElementById('kpiTotal').textContent = stats.total;
    document.getElementById('kpiActive').textContent = stats.active;
    document.getElementById('kpiMaintenance').textContent = stats.maintenance;
    document.getElementById('kpiWarranty').textContent = stats.warrantySoon;
  },

  goToPage(p) {
    this.currentPage = p;
    this.renderTable();
  },

  renderTable() {
    const emptyState = document.getElementById('assetsEmptyState');
    const tableWrap = document.getElementById('assetsTableWrap');
    const toolbar = document.getElementById('assetsToolbar');
    const filters = document.getElementById('assetsFilters');
    const analytics = document.getElementById('analyticsGrid');

    if (this.assets.length === 0) {
      emptyState.style.display = '';
      tableWrap.style.display = 'none';
      toolbar.style.display = 'none';
      filters.style.display = 'none';
      analytics.style.display = 'none';
      document.getElementById('kpiGrid').style.display = 'none';
      return;
    }

    emptyState.style.display = 'none';
    tableWrap.style.display = '';
    toolbar.style.display = '';
    filters.style.display = '';
    analytics.style.display = '';
    document.getElementById('kpiGrid').style.display = '';

    const filtered = filterAssets(this.assets, this.search, this.filter);
    const tbody = document.getElementById('assetTableBody');
    const pagDiv = document.getElementById('assetPagination');
    const canEdit = hasPermission('update');
    const canDelete = hasPermission('delete');

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="11"><div class="docs-no-results">No assets match your search or filter criteria.</div></td></tr>`;
      if (pagDiv) pagDiv.innerHTML = '';
      return;
    }

    filtered.sort((a, b) => {
      let valA = a[this.sortField] || '';
      let valB = b[this.sortField] || '';
      let cmp = String(valA).localeCompare(String(valB));
      return this.sortDir === 'asc' ? cmp : -cmp;
    });

    document.querySelectorAll('#assetTable .sortable-th').forEach(th => {
      const field = th.dataset.sort;
      const baseText = th.getAttribute('data-label') || th.textContent.replace(/[↕▲▼]/g, '').trim();
      if (!th.getAttribute('data-label')) th.setAttribute('data-label', baseText);
      th.textContent = field === this.sortField ? `${baseText} ${this.sortDir === 'asc' ? '▲' : '▼'}` : `${baseText} ↕`;
    });

    const totalPages = Math.ceil(filtered.length / this.pageSize) || 1;
    if (this.currentPage > totalPages) this.currentPage = totalPages;
    const startIdx = (this.currentPage - 1) * this.pageSize;
    const pageItems = filtered.slice(startIdx, startIdx + this.pageSize);

    tbody.innerHTML = pageItems.map(asset => {
      const warranty = getWarrantyBadge(asset.warrantyExpiry);
      const rowClass = warranty?.cls === 'expired' || warranty?.cls === 'warn-15'
        ? 'warranty-row-critical'
        : warranty?.cls === 'warn-30' ? 'warranty-row-warning' : '';

      const warrantyHtml = warranty
        ? `<br><span class="warranty-badge ${warranty.cls}">${warranty.label}</span>`
        : '';

      return `
      <tr class="${rowClass}">
        <td class="asset-id">${escHtml(asset.id)}</td>
        <td>${escHtml(asset.name)}</td>
        <td>${escHtml(asset.category)}</td>
        <td>${escHtml(asset.location)}</td>
        <td>${escHtml(asset.assignedUser)}</td>
        <td><span class="asset-status-badge ${ASSET_STATUS_CLASS[asset.status] || 'inactive'}">${escHtml(asset.status)}</span></td>
        <td>${formatDate(asset.purchaseDate)}</td>
        <td>${escHtml(asset.vendor || '—')}</td>
        <td>${formatDate(asset.warrantyExpiry)}${warrantyHtml}</td>
        <td>${formatDate(asset.lastUpdated)}</td>
        <td>
          <div class="doc-actions">
            <button class="btn-action primary" onclick="AssetManager.viewAsset('${escHtml(asset.id)}')">View</button>
            ${canEdit ? `<button class="btn-action" onclick="AssetManager.openEditModal('${escHtml(asset.id)}')">Edit</button>` : ''}
            ${canDelete ? `<button class="btn-action danger" onclick="AssetManager.openDeleteModal('${escHtml(asset.id)}')">Delete</button>` : ''}
          </div>
        </td>
      </tr>`;
    }).join('');

    if (pagDiv) {
      if (totalPages <= 1) {
        pagDiv.innerHTML = `<span style="font-size:0.85rem;color:var(--text-muted, #94a3b8);padding:8px 0;display:inline-block;">Showing all ${filtered.length} assets</span>`;
      } else {
        pagDiv.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:8px;padding:12px 4px;">
            <span style="font-size:0.85rem;color:var(--text-muted, #94a3b8);">Showing ${startIdx + 1}–${Math.min(startIdx + this.pageSize, filtered.length)} of ${filtered.length} assets</span>
            <div style="display:flex;gap:6px;align-items:center;">
              <button class="btn-action" ${this.currentPage === 1 ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''} onclick="AssetManager.goToPage(${this.currentPage - 1})">Prev</button>
              ${Array.from({length: totalPages}, (_, i) => i + 1).map(p => `
                <button class="btn-action ${p === this.currentPage ? 'primary' : ''}" onclick="AssetManager.goToPage(${p})">${p}</button>
              `).join('')}
              <button class="btn-action" ${this.currentPage === totalPages ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''} onclick="AssetManager.goToPage(${this.currentPage + 1})">Next</button>
            </div>
          </div>`;
      }
    }
  },

  renderAnalytics() {
    renderBarChart('chartCategory', countByField(this.assets, 'category'));
    renderBarChart('chartLocation', countByField(this.assets, 'location'));
    renderBarChart('chartStatus', countByField(this.assets, 'status'));
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('assetTableBody')) {
    initPortalPage('assets');
    AssetManager.init();
  }
});
