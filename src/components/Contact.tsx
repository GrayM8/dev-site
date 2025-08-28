import { motion } from 'framer-motion';
import { hoverLift } from '../utils/motion';

const handlePrint = () => {
    const y = window.scrollY;
    window.scrollTo(0, 0);
    // Give the browser a tick to reflow with the print CSS
    requestAnimationFrame(() => {
        window.print();
        // Restore scroll after print dialog closes
        setTimeout(() => window.scrollTo(0, y), 0);
    });
};

export default function Contact() {
    return (
        <section id="contact" className="stack">
            <div className="stack">
                <p className="small">I’d love to connect! Here are the easiest ways to reach me:</p>
                <div className="row" style={{ flexWrap: 'wrap' }}>
                    <motion.a className="btn" href="mailto:matthew.gray.marshall@gmail.com" whileHover={{ y: -2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12)', }} transition={hoverLift} >Email</motion.a>
                    <motion.a className="btn" href="https://www.linkedin.com/in/graymarshall" target="_blank" rel="noreferrer" whileHover={{ y: -2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12)',}} transition={hoverLift} >LinkedIn</motion.a>
                    <motion.a className="btn" href="https://github.com/GrayM8" target="_blank" rel="noreferrer" whileHover={{ y: -2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12)', }} transition={hoverLift} >GitHub</motion.a>
                    <motion.a className="btn" href="/Gray-Marshall-Resume.pdf" target="_blank" rel="noreferrer" whileHover={{ y: -2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12)', }} transition={hoverLift} >Resume (PDF)</motion.a>
                    <motion.button
                        type = "button"
                        className="btn"
                        onClick={handlePrint}
                        whileHover={{ y: -2, boxShadow: '0 6px 12px rgba(0,0,0,0.18)' }}
                        whileTap={{ y: 0, boxShadow: '0 2px 4px rgba(0,0,0,0.12)' }}
                        transition={hoverLift}
                    >
                        Print Website
                    </motion.button>
                </div>
            </div>
        </section>
    );
}