import SpotlightCard from './SpotlightCard'
import ShinyText from './ShinyText'
import styles from './Products.module.css'

const PRODUCTS = [
  {
    icon: '📋', title: 'Admissions Manager',
    desc: 'Full admission pipeline — lead capture, document collection, counsellor assignment, status tracking, and enrollment confirmation in one place.',
    tags: ['Lead tracking', 'Document flow', 'Enrollment'],
  },
  {
    icon: '🗂️', title: 'Education CRM',
    desc: 'A CRM designed around how consultancies and colleges manage relationships — students, partners, counsellors, and follow-up pipelines all in one view.',
    tags: ['Pipeline view', 'Follow-ups', 'Partner management'],
  },
  {
    icon: '📊', title: 'Analytics Dashboard',
    desc: 'Live dashboards for institutions to track counsellor performance, conversion rates, intake health, and revenue pipelines — no more waiting on weekly reports.',
    tags: ['Live data', 'Custom KPIs', 'Export'],
  },
  {
    icon: '⚙️', title: 'Workflow Automation',
    desc: "Remove the manual triggers, reminders, and status updates that eat your team's time. Set it once — it runs on its own while your team focuses on students.",
    tags: ['Triggers', 'Notifications', 'Integrations'],
  },
  {
    icon: '🏛️', title: 'Institution ERP',
    desc: 'End-to-end ERP for education institutions — finance, HR, academic scheduling, and operations joined into one coherent system instead of five disconnected ones.',
    tags: ['Finance', 'HR', 'Academics'],
  },
  {
    icon: '🔧', title: 'Custom Builds',
    desc: "Sometimes off-the-shelf doesn't fit. We build custom digital tools from scratch — portals, internal tools, integrations — shaped exactly around your workflow.",
    tags: ['Portals', 'Internal tools', 'Bespoke'],
    cta: 'Start a conversation',
  },
]

export default function Products() {
  return (
    <section id="products" className="section">
      <div className="container">
        <div className={styles.intro}>
          <div className="section-header">
            <div className="eyebrow">Built for Education</div>
            <h2><ShinyText text="Software Suite" color="var(--text)" shineColor="var(--accent)" speed={3} delay={1.5} /></h2>
          </div>
          <p>Every product we build is shaped by how education businesses actually run — not how generic SaaS thinks they do. Purpose-built, not adapted.</p>
        </div>

        <div className={styles.grid}>
          {PRODUCTS.map(p => (
            <SpotlightCard key={p.title} className={styles.card} enableRibbon>
              <div className={styles.icon}>{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="tag-row">
                {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <a href="#contact" className="btn btn-soft">{p.cta ?? 'Learn more'}</a>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
