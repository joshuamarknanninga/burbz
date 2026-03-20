import { useEffect, useMemo, useState } from 'react';
import {
  levelTitles,
  phenomenonOptions,
  quests,
  seriousnessOptions,
  starterReports,
} from '../data/hauntedMvp';

const storageKey = 'haunted-object-mvp-reports';
const jokePattern = /\b(?:lol|lmao|haha|prank|meme|bro|just kidding|fake|creepypasta)\b/i;
const levelStep = 180;

const emptyForm = {
  objectName: '',
  category: '',
  origin: '',
  currentLocation: '',
  acquiredOn: '',
  phenomena: [],
  witnessCount: 1,
  chainOfCustody: '',
  evidenceSummary: '',
  incidentNotes: '',
  seriousness: 'academic',
  riskLevel: 'medium',
  attestation: false,
  submittedBy: '',
};

function loadReports() {
  if (typeof window === 'undefined') {
    return starterReports;
  }

  const saved = window.localStorage.getItem(storageKey);
  if (!saved) {
    return starterReports;
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : starterReports;
  } catch {
    return starterReports;
  }
}

function calculateScore(form) {
  let score = 0;
  const notes = [];
  const longEvidence = form.evidenceSummary.trim().length >= 120;
  const longCustody = form.chainOfCustody.trim().length >= 90;
  const longOrigin = form.origin.trim().length >= 50;
  const hasMultiplePhenomena = form.phenomena.length >= 2;
  const hasWitnesses = Number(form.witnessCount) >= 2;
  const textBundle = `${form.objectName} ${form.origin} ${form.evidenceSummary} ${form.incidentNotes}`;
  const flaggedAsJoke = jokePattern.test(textBundle);

  if (form.objectName.trim().length >= 5) score += 10;
  if (form.category.trim()) score += 8;
  if (longOrigin) score += 12;
  if (form.currentLocation.trim().length >= 8) score += 10;
  if (form.acquiredOn) score += 6;
  if (hasMultiplePhenomena) score += 10;
  if (hasWitnesses) score += 12;
  if (longCustody) score += 14;
  if (longEvidence) score += 14;
  if (form.incidentNotes.trim().length >= 80) score += 8;
  if (form.attestation) score += 8;

  if (!longEvidence) notes.push('Add fuller evidence notes with equipment, dates, or corroboration.');
  if (!longCustody) notes.push('Chain of custody is too thin for archive storage.');
  if (!hasWitnesses) notes.push('A second witness or reviewer would increase trust.');
  if (flaggedAsJoke) {
    score -= 45;
    notes.push('Language suggests the report may not be intended as a serious submission.');
  }

  if (form.seriousness === 'academic') score += 6;
  if (form.riskLevel === 'high') score += 4;

  return {
    score: Math.max(0, Math.min(100, score)),
    flaggedAsJoke,
    notes,
  };
}

function badgeList(reports, level) {
  const archived = reports.filter((report) => report.status === 'archived').length;
  const rejected = reports.filter((report) => report.status === 'hold').length;
  const badges = [];

  if (archived >= 1) badges.push('First sealed relic');
  if (archived >= 3) badges.push('Vault regular');
  if (reports.some((report) => report.witnessCount >= 3)) badges.push('Multi-witness tracker');
  if (rejected === 0 && reports.length >= 3) badges.push('Clean credibility streak');
  if (level >= 4) badges.push('Senior custodian');

  return badges;
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

function MetricCard({ label, value, caption }) {
  return (
    <article className="metric-card">
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

function ReportCard({ report, onStatusChange }) {
  return (
    <article className={`report-card status-${report.status}`}>
      <div className="report-card-top">
        <div>
          <p className="report-status">{report.status}</p>
          <h3>{report.objectName}</h3>
        </div>
        <div className="score-pill">{report.score}/100</div>
      </div>

      <dl>
        <div>
          <dt>Category</dt>
          <dd>{report.category}</dd>
        </div>
        <div>
          <dt>Stored at</dt>
          <dd>{report.currentLocation}</dd>
        </div>
        <div>
          <dt>Witnesses</dt>
          <dd>{report.witnessCount}</dd>
        </div>
        <div>
          <dt>Phenomena</dt>
          <dd>{report.phenomena.join(', ')}</dd>
        </div>
      </dl>

      <p className="report-copy">{report.evidenceSummary}</p>
      <p className="moderation-note">Moderator note: {report.moderationNote}</p>

      {onStatusChange ? (
        <div className="card-actions">
          <button type="button" onClick={() => onStatusChange(report.id, 'archived')}>
            Seal in storage house
          </button>
          <button type="button" onClick={() => onStatusChange(report.id, 'review')}>
            Keep in review
          </button>
          <button type="button" className="ghost-button" onClick={() => onStatusChange(report.id, 'hold')}>
            Hold back
          </button>
        </div>
      ) : null}
    </article>
  );
}

export default function Home() {
  const [reports, setReports] = useState(loadReports);
  const [form, setForm] = useState(emptyForm);
  const [activeStorageFilter, setActiveStorageFilter] = useState('all');
  const [flash, setFlash] = useState('');

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(reports));
  }, [reports]);

  const stats = useMemo(() => {
    const archived = reports.filter((report) => report.status === 'archived').length;
    const review = reports.filter((report) => report.status === 'review').length;
    const hold = reports.filter((report) => report.status === 'hold').length;
    const totalXp = reports.reduce((sum, report) => sum + (report.xpAwarded ?? 0), 0);
    const level = Math.max(1, Math.floor(totalXp / levelStep) + 1);
    const currentLevelXp = totalXp - (level - 1) * levelStep;
    const progress = Math.min(100, Math.round((currentLevelXp / levelStep) * 100));

    return {
      archived,
      review,
      hold,
      totalXp,
      level,
      progress,
      levelTitle: levelTitles[Math.min(levelTitles.length - 1, level - 1)],
      badges: badgeList(reports, level),
    };
  }, [reports]);

  const filteredReports = useMemo(() => {
    if (activeStorageFilter === 'all') {
      return reports;
    }

    return reports.filter((report) => report.status === activeStorageFilter);
  }, [activeStorageFilter, reports]);

  const vettingQueue = useMemo(
    () => reports.filter((report) => report.status === 'review' || report.status === 'hold'),
    [reports],
  );

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handlePhenomenonToggle = (item) => {
    setForm((current) => ({
      ...current,
      phenomena: current.phenomena.includes(item)
        ? current.phenomena.filter((value) => value !== item)
        : [...current.phenomena, item],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const review = calculateScore(form);
    const status = review.flaggedAsJoke ? 'hold' : review.score >= 80 ? 'archived' : review.score >= 55 ? 'review' : 'hold';
    const xpAwarded = status === 'archived' ? 140 : status === 'review' ? 85 : 20;
    const moderationNote = review.flaggedAsJoke
      ? 'Submission held: rewrite in a formal tone and add verifiable details.'
      : review.notes[0] ?? 'Meets the minimum evidence bar for the current queue.';

    const nextReport = {
      id: `case-${Date.now()}`,
      ...form,
      status,
      score: review.score,
      xpAwarded,
      moderationNote,
      createdAt: new Date().toISOString(),
    };

    setReports((current) => [nextReport, ...current]);
    setForm(emptyForm);
    setFlash(
      status === 'archived'
        ? 'Case accepted into the storage house. Credibility XP awarded.'
        : status === 'review'
          ? 'Case sent to the vetting queue. Add more proof to unlock archive status.'
          : 'Case held back. The seriousness filter detected weak or joking details.',
    );
  };

  const handleStatusChange = (id, status) => {
    setReports((current) =>
      current.map((report) =>
        report.id === id
          ? {
              ...report,
              status,
              xpAwarded:
                status === 'archived' ? Math.max(report.xpAwarded, 140) : status === 'review' ? 90 : 20,
              moderationNote:
                status === 'archived'
                  ? 'Moderator sealed this case into long-term storage.'
                  : status === 'review'
                    ? 'Moderator requests another evidence pass before archiving.'
                    : 'Moderator held the report outside the archive due to credibility concerns.',
            }
          : report,
      ),
    );
  };

  return (
    <main className="haunted-app">
      <section className="hero-panel haunted-hero">
        <div>
          <p className="eyebrow">Haunted object database / React MVP</p>
          <h1>Build a serious, gamified archive for haunted objects — not campfire jokes.</h1>
          <p className="hero-copy">
            This remake turns the original haunted object map idea into a React-first intake and
            review hub with formal submissions, a storage house archive, and a trust system that
            rewards evidence-backed fieldwork.
          </p>
          <div className="hero-focus">
            <span className="hero-focus-label">How it works</span>
            <h2>Detailed forms enter a vetting queue before public archive placement.</h2>
            <p>
              Every report is scored for seriousness, witness quality, chain of custody, and depth
              of evidence. Strong cases enter the storage house immediately, while weak or joking
              entries are held back for moderator review.
            </p>
          </div>
        </div>

        <div className="hero-stats haunted-metrics">
          <MetricCard
            label="Archived relics"
            value={stats.archived}
            caption="Cases currently sealed in the storage house."
          />
          <MetricCard
            label="Vetting queue"
            value={stats.review + stats.hold}
            caption="Reports awaiting approval, edits, or rejection."
          />
          <MetricCard
            label="Credibility level"
            value={`Lv.${stats.level}`}
            caption={`${stats.levelTitle} • ${stats.totalXp} XP banked.`}
          />
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="panel panel-form">
          <SectionTitle
            eyebrow="1. Field intake"
            title="Detailed haunted object submission"
            body="Collect facts the way an archivist or investigator would."
          />

          <form className="intake-form" onSubmit={handleSubmit}>
            <label>
              Object name
              <input
                value={form.objectName}
                onChange={(event) => handleChange('objectName', event.target.value)}
                placeholder="Ex: Blackthorn Mourning Locket"
                required
              />
            </label>

            <div className="form-split">
              <label>
                Category
                <input
                  value={form.category}
                  onChange={(event) => handleChange('category', event.target.value)}
                  placeholder="Artifact, furniture, jewelry..."
                  required
                />
              </label>

              <label>
                Witness count
                <input
                  type="number"
                  min="1"
                  value={form.witnessCount}
                  onChange={(event) => handleChange('witnessCount', Number(event.target.value))}
                  required
                />
              </label>
            </div>

            <label>
              Origin and provenance
              <textarea
                value={form.origin}
                onChange={(event) => handleChange('origin', event.target.value)}
                placeholder="Explain where the object came from, who handled it, and why it matters."
                required
              />
            </label>

            <div className="form-split">
              <label>
                Current storage location
                <input
                  value={form.currentLocation}
                  onChange={(event) => handleChange('currentLocation', event.target.value)}
                  placeholder="Shelf, vault, locker, museum room..."
                  required
                />
              </label>

              <label>
                Acquisition date
                <input
                  type="date"
                  value={form.acquiredOn}
                  onChange={(event) => handleChange('acquiredOn', event.target.value)}
                  required
                />
              </label>
            </div>

            <fieldset>
              <legend>Reported phenomena</legend>
              <div className="check-grid">
                {phenomenonOptions.map((item) => (
                  <label key={item} className="check-pill">
                    <input
                      type="checkbox"
                      checked={form.phenomena.includes(item)}
                      onChange={() => handlePhenomenonToggle(item)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label>
              Chain of custody
              <textarea
                value={form.chainOfCustody}
                onChange={(event) => handleChange('chainOfCustody', event.target.value)}
                placeholder="Document the transfer history from previous owner to current vault."
                required
              />
            </label>

            <label>
              Evidence summary
              <textarea
                value={form.evidenceSummary}
                onChange={(event) => handleChange('evidenceSummary', event.target.value)}
                placeholder="Describe interviews, recordings, environmental readings, or sworn testimony."
                required
              />
            </label>

            <label>
              Incident notes
              <textarea
                value={form.incidentNotes}
                onChange={(event) => handleChange('incidentNotes', event.target.value)}
                placeholder="Keep speculation separate from observed events."
                required
              />
            </label>

            <div className="form-split triple">
              <label>
                Report style
                <select
                  value={form.seriousness}
                  onChange={(event) => handleChange('seriousness', event.target.value)}
                >
                  {seriousnessOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Risk level
                <select value={form.riskLevel} onChange={(event) => handleChange('riskLevel', event.target.value)}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>

              <label>
                Submitted by
                <input
                  value={form.submittedBy}
                  onChange={(event) => handleChange('submittedBy', event.target.value)}
                  placeholder="Investigator or archive team"
                  required
                />
              </label>
            </div>

            <label className="attestation">
              <input
                type="checkbox"
                checked={form.attestation}
                onChange={(event) => handleChange('attestation', event.target.checked)}
              />
              <span>
                I confirm this is a serious submission intended for archival review, not a joke or
                fictional post.
              </span>
            </label>

            <button type="submit" className="primary-button">
              Submit haunted object case
            </button>

            {flash ? <p className="flash-message">{flash}</p> : null}
          </form>
        </article>

        <article className="panel">
          <SectionTitle
            eyebrow="2. Credibility engine"
            title="Automated seriousness vetting"
            body="A lightweight moderation system for the MVP."
          />

          <div className="rubric-list">
            <div>
              <strong>High trust signals</strong>
              <p>Long-form evidence, clear custody records, 2+ witnesses, and formal attestation.</p>
            </div>
            <div>
              <strong>Hold triggers</strong>
              <p>Thin provenance, meme language, no corroboration, or vague storage details.</p>
            </div>
            <div>
              <strong>Queue logic</strong>
              <p>80+ auto-archives, 55-79 enters review, and lower scores stay on hold.</p>
            </div>
          </div>

          <div className="queue-stack">
            {vettingQueue.map((report) => (
              <ReportCard key={report.id} report={report} onStatusChange={handleStatusChange} />
            ))}
            {!vettingQueue.length ? <p className="empty-state">No cases waiting — the vault team is caught up.</p> : null}
          </div>
        </article>
      </section>

      <section className="dashboard-grid lower-grid">
        <article className="panel">
          <SectionTitle
            eyebrow="3. Storage house"
            title="Archived forms and sealed object records"
            body="Every form is persisted locally for MVP review and archive browsing."
          />

          <div className="filter-row">
            {['all', 'archived', 'review', 'hold'].map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeStorageFilter === filter ? 'is-active' : ''}
                onClick={() => setActiveStorageFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="storage-grid">
            {filteredReports.map((report) => (
              <article key={report.id} className="storage-card">
                <div className="storage-top">
                  <div>
                    <p>{report.category}</p>
                    <h3>{report.objectName}</h3>
                  </div>
                  <span>{report.status}</span>
                </div>
                <ul>
                  <li>Stored at: {report.currentLocation}</li>
                  <li>Acquired: {formatDate(report.acquiredOn || report.createdAt)}</li>
                  <li>Filed by: {report.submittedBy}</li>
                  <li>Phenomena: {report.phenomena.join(', ')}</li>
                </ul>
              </article>
            ))}
          </div>
        </article>

        <article className="panel">
          <SectionTitle
            eyebrow="4. Gamification"
            title="Level up like a trusted field network"
            body="Inspired by crowd-powered progress systems, but tailored to paranormal archive work."
          />

          <div className="level-panel">
            <div>
              <p className="level-label">Current rank</p>
              <h3>
                Level {stats.level}: {stats.levelTitle}
              </h3>
              <p>
                Your archive reputation grows when you submit serious reports, help moderators seal
                review cases, and avoid flimsy or joking entries.
              </p>
            </div>
            <div className="level-progress">
              <div className="progress-bar">
                <span style={{ width: `${stats.progress}%` }} />
              </div>
              <strong>{stats.progress}% to next level</strong>
            </div>
          </div>

          <div className="badge-wrap">
            {stats.badges.map((badge) => (
              <span key={badge} className="badge-pill">
                {badge}
              </span>
            ))}
            {!stats.badges.length ? <span className="badge-pill muted">No badges yet</span> : null}
          </div>

          <div className="quest-list">
            {quests.map((quest) => (
              <article key={quest.title}>
                <div>
                  <p>{quest.reward}</p>
                  <h3>{quest.title}</h3>
                </div>
                <span>{quest.detail}</span>
              </article>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
