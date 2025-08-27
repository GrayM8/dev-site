import type { Education } from '../data/education';

export default function EducationItem({ item }: { item: Education }) {
    return (
        <article className="panel" style={{ padding: 16 }}>
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div className="row" style={{ alignItems: 'center', gap: 10 }}>
                    {/* NEW: logo */}
                    {item.logo && (
                        <img src={item.logo} alt="" className="tile-logo" />
                    )}
                    <div>
                        <h3 className="h2" style={{ marginBottom: 4 }}>{item.degree}</h3>
                        <div className="small">{item.school}</div>
                    </div>
                </div>
                <div className="small" aria-label="dates">{item.when}</div>
            </div>

            {item.bullets && item.bullets.length > 0 && (
                <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                    {item.bullets.map((b, i) => (
                        <li key={i} className="small">{b}</li>
                    ))}
                </ul>
            )}
        </article>
    );
}