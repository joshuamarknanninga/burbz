import {
  files,
  healthChecks,
  modelProfiles,
  powerPlan,
  suggestedResponse,
} from '../data/dashboard';

function ChatPanel({ draftPrompt, onDraftChange, primaryAction, secondaryAction }) {
  return (
    <>
      <div className="window-header">
        <div className="window-controls" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p>Local assistant</p>
      </div>

      <div className="conversation">
        <article className="message assistant">
          <p className="message-role">Llama</p>
          <p>
            Offline stack is healthy. Indexes are cached locally, transcription is disabled,
            and low-power inference mode is available.
          </p>
        </article>

        <article className="message user">
          <p className="message-role">Operator</p>
          <p>{draftPrompt}</p>
        </article>

        <article className="message soft">
          <p className="message-role">Suggested response</p>
          <ul>
            {suggestedResponse.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <label className="prompt-box">
        <span>Prompt composer</span>
        <textarea value={draftPrompt} onChange={(event) => onDraftChange(event.target.value)} rows={4} />
      </label>

      <div className="prompt-actions">
        <button type="button">{primaryAction}</button>
        <button type="button" className="ghost-button">
          {secondaryAction}
        </button>
      </div>
    </>
  );
}

function VaultPanel({ primaryAction, secondaryAction }) {
  return (
    <>
      <div className="window-header">
        <div>
          <p>Offline vault overview</p>
          <span className="panel-caption">Everything below is available without network access.</span>
        </div>
      </div>
      <div className="file-list file-list--detailed">
        {files.map((file) => (
          <div key={file.name} className="file-row file-row--stacked">
            <div>
              <strong>{file.name}</strong>
              <span>
                {file.type} · {file.size}
              </span>
            </div>
            <p>{file.detail}</p>
          </div>
        ))}
      </div>
      <div className="prompt-actions">
        <button type="button">{primaryAction}</button>
        <button type="button" className="ghost-button">
          {secondaryAction}
        </button>
      </div>
    </>
  );
}

function ModelPanel({ primaryAction, secondaryAction }) {
  return (
    <>
      <div className="window-header">
        <div>
          <p>Model profiles</p>
          <span className="panel-caption">Choose the right profile for speed, quality, or resilience.</span>
        </div>
      </div>
      <div className="card-grid">
        {modelProfiles.map((profile) => (
          <article key={profile.name} className="data-card">
            <strong>{profile.name}</strong>
            <span>Latency: {profile.latency}</span>
            <span>Memory: {profile.memory}</span>
            <p>{profile.note}</p>
          </article>
        ))}
      </div>
      <div className="prompt-actions">
        <button type="button">{primaryAction}</button>
        <button type="button" className="ghost-button">
          {secondaryAction}
        </button>
      </div>
    </>
  );
}

function PowerPanel({ primaryAction, secondaryAction }) {
  return (
    <>
      <div className="window-header">
        <div>
          <p>Energy planner</p>
          <span className="panel-caption">Throttle workloads before they become a battery problem.</span>
        </div>
      </div>
      <div className="status-list">
        {powerPlan.map((item) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
      <div className="prompt-actions">
        <button type="button">{primaryAction}</button>
        <button type="button" className="ghost-button">
          {secondaryAction}
        </button>
      </div>
    </>
  );
}

export function AppWorkspace({ activeApp, draftPrompt, onDraftChange }) {
  const sharedProps = {
    primaryAction: activeApp.primaryAction,
    secondaryAction: activeApp.secondaryAction,
  };

  switch (activeApp.id) {
    case 'files':
      return <VaultPanel {...sharedProps} />;
    case 'models':
      return <ModelPanel {...sharedProps} />;
    case 'power':
      return <PowerPanel {...sharedProps} />;
    case 'chat':
    default:
      return <ChatPanel {...sharedProps} draftPrompt={draftPrompt} onDraftChange={onDraftChange} />;
  }
}

export function SystemHealthList() {
  return (
    <div className="status-list">
      {healthChecks.map((item) => (
        <div key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

export function FileList() {
  return (
    <div className="file-list">
      {files.map((file) => (
        <div key={file.name} className="file-row">
          <div>
            <strong>{file.name}</strong>
            <span>{file.type}</span>
          </div>
          <span>{file.size}</span>
        </div>
      ))}
    </div>
  );
}
