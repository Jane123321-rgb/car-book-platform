// ========== 数据持久化 ==========
const STORAGE_KEY = 'car_book_platform_data';

function getDefaultData() {
  return {
    uploads: [
      { id: 'CS001', name: '理想L7用户手册', desc: '理想L7全系车型用户使用手册，涵盖功能说明与操作指引。', version: '1.0', status: 'online', activeStatus: '已生效', createTime: '2026-07-18 10:00', updateTime: '2026-07-20 14:00', uploadTime: '2026-07-18 10:00', fileName: '理想L7用户手册_v1.zip', fileSize: '45 MB', genStatus: 'completed', genTime: '2026-07-19 08:30' },
      { id: 'CS001', name: '理想L7用户手册', desc: '理想L7全系车型用户使用手册，2.0版本更新了智能座舱内容。', version: '2.0', status: 'pending_review', activeStatus: '未生效', createTime: '2026-07-20 14:00', updateTime: '2026-07-21 09:00', uploadTime: '2026-07-21 09:00', fileName: '理想L7用户手册_v2.zip', fileSize: '50 MB', genStatus: 'completed', genTime: '2026-07-21 10:00' },
      { id: 'CS002', name: '比亚迪汉EV维修指南', desc: '比亚迪汉EV车型维修技术指南，包含故障诊断与维修流程。', version: '1.0', status: 'rejected', activeStatus: '未生效', createTime: '2026-07-22 09:15', updateTime: '2026-07-24 09:30', uploadTime: '2026-07-22 09:15', fileName: '比亚迪汉EV维修指南.zip', fileSize: '87 MB', genStatus: 'completed', genTime: '2026-07-23 15:00' },
      { id: 'CS003', name: '小鹏G6产品白皮书', desc: '小鹏G6全系产品技术白皮书，覆盖智能驾驶与三电系统。', version: '1.0', status: 'pending_gen', activeStatus: '未生效', createTime: '2026-07-21 11:00', updateTime: '2026-07-21 11:00', uploadTime: '2026-07-21 11:00', fileName: '小鹏G6产品白皮书.pdf', fileSize: '85 MB', genStatus: 'processing', genTime: '--' },
      { id: 'CS004', name: '蔚来ET5用户手册', desc: '蔚来ET5用户使用手册，涵盖换电操作与辅助驾驶说明。', version: '1.0', status: 'revoked', activeStatus: '未生效', createTime: '2026-07-19 14:20', updateTime: '2026-07-20 10:00', uploadTime: '2026-07-19 14:20', fileName: '蔚来ET5用户手册.zip', fileSize: '38 MB', genStatus: 'pending', genTime: '--' },
      { id: 'CS005', name: '特斯拉Model Y用户手册', desc: '特斯拉Model Y用户使用手册，包含自动驾驶与充电说明。', version: '1.0', status: 'online', activeStatus: '已生效', createTime: '2026-07-17 09:45', updateTime: '2026-07-18 16:00', uploadTime: '2026-07-17 09:45', fileName: 'Model_Y_Manual.zip', fileSize: '156 MB', genStatus: 'completed', genTime: '2026-07-17 14:00' },
      { id: 'CS006', name: '问界M7智驾手册', desc: '问界M7智能驾驶功能手册，覆盖HUAWEI ADS系统操作。', version: '1.0', status: 'online', activeStatus: '未生效', createTime: '2026-07-16 15:30', updateTime: '2026-07-17 10:00', uploadTime: '2026-07-16 15:30', fileName: '问界M7智驾手册.zip', fileSize: '28 MB', genStatus: 'completed', genTime: '2026-07-17 09:00' },
    ],
    knowledgeBases: [
      { id: 'k1', name: '理想L7用户手册1.0知识库', carBookName: '理想L7用户手册', status: 'approved', genTime: '2026-07-19 08:30', reviewTime: '2026-07-19 10:00', bookId: 'CS001', version: '1.0' },
      { id: 'k2', name: '理想L7用户手册2.0知识库', carBookName: '理想L7用户手册', status: 'review', genTime: '2026-07-21 10:00', reviewTime: '--', bookId: 'CS001', version: '2.0' },
      { id: 'k5', name: '特斯拉Model Y知识库', carBookName: '特斯拉Model Y用户手册', status: 'approved', genTime: '2026-07-17 14:00', reviewTime: '2026-07-17 15:30', bookId: 'CS005', version: '1.0' },
      { id: 'k6', name: '问界M7智驾手册知识库', carBookName: '问界M7智驾手册', status: 'approved', genTime: '2026-07-17 09:00', reviewTime: '2026-07-17 11:00', bookId: 'CS006', version: '1.0' },
      { id: 'k7', name: '比亚迪汉EV维修指南知识库', carBookName: '比亚迪汉EV维修指南', status: 'rejected', genTime: '2026-07-23 15:00', reviewTime: '2026-07-24 09:30', bookId: 'CS002', version: '1.0', rejectReason: '知识库内容与实际车书版本不一致，部分章节缺失，请补充第三章维修流程后重新提交。' },
    ],
    idCounter: 7,
    apiConfig: { provider: 'deepseek', apiKey: '', model: 'deepseek-chat' },
  };
}

function saveData() {
  const data = {
    uploads: state.uploads,
    knowledgeBases: state.knowledgeBases,
    idCounter: idCounter,
    apiConfig: state.apiConfig,
  };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) {}
}

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      state.uploads = data.uploads || getDefaultData().uploads;
      state.knowledgeBases = data.knowledgeBases || getDefaultData().knowledgeBases;
      idCounter = data.idCounter || 7;
      state.apiConfig = data.apiConfig || getDefaultData().apiConfig;
      return;
    }
  } catch(e) {}
  const d = getDefaultData();
  state.uploads = d.uploads;
  state.knowledgeBases = d.knowledgeBases;
  idCounter = d.idCounter;
  state.apiConfig = d.apiConfig;
}

// ========== 模拟数据 ==========
let resizeCol = null, resizeStartX = 0, resizeStartW = 0, resizeJustEnded = false, resizeColWidths = null;
const state = {
  currentView: 'upload',
  detailItem: null,
  detailType: null, // 'upload' | 'review' | 'list'
  uploadSort: { field: 'createTime', order: 'desc' },
  apiConfig: { provider: 'deepseek', apiKey: '', model: 'deepseek-chat' },
  colWidths: [50, 140, 70, 100, 85, 150, 150, 240],
  genColWidths: [60, 180, 80, 100, 160, 260],
  revColWidths: [50, 150, 200, 150, 100, 150, 80],
  listColWidths: [50, 150, 80, 200, 150, 150, 80],
  uploads: [],
  knowledgeBases: [],
};

const CS_STATUS_MAP = {
  draft:        { text: '待提交',       cls: 'tag-draft' },
  revoked:      { text: '已撤销',       cls: 'tag-rejected' },
  pending_gen:  { text: '待生成知识库', cls: 'tag-pending' },
  pending_review:{ text: '待审核',      cls: 'tag-processing' },
  rejected:     { text: '审核不通过',   cls: 'tag-rejected' },
  online:       { text: '已上线',       cls: 'tag-success' },
  rollback:     { text: '已回退',       cls: 'tag-rejected' },
};

const STATUS_MAP = {
  pending:    { text: '待生成',   cls: 'tag-pending' },
  processing: { text: '生成中',   cls: 'tag-processing' },
  draft:      { text: '草稿',     cls: 'tag-draft' },
  review:     { text: '待审核',   cls: 'tag-processing' },
  approved:   { text: '已通过',   cls: 'tag-success' },
  rejected:   { text: '已驳回',   cls: 'tag-rejected' },
};

const GEN_STATUS_MAP = {
  pending:    { text: '待生成', cls: 'tag-pending' },
  processing: { text: '生成中', cls: 'tag-processing' },
  paused:     { text: '已暂停', cls: 'tag-draft' },
  completed:  { text: '已生成', cls: 'tag-success' },
  failed:     { text: '生成失败', cls: 'tag-rejected' },
};

const REVIEW_STATUS_MAP = {
  review:   { text: '待审核',    cls: 'tag-processing' },
  approved: { text: '审核通过',  cls: 'tag-success' },
  rejected: { text: '审核不通过', cls: 'tag-rejected' },
};

// ========== 工具函数 ==========
function escapeHtml(str) {
  if (str == null) return '';
  return String(str).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function formatDate(s) { return escapeHtml(s); }

let idCounter = 7;
function generateId() {
  const seq = String(idCounter++).padStart(3, '0');
  return `CS${seq}`;
}

function compareVersion(a, b) {
  const pa = parseFloat(a);
  const pb = parseFloat(b);
  return pa - pb;
}

// ========== LLM API 调用 ==========
async function callLLM(systemPrompt, userPrompt) {
  const cfg = state.apiConfig;
  if (!cfg.apiKey) throw new Error('请先配置 API Key');

  const apiUrl = cfg.provider === 'deepseek'
    ? 'https://api.deepseek.com/v1/chat/completions'
    : 'https://api.groq.com/openai/v1/chat/completions';

  const resp = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + cfg.apiKey
    },
    body: JSON.stringify({
      model: cfg.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2048
    })
  });

  if (!resp.ok) {
    const errData = await resp.json().catch(() => ({}));
    throw new Error(errData.error?.message || 'API 调用失败 (HTTP ' + resp.status + ')');
  }

  const data = await resp.json();
  return data.choices[0].message.content;
}

function updateApiStatus() {
  const el = document.getElementById('api-status');
  if (!el) return;
  const cfg = state.apiConfig;
  if (cfg.apiKey) {
    const name = cfg.provider === 'groq' ? 'Groq' : cfg.provider === 'deepseek' ? 'DeepSeek' : cfg.provider;
    el.textContent = name + ' | ' + cfg.model;
    el.style.color = '#10b981';
  } else {
    el.textContent = '未配置模型';
    el.style.color = '';
  }
}

function openApiSettings() {
  const cfg = state.apiConfig;
  showModal('模型配置', `
    <div class="form-row">
      <label class="form-label">模型提供商</label>
      <select class="filter-select" id="api-provider" style="width:100%;">
        <option value="deepseek" ${cfg.provider === 'deepseek' ? 'selected' : ''}>DeepSeek（国内可用，推荐）</option>
        <option value="groq" ${cfg.provider === 'groq' ? 'selected' : ''}>Groq（需代理）</option>
      </select>
    </div>
    <div class="form-row">
      <label class="form-label">API Key</label>
      <input class="form-input" id="api-key" value="${escapeHtml(cfg.apiKey)}" placeholder="请输入 API Key" />
    </div>
    <div class="form-row">
      <label class="form-label">模型名称</label>
      <input class="form-input" id="api-model" value="${escapeHtml(cfg.model)}" placeholder="deepseek-chat" />
    </div>
    <div style="font-size:12px;color:#6b7280;margin-top:8px;">
      DeepSeek 注册：<a href="https://platform.deepseek.com/api_keys" target="_blank">platform.deepseek.com</a>，国内直接访问，新用户送500万token<br/>
      Groq（需代理）：<a href="https://console.groq.com/keys" target="_blank">console.groq.com/keys</a>，支持 llama、gemma 等开源模型
    </div>
  `, [
    { text: '取消', cls: 'btn-secondary', action: closeModal },
    { text: '保存', cls: 'btn-primary', action: () => {
      const provider = document.getElementById('api-provider').value;
      const apiKey = document.getElementById('api-key').value.trim();
      const model = document.getElementById('api-model').value.trim();
      state.apiConfig = { provider, apiKey, model: model || 'llama-3.1-8b-instant' };
      closeModal();
      updateApiStatus();
    }},
  ]);
}

// 通用列宽拖动绑定
function bindColumnResize(colWidthsKey) {
  resizeCol = null;
  document.querySelectorAll('.col-resize').forEach(handle => {
    handle.addEventListener('mousedown', e => {
      e.preventDefault();
      e.stopPropagation();
      resizeCol = parseInt(handle.dataset.col);
      resizeColWidths = colWidthsKey;
      resizeStartX = e.clientX;
      resizeStartW = state[colWidthsKey][resizeCol];
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    });
  });
  if (!state._resizeBound) {
    state._resizeBound = true;
    document.addEventListener('mousemove', e => {
      if (resizeCol === null || !resizeColWidths) return;
      const delta = e.clientX - resizeStartX;
      const newW = Math.max(40, resizeStartW + delta);
      state[resizeColWidths][resizeCol] = newW;
      const col = document.querySelector('colgroup col:nth-child(' + (resizeCol + 1) + ')');
      const th = document.querySelector('th[data-col="' + resizeCol + '"]');
      if (col) col.style.width = newW + 'px';
      if (th) th.style.width = newW + 'px';
    });
    document.addEventListener('mouseup', () => {
      if (resizeCol !== null) {
        resizeJustEnded = true;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        resizeCol = null;
        resizeColWidths = null;
      }
    });
  }
}

function switchView(view) {
  state.currentView = view;
  state.detailItem = null;
  state.detailType = null;
  document.querySelectorAll('.menu-item').forEach(el => {
    el.classList.toggle('active', el.dataset.view === view);
  });
  const titles = { upload: '车书上传', generate: '生成知识库', review: '知识库审核', list: '知识库列表' };
  document.getElementById('breadcrumb-current').textContent = titles[view];
  // 模型配置只在生成知识库模块显示
  const topbarRight = document.getElementById('topbar-right');
  if (view === 'generate') {
    topbarRight.innerHTML = '<button class="btn btn-sm btn-secondary" id="btn-api-settings" title="API 设置">模型配置</button><span class="topbar-tip" id="api-status">未配置模型</span>';
    updateApiStatus();
    setTimeout(() => {
      document.getElementById('btn-api-settings')?.addEventListener('click', openApiSettings);
    }, 0);
  } else {
    topbarRight.innerHTML = '';
  }
  render();
}

function render() {
  const content = document.getElementById('content');
  if (state.detailItem) {
    if (state.detailType === 'upload') {
      content.innerHTML = renderUploadDetail(state.detailItem);
      bindUploadDetail();
    } else if (state.detailType === 'review') {
      content.innerHTML = renderReviewDetail(state.detailItem);
      bindReviewDetail();
    } else if (state.detailType === 'list') {
      content.innerHTML = renderListDetail(state.detailItem);
      bindListDetail();
    }
    return;
  }
  switch (state.currentView) {
    case 'upload':    content.innerHTML = renderUpload();    bindUpload();    break;
    case 'generate':  content.innerHTML = renderGenerate();  bindGenerate();  break;
    case 'review':    content.innerHTML = renderReview();    bindReview();    break;
    case 'list':      content.innerHTML = renderList();      bindList();      break;
  }
  saveData();
}

// ========== 车书上传：列表页 ==========
function renderUpload() {
  return `
    <div class="page-header">
      <div class="page-title">车书上传</div>
      <div class="page-desc">上传车书需填写车书名称、简介并上传附件，系统将自动生成 ID 与版本号。</div>
    </div>
    <div class="card">
      <div class="toolbar">
        <div class="toolbar-left">
          <strong style="font-size:15px;">车书列表</strong>
          <span style="color:#6b7280;font-size:13px;">共 ${state.uploads.length} 条</span>
        </div>
        <button class="btn btn-primary" id="btn-add-cs">上传车书</button>
      </div>
      <div class="toolbar" style="margin-top:8px;">
        <div class="toolbar-left">
          <input type="text" class="search-input" id="up-search" placeholder="搜索车书名称..." style="width:200px;" />
          <select class="filter-select" id="up-filter-status">
            <option value="all">全部状态</option>
            <option value="draft">待提交</option>
            <option value="pending_gen">待生成知识库</option>
            <option value="pending_review">待审核</option>
            <option value="rejected">审核不通过</option>
            <option value="online">已上线</option>
            <option value="rollback">已回退</option>
            <option value="revoked">已撤销</option>
          </select>
          <select class="filter-select" id="up-filter-active">
            <option value="all">全部生效状态</option>
            <option value="已生效">已生效</option>
            <option value="未生效">未生效</option>
          </select>
        </div>
        <div class="toolbar-left">
          <button class="btn btn-secondary btn-sm" id="up-reset">重置</button>
        </div>
      </div>
      ${renderUploadTable()}
    </div>
  `;
}

function getSortedUploads() {
  const arr = [...state.uploads];
  const { field, order } = state.uploadSort;
  arr.sort((a, b) => {
    const ta = new Date(a[field].replace(/-/g, '/'));
    const tb = new Date(b[field].replace(/-/g, '/'));
    return order === 'asc' ? ta - tb : tb - ta;
  });
  return arr;
}

function renderSortIcon(field) {
  if (state.uploadSort.field !== field) return '↕';
  return state.uploadSort.order === 'desc' ? '↓' : '↑';
}

function renderUploadTable() {
  const list = getSortedUploads();
  if (list.length === 0) {
    return `<div class="empty"><div class="empty-icon">📭</div>暂无车书数据</div>`;
  }
  return `
    <div class="table-wrap">
      <table class="resizable-table">
        <colgroup>
          ${state.colWidths.map(w => `<col style="width:${w}px;">`).join('')}
        </colgroup>
        <thead>
          <tr>
            <th data-col="0"><span>序号</span><div class="col-resize" data-col="0"></div></th>
            <th data-col="1"><span>车书名称</span><div class="col-resize" data-col="1"></div></th>
            <th data-col="2"><span>版本号</span><div class="col-resize" data-col="2"></div></th>
            <th data-col="3"><span>状态</span><div class="col-resize" data-col="3"></div></th>
            <th data-col="4"><span>生效状态</span><div class="col-resize" data-col="4"></div></th>
            <th class="sort-header" data-sort="createTime" data-col="5"><span>创建时间 ${renderSortIcon('createTime')}</span><div class="col-resize" data-col="5"></div></th>
            <th class="sort-header" data-sort="updateTime" data-col="6"><span>更新时间 ${renderSortIcon('updateTime')}</span><div class="col-resize" data-col="6"></div></th>
            <th data-col="7"><span>操作</span><div class="col-resize" data-col="7"></div></th>
          </tr>
        </thead>
        <tbody id="up-tbody">
          ${list.map((u, i) => {
            const s = CS_STATUS_MAP[u.status] || {};
            return `
              <tr data-status="${u.status}" data-active="${u.activeStatus}" data-name="${escapeHtml(u.name)}">
                <td>${i + 1}</td>
                <td><a href="javascript:void(0)" class="link-name" data-id="${u.id}" data-version="${u.version}">${escapeHtml(u.name)}</a></td>
                <td>${escapeHtml(u.version)}</td>
                <td><span class="tag ${s.cls}">${s.text}</span></td>
                <td><span class="tag ${u.activeStatus === '已生效' ? 'tag-success' : 'tag-draft'}">${u.activeStatus}</span></td>
                <td>${formatDate(u.createTime)}</td>
                <td>${formatDate(u.updateTime)}</td>
                <td class="table-actions">${renderUploadActions(u)}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderUploadActions(u) {
  const btns = [];
  // 更新版本：已上线+已生效
  if (u.status === 'online' && u.activeStatus === '已生效') {
    btns.push(`<button class="btn btn-sm btn-primary" data-act="upgrade" data-id="${u.id}" data-version="${u.version}">更新版本</button>`);
  }
  // 编辑：草稿或已撤销
  if (u.status === 'draft' || u.status === 'revoked') {
    btns.push(`<button class="btn btn-sm btn-secondary" data-act="edit" data-id="${u.id}" data-version="${u.version}">编辑</button>`);
  }
  // 撤回：待生成知识库
  if (u.status === 'pending_gen') {
    btns.push(`<button class="btn btn-sm btn-danger" data-act="withdraw" data-id="${u.id}" data-version="${u.version}">撤回</button>`);
  }
  // 删除：草稿或已撤销
  if (u.status === 'draft' || u.status === 'revoked') {
    btns.push(`<button class="btn btn-sm btn-danger" data-act="delete" data-id="${u.id}" data-version="${u.version}">删除</button>`);
  }
  return btns.join('');
}

function bindUpload() {
  // 搜索与筛选
  const search = document.getElementById('up-search');
  const fStatus = document.getElementById('up-filter-status');
  const fActive = document.getElementById('up-filter-active');
  function applyFilter() {
    const q = (search?.value || '').toLowerCase();
    const st = fStatus?.value || 'all';
    const ac = fActive?.value || 'all';
    document.querySelectorAll('#up-tbody tr').forEach(r => {
      const matchQ = r.dataset.name.toLowerCase().includes(q);
      const matchS = st === 'all' || r.dataset.status === st;
      const matchA = ac === 'all' || r.dataset.active === ac;
      r.style.display = matchQ && matchS && matchA ? '' : 'none';
    });
  }
  search?.addEventListener('input', applyFilter);
  fStatus?.addEventListener('change', applyFilter);
  fActive?.addEventListener('change', applyFilter);
  document.getElementById('up-reset')?.addEventListener('click', () => {
    if (search) search.value = '';
    if (fStatus) fStatus.value = 'all';
    if (fActive) fActive.value = 'all';
    applyFilter();
  });

  // 排序
  document.querySelectorAll('.sort-header').forEach(th => {
    th.addEventListener('click', () => {
      if (resizeJustEnded) { resizeJustEnded = false; return; }
      const field = th.dataset.sort;
      if (state.uploadSort.field === field) {
        state.uploadSort.order = state.uploadSort.order === 'desc' ? 'asc' : 'desc';
      } else {
        state.uploadSort.field = field;
        state.uploadSort.order = 'desc';
      }
      render();
    });
  });

  // 列宽拖拽调整
  bindColumnResize('colWidths');

  // 上传车书
  document.getElementById('btn-add-cs')?.addEventListener('click', () => {
    openCsModal('add');
  });

  // 点击名称进入详情
  document.querySelectorAll('.link-name').forEach(link => {
    link.addEventListener('click', () => {
      const id = link.dataset.id;
      const version = link.dataset.version;
      const item = state.uploads.find(x => x.id === id && x.version === version);
      if (item) {
        state.detailItem = item;
        state.detailType = 'upload';
        render();
      }
    });
  });

  // 操作按钮
  document.querySelectorAll('[data-act]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const version = btn.dataset.version;
      const u = state.uploads.find(x => x.id === id && x.version === version);
      if (!u) return;
      const act = btn.dataset.act;
      if (act === 'delete') {
        if (confirm('确定要删除该车书吗？')) {
          state.uploads = state.uploads.filter(x => !(x.id === id && x.version === version));
          render();
        }
      } else if (act === 'edit') {
        openCsModal('edit', u);
      } else if (act === 'upgrade') {
        openCsModal('upgrade', u);
      } else if (act === 'withdraw') {
        if (confirm('确定要撤回该车书吗？')) {
          u.status = 'revoked';
          u.activeStatus = '未生效';
          u.updateTime = new Date().toLocaleString('zh-CN');
          render();
        }
      }
    });
  });
}

// ========== 车书上传：详情页 ==========
function renderUploadDetail(item) {
  const s = CS_STATUS_MAP[item.status] || {};
  document.getElementById('breadcrumb-current').textContent = '车书详情';
  return `
    <div class="page-header">
      <div class="page-title">车书详情</div>
    </div>
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <h3 style="font-size:16px;font-weight:600;">基本信息</h3>
        <button class="btn btn-secondary" id="detail-back">返回列表</button>
      </div>
      <div class="detail-row"><div class="detail-label">车书名称</div><div class="detail-value">${escapeHtml(item.name)}</div></div>
      <div class="detail-row"><div class="detail-label">车书状态</div><div class="detail-value"><span class="tag ${s.cls}">${s.text}</span></div></div>
      <div class="detail-row"><div class="detail-label">生效状态</div><div class="detail-value"><span class="tag ${item.activeStatus === '已生效' ? 'tag-success' : 'tag-draft'}">${item.activeStatus}</span></div></div>
      <div class="detail-row"><div class="detail-label">创建时间</div><div class="detail-value">${escapeHtml(item.createTime)}</div></div>
      <div class="detail-row"><div class="detail-label">车书ID</div><div class="detail-value">${escapeHtml(item.id)}</div></div>
      <div class="detail-row"><div class="detail-label">版本号</div><div class="detail-value">${escapeHtml(item.version)}</div></div>
      <div class="detail-row"><div class="detail-label">简介</div><div class="detail-value">${escapeHtml(item.desc)}</div></div>
      <div class="detail-row">
        <div class="detail-label">附件</div>
        <div class="detail-value">
          <div style="display:flex;align-items:center;gap:12px;background:#f9fafb;padding:10px 14px;border-radius:6px;max-width:480px;">
            <span style="font-size:20px;">📦</span>
            <div style="flex:1;">
              <div style="font-weight:500;">${escapeHtml(item.fileName)}</div>
              <div style="font-size:12px;color:#6b7280;">${escapeHtml(item.fileSize)} · 上传于 ${escapeHtml(item.uploadTime)}</div>
            </div>
            <button class="btn btn-sm btn-secondary" id="detail-download">下载</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindUploadDetail() {
  document.getElementById('detail-back')?.addEventListener('click', () => {
    state.detailItem = null;
    state.detailType = null;
    document.getElementById('breadcrumb-current').textContent = '车书上传';
    render();
  });
  document.getElementById('detail-download')?.addEventListener('click', () => {
    alert('演示版本：模拟下载「' + state.detailItem.fileName + '」');
  });
}

// ========== 车书弹窗（新增 / 编辑 / 更新版本） ==========
let csModalFile = null;

function openCsModal(mode, item) {
  const isAdd = mode === 'add';
  const isEdit = mode === 'edit';
  const isUpgrade = mode === 'upgrade';
  const title = isAdd ? '上传车书' : isEdit ? '编辑车书' : '更新版本';

  const nameVal = isAdd ? '' : escapeHtml(item.name);
  const descVal = isAdd ? '' : escapeHtml(item.desc);
  const fileNameVal = isAdd ? '' : escapeHtml(item.fileName);
  const fileSizeVal = isAdd ? '' : escapeHtml(item.fileSize);

  let body = '';

  if (isAdd || isEdit) {
    const nameEditable = isAdd || item.version === '1.0';
    body = `
      <div class="form-row">
        <label class="form-label">车书名称 <span style="color:#ef4444;">*</span></label>
        <input class="form-input" id="cs-name" value="${nameVal}" placeholder="请输入车书名称" ${nameEditable ? '' : 'disabled'} maxlength="50" />
        <div class="form-hint">2~50个字符，不含 \/:*?"<>| 等特殊符号</div>
        <div class="form-error" id="err-name" style="display:none;color:#ef4444;font-size:12px;margin-top:4px;"></div>
      </div>
      <div class="form-row">
        <label class="form-label">简介 <span style="color:#ef4444;">*</span></label>
        <textarea class="form-textarea" id="cs-desc" placeholder="请输入车书简介" maxlength="1000">${descVal}</textarea>
        <div class="form-hint">限1000字以内</div>
        <div class="form-error" id="err-desc" style="display:none;color:#ef4444;font-size:12px;margin-top:4px;">请输入车书简介</div>
      </div>
      <div class="form-row">
        <label class="form-label">附件 <span style="color:#ef4444;">*</span></label>
        ${isEdit ? `<div style="margin-bottom:8px;font-size:13px;color:#6b7280;">当前附件：${fileNameVal}（${fileSizeVal}）</div>` : ''}
        <div class="upload-zone" id="cs-upload-zone" style="padding:24px 20px;">
          <div class="upload-icon" style="font-size:28px;">📎</div>
          <div class="upload-title" id="cs-file-label">${isEdit ? '点击或拖拽替换附件' : '点击或拖拽文件到此区域上传'}</div>
          <div class="upload-hint">支持 .docx / .pdf / .md / .zip，单个文件不超过 100MB</div>
          <input type="file" class="upload-input" id="cs-file-input" accept=".docx,.pdf,.md,.zip" />
        </div>
        <div class="form-error" id="err-file" style="display:none;color:#ef4444;font-size:12px;margin-top:4px;">请上传车书附件</div>
      </div>
    `;
  } else if (isUpgrade) {
    const nextVer = incrementVersion(item.version);
    body = `
      <div class="form-row">
        <label class="form-label">车书名称</label>
        <input class="form-input" value="${nameVal}" disabled />
      </div>
      <div class="form-row">
        <label class="form-label">车书ID</label>
        <input class="form-input" value="${escapeHtml(item.id)}" disabled />
      </div>
      <div class="form-row">
        <label class="form-label">当前版本</label>
        <input class="form-input" value="${escapeHtml(item.version)}" disabled />
      </div>
      <div class="form-row">
        <label class="form-label">新版本号</label>
        <input class="form-input" value="${nextVer}" disabled />
      </div>
      <div class="form-row">
        <label class="form-label">简介</label>
        <textarea class="form-textarea" id="cs-desc">${descVal}</textarea>
      </div>
      <div class="form-row">
        <label class="form-label">新附件 <span style="color:#ef4444;">*</span></label>
        <div class="upload-zone" id="cs-upload-zone" style="padding:24px 20px;">
          <div class="upload-icon" style="font-size:28px;">📎</div>
          <div class="upload-title" id="cs-file-label">点击或拖拽新附件到此区域上传</div>
          <div class="upload-hint">支持 .docx / .pdf / .md / .zip，单个文件不超过 100MB</div>
          <input type="file" class="upload-input" id="cs-file-input" accept=".docx,.pdf,.md,.zip" />
        </div>
        <div class="form-error" id="err-file" style="display:none;color:#ef4444;font-size:12px;margin-top:4px;">请上传新附件</div>
      </div>
    `;
  }

  const footer = [
    { text: '取消', cls: 'btn-secondary', action: closeModal },
  ];

  if (isAdd || isEdit) {
    footer.unshift({ text: '保存草稿', cls: 'btn-secondary', action: () => saveCsModal(mode, item, 'draft') });
    footer.push({ text: '提交', cls: 'btn-primary', action: () => saveCsModal(mode, item, 'submit') });
  } else {
    footer.push({ text: '提交', cls: 'btn-primary', action: () => saveCsModal(mode, item, 'submit') });
  }

  showModal(title, body, footer);

  setTimeout(() => {
    const zone = document.getElementById('cs-upload-zone');
    const input = document.getElementById('cs-file-input');
    const label = document.getElementById('cs-file-label');
    if (!zone || !input) return;
    zone.addEventListener('click', () => input.click());
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('dragover');
      const files = e.dataTransfer.files;
      if (files.length) { csModalFile = formatFile(files[0]); label.textContent = files[0].name; }
    });
    input.addEventListener('change', e => {
      if (e.target.files.length) { csModalFile = formatFile(e.target.files[0]); label.textContent = e.target.files[0].name; }
    });
  }, 0);
}

function saveCsModal(mode, item, actionType) {
  const isAdd = mode === 'add';
  const isEdit = mode === 'edit';
  const isUpgrade = mode === 'upgrade';

  let valid = true;
  let name = '';
  let desc = '';

  if (isAdd || isEdit) {
    name = (document.getElementById('cs-name')?.value || '').trim();
    desc = (document.getElementById('cs-desc')?.value || '').trim();

    const nameInput = document.getElementById('cs-name');
    const errName = document.getElementById('err-name');
    if (!name) {
      errName.textContent = '请输入车书名称';
      errName.style.display = 'block';
      valid = false;
    } else if (name.length < 2) {
      errName.textContent = '请输入2~50个字符';
      errName.style.display = 'block';
      valid = false;
    } else if (/[\\/:*?"<>|]/.test(name)) {
      errName.textContent = '名称含非法特殊字符，请重新输入';
      errName.style.display = 'block';
      valid = false;
    } else if (state.uploads.some(u => u.name === name && (isAdd || u.id !== item.id))) {
      errName.textContent = '该车书名称已存在，请修改后重新输入';
      errName.style.display = 'block';
      valid = false;
    } else {
      errName.style.display = 'none';
    }

    if (!desc) {
      document.getElementById('err-desc').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('err-desc').style.display = 'none';
    }
  } else {
    desc = (document.getElementById('cs-desc')?.value || '').trim();
  }

  let newFile = csModalFile;
  const allowedExts = ['.docx', '.pdf', '.md', '.zip'];
  const maxSize = 100 * 1024 * 1024; // 100MB
  if (isAdd) {
    if (!newFile) {
      document.getElementById('err-file').style.display = 'block';
      document.getElementById('err-file').textContent = '请上传车书附件';
      valid = false;
    } else {
      document.getElementById('err-file').style.display = 'none';
    }
  }
  if (isUpgrade && !newFile) {
    document.getElementById('err-file').style.display = 'block';
    document.getElementById('err-file').textContent = '请上传新附件';
    valid = false;
  }
  // 格式和大小校验
  if (newFile) {
    const ext = '.' + newFile.name.split('.').pop().toLowerCase();
    if (!allowedExts.includes(ext)) {
      document.getElementById('err-file').style.display = 'block';
      document.getElementById('err-file').textContent = '仅支持 .docx / .pdf / .md / .zip 格式';
      valid = false;
    } else if (newFile.rawSize && newFile.rawSize > maxSize) {
      document.getElementById('err-file').style.display = 'block';
      document.getElementById('err-file').textContent = '文件大小不能超过 100MB';
      valid = false;
    } else {
      document.getElementById('err-file').style.display = 'none';
    }
  }
  if (!valid) return;

  const now = new Date().toLocaleString('zh-CN');

  if (isAdd) {
    const newId = generateId();
    const newItem = {
      id: newId,
      name,
      desc,
      version: '1.0',
      status: actionType === 'draft' ? 'draft' : 'pending_gen',
      activeStatus: '未生效',
      createTime: now,
      updateTime: now,
      uploadTime: now,
      fileName: newFile.name,
      fileSize: newFile.size,
      genStatus: 'pending',
      genTime: '--',
    };
    state.uploads.unshift(newItem);
  } else if (isEdit) {
    if (item.version === '1.0') item.name = name;
    item.desc = desc;
    if (newFile) { item.fileName = newFile.name; item.fileSize = newFile.size; }
    item.updateTime = now;
    if (actionType === 'submit' && item.status === 'draft') {
      item.status = 'pending_gen';
    }
    if (actionType === 'submit' && item.status === 'revoked') {
      item.status = 'pending_gen';
    }
  } else if (isUpgrade) {
    const nextVer = incrementVersion(item.version);
    // 原版本变为未生效
    item.activeStatus = '未生效';
    item.updateTime = now;
    // 创建新版本
    state.uploads.unshift({
      id: item.id,
      name: item.name,
      desc,
      version: nextVer,
      status: 'pending_review',
      activeStatus: '未生效',
      createTime: now,
      updateTime: now,
      uploadTime: now,
      fileName: newFile.name,
      fileSize: newFile.size,
      genStatus: 'pending',
      genTime: '--',
    });
  }

  csModalFile = null;
  closeModal();
  render();
}

function formatFile(f) {
  const sizeKB = f.size / 1024;
  const size = sizeKB > 1024 ? (sizeKB / 1024).toFixed(1) + ' MB' : sizeKB.toFixed(1) + ' KB';
  return { name: f.name, size, rawSize: f.size };
}

function incrementVersion(ver) {
  const m = ver.match(/(\d+)\.(\d+)/);
  if (!m) return '2.0';
  const major = parseInt(m[1], 10) + 1;
  return `${major}.0`;
}

// ========== 视图：生成知识库 ==========
function renderGenerate() {
  const list = state.uploads.filter(u => u.status !== 'draft');
  return `
    <div class="page-header">
      <div class="page-title">生成知识库</div>
      <div class="page-desc">对已上传的车书进行知识库生成操作，支持生成、暂停、继续和取消。</div>
    </div>
    <div class="card">
      <div class="toolbar">
        <div class="toolbar-left"><strong style="font-size:15px;">知识库生成列表</strong></div>
        <div class="toolbar-left">
          <input type="text" class="search-input" id="gen-search" placeholder="搜索车书名称..." />
        </div>
      </div>
      ${renderGenerateTable(list)}
    </div>
  `;
}

function renderGenerateTable(list) {
  if (list.length === 0) {
    return `<div class="empty"><div class="empty-icon">📦</div>暂无数据，请先到「车书上传」页面提交车书</div>`;
  }
  return `
    <div class="table-wrap">
      <table class="resizable-table">
        <colgroup>
          ${state.genColWidths.map(w => `<col style="width:${w}px;">`).join('')}
        </colgroup>
        <thead>
          <tr>
            <th data-col="0"><span>序号</span><div class="col-resize" data-col="0"></div></th>
            <th data-col="1"><span>车书名称</span><div class="col-resize" data-col="1"></div></th>
            <th data-col="2"><span>版本号</span><div class="col-resize" data-col="2"></div></th>
            <th data-col="3"><span>状态</span><div class="col-resize" data-col="3"></div></th>
            <th data-col="4"><span>生成时间</span><div class="col-resize" data-col="4"></div></th>
            <th data-col="5"><span>操作</span><div class="col-resize" data-col="5"></div></th>
          </tr>
        </thead>
        <tbody id="gen-tbody">
          ${list.map((u, i) => {
            const gs = GEN_STATUS_MAP[u.genStatus] || {};
            return `
              <tr data-name="${escapeHtml(u.name)}">
                <td>${i + 1}</td>
                <td>${escapeHtml(u.name)}</td>
                <td>${escapeHtml(u.version)}</td>
                <td><span class="tag ${gs.cls}">${gs.text}</span></td>
                <td>${escapeHtml(u.genTime)}</td>
                <td class="table-actions" id="gen-actions-${u.id}-${u.version}">${renderGenActions(u)}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderGenActions(u) {
  const btns = [];
  if (u.genStatus === 'pending' || u.genStatus === 'failed') {
    btns.push(`<button class="btn btn-sm btn-primary" data-act="gen-start" data-id="${u.id}" data-version="${u.version}">生成</button>`);
  }
  if (u.genStatus === 'processing') {
    btns.push(`<button class="btn btn-sm btn-warning" data-act="gen-pause" data-id="${u.id}" data-version="${u.version}">暂停</button>`);
    btns.push(`<button class="btn btn-sm btn-danger" data-act="gen-cancel" data-id="${u.id}" data-version="${u.version}">取消</button>`);
  }
  if (u.genStatus === 'paused') {
    btns.push(`<button class="btn btn-sm btn-primary" data-act="gen-resume" data-id="${u.id}" data-version="${u.version}">继续</button>`);
    btns.push(`<button class="btn btn-sm btn-danger" data-act="gen-cancel" data-id="${u.id}" data-version="${u.version}">取消</button>`);
  }
  if (u.genStatus === 'failed' && u.genError) {
    btns.push(`<span style="font-size:11px;color:#dc2626;margin-left:4px;" title="${escapeHtml(u.genError)}">${escapeHtml(u.genError.slice(0, 30))}...</span>`);
  }
  return btns.join('');
}

function bindGenerate() {
  const search = document.getElementById('gen-search');
  if (search) {
    search.addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('#gen-tbody tr').forEach(r => {
        r.style.display = r.dataset.name.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }

  bindColumnResize('genColWidths');

  document.querySelectorAll('[data-act]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const version = btn.dataset.version;
      const u = state.uploads.find(x => x.id === id && x.version === version);
      if (!u) return;
      const act = btn.dataset.act;

      if (act === 'gen-start') {
        startGeneration(u);
      } else if (act === 'gen-pause') {
        pauseGeneration(u);
      } else if (act === 'gen-resume') {
        resumeGeneration(u);
      } else if (act === 'gen-cancel') {
        cancelGeneration(u);
      }
    });
  });
}

async function startGeneration(u) {
  u.genStatus = 'processing';
  u.genTime = '--';
  u._genAbort = false;
  u._genPaused = false;
  render();

  try {
    const systemPrompt = '你是一个知识库生成专家，需要根据车书信息创建结构化知识库。请用中文输出，包含核心章节标题和关键知识点。';
    const userPrompt = `请基于以下车书信息生成知识库：\n\n【车书名称】${u.name}\n【版本号】${u.version}\n【简介】${u.desc}\n\n请生成一个结构化的知识库，包含：\n1. 概述（介绍该车书的核心内容）\n2. 核心章节与知识点\n3. 使用建议\n\n请用 Markdown 格式输出。`;

    const kbContent = await callLLM(systemPrompt, userPrompt);

    if (u._genAbort) return;

    u.genStatus = 'completed';
    u.genTime = new Date().toLocaleString('zh-CN');
    u._genAbort = false;
    u.status = 'pending_review';
    u.updateTime = new Date().toLocaleString('zh-CN');

    state.knowledgeBases.unshift({
      id: 'k' + Date.now(),
      name: u.name + u.version + '知识库',
      carBookName: u.name,
      status: 'review',
      genTime: u.genTime,
      reviewTime: '--',
      bookId: u.id,
      version: u.version,
      content: kbContent,
    });
  } catch (e) {
    if (u._genAbort) return;
    u.genStatus = 'failed';
    u.genError = e.message;
    console.error('知识库生成失败:', e);
  }
  render();
}

function pauseGeneration(u) {
  u._genPaused = true;
  // 暂停无法取消正在进行的 API 请求，但可以标记状态
  u.genStatus = 'paused';
  render();
}

function resumeGeneration(u) {
  u.genStatus = 'processing';
  u._genAbort = false;
  u._genPaused = false;
  render();

  // 异步调用 LLM
  (async () => {
    try {
      const systemPrompt = '你是一个知识库生成专家，需要根据车书信息创建结构化知识库。请用中文输出，包含核心章节标题和关键知识点。';
      const userPrompt = `请基于以下车书信息生成知识库：\n\n【车书名称】${u.name}\n【版本号】${u.version}\n【简介】${u.desc}\n\n请生成一个结构化的知识库，包含：\n1. 概述（介绍该车书的核心内容）\n2. 核心章节与知识点\n3. 使用建议\n\n请用 Markdown 格式输出。`;

      const kbContent = await callLLM(systemPrompt, userPrompt);

      if (u._genAbort) return;

      u.genStatus = 'completed';
      u.genTime = new Date().toLocaleString('zh-CN');
      u._genAbort = false;
      u.status = 'pending_review';
      u.updateTime = new Date().toLocaleString('zh-CN');

      state.knowledgeBases.unshift({
        id: 'k' + Date.now(),
        name: u.name + u.version + '知识库',
        carBookName: u.name,
        status: 'review',
        genTime: u.genTime,
        reviewTime: '--',
        bookId: u.id,
        version: u.version,
        content: kbContent,
      });
    } catch (e) {
      if (u._genAbort) return;
      u.genStatus = 'failed';
      u.genError = e.message;
      console.error('知识库生成失败:', e);
    }
    render();
  })();
}

function cancelGeneration(u) {
  u._genAbort = true;
  u.genStatus = 'pending';
  u.genTime = '--';
  render();
}

// ========== 视图：知识库审核 ==========
function renderReview() {
  const reviewList = state.knowledgeBases.filter(k => k.status === 'review' || k.status === 'approved' || k.status === 'rejected');
  return `
    <div class="page-header">
      <div class="page-title">知识库审核</div>
      <div class="page-desc">对已生成的知识库进行审核，审核通过后将在「知识库列表」中正式发布。</div>
    </div>
    <div class="card">
      <div class="toolbar">
        <div class="toolbar-left">
          <input type="text" class="search-input" id="rev-search" placeholder="搜索知识库名称..." />
          <select class="filter-select" id="rev-filter">
            <option value="all">全部状态</option>
            <option value="review">待审核</option>
            <option value="approved">审核通过</option>
            <option value="rejected">审核不通过</option>
          </select>
        </div>
      </div>
      ${renderReviewTable(reviewList)}
    </div>
  `;
}

function renderReviewTable(list) {
  if (list.length === 0) {
    return `<div class="empty"><div class="empty-icon">📋</div>暂无待审核的知识库，请先在「生成知识库」模块完成生成</div>`;
  }
  return `
    <div class="table-wrap">
      <table class="resizable-table">
        <colgroup>
          ${state.revColWidths.map(w => `<col style="width:${w}px;">`).join('')}
        </colgroup>
        <thead>
          <tr>
            <th data-col="0"><span>序号</span><div class="col-resize" data-col="0"></div></th>
            <th data-col="1"><span>车书名称</span><div class="col-resize" data-col="1"></div></th>
            <th data-col="2"><span>知识库名称</span><div class="col-resize" data-col="2"></div></th>
            <th data-col="3"><span>生成时间</span><div class="col-resize" data-col="3"></div></th>
            <th data-col="4"><span>状态</span><div class="col-resize" data-col="4"></div></th>
            <th data-col="5"><span>审核时间</span><div class="col-resize" data-col="5"></div></th>
            <th data-col="6"><span>操作</span><div class="col-resize" data-col="6"></div></th>
          </tr>
        </thead>
        <tbody id="rev-tbody">
          ${list.map((k, i) => {
            const rs = REVIEW_STATUS_MAP[k.status] || {};
            return `
              <tr data-status="${k.status}" data-name="${escapeHtml(k.name)}">
                <td>${i + 1}</td>
                <td>${escapeHtml(k.carBookName)}</td>
                <td><a class="link-name" data-id="${k.id}" data-type="review">${escapeHtml(k.name)}</a></td>
                <td>${escapeHtml(k.genTime)}</td>
                <td><span class="tag ${rs.cls}">${rs.text}</span></td>
                <td>${escapeHtml(k.reviewTime)}</td>
                <td class="table-actions">
                  <button class="btn btn-sm btn-secondary" data-act="view" data-id="${k.id}">查看</button>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function bindReview() {
  const search = document.getElementById('rev-search');
  const filter = document.getElementById('rev-filter');
  function applyFilter() {
    const q = (search?.value || '').toLowerCase();
    const f = filter?.value || 'all';
    document.querySelectorAll('#rev-tbody tr').forEach(r => {
      const matchQ = r.dataset.name.toLowerCase().includes(q);
      const matchF = f === 'all' || r.dataset.status === f;
      r.style.display = matchQ && matchF ? '' : 'none';
    });
  }
  search?.addEventListener('input', applyFilter);
  filter?.addEventListener('change', applyFilter);

  bindColumnResize('revColWidths');

  // 点击知识库名称进入详情
  document.querySelectorAll('.link-name').forEach(link => {
    link.addEventListener('click', () => {
      const k = state.knowledgeBases.find(x => x.id === link.dataset.id);
      if (k) {
        state.detailItem = k;
        state.detailType = 'review';
        render();
      }
    });
  });

  document.querySelectorAll('[data-act]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const k = state.knowledgeBases.find(x => x.id === id);
      if (!k) return;
      const act = btn.dataset.act;
      if (act === 'view') {
        const book = state.uploads.find(u => u.id === k.bookId && u.version === k.version);
        const bookInfo = book ? `
          <div class="detail-row"><div class="detail-label">车书名称</div><div class="detail-value">${escapeHtml(book.name)}</div></div>
          <div class="detail-row"><div class="detail-label">车书ID</div><div class="detail-value">${escapeHtml(book.id)}</div></div>
          <div class="detail-row"><div class="detail-label">版本</div><div class="detail-value">${escapeHtml(book.version)}</div></div>
          <div class="detail-row"><div class="detail-label">简介</div><div class="detail-value">${escapeHtml(book.desc)}</div></div>
          <div class="detail-row"><div class="detail-label">附件</div><div class="detail-value">${escapeHtml(book.fileName)}（${escapeHtml(book.fileSize)}）</div></div>
          <div class="detail-row"><div class="detail-label">创建时间</div><div class="detail-value">${escapeHtml(book.createTime)}</div></div>
        ` : '';
        const rs = REVIEW_STATUS_MAP[k.status] || {};
        showModal('知识库详情', `
          <div class="detail-row"><div class="detail-label">知识库名称</div><div class="detail-value">${escapeHtml(k.name)}</div></div>
          <div class="detail-row"><div class="detail-label">状态</div><div class="detail-value"><span class="tag ${rs.cls}">${rs.text}</span></div></div>
          <div class="detail-row"><div class="detail-label">生成时间</div><div class="detail-value">${escapeHtml(k.genTime)}</div></div>
          <div class="detail-row"><div class="detail-label">审核时间</div><div class="detail-value">${escapeHtml(k.reviewTime)}</div></div>
          <hr style="margin:12px 0;border:none;border-top:1px solid #f0f0f0;" />
          ${bookInfo}
          ${k.rejectReason ? `<div class="detail-row"><div class="detail-label">驳回原因</div><div class="detail-value" style="color:#dc2626;">${escapeHtml(k.rejectReason)}</div></div>` : ''}
        `, [
          { text: '试用', cls: 'btn-secondary', action: () => { closeModal(); showTryModal(k); } },
          { text: '退出', cls: 'btn-secondary', action: closeModal },
          ...(k.status === 'review' ? [
            { text: '通过', cls: 'btn-success', action: () => { closeModal(); handleApprove(k); } },
            { text: '不通过', cls: 'btn-danger', action: () => { closeModal(); handleReject(k); } },
          ] : []),
        ]);
      }
    });
  });
}

// ========== 知识库审核详情页 ==========
function renderReviewDetail(k) {
  const book = state.uploads.find(u => u.id === k.bookId && u.version === k.version);
  const rs = REVIEW_STATUS_MAP[k.status] || {};
  document.getElementById('breadcrumb-current').textContent = '知识库详情';
  return `
    <div class="page-header">
      <div class="page-title">知识库详情</div>
    </div>
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <h3 style="font-size:16px;font-weight:600;">基本信息</h3>
        <button class="btn btn-secondary" id="detail-back">返回列表</button>
      </div>
      <div class="detail-row"><div class="detail-label">知识库名称</div><div class="detail-value">${escapeHtml(k.name)}</div></div>
      <div class="detail-row"><div class="detail-label">审核状态</div><div class="detail-value"><span class="tag ${rs.cls}">${rs.text}</span></div></div>
      <div class="detail-row"><div class="detail-label">生成时间</div><div class="detail-value">${escapeHtml(k.genTime)}</div></div>
      <div class="detail-row"><div class="detail-label">审核时间</div><div class="detail-value">${escapeHtml(k.reviewTime)}</div></div>
      ${k.rejectReason ? `<div class="detail-row"><div class="detail-label">驳回原因</div><div class="detail-value" style="color:#dc2626;">${escapeHtml(k.rejectReason)}</div></div>` : ''}
      ${book ? `
      <hr style="margin:16px 0;border:none;border-top:1px solid #f0f0f0;" />
      <h3 style="font-size:16px;font-weight:600;margin-bottom:12px;">关联车书</h3>
      <div class="detail-row"><div class="detail-label">车书名称</div><div class="detail-value">${escapeHtml(book.name)}</div></div>
      <div class="detail-row"><div class="detail-label">车书ID</div><div class="detail-value">${escapeHtml(book.id)}</div></div>
      <div class="detail-row"><div class="detail-label">版本</div><div class="detail-value">${escapeHtml(book.version)}</div></div>
      <div class="detail-row"><div class="detail-label">简介</div><div class="detail-value">${escapeHtml(book.desc)}</div></div>
      <div class="detail-row"><div class="detail-label">附件</div><div class="detail-value">${escapeHtml(book.fileName)}（${escapeHtml(book.fileSize)}）</div></div>
      ` : ''}
      ${k.status === 'review' ? `
      <div style="margin-top:20px;display:flex;gap:12px;">
        <button class="btn btn-success" id="detail-approve">通过</button>
        <button class="btn btn-danger" id="detail-reject">不通过</button>
      </div>
      ` : ''}
    </div>
  `;
}

function bindReviewDetail() {
  document.getElementById('detail-back')?.addEventListener('click', () => {
    state.detailItem = null;
    state.detailType = null;
    document.getElementById('breadcrumb-current').textContent = '知识库审核';
    render();
  });
  document.getElementById('detail-approve')?.addEventListener('click', () => {
    handleApprove(state.detailItem);
    state.detailItem = null;
    state.detailType = null;
    document.getElementById('breadcrumb-current').textContent = '知识库审核';
    render();
  });
  document.getElementById('detail-reject')?.addEventListener('click', () => {
    handleReject(state.detailItem);
    state.detailItem = null;
    state.detailType = null;
    document.getElementById('breadcrumb-current').textContent = '知识库审核';
    render();
  });
}

function handleApprove(k) {
  if (!confirm('确定通过「' + k.name + '」的审核？')) return;
  k.status = 'approved';
  k.reviewTime = new Date().toLocaleString('zh-CN');
  const book = state.uploads.find(u => u.id === k.bookId && u.version === k.version);
  if (book) {
    book.status = 'online';
    book.updateTime = new Date().toLocaleString('zh-CN');
    const sameBooks = state.uploads.filter(u => u.id === k.bookId);
    sameBooks.forEach(b => { b.activeStatus = '未生效'; });
    book.activeStatus = '已生效';
  }
  render();
}

function handleReject(k) {
  showModal('审核不通过', `
    <div class="form-row"><label class="form-label">驳回原因</label><textarea class="form-textarea" id="reject-reason" placeholder="请填写驳回原因..."></textarea></div>
  `, [
    { text: '取消', cls: 'btn-secondary', action: closeModal },
    { text: '确认不通过', cls: 'btn-danger', action: () => {
      const reason = document.getElementById('reject-reason').value.trim() || '未填写原因';
      k.status = 'rejected';
      k.rejectReason = reason;
      k.reviewTime = new Date().toLocaleString('zh-CN');
      closeModal();
      render();
    }},
  ]);
}

function showTryModal(k) {
  const book = state.uploads.find(u => u.id === k.bookId && u.version === k.version);
  const sampleQA = [
    { q: '这辆车的主要功能有哪些？', a: '根据「' + k.carBookName + '」知识库，该车型主要功能包括：智能驾驶辅助系统、车载娱乐系统、语音控制、OTA远程升级、自动泊车等。详细信息请参考用户手册第2-4章。' },
    { q: '如何进行日常保养？', a: '建议每5000公里或6个月进行一次常规保养，包括更换机油、检查刹车系统、轮胎状况检测等。具体保养周期和项目请参考维修指南。' },
    { q: '电池续航是多少？', a: '根据「' + k.carBookName + '」的官方数据，标准续航版NEDC续航里程约为500-600公里，实际续航受驾驶习惯、路况和温度等因素影响。' },
  ];
  let chatHtml = `
    <div style="background:#f9fafb;border-radius:8px;padding:12px;margin-bottom:12px;max-height:240px;overflow-y:auto;" id="try-chat-area">
      <div style="text-align:center;color:#9ca3af;font-size:12px;margin-bottom:8px;">知识库试用 — 「${escapeHtml(k.name)}」</div>`;
  sampleQA.forEach(qa => {
    chatHtml += `
      <div style="margin-bottom:10px;">
        <div style="display:flex;justify-content:flex-end;margin-bottom:4px;">
          <div style="background:#1e40af;color:#fff;padding:6px 12px;border-radius:12px 12px 4px 12px;max-width:80%;font-size:13px;">${escapeHtml(qa.q)}</div>
        </div>
        <div style="display:flex;justify-content:flex-start;">
          <div style="background:#e5e7eb;color:#1f2937;padding:6px 12px;border-radius:12px 12px 12px 4px;max-width:80%;font-size:13px;">${escapeHtml(qa.a)}</div>
        </div>
      </div>`;
  });
  chatHtml += `</div>
    <div style="display:flex;gap:8px;">
      <input type="text" class="search-input" id="try-input" placeholder="输入问题试用知识库..." style="flex:1;" />
      <button class="btn btn-primary" id="try-send">发送</button>
    </div>`;

  showModal('知识库试用', chatHtml, [
    { text: '关闭', cls: 'btn-secondary', action: closeModal },
  ]);

  setTimeout(() => {
    const input = document.getElementById('try-input');
    const sendBtn = document.getElementById('try-send');
    const chatArea = document.getElementById('try-chat-area');
    if (!input || !sendBtn || !chatArea) return;

    function sendMsg() {
      const q = input.value.trim();
      if (!q) return;
      const msgHtml = `
        <div style="margin-bottom:10px;">
          <div style="display:flex;justify-content:flex-end;margin-bottom:4px;">
            <div style="background:#1e40af;color:#fff;padding:6px 12px;border-radius:12px 12px 4px 12px;max-width:80%;font-size:13px;">${escapeHtml(q)}</div>
          </div>
          <div style="display:flex;justify-content:flex-start;">
            <div style="background:#e5e7eb;color:#1f2937;padding:6px 12px;border-radius:12px 12px 12px 4px;max-width:80%;font-size:13px;">正在检索「${escapeHtml(k.name)}」知识库...</div>
          </div>
        </div>`;
      chatArea.insertAdjacentHTML('beforeend', msgHtml);
      chatArea.scrollTop = chatArea.scrollHeight;
      input.value = '';
      // 模拟回复
      setTimeout(() => {
        const replies = chatArea.querySelectorAll('div[style*="background:#e5e7eb"]');
        const lastReply = replies[replies.length - 1];
        if (lastReply) {
          lastReply.textContent = '根据「' + k.carBookName + '」知识库的内容，' + (sampleQA[Math.floor(Math.random() * sampleQA.length)].a);
        }
        chatArea.scrollTop = chatArea.scrollHeight;
      }, 800);
    }
    sendBtn.addEventListener('click', sendMsg);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(); });
  }, 0);
}

// ========== 视图：知识库列表 ==========
function renderList() {
  return `
    <div class="page-header">
      <div class="page-title">知识库列表</div>
      <div class="page-desc">查看所有已上线的知识库资源，支持搜索与下架操作。</div>
    </div>
    <div class="card">
      <div class="toolbar">
        <div class="toolbar-left">
          <strong style="font-size:15px;">知识库列表</strong>
          <span style="color:#6b7280;font-size:13px;">共 ${state.knowledgeBases.filter(k => k.status === 'approved').length} 条</span>
        </div>
        <div class="toolbar-left">
          <input type="text" class="search-input" id="list-search" placeholder="搜索知识库名称..." />
        </div>
      </div>
      ${renderListTable()}
    </div>
  `;
}

function renderListTable() {
  const approvedList = state.knowledgeBases.filter(k => k.status === 'approved');
  if (approvedList.length === 0) {
    return `<div class="empty"><div class="empty-icon">📚</div>暂无已上线的知识库，审核通过后自动出现在此列表</div>`;
  }
  return `
    <div class="table-wrap">
      <table class="resizable-table">
        <colgroup>
          ${state.listColWidths.map(w => `<col style="width:${w}px;">`).join('')}
        </colgroup>
        <thead>
          <tr>
            <th data-col="0"><span>序号</span><div class="col-resize" data-col="0"></div></th>
            <th data-col="1"><span>车书名称</span><div class="col-resize" data-col="1"></div></th>
            <th data-col="2"><span>版本号</span><div class="col-resize" data-col="2"></div></th>
            <th data-col="3"><span>知识库名称</span><div class="col-resize" data-col="3"></div></th>
            <th data-col="4"><span>生成时间</span><div class="col-resize" data-col="4"></div></th>
            <th data-col="5"><span>上线时间</span><div class="col-resize" data-col="5"></div></th>
            <th data-col="6"><span>操作</span><div class="col-resize" data-col="6"></div></th>
          </tr>
        </thead>
        <tbody id="list-tbody">
          ${approvedList.map((k, i) => {
            return `
              <tr data-name="${escapeHtml(k.name)}">
                <td>${i + 1}</td>
                <td>${escapeHtml(k.carBookName)}</td>
                <td>${escapeHtml(k.version)}</td>
                <td><a class="link-name" data-id="${k.id}" data-type="list">${escapeHtml(k.name)}</a></td>
                <td>${escapeHtml(k.genTime)}</td>
                <td>${escapeHtml(k.reviewTime)}</td>
                <td class="table-actions">
                  <button class="btn btn-sm btn-danger" data-act="delist" data-id="${k.id}">下架</button>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function bindList() {
  const search = document.getElementById('list-search');
  search?.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('#list-tbody tr').forEach(r => {
      r.style.display = r.dataset.name.toLowerCase().includes(q) ? '' : 'none';
    });
  });

  bindColumnResize('listColWidths');

  // 点击知识库名称进入详情
  document.querySelectorAll('.link-name').forEach(link => {
    link.addEventListener('click', () => {
      const k = state.knowledgeBases.find(x => x.id === link.dataset.id);
      if (k) {
        state.detailItem = k;
        state.detailType = 'list';
        render();
      }
    });
  });

  document.querySelectorAll('[data-act]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const k = state.knowledgeBases.find(x => x.id === id);
      if (!k) return;
      const act = btn.dataset.act;
      if (act === 'delist') {
        handleDelist(k);
      }
    });
  });
}

// ========== 知识库列表详情页 ==========
function renderListDetail(k) {
  const book = state.uploads.find(u => u.id === k.bookId && u.version === k.version);
  document.getElementById('breadcrumb-current').textContent = '知识库详情';
  return `
    <div class="page-header">
      <div class="page-title">知识库详情</div>
    </div>
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <h3 style="font-size:16px;font-weight:600;">基本信息</h3>
        <button class="btn btn-secondary" id="detail-back">返回列表</button>
      </div>
      <div class="detail-row"><div class="detail-label">知识库名称</div><div class="detail-value">${escapeHtml(k.name)}</div></div>
      <div class="detail-row"><div class="detail-label">版本号</div><div class="detail-value">${escapeHtml(k.version)}</div></div>
      <div class="detail-row"><div class="detail-label">生成时间</div><div class="detail-value">${escapeHtml(k.genTime)}</div></div>
      <div class="detail-row"><div class="detail-label">上线时间</div><div class="detail-value">${escapeHtml(k.reviewTime)}</div></div>
      <div class="detail-row"><div class="detail-label">状态</div><div class="detail-value"><span class="tag tag-success">已上线</span></div></div>
      ${book ? `
      <hr style="margin:16px 0;border:none;border-top:1px solid #f0f0f0;" />
      <h3 style="font-size:16px;font-weight:600;margin-bottom:12px;">关联车书</h3>
      <div class="detail-row"><div class="detail-label">车书名称</div><div class="detail-value">${escapeHtml(book.name)}</div></div>
      <div class="detail-row"><div class="detail-label">车书ID</div><div class="detail-value">${escapeHtml(book.id)}</div></div>
      <div class="detail-row"><div class="detail-label">版本</div><div class="detail-value">${escapeHtml(book.version)}</div></div>
      <div class="detail-row"><div class="detail-label">简介</div><div class="detail-value">${escapeHtml(book.desc)}</div></div>
      <div class="detail-row"><div class="detail-label">附件</div><div class="detail-value">${escapeHtml(book.fileName)}（${escapeHtml(book.fileSize)}）</div></div>
      ` : ''}
      <div style="margin-top:20px;">
        <button class="btn btn-danger" id="detail-delist">下架</button>
      </div>
    </div>
  `;
}

function bindListDetail() {
  document.getElementById('detail-back')?.addEventListener('click', () => {
    state.detailItem = null;
    state.detailType = null;
    document.getElementById('breadcrumb-current').textContent = '知识库列表';
    render();
  });
  document.getElementById('detail-delist')?.addEventListener('click', () => {
    handleDelist(state.detailItem);
    state.detailItem = null;
    state.detailType = null;
    document.getElementById('breadcrumb-current').textContent = '知识库列表';
    render();
  });
}

function handleDelist(k) {
  if (!confirm('确定下架「' + k.name + '」？下架后该知识库将不再对外开放。')) return;
  k.status = 'revoked';
  const book = state.uploads.find(u => u.id === k.bookId && u.version === k.version);
  if (book) {
    book.status = 'rollback';
    book.activeStatus = '未生效';
    book.updateTime = new Date().toLocaleString('zh-CN');
  }
  render();
}

// ========== 模态框 ==========
function showModal(title, bodyHtml, footerButtons) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHtml;
  const footer = document.getElementById('modal-footer');
  footer.innerHTML = '';
  if (footerButtons && footerButtons.length) {
    footerButtons.forEach(b => {
      const btn = document.createElement('button');
      btn.className = `btn ${b.cls || 'btn-secondary'}`;
      btn.textContent = b.text;
      btn.addEventListener('click', b.action);
      footer.appendChild(btn);
    });
  } else {
    const btn = document.createElement('button');
    btn.className = 'btn btn-secondary';
    btn.textContent = '关闭';
    btn.addEventListener('click', closeModal);
    footer.appendChild(btn);
  }
  document.getElementById('modal').hidden = false;
}

function closeModal() {
  csModalFile = null;
  document.getElementById('modal').hidden = true;
}

// ========== 启动 ==========
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  document.querySelectorAll('.menu-item').forEach(el => {
    el.addEventListener('click', () => switchView(el.dataset.view));
  });
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.querySelector('.modal-mask').addEventListener('click', closeModal);
  render();
});
