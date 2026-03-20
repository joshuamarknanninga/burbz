export const storageKey = 'argos-trail-mvp-save';

export const resourceCatalog = [
  {
    id: 'barley',
    label: 'Barley sacks',
    unit: 'sacks',
    start: 16,
    min: 0,
    max: 30,
    description: 'Staple grain for porridge and shipboard rations.',
  },
  {
    id: 'wine',
    label: 'Wine amphorae',
    unit: 'amphorae',
    start: 10,
    min: 0,
    max: 24,
    description: 'Morale booster, ritual drink, and trade good.',
  },
  {
    id: 'oliveOil',
    label: 'Olive oil jars',
    unit: 'jars',
    start: 8,
    min: 0,
    max: 20,
    description: 'Food, lamp fuel, and medicine all in one.',
  },
  {
    id: 'drachmae',
    label: 'Silver drachmae',
    unit: 'coins',
    start: 120,
    min: 0,
    max: 320,
    description: 'Used to bargain in ports, hire local help, or repair the Argo.',
  },
];

export const supplyPackages = [
  {
    id: 'grain-merchant',
    title: 'Hire a grain merchant',
    cost: 18,
    effect: { barley: 4, wine: 1 },
    note: 'Reflects the importance of cereals and wine in Greek trade and travel.',
  },
  {
    id: 'olive-growers',
    title: 'Buy Amphissian olive stores',
    cost: 20,
    effect: { oliveOil: 4, barley: 1 },
    note: 'Olives and oil were among the most common Greek exports.',
  },
  {
    id: 'sacrificial-kit',
    title: 'Load sacrificial kit',
    cost: 16,
    effect: { favor: 12, wine: 1 },
    note: 'Animal offerings and libations matter at several mythic stops.',
  },
  {
    id: 'shipwright',
    title: 'Pay a shipwright reserve',
    cost: 26,
    effect: { hull: 16 },
    note: 'Argus the builder travels in some versions to keep the Argo sound.',
  },
];

export const routeStops = [
  {
    id: 'iolcus',
    name: 'Iolcus',
    subtitle: 'Muster beneath Mount Pelion',
    mythicYear: 'Heroic Age',
    distance: 0,
    danger: 'low',
    summary:
      'Jason gathers the crew at Iolcus. Ancient accounts describe the Argo as unusually large and outfitted for a difficult expedition to Colchis.',
    detail:
      'Your run begins after consulting the shrines near Thessaly and provisioning a fifty-four-person crew for a very long voyage.',
    sourceNote:
      'Diodorus Siculus says Jason chose fifty-four prominent companions and equipped the ship in striking fashion.',
  },
  {
    id: 'lemnos',
    name: 'Lemnos',
    subtitle: 'A wealthy island stop',
    mythicYear: 'Heroic Age',
    distance: 1,
    danger: 'medium',
    summary:
      'The island gives the crew a tempting chance to rest, trade, and lose precious time.',
    detail:
      'In the myths, Lemnos becomes an early test of discipline: comfort can slow a quest as much as hunger.',
    sourceNote:
      'The Argonaut tradition consistently includes Lemnos as an early stop where delay is a real risk.',
  },
  {
    id: 'cyzicus',
    name: 'Cyzicus & Mysia',
    subtitle: 'Bear Mountain and the Doliones',
    mythicYear: 'Heroic Age',
    distance: 2,
    danger: 'high',
    summary:
      'Friendly hosts, rough weather, and the earth-born Gegenees make this leg one of the voyage’s most dangerous turns.',
    detail:
      'A storm can throw the crew back onto hostile shores at night. Some traditions also place the loss of Hylas in Mysia near this stage.',
    sourceNote:
      'Apollonius and later mythographers describe the Gegenees in Mysia and the tragic confusion with Cyzicus.',
  },
  {
    id: 'salmydessus',
    name: 'Salmydessus',
    subtitle: 'Phineus and the Harpies',
    mythicYear: 'Heroic Age',
    distance: 3,
    danger: 'high',
    summary:
      'The blind seer Phineus can reveal the route ahead, but only if the crew spends supplies and wins divine favor.',
    detail:
      'This is where myth shifts into navigation: warnings about currents, monsters, and the Symplegades come from prophecy.',
    sourceNote:
      'Apollonius has Phineus guide Jason toward the Clashing Rocks after the Harpies are driven away.',
  },
  {
    id: 'symplegades',
    name: 'Symplegades',
    subtitle: 'The Clashing Rocks',
    mythicYear: 'Heroic Age',
    distance: 4,
    danger: 'extreme',
    summary:
      'The straits are the defining survival test of the voyage: trust omen, timing, and seamanship or lose the ship.',
    detail:
      'Ancient tellings emphasize the narrow margin of survival and the need to follow ritual advice exactly.',
    sourceNote:
      'The Symplegades episode is one of the central navigation tests in the Argonautica.',
  },
  {
    id: 'aia',
    name: 'Aia in Colchis',
    subtitle: 'Court of Aeetes',
    mythicYear: 'Heroic Age',
    distance: 5,
    danger: 'extreme',
    summary:
      'The final stop combines diplomacy, ritual trial, and divine politics around the Golden Fleece.',
    detail:
      'To win, you must arrive with enough crew, supplies, hull integrity, and favor to survive the final demands of Aeetes and the gods.',
    sourceNote:
      'The myths treat Colchis as distant, dangerous, and rich at the eastern edge of the Greek heroic world.',
  },
];

export const researchNotes = [
  {
    title: 'Ancient source backbone',
    body:
      'The route is based on the Argonaut expedition as preserved in Apollonius Rhodius and Diodorus Siculus, especially the crew size, the outward sea route, Phineus, and the Symplegades.',
  },
  {
    title: 'Historically grounded cargo',
    body:
      'Barley, wine, olive oil, and silver are used because they were major staples in Greek exchange networks and practical goods for travel, ritual, and shipboard survival.',
  },
  {
    title: 'Myth is not modern history',
    body:
      'This MVP treats Greek mythology as myth-history: it follows ancient literary tradition closely while clearly signaling that these are legendary, not archaeologically verified, events.',
  },
];

export const portActions = [
  {
    id: 'trade',
    label: 'Trade in port',
    description: 'Spend silver for staple goods and patch morale.',
  },
  {
    id: 'sacrifice',
    label: 'Offer sacrifice',
    description: 'Trade food and wine for divine favor before a dangerous leg.',
  },
  {
    id: 'rest',
    label: 'Hold a feast day',
    description: 'Recover morale and a few crew, but consume stores and lose time.',
  },
  {
    id: 'sail',
    label: 'Sail onward',
    description: 'Advance immediately and face the next leg with current resources.',
  },
];

export const initialGameState = {
  day: 1,
  crew: 54,
  morale: 76,
  hull: 92,
  favor: 28,
  progress: 0,
  status: 'playing',
  outcome: '',
  resources: {
    barley: 16,
    wine: 10,
    oliveOil: 8,
    drachmae: 120,
  },
  visitedStops: ['iolcus'],
  log: [
    {
      day: 1,
      type: 'story',
      title: 'The Argo is launched',
      text: 'Jason has assembled a fifty-four-person crew and loaded staple cargo at Iolcus. The omens are mixed, but the sea route east is open.',
    },
  ],
};

export const endgameChecks = {
  minCrew: 18,
  minFavor: 26,
  minHull: 35,
  minBarley: 2,
};
