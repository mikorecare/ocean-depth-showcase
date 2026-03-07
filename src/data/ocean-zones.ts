export interface OceanZone {
    id: string;
    name: string;
    scientificName: string;
    depthRange: string;
    depthMeters: { min: number; max: number };
    depthFeet: { min: number; max: number };
    description: string;
    color: string;
    textColor: string;
    bgGradient: string;
    icon?: string;
    facts: string[];
    creatures: Creature[];
    trivia: string;
}

export interface Creature {
    name: string;
    image: string;
    description: string;
    fact: string;
}

export const oceanZones: OceanZone[] = [
    {
        id: 'sunlight',
        name: 'The Sunlight Zone',
        scientificName: 'Epipelagic',
        depthRange: 'Surface to 200m (0 - 650ft)',
        depthMeters: { min: 0, max: 200 },
        depthFeet: { min: 0, max: 650 },
        description: "This is our happy place - the top slice where sunlight streams in like a spotlight, fueling photosynthesis for all that floating phytoplankton goodness. It's the base of the ocean's food chain, teeming with 90% of marine life. Snorkeling in the Red Sea? You're swimming with dolphins flipping tricks, wise old sea turtles munching seagrass, and a rainbow explosion of reef fish darting everywhere. Warm waters, bright vibes, and non-stop action. Short and sweet: if it's colorful and lively, it's here.",
        color: '#7EC8E0',
        textColor: '#022B3A',
        bgGradient: 'from-cyan-200 to-blue-300',
        facts: [
            'Contains 90% of all marine life',
            'Photosynthesis happens here - the ocean\'s lungs!',
            'Average temperature: 20-25°C (68-77°F)',
            'Visible light penetrates fully'
        ],
        creatures: [
            {
                name: 'Dolphins',
                image: '/creatures/dolphin.png',
                description: 'Playful and intelligent marine mammals',
                fact: 'Dolphins sleep with one eye open and half their brain awake!'
            },
            {
                name: 'Sea turtles',
                image: '/creatures/turtles.png',
                description: 'Ancient mariners that migrate thousands of miles',
                fact: 'Sea turtles can live to be over 100 years old and return to the same beach where they were born to lay eggs.'
            },
            {
                name: 'Reef fish',
                image: '/creatures/reef-fish.png',
                description: 'Colorful community of coral reef dwellers',
                fact: 'The Great Barrier Reef is home to over 1,500 species of fish!'
            },
            {
                name: 'Tuna',
                image: '/creatures/tuna.png',
                description: 'Speedsters of the open ocean',
                fact: 'Tuna can swim up to 47 mph and must keep moving to breathe!'
            },
            {
                name: 'Jellyfish',
                image: '/creatures/jellyfish.png',
                description: 'Ancient drifters with stinging tentacles',
                fact: 'Jellyfish have been around for over 500 million years - older than dinosaurs!'
            },
            {
                name: 'Sharks',
                image: '/creatures/shark.png',
                description: 'Apex predators of the ocean',
                fact: 'Sharks have been on Earth for 400 million years and have a sixth sense - they can detect electrical fields!'
            },
            {
                name: 'Hammerhead shark',
                image: '/creatures/hammerhead.png',
                description: 'Distinctive hammer-shaped head',
                fact: 'Their wide head gives them 360-degree vision and better electroreception!'
            },
            {
                name: 'Humpback whale',
                image: '/creatures/humpback.png',
                description: 'Gentle giants known for their songs',
                fact: 'Humpback whale songs can travel thousands of miles underwater and change slightly each year!'
            },
            {
                name: 'Seals',
                image: '/creatures/seal.png',
                description: 'Playful pinnipeds that split time between land and sea',
                fact: 'Seals can hold their breath for up to 2 hours while diving!'
            },
            {
                name: 'Orca',
                image: '/creatures/orca.png',
                description: 'Killer whales - actually the largest dolphin species',
                fact: 'Orcas have distinct cultures and hunting techniques passed down through generations!'
            },
            {
                name: 'Swordfish',
                image: '/creatures/swordfish.png',
                description: 'Speed demons with a built-in sword',
                fact: 'Swordfish can heat their eyes to improve vision when hunting in cold, deep water!'
            },
            {
                name: 'Squid',
                image: '/creatures/squid.png',
                description: 'Masters of camouflage and jet propulsion',
                fact: 'Some squid have the largest eyes in the animal kingdom - the size of dinner plates!'
            }
        ],
        trivia: 'The sunlight zone is about as deep as the Statue of Liberty is tall (305ft). You could stack 2 Statues of Liberty and still not reach the bottom! 🗽'
    },
    {
        id: 'twilight',
        name: 'The Twilight Zone',
        scientificName: 'Mesopelagic',
        depthRange: '200m to 1,000m (650 - 3,300ft)',
        depthMeters: { min: 200, max: 1000 },
        depthFeet: { min: 650, max: 3300 },
        description: "Dive a bit deeper, and poof - the sun's glow fades to a spooky twilight. No more plants photosynthesizing; it's all shadows and stealth now. These guys are pros at vertical commuting: hordes of fish, squid, and sharks rocket up to the sunlight zone at night for a feast, then hide out here by day to dodge predators. Picture swordfish slicing through the dim, or cuttlefish flashing camouflage. It's cooler, dimmer, and full of migrants chasing dinner. Kinda like the ocean's night shift.",
        color: '#2A6F8D',
        textColor: '#E0F2FE',
        bgGradient: 'from-blue-600 to-blue-800',
        facts: [
            'No photosynthesis possible here',
            'Animals migrate vertically daily - the largest migration on Earth!',
            'Temperature drops to 5-10°C (41-50°F)',
            'Some light penetrates, but not enough to see colors'
        ],
        creatures: [
            {
                name: 'Squid',
                image: '/creatures/squid.png',
                description: 'Masters of the twilight zone',
                fact: 'Some twilight zone squid can change their skin texture from smooth to spiky in seconds!'
            },
            {
                name: 'Cuttlefish',
                image: '/creatures/cuttlefish.png',
                description: 'Chameleons of the sea',
                fact: 'Cuttlefish have three hearts and blue-green blood!'
            },
            {
                name: 'Lanternfish',
                image: '/creatures/lanternfish.png',
                description: 'Small fish with built-in flashlights',
                fact: 'Lanternfish are so abundant they make up 65% of all deep-sea fish biomass!'
            },
            {
                name: 'Hatchetfish',
                image: '/creatures/hatchetfish.png',
                description: 'Thin as a blade with glowing bellies',
                fact: 'Their glowing undersides match the light from above, hiding them from predators below!'
            },
            {
                name: 'Bristlemouth',
                image: '/creatures/bristlemouth.jfif',
                description: 'The most abundant vertebrate on Earth',
                fact: 'There are so many bristlemouths that if you collected them all, they\'d outweigh the rest of the fish in the ocean combined!'
            },
            {
                name: 'Swordfish',
                image: '/creatures/swordfish.png',
                description: 'Deep-diving hunters',
                fact: 'Swordfish dive into the twilight zone to hunt and can warm their eyes and brain to see better in cold water!'
            },
            {
                name: 'Frilled shark',
                image: '/creatures/frilledshark.webp',
                description: 'Living fossil with 300 teeth',
                fact: 'This "living fossil" has remained unchanged for 80 million years and looks like an eel-shark hybrid!'
            },
            {
                name: 'Sperm whale',
                image: '/creatures/spermwhale.png',
                description: 'Deep-diving champion',
                fact: 'Sperm whales dive to the twilight zone for giant squid and can hold their breath for 90 minutes!'
            }
        ],
        trivia: 'The twilight zone is deeper than the tallest building in the world - the Burj Khalifa (2,717ft). You could drop the Burj Khalifa into the ocean and it wouldn\'t reach the bottom of this zone! 🏙️'
    },
    {
        id: 'midnight',
        name: 'The Midnight Zone',
        scientificName: 'Bathypelagic',
        depthRange: '1,000m to 4,000m (3,300 - 13,000ft)',
        depthMeters: { min: 1000, max: 4000 },
        depthFeet: { min: 3300, max: 13000 },
        description: "Pitch black. Forever. Sunlight? Ancient history. It's freezing cold with pressure that'd squash us flat, but life? Oh, it parties here with its own disco lights - bioluminescence! Jellyfish pulsing neon, deep-sea shrimp popping flashes, and that nightmare-fuel anglerfish dangling a glowing bait like a fisherman's worst dream. Giant squid lurk, vampire squid drift like gothic balloons, and everything's got oversized eyes or massive jaws for snagging rare meals. Terrifying? Maybe. Totally cool? Absolutely.",
        color: '#0A3A4B',
        textColor: '#B0E0FF',
        bgGradient: 'from-blue-900 to-blue-950',
        facts: [
            'Complete darkness - the only light is bioluminescent',
            'Pressure is 100-400 times atmospheric pressure',
            'Temperature hovers around 4°C (39°F)',
            '80% of the biomass here creates its own light'
        ],
        creatures: [
            {
                name: 'Anglerfish',
                image: '/creatures/anglerfish.png',
                description: 'Nightmare fuel with a built-in fishing rod',
                fact: 'Female anglerfish have a glowing lure to attract prey, and tiny males permanently attach to females like parasites!'
            },
            {
                name: 'Giant squid',
                image: '/creatures/giantsquid.webp',
                description: 'Legendary deep-sea monster',
                fact: 'Giant squid have eyes the size of basketballs - the largest in the animal kingdom - to spot sperm whales in the dark!'
            },
            {
                name: 'Vampire squid',
                image: '/creatures/vampire-squid.png',
                description: 'Not a vampire, not a squid',
                fact: 'Vampire squid don\'t eat - they survive on "marine snow" (dead stuff) and can turn themselves inside out to hide!'
            },
            {
                name: 'Deep-sea jellyfish',
                image: '/creatures/jellyfish.png',
                description: 'Ethereal drifters of the deep',
                fact: 'Some deep-sea jellyfish have tentacles over 100 feet long - longer than a blue whale!'
            },
            {
                name: 'Gulper eel',
                image: '/creatures/pelican-eel.png',
                description: 'Living net with a massive mouth',
                fact: 'Their mouth can unhinge to swallow prey much larger than themselves, like a pelican!'
            },
            {
                name: 'Dragonfish',
                image: '/creatures/dragonfish.webp',
                description: 'Tiny terror with giant teeth',
                fact: 'They produce red light that most deep-sea creatures can\'t see, giving them a secret hunting advantage!'
            },
            {
                name: 'Fangtooth',
                image: '/creatures/fangtooth.jpg',
                description: 'Biggest teeth for its size of any fish',
                fact: 'Their teeth are so long they have special sockets in their brain case to close their mouths!'
            },
            {
                name: 'Colossal squid',
                image: '/creatures/collosal-squid.jpg',
                description: 'Heavier and more massive than giant squid',
                fact: 'They have swiveling hooks on their tentacle clubs - like something from a sci-fi movie!'
            },
            {
                name: 'Stoplight loosejaw',
                image: '/creatures/stoplight-loosejaw.jpg',
                description: 'Red light sniper of the deep',
                fact: 'They have a red headlight that acts like night-vision goggles, letting them see prey that can\'t see them!'
            },
            {
                name: 'Black swallower',
                image: '/creatures/blackswallower.png',
                description: 'Glutton of the abyss',
                fact: 'It can swallow fish twice its size and four times its mass, with a stomach that stretches like a balloon!'
            },
            {
                name: 'Giant isopod',
                image: '/creatures/giant-isopod.webp',
                description: 'Deep-sea roly-poly the size of a cat',
                fact: 'They can go years without eating - one in captivity survived 5 years without food!'
            },
            {
                name: 'Deep-sea shrimp',
                image: '/creatures/deepsea-shrimp.jpg',
                description: 'Bioluminescent cleanup crew',
                fact: 'Some deep-sea shrimp spit glowing vomit at predators to escape!'
            }
        ],
        trivia: 'The midnight zone is deeper than 4 Empire State Buildings stacked on top of each other (each 1,454ft tall). The pressure here would crush a submarine like a soda can! 🥫'
    },
    {
        id: 'abyss',
        name: 'The Abyss Zone',
        scientificName: 'Abyssopelagic',
        depthRange: '4,000m to 6,000m (13,000 - 20,000ft)',
        depthMeters: { min: 4000, max: 6000 },
        depthFeet: { min: 13000, max: 20000 },
        description: '"Abyss" means bottomless for a reason - this vast, muddy expanse blankets most of the seafloor, with temps near freezing and pressure so intense it\'d turn your Styrofoam dive souvenir into a thimble. Food\'s a rare treat, mostly "marine snow" - flakes of dead stuff drifting down like sad confetti. Creatures here are energy-savers: ghostly transparent fish, tripod fish propped like alien tripods, slow-moving sea cucumbers, and deep-sea sharks cruising the plains. It\'s 83% of the ocean, yet feels like a barren frontier. Slow, sparse, surreal.',
        color: '#021C24',
        textColor: '#C0D0E0',
        bgGradient: 'from-blue-950 to-slate-950',
        facts: [
            'Covers 83% of the ocean floor',
            'Temperature just above freezing: 2-3°C (35-37°F)',
            'Food source: marine snow (dead stuff from above)',
            'Pressure: 400-600 times atmospheric pressure'
        ],
        creatures: [
            {
                name: 'Tripod fish',
                image: '/creatures/tripodfish.jpg',
                description: 'Stands on stilts waiting for food',
                fact: 'They perch on long fins and face the current, waiting for food to drift into their mouths!'
            },
            {
                name: 'Sea cucumbers',
                image: '/creatures/seacucumber.jpg',
                description: 'Vacuum cleaners of the deep',
                fact: 'They breathe through their anus and can eject their guts to confuse predators!'
            },
            {
                name: 'Deep-sea sharks',
                image: '/creatures/greenland-shark.jpg',
                description: 'Slow-moving abyssal predators',
                fact: 'Greenland sharks can live for 400+ years - they don\'t reach maturity until 150 years old!'
            },
            {
                name: 'Giant isopods',
                image: '/creatures/giant-isopod.webp',
                description: 'Dinner-plate sized roly-polies',
                fact: 'They have four sets of jaws to crush prey and can roll into a ball like their tiny cousins!'
            },
            {
                name: 'Grenadiers',
                image: '/creatures/grenadier.jpg',
                description: 'Most abundant deep-sea fish',
                fact: 'They have massive heads and tapering bodies, and their otoliths (ear stones) can reveal their age like tree rings!'
            },
            {
                name: 'Cusk eels',
                image: '/creatures/cusk-eel.jpg',
                description: 'Eel-like bottom dwellers',
                fact: 'Some species live in deep-sea trenches and have been found at 8,000 meters!'
            },
            {
                name: 'Dumbo octopus',
                image: '/creatures/dumbo-octupus.webp',
                description: 'Ear-like fins make it look like Dumbo',
                fact: 'They swim by flapping their ear-like fins and are the deepest living octopus!'
            },
            {
                name: 'Deep-sea starfish',
                image: '/creatures/deepsea-starfish.jpeg',
                description: 'Abyssal stars',
                fact: 'Some deep-sea starfish have up to 50 arms and can regenerate lost limbs!'
            },
            {
                name: 'Sea pig',
                image: '/creatures/seapig.webp',
                description: 'Pink, plump sea cucumber',
                fact: 'They use tube feet to walk on the seafloor and have a transparent body showing their insides!'
            },
            {
                name: 'Yeti crab',
                image: '/creatures/yeti-crab.png',
                description: 'Hairy crab with its own food farm',
                fact: 'They grow bacteria on their furry arms and "farm" them for food near hydrothermal vents!'
            },
            {
                name: 'Sea spider',
                image: '/creatures/sea-spider.jpg',
                description: 'Not actually spiders',
                fact: 'Their legs are so thin that they absorb oxygen directly through their exoskeleton - no lungs or gills!'
            }
        ],
        trivia: 'The abyss zone is deeper than Mount Everest is tall (29,029ft). If you dropped Everest in, its peak would still be 10,000ft underwater! 🏔️'
    },
    {
        id: 'trenches',
        name: 'The Trenches',
        scientificName: 'Hadalpelagic',
        depthRange: '6,000m+ (20,000ft+)',
        depthMeters: { min: 6000, max: 11000 },
        depthFeet: { min: 20000, max: 36000 },
        description: "The grand finale: Earth's deepest scars, like the Mariana Trench, where pressure hits eight tons per square inch and it's hadal-hell cold. Scientists once bet nothing lived here. Wrong! Around hydrothermal vents - underwater volcanoes spewing mineral-rich heat - chemosynthesis rules. No sun needed; bacteria munch chemicals, feeding giant tube worms (up to 2.4m long!), eyeless shrimp, and snailfish. It's alien life on our own planet, thriving in the underworld.",
        color: '#010B0F',
        textColor: '#A0C0D0',
        bgGradient: 'from-slate-950-to-black',
        facts: [
            'Deepest point: Challenger Deep at 10,935m',
            'Pressure: 1,100+ times atmospheric pressure',
            'Hydrothermal vents support life through chemosynthesis',
            'Some trenches are deeper than Everest is tall'
        ],
        creatures: [
            {
                name: 'Giant tube worms',
                image: '/creatures/worm.jpg',
                description: 'Red plumes, no mouth or stomach',
                fact: 'They have no digestive system - bacteria inside them convert chemicals into food!'
            },
            {
                name: 'Snailfish',
                image: '/creatures/snailfish.jpg',
                description: 'Deepest living fish ever found',
                fact: 'Mariana snailfish were found at 26,000ft - they have special enzymes to survive crushing pressure!'
            },
            {
                name: 'Amphipods',
                image: '/creatures/deepsea-amphipod.jpg',
                description: 'Tiny shrimp-like scavengers',
                fact: 'Some trench amphipods are giant - up to 1 foot long - and eat wood falling from the surface!'
            },
            {
                name: 'Foraminifera',
                image: '/creatures/foraminifera.webp',
                description: 'Single-celled shell builders',
                fact: 'These tiny creatures build intricate shells and have been found at the very bottom of Challenger Deep!'
            },
            {
                name: 'Deep-sea shrimp',
                image: '/creatures/rimicari.jpg',
                description: 'Vent shrimp with no eyes',
                fact: 'Rimicaris shrimp have a "light organ" on their backs that might sense heat from vents!'
            },
            {
                name: 'Hadal snailfish',
                image: '/creatures/mariana-snailfish.avif',
                description: 'Masters of the deep',
                fact: 'They have transparent bodies and no swim bladder - the pressure would crush it anyway!'
            },
            {
                name: 'Zombie worms',
                image: '/creatures/zombie-worm.jpg',
                description: 'Bone-eating worms',
                fact: 'They have no mouth or stomach - they secrete acid to dissolve bones and absorb nutrients through their skin!'
            },
            {
                name: 'Vent fish',
                image: '/creatures/vent-fish.jpg',
                description: 'Heat lovers of the deep',
                fact: 'These fish can withstand dramatic temperature changes - from near-freezing to 400°C vent water!'
            },
            {
                name: 'Yeti crab',
                image: '/creatures/yeti-crab.png',
                description: 'Furry vent dweller',
                fact: 'They wave their arms in vent water to farm bacteria, then eat the bacteria like a garden!'
            },
            {
                name: 'Rimicaris shrimp',
                image: '/creatures/rimicari.jpg',
                description: 'Eyeless vent shrimp',
                fact: 'They swarm by the thousands around vents, with a heat-sensing organ on their backs instead of eyes!'
            }
        ],
        trivia: 'The Mariana Trench is so deep (36,000ft) that if you could walk straight down, it would take you over 2 hours of non-stop falling to reach the bottom! The pressure is equivalent to 50 jumbo jets stacked on your head! ✈️'
    }
];

export const challengerDeep = {
    depth: '10,935 ± 6 meters',
    depthFeet: '35,876 ± 20 feet',
    location: 'Southern end of Mariana Trench, Western Pacific Ocean',
    pressure: '1,086 bar (15,750 psi) - over 1,000 times surface pressure',
    temperature: '1-4°C (34-39°F)',
    firstDescent: '1960 - Trieste (Don Walsh & Jacques Piccard)',
    filmDescent: '2012 - James Cameron (Deepsea Challenger)',
    comparison: 'If you placed Mount Everest at the bottom, its peak would still be over 2km underwater!'
};