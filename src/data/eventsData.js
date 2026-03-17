import Brainiac from '../assets/Brainiac.webp';
import CodeOfLies from '../assets/codeOfLies.webp';
import CtrlAltElite from '../assets/CtrlAltElite.webp';
import Dpl from '../assets/dpl.webp';
import TimeScape from '../assets/timeScape.webp';
import TreasureTrove from '../assets/treasure-trove.webp';

const eventsData = [
    {
        id: 'brainiac',
        name: 'BRAINIAC',
        tagline: '"Think Fast, Think Smart"',
        category: 'Quiz Competition',
        categoryIcon: '🧠',
        poster: Brainiac,
        description:
            'A high-voltage quiz battle that pushes your knowledge to the limit. From tech trivia to rapid-fire rounds, only the sharpest minds survive. Gear up for an electrifying challenge that rewards intellect, speed, and nerves of steel.',
        highlights: [
            'Multiple Rounds: Tech, GK, Rapid Fire',
            'Team Size: 2-3',
            'Buzzer Rounds with Penalties',
            'Live Leaderboard',
        ],
        entryFee: '₹59',
        prizePool: '₹4,000',
        date: 'March 7, 2026',
        time: '11:00 AM',
        venue: 'Seminar Hall',
        registerLink: 'https://forms.gle/CzhiveFKNvWGogk49',
        // Poster: warm sandy/orange beige bg, orange clipboards, brown text
        theme: {
            primary: '#d4883c',
            secondary: '#1a1008',
            glow: '#d4883c',
            gradient: 'radial-gradient(ellipse at 30% 20%, rgba(212,136,60,0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(180,110,40,0.2) 0%, transparent 50%), linear-gradient(160deg, #1a1008 0%, #2e1c0c 30%, #3d2812 60%, #1a1008 100%)',
            particleColor: '#d4883c',
            marqueeWords: ['QUIZ', 'BRAINIAC', 'KNOWLEDGE', 'TRIVIA', 'RAPID FIRE', 'INTELLECT', 'BUZZER', 'THINK'],
        },
    },
    {
        id: 'codeoflies',
        name: 'CODE OF LIES',
        tagline: '"Trust No One"',
        category: 'Mind Games',
        categoryIcon: '🃏',
        poster: CodeOfLies,
        description:
            'Deception meets strategy in this thrilling game of bluffs and code. Outsmart your opponents, plant false clues, and uncover the truth hidden beneath layers of lies. Only the most cunning will prevail.',
        highlights: [
            'Solo / Duo Modes',
            'Multiple Elimination Rounds',
            'Strategy & Bluffing Based',
            'Surprise Twists Each Round',
        ],
        entryFee: '₹59 Solo / ₹99 Duo',
        prizePool: '₹5,000',
        date: 'March 7, 2026',
        time: '01:00 PM',
        venue: 'Room 301',
        registerLink: 'https://forms.gle/1iNkmX8BZrByeRkg8',
        // Poster: brown/sepia vintage bg (#6b4226), dark orange title, playing cards, question marks
        theme: {
            primary: '#c26a18',
            secondary: '#120a04',
            glow: '#c26a18',
            gradient: 'radial-gradient(ellipse at 50% 20%, rgba(194,106,24,0.2) 0%, transparent 50%), radial-gradient(ellipse at 30% 80%, rgba(107,66,38,0.3) 0%, transparent 50%), linear-gradient(160deg, #120a04 0%, #25180c 30%, #3a2414 60%, #120a04 100%)',
            particleColor: '#c26a18',
            marqueeWords: ['BLUFF', 'DECEIVE', 'STRATEGY', 'CARDS', 'LIES', 'TRUTH', 'CUNNING', 'MYSTERY'],
        },
    },
    {
        id: 'ctrlaltelite',
        name: 'CTRL+ALT+ELITE',
        tagline: '"Reboot. Rewrite. Reign."',
        category: 'Coding Contest',
        categoryIcon: '⌨️',
        poster: CtrlAltElite,
        description:
            'The ultimate competitive programming showdown. Tackle algorithmic challenges that test your logic, speed, and coding mastery. Only the elite coders will survive the final round.',
        highlights: [
            'Solo Event',
            'DSA + Competitive Programming',
            'Time Limit: 90 Minutes',
            'Platform: HackerRank',
        ],
        entryFee: '₹59 Solo / ₹99 Duo',
        prizePool: '₹6,000',
        date: 'March 7, 2026',
        time: '02:00 PM',
        venue: 'Lab 3',
        registerLink: 'https://forms.gle/ebS6M9xvVcFyCQG6A',
        // Poster: dark teal/dark cyan-green bg (#0f3038), aqua/teal highlights (#4ac8c8), code editor
        theme: {
            primary: '#4ac8c8',
            secondary: '#06181c',
            glow: '#4ac8c8',
            gradient: 'radial-gradient(ellipse at 40% 10%, rgba(74,200,200,0.2) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(15,48,56,0.5) 0%, transparent 50%), linear-gradient(160deg, #06181c 0%, #0c2a30 30%, #103840 60%, #06181c 100%)',
            particleColor: '#4ac8c8',
            marqueeWords: ['CODE', 'ALGORITHM', 'DSA', 'COMPETE', 'ELITE', 'LOGIC', 'HACKERRANK', 'SPEED'],
        },
    },
    {
        id: 'dpl',
        name: 'DPL',
        tagline: '"Draft. Play. Lead."',
        category: 'Auction League',
        categoryIcon: '🏏',
        poster: Dpl,
        description:
            'Step into the shoes of a team owner in this electrifying auction-based league. Draft your dream team, strategize your bids, and lead your squad to victory in a battle of wits and cricket knowledge.',
        highlights: [
            'Team Size: 4-5',
            'Auction-Based Drafting',
            'Fantasy Cricket Format',
            'Live Match Simulation',
        ],
        entryFee: '₹149',
        prizePool: '₹5,000',
        date: 'March 7, 2026',
        time: '03:00 PM',
        venue: 'Auditorium',
        registerLink: 'https://forms.gle/5ouKVcsUxw6FZxux7',
        // Poster: dark navy blue bg (#1a2856), bright yellow trophy (#e8d020), yellow bottom section
        theme: {
            primary: '#e8d020',
            secondary: '#0a0e20',
            glow: '#e8d020',
            gradient: 'radial-gradient(ellipse at 50% 30%, rgba(232,208,32,0.12) 0%, transparent 50%), radial-gradient(ellipse at 30% 80%, rgba(26,40,86,0.5) 0%, transparent 50%), linear-gradient(160deg, #0a0e20 0%, #141e3a 30%, #1a2856 60%, #0a0e20 100%)',
            particleColor: '#3858a0',
            marqueeWords: ['AUCTION', 'DRAFT', 'CRICKET', 'LEAGUE', 'STRATEGY', 'BID', 'CAPTAIN', 'PLAY'],
        },
    },
    {
        id: 'timescape',
        name: 'ESCAPE ROOM',
        tagline: '"There Is No Way Out"',
        category: 'Puzzle Challenge',
        categoryIcon: '🔐',
        poster: TimeScape,
        description:
            'You are locked in. The clock is ticking. Find hidden mechanisms, crack encrypted codes, and dismantle the room\'s secrets before time collapses.',
        highlights: [
            'Team Size: 3-5',
            'Time Limit: 45 Minutes',
            'Difficulty: Expert',
            'Theme: Cyber Vault',
        ],
        entryFee: '₹199',
        prizePool: '₹3,000',
        date: 'March 7, 2026',
        time: '12:00 PM',
        venue: 'Room 105',
        registerLink: 'https://forms.gle/qeAfVicLZKiDcM8F6',
        // Poster: dark indigo-purple bg (#1a1040), bright violet-blue door, purple jigsaw pieces, purple glow rays
        theme: {
            primary: '#7b68ee',
            secondary: '#08041a',
            glow: '#7b68ee',
            gradient: 'radial-gradient(ellipse at 50% 40%, rgba(123,104,238,0.25) 0%, transparent 50%), radial-gradient(ellipse at 20% 10%, rgba(80,50,180,0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(60,30,140,0.15) 0%, transparent 40%), linear-gradient(160deg, #08041a 0%, #120a30 30%, #1a1048 60%, #08041a 100%)',
            particleColor: '#7b68ee',
            marqueeWords: ['TICKING', 'CODES', 'ESCAPE', 'PUZZLE', 'VAULT', 'CIPHER', 'LOCKED', 'TIME'],
        },
    },
    {
        id: 'treasure-trove',
        name: 'TREASURE TROVE',
        tagline: '"Seek and You Shall Find"',
        category: 'Adventure Hunt',
        categoryIcon: '🗺️',
        poster: TreasureTrove,
        description:
            'Embark on the ultimate treasure hunt across the campus. Decode cryptic clues, navigate hidden paths, and race against rival teams to unearth the grand treasure. Adventure awaits the bold.',
        highlights: [
            'Team Size: 3-4',
            'Campus-Wide Hunt',
            'Cryptic Clue-Based',
            'Multiple Checkpoints',
        ],
        entryFee: '₹299',
        prizePool: '₹8,000',
        date: 'March 7, 2026',
        time: '11:00 AM',
        venue: 'Campus Grounds',
        registerLink: 'https://forms.gle/eV3yRkUWx51VBoH9A',
        // Poster: dark charcoal/brown border, sandy/tan parchment center, dark brown title text, gold coins
        theme: {
            primary: '#c49a5c',
            secondary: '#100c06',
            glow: '#c49a5c',
            gradient: 'radial-gradient(ellipse at 50% 30%, rgba(196,154,92,0.2) 0%, transparent 50%), radial-gradient(ellipse at 30% 80%, rgba(80,60,30,0.3) 0%, transparent 50%), linear-gradient(160deg, #100c06 0%, #221a0e 30%, #342816 60%, #100c06 100%)',
            particleColor: '#c49a5c',
            marqueeWords: ['TREASURE', 'HUNT', 'ADVENTURE', 'CLUES', 'EXPLORE', 'DISCOVER', 'GOLD', 'QUEST'],
        },
    },
];

export default eventsData;