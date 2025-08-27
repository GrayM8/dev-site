export default function Footer() {
    return (
        <footer className="panel" style={{ padding: 16, marginTop: 32 }}>
            <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div className="small">
                    © {new Date().getFullYear()} Gray Marshall ☕
                </div>

                <div className="row" style={{ gap: 12 }}>
                    <a className="small" href="https://github.com/GrayM8" target="_blank" rel="noreferrer">GitHub</a>
                    <a className="small" href="https://linkedin.com/graymarshall" target="_blank" rel="noreferrer">LinkedIn</a>
                    <a className="small" href="mailto:matthew.gray.marshall@gmail.com">Email</a>
                </div>
            </div>
        </footer>
    );
}