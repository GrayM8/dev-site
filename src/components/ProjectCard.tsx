import type { Project } from '../data/projects';
import Tilt from './Tilt';

export default function ProjectCard({ p }: { p: Project }) {
    return (
        <Tilt>
            <article className="panel project-card">
                {/* thumbnail */}
                {p.image && (
                    <img
                        src={p.image}
                        alt=""
                        className="project-thumb"
                        fetchPriority="high"
                    />
                )}

                <div className="card-body">
                    <div className="row" style={{ justifyContent: 'space-between' }}>
                        <h3 className="h2">{p.title}</h3>
                        {p.link ? (
                            <a className="small" href={p.link} target="_blank" rel="noreferrer">
                                Link ↗
                            </a>
                        ) : null}
                    </div>

                    <p className="small" style={{ marginTop: 8, flexGrow: 1 }}>
                        {p.blurb}
                    </p>

                    <div className="row tags">
                        {p.tech.map((t) => (
                            <span className="tag" key={t}>{t}</span>
                        ))}
                    </div>
                </div>
            </article>
        </Tilt>
    );
}