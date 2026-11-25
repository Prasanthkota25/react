// ===== STATE =====
let resRows = [];
let uberRows = [];
let accomRows = [];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  buildStepper();
  buildResTable();
  buildUberTable();
  buildAccomTable();
  setupTravelTypeListener();
  setupScrollSpy();
  addResRow();
  addUberRow();
  addAccomRow();
});

// ===== STEPPER =====
const STEPS = [
  { id: 'sec1', label: 'Travel Info' },
  { id: 'sec2', label: 'KYC Docs' },
  { id: 'sec3', label: 'Reservation' },
  { id: 'sec4', label: 'Uber' },
  { id: 'sec5', label: 'Accommodation' },
  { id: 'sec6', label: 'Advance' },
  { id: 'sec7', label: 'Billable' },
  { id: 'sec8', label: 'Approvals' },
];

function buildStepper() {
  const inner = document.getElementById('stepperInner');
  inner.innerHTML = STEPS.map((s, i) => `
    <a class="step-item" id="step${i}" href="#${s.id}" onclick="scrollToSec('${s.id}')">
      <div class="step-content">
        <div class="step-bubble" id="bubble${i}">${i + 1}</div>
        <span class="step-name">${s.label}</span>
      </div>
    </a>
    ${i < STEPS.length - 1 ? '<div class="step-sep"></div>' : ''}
  `).join('');
}

function scrollToSec(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 140;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

function setupScrollSpy() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = STEPS.findIndex(s => s.id === entry.target.id);
        if (idx !== -1) setActiveStep(idx);
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  STEPS.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) observer.observe(el);
  });
}

function setActiveStep(activeIdx) {
  STEPS.forEach((_, i) => {
    const stepEl = document.getElementById(`step${i}`);
    const bubble = document.getElementById(`bubble${i}`);
    if (!stepEl) return;
    stepEl.classList.remove('active', 'done');
    if (i < activeIdx) {
      stepEl.classList.add('done');
      bubble.textContent = '✓';
    } else if (i === activeIdx) {
      stepEl.classList.add('active');
      bubble.textContent = i + 1;
    } else {
      bubble.textContent = i + 1;
    }
  });
}

// ===== TRAVEL TYPE =====
function setupTravelTypeListener() {
  document.querySelectorAll('input[name="travelType"]').forEach(r => {
    r.addEventListener('change', () => {
      const isIntl = r.value === 'international';
      const kycNote = document.getElementById('kycNote');
      const kycFields = document.getElementById('kycFields');
      if (isIntl) {
        kycNote.style.display = 'none';
        kycFields.classList.remove('hidden');
      } else {
        kycNote.style.display = 'flex';
        kycFields.classList.add('hidden');
      }
    });
  });
}

// ===== SELECT HELPERS =====
function makeCountrySelect(val, onchange) {
  return `<select class="inp" onchange="${onchange}">
    <option value="">Country</option>
    ${COUNTRIES.map(c => `<option${c === val ? ' selected' : ''}>${c}</option>`).join('')}
  </select>`;
}

function makeStateSelect(country, val, onchange) {
  const states = STATES[country] || [];
  if (!states.length) return `<select class="inp" disabled><option>--</option></select>`;
  return `<select class="inp" onchange="${onchange}">
    <option value="">State</option>
    ${states.map(s => `<option${s === val ? ' selected' : ''}>${s}</option>`).join('')}
  </select>`;
}

function makeCitySelect(state, val, onchange) {
  const cities = CITIES[state] || [];
  if (!cities.length) return `<select class="inp" disabled><option>--</option></select>`;
  return `<select class="inp" onchange="${onchange}">
    <option value="">City</option>
    ${cities.map(c => `<option${c === val ? ' selected' : ''}>${c}</option>`).join('')}
  </select>`;
}

// ===== RESERVATION TABLE =====
function buildResTable() {
  const tbody = document.getElementById('resBody');
  if (!tbody) return;
  tbody.innerHTML = resRows.map((r, i) => {
    const airport = AIRPORTS[r.fromCity] || '';
    const toAirport = AIRPORTS[r.toCity] || '';
    const hours = Array.from({ length: 12 }, (_, h) => {
      const t = `${h + 1}:00`;
      return `<option${r.depHour === t ? ' selected' : ''}>${t}</option>`;
    }).join('');
    return `<tr>
      <td>
        <select class="inp" onchange="updateRes(${i},'mode',this.value)">
          <option value="">Mode</option>
          ${TRAVEL_MODES.map(m => `<option${m === r.mode ? ' selected' : ''}>${m}</option>`).join('')}
        </select>
      </td>
      <td><input type="date" class="inp" style="min-width:110px" value="${r.date}" onchange="updateRes(${i},'date',this.value)"></td>
      <td>${makeCountrySelect(r.fromCountry, `resCountry(${i},'from',this.value)`)}</td>
      <td>${makeStateSelect(r.fromCountry, r.fromState, `resState(${i},'from',this.value)`)}</td>
      <td>${makeCitySelect(r.fromState, r.fromCity, `resCity(${i},'from',this.value)`)}</td>
      <td class="airport-cell">${airport}</td>
      <td>${makeCountrySelect(r.toCountry, `resCountry(${i},'to',this.value)`)}</td>
      <td>${makeStateSelect(r.toCountry, r.toState, `resState(${i},'to',this.value)`)}</td>
      <td>${makeCitySelect(r.toState, r.toCity, `resCity(${i},'to',this.value)`)}</td>
      <td class="airport-cell">${toAirport}</td>
      <td style="white-space:nowrap">
        <select class="inp" style="width:75px" onchange="updateRes(${i},'depHour',this.value)">${hours}</select>
        <select class="inp" style="width:65px" onchange="updateRes(${i},'depAmPm',this.value)">
          <option${r.depAmPm === 'AM' ? ' selected' : ''}>AM</option>
          <option${r.depAmPm === 'PM' ? ' selected' : ''}>PM</option>
        </select>
      </td>
      <td><button class="del-btn" onclick="delResRow(${i})" title="Remove">✕</button></td>
    </tr>`;
  }).join('') || `<tr><td colspan="12" style="text-align:center;padding:20px;color:var(--text-hint);font-size:13px">No legs added. Click "+ Add Leg" to start.</td></tr>`;
}

function addResRow() {
  resRows.push({ mode: '', date: '', fromCountry: '', fromState: '', fromCity: '', toCountry: '', toState: '', toCity: '', depHour: '9:00', depAmPm: 'AM' });
  buildResTable();
}

function delResRow(i) {
  resRows.splice(i, 1);
  buildResTable();
}

function updateRes(i, key, val) {
  resRows[i][key] = val;
}

function resCountry(i, dir, val) {
  if (dir === 'from') { resRows[i].fromCountry = val; resRows[i].fromState = ''; resRows[i].fromCity = ''; }
  else { resRows[i].toCountry = val; resRows[i].toState = ''; resRows[i].toCity = ''; }
  buildResTable();
}

function resState(i, dir, val) {
  if (dir === 'from') { resRows[i].fromState = val; resRows[i].fromCity = ''; }
  else { resRows[i].toState = val; resRows[i].toCity = ''; }
  buildResTable();
}

function resCity(i, dir, val) {
  if (dir === 'from') resRows[i].fromCity = val;
  else resRows[i].toCity = val;
  buildResTable();
}

// ===== UBER TABLE =====
function buildUberTable() {
  const tbody = document.getElementById('uberBody');
  if (!tbody) return;
  tbody.innerHTML = uberRows.map((r, i) => `<tr>
    <td><input type="date" class="inp" style="min-width:120px" value="${r.date}" onchange="uberRows[${i}].date=this.value"></td>
    <td>
      <input type="text" class="inp" placeholder="City" value="${r.city}" oninput="uberRows[${i}].city=this.value" style="min-width:120px">
      <div style="font-size:10px;color:var(--text-hint);margin-top:2px">${r.city.length}/200</div>
    </td>
    <td>
      <input type="text" class="inp" placeholder="From Location" value="${r.from}" oninput="uberRows[${i}].from=this.value;this.nextElementSibling.textContent=this.value.length+'/400'" style="min-width:160px">
      <div style="font-size:10px;color:var(--text-hint);margin-top:2px">${r.from.length}/400</div>
    </td>
    <td>
      <input type="text" class="inp" placeholder="To Location" value="${r.to}" oninput="uberRows[${i}].to=this.value;this.nextElementSibling.textContent=this.value.length+'/400'" style="min-width:160px">
      <div style="font-size:10px;color:var(--text-hint);margin-top:2px">${r.to.length}/400</div>
    </td>
    <td><button class="del-btn" onclick="delUberRow(${i})">✕</button></td>
  </tr>`).join('') || `<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--text-hint);font-size:13px">No trips added.</td></tr>`;
}

function addUberRow() {
  uberRows.push({ date: '', city: '', from: '', to: '' });
  buildUberTable();
}

function delUberRow(i) {
  uberRows.splice(i, 1);
  buildUberTable();
}

function toggleUber(show) {
  document.getElementById('uberSection').style.display = show ? 'block' : 'none';
}

// ===== ACCOMMODATION TABLE =====
function buildAccomTable() {
  const tbody = document.getElementById('accomBody');
  if (!tbody) return;
  tbody.innerHTML = accomRows.map((r, i) => `<tr>
    <td>${makeCountrySelect(r.country, `accomCountry(${i},this.value)`)}</td>
    <td>${makeStateSelect(r.country, r.state, `accomState(${i},this.value)`)}</td>
    <td>${makeCitySelect(r.state, r.city, `accomCity(${i},this.value)`)}</td>
    <td><input type="date" class="inp" style="min-width:110px" value="${r.fromDate}" onchange="accomRows[${i}].fromDate=this.value"></td>
    <td><input type="date" class="inp" style="min-width:110px" value="${r.toDate}" onchange="accomRows[${i}].toDate=this.value"></td>
    <td>
      <select class="inp" onchange="accomRows[${i}].roomType=this.value">
        <option value="">Type</option>
        ${ROOM_TYPES.map(t => `<option${t === r.roomType ? ' selected' : ''}>${t}</option>`).join('')}
      </select>
    </td>
    <td><input type="number" class="inp" style="min-width:60px;max-width:70px" value="${r.persons}" min="1" max="10" onchange="accomRows[${i}].persons=this.value"></td>
    <td><textarea class="inp" rows="2" style="min-width:140px;font-size:12px" placeholder="Hotel name & contact..." onchange="accomRows[${i}].hotel=this.value">${r.hotel || ''}</textarea></td>
    <td><button class="del-btn" onclick="delAccomRow(${i})">✕</button></td>
  </tr>`).join('') || `<tr><td colspan="9" style="text-align:center;padding:20px;color:var(--text-hint);font-size:13px">No hotels added.</td></tr>`;
}

function addAccomRow() {
  accomRows.push({ country: '', state: '', city: '', fromDate: '', toDate: '', roomType: '', persons: '1', hotel: '' });
  buildAccomTable();
}

function delAccomRow(i) {
  accomRows.splice(i, 1);
  buildAccomTable();
}

function accomCountry(i, val) {
  accomRows[i].country = val; accomRows[i].state = ''; accomRows[i].city = '';
  buildAccomTable();
}

function accomState(i, val) {
  accomRows[i].state = val; accomRows[i].city = '';
  buildAccomTable();
}

function accomCity(i, val) {
  accomRows[i].city = val;
  buildAccomTable();
}

function toggleAccom(show) {
  document.getElementById('accomSection').style.display = show ? 'block' : 'none';
}

// ===== ADVANCE =====
function calcTotal() {
  const ids = ['advCash', 'moneyCard', 'accomExp', 'taxiExp', 'commExp', 'visaExp', 'otherExp'];
  const total = ids.reduce((sum, id) => {
    const el = document.getElementById(id);
    return sum + (parseFloat(el?.value) || 0);
  }, 0);
  const el = document.getElementById('totalAmount');
  const cur = document.getElementById('currency')?.value || 'USD';
  if (el) el.textContent = `${cur} ${total.toFixed(2)}`;
}

function toggleAdv(show) {
  document.getElementById('advSection').style.display = show ? 'block' : 'none';
}

// ===== BILLABLE =====
function toggleBill(isBillable) {
  const el = document.getElementById('billDocs');
  if (isBillable) el.classList.remove('hidden');
  else el.classList.add('hidden');
}

// ===== SUBMIT =====
function submitForm() {
  const declared = document.getElementById('declare')?.checked;
  if (!declared) {
    alert('Please check the declaration checkbox in the Approvals section before submitting.');
    scrollToSec('sec8');
    return;
  }
  const refId = 'TR-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 90000 + 10000);
  document.getElementById('refId').textContent = refId;
  document.getElementById('modalOverlay').classList.add('active');
}

function saveDraft() {
  const btn = document.querySelector('.btn-save');
  const orig = btn.textContent;
  btn.textContent = '✓ Draft Saved';
  btn.style.color = 'var(--green)';
  btn.style.borderColor = 'var(--green)';
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.color = '';
    btn.style.borderColor = '';
  }, 2000);
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

// Close modal on overlay click
document.getElementById('modalOverlay')?.addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

// Currency change updates total label
document.getElementById('currency')?.addEventListener('change', calcTotal);
