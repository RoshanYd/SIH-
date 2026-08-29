// SIH26017 — Mock Data Layer
// Every field maps to the design document's dataset-to-UI mapping (Section 52)
// All data is illustrative — no real government data

const AGENCIES = ['MoRTH', 'NHAI', 'Railways', 'NHSRCL', 'PGCIL', 'GAIL', 'AAI', 'State PWD'];
const SECTORS = ['Highway', 'Railway', 'Transmission', 'Pipeline', 'Airport', 'Metro', 'Industrial Corridor'];
const STAGES = ['3A', '3D', '3G', 'Compensation', 'Possession'];
const RISK_LEVELS = ['critical', 'high', 'medium', 'low'];
const CLEARANCE_STATUSES = ['Approved', 'Pending', 'Rejected', 'Not Required'];
const INTERVENTION_STATUSES = ['Open', 'In Progress', 'Awaiting External Response', 'Resolved', 'Closed'];
export const BOTTLENECK_CATEGORIES = ['Litigation', 'Compensation / Valuation', 'Statutory Clearance', 'Land Acquisition Progress', 'Utility Conflicts', 'Environmental / Forest', 'Administrative Processing'];

const STATES_DISTRICTS = {
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga'],
  'Uttar Pradesh': ['Agra', 'Lucknow', 'Varanasi', 'Prayagraj', 'Kanpur'],
  'Maharashtra': ['Pune', 'Nagpur', 'Nashik', 'Thane', 'Aurangabad'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru', 'Belagavi'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
};

function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomBetween(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randomDate(start, end) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split('T')[0];
}

const PROJECT_NAMES = [
  { name: '4-Laning of Patna–Gaya–Dobhi Section (NH-83)', short: 'NH-83 Patna–Gaya' },
  { name: '6-Laning of Delhi–Agra Expressway', short: 'Delhi–Agra Expressway' },
  { name: 'Pune–Nashik Semi High-Speed Rail', short: 'Pune–Nashik Rail' },
  { name: 'Nagpur–Mumbai Super Communication Expressway', short: 'Nagpur–Mumbai Exp' },
  { name: 'PGCIL 765kV Transmission Line Rajasthan', short: 'Rajasthan 765kV Line' },
  { name: 'Mumbai–Ahmedabad High Speed Rail (MAHSR)', short: 'MAHSR Bullet Train' },
  { name: 'Chennai–Bengaluru Expressway', short: 'Chennai–Bengaluru Exp' },
  { name: 'Delhi–Varanasi HSR Corridor', short: 'Delhi–Varanasi HSR' },
  { name: 'GAIL Jagdishpur–Haldia Pipeline', short: 'GAIL Pipeline' },
  { name: 'Jaipur–Udaipur NH-48 Widening', short: 'NH-48 Jaipur–Udaipur' },
  { name: 'Lucknow Metro Phase 2 Extension', short: 'Lucknow Metro Ph-2' },
  { name: 'Bihar Eastern Dedicated Freight Corridor', short: 'Bihar DFC' },
  { name: 'Patna Ring Road (NH-139)', short: 'Patna Ring Road' },
  { name: 'Agra–Lucknow Expressway Widening', short: 'Agra–Lucknow Exp' },
  { name: 'Varanasi–Prayagraj Highway Upgrade', short: 'Varanasi–Prayagraj' },
  { name: 'Bhopal–Indore Super Corridor', short: 'Bhopal–Indore Corridor' },
  { name: 'PGCIL 400kV Substation Kanpur', short: 'Kanpur 400kV Sub' },
  { name: 'AAI Bihta Airport Expansion', short: 'Bihta Airport' },
  { name: 'Coimbatore Bypass (NH-544)', short: 'Coimbatore Bypass' },
  { name: 'Mysuru–Bengaluru Expressway Ph-2', short: 'Mysuru–Bengaluru Ph-2' },
  { name: 'Gujarat Industrial Corridor Dholera SIR', short: 'Dholera SIR' },
  { name: 'Ahmedabad Metro Phase 1', short: 'Ahmedabad Metro' },
  { name: 'Surat–Vadodara Expressway', short: 'Surat–Vadodara Exp' },
  { name: 'Rajkot–Jamnagar Highway Upgrade', short: 'Rajkot–Jamnagar' },
  { name: 'Madurai–Thoothukudi Industrial Corridor', short: 'Madurai–Thoothukudi' },
  { name: 'Salem–Chennai 8-Lane Expressway', short: 'Salem–Chennai Exp' },
  { name: 'Hubballi–Dharwad BRT Corridor', short: 'Hubballi–Dharwad BRT' },
  { name: 'Mangaluru–Bengaluru Rail Doubling', short: 'Mangaluru–Bengaluru' },
  { name: 'Belagavi Ring Road', short: 'Belagavi Ring Road' },
  { name: 'Kota–Chittorgarh Highway NH-27', short: 'NH-27 Kota–Chittor' },
  { name: 'Ajmer–Jaipur Rail Electrification', short: 'Ajmer–Jaipur Rail' },
  { name: 'Jodhpur–Barmer Highway Expansion', short: 'Jodhpur–Barmer' },
  { name: 'Gwalior–Jhansi NH-75 Widening', short: 'Gwalior–Jhansi' },
  { name: 'Jabalpur–Nagpur NH-44 Upgrade', short: 'Jabalpur–Nagpur' },
  { name: 'Ujjain–Indore Metro Rail', short: 'Ujjain–Indore Metro' },
  { name: 'Thane–Borivali Twin Tunnel', short: 'Thane–Borivali Tunnel' },
  { name: 'Aurangabad DMIC Industrial Area', short: 'Aurangabad DMIC' },
  { name: 'Nashik–Trimbakeshwar Bypass', short: 'Nashik Bypass' },
  { name: 'Muzaffarpur–Sitamarhi NH-77', short: 'NH-77 Muzaffarpur' },
  { name: 'Darbhanga–Samastipur Rail Link', short: 'Darbhanga–Samastipur' },
  { name: 'Bhagalpur–Kahalgaon Bridge', short: 'Bhagalpur Bridge' },
  { name: 'PGCIL 220kV Line Gaya–Nawada', short: 'Gaya 220kV Line' },
  { name: 'Tiruchirappalli Airport Expansion', short: 'Trichy Airport' },
  { name: 'Kanpur–Lucknow Expressway Link', short: 'Kanpur–Lucknow Link' },
  { name: 'Gandhinagar–Ahmedabad Metro Extension', short: 'Gandhinagar Metro' },
  { name: 'Udaipur–Ahmedabad NH-48 6-Laning', short: 'NH-48 Udaipur–Ahmd' },
  { name: 'Prayagraj Ring Road', short: 'Prayagraj Ring Road' },
];

function generateProject(index) {
  const p = PROJECT_NAMES[index];
  const stateEntries = Object.entries(STATES_DISTRICTS);
  const [state, districts] = stateEntries[index % stateEntries.length];
  const district = districts[index % districts.length];
  const stage = STAGES[randomBetween(0, 4)];
  const stageIndex = STAGES.indexOf(stage);
  const landRequired = randomBetween(100, 2000);
  const acquiredPct = stageIndex >= 3 ? randomBetween(70, 98) : stageIndex >= 2 ? randomBetween(40, 85) : randomBetween(10, 50);
  const landAcquired = Math.round(landRequired * acquiredPct / 100);
  const landRemaining = landRequired - landAcquired;

  const riskIndex = index < 4 ? 0 : index < 15 ? 1 : index < 32 ? 2 : 3;
  const risk = RISK_LEVELS[riskIndex];

  const date3A = randomDate(new Date('2019-01-01'), new Date('2022-06-30'));
  const date3D = stageIndex >= 1 ? randomDate(new Date('2022-01-01'), new Date('2023-12-31')) : null;
  const date3G = stageIndex >= 2 ? randomDate(new Date('2023-06-01'), new Date('2024-12-31')) : null;

  const targetDate = randomDate(new Date('2024-01-01'), new Date('2027-12-31'));
  const sanctionDate = randomDate(new Date('2018-01-01'), new Date('2021-12-31'));
  const sanctionedCost = randomBetween(500, 25000);
  const projectLength = randomBetween(15, 550);

  const activeLitigation = risk === 'critical' ? randomBetween(10, 25) : risk === 'high' ? randomBetween(5, 15) : randomBetween(0, 5);
  const stayOrders = risk === 'critical' ? randomBetween(1, 3) : risk === 'high' ? randomBetween(0, 1) : 0;
  const arbitrationPetitions = Math.max(0, randomBetween(0, activeLitigation - 2));

  const districtPendency = randomBetween(2000, 30000);
  const avgDisposalDays = randomBetween(800, 5000);
  const uncontestedRatio = (randomBetween(40, 85) / 100).toFixed(3);

  const forestLand = randomBetween(0, Math.floor(landRequired * 0.3));
  const stage1Status = forestLand > 0 ? randomFrom(['Approved', 'Pending', 'Rejected']) : 'Not Required';
  const stage1Days = stage1Status !== 'Not Required' ? randomBetween(60, 500) : 0;
  const stage2Status = stage1Status === 'Approved' ? randomFrom(['Approved', 'Pending']) : stage1Status === 'Not Required' ? 'Not Required' : 'Pending';
  const eszOverlap = Math.random() > 0.8;

  const circleRateAgri = randomBetween(500, 8000);
  const circleRateNonAgri = randomBetween(5000, 50000);
  const marketValuation = randomBetween(circleRateAgri, circleRateNonAgri * 2);
  const valuationDiscrepancy = (marketValuation / ((circleRateAgri + circleRateNonAgri) / 2)).toFixed(2);

  const agriLandRatio = randomBetween(20, 95);
  const builtUpDensity = randomFrom(['Low', 'Medium', 'High']);
  const floodHazard = randomFrom(['Low', 'Medium', 'High']);
  const waterBodyIntersections = randomBetween(0, 8);
  const parcelFragmentation = randomFrom(['Low', 'Medium', 'High']);

  const riskDrivers = [];
  if (activeLitigation > 5) riskDrivers.push({ factor: 'Litigation', severity: activeLitigation > 12 ? 'high' : 'medium', detail: `${activeLitigation} active cases, ${stayOrders} stay orders` });
  if (acquiredPct < 60) riskDrivers.push({ factor: 'Land Acquisition Progress', severity: acquiredPct < 40 ? 'high' : 'medium', detail: `Only ${acquiredPct}% acquired, ${landRemaining} Ha remaining` });
  if (stage1Status === 'Rejected' || stage1Status === 'Pending') riskDrivers.push({ factor: 'Statutory Clearance', severity: stage1Status === 'Rejected' ? 'high' : 'medium', detail: `Stage 1: ${stage1Status}` });
  if (parseFloat(valuationDiscrepancy) > 1.5) riskDrivers.push({ factor: 'Compensation / Valuation', severity: parseFloat(valuationDiscrepancy) > 2.0 ? 'high' : 'medium', detail: `Valuation discrepancy: ${valuationDiscrepancy}×` });
  if (floodHazard === 'High' || parcelFragmentation === 'High') riskDrivers.push({ factor: 'Physical Complexity', severity: 'medium', detail: `Flood hazard: ${floodHazard}, Fragmentation: ${parcelFragmentation}` });
  if (riskDrivers.length === 0) riskDrivers.push({ factor: 'Administrative Processing', severity: 'low', detail: 'Minor processing delays' });

  const primaryBottleneck = riskDrivers[0]?.factor || 'None';

  const daysOverdue = risk === 'critical' ? randomBetween(150, 400) : risk === 'high' ? randomBetween(50, 200) : risk === 'medium' ? randomBetween(0, 80) : 0;

  const riskScore = risk === 'critical' ? randomBetween(85, 98) / 100 : risk === 'high' ? randomBetween(65, 84) / 100 : risk === 'medium' ? randomBetween(40, 64) / 100 : randomBetween(10, 39) / 100;

  const snapshots = [
    { date: '2026-02-01', riskLevel: 'low', landAcquiredPct: Math.max(10, acquiredPct - 30), activeLitigation: Math.max(0, activeLitigation - 8) },
    { date: '2026-04-01', riskLevel: risk === 'critical' ? 'medium' : 'low', landAcquiredPct: Math.max(15, acquiredPct - 20), activeLitigation: Math.max(0, activeLitigation - 5) },
    { date: '2026-06-01', riskLevel: risk === 'critical' ? 'high' : risk === 'high' ? 'medium' : 'low', landAcquiredPct: Math.max(20, acquiredPct - 10), activeLitigation: Math.max(0, activeLitigation - 2) },
    { date: '2026-08-28', riskLevel: risk, landAcquiredPct: acquiredPct, activeLitigation },
  ];

  return {
    id: `PRJ-${String(index + 1).padStart(3, '0')}`,
    name: p.name,
    shortName: p.short,
    agency: AGENCIES[index % AGENCIES.length],
    sector: SECTORS[index % SECTORS.length],
    location: { state, district, subdistrict: `${district} Tehsil` },
    sanctionDate,
    targetDate,
    sanctionedCost,
    projectLength,
    acquisition: {
      currentStage: stage,
      stageIndex,
      landRequiredHa: landRequired,
      landAcquiredHa: landAcquired,
      landRemainingHa: landRemaining,
      acquiredPct,
      milestones: [
        { stage: '3A', label: 'Section 3A Notification', date: date3A, status: 'completed', durationDays: null },
        { stage: '3D', label: 'Section 3D Declaration', date: date3D, status: date3D ? 'completed' : (stageIndex === 0 ? 'pending' : 'pending'), durationDays: date3D && date3A ? Math.round((new Date(date3D) - new Date(date3A)) / 86400000) : null },
        { stage: '3G', label: 'Section 3G Award', date: date3G, status: date3G ? 'completed' : (stageIndex <= 1 ? 'pending' : 'pending'), durationDays: date3G && date3D ? Math.round((new Date(date3G) - new Date(date3D)) / 86400000) : null },
        { stage: 'Compensation', label: 'Compensation & Payment', date: stageIndex >= 3 ? randomDate(new Date('2024-06-01'), new Date('2025-06-30')) : null, status: stageIndex >= 3 ? 'in-progress' : 'pending', durationDays: null },
        { stage: 'Possession', label: 'Possession', date: stageIndex >= 4 ? randomDate(new Date('2025-01-01'), new Date('2026-06-30')) : null, status: stageIndex >= 4 ? 'completed' : 'pending', durationDays: null },
      ],
      daysSinceLastMilestone: randomBetween(30, 400),
    },
    litigation: {
      projectLevel: { activeCases: activeLitigation, stayOrders, arbitrationPetitions },
      districtLevel: { pendingDisputes: districtPendency, avgDisposalDays, uncontestedRatio: parseFloat(uncontestedRatio) },
      exposure: activeLitigation > 10 ? 'high' : activeLitigation > 3 ? 'medium' : 'low',
    },
    clearances: {
      forestLandHa: forestLand,
      stage1: { status: stage1Status, processingDays: stage1Days },
      stage2: { status: stage2Status },
      eszOverlap,
      exposure: stage1Status === 'Rejected' ? 'critical' : stage1Status === 'Pending' && forestLand > 50 ? 'high' : stage1Status === 'Pending' ? 'medium' : 'low',
    },
    compensation: {
      circleRateAgricultural: circleRateAgri,
      circleRateNonAgricultural: circleRateNonAgri,
      marketValuation,
      valuationDiscrepancy: parseFloat(valuationDiscrepancy),
    },
    physicalComplexity: {
      agriculturalLandRatio: agriLandRatio,
      builtUpDensity,
      floodHazard,
      waterBodyIntersections,
      parcelFragmentation,
    },
    risk: {
      level: risk,
      score: riskScore,
      estimatedDelayDays: { min: daysOverdue, max: daysOverdue + randomBetween(30, 120) },
      drivers: riskDrivers,
      primaryBottleneck,
    },
    daysOverdue,
    snapshots,
    dataQuality: {
      completeness: randomBetween(75, 98),
      unavailableFields: randomBetween(0, 5),
      outdatedSources: randomBetween(0, 3),
    },
    lastUpdated: '2026-08-28',
    sources: ['BhoomiRashi', 'NJDG', 'PARIVESH'],
  };
}

export const projects = Array.from({ length: 47 }, (_, i) => generateProject(i));

export const interventions = [
  { id: 'INT-001', projectId: 'PRJ-001', projectName: 'NH-83 Patna–Gaya', issueCategory: 'Litigation', issue: 'Court stay affecting acquisition of 14 parcels', priority: 'critical', assignedTo: 'Legal / CALA', dueDate: '2026-09-02', status: 'Open', createdDate: '2026-08-20', notes: 'Urgent review needed — stay impacts 78 Ha.' },
  { id: 'INT-002', projectId: 'PRJ-002', projectName: 'Delhi–Agra Expressway', issueCategory: 'Compensation / Valuation', issue: 'Pending compensation disputes — 87 landowners', priority: 'high', assignedTo: 'CALA', dueDate: '2026-09-05', status: 'In Progress', createdDate: '2026-08-15', notes: 'Valuation discrepancy identified.' },
  { id: 'INT-003', projectId: 'PRJ-003', projectName: 'Pune–Nashik Rail', issueCategory: 'Statutory Clearance', issue: 'Stage 2 forest clearance pending', priority: 'high', assignedTo: 'Environment', dueDate: '2026-09-10', status: 'Awaiting External Response', createdDate: '2026-08-10', notes: 'Submitted to MoEFCC.' },
  { id: 'INT-004', projectId: 'PRJ-004', projectName: 'Nagpur–Mumbai Exp', issueCategory: 'Land Acquisition Progress', issue: 'Acquisition stalled — tribal land objections', priority: 'critical', assignedTo: 'District Admin', dueDate: '2026-09-01', status: 'Open', createdDate: '2026-08-22', notes: 'Public hearing scheduled.' },
  { id: 'INT-005', projectId: 'PRJ-005', projectName: 'Rajasthan 765kV Line', issueCategory: 'Utility Conflicts', issue: 'Existing pipeline relocation pending', priority: 'medium', assignedTo: 'GAIL / State PWD', dueDate: '2026-09-15', status: 'In Progress', createdDate: '2026-08-05', notes: '' },
  { id: 'INT-006', projectId: 'PRJ-007', projectName: 'Chennai–Bengaluru Exp', issueCategory: 'Compensation / Valuation', issue: 'Market rate dispute — valuation discrepancy 2.1×', priority: 'high', assignedTo: 'CALA', dueDate: '2026-09-12', status: 'Open', createdDate: '2026-08-25', notes: '' },
  { id: 'INT-007', projectId: 'PRJ-010', projectName: 'NH-48 Jaipur–Udaipur', issueCategory: 'Environmental / Forest', issue: 'ESZ overlap — additional assessment required', priority: 'medium', assignedTo: 'Environment', dueDate: '2026-09-20', status: 'Open', createdDate: '2026-08-18', notes: '' },
  { id: 'INT-008', projectId: 'PRJ-001', projectName: 'NH-83 Patna–Gaya', issueCategory: 'Litigation', issue: 'Arbitration petition review', priority: 'high', assignedTo: 'Legal', dueDate: '2026-08-28', status: 'Resolved', createdDate: '2026-07-15', notes: '7 petitions reviewed and addressed.' },
];

export const notifications = [
  { id: 1, type: 'risk_increase', message: 'NH-83 Patna–Gaya risk changed from High → Critical', projectId: 'PRJ-001', time: '2 hours ago', read: false },
  { id: 2, type: 'stage_stagnation', message: 'Delhi–Agra Expressway has exceeded expected duration at 3G stage', projectId: 'PRJ-002', time: '5 hours ago', read: false },
  { id: 3, type: 'intervention_overdue', message: 'Compensation follow-up for Nagpur–Mumbai Exp is overdue by 3 days', projectId: 'PRJ-004', time: '1 day ago', read: false },
  { id: 4, type: 'risk_decrease', message: 'Rajasthan 765kV Line risk improved from High → Medium', projectId: 'PRJ-005', time: '1 day ago', read: true },
  { id: 5, type: 'risk_increase', message: 'Chennai–Bengaluru Exp risk changed from Medium → High', projectId: 'PRJ-007', time: '2 days ago', read: true },
];

// Aggregation helpers
export function getDashboardData() {
  const active = projects.length;
  const critical = projects.filter(p => p.risk.level === 'critical').length;
  const high = projects.filter(p => p.risk.level === 'high').length;
  const medium = projects.filter(p => p.risk.level === 'medium').length;
  const low = projects.filter(p => p.risk.level === 'low').length;
  const totalLand = projects.reduce((sum, p) => sum + p.acquisition.landRequiredHa, 0);
  const attentionProjects = projects.filter(p => p.risk.level === 'critical' || p.risk.level === 'high').slice(0, 5);
  const openInterventions = interventions.filter(i => i.status === 'Open' || i.status === 'In Progress').length;

  const bottleneckCounts = {};
  projects.forEach(p => {
    const b = p.risk.primaryBottleneck;
    bottleneckCounts[b] = (bottleneckCounts[b] || 0) + 1;
  });
  const bottlenecks = Object.entries(bottleneckCounts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

  return {
    kpis: { active, critical, high, totalLand, requireAction: attentionProjects.length + openInterventions },
    riskDistribution: { critical, high, medium, low },
    attentionProjects,
    bottlenecks,
    riskTrend: [
      { month: 'Mar', critical: 2, high: 8, medium: 20, low: 17 },
      { month: 'Apr', critical: 2, high: 9, medium: 19, low: 17 },
      { month: 'May', critical: 3, high: 9, medium: 18, low: 17 },
      { month: 'Jun', critical: 3, high: 10, medium: 18, low: 16 },
      { month: 'Jul', critical: 3, high: 10, medium: 18, low: 16 },
      { month: 'Aug', critical, high, medium, low },
    ],
  };
}

export function getDistrictsData() {
  const districtMap = {};
  projects.forEach(p => {
    const key = `${p.location.state}|${p.location.district}`;
    if (!districtMap[key]) {
      districtMap[key] = { state: p.location.state, district: p.location.district, projects: [], totalLand: 0, pendingLand: 0 };
    }
    districtMap[key].projects.push(p);
    districtMap[key].totalLand += p.acquisition.landRequiredHa;
    districtMap[key].pendingLand += p.acquisition.landRemainingHa;
  });

  return Object.values(districtMap).map(d => {
    const critical = d.projects.filter(p => p.risk.level === 'critical').length;
    const high = d.projects.filter(p => p.risk.level === 'high').length;
    const avgDelay = Math.round(d.projects.reduce((s, p) => s + p.daysOverdue, 0) / d.projects.length);
    const litExposure = d.projects.some(p => p.litigation.exposure === 'high') ? 'high' : d.projects.some(p => p.litigation.exposure === 'medium') ? 'medium' : 'low';
    const clrExposure = d.projects.some(p => p.clearances.exposure === 'critical' || p.clearances.exposure === 'high') ? 'high' : 'medium';

    const bottleneckCounts = {};
    d.projects.forEach(p => {
      const b = p.risk.primaryBottleneck;
      bottleneckCounts[b] = (bottleneckCounts[b] || 0) + 1;
    });
    const bottlenecks = Object.entries(bottleneckCounts).map(([name, count]) => ({ name, count, pct: Math.round(count / d.projects.length * 100) })).sort((a, b) => b.count - a.count);

    return {
      id: `${d.state}-${d.district}`.replace(/\s/g, '-'),
      state: d.state,
      district: d.district,
      projectCount: d.projects.length,
      critical,
      high,
      highCritical: critical + high,
      avgDelay,
      totalLand: d.totalLand,
      pendingLand: d.pendingLand,
      litigationExposure: litExposure,
      clearanceExposure: clrExposure,
      bottlenecks,
      projects: d.projects,
    };
  }).sort((a, b) => b.highCritical - a.highCritical);
}

export function getRiskMonitorData() {
  return projects.map(p => {
    const prev = p.snapshots.length >= 2 ? p.snapshots[p.snapshots.length - 2].riskLevel : p.risk.level;
    const curr = p.risk.level;
    const riskOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    const direction = riskOrder[curr] > riskOrder[prev] ? 'up' : riskOrder[curr] < riskOrder[prev] ? 'down' : 'stable';
    return { ...p, previousRisk: prev, currentRisk: curr, direction };
  }).sort((a, b) => {
    const order = { up: 0, stable: 1, down: 2 };
    return order[a.direction] - order[b.direction];
  });
}

export function getFilters() {
  const states = [...new Set(projects.map(p => p.location.state))].sort();
  const districts = [...new Set(projects.map(p => p.location.district))].sort();
  const agencies = [...new Set(projects.map(p => p.agency))].sort();
  const sectors = [...new Set(projects.map(p => p.sector))].sort();
  return { states, districts, agencies, sectors, stages: STAGES, riskLevels: RISK_LEVELS };
}

