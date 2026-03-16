import React, { useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import eventsData from '../data/eventsData';
import gamestormBg from '../assets/gamestrom bg.jpg';
// Import or define missing background components here
import Navbar from './Navbar';
import Footer from './Footer';
import FlickeringGrid from './FlickeringGrid';
import MatrixRain from './MatrixRain';
import LetterGlitch from './LetterGlitch';
import { GridScan } from './GridScan';

// Placeholder components for missing imports found in your logic
const CtrlAltEliteBackground = () => <div className="absolute inset-0 bg-blue-900/20" />;
const BugBountyBackground = () => <div className="absolute inset-0 bg-red-900/20" />;
const InteractiveParticleField = () => <div className="absolute inset-0 bg-purple-900/20" />;
const FloatingLines = (props) => <div className="absolute inset-0 opacity-30" />;
const ShapeGrid = (props) => <div className="absolute inset-0 opacity-20" />;

/* ── Particle Canvas ── */
const ParticleCanvas = ({ color }) => {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const count = 90;
        particlesRef.current = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 0.8,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5 - 0.2,
            opacity: Math.random() * 0.7 + 0.2,
            pulse: Math.random() * Math.PI * 2,
        }));

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesRef.current.forEach((p) => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.pulse += 0.025;
                const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = color + Math.round(alpha * 255).toString(16).padStart(2, '0');
                ctx.fill();
            });
            animRef.current = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [color]);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-1" />;
};

/* ── Marquee Strip ── */
const MarqueeStrip = ({ words, color }) => (
    <div
        className="relative z-30 w-full overflow-hidden border-t py-3 mt-auto"
        style={{
            borderColor: `${color}30`,
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(10px)',
        }}
    >
        <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(4)].map((_, si) => (
                <React.Fragment key={si}>
                    {words.map((word, wi) => (
                        <span
                            key={`${si}-${wi}`}
                            className="inline-flex items-center gap-3 mx-5 text-xs md:text-sm font-bold tracking-[0.25em] uppercase"
                            style={{ color: `${color}` }}
                        >
                            <span>◆</span> {word}
                        </span>
                    ))}
                </React.Fragment>
            ))}
        </div>
    </div>
);

/* ── Event Details Page ── */
const EventDetails = () => {
    const { eventName } = useParams();
    const navigate = useNavigate();
    const event = eventsData.find((e) => e.id === eventName);

    const handleBack = useCallback(() => {
        navigate('/', { state: { scrollToEvents: true } });
    }, [navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [eventName]);

    if (!event) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
                    <button onClick={() => navigate('/')} className="px-6 py-2 border rounded">Back</button>
                </div>
            </div>
        );
    }

    const { theme, id } = event;

    function invertHex(hex) {
        let c = hex.replace('#', '');
        if (c.length === 3) c = c.split('').map(x => x + x).join('');
        const r = (255 - parseInt(c.slice(0, 2), 16)).toString(16).padStart(2, '0');
        const g = (255 - parseInt(c.slice(2, 4), 16)).toString(16).padStart(2, '0');
        const b = (255 - parseInt(c.slice(4, 6), 16)).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`;
    }
    const invertedPrimary = invertHex(theme.primary);

    return (
        <motion.div
            className="min-h-screen relative flex flex-col overflow-x-hidden bg-black"
            style={{ background: id === 'gamestorm' ? `url(${gamestormBg}) center/cover` : theme.gradient }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Background Layers */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {id === 'timescape' && <GridScan scanColor="#a21caf" className="w-full h-full" />}
                {(id === 'build-a-thon' || id === 'codeoflies') && <MatrixRain color={theme.primary} />}
                {id === 'ctrlaltelite' && <FlickeringGrid color={theme.primary} />}
                {id === 'bugbounty' && <BugBountyBackground />}
                {id === 'brainiac' && <InteractiveParticleField />}
                {id === 'treasure-trove' && <FloatingLines linesGradient={[theme.primary, theme.secondary]} />}
                {id === 'dpl' && <ShapeGrid hoverFillColor="#e8d020" shape="hexagon" />}
            </div>

            {/* Content Container */}
            <div className="relative z-10 grow pt-24 pb-12 overflow-y-auto">
                <div className="max-w-7xl mx-auto px-6">
                    <button 
                        onClick={handleBack}
                        className="mb-8 px-5 py-2 border rounded uppercase tracking-widest text-xs font-bold"
                        style={{ borderColor: `${theme.primary}60`, color: theme.primary }}
                    >
                        ← Back to Events
                    </button>

                    <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
                        {/* Event Info */}
                        <div className="flex-1">
                            <span className="px-3 py-1 border text-[10px] uppercase font-bold" style={{ color: theme.primary, borderColor: theme.primary }}>
                                {event.category}
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black uppercase my-4" style={{ color: '#fff', fontFamily: 'Orbitron, sans-serif' }}>
                                {event.name}
                            </h1>
                            <p className="font-mono text-sm mb-6" style={{ color: theme.primary }}>{event.tagline}</p>
                            <p className="text-white/70 mb-8 leading-relaxed max-w-2xl">{event.description}</p>
                            
                            <div className="grid grid-cols-2 gap-8 mb-10">
                                <div>
                                    <p className="text-[10px] uppercase text-white/40">Entry Fee</p>
                                    <p className="text-3xl font-bold" style={{ color: theme.primary }}>{event.entryFee}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase text-white/40">Prize Pool</p>
                                    <p className="text-3xl font-bold" style={{ color: theme.primary }}>{event.prizePool}</p>
                                </div>
                            </div>

                            <a 
                                href={event.registerLink} 
                                target="_blank" 
                                className="inline-block px-10 py-4 font-black rounded uppercase tracking-widest text-black"
                                style={{ backgroundColor: theme.primary }}
                            >
                                Register Now
                            </a>
                        </div>

                        {/* Poster */}
                        <motion.div 
                            className="w-full max-w-sm shrink-0 rounded-2xl overflow-hidden border-2"
                            style={{ borderColor: `${theme.primary}40` }}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <img src={event.poster} alt={event.name} className="w-full h-auto" />
                        </motion.div>
                    </div>
                </div>
            </div>

            <MarqueeStrip words={theme.marqueeWords || []} color={theme.primary} />
            <Footer />
        </motion.div>
    );
};

export default EventDetails;
