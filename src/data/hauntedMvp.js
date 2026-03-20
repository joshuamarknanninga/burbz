export const starterReports = [
  {
    id: 'case-001',
    objectName: 'Blackthorn Mourning Locket',
    category: 'Jewelry',
    origin: 'Inherited from a family estate in Providence, Rhode Island',
    currentLocation: 'Cold storage locker B-12',
    acquiredOn: '2025-10-13',
    phenomena: ['Whispers', 'Temperature drop'],
    witnessCount: 3,
    chainOfCustody:
      'Recovered by the estate attorney, transferred to a parish archivist, and sealed by the current custodian with a notarized hand-off.',
    evidenceSummary:
      'Three independent witnesses documented whispered responses, a 9°F temperature drop, and one EVP clip captured on two devices during cataloging.',
    incidentNotes:
      'Activity intensified when the locket was opened. The hinge now remains wax-sealed between examinations.',
    seriousness: 'academic',
    riskLevel: 'high',
    attestation: true,
    submittedBy: 'N. Alvarez',
    status: 'archived',
    score: 92,
    xpAwarded: 140,
    moderationNote: 'Full chain of custody and corroborated evidence. Eligible for permanent archive.',
    createdAt: '2026-03-18T22:14:00.000Z',
  },
  {
    id: 'case-002',
    objectName: 'Basement Carousel Horse Fragment',
    category: 'Artifact',
    origin: 'Removed from a defunct fairground ride outside Tulsa, Oklahoma',
    currentLocation: 'Quarantine shelf Q-4',
    acquiredOn: '2026-01-28',
    phenomena: ['Movement', 'Nightmares'],
    witnessCount: 1,
    chainOfCustody:
      'Seller account and transport details were provided, but the previous owner timeline still has gaps.',
    evidenceSummary:
      'Single witness reports vibration after midnight and recurring dreams after touching the lacquered surface.',
    incidentNotes:
      'Needs corroboration from additional observers before public release.',
    seriousness: 'investigative',
    riskLevel: 'medium',
    attestation: true,
    submittedBy: 'Field Team 6',
    status: 'review',
    score: 68,
    xpAwarded: 90,
    moderationNote: 'Promising report, but supporting evidence is thin.',
    createdAt: '2026-03-19T09:42:00.000Z',
  },
];

export const phenomenonOptions = [
  'Whispers',
  'Movement',
  'Scratches',
  'Temperature drop',
  'Electrical disturbance',
  'Nightmares',
  'Apparition',
  'Odor',
];

export const seriousnessOptions = [
  {
    id: 'academic',
    label: 'Academic archive',
    description: 'Written for researchers with evidence and careful sourcing.',
  },
  {
    id: 'investigative',
    label: 'Investigation log',
    description: 'Prepared for vetting, with facts separated from theory.',
  },
  {
    id: 'personal',
    label: 'Personal testimony',
    description: 'First-hand account intended for follow-up interviews.',
  },
];

export const levelTitles = [
  'Night Clerk',
  'Archive Runner',
  'Case Steward',
  'Relic Ranger',
  'Custodian of Evidence',
  'Warden of the Vault',
];

export const quests = [
  {
    title: 'Earn trust quickly',
    reward: '+35 XP',
    detail: 'Submit a report with 2+ witnesses, a chain of custody, and a serious attestation.',
  },
  {
    title: 'Stabilize the archive',
    reward: '+50 XP',
    detail: 'Promote two review cases into the storage house after adding moderator notes.',
  },
  {
    title: 'No campfire fiction',
    reward: 'Credibility badge',
    detail: 'Keep your rejection rate under 10% while filing three complete cases.',
  },
];
