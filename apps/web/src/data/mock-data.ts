import { useState, useEffect } from 'react';
import { TreePine, Shirt, Coffee, Gift } from "lucide-react";

// Mock Data Arrays
const CATEGORIES = [
  { id: "CAT-01", name: 'Environmental Cleanup', type: 'CSR Activity', usage: 14, status: 'Active', updated: '2026-06-02' },
  { id: "CAT-02", name: 'Community Outreach', type: 'CSR Activity', usage: 9, status: 'Active', updated: '2026-05-18' },
  { id: "CAT-03", name: 'Health & Wellness', type: 'CSR Activity', usage: 6, status: 'Active', updated: '2026-04-30' },
  { id: "CAT-04", name: 'Education & Mentoring', type: 'CSR Activity', usage: 5, status: 'Active', updated: '2026-03-22' },
  { id: "CAT-05", name: 'Blood & Organ Donation', type: 'CSR Activity', usage: 4, status: 'Active', updated: '2026-02-14' },
  { id: "CAT-06", name: 'Energy Reduction', type: 'Challenge', usage: 8, status: 'Active', updated: '2026-06-10' },
  { id: "CAT-07", name: 'Waste Reduction', type: 'Challenge', usage: 7, status: 'Active', updated: '2026-05-25' },
  { id: "CAT-08", name: 'Sustainable Commuting', type: 'Challenge', usage: 6, status: 'Active', updated: '2026-05-05' },
  { id: "CAT-09", name: 'Water Conservation', type: 'Challenge', usage: 3, status: 'Active', updated: '2026-04-02' },
  { id: "CAT-10", name: 'Paper-Free Office', type: 'Challenge', usage: 2, status: 'Archived', updated: '2025-11-19' }
];

const DEPARTMENTS = [
  { id: "DEP-01", name: 'Human Resources', code: 'HR', head: 'Priya Anand', parent: '', employees: 24, env: 84, social: 92, gov: 87, total: 88, goals: 2, issues: 0, status: 'Active' },
  { id: "DEP-02", name: 'R&D', code: 'RND', head: 'Daniel Cho', parent: '', employees: 142, env: 88, social: 80, gov: 86, total: 85, goals: 3, issues: 1, status: 'Active' },
  { id: "DEP-03", name: 'IT & Digital', code: 'ITD', head: 'Fatima Noor', parent: '', employees: 68, env: 79, social: 83, gov: 85, total: 82, goals: 2, issues: 0, status: 'Active' },
  { id: "DEP-04", name: 'Sales & Marketing', code: 'SLM', head: 'Marcus Webb', parent: '', employees: 96, env: 74, social: 81, gov: 80, total: 79, goals: 1, issues: 1, status: 'Active' },
  { id: "DEP-05", name: 'Manufacturing', code: 'MFG', head: 'Robert Alvarez', parent: '', employees: 410, env: 63, social: 74, gov: 76, total: 71, goals: 4, issues: 3, status: 'Active' },
  { id: "DEP-06", name: 'Logistics', code: 'LOG', head: 'Elena Petrova', parent: 'Manufacturing', employees: 87, env: 60, social: 70, gov: 73, total: 68, goals: 2, issues: 1, status: 'Active' }
];

const NOTIFICATION_TEMPLATES = [
  { id: "1", name: "Goal Achieved", channels: ["Email", "In-App"], triggers: 124, active: true },
  { id: "2", name: "Data Anomaly Detected", channels: ["Email", "Webhook"], triggers: 14, active: true },
  { id: "3", name: "Weekly Report Digest", channels: ["Email"], triggers: 450, active: true },
  { id: "4", name: "New Challenge Available", channels: ["In-App"], triggers: 0, active: false },
];

const TRANSACTIONS = [
  { id: 'TXN-2031', date: '2026-07-08', sourceType: 'Purchase', record: 'PO-88213 — Diesel fuel', dept: 'Logistics', factor: 'Diesel Fuel Combustion (EF-014)', factorVal: '2.70 kg CO2e / L', qty: '4,200 L', co2e: '11.34 t', mode: 'Automatic', status: 'Posted', formula: '4,200 L × 2.70 kg CO2e/L', result: '= 11,340 kg CO2e = 11.34 tCO2e', created: 'Jul 8, 2026, 06:02 AM', audit: ['Created automatically from Purchase Order PO-88213 — Jul 8, 06:02 AM', 'Emission factor EF-014 applied (region: North America) — Jul 8, 06:02 AM'] },
  { id: 'TXN-2030', date: '2026-07-07', sourceType: 'Manufacturing', record: 'WO-55210 — Natural gas, Line 3', dept: 'Manufacturing', factor: 'Natural Gas Combustion (EF-002)', factorVal: '0.185 kg CO2e / kWh', qty: '18,500 kWh', co2e: '3.42 t', mode: 'Automatic', status: 'Posted', formula: '18,500 kWh × 0.185 kg CO2e/kWh', result: '= 3,422.5 kg CO2e = 3.42 tCO2e', created: 'Jul 7, 2026, 11:40 PM', audit: ['Created automatically from Work Order WO-55210 — Jul 7, 11:40 PM'] },
  { id: 'TXN-2029', date: '2026-07-06', sourceType: 'Expense', record: 'EXP-91004 — Flight SFO–NRT, Business', dept: 'Sales & Marketing', factor: 'Air Travel — Long Haul (EF-031)', factorVal: '2.86 tCO2e / flight', qty: '1 flight', co2e: '2.86 t', mode: 'Manual', status: 'Posted', formula: '1 flight × 2.86 tCO2e/flight', result: '= 2.86 tCO2e', created: 'Jul 6, 2026, 02:15 PM', audit: ['Logged manually by Marcus Webb, Finance — Jul 6, 02:15 PM', 'Reviewed and posted by Sarah Coleman — Jul 6, 04:02 PM'] },
  { id: 'TXN-2028', date: '2026-07-05', sourceType: 'Fleet', record: 'FLT-3391 — Delivery van #12', dept: 'Logistics', factor: 'Fleet Fuel — Diesel Van (EF-014)', factorVal: '2.70 kg CO2e / L', qty: '210 L', co2e: '0.57 t', mode: 'Automatic', status: 'Posted', formula: '210 L × 2.70 kg CO2e/L', result: '= 567 kg CO2e = 0.57 tCO2e', created: 'Jul 5, 2026, 07:30 AM', audit: ['Created automatically from fleet telematics — Jul 5, 07:30 AM'] },
  { id: 'TXN-2027', date: '2026-07-04', sourceType: 'Purchase', record: 'PO-88190 — Grid electricity, HQ', dept: 'Corporate HQ', factor: 'Grid Electricity — Regional Mix (EF-007)', factorVal: '0.36 kg CO2e / kWh', qty: '22,400 kWh', co2e: '8.06 t', mode: 'Automatic', status: 'Posted', formula: '22,400 kWh × 0.36 kg CO2e/kWh', result: '= 8,064 kg CO2e = 8.06 tCO2e', created: 'Jul 4, 2026, 09:00 AM', audit: ['Created automatically from utility meter feed — Jul 4, 09:00 AM'] },
  { id: 'TXN-2026', date: '2026-07-03', sourceType: 'Manufacturing', record: 'WO-55187 — Refrigerant top-up, R-410A', dept: 'Manufacturing', factor: 'Refrigerant Leakage — R-410A (EF-044)', factorVal: '2,170 kg CO2e / kg', qty: '3.2 kg', co2e: '6.94 t', mode: 'Manual', status: 'Under review', formula: '3.2 kg × 2,170 kg CO2e/kg', result: '= 6,944 kg CO2e = 6.94 tCO2e', created: 'Jul 3, 2026, 03:20 PM', audit: ['Logged manually by facilities technician — Jul 3, 03:20 PM', 'Flagged for review: quantity exceeds site average — Jul 3, 03:45 PM'] },
  { id: 'TXN-2025', date: '2026-07-02', sourceType: 'Expense', record: 'EXP-90911 — Hotel stays, Q2 offsite', dept: 'R&D', factor: 'Business Travel — Hotel (EF-038)', factorVal: '12.1 kg CO2e / room-night', qty: '42 room-nights', co2e: '0.51 t', mode: 'Manual', status: 'Posted', formula: '42 room-nights × 12.1 kg CO2e/room-night', result: '= 508.2 kg CO2e = 0.51 tCO2e', created: 'Jul 2, 2026, 10:05 AM', audit: ['Logged manually by Finance — Jul 2, 10:05 AM'] },
  { id: 'TXN-2024', date: '2026-07-01', sourceType: 'Purchase', record: 'PO-88072 — Natural gas, boiler', dept: 'Manufacturing', factor: 'Natural Gas Combustion (EF-002)', factorVal: '0.185 kg CO2e / kWh', qty: '9,800 kWh', co2e: '1.81 t', mode: 'Automatic', status: 'Posted', formula: '9,800 kWh × 0.185 kg CO2e/kWh', result: '= 1,813 kg CO2e = 1.81 tCO2e', created: 'Jul 1, 2026, 06:00 AM', audit: ['Created automatically from Purchase Order PO-88072 — Jul 1, 06:00 AM'] },
  { id: 'TXN-2023', date: '2026-06-29', sourceType: 'Fleet', record: 'FLT-3388 — Sales fleet, sedan #4', dept: 'Sales & Marketing', factor: 'Fleet Fuel — Petrol Sedan (EF-013)', factorVal: '2.31 kg CO2e / L', qty: '95 L', co2e: '0.22 t', mode: 'Automatic', status: 'Flagged', formula: '95 L × 2.31 kg CO2e/L', result: '= 219.5 kg CO2e = 0.22 tCO2e', created: 'Jun 29, 2026, 08:12 AM', audit: ['Created automatically from fleet telematics — Jun 29, 08:12 AM', 'Flagged: odometer mismatch detected — Jun 29, 08:15 AM'] },
  { id: 'TXN-2022', date: '2026-06-27', sourceType: 'Manufacturing', record: 'WO-55066 — Waste incineration', dept: 'Manufacturing', factor: 'Waste — Incineration (EF-051)', factorVal: '1.4 t CO2e / t waste', qty: '1.4 t', co2e: '1.96 t', mode: 'Automatic', status: 'Posted', formula: '1.4 t × 1.4 tCO2e/t', result: '= 1.96 tCO2e', created: 'Jun 27, 2026, 05:45 PM', audit: ['Created automatically from waste management log — Jun 27, 05:45 PM'] },
];

const EMISSION_FACTORS = [
  { id: 'EF-002', name: 'Natural Gas Combustion', category: 'Stationary Combustion', activity: 'Natural gas heating and boilers', value: '0.185', unit: 'kg CO2e/kWh', region: 'Global', source: 'DEFRA 2026 Conversion Factors', date: '2026-01-01', status: 'Active' },
  { id: 'EF-007', name: 'Grid Electricity — Regional Mix', category: 'Purchased Energy', activity: 'Grid electricity consumption', value: '0.36', unit: 'kg CO2e/kWh', region: 'North America', source: 'EPA eGRID 2025', date: '2026-01-01', status: 'Active' },
  { id: 'EF-013', name: 'Fleet Fuel — Petrol Sedan', category: 'Mobile Combustion', activity: 'Petrol passenger vehicles', value: '2.31', unit: 'kg CO2e/L', region: 'Global', source: 'GHG Protocol', date: '2025-04-01', status: 'Active' },
  { id: 'EF-014', name: 'Diesel Fuel Combustion', category: 'Mobile Combustion', activity: 'Diesel fleet and generators', value: '2.70', unit: 'kg CO2e/L', region: 'Global', source: 'GHG Protocol', date: '2025-04-01', status: 'Active' },
  { id: 'EF-031', name: 'Air Travel — Long Haul', category: 'Business Travel', activity: 'Flights over 3,700 km', value: '2.86', unit: 'tCO2e/flight', region: 'Global', source: 'ICAO Carbon Calculator', date: '2026-02-01', status: 'Active' },
  { id: 'EF-038', name: 'Business Travel — Hotel', category: 'Business Travel', activity: 'Hotel accommodation', value: '12.1', unit: 'kg CO2e/room-night', region: 'Global', source: 'Cornell Hotel Sustainability Benchmark', date: '2025-09-01', status: 'Active' },
  { id: 'EF-044', name: 'Refrigerant Leakage — R-410A', category: 'Fugitive Emissions', activity: 'HVAC and refrigeration leakage', value: '2,170', unit: 'kg CO2e/kg', region: 'Global', source: 'IPCC AR5 GWP100', date: '2024-11-01', status: 'Active' },
  { id: 'EF-051', name: 'Waste — Incineration', category: 'Waste', activity: 'Non-recyclable waste incineration', value: '1.4', unit: 'tCO2e/t waste', region: 'Global', source: 'DEFRA 2026 Conversion Factors', date: '2026-01-01', status: 'Active' },
  { id: 'EF-009', name: 'Grid Electricity — EU Mix', category: 'Purchased Energy', activity: 'Grid electricity consumption', value: '0.23', unit: 'kg CO2e/kWh', region: 'European Union', source: 'EEA 2026', date: '2026-09-01', status: 'Draft' },
];

const PRODUCTS = [
  { id: "PROD-A1", name: "EcoWidget Pro", category: "Electronics", footprint: "12.4", rating: "A" },
  { id: "PROD-B2", name: "Recycled Packaging Box", category: "Packaging", footprint: "0.8", rating: "A+" },
  { id: "PROD-C3", name: "Standard Widget", category: "Electronics", footprint: "45.2", rating: "C" },
];

const GOALS = [
  { id: "1", title: "Net Zero by 2030", owner: "Sarah Coleman", timeframe: "2020 - 2030", progress: 65, status: "On Track" },
  { id: "2", title: "100% Renewable Energy", owner: "Robert Evans", timeframe: "2024 - 2028", progress: 40, status: "At Risk" },
  { id: "3", title: "Zero Waste to Landfill", owner: "Maria Garcia", timeframe: "2025 - 2026", progress: 15, status: "Off Track" },
];

const BADGES = [
  { id: 1, name: 'First Step', icon: 'footprints', category: 'Engagement', ruleType: 'Challenges completed', threshold: 1, desc: 'Awarded the first time an employee completes any sustainability challenge.', count: 512, nearly: [{ name: 'Rahul Sen', gap: 'has 1 challenge in progress' }, { name: 'Marta Kovac', gap: 'submitted, awaiting review' }] },
  { id: 2, name: 'Sustainability Champion', icon: 'medal', category: 'Engagement', ruleType: 'XP threshold', threshold: 2000, desc: 'Recognizes employees who have accumulated 2,000 XP across all activities.', count: 184, nearly: [{ name: 'Elena Petrova', gap: '150 XP away' }, { name: 'Daniel Cho', gap: '210 XP away' }, { name: 'Fatima Noor', gap: '340 XP away' }] },
  { id: 3, name: 'Community Builder', icon: 'users', category: 'Social', ruleType: 'CSR activities completed', threshold: 3, desc: 'Earned by completing three or more CSR activities.', count: 96, nearly: [{ name: 'Hannah Brooks', gap: '1 CSR activity away' }] },
  { id: 4, name: 'Zero Waste Advocate', icon: 'recycle', category: 'Environmental', ruleType: 'Challenges completed', threshold: 3, desc: 'Awarded for completing three waste-reduction challenges.', count: 143, nearly: [{ name: 'Aisha Rahman', gap: '1 challenge away' }, { name: 'Grace Lindqvist', gap: '1 challenge away' }] },
  { id: 5, name: 'Water Guardian', icon: 'droplet', category: 'Environmental', ruleType: 'Challenges completed', threshold: 2, desc: 'Earned by completing every water-conservation challenge offered in a quarter.', count: 41, nearly: [{ name: 'Carlos Mendes', gap: '1 challenge away' }] },
  { id: 6, name: 'Streak Keeper', icon: 'flame', category: 'Engagement', ruleType: 'Challenges completed', threshold: 4, desc: 'Recognizes participation in at least one challenge for four consecutive months.', count: 67, nearly: [{ name: 'Nina Kowalski', gap: '1 month away' }] },
  { id: 7, name: 'Policy Pro', icon: 'shieldCheck', category: 'Governance', ruleType: 'Policy acknowledgement streak', threshold: 12, desc: 'Awarded for acknowledging every required policy on time for a full year.', count: 421, nearly: [{ name: '38 employees', gap: 'on track, next review in 45 days' }] },
  { id: 8, name: 'Top Performer', icon: 'star', category: 'Engagement', ruleType: 'Manual award', threshold: null, desc: 'Presented to employees who finish in the top 10 of the quarterly leaderboard.', count: 10, nearly: [{ name: 'Awarded quarterly', gap: 'next cycle closes Sep 30' }] }
];

const CHALLENGES = [
  { id: "CH-1", title: 'Zero-Waste Desk Challenge', category: 'Waste Reduction', difficulty: 'Medium', xp: 150, deadline: '2026-07-18', participants: 84, progress: 62, status: 'Active', desc: 'Eliminate single-use waste at your desk for two full weeks — photograph your setup at the start and end of the challenge.', evidence: true, approved: 76, pending: 2, rejected: 6 },
  { id: "CH-2", title: 'Cycle to Work Week', category: 'Sustainable Commute', difficulty: 'Easy', xp: 100, deadline: '2026-07-25', participants: 156, progress: 71, status: 'Active', desc: 'Commute by bicycle at least 3 days this week. Self-reported via the mobile check-in — no proof required.', evidence: false, approved: 151, pending: 0, rejected: 5 },
  { id: "CH-3", title: 'Energy-Off Fridays', category: 'Energy Conservation', difficulty: 'Easy', xp: 80, deadline: '2026-07-31', participants: 210, progress: 55, status: 'Active', desc: 'Power down monitors, chargers and task lighting before leaving on Fridays. Facilities spot-checks a sample of desks.', evidence: false, approved: 195, pending: 1, rejected: 14 },
  { id: "CH-4", title: 'Refill Not Landfill', category: 'Waste Reduction', difficulty: 'Easy', xp: 60, deadline: '2026-08-05', participants: 132, progress: 48, status: 'Active', desc: 'Switch to a reusable bottle or cup for two weeks and log each refill in the app with a photo.', evidence: true, approved: 61, pending: 3, rejected: 4 },
  { id: "CH-5", title: 'Community Clean-Up Sprint', category: 'Community Service', difficulty: 'Hard', xp: 300, deadline: '2026-08-15', participants: 47, progress: 38, status: 'Active', desc: 'Organize or join a local clean-up event and log volunteer hours with a group photo and site details.', evidence: true, approved: 12, pending: 2, rejected: 1 },
  { id: "CH-6", title: 'Water Conservation Sprint', category: 'Water Conservation', difficulty: 'Medium', xp: 150, deadline: '2026-08-20', participants: 63, progress: 29, status: 'Active', desc: 'Implement three water-saving measures at your site and document baseline vs. current usage.', evidence: true, approved: 8, pending: 0, rejected: 0 },
  { id: "CH-7", title: 'Paperless July', category: 'Waste Reduction', difficulty: 'Easy', xp: 70, deadline: '2026-07-31', participants: 198, progress: 100, status: 'Under Review', desc: 'Go fully digital on approvals and notes for the month. Results are being reconciled against print-tracker data before XP is finalized.', evidence: false, approved: 198, pending: 0, rejected: 0 },
  { id: "CH-8", title: 'Earth Day Sprint 2026', category: 'Community Service', difficulty: 'Medium', xp: 200, deadline: '2026-04-22', participants: 240, progress: 100, status: 'Completed', desc: 'A week of volunteering, tree planting and awareness sessions across all sites, run for Earth Day.', evidence: true, approved: 233, pending: 0, rejected: 7 },
  { id: "CH-9", title: 'Meatless Mondays', category: 'Wellness', difficulty: 'Easy', xp: 50, deadline: '2026-06-29', participants: 175, progress: 100, status: 'Completed', desc: 'Choose a plant-based lunch every Monday for six weeks, logged through the cafeteria POS integration.', evidence: false, approved: 175, pending: 0, rejected: 0 },
  { id: "CH-10", title: 'Winter Energy Challenge 2025', category: 'Energy Conservation', difficulty: 'Medium', xp: 150, deadline: '2026-01-31', participants: 289, progress: 100, status: 'Archived', desc: 'Site-wide heating setback and equipment shutdown competition between departments over the winter break.', evidence: true, approved: 271, pending: 0, rejected: 18 },
  { id: "CH-11", title: 'Q4 Water Stewardship Sprint', category: 'Water Conservation', difficulty: 'Medium', xp: 150, deadline: '2026-10-15', participants: 0, progress: 0, status: 'Draft', desc: 'Draft — follow-up to the summer water sprint, targeting manufacturing and logistics sites specifically.', evidence: true, approved: 0, pending: 0, rejected: 0 }
];

const LEADERBOARD = [
  { rank: 1, name: "Sarah Coleman", department: "Corporate HQ", points: 12500, badges: 8 },
  { rank: 2, name: "Robert Evans", department: "Manufacturing", points: 11200, badges: 6 },
  { rank: 3, name: "Maria Garcia", department: "Logistics", points: 9800, badges: 5 },
  { rank: 4, name: "Dr. Chen Wei", department: "R&D", points: 8450, badges: 4 },
  { rank: 5, name: "Alex Johnson", department: "Logistics", points: 7200, badges: 3 },
];

const APPROVALS = [
  { id: "REQ-01", user: "John Doe", challenge: "Bike to Work Week", date: "2026-06-02", status: "Pending" },
  { id: "REQ-02", user: "Alice Smith", challenge: "Paperless Month", date: "2026-06-01", status: "Approved" },
  { id: "REQ-03", user: "Bob Wilson", challenge: "Community Cleanup", date: "2026-05-14", status: "Rejected" },
];

const REWARDS = [
  { id: "1", name: "Plant a Tree", description: "We plant a tree in your name.", cost: 1000, stock: "Unlimited", active: true, icon: TreePine },
  { id: "2", name: "Company Swag T-Shirt", description: "Eco-friendly cotton t-shirt.", cost: 2500, stock: "42", active: true, icon: Shirt },
  { id: "3", name: "Coffee Shop Gift Card", description: "$10 gift card to local coffee shop.", cost: 1500, stock: "15", active: true, icon: Coffee },
  { id: "4", name: "Extra PTO Day", description: "Take a day off on us.", cost: 10000, stock: "5", active: true, icon: Gift },
];

const REDEMPTIONS = [
  { id: "RED-1001", user: "Maria Garcia", item: "Company Swag T-Shirt", qty: 1, date: "2026-07-10", status: "Processing" },
  { id: "RED-1002", user: "Alex Johnson", item: "Coffee Shop Gift Card", qty: 2, date: "2026-07-09", status: "Delivered" },
  { id: "RED-1003", user: "Dr. Chen Wei", item: "Plant a Tree", qty: 5, date: "2026-07-08", status: "Completed" },
];

// Custom Hooks mimicking SWR for data fetching
function useMockData<T>(data: T, delay = 0) {
  const [state, setState] = useState<{ data: T | null; isLoading: boolean }>({ data: null, isLoading: true });

  useEffect(() => {
    const timer = setTimeout(() => {
      setState({ data, isLoading: false });
    }, delay);
    return () => clearTimeout(timer);
  }, [data, delay]);

  return state;
}

export const useCategories = () => useMockData(CATEGORIES);
export const useDepartments = () => useMockData(DEPARTMENTS);
export const useNotificationTemplates = () => useMockData(NOTIFICATION_TEMPLATES);
export const useTransactions = () => useMockData(TRANSACTIONS);
export const useEmissionFactors = () => useMockData(EMISSION_FACTORS);
export const useProducts = () => useMockData(PRODUCTS);
export const useGoals = () => useMockData(GOALS);
export const useBadges = () => useMockData(BADGES);
export const useChallenges = () => useMockData(CHALLENGES);
export const useLeaderboard = () => useMockData(LEADERBOARD);
export const useApprovals = () => useMockData(APPROVALS);
export const useRewards = () => useMockData(REWARDS);
export const useRedemptions = () => useMockData(REDEMPTIONS);
