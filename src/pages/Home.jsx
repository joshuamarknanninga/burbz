import { useMemo, useState } from 'react';
import { AppWorkspace, FileList, SystemHealthList } from '../components/AppWorkspace';
import { Dock } from '../components/Dock';
import { StatusCardList } from '../components/StatusCardList';
import { WindowPanel } from '../components/WindowPanel';
import { apps, quickPrompts, systemStats } from '../data/dashboard';

const defaultPrompt =
  'How do I run a local Llama assistant entirely offline with low power draw?';

function TopBar({ activeApp }) {
  return (
    <header className="topbar">
      <div>
        <span className="status-dot" aria-hidden="true" />
        {activeApp.label}
      </div>
      <div className="topbar-meta">
        <span>Mesh offline</span>
        <span>GPU 38%</span>
        <span>Fri 20:26 UTC</span>
      </div>
    </header>
  );
}

export default function Home() {
  const [activeAppId, setActiveAppId] = useState('chat');
  const [draftPrompt, setDraftPrompt] = useState(defaultPrompt);

  const activeApp = useMemo(
    () => apps.find((app) => app.id === activeAppId) ?? apps[0],
    [activeAppId],
  );

  return (
    <main className="os-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Burbz OS / Offline AI cockpit</p>
          <h1>Simple MVP operating system for your off-grid Llama AI.</h1>
          <p className="hero-copy">
            A focused desktop-style workspace with local chat, model status, file access, and
            power-aware controls for running disconnected.
          </p>
          <div className="hero-focus">
            <span className="hero-focus-label">Current focus</span>
            <h2>{activeApp.headline}</h2>
            <p>{activeApp.summary}</p>
          </div>
        </div>

        <StatusCardList items={systemStats} />
      </section>

      <section className="desktop-frame" aria-label="Off-grid Llama desktop">
        <Dock apps={apps} activeApp={activeAppId} onSelect={setActiveAppId} />

        <div className="workspace">
          <TopBar activeApp={activeApp} />

          <div className="window-grid">
            <section className="window chat-window">
              <AppWorkspace
                activeApp={activeApp}
                draftPrompt={draftPrompt}
                onDraftChange={setDraftPrompt}
              />
            </section>

            <section className="sidebar-stack">
              <WindowPanel title="Quick prompts" compact>
                <div className="chip-list">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className="chip"
                      onClick={() => setDraftPrompt(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </WindowPanel>

              <WindowPanel title="System health" compact>
                <SystemHealthList />
              </WindowPanel>

              <WindowPanel title="Offline vault" compact>
                <FileList />
              </WindowPanel>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
