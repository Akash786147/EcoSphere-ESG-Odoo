import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardOverview,
});

function DashboardOverview() {
  return (
    <div className="content">
      <div className="page-head">
        <div>
          <h1>Good morning, Sarah</h1>
          <p>Here is how your organization is performing across ESG today.</p>
        </div>
        <div className="page-head-actions">
          <button className="filter-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>
            Last 6 months
          </button>
          <button className="btn btn-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v13m0 0-4-4m4 4 4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
            Export summary
          </button>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-tile">
          <div className="stat-label">Overall ESG Score</div>
          <div className="stat-value tabular">78.4</div>
          <div className="stat-delta up"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 7 7 17M7 7h10v10"/></svg>+4.2% vs previous period</div>
        </div>
        <div className="stat-tile">
          <div className="stat-label"><i style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--env)', display: 'inline-block' }}></i> Environmental</div>
          <div className="stat-value tabular">82</div>
          <div className="stat-bar"><span style={{ width: '82%', background: 'var(--env)' }}></span></div>
        </div>
        <div className="stat-tile">
          <div className="stat-label"><i style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--social)', display: 'inline-block' }}></i> Social</div>
          <div className="stat-value tabular">76</div>
          <div className="stat-bar"><span style={{ width: '76%', background: 'var(--social)' }}></span></div>
        </div>
        <div className="stat-tile">
          <div className="stat-label"><i style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--governance)', display: 'inline-block' }}></i> Governance</div>
          <div className="stat-value tabular">74</div>
          <div className="stat-bar"><span style={{ width: '74%', background: 'var(--governance)' }}></span></div>
        </div>
      </div>

      <div className="dash-grid">
        <div className="card">
          <div className="card-head">
            <div>
              <h3>ESG performance trend</h3>
              <div className="sub">Weighted score by pillar, last 6 months</div>
            </div>
            <div className="trend-legend">
              <span><i style={{ background: 'var(--fg)' }}></i>Overall</span>
              <span><i style={{ background: 'var(--env)' }}></i>Environmental</span>
              <span><i style={{ background: 'var(--social)' }}></i>Social</span>
              <span><i style={{ background: 'var(--governance)' }}></i>Governance</span>
            </div>
          </div>
          <div className="card-body">
            <svg viewBox="0 0 640 220" style={{ width: '100%', height: 'auto' }}>
              <g stroke="var(--border)" strokeWidth="1">
                <line x1="40" y1="20" x2="620" y2="20"/>
                <line x1="40" y1="80" x2="620" y2="80"/>
                <line x1="40" y1="140" x2="620" y2="140"/>
                <line x1="40" y1="200" x2="620" y2="200"/>
              </g>
              <g fontSize="10.5" fill="var(--muted)" fontFamily="var(--font-mono)">
                <text x="8" y="24">90</text><text x="8" y="84">80</text><text x="8" y="144">70</text><text x="8" y="204">60</text>
              </g>
              <g fontSize="10.5" fill="var(--muted)">
                <text x="34" y="216">Feb</text><text x="146" y="216">Mar</text><text x="258" y="216">Apr</text><text x="370" y="216">May</text><text x="482" y="216">Jun</text><text x="592" y="216">Jul</text>
              </g>
              <polyline points="40,152 152,146 264,140 376,134 488,122 600,116" fill="none" stroke="var(--governance)" strokeWidth="2"/>
              <polyline points="40,140 152,134 264,122 376,116 488,110 600,104" fill="none" stroke="var(--social)" strokeWidth="2"/>
              <polyline points="40,116 152,104 264,92 376,86 488,74 600,68" fill="none" stroke="var(--env)" strokeWidth="2"/>
              <polyline points="40,134 152,128 264,116 376,110 488,98 600,90" fill="none" stroke="var(--fg)" strokeWidth="2.5"/>
              <circle cx="600" cy="90" r="4" fill="var(--fg)"/>
            </svg>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>Carbon emissions</h3></div>
          <div className="card-body">
            <div className="co2-total tabular">1,842 <span style={{ fontSize: '13px', fontWeight: 550, color: 'var(--muted)' }}>tCO2e</span></div>
            <div className="co2-sub">↓ 8.4% vs previous quarter</div>
            <svg viewBox="0 0 260 70" style={{ width: '100%', height: 'auto', marginTop: '14px' }}>
              <g>
                <rect x="4" y="34" width="26" height="30" rx="2" fill="var(--surface-sunken)"/>
                <rect x="38" y="26" width="26" height="38" rx="2" fill="var(--surface-sunken)"/>
                <rect x="72" y="30" width="26" height="34" rx="2" fill="var(--surface-sunken)"/>
                <rect x="106" y="18" width="26" height="46" rx="2" fill="var(--surface-sunken)"/>
                <rect x="140" y="22" width="26" height="42" rx="2" fill="var(--surface-sunken)"/>
                <rect x="174" y="10" width="26" height="54" rx="2" fill="var(--surface-sunken)"/>
                <rect x="208" y="8" width="26" height="56" rx="2" fill="var(--env)"/>
              </g>
            </svg>
            <div className="co2-target">
              <div className="co2-target-row"><span>2026 target: 1,200 tCO2e</span><span>62%</span></div>
              <div className="progress"><span style={{ width: '62%', background: 'var(--env)' }}></span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="dash-grid-half">
        <div className="card">
          <div className="card-head"><h3>Department performance</h3><span className="badge badge-neutral">6 departments</span></div>
          <div className="card-body">
            <div className="dept-row"><span className="dept-rank">1</span><span className="dept-name">Human Resources</span><div className="dept-bar-track"><span className="dept-bar-fill tabular" style={{ width: '88%' }}></span></div><span className="dept-score tabular">88</span></div>
            <div className="dept-row"><span className="dept-rank">2</span><span className="dept-name">R&amp;D</span><div className="dept-bar-track"><span className="dept-bar-fill tabular" style={{ width: '85%' }}></span></div><span className="dept-score tabular">85</span></div>
            <div className="dept-row"><span className="dept-rank">3</span><span className="dept-name">IT &amp; Digital</span><div className="dept-bar-track"><span className="dept-bar-fill tabular" style={{ width: '82%' }}></span></div><span className="dept-score tabular">82</span></div>
            <div className="dept-row"><span className="dept-rank">4</span><span className="dept-name">Sales &amp; Marketing</span><div className="dept-bar-track"><span className="dept-bar-fill tabular" style={{ width: '79%' }}></span></div><span className="dept-score tabular">79</span></div>
            <div className="dept-row"><span className="dept-rank">5</span><span className="dept-name">Manufacturing</span><div className="dept-bar-track"><span className="dept-bar-fill tabular" style={{ width: '71%', background: 'var(--warning)' }}></span></div><span className="dept-score tabular">71</span></div>
            <div className="dept-row"><span className="dept-rank">6</span><span className="dept-name">Logistics</span><div className="dept-bar-track"><span className="dept-bar-fill tabular" style={{ width: '68%', background: 'var(--warning)' }}></span></div><span className="dept-score tabular">68</span></div>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>Goals progress</h3><Link to="/dashboard" className="btn btn-ghost btn-sm">View all</Link></div>
          <div className="card-body">
            <div className="goal-item">
              <div className="goal-top"><span className="goal-title">Reduce Scope 1 &amp; 2 emissions by 30%</span><span className="goal-pct tabular">64%</span></div>
              <div className="progress"><span style={{ width: '64%' }}></span></div>
              <div className="goal-meta"><span>Operations</span><span>·</span><span>Due Dec 2026</span></div>
            </div>
            <div className="goal-item">
              <div className="goal-top"><span className="goal-title">100% renewable electricity at manufacturing sites</span><span className="goal-pct tabular">41%</span></div>
              <div className="progress"><span style={{ width: '41%' }}></span></div>
              <div className="goal-meta"><span>Facilities</span><span>·</span><span>Due Jun 2027</span></div>
            </div>
            <div className="goal-item">
              <div className="goal-top"><span className="goal-title">Zero landfill waste across all facilities</span><span className="goal-pct tabular">78%</span></div>
              <div className="progress"><span style={{ width: '78%' }}></span></div>
              <div className="goal-meta"><span>Operations</span><span>·</span><span>Due Mar 2026</span></div>
            </div>
            <div className="goal-item">
              <div className="goal-top"><span className="goal-title">Achieve gender parity in leadership roles</span><span className="goal-pct tabular">52%</span></div>
              <div className="progress"><span style={{ width: '52%' }}></span></div>
              <div className="goal-meta"><span>People &amp; Culture</span><span>·</span><span>Due Dec 2027</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="dash-grid-half">
        <div className="card">
          <div className="card-head"><h3>Needs attention</h3><span className="badge badge-danger">5 items</span></div>
          <div className="card-body">
            <div className="attn-item">
              <div className="attn-icon" style={{ background: 'var(--danger-soft)', color: 'var(--danger-soft-fg)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg></div>
              <div className="attn-body"><div className="attn-title">3 compliance issues are overdue</div><div className="attn-sub">Critical: Wastewater discharge report — Manufacturing, 4 days overdue</div></div>
            </div>
            <div className="attn-item">
              <div className="attn-icon" style={{ background: 'var(--warning-soft)', color: 'var(--warning-soft-fg)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 15l2 2 4-4"/></svg></div>
              <div className="attn-body"><div className="attn-title">12 employees have not acknowledged a policy</div><div className="attn-sub">Data Privacy Policy v3.2 — due in 3 days</div></div>
            </div>
            <div className="attn-item">
              <div className="attn-icon" style={{ background: 'var(--social-soft)', color: 'var(--social-soft-fg)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg></div>
              <div className="attn-body"><div className="attn-title">8 CSR submissions await approval</div><div className="attn-sub">Coastal Cleanup Drive, Blood Donation Camp and 2 more</div></div>
            </div>
            <div className="attn-item">
              <div className="attn-icon" style={{ background: 'var(--gamification-soft)', color: 'var(--gamification-soft-fg)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 4h8v6a4 4 0 0 1-8 0V4Z"/></svg></div>
              <div className="attn-body"><div className="attn-title">2 challenge submissions await review</div><div className="attn-sub">Zero-Waste Desk Challenge — evidence attached</div></div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>Employee engagement</h3></div>
          <div className="card-body">
            <div className="engage-grid">
              <div className="engage-tile"><div className="v tabular">71%</div><div className="l">Participation rate this quarter</div></div>
              <div className="engage-tile"><div className="v tabular">6</div><div className="l">Active challenges</div></div>
              <div className="engage-tile"><div className="v tabular">340</div><div className="l">CSR participants this month</div></div>
              <div className="engage-tile"><div className="v tabular">+12,400</div><div className="l">XP earned this week</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
