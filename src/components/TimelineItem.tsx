import type { Experience } from '../data/experience';

export default function TimelineItem({ item }: { item: Experience }) {
    return (
        <article className="panel" style={{ padding: 16 }}>
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div className="row" style={{ alignItems: 'center', gap: 10 }}>
                    {/* NEW: logo */}
                    {item.logo && (
                        <img src={item.logo} alt="" className="tile-logo" />
                    )}
                    <div>
                        <h3 className="h2" style={{ marginBottom: 4 }}>{item.role}</h3>
                        <div className="small">{item.org}</div>
                    </div>
                </div>
                <div className="small" aria-label="dates">{item.when}</div>
            </div>

            <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                {item.bullets.map((b, i) => (
                    <li key={i} className="small">{b}</li>
                ))}
            </ul>
        </article>
    );
}