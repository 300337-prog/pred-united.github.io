import { MatchResult, Player, FormationPreset, Trophy, ClubTrialApplication, NewsArticle } from '../types';

export const PROCLUBS_TRACKER_URL = 'https://proclubstracker.com/club/181654?platform=common-gen5&div=6';

export const INITIAL_MATCHES: MatchResult[] = [
  {
    id: 'match-62154802700312',
    date: '16 uur geleden',
    competition: 'EA FC 27 Pro Clubs - Division 5',
    opponent: 'Miler Imperya',
    isHome: true,
    result: 'L',
    scorePredator: 1,
    scoreOpponent: 2,
    goals: [
      { minute: 31, scorer: 'Miler Imperya (ST)', type: 'regular' },
      { minute: 54, scorer: 'Paggaking67', assist: 'Theodebestebeste', type: 'regular' },
      { minute: 78, scorer: 'Miler Imperya (RW)', type: 'counter' }
    ],
    stats: {
      possession: [42, 58],
      shots: [4, 8],
      shotsOnTarget: [3, 5],
      expectedGoals: [1.2, 2.4],
      passAccuracy: [67, 76],
      tacklesWon: [6, 4],
      fouls: [2, 3],
      corners: [2, 3]
    },
    playerRatings: [
      { playerName: 'T. RaySist', gamertag: 'Paggaking67', position: 'ST', rating: 7.0, goals: 1, assists: 0 },
      { playerName: 'Wally', gamertag: 'Baloa_6', position: 'CM', rating: 7.2, goals: 0, assists: 0 },
      { playerName: 'n. Israël', gamertag: 'Theodebestebeste', position: 'CM', rating: 6.5, goals: 0, assists: 0 },
      { playerName: 'B. Borrelnoot', gamertag: 'BoefSam00', position: 'CB', rating: 6.5, goals: 0, assists: 0 },
      { playerName: 'Brobbeast', gamertag: 'Masirm', position: 'ST', rating: 6.3, goals: 0, assists: 0 }
    ],
    motm: {
      name: 'T. RaySist',
      gamertag: 'Paggaking67',
      position: 'ST',
      rating: 7.0,
      contribution: '1 Doelpunt voor Predator United'
    },
    summary: 'Felbevochten competitieduel tegen Miler Imperya. Paggaking67 bracht Predator United langszij met een fraaie afronding, maar een late tegentreffer besliste het duel in 1-2.'
  },
  {
    id: 'match-62172502790136',
    date: '16 uur geleden',
    competition: 'EA FC 27 Pro Clubs - Division 5',
    opponent: 'Loopkring v2',
    isHome: false,
    result: 'W',
    scorePredator: 3,
    scoreOpponent: 2,
    goals: [
      { minute: 16, scorer: 'BoefSam00', assist: 'Baloa_6', type: 'regular' },
      { minute: 39, scorer: 'Loopkring v2 (CAM)', type: 'regular' },
      { minute: 58, scorer: 'Baloa_6', assist: 'Theodebestebeste', type: 'regular' },
      { minute: 72, scorer: 'Loopkring v2 (ST)', type: 'regular' },
      { minute: 86, scorer: 'BoefSam00', assist: 'Theodebestebeste', type: 'counter' }
    ],
    stats: {
      possession: [50, 50],
      shots: [5, 8],
      shotsOnTarget: [4, 5],
      expectedGoals: [2.5, 2.1],
      passAccuracy: [62, 67],
      tacklesWon: [5, 6],
      fouls: [2, 3],
      corners: [2, 3]
    },
    playerRatings: [
      { playerName: 'B. Borrelnoot', gamertag: 'BoefSam00', position: 'ST', rating: 8.5, goals: 2, assists: 1, motm: true },
      { playerName: 'Wally', gamertag: 'Baloa_6', position: 'ST', rating: 7.7, goals: 1, assists: 1 },
      { playerName: 'T. RaySist', gamertag: 'Paggaking67', position: 'CM', rating: 7.2, goals: 0, assists: 0 },
      { playerName: 'n. Israël', gamertag: 'Theodebestebeste', position: 'CM', rating: 6.6, goals: 0, assists: 1 },
      { playerName: 'Brobbeast', gamertag: 'Masirm', position: 'CM', rating: 5.5, goals: 0, assists: 0 }
    ],
    motm: {
      name: 'BoefSam00 (B. Borrelnoot)',
      gamertag: 'BoefSam00',
      position: 'ST',
      rating: 8.5,
      contribution: '2 Doelpunten en 1 Assist (Matchwinner in 86\')'
    },
    summary: 'Spectaculaire 3-2 overwinning op Loopkring v2! BoefSam00 schoot Predator United in de 86e minuut naar de volle 3 punten na een dubbelpack.'
  },
  {
    id: 'match-62114473130295',
    date: '16 uur geleden',
    competition: 'EA FC 27 Pro Clubs - Division 5',
    opponent: 'Hblock FC',
    isHome: true,
    result: 'D',
    scorePredator: 3,
    scoreOpponent: 3,
    goals: [
      { minute: 12, scorer: 'Hblock FC (ST)', type: 'regular' },
      { minute: 27, scorer: 'Paggaking67', assist: 'Baloa_6', type: 'regular' },
      { minute: 49, scorer: 'Baloa_6', assist: 'BoefSam00', type: 'regular' },
      { minute: 63, scorer: 'Hblock FC (RW)', type: 'regular' },
      { minute: 76, scorer: 'BoefSam00', assist: 'Baloa_6', type: 'regular' },
      { minute: 89, scorer: 'Hblock FC (LW)', type: 'counter' }
    ],
    stats: {
      possession: [48, 52],
      shots: [6, 10],
      shotsOnTarget: [4, 7],
      expectedGoals: [2.8, 3.1],
      passAccuracy: [74, 78],
      tacklesWon: [7, 6],
      fouls: [3, 2],
      corners: [3, 4]
    },
    playerRatings: [
      { playerName: 'T. RaySist', gamertag: 'Paggaking67', position: 'ST', rating: 8.1, goals: 1, assists: 0 },
      { playerName: 'Wally', gamertag: 'Baloa_6', position: 'ST', rating: 7.8, goals: 1, assists: 2 },
      { playerName: 'B. Borrelnoot', gamertag: 'BoefSam00', position: 'CM', rating: 7.2, goals: 1, assists: 0 },
      { playerName: 'Brobbeast', gamertag: 'Masirm', position: 'CM', rating: 6.7, goals: 0, assists: 0 },
      { playerName: 'n. Israël', gamertag: 'Theodebestebeste', position: 'CM', rating: 6.4, goals: 0, assists: 0 }
    ],
    motm: {
      name: 'T. RaySist',
      gamertag: 'Paggaking67',
      position: 'ST',
      rating: 8.1,
      contribution: '1 Goal & constante aanvallende dreiging'
    },
    summary: 'Bloedstollend 3-3 gelijkspel tegen Hblock FC. Baloa_6 (1 goal, 2 assists) en Paggaking67 hielden Predator United constant op voorsprong in een waar doelpuntenfestijn.'
  },
  {
    id: 'match-62026612420169',
    date: '17 uur geleden',
    competition: 'EA FC 27 Pro Clubs - Division 5',
    opponent: 'omerta bxl',
    isHome: false,
    result: 'W',
    scorePredator: 4,
    scoreOpponent: 1,
    goals: [
      { minute: 22, scorer: 'Baloa_6', assist: 'BoefSam00', type: 'regular' },
      { minute: 41, scorer: 'BoefSam00', assist: 'Baloa_6', type: 'regular' },
      { minute: 59, scorer: 'Baloa_6', assist: 'Theodebestebeste', type: 'header' },
      { minute: 74, scorer: 'omerta bxl (ST)', type: 'regular' },
      { minute: 83, scorer: 'Baloa_6', assist: 'Theodebestebeste', type: 'counter' }
    ],
    stats: {
      possession: [58, 42],
      shots: [15, 4],
      shotsOnTarget: [10, 2],
      expectedGoals: [4.4, 0.9],
      passAccuracy: [78, 76],
      tacklesWon: [11, 8],
      fouls: [1, 3],
      corners: [6, 2]
    },
    playerRatings: [
      { playerName: 'Wally', gamertag: 'Baloa_6', position: 'ST', rating: 9.5, goals: 3, assists: 0, motm: true },
      { playerName: 'B. Borrelnoot', gamertag: 'BoefSam00', position: 'CM', rating: 8.3, goals: 1, assists: 1 },
      { playerName: 'n. Israël', gamertag: 'Theodebestebeste', position: 'CM', rating: 7.4, goals: 0, assists: 0 },
      { playerName: 'Brobbeast', gamertag: 'Masirm', position: 'CM', rating: 7.3, goals: 0, assists: 0 },
      { playerName: 'T. RaySist', gamertag: 'Paggaking67', position: 'ST', rating: 7.0, goals: 0, assists: 0 }
    ],
    motm: {
      name: 'Baloa_6 (Wally)',
      gamertag: 'Baloa_6',
      position: 'ST',
      rating: 9.5,
      contribution: 'Hattrick (3 Doelpunten) & 9.5 Beoordeling'
    },
    summary: 'Masterclass van Predator United met een 4-1 overwinning op omerta bxl. Baloa_6 schitterde met een loepzuivere hattrick en een 9.5 match rating!'
  },
  {
    id: 'match-62026328270470',
    date: '17 uur geleden',
    competition: 'EA FC 27 Pro Clubs - Division 5',
    opponent: 'Sswins',
    isHome: true,
    result: 'W',
    scorePredator: 4,
    scoreOpponent: 1,
    goals: [
      { minute: 17, scorer: 'BoefSam00', assist: 'Baloa_6', type: 'regular' },
      { minute: 35, scorer: 'Theodebestebeste', assist: 'Baloa_6', type: 'regular' },
      { minute: 52, scorer: 'Sswins (CAM)', type: 'regular' },
      { minute: 68, scorer: 'Baloa_6', assist: 'Theodebestebeste', type: 'regular' },
      { minute: 81, scorer: 'BoefSam00', assist: 'Paggaking67', type: 'regular' }
    ],
    stats: {
      possession: [56, 44],
      shots: [6, 6],
      shotsOnTarget: [5, 3],
      expectedGoals: [3.4, 1.2],
      passAccuracy: [70, 73],
      tacklesWon: [8, 5],
      fouls: [2, 1],
      corners: [3, 2]
    },
    playerRatings: [
      { playerName: 'Wally', gamertag: 'Baloa_6', position: 'ST', rating: 8.9, goals: 1, assists: 2, motm: true },
      { playerName: 'n. Israël', gamertag: 'Theodebestebeste', position: 'ST', rating: 8.0, goals: 1, assists: 1 },
      { playerName: 'B. Borrelnoot', gamertag: 'BoefSam00', position: 'CM', rating: 8.0, goals: 2, assists: 0 },
      { playerName: 'T. RaySist', gamertag: 'Paggaking67', position: 'CM', rating: 7.8, goals: 0, assists: 0 },
      { playerName: 'Brobbeast', gamertag: 'Masirm', position: 'CM', rating: 3.0, goals: 0, assists: 0 }
    ],
    motm: {
      name: 'Baloa_6 (Wally)',
      gamertag: 'Baloa_6',
      position: 'ST',
      rating: 8.9,
      contribution: '1 Goal, 2 Assists & Man of the Match'
    },
    summary: 'Overtuigende 4-1 zege op Sswins. Theodebestebeste pikte zijn goal mee, terwijl BoefSam00 twee keer doel trof na schitterend voorbereidend werk van Baloa_6.'
  },
  {
    id: 'match-61966371440090',
    date: '17 uur geleden',
    competition: 'EA FC 27 Pro Clubs - Division 5',
    opponent: 'FC Ziektewet',
    isHome: false,
    result: 'W',
    scorePredator: 5,
    scoreOpponent: 0,
    goals: [
      { minute: 14, scorer: 'BoefSam00', assist: 'Theodebestebeste', type: 'regular' },
      { minute: 28, scorer: 'Baloa_6', assist: 'Masirm', type: 'regular' },
      { minute: 53, scorer: 'BoefSam00', assist: 'Theodebestebeste', type: 'regular' },
      { minute: 71, scorer: 'Masirm', assist: 'Baloa_6', type: 'regular' },
      { minute: 84, scorer: 'BoefSam00', assist: 'Theodebestebeste', type: 'penalty' }
    ],
    stats: {
      possession: [54, 46],
      shots: [7, 0],
      shotsOnTarget: [5, 0],
      expectedGoals: [4.3, 0.2],
      passAccuracy: [87, 78],
      tacklesWon: [8, 7],
      fouls: [2, 3],
      corners: [3, 2]
    },
    playerRatings: [
      { playerName: 'B. Borrelnoot', gamertag: 'BoefSam00', position: 'ST', rating: 9.6, goals: 3, assists: 0, motm: true },
      { playerName: 'Wally', gamertag: 'Baloa_6', position: 'ST', rating: 9.5, goals: 1, assists: 1 },
      { playerName: 'n. Israël', gamertag: 'Theodebestebeste', position: 'CM', rating: 9.1, goals: 0, assists: 2 },
      { playerName: 'Brobbeast', gamertag: 'Masirm', position: 'CM', rating: 9.0, goals: 1, assists: 1 },
      { playerName: 'T. RaySist', gamertag: 'Paggaking67', position: 'CM', rating: 7.3, goals: 0, assists: 0 }
    ],
    motm: {
      name: 'BoefSam00 (B. Borrelnoot)',
      gamertag: 'BoefSam00',
      position: 'ST',
      rating: 9.6,
      contribution: 'Hattrick (3 Goals), 9.6 Rating & Clean Sheet'
    },
    summary: 'MONSTERZEGE! 5-0 afstraffing van FC Ziektewet. BoefSam00 schitterde met een hattrick (9.6 rating), Theodebestebeste gaf 2 assists (9.1 rating) en de defensie gaf 0 schoten weg!'
  },
  {
    id: 'match-61838574370194',
    date: '18 uur geleden',
    competition: 'EA FC 27 Pro Clubs - Division 5',
    opponent: 'Dashek Org',
    isHome: true,
    result: 'D',
    scorePredator: 1,
    scoreOpponent: 1,
    goals: [
      { minute: 38, scorer: 'Dashek Org (ST)', type: 'regular' },
      { minute: 66, scorer: 'Paggaking67', assist: 'BoefSam00', type: 'regular' }
    ],
    stats: {
      possession: [50, 50],
      shots: [6, 8],
      shotsOnTarget: [4, 5],
      expectedGoals: [1.6, 1.9],
      passAccuracy: [80, 78],
      tacklesWon: [9, 8],
      fouls: [2, 2],
      corners: [3, 4]
    },
    playerRatings: [
      { playerName: 'T. RaySist', gamertag: 'Paggaking67', position: 'ST', rating: 8.4, goals: 1, assists: 0, motm: true },
      { playerName: 'n. Israël', gamertag: 'Theodebestebeste', position: 'CM', rating: 6.8, goals: 0, assists: 0 },
      { playerName: 'B. Borrelnoot', gamertag: 'BoefSam00', position: 'CB', rating: 6.8, goals: 0, assists: 1 },
      { playerName: 'Wally', gamertag: 'Baloa_6', position: 'CM', rating: 6.5, goals: 0, assists: 0 }
    ],
    motm: {
      name: 'T. RaySist',
      gamertag: 'Paggaking67',
      position: 'ST',
      rating: 8.4,
      contribution: 'Gelijkmaker & Man of the Match (8.4)'
    },
    summary: 'Gelijkspel tegen een stug Dashek Org. Paggaking67 bracht het team op karakter terug tot 1-1 na een fraaie steekpass van BoefSam00.'
  },
  {
    id: 'match-58168943870173',
    date: '1 dag geleden',
    competition: 'EA FC 27 Pro Clubs - Division 5',
    opponent: 'Bal op Dak FC',
    isHome: false,
    result: 'W',
    scorePredator: 4,
    scoreOpponent: 0,
    goals: [
      { minute: 19, scorer: 'Paggaking67', assist: 'BoefSam00', type: 'regular' },
      { minute: 36, scorer: 'Baloa_6', assist: 'Paggaking67', type: 'regular' },
      { minute: 61, scorer: 'Paggaking67', assist: 'Theodebestebeste', type: 'counter' },
      { minute: 78, scorer: 'BoefSam00', assist: 'Paggaking67', type: 'regular' }
    ],
    stats: {
      possession: [55, 45],
      shots: [7, 3],
      shotsOnTarget: [6, 1],
      expectedGoals: [3.9, 0.4],
      passAccuracy: [60, 61],
      tacklesWon: [7, 5],
      fouls: [1, 2],
      corners: [3, 1]
    },
    playerRatings: [
      { playerName: 'T. RaySist', gamertag: 'Paggaking67', position: 'ST', rating: 9.9, goals: 2, assists: 2, motm: true },
      { playerName: 'Wally', gamertag: 'Baloa_6', position: 'ST', rating: 8.0, goals: 1, assists: 0 },
      { playerName: 'B. Borrelnoot', gamertag: 'BoefSam00', position: 'CM', rating: 7.4, goals: 1, assists: 1 }
    ],
    motm: {
      name: 'T. RaySist',
      gamertag: 'Paggaking67',
      position: 'ST',
      rating: 9.9,
      contribution: 'Historische 9.9 Beoordeling: 2 Doelpunten & 2 Assists'
    },
    summary: 'HISTORISCHE MASTERCLASS! Paggaking67 behaalde een nagenoeg perfecte 9.9 match rating met 2 doelpunten en 2 assists in de 4-0 veegpartij tegen Bal op Dak FC.'
  },
  {
    id: 'match-58498025460174',
    date: '1 dag geleden',
    competition: 'EA FC 27 Pro Clubs - Division 5',
    opponent: 'Bal op Dak FC',
    isHome: true,
    result: 'D',
    scorePredator: 1,
    scoreOpponent: 1,
    goals: [
      { minute: 24, scorer: 'Bal op Dak FC (LW)', type: 'regular' },
      { minute: 57, scorer: 'BoefSam00', assist: 'Theodebestebeste', type: 'regular' }
    ],
    stats: {
      possession: [52, 48],
      shots: [6, 3],
      shotsOnTarget: [4, 2],
      expectedGoals: [1.8, 1.1],
      passAccuracy: [69, 74],
      tacklesWon: [8, 6],
      fouls: [2, 3],
      corners: [3, 2]
    },
    playerRatings: [
      { playerName: 'T. RaySist', gamertag: 'Paggaking67', position: 'ST', rating: 8.0, goals: 0, assists: 0, motm: true },
      { playerName: 'B. Borrelnoot', gamertag: 'BoefSam00', position: 'ST', rating: 7.1, goals: 1, assists: 0 },
      { playerName: 'n. Israël', gamertag: 'Theodebestebeste', position: 'CM', rating: 6.9, goals: 0, assists: 1 },
      { playerName: 'ñî gå boy', gamertag: 'siemieboy12', position: 'CM', rating: 6.8, goals: 0, assists: 0 },
      { playerName: 'Wally', gamertag: 'Baloa_6', position: 'ST', rating: 6.3, goals: 0, assists: 0 }
    ],
    motm: {
      name: 'T. RaySist',
      gamertag: 'Paggaking67',
      position: 'ST',
      rating: 8.0,
      contribution: 'Man of the Match & constante diepte'
    },
    summary: 'Strijdbaar 1-1 gelijkspel in de return tegen Bal op Dak FC. BoefSam00 scoorde de verdiende 1-1 na een assist van Theodebestebeste.'
  },
  {
    id: 'match-58102665860487',
    date: '1 dag geleden',
    competition: 'EA FC 27 Pro Clubs - Division 5',
    opponent: 'KSV SWIP',
    isHome: false,
    result: 'L',
    scorePredator: 2,
    scoreOpponent: 3,
    goals: [
      { minute: 15, scorer: 'KSV SWIP (ST)', type: 'regular' },
      { minute: 34, scorer: 'Baloa_6', assist: 'BoefSam00', type: 'regular' },
      { minute: 52, scorer: 'KSV SWIP (RW)', type: 'regular' },
      { minute: 69, scorer: 'Baloa_6', assist: 'Theodebestebeste', type: 'regular' },
      { minute: 82, scorer: 'KSV SWIP (CAM)', type: 'counter' }
    ],
    stats: {
      possession: [51, 49],
      shots: [8, 7],
      shotsOnTarget: [5, 4],
      expectedGoals: [2.7, 2.5],
      passAccuracy: [78, 77],
      tacklesWon: [9, 7],
      fouls: [3, 2],
      corners: [4, 3]
    },
    playerRatings: [
      { playerName: 'Wally', gamertag: 'Baloa_6', position: 'ST', rating: 8.1, goals: 2, assists: 0, motm: true },
      { playerName: 'n. Israël', gamertag: 'Theodebestebeste', position: 'CM', rating: 7.3, goals: 0, assists: 0 },
      { playerName: 'T. RaySist', gamertag: 'Paggaking67', position: 'ST', rating: 7.3, goals: 0, assists: 0 },
      { playerName: 'ñî gå boy', gamertag: 'siemieboy12', position: 'CM', rating: 7.1, goals: 0, assists: 0 },
      { playerName: 'B. Borrelnoot', gamertag: 'BoefSam00', position: 'CM', rating: 6.8, goals: 0, assists: 1 }
    ],
    motm: {
      name: 'Baloa_6 (Wally)',
      gamertag: 'Baloa_6',
      position: 'ST',
      rating: 8.1,
      contribution: '2 Doelpunten voor Predator United'
    },
    summary: 'Doelpuntrijk duel tegen KSV SWIP. Baloa_6 trof tweemaal doel, maar in de slotfase trok KSV SWIP aan het langste eind met 2-3.'
  }
];

export const SQUAD_PLAYERS: Player[] = [
  {
    id: 'p-1',
    gamertag: 'Theodebestebeste',
    name: 'n. Israël',
    number: 9,
    position: 'ST',
    category: 'Attack',
    role: 'Basisspeler',
    overall: 77,
    matchesPlayed: 19,
    goals: 7,
    assists: 12,
    cleanSheets: 0,
    motmAwards: 1,
    averageRating: 7.4,
    passAccuracy: 74,
    playstylesPlus: ['Finesse Shot+'],
    playstylesRegular: ['Quick Step', 'Acrobatic', 'First Touch'],
    preferredFoot: 'Right',
    height: '1.88m (6\'2")',
    nationality: 'Netherlands',
    pace: 83,
    shooting: 79,
    passing: 74,
    dribbling: 78,
    defending: 45,
    physical: 76,
    tacticalRole: 'Target forward / assistkoning en aanspeelpunt voorin'
  },
  {
    id: 'p-2',
    gamertag: 'Paggaking67',
    name: 'T. RaySist',
    number: 10,
    position: 'ST',
    category: 'Attack',
    role: 'Basisspeler',
    overall: 75,
    matchesPlayed: 20,
    goals: 9,
    assists: 9,
    cleanSheets: 0,
    motmAwards: 4,
    averageRating: 7.9,
    passAccuracy: 72,
    playstylesPlus: ['Quick Step+'],
    playstylesRegular: ['Finesse Shot', 'Incisive Pass'],
    preferredFoot: 'Right',
    height: '1.85m (6\'1")',
    nationality: 'Netherlands',
    pace: 81,
    shooting: 77,
    passing: 72,
    dribbling: 76,
    defending: 44,
    physical: 75,
    tacticalRole: 'Tweede Spits / Dodelijke schaduwspits met 9.9 MOTM masterclass'
  },
  {
    id: 'p-3',
    gamertag: 'Baloa_6',
    name: 'Wally',
    number: 7,
    position: 'ST',
    category: 'Attack',
    role: 'Starter',
    overall: 79,
    matchesPlayed: 17,
    goals: 20,
    assists: 12,
    cleanSheets: 0,
    motmAwards: 5,
    averageRating: 8.3,
    passAccuracy: 78,
    playstylesPlus: ['Power Shot+'],
    playstylesRegular: ['Finesse Shot', 'Rapid', 'Acrobatic'],
    preferredFoot: 'Right',
    height: '1.86m (6\'1")',
    nationality: 'Netherlands',
    pace: 86,
    shooting: 83,
    passing: 76,
    dribbling: 82,
    defending: 40,
    physical: 79,
    tacticalRole: 'Topscorer van Predator United (20 doelpunten in 17 wedstrijden)'
  },
  {
    id: 'p-4',
    gamertag: 'BoefSam00',
    name: 'B. Borrelnoot (Sam B.)',
    number: 8,
    position: 'CM',
    category: 'Midfield',
    role: 'Starter',
    overall: 77,
    matchesPlayed: 16,
    goals: 18,
    assists: 11,
    cleanSheets: 1,
    motmAwards: 4,
    averageRating: 7.7,
    passAccuracy: 81,
    playstylesPlus: ['Pinged Pass+'],
    playstylesRegular: ['Intercept', 'Tiki Taka', 'Long Ball Pass'],
    preferredFoot: 'Right',
    height: '1.82m (6\'0")',
    nationality: 'Netherlands',
    pace: 80,
    shooting: 81,
    passing: 80,
    dribbling: 77,
    defending: 70,
    physical: 76,
    tacticalRole: 'Doelgerichte middenvelder & Hattrick-held (18 goals & 11 assists)'
  },
  {
    id: 'p-5',
    gamertag: 'siemieboy12',
    name: 'ñî gå boy',
    number: 6,
    position: 'CM',
    category: 'Midfield',
    role: 'Starter',
    overall: 74,
    matchesPlayed: 11,
    goals: 1,
    assists: 2,
    cleanSheets: 0,
    motmAwards: 0,
    averageRating: 7.2,
    passAccuracy: 77,
    playstylesPlus: ['Relentless+'],
    playstylesRegular: ['Intercept', 'Slide Tackle'],
    preferredFoot: 'Right',
    height: '1.80m',
    nationality: 'Netherlands',
    pace: 75,
    shooting: 65,
    passing: 76,
    dribbling: 74,
    defending: 75,
    physical: 76,
    tacticalRole: 'Controlerende middenvelder & balveroveraar'
  },
  {
    id: 'p-6',
    gamertag: 'Masirm',
    name: 'Brobbeast',
    number: 11,
    position: 'RW',
    category: 'Attack',
    role: 'Starter',
    overall: 73,
    matchesPlayed: 6,
    goals: 1,
    assists: 1,
    cleanSheets: 1,
    motmAwards: 0,
    averageRating: 6.3,
    passAccuracy: 72,
    playstylesPlus: ['Bruiser+'],
    playstylesRegular: ['Rapid', 'Acrobatic'],
    preferredFoot: 'Right',
    height: '1.87m',
    nationality: 'Netherlands',
    pace: 82,
    shooting: 72,
    passing: 68,
    dribbling: 73,
    defending: 48,
    physical: 84,
    tacticalRole: 'Fysieke flankaanvaller & krachtpatser'
  },
  {
    id: 'p-7',
    gamertag: 'Levi_Hofman',
    name: 'L. Hofman',
    number: 4,
    position: 'CB',
    category: 'Defense',
    role: 'Starter',
    overall: 76,
    matchesPlayed: 0,
    goals: 0,
    assists: 0,
    cleanSheets: 0,
    motmAwards: 0,
    averageRating: 7.0,
    passAccuracy: 75,
    playstylesPlus: ['Block+'],
    playstylesRegular: ['Anticipate', 'Aerial'],
    preferredFoot: 'Right',
    height: '1.89m (6\'2")',
    nationality: 'Netherlands',
    pace: 76,
    shooting: 50,
    passing: 72,
    dribbling: 70,
    defending: 80,
    physical: 82,
    tacticalRole: 'Centrale verdedigende rots in de branding'
  }
];

export const FORMATION_PRESETS: FormationPreset[] = [
  {
    id: 'form-4231',
    name: 'Predator 4-2-3-1 Narrow',
    code: '4-2-3-1',
    mentality: 'Aanvallend',
    description: 'Ons primaire tactische systeem voor Divisie 5. Snelle combinaties tussen Theodebestebeste en Paggaking67, ondersteund door topscorers Baloa_6 en BoefSam00.',
    positions: [
      { id: 'gk', label: 'GK', x: 50, y: 88, instructions: 'Sweeper Keeper (AI / Trial Slot)' },
      { id: 'lb', label: 'LB', x: 18, y: 72, instructions: 'Inverted Wing-Back (Balbezit opbouw)' },
      { id: 'lcb', label: 'LCB', x: 38, y: 74, instructions: 'Ball Playing Center Back', playerId: 'p-7' },
      { id: 'rcb', label: 'RCB', x: 62, y: 74, instructions: 'Stopper Defender (Fysieke duels)' },
      { id: 'rb', label: 'RB', x: 82, y: 72, instructions: 'Stay Back While Attacking' },
      { id: 'ldm', label: 'LDM', x: 35, y: 55, instructions: 'Deep-lying Playmaker', playerId: 'p-5' },
      { id: 'rdm', label: 'RDM', x: 65, y: 55, instructions: 'Box-to-box motor & scorer', playerId: 'p-4' },
      { id: 'lam', label: 'LAM', x: 22, y: 35, instructions: 'Inside Forward / Goalscorer', playerId: 'p-3' },
      { id: 'cam', label: 'CAM', x: 50, y: 32, instructions: 'Schaduwspits (RaySist)', playerId: 'p-2' },
      { id: 'ram', label: 'RAM', x: 78, y: 35, instructions: 'Fysieke flankaanvaller', playerId: 'p-6' },
      { id: 'st', label: 'ST', x: 50, y: 15, instructions: 'Target Finisher (Israël)', playerId: 'p-1' }
    ]
  },
  {
    id: 'form-442',
    name: 'Predator 4-4-2 Double Striker',
    code: '4-4-2',
    mentality: 'Gebalanceerd',
    description: 'Onze beproefde tweespitsen formatie. Theodebestebeste en Paggaking67 vormen het gelijkwaardige spitsenduo met maximale diepgang.',
    positions: [
      { id: 'gk', label: 'GK', x: 50, y: 88, instructions: 'Traditional Goalkeeper' },
      { id: 'lb', label: 'LB', x: 16, y: 72, instructions: 'Fullback Defend' },
      { id: 'lcb', label: 'LCB', x: 38, y: 74, instructions: 'Central Defender', playerId: 'p-7' },
      { id: 'rcb', label: 'RCB', x: 62, y: 74, instructions: 'Central Defender' },
      { id: 'rb', label: 'RB', x: 84, y: 72, instructions: 'Fullback Defend' },
      { id: 'lm', label: 'LM', x: 18, y: 45, instructions: 'Wide Playmaker / Goalscorer', playerId: 'p-3' },
      { id: 'lcm', label: 'LCM', x: 40, y: 50, instructions: 'Central Midfield Box-to-Box', playerId: 'p-4' },
      { id: 'rcm', label: 'RCM', x: 60, y: 50, instructions: 'Central Midfield Destroyer', playerId: 'p-5' },
      { id: 'rm', label: 'RM', x: 82, y: 45, instructions: 'Direct Winger / Cut-inside', playerId: 'p-6' },
      { id: 'st1', label: 'ST', x: 38, y: 18, instructions: 'Target Spits (Israël)', playerId: 'p-1' },
      { id: 'st2', label: 'ST', x: 62, y: 18, instructions: 'Schaduwspits (RaySist)', playerId: 'p-2' }
    ]
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-promo',
    title: 'DOUBLE PROMOTION! Predator United Storms Division 5 With 57 Goals Scored!',
    titleNl: 'DUBBELE PROMOTIE! Predator United stormt door Divisie 5 met 57 goals en 2 promoties!',
    subtitle: 'After 20 thrilling league matches, Predator United reaches 1605 skill rating and secures 2 consecutive promotions in EA FC 27 Pro Clubs.',
    subtitleNl: 'Na 20 zinderende competitiewedstrijden bereikt Predator United 1605 skill rating en pakt de club 2 opeenvolgende promoties in EA FC 27.',
    category: 'Club News',
    categoryNl: 'Clubnieuws',
    date: '4 okt 2026',
    readTime: '3 min read',
    readTimeNl: '3 min leestijd',
    author: 'Club Media Team (Predator United)',
    featured: true,
    summary: 'What a milestone! In 20 official Pro Clubs matches, Predator United has recorded 9 victories, scored 57 goals (+21 goal diff), and climbed to a 1605 skill rating with 2 promotions in the bag.',
    summaryNl: 'Wat een mijlpaal! In 20 officiële Pro Clubs wedstrijden boekte Predator United 9 overwinningen, scoorde de ploeg maar liefst 57 doelpunten (+21 doelsaldo) en steeg de skill rating naar 1605 met 2 promoties op zak.',
    content: [
      'The EA Sports FC 27 campaign for Predator United has reached fever pitch. Following an intensive matchday grind, the team officially logged 20 matches, scoring an astonishing 57 goals and achieving two consecutive division promotions.',
      'Attacking dynamo Baloa_6 leads the club scoring charts with a sensational 20 goals in 17 appearances, closely followed by midfield maestro BoefSam00 with 18 goals and 11 assists.',
      'Strikers Theodebestebeste (7 goals, 12 assists) and Paggaking67 (9 goals, 9 assists) have set the standard with exemplary team play and relentless chance creation.',
      'With incredible squad chemistry and a sky-high 1605 skill rating, Predator United is on course for Division 1 glory!'
    ],
    contentNl: [
      'Het EA Sports FC 27 seizoen van Predator United is in een stroomversnelling geraakt. Na een intensieve serie speelavonden staat de teller nu op 20 officiële wedstrijden, waarin maar liefst 57 keer het net werd gevonden en 2 promoties werden veiliggesteld.',
      'Aanvalsfenomeen Baloa_6 voert de clubtopscorerslijst aan met 20 doelpunten in 17 duels, op de voet gevolgd door middenveldmotor BoefSam00 met 18 treffers en 11 assists.',
      'Aanvallers Theodebestebeste (7 goals, 12 assists) en Paggaking67 (9 goals, 9 assists) toonden hun klasse en dirigeerden het combinatiespel naar ongekende hoogtes.',
      'Met ijzersterke teamspirit en een skill rating van 1605 zet Predator United de jacht in op de allerhoogste divisies!'
    ],
    tags: ['FC27', 'Promotion', 'Division5', 'Milestone', 'ProClubs'],
    likes: 24890,
    reposts: 5410,
    views: '189.4K',
    bookmarks: 3910,
    comments: [
      {
        id: 'c-promo-1',
        author: 'Baloa_6 (Topscorer)',
        handle: 'Baloa_6',
        text: 'PROUD OF THIS TEAM! 57 goals and 2 promotions. The Predator spirit is unmatched! Keep pushing boys! 🦁🔥',
        textNl: 'TROTS OP DEZE CLUB! 57 goals en 2 promoties. De Predator mentaliteit is niet te stoppen! Blijven strijden boys! 🦁🔥',
        timestamp: '1h',
        likes: 2180,
        verified: true
      },
      {
        id: 'c-promo-2',
        author: 'Theodebestebeste',
        handle: 'Theodebestebeste',
        text: 'Incredible chemistry across the pitch. 12 assists in the pocket, and our strike partnerships are firing on all cylinders! 🎯',
        textNl: 'Wat een teamgeest op het veld. 12 assists op zak en onze aanvalslinie draait op volle toeren! 🎯',
        timestamp: '2h',
        likes: 1450,
        verified: true
      },
      {
        id: 'c-promo-3',
        author: 'Paggaking67',
        handle: 'Paggaking67',
        text: 'One unified mission, one team. Division 1 here we come! RaySist & Israël running the show 👊⚽',
        textNl: 'Eén gezamenlijke missie, één team. Op naar Divisie 1! RaySist & Israël regelen het voorin 👊⚽',
        timestamp: '3h',
        likes: 1320,
        verified: true
      }
    ],
    matchScore: {
      homeTeam: 'PredatorUnited',
      awayTeam: 'Division 5 Campaign',
      homeScore: 57,
      awayScore: 36,
      scorers: ['Baloa_6 (20 goals)', 'BoefSam00 (18 goals)', 'Paggaking67 (9 goals)', 'Theodebestebeste (7 goals)']
    }
  },
  {
    id: 'news-fcziektewet',
    title: '5-0 DEMOLITION! BoefSam00 Hat-Trick & Theodebestebeste Masterclass Dismantles FC Ziektewet',
    titleNl: 'MONSTERZEGE! 5-0 afstraffing tegen FC Ziektewet: Hattrick voor BoefSam00 & Masterclass van Theodebestebeste',
    subtitle: 'Predator United delivered a footballing clinic in Division 5, allowing zero shots on goal while BoefSam00 scored 3 goals (9.6 rating).',
    subtitleNl: 'Predator United gaf een masterclass in Divisie 5: 0 schoten tegen en een waanzinnige hattrick voor BoefSam00 (9.6 rating).',
    category: 'Match Report',
    categoryNl: 'Wedstrijdverslag',
    date: '17 uur geleden',
    readTime: '2 min read',
    readTimeNl: '2 min leestijd',
    author: 'Tactical Staff (Predator United)',
    summary: 'A breathtaking 5-0 victory for Predator United. BoefSam00 took home the match ball with a clinical hat-trick, Theodebestebeste provided 2 pinpoint assists (9.1 rating), while Baloa_6 and Masirm added to the rout.',
    summaryNl: 'Een adembenemende 5-0 overwinning voor Predator United. BoefSam00 nam de wedstrijdbal mee naar huis met een hattrick, Theodebestebeste gaf 2 wonderschone assists (9.1 rating) en Baloa_6 en Masirm maakten het feest compleet.',
    content: [
      'In what was arguably Predator United’s most dominant 90 minutes of the season, FC Ziektewet was completely swept away in a 5-0 masterclass.',
      'BoefSam00 opened the scoring at 14 minutes following a genius through ball from Theodebestebeste. Baloa_6 doubled the lead at 28 minutes before BoefSam00 netted two more in the second half, completing his hat-trick from the penalty spot in the 84th minute.',
      'Defensively, Predator United put on an iron-clad display, conceding exactly ZERO shots on target to secure our cleanest sheet of the season.'
    ],
    contentNl: [
      'In misschien wel de meest dominante 90 minuten van het seizoen werd FC Ziektewet van begin tot eind overklast in een 5-0 galavoorstelling.',
      'BoefSam00 opende al in minuut 14 de score na een geniale steekpass van Theodebestebeste. Baloa_6 verdubbelde na 28 minuten de voorsprong, waarna BoefSam00 in de tweede helft nog tweemaal toesloeg en zijn hattrick voltooide met een benutte strafschop in minuut 84.',
      'Verdedigend stond het elftal als een huis: de tegenstander wist gedurende de hele wedstrijd niet één schot op doel te produceren!'
    ],
    tags: ['FC27', 'CleanSheet', 'Hattrick', 'MatchReport', '5-0'],
    likes: 19820,
    reposts: 4210,
    views: '152.1K',
    bookmarks: 2840,
    comments: [
      {
        id: 'c-fcz-1',
        author: 'BoefSam00 (Sam B.)',
        handle: 'BoefSam00',
        text: 'Match ball secured! That assist from Theo in minute 14 was on a silver platter. Love this team! 🎩⚽⚽⚽',
        textNl: 'Wedstrijdbal in the pocket! Die assist van Theo bij minuut 14 was puur genieten. Heerlijke overwinning boys! 🎩⚽⚽⚽',
        timestamp: '15h',
        likes: 1650,
        verified: true
      },
      {
        id: 'c-fcz-2',
        author: 'Theodebestebeste',
        handle: 'Theodebestebeste',
        text: '9.1 rating and 2 assists, but keeping 0 shots against makes me proudest as a team. Tactical perfection! 🛡️🦁',
        textNl: '9.1 rating en 2 assists, maar 0 schoten tegen maakt me als team het allertrotsst. Tactische perfectie! 🛡️🦁',
        timestamp: '16h',
        likes: 1220,
        verified: true
      }
    ],
    matchScore: {
      homeTeam: 'PredatorUnited',
      awayTeam: 'FC Ziektewet',
      homeScore: 5,
      awayScore: 0,
      scorers: ['BoefSam00 (14\', 53\', 84\' pen)', 'Baloa_6 (28\')', 'Masirm (71\')']
    }
  },
  {
    id: 'news-balopdak',
    title: 'UNSTOPPABLE PAGGAKING67: 9.9 Match Rating in 4-0 Masterclass vs Bal op Dak FC',
    titleNl: 'PAGGAKING67 ONSTOPBAAR: 9.9 Match Rating in 4-0 masterclass tegen Bal op Dak FC',
    subtitle: 'Paggaking67 (T. RaySist) was directly involved in all 4 goals with 2 strikes and 2 assists in a flawless display.',
    subtitleNl: 'Paggaking67 (T. RaySist) was bij álle 4 de doelpunten betrokken met 2 goals en 2 assists in een fabelachtige show.',
    category: 'Squad',
    categoryNl: 'Speler van de Week',
    date: '1 dag geleden',
    readTime: '2 min read',
    readTimeNl: '2 min leestijd',
    author: 'Chief Scout (Predator United)',
    summary: 'A performance for the history books! Paggaking67 earned a near-perfect 9.9 match rating after destroying Bal op Dak FC with 2 goals and 2 assists in a 4-0 sweep.',
    summaryNl: 'Een optreden voor in de geschiedenisboeken! Paggaking67 behaalde een nagenoeg perfecte 9.9 match rating na een 4-0 overwinning op Bal op Dak FC met 2 goals en 2 assists.',
    content: [
      'Fans watching Predator United take on Bal op Dak FC witnessed individual brilliance of the highest order. Paggaking67 put on a striking clinic that opposition defenders simply could not handle.',
      'Scoring in the 19th and 61st minutes, and teeing up Baloa_6 (36\') and BoefSam00 (78\'), Paggaking67 had his fingerprint on every single attacking move.',
      'The 9.9 match rating is the highest recorded by any player in club history, cementing his status as one of our premier attacking stalwarts.'
    ],
    contentNl: [
      'Iedereen die Predator United zag spelen tegen Bal op Dak FC was getuige van individuele klasse van de bovenste plank. Paggaking67 zette een aanvalsles neer waar de tegenstander geen enkel antwoord op had.',
      'Met doelpunten in de 19e en 61e minuut en panklare assists op Baloa_6 (36\') en BoefSam00 (78\') was Paggaking67 betrokken bij iedere treffer.',
      'De 9.9 beoordeling is de allerhoogste match rating in de clubhistorie van Predator United en onderstreept zijn status als absolute topspeler.'
    ],
    tags: ['Paggaking67', 'ManOfTheMatch', '9.9Rating', 'Masterclass', 'FC27'],
    likes: 18450,
    reposts: 3820,
    views: '142.8K',
    bookmarks: 2410,
    comments: [
      {
        id: 'c-bod-1',
        author: 'Paggaking67',
        handle: 'Paggaking67',
        text: 'Pure flow state today! Everything I touched turned into gold. Massive shoutout to the boys for the tireless running! 🔥⚽',
        textNl: 'Pure flow vandaag! Alles viel precies goed. Grote credits naar de boys voor de geweldige loopacties! 🔥⚽',
        timestamp: '1d',
        likes: 1890,
        verified: true
      },
      {
        id: 'c-bod-2',
        author: 'Theodebestebeste',
        handle: 'Theodebestebeste',
        text: 'What a performance from RaySist! Unplayable today. Respect! 🦁',
        textNl: 'Wat een prestatie van RaySist! Vandaag simpelweg niet af te stoppen. Klasse! 🦁',
        timestamp: '1d',
        likes: 1410,
        verified: true
      }
    ],
    matchScore: {
      homeTeam: 'PredatorUnited',
      awayTeam: 'Bal op Dak FC',
      homeScore: 4,
      awayScore: 0,
      scorers: ['Paggaking67 (19\', 61\')', 'Baloa_6 (36\')', 'BoefSam00 (78\')']
    }
  },
  {
    id: 'news-omerta',
    title: 'ATTACKING SHOWCASE! Baloa_6 Nets Treble in Dominant 4-1 Win Over omerta bxl',
    titleNl: 'AANVALSSHOW! Baloa_6 scoort hattrick in overtuigende 4-1 zege op omerta bxl',
    subtitle: 'With 15 shots fired and a 9.5 rating for striker Baloa_6, Predator United put on an offensive blitz in Division 5.',
    subtitleNl: 'Met 15 schoten op doel en een 9.5 beoordeling voor spits Baloa_6 walste Predator United over omerta bxl heen.',
    category: 'Match Report',
    categoryNl: 'Wedstrijdverslag',
    date: '17 uur geleden',
    readTime: '2 min read',
    readTimeNl: '2 min leestijd',
    author: 'Matchday Reporter',
    summary: 'A 4-1 thrashing over Brussels outfit omerta bxl! Baloa_6 was unstoppable, scoring three sublime goals (22\', 59\', 83\') with BoefSam00 adding the second.',
    summaryNl: 'Een klinkende 4-1 overwinning op omerta bxl! Baloa_6 was ongrijpbaar met drie fraaie doelpunten (22\', 59\', 83\'), terwijl BoefSam00 het tweede doelpunt binnenschoot.',
    content: [
      'Predator United dominated from the first whistle against omerta bxl, unleashing 15 shots and racking up a staggering 4.4 xG.',
      'Striker Baloa_6 was clinical, converting half-chances with devastating accuracy to push his season total to 20 goals. Theodebestebeste and BoefSam00 provided supreme service throughout the 90 minutes.'
    ],
    contentNl: [
      'Predator United domineerde vanaf de aftrap tegen omerta bxl. Met 15 doelpogingen en een expected goals van 4.4 werd de tegenstander continu onder druk gezet.',
      'Spits Baloa_6 was meedogenloos in de afronding en tilde zijn seizoenstotaal naar 20 treffers. Theodebestebeste en BoefSam00 zorgden voor vlijmscherpe passes waaruit gescoord werd.'
    ],
    tags: ['Baloa_6', 'Hattrick', 'Division5', 'omertabxl', 'Win'],
    likes: 15300,
    reposts: 2980,
    views: '118.2K',
    bookmarks: 1870,
    comments: [
      {
        id: 'c-om-1',
        author: 'Baloa_6 (Wally)',
        handle: 'Baloa_6',
        text: '20 goals in 17 matches for the club! The service from our midfield is world-class. Thank you boys! ⚽🔥',
        textNl: '20 goals in 17 duels voor de club! De ballen die ik krijg vanaf het middenveld zijn goud waard. Bedankt boys! ⚽🔥',
        timestamp: '16h',
        likes: 1540,
        verified: true
      }
    ],
    matchScore: {
      homeTeam: 'PredatorUnited',
      awayTeam: 'omerta bxl',
      homeScore: 4,
      awayScore: 1,
      scorers: ['Baloa_6 (22\', 59\', 83\')', 'BoefSam00 (41\')', 'omerta bxl (74\')']
    }
  },
  {
    id: 'news-loopkring',
    title: 'THRILLING 3-2 COMEBACK! BoefSam00 Strikes 86th Minute Winner vs Loopkring v2',
    titleNl: 'ZINDERENDE 3-2 COMEBACK! BoefSam00 schiet Predator United in 86e minuut langs Loopkring v2',
    subtitle: 'Heart-stopping drama as Predator United recovers from 1-2 down to claim a crucial Division 5 victory.',
    subtitleNl: 'Bloedstollende slotfase waarin Predator United een 1-2 achterstand ombuigt naar een zwaarbevochten overwinning.',
    category: 'Match Report',
    categoryNl: 'Wedstrijdverslag',
    date: '16 uur geleden',
    readTime: '2 min read',
    readTimeNl: '2 min leestijd',
    author: 'Live Desk',
    summary: 'What a game! In a back-and-forth thriller against Loopkring v2, BoefSam00 scored two goals including an 86th-minute decider set up by Theodebestebeste.',
    summaryNl: 'Wat een spektakelstuk! In een zinderend duel tegen Loopkring v2 scoorde BoefSam00 tweemaal, waaronder de winnende treffer in de 86e minuut na een assist van Theodebestebeste.',
    content: [
      'Trailing 1-2 entering the second half, Predator United dug deep into the reserves of resilience.',
      'Baloa_6 leveled matters at 58 minutes before BoefSam00 burst through on the counter to net the dramatic 86th-minute winner at Stade Louis II.'
    ],
    contentNl: [
      'Na een 1-2 achterstand toonde Predator United karakter in de tweede helft.',
      'Baloa_6 bracht de ploeg in minuut 58 langszij, waarna BoefSam00 in de 86e minuut koelbloedig afrondde na een counter om de 3 punten veilig te stellen!'
    ],
    tags: ['Comeback', 'BoefSam00', 'MatchWinner', 'Division5', 'StadeLouisII'],
    likes: 16400,
    reposts: 3120,
    views: '124.9K',
    bookmarks: 2100,
    comments: [
      {
        id: 'c-loop-1',
        author: 'BoefSam00 (Sam B.)',
        handle: 'BoefSam00',
        text: 'Never give up until the final whistle! Loved celebrating that 86th minute winner with you guys! 👊🦁',
        textNl: 'Nooit opgeven tot het laatste fluitsignaal! Heerlijk om die 86e minuut winner samen te vieren! 👊🦁',
        timestamp: '15h',
        likes: 1290,
        verified: true
      }
    ],
    matchScore: {
      homeTeam: 'PredatorUnited',
      awayTeam: 'Loopkring v2',
      homeScore: 3,
      awayScore: 2,
      scorers: ['BoefSam00 (16\', 86\')', 'Baloa_6 (58\')', 'Loopkring v2 (39\', 72\')']
    }
  },
  {
    id: 'news-tactics',
    title: 'Tactical Breakdown: Maximizing the 4-2-3-1 & 4-4-2 in Division 5',
    titleNl: 'Tactische Analyse: Hoe de 4-2-3-1 en 4-4-2 renderen in Divisie 5',
    subtitle: 'How target man n. Israël and line-breaking runs from T. RaySist unlock opposition defenses.',
    subtitleNl: 'Aanspeelpunt n. Israël en loopacties van T. RaySist creëren structureel gevaar.',
    category: 'Tactics',
    categoryNl: 'Tactiek',
    date: 'Sep 29, 2026',
    readTime: '2 min read',
    readTimeNl: '2 min leestijd',
    author: 'Tactical Staff',
    summary: 'A deep dive into our core tactical tenets: high pressing traps, rapid central link-ups, and lethal finishing inside the 18-yard box.',
    summaryNl: 'Een diepe blik op onze spelprincipes: vroege balverovering, snelle driehoeken op het middenveld en dodelijke afronding in de zestien meter.',
    content: [
      'Maintaining strong pass accuracy in Division 5, PredatorUnited established the groundwork for high-possession attacking play. The interplay between Israël (holding up the ball physically) and RaySist (exploiting half-spaces) keeps opposition center-backs under constant pressure.',
      'Midfield generals BoefSam00, siemieboy12, and goalscorer Baloa_6 ensure high-volume scoring chances.'
    ],
    contentNl: [
      'Met een solide passnauwkeurigheid in Divisie 5 heeft PredatorUnited de basis gelegd voor verzorgd opbouwspel. De wisselwerking tussen Israël (die fysiek sterk ballen vasthoudt) en RaySist (die continu ruimtes induikt) zorgt voor constante onrust in de vijandelijke defensie.',
      'Middenvelders BoefSam00, siemieboy12 en scherpschutter Baloa_6 zorgen voor een ongekend hoge doelpuntenproductie.'
    ],
    tags: ['Tactics', 'Formation', 'Analysis', 'Coaching'],
    likes: 6720,
    reposts: 1240,
    views: '54.2K',
    bookmarks: 930,
    comments: [
      {
        id: 'c-201',
        author: 'Milan de Jong',
        handle: 'MilanDJ_FC',
        text: 'Discipline in the 4-2-3-1 is key. If the CDMs cover the half-spaces, our front four will do the damage every single time.',
        textNl: 'Discipline in de 4-2-3-1 is de sleutel. Als de CVMs het centrum dichtgooien, maakt onze voorhoede het verschil.',
        timestamp: '1d',
        likes: 310,
        verified: true
      }
    ]
  },
  {
    id: 'news-tryouts',
    title: 'Open Try-Outs: Join the PredatorUnited Division 5 Roster',
    titleNl: 'Try-out Campagne Geopend: Wie versterkt PredatorUnited in Divisie 5?',
    subtitle: 'Seeking dedicated players for our regular match sessions on Tuesday, Thursday, and Sunday evenings.',
    subtitleNl: 'Nieuwe versterkingen gezocht voor de vaste speelavonden op dinsdag, donderdag en zondag.',
    category: 'Squad',
    categoryNl: 'Selectie',
    date: 'Sep 28, 2026',
    readTime: '2 min read',
    readTimeNl: '2 min leestijd',
    author: 'Staff (Predator United)',
    summary: 'Are you a reliable defender, central midfielder, or winger with a microphone and winning mindset? Join our Discord server to participate in upcoming trial matches.',
    summaryNl: 'Ben jij een betrouwbare verdediger, middenvelder of buitenspeler met een microfoon en teamspirit? Meld je direct aan via Discord voor een proefsessie.',
    content: [
      'PredatorUnited is built with clear ambitions: storm through Division 5 and compete at the highest tier of EA FC 27 Pro Clubs. To reinforce squad depth and match consistency, we are opening recruitment across all platforms.',
      'Applying is simple: join our official Discord server and visit the #try-outs channel. Mention your EA gamertag and position to schedule a trial match with the squad!'
    ],
    contentNl: [
      'PredatorUnited heeft de ambitie om direct door te stoten vanuit Divisie 5 richting de hoogste divisies van EA FC 27. Om onze selectie breder en competitiever te maken, houden we open try-outs.',
      'Aanmelden kan heel eenvoudig: join onze officiële Discord server en laat je horen in het #try-outs kanaal. Vermeld je EA gamertag en positie om een proefwedstrijd in te plannen!'
    ],
    tags: ['TryOuts', 'Recruitment', 'ProClubs', 'JoinUs', 'Discord'],
    likes: 9840,
    reposts: 2150,
    views: '88.4K',
    bookmarks: 1420,
    comments: [
      {
        id: 'c-302',
        author: 'Theodebestebeste',
        handle: 'Theodebestebeste',
        text: 'Looking forward to testing new talent in upcoming trial matches on Discord. Bring your mic and positive vibes!',
        textNl: 'Kijk ernaar uit om nieuw talent te testen in de proefwedstrijden via Discord. Zorg dat je mic werkt en kom knallen!',
        timestamp: '2d',
        likes: 580,
        verified: true
      }
    ]
  }
];

export const CLUB_INFO = {
  name: 'PredatorUnited',
  tag: '[PRED]',
  clubId: '181654',
  game: 'EA Sports FC 27',
  platform: 'common-gen5 (PS5 / Xbox Series X|S / PC Crossplay)',
  founded: 'September 2026',
  stadium: 'Stade Louis II',
  currentDivision: 'Division 5',
  totalMatches: 20,
  wins: 9,
  draws: 5,
  losses: 6,
  winRate: '45%',
  goalsScored: 57,
  goalsConceded: 36,
  goalDifference: '+21',
  promotions: 2,
  clubReputation: 'Tier 1 (Division 5 · 2 Promotions)',
  skillRating: 1605,
  currentForm: ['L', 'W', 'D', 'W', 'W'],
  playTimes: 'Dinsdag, Donderdag & Zondag (20:15 - 23:00 CET)',
  voiceComms: 'Discord Server (Private Voice)',
  philosophy: 'Direct combinatievoetbal, klinische afronding en keihard vechten voor promotie naar Divisie 1.',
  trophiesTotal: 2,
  trackerUrl: PROCLUBS_TRACKER_URL
};

export const INITIAL_TRIAL_APPLICATIONS: ClubTrialApplication[] = [
  {
    id: 'trial-1',
    gamertag: 'DutchSniper_99',
    platform: 'PlayStation 5',
    preferredPosition: 'CB',
    overallRating: 82,
    discordTag: 'SniperNL#1234',
    experience: '3 years of Division 1 and 2 Pro Clubs experience in previous EA titles.',
    submittedAt: 'Gisteren, 21:45',
    status: 'New',
    notes: 'Tactical interceptor, strong in the air.'
  },
  {
    id: 'trial-2',
    gamertag: 'MidfieldMaestro_Rotterdam',
    platform: 'PC',
    preferredPosition: 'CM',
    overallRating: 80,
    discordTag: 'Maestro#5678',
    experience: 'Played for several Dutch community teams in Div 3.',
    submittedAt: '2 dagen geleden',
    status: 'Contacted',
    notes: 'Box-to-box midfielder, high stamina.'
  }
];

export const INITIAL_CLUB_TROPHIES: Trophy[] = [
  {
    id: 't-1',
    title: 'EA FC 27 Division 5 Promotion Cup',
    season: 'Season 1 (2026)',
    count: 2,
    description: 'Promotie veiliggesteld met 57 gescoorde doelpunten en een 1605 skill rating.',
    iconName: 'Trophy',
    featured: true
  },
  {
    id: 't-2',
    title: 'Division 6 Champions Trophy',
    season: 'Season 1 (2026)',
    count: 1,
    description: 'Onze eerste officiële promotie als nieuw opgericht team in EA FC 27.',
    iconName: 'Award'
  }
];
