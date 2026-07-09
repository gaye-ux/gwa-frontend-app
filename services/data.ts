import { Wrestler, Ekiri, Combat, HeadToHead, GwaEvent, TicketTier, AppNotification, NewsArticle, SeasonEvent, ArenaMatch, RankingCategory } from './types';

// ============================================================================
// WRESTLERS
// ============================================================================

export const wrestlers: Wrestler[] = [
  {
    id: 'w-1',
    name: 'MODOU LO',
    nickname: 'The King of Thiaroye',
    age: 35,
    height: '1.85 M',
    weight: '115 KG',
    dateOfBirth: '1991-03-15',
    placeOfBirth: 'Thiaroye, Senegal',
    biography: 'Modou Lo is widely regarded as one of the greatest traditional wrestlers of his generation. Known for his incredible grip strength and tactical approach, he has dominated the heavyweight division for nearly a decade. His rivalry with Balla Gaye 2 is legendary in Gambian wrestling.',
    image: require('@/assets/images/fighter_1.png'),
    gallery: [require('@/assets/images/fighter_1.png'), require('@/assets/images/fighter_2.png')],
    ekiriId: 'ekiri-1',
    ekiriName: 'ROCK ENERGY',
    careerDebut: '2010',
    totalFights: 25,
    wins: 22,
    losses: 3,
    draws: 0,
    knockouts: 14,
    winningPercentage: 88,
    currentRanking: 1,
    titles: ['Heavyweight Champion (2018)', 'King of the Arena (2020)', 'GWA Heavyweight Title (2022)'],
    achievements: ['Most consecutive title defenses', 'Fighter of the Year 2022', 'Hall of Fame Inductee 2024'],
    fightingStyle: 'Grip & Control',
    last5Results: ['W', 'W', 'W', 'L', 'W'],
    winStreak: 3,
    points: 1250,
  },
  {
    id: 'w-2',
    name: 'BALLA GAYE 2',
    nickname: 'Lion of Guédiawaye',
    age: 37,
    height: '1.90 M',
    weight: '120 KG',
    dateOfBirth: '1989-07-22',
    placeOfBirth: 'Guédiawaye, Senegal',
    biography: 'Balla Gaye 2 carries the legacy of his legendary father, Balla Gaye. Standing at 1.90m, his reach and power make him a formidable opponent. Known for his explosive throws and devastating slams, he has been at the top of the rankings for over a decade.',
    image: require('@/assets/images/fighter_2.png'),
    gallery: [require('@/assets/images/fighter_2.png'), require('@/assets/images/fighter_1.png')],
    ekiriId: 'ekiri-2',
    ekiriName: 'ECOLE BALLA GAYE',
    careerDebut: '2008',
    totalFights: 27,
    wins: 21,
    losses: 5,
    draws: 1,
    knockouts: 16,
    winningPercentage: 78,
    currentRanking: 2,
    titles: ['Heavyweight Champion (2015)', 'GWA Grand Champion (2019)'],
    achievements: ['Fastest KO in GWA history (12 seconds)', 'Most throws in a single match (7)'],
    fightingStyle: 'Power & Throw',
    last5Results: ['L', 'W', 'W', 'W', 'L'],
    winStreak: 2,
    points: 1120,
  },
  {
    id: 'w-3',
    name: 'EUMEU SENE',
    nickname: 'Tay Shinger',
    age: 36,
    height: '1.80 M',
    weight: '110 KG',
    dateOfBirth: '1990-11-08',
    placeOfBirth: 'Dakar, Senegal',
    biography: 'Eumeu Sene is a technically gifted wrestler known for his agility and quick footwork. Despite not being the heaviest in the division, his technique and ring intelligence have earned him victories over larger opponents.',
    image: require('@/assets/images/fighter_1.png'),
    gallery: [],
    ekiriId: 'ekiri-3',
    ekiriName: 'CLAN TAY SHINGER',
    careerDebut: '2011',
    totalFights: 24,
    wins: 18,
    losses: 5,
    draws: 1,
    knockouts: 8,
    winningPercentage: 75,
    currentRanking: 3,
    titles: ['Lightweight Champion (2017)', 'Best Technique Award (2021)'],
    achievements: ['Longest undefeated streak in lightweight (12 fights)'],
    fightingStyle: 'Agility & Counter',
    last5Results: ['W', 'W', 'L', 'W', 'W'],
    winStreak: 4,
    points: 980,
  },
  {
    id: 'w-4',
    name: 'TAPHA TINE',
    nickname: 'Giant of Baol',
    age: 34,
    height: '1.88 M',
    weight: '105 KG',
    dateOfBirth: '1992-04-17',
    placeOfBirth: 'Baol, Senegal',
    biography: 'Tapha Tine represents the Baol Mbollo with pride. Known for his endurance and never-say-die attitude, he has been a top contender for years. His matches are known for going the distance.',
    image: require('@/assets/images/fighter_2.png'),
    gallery: [],
    ekiriId: 'ekiri-4',
    ekiriName: 'BAOL MBOLLO',
    careerDebut: '2012',
    totalFights: 23,
    wins: 16,
    losses: 6,
    draws: 1,
    knockouts: 7,
    winningPercentage: 70,
    currentRanking: 4,
    titles: ['Rising Star Award (2014)'],
    achievements: ['Most fights that went the distance (12)', 'Fan Favorite Award 2023'],
    fightingStyle: 'Endurance & Counter',
    last5Results: ['L', 'W', 'L', 'W', 'W'],
    winStreak: 2,
    points: 850,
  },
  {
    id: 'w-5',
    name: 'GRIS BORDEAUX',
    nickname: '3rd Tiger of Fass',
    age: 33,
    height: '1.82 M',
    weight: '108 KG',
    dateOfBirth: '1993-09-30',
    placeOfBirth: 'Fass, Senegal',
    biography: 'Gris Bordeaux is the pride of Fass Mbollo. His aggressive style and powerful strikes have earned him a fearsome reputation. Known for his signature "Bordeaux Slam" that has ended many fights.',
    image: require('@/assets/images/fighter_1.png'),
    gallery: [],
    ekiriId: 'ekiri-5',
    ekiriName: 'FASS MBOLLO',
    careerDebut: '2013',
    totalFights: 22,
    wins: 18,
    losses: 4,
    draws: 0,
    knockouts: 12,
    winningPercentage: 82,
    currentRanking: 5,
    titles: ['Heavyweight Contender Title (2021)'],
    achievements: ['Most KOs in a single season (6)', 'Fighter of the Month (June 2023)'],
    fightingStyle: 'Aggressive Striker',
    last5Results: ['W', 'W', 'L', 'L', 'W'],
    winStreak: 1,
    points: 810,
  },
  {
    id: 'w-6',
    name: 'LAC DE GUIERS 2',
    nickname: 'The Technician',
    age: 29,
    height: '1.78 M',
    weight: '98 KG',
    dateOfBirth: '1997-02-14',
    placeOfBirth: 'Saint-Louis, Senegal',
    biography: 'Lac de Guiers 2 is a rising star known for his technical precision. Coming from the Rock Energy academy, he combines traditional techniques with modern training methods.',
    image: require('@/assets/images/fighter_2.png'),
    gallery: [],
    ekiriId: 'ekiri-1',
    ekiriName: 'ROCK ENERGY',
    careerDebut: '2016',
    totalFights: 15,
    wins: 13,
    losses: 2,
    draws: 0,
    knockouts: 6,
    winningPercentage: 87,
    currentRanking: 6,
    titles: ['Prospect of the Year (2019)', 'Lightweight Contender (2022)'],
    achievements: ['Fastest rise in rankings (6 positions in 2 years)'],
    fightingStyle: 'Technical Ground',
    last5Results: ['W', 'W', 'W', 'W', 'L'],
    winStreak: 4,
    points: 740,
  },
  {
    id: 'w-7',
    name: 'REUG REUG',
    nickname: 'The Iron Wall',
    age: 31,
    height: '1.86 M',
    weight: '112 KG',
    dateOfBirth: '1995-06-20',
    placeOfBirth: 'Thiès, Senegal',
    biography: 'Reug Reug is known for his iron-like defense. Very few wrestlers have managed to throw him off balance. His patient, counter-attacking style frustrates opponents and leads to late-match victories.',
    image: require('@/assets/images/fighter_1.png'),
    gallery: [],
    ekiriId: 'ekiri-3',
    ekiriName: 'CLAN TAY SHINGER',
    careerDebut: '2014',
    totalFights: 20,
    wins: 15,
    losses: 4,
    draws: 1,
    knockouts: 5,
    winningPercentage: 75,
    currentRanking: 7,
    titles: ['Best Defense Award (2022)'],
    achievements: ['Lowest takedown percentage against'],
    fightingStyle: 'Defensive Counter',
    last5Results: ['L', 'W', 'W', 'L', 'W'],
    winStreak: 1,
    points: 690,
  },
  {
    id: 'w-8',
    name: 'AMA BALDE',
    nickname: 'The Giant Killer',
    age: 27,
    height: '1.83 M',
    weight: '102 KG',
    dateOfBirth: '1999-08-12',
    placeOfBirth: 'Banjul, Gambia',
    biography: 'Ama Balde represents Gambian wrestling with pride. As one of the few Gambian-born wrestlers in the top ranks, he carries the hopes of a nation. Known for his explosive power and patriotic spirit.',
    image: require('@/assets/images/fighter_2.png'),
    gallery: [],
    ekiriId: 'ekiri-2',
    ekiriName: 'ECOLE BALLA GAYE',
    careerDebut: '2017',
    totalFights: 14,
    wins: 11,
    losses: 3,
    draws: 0,
    knockouts: 9,
    winningPercentage: 79,
    currentRanking: 8,
    titles: ['Gambian Champion (2023)'],
    achievements: ['First Gambian to win 5 consecutive fights', 'Rising Star 2023'],
    fightingStyle: 'Power & Speed',
    last5Results: ['W', 'W', 'L', 'W', 'W'],
    winStreak: 3,
    points: 650,
  },
  {
    id: 'w-9',
    name: 'MOUSSA NDOYE',
    nickname: 'The Silent Assassin',
    age: 30,
    height: '1.75 M',
    weight: '95 KG',
    dateOfBirth: '1996-01-05',
    placeOfBirth: 'Kaolack, Senegal',
    biography: 'Quiet outside the ring but deadly inside it, Moussa Ndoye lets his wrestling do the talking. His rapid strikes and unpredictable style make him a dangerous opponent for anyone.',
    image: require('@/assets/images/fighter_1.png'),
    gallery: [],
    ekiriId: 'ekiri-4',
    ekiriName: 'BAOL MBOLLO',
    careerDebut: '2015',
    totalFights: 19,
    wins: 14,
    losses: 5,
    draws: 0,
    knockouts: 10,
    winningPercentage: 74,
    currentRanking: 9,
    titles: ['Knockout Artist Award (2020)'],
    achievements: ['Most first-round KOs (7)'],
    fightingStyle: 'Explosive Striker',
    last5Results: ['W', 'L', 'W', 'L', 'W'],
    winStreak: 1,
    points: 610,
  },
  {
    id: 'w-10',
    name: 'SITEU',
    nickname: 'The Rising Phoenix',
    age: 25,
    height: '1.80 M',
    weight: '100 KG',
    dateOfBirth: '2001-03-28',
    placeOfBirth: 'Ziguinchor, Senegal',
    biography: 'Siteu is the youngest wrestler in the top 10 rankings. His meteoric rise has captured the imagination of fans across the region. Known for his athleticism and innovative techniques.',
    image: require('@/assets/images/fighter_2.png'),
    gallery: [],
    ekiriId: 'ekiri-5',
    ekiriName: 'FASS MBOLLO',
    careerDebut: '2019',
    totalFights: 11,
    wins: 9,
    losses: 2,
    draws: 0,
    knockouts: 5,
    winningPercentage: 82,
    currentRanking: 10,
    titles: ['Young Wrestler of the Year (2023)'],
    achievements: ['Fastest debut to top 10 ranking', 'Most improved fighter 2023'],
    fightingStyle: 'Acrobatic & Unpredictable',
    last5Results: ['W', 'W', 'L', 'W', 'W'],
    winStreak: 3,
    points: 580,
  },
];

// ============================================================================
// EKIRI (WRESTLING GROUPS)
// ============================================================================

export const ekiriList: Ekiri[] = [
  {
    id: 'ekiri-1',
    name: 'ROCK ENERGY',
    logo: require('@/assets/images/fighter_1.png'),
    bannerColor: '#E53E3E',
    description: 'Rock Energy is one of the most dominant Ekiri in Gambian wrestling. Known for producing disciplined, technically sound wrestlers who compete at the highest level.',
    history: 'Founded in 2005, Rock Energy has grown from a small training group into a powerhouse of traditional wrestling. Their training academy in Thiaroye has produced some of the sport\'s biggest names.',
    founded: '2005',
    location: 'Thiaroye, Senegal',
    totalFights: 120,
    totalVictories: 85,
    totalTitles: 12,
    ranking: 1,
    wrestlerIds: ['w-1', 'w-6'],
    coach: 'Moustapha Guèye',
  },
  {
    id: 'ekiri-2',
    name: 'ECOLE BALLA GAYE',
    logo: require('@/assets/images/fighter_2.png'),
    bannerColor: '#3B82F6',
    description: 'Founded by the legendary Balla Gaye, this Ekiri carries a rich legacy of champions. Known for producing powerful, aggressive wrestlers.',
    history: 'Ecole Balla Gaye was established by the iconic Balla Gaye, a legend of Gambian wrestling. The Ekiri has maintained its founder\'s tradition of producing champions with devastating power.',
    founded: '1998',
    location: 'Guédiawaye, Senegal',
    totalFights: 135,
    totalVictories: 90,
    totalTitles: 15,
    ranking: 2,
    wrestlerIds: ['w-2', 'w-8'],
    coach: 'Balla Gaye Sr.',
  },
  {
    id: 'ekiri-3',
    name: 'CLAN TAY SHINGER',
    logo: require('@/assets/images/fighter_1.png'),
    bannerColor: '#10B981',
    description: 'Tay Shinger is known for technical excellence and producing agile wrestlers who rely on skill rather than sheer power.',
    history: 'Tay Shinger emerged as a technical powerhouse in the mid-2000s. Their focus on wrestling technique and strategy has produced some of the most technically gifted wrestlers.',
    founded: '2006',
    location: 'Dakar, Senegal',
    totalFights: 105,
    totalVictories: 70,
    totalTitles: 8,
    ranking: 3,
    wrestlerIds: ['w-3', 'w-7'],
    coach: 'Mamadou Ndiaye',
  },
  {
    id: 'ekiri-4',
    name: 'BAOL MBOLLO',
    logo: require('@/assets/images/fighter_2.png'),
    bannerColor: '#F59E0B',
    description: 'Baol Mbollo represents the historic Baol region. Their wrestlers are known for their endurance and never-say-die attitude.',
    history: 'Rooted in the ancient wrestling traditions of the Baol kingdom, this Ekiri has a history stretching back generations. They pride themselves on producing warriors with unmatched stamina.',
    founded: '1995',
    location: 'Baol, Senegal',
    totalFights: 98,
    totalVictories: 62,
    totalTitles: 6,
    ranking: 4,
    wrestlerIds: ['w-4', 'w-9'],
    coach: 'Omar Sall',
  },
  {
    id: 'ekiri-5',
    name: 'FASS MBOLLO',
    logo: require('@/assets/images/fighter_1.png'),
    bannerColor: '#8B5CF6',
    description: 'Fass Mbollo is renowned for producing aggressive, hard-hitting wrestlers who specialize in explosive finishes.',
    history: 'Founded by wrestling veterans from the Fass district, this Ekiri has built a reputation for aggressive, fan-friendly wrestling. Their stable includes some of the most exciting fighters.',
    founded: '2008',
    location: 'Fass, Senegal',
    totalFights: 88,
    totalVictories: 55,
    totalTitles: 5,
    ranking: 5,
    wrestlerIds: ['w-5', 'w-10'],
    coach: 'Ibrahima Fall',
  },
];

// ============================================================================
// HEAD TO HEAD
// ============================================================================

export const headToHeads: HeadToHead[] = [
  {
    fighter1Id: 'w-1',
    fighter2Id: 'w-2',
    fighter1Wins: 3,
    fighter2Wins: 2,
    draws: 0,
    meetings: ['combat-main-1', 'combat-main-2', 'combat-main-3', 'combat-main-4', 'combat-main-5'],
  },
  {
    fighter1Id: 'w-3',
    fighter2Id: 'w-4',
    fighter1Wins: 2,
    fighter2Wins: 1,
    draws: 1,
    meetings: ['combat-2-1', 'combat-2-2', 'combat-2-3', 'combat-2-4'],
  },
  {
    fighter1Id: 'w-5',
    fighter2Id: 'w-7',
    fighter1Wins: 2,
    fighter2Wins: 1,
    draws: 0,
    meetings: ['combat-3-1', 'combat-3-2', 'combat-3-3'],
  },
  {
    fighter1Id: 'w-6',
    fighter2Id: 'w-8',
    fighter1Wins: 2,
    fighter2Wins: 0,
    draws: 0,
    meetings: ['combat-4-1', 'combat-4-2'],
  },
  {
    fighter1Id: 'w-9',
    fighter2Id: 'w-10',
    fighter1Wins: 0,
    fighter2Wins: 1,
    draws: 0,
    meetings: ['combat-5-1'],
  },
];

// ============================================================================
// COMBATS
// ============================================================================

export const combats: Combat[] = [
  {
    id: 'combat-main-1',
    eventId: 'event-1',
    fighter1Id: 'w-1',
    fighter2Id: 'w-2',
    isMainCombat: true,
    title: 'HEAVYWEIGHT TITLE',
    championship: 'GWA Heavyweight Championship',
    odds1: '-140',
    odds2: '+115',
    status: 'upcoming',
    order: 5,
    referee: 'Amadou Diop',
  },
  {
    id: 'combat-2-1',
    eventId: 'event-1',
    fighter1Id: 'w-3',
    fighter2Id: 'w-4',
    isMainCombat: false,
    championship: 'Lightweight Bout',
    odds1: '-110',
    odds2: '-105',
    status: 'upcoming',
    order: 3,
    referee: 'Mamadou Faye',
  },
  {
    id: 'combat-1-3',
    eventId: 'event-1',
    fighter1Id: 'w-5',
    fighter2Id: 'w-7',
    isMainCombat: false,
    championship: 'Heavyweight Qualifier',
    odds1: '-120',
    odds2: '+100',
    status: 'upcoming',
    order: 4,
    referee: 'Cheikh Ndiaye',
  },
  {
    id: 'combat-1-4',
    eventId: 'event-1',
    fighter1Id: 'w-6',
    fighter2Id: 'w-8',
    isMainCombat: false,
    championship: 'Rising Stars Showcase',
    odds1: '-115',
    odds2: '-105',
    status: 'upcoming',
    order: 2,
    referee: 'Ibrahima Sy',
  },
  {
    id: 'combat-1-5',
    eventId: 'event-1',
    fighter1Id: 'w-9',
    fighter2Id: 'w-10',
    isMainCombat: false,
    championship: 'Opening Bout',
    odds1: '+120',
    odds2: '-140',
    status: 'upcoming',
    order: 1,
    referee: 'Samba Diallo',
  },
  {
    id: 'combat-e2-1',
    eventId: 'event-2',
    fighter1Id: 'w-6',
    fighter2Id: 'w-8',
    isMainCombat: true,
    title: 'FEATHERWEIGHT FINALS',
    championship: 'Regional Featherweight Championship',
    odds1: '-130',
    odds2: '+110',
    status: 'upcoming',
    order: 5,
    referee: 'Amadou Diop',
  },
  {
    id: 'combat-e3-1',
    eventId: 'event-3',
    fighter1Id: 'w-1',
    fighter2Id: 'w-5',
    isMainCombat: true,
    title: 'LEGENDS BOUT',
    championship: 'Heavyweight Icons Match',
    odds1: '-150',
    odds2: '+125',
    status: 'upcoming',
    order: 5,
    referee: 'Mamadou Faye',
  },
];

// ============================================================================
// EVENTS
// ============================================================================

export const ticketTiers: TicketTier[] = [
  { id: 'ticket-std', name: 'STANDARD', price: 'D500', perks: 'General Perimeter Access', available: 500, total: 500, highlighted: false },
  { id: 'ticket-prem', name: 'PREMIUM', price: 'D1,500', perks: 'Premium Seating + Free Drink', available: 200, total: 200, highlighted: true },
  { id: 'ticket-vip', name: 'VIP ELITE', price: 'D5,000', perks: 'Exclusive Meet & Greet + VIP Lounge', available: 50, total: 50, highlighted: false },
];

export const eventsData: GwaEvent[] = [
  {
    id: 'event-1',
    badge: 'MAIN EVENT',
    seriesName: 'KING OF THE ARENA SERIES',
    title: "THE TITAN'S CLASH",
    fighter1Id: 'w-1',
    fighter2Id: 'w-2',
    fighter1Name: 'MODOU LO',
    fighter2Name: 'BALLA GAYE 2',
    date: 'OCT 24',
    time: '18:00 GMT',
    venue: 'INDEPENDENCE STADIUM',
    countdownTarget: '2026-10-24T18:00:00Z',
    heroImage: require('@/assets/images/hero_fighters.png'),
    status: 'upcoming',
    description: 'The biggest event of the year! Modou Lo defends his Heavyweight Championship against his arch-rival Balla Gaye 2 in what promises to be an epic showdown. Five explosive fights on the card.',
    sponsors: ['Gambia Telecom', 'Energy Drink Pro', 'National Lottery', 'Sunu Assurance'],
    combatIds: ['combat-main-1', 'combat-1-3', 'combat-2-1', 'combat-1-4', 'combat-1-5'],
    tickets: ticketTiers,
    startingPrice: 'D500',
  },
  {
    id: 'event-2',
    badge: 'UNDERCARD SHOWCASE',
    seriesName: 'Regional Featherweight Finals',
    title: 'YOUNG LIONS DUEL',
    fighter1Id: 'w-6',
    fighter2Id: 'w-8',
    fighter1Name: 'LAC DE GUIERS 2',
    fighter2Name: 'AMA BALDE',
    date: 'NOV 05',
    time: '18:30 GMT',
    venue: 'Serrekunda East Arena',
    countdownTarget: '2026-11-05T18:30:00Z',
    heroImage: require('@/assets/images/arena_live_thumb.png'),
    status: 'upcoming',
    description: 'The future of Gambian wrestling is on display as the top featherweight contenders battle for regional supremacy. Featuring the hottest rising stars.',
    sponsors: ['Local Sports Network', 'City Brewery'],
    combatIds: ['combat-e2-1'],
    tickets: [
      { id: 'ticket-e2-std', name: 'STANDARD', price: 'D250', perks: 'General Access', available: 300, total: 300, highlighted: false },
      { id: 'ticket-e2-prem', name: 'PREMIUM', price: 'D750', perks: 'Premium Seating', available: 100, total: 100, highlighted: true },
    ],
    startingPrice: 'D250',
  },
  {
    id: 'event-3',
    badge: 'LEGENDS INVITATIONAL',
    seriesName: 'Heavyweight Icons Match',
    title: 'LEGACY BOWL',
    fighter1Id: 'w-1',
    fighter2Id: 'w-5',
    fighter1Name: 'MODOU LO',
    fighter2Name: 'GRIS BORDEAUX',
    date: 'DEC 12',
    time: '21:00 GMT',
    venue: 'The Grand Arena, Banjul',
    countdownTarget: '2026-12-12T21:00:00Z',
    heroImage: require('@/assets/images/calendar_event_2.png'),
    status: 'upcoming',
    description: 'Two generations collide as champion Modou Lo takes on the hard-hitting Gris Bordeaux. A special invitational event celebrating the rich history of Gambian wrestling.',
    sponsors: ['Heritage Bank', 'Global Sports Inc.'],
    combatIds: ['combat-e3-1'],
    tickets: [
      { id: 'ticket-e3-std', name: 'STANDARD', price: 'D1,000', perks: 'General Perimeter', available: 400, total: 400, highlighted: false },
      { id: 'ticket-e3-vip', name: 'VIP ELITE', price: 'D3,000', perks: 'VIP Experience + Meet & Greet', available: 30, total: 30, highlighted: true },
    ],
    startingPrice: 'D1,000',
  },
  {
    id: 'event-4',
    badge: 'LIVE NOW',
    seriesName: 'Season Opener',
    title: 'ARENA WARS II',
    fighter1Id: 'w-3',
    fighter2Id: 'w-4',
    fighter1Name: 'EUMEU SENE',
    fighter2Name: 'TAPHA TINE',
    date: 'TODAY',
    time: '19:00 GMT',
    venue: 'Demba Diop Stadium',
    countdownTarget: '2026-07-09T19:00:00Z',
    heroImage: require('@/assets/images/arena_live_thumb.png'),
    status: 'live',
    description: 'The season opener features an exciting lightweight showdown between Eumeu Sene and Tapha Tine. The atmosphere is electric as fans pack the historic Demba Diop Stadium.',
    sponsors: ['Sport Plus TV', 'Energy Drink Pro'],
    combatIds: [],
    tickets: ticketTiers,
    startingPrice: 'D500',
  },
  {
    id: 'event-5',
    badge: 'PAST EVENT',
    seriesName: 'Championship Series',
    title: 'BATTLE OF THE TITANS',
    fighter1Id: 'w-1',
    fighter2Id: 'w-4',
    fighter1Name: 'MODOU LO',
    fighter2Name: 'TAPHA TINE',
    date: 'JUN 15',
    time: '18:00 GMT',
    venue: 'Independence Stadium',
    countdownTarget: '2026-06-15T18:00:00Z',
    heroImage: require('@/assets/images/hero_fighters.png'),
    status: 'finished',
    description: 'A night of incredible combat as Modou Lo successfully defended his title against Tapha Tine in a grueling five-round affair.',
    sponsors: ['Gambia Telecom', 'National Lottery'],
    combatIds: [],
    tickets: ticketTiers,
    startingPrice: 'D500',
  },
];

// ============================================================================
// ARENA LIVE
// ============================================================================

export const arenaLive: ArenaMatch = {
  id: 'live-1',
  thumbnail: require('@/assets/images/arena_live_thumb.png'),
  championship: 'Lightweight Championship',
  fighter1: 'EUMEU SENE',
  fighter2: 'TAPHA TINE',
  round: 'Round 2',
  duration: '15:23',
  status: 'live',
};

// ============================================================================
// SEASON CALENDAR
// ============================================================================

export const seasonCalendar: SeasonEvent[] = [
  {
    id: 'cal-1',
    thumbnail: require('@/assets/images/calendar_event_1.png'),
    date: 'July 28, 2026',
    title: 'LAC DE GUIERS 2 vs SITEU',
    location: 'Demba Diop',
    type: 'Semifinals Event',
  },
  {
    id: 'cal-2',
    thumbnail: require('@/assets/images/calendar_event_2.png'),
    date: 'August 09, 2026',
    title: 'REUG REUG vs AMA BALDE',
    location: 'Independence Stadium',
    type: 'Championship',
  },
  {
    id: 'cal-3',
    thumbnail: require('@/assets/images/calendar_event_1.png'),
    date: 'August 22, 2026',
    title: 'GRIS BORDEAUX vs MOUSSA NDOYE',
    location: 'Stade Leopold Senghor',
    type: 'Quarterfinals',
  },
  {
    id: 'cal-4',
    thumbnail: require('@/assets/images/calendar_event_2.png'),
    date: 'September 05, 2026',
    title: 'BALLA GAYE 2 vs REUG REUG',
    location: 'Serrekunda East Arena',
    type: 'Semifinals Event',
  },
];

// ============================================================================
// NEWS
// ============================================================================

export const newsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    category: 'TECHNICAL ANALYSIS',
    categoryColor: '#3B82F6',
    title: "The Secret Behind Modou Lo's Gripping Technique",
    timestamp: '2 hours ago',
    author: 'Lamin Jarju',
    content: 'Modou Lo has dominated the heavyweight division with his signature gripping technique. We analyze the mechanics that make his grip nearly impossible to break...',
  },
  {
    id: 'news-2',
    category: 'RISING STARS',
    categoryColor: '#10B981',
    title: 'Top 5 Under-21 Wrestlers to Watch this Season',
    timestamp: '5 hours ago',
    author: 'GWA Editorial',
    content: 'The next generation of Gambian wrestling talent is here. From technical prodigies to powerhouses, these five young wrestlers are set to take the sport by storm...',
  },
  {
    id: 'news-3',
    category: 'GOVERNANCE',
    categoryColor: '#F59E0B',
    title: 'New GWA Regulations: What Fans Need to Know',
    timestamp: 'Yesterday',
    author: 'Arena Report',
    content: 'The Gambia Wrestling Association has announced new regulations for the upcoming season. Key changes include updated weight classes and new safety protocols...',
  },
  {
    id: 'news-4',
    category: 'INTERVIEW',
    categoryColor: '#8B5CF6',
    title: 'Exclusive: Balla Gaye 2 on His Rivalry with Modou Lo',
    timestamp: '3 days ago',
    author: 'Fatou Njie',
    content: 'In an exclusive interview, Balla Gaye 2 opens up about his legendary rivalry with Modou Lo, his training regimen, and what fans can expect at the Titan\'s Clash...',
  },
  {
    id: 'news-5',
    category: 'TICKETING',
    categoryColor: '#E53E3E',
    title: 'Titan\'s Clash Sold Out: Last Chance for Premium Tickets',
    timestamp: '1 week ago',
    author: 'GWA Ticketing Team',
    content: 'The Titan\'s Clash event has officially sold out of standard tickets. A limited number of VIP Elite packages remain available for fans who want the ultimate experience...',
  },
];

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export const notificationsData: AppNotification[] = [
  { id: 'notif-1', type: 'event', title: 'Event Reminder', body: 'The Titan\'s Clash starts in 3 days! Don\'t miss Modou Lo vs Balla Gaye 2.', timestamp: '1 hour ago', read: false, link: '/event/event-1' },
  { id: 'notif-2', type: 'ticket', title: 'Ticket Confirmed', body: 'Your VIP tickets for The Titan\'s Clash have been confirmed. Show your QR code at entry.', timestamp: '1 day ago', read: false, link: '/tickets' },
  { id: 'notif-3', type: 'combat', title: 'Live Result', body: 'Eumeu Sene defeats Tapha Tine by throw in Round 3!', timestamp: '2 days ago', read: true, link: '/combat/combat-2-1' },
  { id: 'notif-4', type: 'ranking', title: 'Ranking Update', body: 'Modou Lo remains #1 in the national rankings. Gris Bordeaux moves up to #5.', timestamp: '3 days ago', read: true },
  { id: 'notif-5', type: 'news', title: 'New Article', body: 'Read our exclusive interview with Balla Gaye 2 about his training and rivalry.', timestamp: '3 days ago', read: true, link: '/news/news-4' },
  { id: 'notif-6', type: 'event', title: 'Event Added', body: 'A new event has been added to the calendar: Legacy Bowl on Dec 12.', timestamp: '5 days ago', read: true },
  { id: 'notif-7', type: 'ticket', title: 'Limited Availability', body: 'Premium tickets for Young Lions Duel are running low. Get yours now!', timestamp: '1 week ago', read: true },
  { id: 'notif-8', type: 'combat', title: 'Combat Announced', body: 'Gris Bordeaux vs Reug Reug has been added to The Titan\'s Clash card.', timestamp: '1 week ago', read: true },
];

// ============================================================================
// RANKING CATEGORIES
// ============================================================================

export const rankingCategories: RankingCategory[] = [
  { id: 'r-national', name: 'National Ranking', type: 'national' },
  { id: 'r-weight', name: 'Heavyweight Division', type: 'weightClass' },
  { id: 'r-wins', name: 'Most Wins', type: 'wins' },
  { id: 'r-knockouts', name: 'Most Knockouts', type: 'knockouts' },
  { id: 'r-rising', name: 'Rising Stars', type: 'rising' },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getWrestler(id: string): Wrestler | undefined {
  return wrestlers.find((w) => w.id === id);
}

export function getEkiri(id: string): Ekiri | undefined {
  return ekiriList.find((e) => e.id === id);
}

export function getEvent(id: string): GwaEvent | undefined {
  return eventsData.find((e) => e.id === id);
}

export function getCombat(id: string): Combat | undefined {
  return combats.find((c) => c.id === id);
}

export function getCombatsForEvent(eventId: string): Combat[] {
  return combats.filter((c) => c.eventId === eventId).sort((a, b) => a.order - b.order);
}

export function getHeadToHead(fighter1Id: string, fighter2Id: string): HeadToHead | undefined {
  return headToHeads.find(
    (h) =>
      (h.fighter1Id === fighter1Id && h.fighter2Id === fighter2Id) ||
      (h.fighter1Id === fighter2Id && h.fighter2Id === fighter1Id)
  );
}

export function getWrestlersByEkiri(ekiriId: string): Wrestler[] {
  return wrestlers.filter((w) => w.ekiriId === ekiriId);
}

export function getWrestlerCombatHistory(wrestlerId: string): Combat[] {
  return combats.filter((c) => c.fighter1Id === wrestlerId || c.fighter2Id === wrestlerId);
}

export function getMainEvent(): GwaEvent | undefined {
  return eventsData.find((e) => e.status === 'upcoming');
}

export function getUpcomingEvents(): GwaEvent[] {
  return eventsData.filter((e) => e.status === 'upcoming');
}

export function getLiveEvents(): GwaEvent[] {
  return eventsData.filter((e) => e.status === 'live');
}

export function getFinishedEvents(): GwaEvent[] {
  return eventsData.filter((e) => e.status === 'finished');
}

export function getMatchResultLabel(result: 'W' | 'L' | 'D'): string {
  switch (result) {
    case 'W': return 'W';
    case 'L': return 'L';
    case 'D': return 'D';
  }
}
