import React, { useMemo, useState } from 'react';

const h = React.createElement;

const deviceModes = [
  {
    id: 'iphone',
    label: 'iPhone',
    subtitle: 'Thumb-friendly trading with one-handed flows and quick actions.',
    stats: ['Reachable bottom nav', 'Large tap targets', 'Offline-ready cards'],
  },
  {
    id: 'android',
    label: 'Android',
    subtitle: 'Flexible map, notification, and background sync experience.',
    stats: ['Adaptive layouts', 'Push quest alerts', 'Battery-aware route mode'],
  },
  {
    id: 'pc',
    label: 'PC',
    subtitle: 'Multi-panel command center for power sellers and moderators.',
    stats: ['Dense workspace', 'Keyboard shortcuts', 'Parallel inventory tools'],
  },
];

const navItems = [
  { id: 'market', label: 'Market', icon: '🛍️' },
  { id: 'routes', label: 'Routes', icon: '🗺️' },
  { id: 'squad', label: 'Squad', icon: '🤝' },
  { id: 'garage', label: 'Garage', icon: '🏆' },
];

const routeCards = [
  {
    title: 'Campus loop',
    distance: '1.4 mi',
    reward: '+80 XP',
    status: 'Hot barter zone',
  },
  {
    title: 'Downtown circuit',
    distance: '2.8 mi',
    reward: '+1 badge shard',
    status: 'Quest multiplier live',
  },
  {
    title: 'Weekend flea trail',
    distance: '5.2 mi',
    reward: '+120 XP',
    status: 'Rare trades nearby',
  },
];

const listings = [
  {
    name: 'Retro Polaroid camera',
    offer: '$45 or skateboard deck trade',
    vibe: 'Popular near you',
    quest: 'Photo Scavenger',
  },
  {
    name: 'Handmade cedar shelf',
    offer: '$60 or power tools swap',
    vibe: 'Eco-friendly seller',
    quest: 'Craft Route',
  },
  {
    name: 'Nintendo Switch Lite',
    offer: '$110 or bundle barter',
    vibe: 'Fast pickup window',
    quest: 'Night Market',
  },
];

const achievements = [
  { name: 'Daily scout', progress: 92, detail: 'Visit 3 active trade zones in a row.' },
  { name: 'Trusted trader', progress: 68, detail: 'Keep a 4.8★ rating across 10 swaps.' },
  { name: 'Convoy captain', progress: 54, detail: 'Lead 2 squad routes this week.' },
];

const activityFeed = [
  'Amber completed “Morning Market Run” and unlocked Nitro Negotiator.',
  'Jay marked a safe meetup spot with parking and lighting details.',
  'New community quest: barter 5 reused items before Sunday night.',
];

const Home = () => {
  const [selectedDevice, setSelectedDevice] = useState('iphone');
  const [activeNav, setActiveNav] = useState('market');
  const [searchDraft, setSearchDraft] = useState('Looking for bikes, cameras, and handmade decor within 5 miles');

  const activeDevice = useMemo(
    () => deviceModes.find((device) => device.id === selectedDevice) ?? deviceModes[0],
    [selectedDevice],
  );

  const completionLabel = `${Math.round((achievements.reduce((sum, item) => sum + item.progress, 0) / achievements.length))}% squad progress`;

  return h(
    'main',
    { className: 'market-shell' },
    h(
      'section',
      { className: 'hero-panel' },
      h(
        'div',
        { className: 'hero-copy-block' },
        h('p', { className: 'eyebrow' }, 'Burbz Trading OS / React cross-platform MVP'),
        h('h1', null, 'A Waze-inspired trading post that turns every meetup into a quest.'),
        h(
          'p',
          { className: 'hero-copy' },
          'This React rebuild is tuned for iPhone, Android, and desktop with responsive navigation, route-based discovery, community alerts, badge progression, and marketplace loops designed to feel rewarding on every screen.',
        ),
        h(
          'div',
          { className: 'hero-actions' },
          h('button', { type: 'button' }, 'Launch trade route'),
          h('button', { type: 'button', className: 'ghost-button' }, 'Preview squad missions'),
        ),
      ),
      h(
        'div',
        { className: 'hero-stats' },
        h('article', null, h('span', null, 'Active streak'), h('strong', null, '12 days'), h('p', null, 'Keep trading to preserve your route multiplier.')),
        h('article', null, h('span', null, 'Route XP'), h('strong', null, '2,480 XP'), h('p', null, 'Level 8 Scout with one unlock left.')),
        h('article', null, h('span', null, 'Community trust'), h('strong', null, '4.9 ★'), h('p', null, 'Verified meetup reports and fast response time.')),
      ),
    ),
    h(
      'section',
      { className: 'device-panel' },
      h(
        'div',
        { className: 'section-heading' },
        h('div', null, h('p', { className: 'eyebrow' }, 'Optimized devices'), h('h2', null, 'Designed to feel native on every screen size.')),
        h('p', { className: 'section-copy' }, activeDevice.subtitle),
      ),
      h(
        'div',
        { className: 'device-toggle', role: 'tablist', 'aria-label': 'Supported devices' },
        ...deviceModes.map((device) =>
          h(
            'button',
            {
              key: device.id,
              type: 'button',
              className: `device-pill ${selectedDevice === device.id ? 'is-active' : ''}`,
              onClick: () => setSelectedDevice(device.id),
            },
            h('span', null, device.label),
            h('small', null, device.stats[0]),
          ),
        ),
      ),
      h(
        'div',
        { className: 'device-preview' },
        h(
          'article',
          { className: 'phone-frame' },
          h('div', { className: 'phone-notch' }),
          h('div', { className: 'preview-map' }, h('span', null, 'Live trade route'), h('strong', null, activeDevice.label)),
          h(
            'div',
            { className: 'preview-cards' },
            ...activeDevice.stats.map((stat) => h('div', { key: stat, className: 'preview-chip' }, stat)),
          ),
        ),
        h(
          'article',
          { className: 'device-summary card' },
          h('h3', null, `${activeDevice.label} experience`),
          h('p', null, activeDevice.subtitle),
          h('ul', null, ...activeDevice.stats.map((stat) => h('li', { key: stat }, stat))),
        ),
      ),
    ),
    h(
      'section',
      { className: 'workspace-grid' },
      h(
        'aside',
        { className: 'nav-rail card' },
        h('p', { className: 'rail-title' }, 'Burbz'),
        ...navItems.map((item) =>
          h(
            'button',
            {
              key: item.id,
              type: 'button',
              className: `rail-button ${activeNav === item.id ? 'is-active' : ''}`,
              onClick: () => setActiveNav(item.id),
            },
            h('span', { 'aria-hidden': 'true' }, item.icon),
            h('span', null, item.label),
          ),
        ),
        h('div', { className: 'rail-footer' }, h('span', null, completionLabel), h('strong', null, 'Squad leaderboard #14')),
      ),
      h(
        'div',
        { className: 'dashboard-stack' },
        h(
          'article',
          { className: 'command-card card' },
          h(
            'div',
            { className: 'section-heading compact' },
            h('div', null, h('p', { className: 'eyebrow' }, 'Route discovery'), h('h2', null, 'Find the best next swap.')),
            h('span', { className: 'live-pill' }, 'Live heatmap'),
          ),
          h(
            'label',
            { className: 'search-panel' },
            h('span', null, 'Marketplace intent'),
            h('textarea', {
              value: searchDraft,
              rows: 3,
              onChange: (event) => setSearchDraft(event.target.value),
            }),
          ),
          h(
            'div',
            { className: 'map-panel' },
            h('div', { className: 'map-grid' }),
            h(
              'div',
              { className: 'map-overlay' },
              h('strong', null, 'Nearby quest pulse'),
              h('p', null, 'Three verified meetup zones and one flash barter event are active right now.'),
            ),
          ),
          h(
            'div',
            { className: 'route-grid' },
            ...routeCards.map((route) =>
              h(
                'article',
                { key: route.title, className: 'route-card' },
                h('span', null, route.status),
                h('strong', null, route.title),
                h('p', null, route.distance),
                h('em', null, route.reward),
              ),
            ),
          ),
        ),
        h(
          'div',
          { className: 'detail-grid' },
          h(
            'article',
            { className: 'card' },
            h('div', { className: 'section-heading compact' }, h('div', null, h('p', { className: 'eyebrow' }, 'Market feed'), h('h3', null, 'Trending trades'))),
            h(
              'div',
              { className: 'listing-stack' },
              ...listings.map((listing) =>
                h(
                  'article',
                  { key: listing.name, className: 'listing-card' },
                  h('strong', null, listing.name),
                  h('p', null, listing.offer),
                  h('span', null, listing.vibe),
                  h('em', null, listing.quest),
                ),
              ),
            ),
          ),
          h(
            'article',
            { className: 'card' },
            h('div', { className: 'section-heading compact' }, h('div', null, h('p', { className: 'eyebrow' }, 'Gamification'), h('h3', null, 'Progress garage'))),
            h(
              'div',
              { className: 'achievement-stack' },
              ...achievements.map((achievement) =>
                h(
                  'div',
                  { key: achievement.name, className: 'achievement-row' },
                  h('div', null, h('strong', null, achievement.name), h('p', null, achievement.detail)),
                  h(
                    'div',
                    { className: 'meter-block' },
                    h('span', null, `${achievement.progress}%`),
                    h('div', { className: 'meter-track' }, h('div', { className: 'meter-fill', style: { width: `${achievement.progress}%` } })),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
      h(
        'aside',
        { className: 'community-rail' },
        h(
          'article',
          { className: 'card' },
          h('p', { className: 'eyebrow' }, 'Squad updates'),
          h('h3', null, 'Waze-style community signals'),
          h('ul', { className: 'activity-feed' }, ...activityFeed.map((item) => h('li', { key: item }, item))),
        ),
        h(
          'article',
          { className: 'card cta-card' },
          h('p', { className: 'eyebrow' }, 'Launch checklist'),
          h('h3', null, 'Ready for phone and desktop shipping'),
          h('ul', null,
            h('li', null, 'Responsive React layout built for compact, medium, and wide screens.'),
            h('li', null, 'Gamified route loops, streaks, badges, and live trade alerts.'),
            h('li', null, 'Clear structure for future API, auth, and PWA integrations.'),
          ),
          h('button', { type: 'button' }, 'Open deployment brief'),
        ),
      ),
    ),
  );
};

export default Home;
