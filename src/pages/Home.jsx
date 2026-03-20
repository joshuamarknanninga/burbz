import { useEffect, useMemo, useState } from 'react';
import {
  endgameChecks,
  initialGameState,
  portActions,
  researchNotes,
  resourceCatalog,
  routeStops,
  storageKey,
  supplyPackages,
} from '../data/greekTrail';

function cloneInitialState() {
  return JSON.parse(JSON.stringify(initialGameState));
}

function loadGame() {
  if (typeof window === 'undefined') {
    return cloneInitialState();
  }

  const saved = window.localStorage.getItem(storageKey);
  if (!saved) {
    return cloneInitialState();
  }

  try {
    return {
      ...cloneInitialState(),
      ...JSON.parse(saved),
    };
  } catch {
    return cloneInitialState();
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function sumResources(resources) {
  return Object.values(resources).reduce((sum, value) => sum + value, 0);
}

function formatDanger(level) {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

function MetricCard({ label, value, caption, tone = 'default' }) {
  return (
    <article className={`metric-card tone-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{caption}</p>
    </article>
  );
}

function SectionTitle({ eyebrow, title, body }) {
  return (
    <div className="section-title">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      <span>{body}</span>
    </div>
  );
}

function LogEntry({ entry }) {
  return (
    <article className={`log-entry log-${entry.type}`}>
      <div>
        <p>Day {entry.day}</p>
        <h3>{entry.title}</h3>
      </div>
      <span>{entry.text}</span>
    </article>
  );
}

function StopCard({ stop, isCurrent, isVisited }) {
  return (
    <article className={`stop-card ${isCurrent ? 'is-current' : ''} ${isVisited ? 'is-visited' : ''}`}>
      <div className="stop-card-top">
        <div>
          <p>{stop.subtitle}</p>
          <h3>{stop.name}</h3>
        </div>
        <div className={`danger-pill danger-${stop.danger}`}>{formatDanger(stop.danger)}</div>
      </div>
      <span>{stop.summary}</span>
      <p>{stop.sourceNote}</p>
    </article>
  );
}

function nextStopFor(progress) {
  return routeStops[Math.min(routeStops.length - 1, progress + 1)];
}

function buildTravelEvent(state) {
  const stop = nextStopFor(state.progress);
  const favorMod = Math.floor(state.favor / 20);
  const moraleMod = state.morale >= 70 ? 1 : 0;
  const crewLoss = clamp(stop.danger === 'extreme' ? 8 - favorMod - moraleMod : stop.danger === 'high' ? 5 - favorMod : 3 - favorMod, 0, 9);
  const hullLoss = clamp(stop.danger === 'extreme' ? 18 - favorMod * 2 : stop.danger === 'high' ? 12 - favorMod : 7 - favorMod, 2, 18);
  const barleyUse = stop.danger === 'extreme' ? 4 : 3;
  const wineUse = stop.danger === 'extreme' ? 2 : 1;
  const oilUse = stop.danger === 'high' || stop.danger === 'extreme' ? 1 : 0;

  let title = `Made landfall at ${stop.name}`;
  let text = stop.detail;
  let favorShift = 0;
  let moraleShift = stop.danger === 'medium' ? 2 : -2;

  if (stop.id === 'lemnos') {
    title = 'Lemnos offers comfort and delay';
    text = 'Trade is easy here, but the crew is tempted to linger. You gain a little morale and time slips away.';
    moraleShift = 6;
  }

  if (stop.id === 'cyzicus') {
    title = 'Storms scatter the Argo near Cyzicus';
    text = 'Bad weather and confusion around Mysia cost you crew and hull strength before the way east opens again.';
    moraleShift = -6;
  }

  if (stop.id === 'salmydessus') {
    title = 'Phineus reveals the strait';
    text = 'After costly aid to the seer, you gain navigation knowledge. The price is supplies; the reward is better odds ahead.';
    favorShift = 8;
    moraleShift = 1;
  }

  if (stop.id === 'symplegades') {
    title = 'The Argo threads the Clashing Rocks';
    text = 'The crew rows through the narrowing passage with only a splinter-thin margin. If the gods favor you, the ship survives.';
    favorShift = state.favor >= 28 ? 10 : -10;
    moraleShift = state.favor >= 28 ? 5 : -9;
  }

  if (stop.id === 'aia') {
    title = 'You stand before Aeetes in Colchis';
    text = 'The final test is no longer about miles. It is about whether you preserved enough people, stores, ship, and divine backing to claim the Fleece.';
    moraleShift = 0;
  }

  return {
    stop,
    delta: {
      day: 6 + state.progress,
      crew: -crewLoss,
      hull: -hullLoss,
      morale: moraleShift,
      favor: favorShift,
      resources: {
        barley: -barleyUse,
        wine: -wineUse,
        oliveOil: -oilUse,
        drachmae: 0,
      },
    },
    log: {
      type: stop.id === 'symplegades' ? 'danger' : 'story',
      title,
      text,
    },
  };
}

function applyDelta(state, delta) {
  const next = {
    ...state,
    day: state.day + delta.day,
    crew: clamp(state.crew + delta.crew, 0, 54),
    morale: clamp(state.morale + delta.morale, 0, 100),
    hull: clamp(state.hull + delta.hull, 0, 100),
    favor: clamp(state.favor + delta.favor, 0, 100),
    resources: {
      barley: clamp(state.resources.barley + delta.resources.barley, 0, 40),
      wine: clamp(state.resources.wine + delta.resources.wine, 0, 30),
      oliveOil: clamp(state.resources.oliveOil + delta.resources.oliveOil, 0, 24),
      drachmae: clamp(state.resources.drachmae + delta.resources.drachmae, 0, 400),
    },
  };

  if (next.resources.barley === 0) {
    next.crew = clamp(next.crew - 4, 0, 54);
    next.morale = clamp(next.morale - 10, 0, 100);
  }

  if (next.resources.wine === 0) {
    next.morale = clamp(next.morale - 4, 0, 100);
  }

  if (next.hull <= 0 || next.crew <= 0) {
    next.status = 'lost';
    next.outcome = 'The Argo is no longer seaworthy enough to continue the expedition.';
  }

  return next;
}

function resolveOutcome(state) {
  if (state.status === 'lost') {
    return state;
  }

  if (state.progress < routeStops.length - 1) {
    return state;
  }

  const meetsChecks =
    state.crew >= endgameChecks.minCrew &&
    state.favor >= endgameChecks.minFavor &&
    state.hull >= endgameChecks.minHull &&
    state.resources.barley >= endgameChecks.minBarley;

  return {
    ...state,
    status: meetsChecks ? 'won' : 'lost',
    outcome: meetsChecks
      ? 'You secure the Golden Fleece and bring the Argo to a legendary victory.'
      : 'You reached Colchis, but lacked the crew, stores, hull integrity, or divine favor to finish the quest.',
  };
}

export default function Home() {
  const [game, setGame] = useState(loadGame);
  const [flash, setFlash] = useState('');

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(game));
  }, [game]);

  const currentStop = routeStops[game.progress];
  const upcomingStop = nextStopFor(game.progress);
  const carryLoad = useMemo(() => sumResources(game.resources), [game.resources]);

  const statusTone = game.status === 'won' ? 'success' : game.status === 'lost' ? 'danger' : 'default';

  const pushLog = (nextState, log) => ({
    ...nextState,
    log: [
      {
        day: nextState.day,
        ...log,
      },
      ...nextState.log,
    ].slice(0, 12),
  });

  const setMessage = (message) => {
    setFlash(message);
    window.clearTimeout(window.__argosFlashTimer);
    window.__argosFlashTimer = window.setTimeout(() => setFlash(''), 2200);
  };

  const applyPortAction = (actionId) => {
    if (game.status !== 'playing') {
      return;
    }

    if (actionId === 'trade') {
      if (game.resources.drachmae < 18) {
        setMessage('You need more silver before the merchants will bargain.');
        return;
      }

      const next = pushLog(
        applyDelta(game, {
          day: 2,
          crew: 0,
          morale: 4,
          hull: 0,
          favor: 0,
          resources: { barley: 3, wine: 1, oliveOil: 1, drachmae: -18 },
        }),
        {
          type: 'trade',
          title: 'Port trade completed',
          text: 'You swap silver for grain, oil, and wine while the crew enjoys a calmer market day.',
        },
      );

      setGame(next);
      setMessage('Trade completed.');
      return;
    }

    if (actionId === 'sacrifice') {
      if (game.resources.wine < 1 || game.resources.barley < 1) {
        setMessage('You need both grain and wine for a proper offering.');
        return;
      }

      const next = pushLog(
        applyDelta(game, {
          day: 1,
          crew: 0,
          morale: 2,
          hull: 0,
          favor: 12,
          resources: { barley: -1, wine: -1, oliveOil: 0, drachmae: 0 },
        }),
        {
          type: 'boon',
          title: 'Libation and sacrifice offered',
          text: 'The crew pours wine and burns grain before departure, asking Apollo and the sea gods for a safer passage.',
        },
      );

      setGame(next);
      setMessage('The omens improve.');
      return;
    }

    if (actionId === 'rest') {
      const next = pushLog(
        applyDelta(game, {
          day: 2,
          crew: 1,
          morale: 8,
          hull: 2,
          favor: -2,
          resources: { barley: -2, wine: -1, oliveOil: 0, drachmae: 0 },
        }),
        {
          type: 'story',
          title: 'A feast day steadies the crew',
          text: 'Rest restores confidence, but every pause eats into your stores and momentum.',
        },
      );

      setGame(next);
      setMessage('The rowers recover.');
      return;
    }

    const travelEvent = buildTravelEvent(game);
    let next = applyDelta(game, travelEvent.delta);
    next.progress = clamp(game.progress + 1, 0, routeStops.length - 1);
    next.visitedStops = [...new Set([...game.visitedStops, travelEvent.stop.id])];
    next = pushLog(next, travelEvent.log);
    next = resolveOutcome(next);
    setGame(next);
    setMessage(next.status === 'playing' ? `You reached ${travelEvent.stop.name}.` : next.outcome);
  };

  const buyPackage = (pkg) => {
    if (game.status !== 'playing') {
      return;
    }

    if (game.resources.drachmae < pkg.cost) {
      setMessage('Not enough silver for that package.');
      return;
    }

    const delta = {
      day: 0,
      crew: 0,
      morale: 1,
      hull: pkg.effect.hull ?? 0,
      favor: pkg.effect.favor ?? 0,
      resources: {
        barley: pkg.effect.barley ?? 0,
        wine: pkg.effect.wine ?? 0,
        oliveOil: pkg.effect.oliveOil ?? 0,
        drachmae: -pkg.cost,
      },
    };

    const next = pushLog(applyDelta(game, delta), {
      type: 'trade',
      title: pkg.title,
      text: pkg.note,
    });

    setGame(next);
    setMessage(`${pkg.title} added to the manifest.`);
  };

  const resetGame = () => {
    const next = cloneInitialState();
    setGame(next);
    setMessage('A new voyage begins from Iolcus.');
  };

  return (
    <main className="myth-app">
      <section className="hero-panel myth-hero">
        <div>
          <p className="eyebrow">React MVP · myth-history route</p>
          <h1>Argo Trail</h1>
          <p className="hero-copy">
            An Oregon Trail-style survival game that follows Jason’s voyage from Iolcus to Colchis using a
            route, dangers, and logistics grounded in ancient Greek mythic sources.
          </p>
          <div className="hero-focus">
            <span className="hero-focus-label">Current objective</span>
            <h2>{game.status === 'playing' ? `Reach ${upcomingStop.name}` : game.outcome}</h2>
            <p>
              You are managing a {game.crew}-person expedition with ritual obligations, fragile ship timbers,
              and staple cargo drawn from Greek trade and diet.
            </p>
          </div>
          {flash ? <div className="flash-message">{flash}</div> : null}
        </div>

        <div className="hero-side">
          <MetricCard label="Crew" value={`${game.crew}/54`} caption="Diodorus gives Jason a 54-person expedition." />
          <MetricCard label="Hull" value={`${game.hull}%`} caption="Ship integrity matters most at the Symplegades." />
          <MetricCard label="Favor" value={`${game.favor}%`} caption="Offerings and omens shape several mythic outcomes." />
          <MetricCard label="Quest status" value={game.status} caption={game.outcome || 'Still sailing east.'} tone={statusTone} />
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="panel">
          <SectionTitle
            eyebrow="Voyage state"
            title={`Day ${game.day} near ${currentStop.name}`}
            body="The path follows the outward Argonaut route across the northern Aegean and into the Black Sea."
          />

          <div className="metrics-row">
            <MetricCard label="Morale" value={`${game.morale}%`} caption="Feasts, losses, and omens affect the rowers." />
            <MetricCard label="Cargo load" value={carryLoad} caption="Barley, wine, oil, and silver all compete for room." />
            <MetricCard label="Next danger" value={formatDanger(upcomingStop.danger)} caption={upcomingStop.subtitle} />
          </div>

          <div className="resource-grid">
            {resourceCatalog.map((resource) => (
              <article key={resource.id} className="resource-card">
                <div>
                  <p>{resource.label}</p>
                  <strong>
                    {game.resources[resource.id]} {resource.unit}
                  </strong>
                </div>
                <span>{resource.description}</span>
              </article>
            ))}
          </div>

          <div className="action-grid">
            {portActions.map((action) => (
              <button key={action.id} type="button" className="action-card" onClick={() => applyPortAction(action.id)}>
                <strong>{action.label}</strong>
                <span>{action.description}</span>
              </button>
            ))}
          </div>

          <div className="action-row">
            <button type="button" className="ghost-button" onClick={resetGame}>
              Restart voyage
            </button>
          </div>
        </article>

        <article className="panel">
          <SectionTitle
            eyebrow="Provisioning"
            title="Load historically grounded supplies"
            body="These add-ons turn modern game inventory into Greek staples and ritual equipment."
          />

          <div className="package-list">
            {supplyPackages.map((pkg) => (
              <article key={pkg.id} className="package-card">
                <div className="package-top">
                  <div>
                    <p>{pkg.cost} silver</p>
                    <h3>{pkg.title}</h3>
                  </div>
                  <button type="button" onClick={() => buyPackage(pkg)}>
                    Buy
                  </button>
                </div>
                <span>{pkg.note}</span>
              </article>
            ))}
          </div>

          <div className="checklist-card">
            <p>Victory thresholds</p>
            <ul>
              <li>At least {endgameChecks.minCrew} crew alive in Colchis.</li>
              <li>At least {endgameChecks.minHull}% hull integrity remaining.</li>
              <li>At least {endgameChecks.minFavor}% divine favor.</li>
              <li>At least {endgameChecks.minBarley} barley sacks for the final trial.</li>
            </ul>
          </div>
        </article>
      </section>

      <section className="dashboard-grid lower-grid">
        <article className="panel">
          <SectionTitle
            eyebrow="Route"
            title="Mythic itinerary to Colchis"
            body="Each stop summarizes how the game adapts an episode from ancient Argonaut tradition."
          />
          <div className="stop-list">
            {routeStops.map((stop, index) => (
              <StopCard
                key={stop.id}
                stop={stop}
                isCurrent={index === game.progress}
                isVisited={game.visitedStops.includes(stop.id)}
              />
            ))}
          </div>
        </article>

        <article className="panel">
          <SectionTitle
            eyebrow="Research notes"
            title="What this MVP is based on"
            body="These notes explain the research decisions behind the design, scope, and tone."
          />
          <div className="notes-list">
            {researchNotes.map((note) => (
              <article key={note.title} className="note-card">
                <h3>{note.title}</h3>
                <p>{note.body}</p>
              </article>
            ))}
          </div>

          <SectionTitle
            eyebrow="Captain's log"
            title="Recent events"
            body="Your latest choices, disasters, and ritual wins stay pinned here."
          />
          <div className="log-list">
            {game.log.map((entry, index) => (
              <LogEntry key={`${entry.title}-${index}`} entry={entry} />
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
