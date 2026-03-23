import './App.css'

const hotZones = [
  {
    name: 'Roast District',
    vibe: 'High chaos, immaculate tacos, 92% meme density.',
    rating: 'Spicy',
    activity: '12 fresh reports',
    position: { top: '18%', left: '62%' },
  },
  {
    name: 'Block Party Row',
    vibe: 'Live music, bike swarms, and aunties judging parking.',
    rating: 'Legendary',
    activity: '7 squad check-ins',
    position: { top: '44%', left: '28%' },
  },
  {
    name: 'Sneaker Alley',
    vibe: 'Streetwear sightings and late-night dumpling diplomacy.',
    rating: 'Trending',
    activity: '19 style pings',
    position: { top: '58%', left: '70%' },
  },
  {
    name: 'Sunset Courts',
    vibe: 'Golden-hour hoops, loud debates, low patience for tourists.',
    rating: 'Certified',
    activity: '5 rumor drops',
    position: { top: '72%', left: '40%' },
  },
]

const missions = [
  {
    title: 'Verify the taco truck line',
    reward: '+90 cred',
    detail: 'Confirm the wait time and drop a spicy-but-useful tip for tonight’s crowd.',
    emoji: '🌮',
  },
  {
    title: 'Tag the loudest block',
    reward: '+55 XP',
    detail: 'Leave a funny one-liner and rate the vibe so newcomers know what they’re walking into.',
    emoji: '🔊',
  },
  {
    title: 'Scout a safe shortcut',
    reward: '+120 route points',
    detail: 'Mark the better-lit route and note which corner stores are still open.',
    emoji: '🛣️',
  },
]

const leaderboard = [
  { name: 'MayorMemez', title: 'Chaos Cartographer', score: '14,220' },
  { name: 'AuntieGPS', title: 'Route Whisperer', score: '12,980' },
  { name: 'LilDetour', title: 'Snack Scout', score: '11,405' },
]

const platformCards = [
  {
    title: 'Android ready',
    detail: 'Ship fast as a PWA now, then wrap the build with Capacitor for Play Store packaging and native plugins.',
    badge: 'Play + Web',
  },
  {
    title: 'iPhone ready',
    detail: 'Installable from Safari as a web app, with a clean upgrade path to an App Store build using the same React codebase.',
    badge: 'Safari + App Store',
  },
  {
    title: 'Desktop ready',
    detail: 'Responsive layout, keyboard-friendly cards, standalone PWA install, and room for richer moderation dashboards.',
    badge: 'Mac + PC',
  },
]

const stackCards = [
  {
    title: 'Map engine',
    detail: 'Start with MapLibre GL JS for open-source maps and lower lock-in. Add Mapbox only if you need premium basemaps or search.',
  },
  {
    title: 'Mobile shell',
    detail: 'Use Capacitor to package the React app for iOS and Android while keeping the web build first-class.',
  },
  {
    title: 'Live fun features',
    detail: 'Layer geolocation, haptics, push notifications, and camera-based “receipt/check-in proof” for playful missions.',
  },
  {
    title: 'Optimization',
    detail: 'Ship as a PWA with manifest + service worker, defer heavier map SDKs, and cache the latest neighborhood feed offline.',
  },
]

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">hood mapz clone / react rebuild</p>
          <h1>Burbz Blitz</h1>
          <p className="subtitle">
            A funny, informative, Waze-style neighborhood radar where users earn cred for sharing what a block really feels like.
          </p>
        </div>
        <div className="score-panel" aria-label="Player progress">
          <span>🔥 8-day streak</span>
          <span>🏆 2,480 cred</span>
          <span>🧭 14 route saves</span>
        </div>
      </header>

      <main className="layout">
        <section className="hero card">
          <div className="hero-copy">
            <p className="section-tag">Live city pulse</p>
            <h2>Know the vibe before you pull up.</h2>
            <p>
              Crowdsource the jokes, the warnings, the snack spots, the parking drama, and the best detours.
              Users level up by posting useful intel instead of boring reviews.
            </p>
            <div className="hero-actions">
              <button type="button">Start a vibe run</button>
              <button type="button" className="ghost-button">
                View install plan
              </button>
            </div>
          </div>

          <div className="mini-stats" aria-label="Quick app stats">
            <article>
              <strong>247</strong>
              <span>active reports tonight</span>
            </article>
            <article>
              <strong>31</strong>
              <span>missions in rotation</span>
            </article>
            <article>
              <strong>89%</strong>
              <span>tips rated actually useful</span>
            </article>
          </div>
        </section>

        <section className="map-panel card">
          <div className="panel-heading">
            <div>
              <p className="section-tag">Gamified map concept</p>
              <h2>Neighborhood heat + route humor</h2>
            </div>
            <span className="chip">Mock realtime map UI</span>
          </div>

          <div className="map-surface" role="img" aria-label="Mock map showing neighborhood hotspots and route overlays">
            <div className="route route-one" />
            <div className="route route-two" />
            {hotZones.map((zone) => (
              <article
                className="hot-zone"
                key={zone.name}
                style={{ top: zone.position.top, left: zone.position.left }}
              >
                <span className="pulse" aria-hidden="true" />
                <div className="zone-card">
                  <p>{zone.rating}</p>
                  <h3>{zone.name}</h3>
                  <span>{zone.activity}</span>
                  <small>{zone.vibe}</small>
                </div>
              </article>
            ))}
            <div className="map-grid" aria-hidden="true" />
          </div>
        </section>

        <section className="missions card">
          <div className="panel-heading">
            <div>
              <p className="section-tag">Waze-like game loop</p>
              <h2>Players earn points for useful street knowledge.</h2>
            </div>
            <span className="chip accent">3 featured missions</span>
          </div>

          <div className="mission-grid">
            {missions.map((mission) => (
              <article className="mission-card" key={mission.title}>
                <div className="mission-topline">
                  <span className="emoji" aria-hidden="true">
                    {mission.emoji}
                  </span>
                  <span className="reward">{mission.reward}</span>
                </div>
                <h3>{mission.title}</h3>
                <p>{mission.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="split-grid">
          <section className="card leaderboard">
            <div className="panel-heading">
              <div>
                <p className="section-tag">Social proof</p>
                <h2>Top locals this week</h2>
              </div>
            </div>
            <ol>
              {leaderboard.map((player, index) => (
                <li key={player.name}>
                  <span className="rank">#{index + 1}</span>
                  <div>
                    <strong>{player.name}</strong>
                    <p>{player.title}</p>
                  </div>
                  <span className="leader-score">{player.score}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="card install-plan">
            <div className="panel-heading">
              <div>
                <p className="section-tag">Cross-platform path</p>
                <h2>Can this ship to phone + computer?</h2>
              </div>
            </div>
            <div className="platform-list">
              {platformCards.map((platform) => (
                <article key={platform.title}>
                  <span className="chip">{platform.badge}</span>
                  <h3>{platform.title}</h3>
                  <p>{platform.detail}</p>
                </article>
              ))}
            </div>
          </section>
        </section>

        <section className="card tech-stack">
          <div className="panel-heading">
            <div>
              <p className="section-tag">Deep research translated into product direction</p>
              <h2>Recommended tech + fun feature stack</h2>
            </div>
          </div>

          <div className="stack-grid">
            {stackCards.map((card) => (
              <article key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.detail}</p>
              </article>
            ))}
          </div>

          <div className="research-note">
            <strong>Next build move:</strong> wire this UI to a real map feed, geolocation permissions, moderation, and a lightweight mission backend.
            The repository now includes PWA scaffolding and a research brief so you can continue toward Android, iPhone, and desktop deployment.
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
