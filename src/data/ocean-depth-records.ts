// data/ocean-depth-records.ts

export interface DepthRecord {
    title: string;
    value: string;
    description: string;
    year?: string;
    achievedBy?: string;
    icon?: string;
    imageLink?: string; // Added imageLink
}

export interface DepthAnalogy {
    landmark: string;
    depth: string;
    description: string;
    zone: string;
    icon?: string;
    imageLink?: string; // Added imageLink
}

export interface ZoneDepthData {
    zoneId: string;
    zoneName: string;
    explorationHistory: {
        title: string;
        description: string;
        year: string;
        achievedBy: string;
        vessel?: string;
        imageLink?: string; // Added imageLink
    }[];
    depthRecords: DepthRecord[];
    humanVisits?: {
        year: string;
        mission: string;
        depth: string;
        notes: string;
        imageLink?: string; // Added imageLink
    }[];
    analogies?: DepthAnalogy[];
}

export const oceanDepthRecords: ZoneDepthData[] = [
    {
        zoneId: 'sunlight',
        zoneName: 'The Sunlight Zone',
        explorationHistory: [
            {
                title: 'First SCUBA Dive',
                description: 'Jacques Cousteau and Émile Gagnan perfect the aqua-lung, opening the sunlight zone to recreational exploration.',
                year: '1943',
                achievedBy: 'Jacques Cousteau, Émile Gagnan',
                imageLink: '/trivia/exphistory1.jfif',
            },
            {
                title: 'First Underwater Habitat',
                description: 'Conshelf I - First manned underwater habitat placed at 10m depth, proving humans can live and work underwater.',
                year: '1962',
                achievedBy: 'Jacques Cousteau',
                vessel: 'Conshelf I',
                imageLink: '/trivia/exphistory2.jpg',
            },
        ],
        depthRecords: [
            {
                title: 'Deepest Free Dive (No fins)',
                value: '102m (335ft)',
                description: 'Stig Severinsen - Held breath for 3 minutes during descent',
                year: '2013',
                achievedBy: 'Stig Severinsen',
                imageLink: '/trivia/depth1-1.jpg',
            },
            {
                title: 'Deepest SCUBA Dive (Open circuit)',
                value: '332m (1,090ft)',
                description: 'Ahmed Gabr - Took just 12 minutes to descend but 15 hours to decompress',
                year: '2014',
                achievedBy: 'Ahmed Gabr',
                imageLink: '/trivia/depth1-2.jfif',
            },
            {
                title: 'Deepest Mammal Dive - Elephant Seal',
                value: '2,388m (7,835ft)',
                description: 'Elephant seals routinely dive through the sunlight zone into the twilight zone',
                imageLink: '/trivia/depth1-3.jpg',
            },
        ],
        humanVisits: [
            {
                year: 'Every day',
                mission: 'Recreational SCUBA',
                depth: '0-40m',
                notes: 'Millions of divers explore the upper sunlight zone annually',
                imageLink: '/trivia/visit1-1.webp',
            },
        ],
        analogies: [
            {
                landmark: 'Statue of Liberty',
                depth: '93m (305ft)',
                description: 'The Statue of Liberty stands 93m tall. You could stack 2 of them and still not reach the bottom of the sunlight zone!',
                zone: 'Sunlight',
                imageLink: '/trivia/analogy1-1.jpg',
            },
            {
                landmark: 'Great Pyramid of Giza',
                depth: '139m (456ft)',
                description: 'The Great Pyramid would be completely submerged in the sunlight zone, with room to spare.',
                zone: 'Sunlight',
                imageLink: '/trivia/analogy1-2.jfif',
            },
        ],
    },
    {
        zoneId: 'twilight',
        zoneName: 'The Twilight Zone',
        explorationHistory: [
            {
                title: 'First Manned Deep Dive',
                description: 'William Beebe and Otis Barton descend in the Bathysphere - a steel sphere lowered on a cable - reaching into the twilight zone for the first time in human history.',
                year: '1934',
                achievedBy: 'William Beebe, Otis Barton',
                vessel: 'Bathysphere',
                imageLink: '/trivia/exphistory2-1.jpg',
            },
            {
                title: 'First Autonomous Deep Dive',
                description: 'Jacques Piccard and Don Walsh dive the Trieste to record depths, passing through the twilight zone on their historic descent.',
                year: '1960',
                achievedBy: 'Jacques Piccard, Don Walsh',
                vessel: 'Trieste (bathyscaphe)',
                imageLink: '/trivia/exphistory2-2.jpg',
            },
        ],
        depthRecords: [
            {
                title: 'Deepest Mammal Dive - Cuvier\'s Beaked Whale',
                value: '2,992m (9,816ft)',
                description: 'Holds record for deepest and longest dive by any mammal - can stay submerged for 3.5 hours',
                year: '2020',
                achievedBy: 'Cuvier\'s beaked whale',
                imageLink: '/trivia/depth2-1.webp',
            },
            {
                title: 'Deepest Diving Seal',
                value: '2,388m (7,835ft)',
                description: 'Elephant seals regularly hunt in the twilight zone',
                imageLink: '/trivia/depth1-3.jpg',
            },
        ],
        humanVisits: [
            {
                year: '1934',
                mission: 'Bathysphere dive',
                depth: '923m (3,028ft)',
                notes: 'Beebe and Barton set depth record, first humans to see twilight zone bioluminescence',
                imageLink: '/trivia/exphistory2-1.jpg',
            },
            {
                year: '1960',
                mission: 'Trieste descent',
                depth: '~1,000m',
                notes: 'Passed through twilight zone en route to Challenger Deep',
                imageLink: '/trivia/exphistory2-2.jpg',
            },
        ],
        analogies: [
            {
                landmark: 'Eiffel Tower',
                depth: '330m (1,083ft)',
                description: 'The Eiffel Tower would just barely peek into the twilight zone - its tip would be in the sunlight zone!',
                zone: 'Twilight',
                imageLink: '/trivia/analogy2-1.webp',
            },
            {
                landmark: 'Empire State Building',
                depth: '443m (1,454ft)',
                description: 'The Empire State Building could fit entirely within the upper twilight zone, with its antenna just reaching the sunlight zone.',
                zone: 'Twilight',
                imageLink: '/trivia/analogy2-2.jpg',
            },
            {
                landmark: 'Burj Khalifa',
                depth: '828m (2,717ft)',
                description: 'The world\'s tallest building would be completely submerged in the twilight zone, with room above.',
                zone: 'Twilight',
                imageLink: '/trivia/analogy2-3.jpg',
            },
            {
                landmark: 'Shanghai Tower',
                depth: '632m (2,073ft)',
                description: 'China\'s tallest building would disappear into the twilight zone with hundreds of meters to spare.',
                zone: 'Twilight',
                imageLink: '/trivia/analogy2-4.jfif',
            },
        ],
    },
    {
        zoneId: 'midnight',
        zoneName: 'The Midnight Zone',
        explorationHistory: [
            {
                title: 'First to Reach Midnight Zone',
                description: 'The bathyscaphe Trieste becomes the first and only manned vessel to pass through the midnight zone on its way to the Challenger Deep.',
                year: '1960',
                achievedBy: 'Jacques Piccard, Don Walsh',
                vessel: 'Trieste',
                imageLink: '/trivia/exphistory2-2.jpg',
            },
            {
                title: 'First Deep-Sea Submersible',
                description: 'DSV Alvin is commissioned, becoming the most famous deep-sea research vessel in history.',
                year: '1964',
                achievedBy: 'Woods Hole Oceanographic Institution',
                vessel: 'DSV Alvin',
                imageLink: '/trivia/exphistory3-2.webp',
            },
        ],
        depthRecords: [
            {
                title: 'Deepest Diving Whale - Sperm Whale',
                value: '2,250m (7,380ft)',
                description: 'Sperm whales are the deepest diving toothed whales, hunting giant squid in complete darkness',
                imageLink: '/trivia/depth3-1.jpg',
            },
            {
                title: 'Deepest Bioluminescence',
                value: '~4,000m (13,000ft)',
                description: '80% of creatures here create their own light - the deepest visible light in the ocean',
                imageLink: '/trivia/depth3-2.jfif',
            },
            {
                title: 'Pressure Record for Fish',
                value: '~3,700m (12,100ft)',
                description: 'Maximum depth for typical bony fish before cellular functions fail',
                imageLink: '/trivia/depth3-3.jpg',
            },
        ],
        humanVisits: [
            {
                year: '1960',
                mission: 'Trieste dive',
                depth: '~3,000m',
                notes: 'First humans to traverse the midnight zone',
                imageLink: '/trivia/exphistory2-2.jpg',
            },
            {
                year: '2012',
                mission: 'Deepsea Challenger',
                depth: '~4,000m',
                notes: 'James Cameron\'s solo dive passed through this zone',
                imageLink: '/trivia/visit3-2.jpg',
            },
        ],
        analogies: [
            {
                landmark: 'Grand Canyon',
                depth: '1,857m (6,093ft)',
                description: 'The entire Grand Canyon could be flipped upside down and still not reach the surface from the midnight zone!',
                zone: 'Midnight',
                imageLink: '/trivia/analogy3-1.webp',
            },
            {
                landmark: 'Mount Fuji',
                depth: '3,776m (12,388ft)',
                description: 'Mount Fuji would be completely submerged in the midnight zone, with its peak at the twilight zone boundary.',
                zone: 'Midnight',
                imageLink: '/trivia/analogy3-2.webp',
            },
            {
                landmark: 'Mount Kilimanjaro',
                depth: '4,900m (16,100ft)',
                description: 'Africa\'s highest peak would be swallowed entirely by the midnight zone, with room for another mountain.',
                zone: 'Midnight',
                imageLink: '/trivia/analogy3-3.jpg',
            },
            {
                landmark: 'Titanic wreck',
                depth: '3,800m (12,467ft)',
                description: 'The Titanic rests in the upper midnight zone, where sunlight never reaches and pressure is 380x surface level.',
                zone: 'Midnight',
                imageLink: '/trivia/analogy3-4.jpg',
            },
            {
                landmark: 'Bismarck wreck',
                depth: '4,790m (15,715ft)',
                description: 'The German battleship Bismarck lies deeper than the Titanic, in the heart of the midnight zone.',
                zone: 'Midnight',
                imageLink: '/trivia/analogy3-5.jfif',
            },
        ],
    },
    {
        zoneId: 'abyss',
        zoneName: 'The Abyss Zone',
        explorationHistory: [
            {
                title: 'First Abyssal Exploration',
                description: 'The Danish Galathea Expedition collects samples from 10,000m, proving life exists at abyssal depths.',
                year: '1950-1952',
                achievedBy: 'Galathea Expedition',
                vessel: 'HDMS Galathea',
                imageLink: '/trivia/exphistory4-1.jpg',
            },
            {
                title: 'First Photos of Abyssal Plain',
                description: 'Woods Hole Oceanographic Institution captures first images of the abyssal seafloor.',
                year: '1960s',
                achievedBy: 'Woods Hole Oceanographic Institution',
                imageLink: '/trivia/exphistory4-2.jpg',
            },
        ],
        depthRecords: [
            {
                title: 'Deepest Octopus - Dumbo Octopus',
                value: '7,000m (23,000ft)',
                description: 'These ear-finned octopods are the deepest living octopus species',
                imageLink: '/trivia/depth4-1.webp',
            },
            {
                title: 'Deepest Starfish',
                value: '~7,500m (24,600ft)',
                description: 'Deep-sea starfish have been found at abyssal depths with up to 50 arms',
                imageLink: '/trivia/depth4-2.webp',
            },
            {
                title: 'Deepest Hydrothermal Vent',
                value: '5,000m (16,400ft)',
                description: 'Beebe Vent Field in the Cayman Trough - deepest known black smoker',
                year: '2010',
                imageLink: '/trivia/depth4-3.jpg',
            },
        ],
        humanVisits: [
            {
                year: '2012',
                mission: 'Deepsea Challenger',
                depth: '~5,000m',
                notes: 'Cameron passed through abyssal zone en route to trench',
                imageLink: '/trivia/visit3-2.jpg',
            },
        ],
        analogies: [

            {
                landmark: 'Denali (Mt McKinley)',
                depth: '6,190m (20,310ft)',
                description: 'North America\'s tallest peak would vanish completely into the abyss zone.',
                zone: 'Abyss',
                imageLink: '/trivia/analogy4-2.jfif',
            },
            {
                landmark: 'Aconcagua',
                depth: '6,961m (22,838ft)',
                description: 'South America\'s tallest mountain would be completely submerged in the abyss zone.',
                zone: 'Abyss',
                imageLink: '/trivia/analogy4-3.jpg',
            },
            {
                landmark: 'K2',
                depth: '8,611m (28,251ft)',
                description: 'The world\'s second highest peak would be entirely consumed by the abyss zone.',
                zone: 'Abyss',
                imageLink: '/trivia/analogy4-4.webp',
            },
            {
                landmark: 'Mount Everest',
                depth: '8,848m (29,029ft)',
                description: 'If you dropped Mount Everest into the abyss zone, its peak would still be 1,000m underwater!',
                zone: 'Abyss',
                imageLink: '/trivia/analogy4-1.jpg',
            },
            {
                landmark: 'Stratosphere altitude',
                depth: '~10,000m (32,800ft)',
                description: 'The abyss zone is as deep as commercial jets fly high - you\'d be in the stratosphere if you went this high!',
                zone: 'Abyss',
                imageLink: '/trivia/analogy4-5.png',
            },
        ],
    },
    {
        zoneId: 'trenches',
        zoneName: 'The Trenches (Hadal Zone)',
        explorationHistory: [
            {
                title: 'FIRST HUMAN DESCENT - CHALLENGER DEEP',
                description: 'Jacques Piccard and Don Walsh make history, descending 10,916m in the Trieste. They spend 20 minutes at the bottom, observing fish and shrimp - proving life exists at the deepest point.',
                year: 'January 23, 1960',
                achievedBy: 'Jacques Piccard, Don Walsh',
                vessel: 'Trieste (bathyscaphe)',
                imageLink: '/trivia/exphistory2-2.jpg',
            },
            {
                title: 'FIRST SOLO DESCENT',
                description: 'James Cameron pilots the Deepsea Challenger to 10,908m, spending 3 hours collecting samples and filming in 3D.',
                year: 'March 26, 2012',
                achievedBy: 'James Cameron',
                vessel: 'Deepsea Challenger',
                imageLink: '/trivia/visit3-2.jpg',
            },
            {
                title: 'MOST DIVES TO CHALLENGER DEEP',
                description: 'Victor Vescovo completes multiple dives, discovering new species and plastic pollution at the deepest point.',
                year: '2019-2020',
                achievedBy: 'Victor Vescovo',
                vessel: 'DSV Limiting Factor',
                imageLink: '/trivia/exphistory5-3.jpg',
            },
        ],
        depthRecords: [
            {
                title: 'DEEPEST POINT - CHALLENGER DEEP',
                value: '10,935m (35,876ft)',
                description: 'Mariana Trench - deepest point on Earth. Pressure: 1,100x surface pressure (8 tons per square inch)',
                year: 'Measured 2021',
                imageLink: '/trivia/depth5-1.jfif',
            },
            {
                title: 'DEEPEST FISH - MARIANA SNAILFISH',
                value: '8,178m (26,831ft)',
                description: 'Pseudoliparis swirei - discovered in 2014, has special enzymes to survive pressure',
                year: '2014',
                imageLink: '/trivia/depth5-2.jpg',
            },
            {
                title: 'DEEPEST XENOPHYOPHORE',
                value: '10,641m (34,920ft)',
                description: 'Giant single-celled organisms found at the bottom of Challenger Deep - can reach 10cm in diameter',
                imageLink: '/trivia/depth5-3.jpg',
            },
            {
                title: 'PRESSURE RECORD FOR METAL',
                value: '10,935m',
                description: 'The Trieste\'s hull withstood 110,000 tons of pressure - equivalent to 50 jumbo jets',
                imageLink: '/trivia/depth5-4.JPG',
            },
        ],
        analogies: [
            {
                landmark: 'Mount Everest upside down',
                depth: '8,848m + more',
                description: 'If you placed Mount Everest at the bottom of the Challenger Deep, its peak would still be over 2km underwater!',
                zone: 'Trenches',
                imageLink: '/trivia/analogy5-1.webp',
            },
            {
                landmark: 'Commercial jet cruising altitude',
                depth: '10,000m (32,800ft)',
                description: 'The trenches are deeper than the altitude most commercial jets fly. You\'d be in the stratosphere if you went this high!',
                zone: 'Trenches',
                imageLink: '/trivia/analogy5-2.jpg',
            },
        ],
    },
];

export const generalDepthRecords = {
    deepestDiveByMammal: {
        title: 'DEEPEST DIVING MAMMAL',
        creature: 'Cuvier\'s Beaked Whale',
        depth: '2,992m (9,816ft)',
        duration: '3 hours 42 minutes',
        fact: 'Can dive deeper than the Titanic wreck (3,800m) and longer than any other air-breathing animal',
        imageLink: '/trivia/placeholder.jpg', // Placeholder
    },
    deepestDiveByBird: {
        title: 'DEEPEST DIVING BIRD',
        creature: 'Emperor Penguin',
        depth: '565m (1,854ft)',
        duration: '27 minutes',
        fact: 'Can withstand pressure 50x surface level',
        imageLink: '/trivia/placeholder.jpg',
    },
    deepestDiveByReptile: {
        title: 'DEEPEST DIVING REPTILE',
        creature: 'Leatherback Sea Turtle',
        depth: '1,280m (4,200ft)',
        fact: 'Can survive pressure that would collapse a submarine at these depths',
        imageLink: '/trivia/placeholder.jpg',
    },
    shipwreckDepthComparisons: [
        {
            wreck: 'Titanic',
            depth: '3,800m (12,467ft)',
            zone: 'Midnight Zone',
            fact: 'The Titanic lies deeper than Mount Fuji is tall, in complete darkness.',
            imageLink: '/trivia/placeholder.jpg', // Placeholder
        },
        {
            wreck: 'Bismarck',
            depth: '4,790m (15,715ft)',
            zone: 'Midnight/Abyss boundary',
            fact: 'The Bismarck is deeper than any mountain in the Alps is tall.',
            imageLink: '/trivia/placeholder.jpg', // Placeholder
        },
        {
            wreck: 'USS Johnston (deepest shipwreck)',
            depth: '6,456m (21,180ft)',
            zone: 'Abyss Zone',
            fact: 'This destroyer escort lies deeper than Denali (Mt McKinley) is tall.',
            imageLink: '/trivia/placeholder.jpg', // Placeholder
        },
        {
            wreck: 'SS Rio Grande',
            depth: '5,762m (18,904ft)',
            zone: 'Abyss Zone',
            fact: 'This WWII blockade runner rests deeper than Aconcagua is high.',
            imageLink: '/trivia/placeholder.jpg', // Placeholder
        },
    ],
};