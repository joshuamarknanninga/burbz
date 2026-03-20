import React, { useMemo, useState } from 'react';

const h = React.createElement;

const apps = [
  { id: 'chat', label: 'Llama Chat', icon: '◉' },
  { id: 'files', label: 'Vault', icon: '▣' },
  { id: 'models', label: 'Models', icon: '△' },
  { id: 'power', label: 'Power', icon: '⬢' },
];

const quickPrompts = [
  'Summarize my field notes from today.',
  'Draft a low-power comms plan for the cabin.',
  'Convert this maintenance checklist into markdown.',
  'What should I cache before going offline for a week?',
];

const files = [
  { name: 'mission-brief.md', type: 'Markdown', size: '12 KB' },
  { name: 'radio-frequencies.txt', type: 'Text', size: '3 KB' },
  { name: 'llama-3-8b-q4.gguf', type: 'Model', size: '4.1 GB' },
  { name: 'solar-log.csv', type: 'Data', size: '86 KB' },
];

const Home = () => {
  const [activeApp, setActiveApp] = useState('chat');
  const [draftPrompt, setDraftPrompt] = useState('How do I run a local Llama assistant entirely offline with low power draw?');

  const activeAppMeta = useMemo(
    () => apps.find((app) => app.id === activeApp) ?? apps[0],
    [activeApp],
  );

  const appButtons = apps.map((app) =>
    h(
      'button',
      {
        key: app.id,
        type: 'button',
        className: `dock-app ${activeApp === app.id ? 'is-active' : ''}`,
        onClick: () => setActiveApp(app.id),
      },
      h('span', { className: 'dock-icon', 'aria-hidden': 'true' }, app.icon),
      h('span', null, app.label),
    ),
  );

  const quickPromptButtons = quickPrompts.map((prompt) =>
    h(
      'button',
      {
        key: prompt,
        type: 'button',
        className: 'chip',
        onClick: () => setDraftPrompt(prompt),
      },
      prompt,
    ),
  );

  const fileRows = files.map((file) =>
    h(
      'div',
      { key: file.name, className: 'file-row' },
      h('div', null, h('strong', null, file.name), h('span', null, file.type)),
      h('span', null, file.size),
    ),
  );

  return h(
    'main',
    { className: 'os-shell' },
    h(
      'section',
      { className: 'hero-panel' },
      h(
        'div',
        null,
        h('p', { className: 'eyebrow' }, 'Burbz OS / Offline AI cockpit'),
        h('h1', null, 'Simple MVP operating system for your off-grid Llama AI.'),
        h(
          'p',
          { className: 'hero-copy' },
          'A focused desktop-style workspace with local chat, model status, file access, and power-aware controls for running disconnected.',
        ),
      ),
      h(
        'div',
        { className: 'hero-stats' },
        h('article', null, h('span', null, 'Runtime'), h('strong', null, 'Local only')),
        h('article', null, h('span', null, 'Model'), h('strong', null, 'Llama 3 8B Q4')),
        h('article', null, h('span', null, 'Battery mode'), h('strong', null, 'Eco / 6 hrs')),
      ),
    ),
    h(
      'section',
      { className: 'desktop-frame', 'aria-label': 'Off-grid Llama desktop' },
      h('aside', { className: 'dock', 'aria-label': 'Applications' }, h('div', { className: 'dock-brand' }, 'BO'), ...appButtons),
      h(
        'div',
        { className: 'workspace' },
        h(
          'header',
          { className: 'topbar' },
          h('div', null, h('span', { className: 'status-dot' }), activeAppMeta.label),
          h('div', { className: 'topbar-meta' }, h('span', null, 'Mesh offline'), h('span', null, 'GPU 38%'), h('span', null, 'Fri 20:26 UTC')),
        ),
        h(
          'div',
          { className: 'window-grid' },
          h(
            'section',
            { className: 'window chat-window' },
            h(
              'div',
              { className: 'window-header' },
              h('div', { className: 'window-controls' }, h('span'), h('span'), h('span')),
              h('p', null, 'Local assistant'),
            ),
            h(
              'div',
              { className: 'conversation' },
              h(
                'article',
                { className: 'message assistant' },
                h('p', { className: 'message-role' }, 'Llama'),
                h('p', null, 'Offline stack is healthy. Indexes are cached locally, transcription is disabled, and low-power inference mode is available.'),
              ),
              h(
                'article',
                { className: 'message user' },
                h('p', { className: 'message-role' }, 'Operator'),
                h('p', null, draftPrompt),
              ),
              h(
                'article',
                { className: 'message assistant soft' },
                h('p', { className: 'message-role' }, 'Suggested response'),
                h('ul', null,
                  h('li', null, 'Run llama.cpp or Ollama on a compact local node.'),
                  h('li', null, 'Cache docs, prompts, maps, and maintenance procedures.'),
                  h('li', null, 'Use energy profiles to switch between fast and eco inference.'),
                ),
              ),
            ),
            h(
              'label',
              { className: 'prompt-box' },
              h('span', null, 'Prompt composer'),
              h('textarea', {
                value: draftPrompt,
                onChange: (event) => setDraftPrompt(event.target.value),
                rows: 4,
              }),
            ),
            h(
              'div',
              { className: 'prompt-actions' },
              h('button', { type: 'button' }, 'Run local prompt'),
              h('button', { type: 'button', className: 'ghost-button' }, 'Queue task'),
            ),
          ),
          h(
            'section',
            { className: 'sidebar-stack' },
            h(
              'article',
              { className: 'window utility-window' },
              h('div', { className: 'window-header compact' }, h('p', null, 'Quick prompts')),
              h('div', { className: 'chip-list' }, ...quickPromptButtons),
            ),
            h(
              'article',
              { className: 'window utility-window' },
              h('div', { className: 'window-header compact' }, h('p', null, 'System health')),
              h(
                'div',
                { className: 'status-list' },
                h('div', null, h('span', null, 'Context cache'), h('strong', null, '18.2 GB ready')),
                h('div', null, h('span', null, 'Vector store'), h('strong', null, 'Synced yesterday')),
                h('div', null, h('span', null, 'Power source'), h('strong', null, 'Solar + battery')),
                h('div', null, h('span', null, 'Fallback mode'), h('strong', null, 'CPU-only standby')),
              ),
            ),
            h(
              'article',
              { className: 'window utility-window' },
              h('div', { className: 'window-header compact' }, h('p', null, 'Offline vault')),
              h('div', { className: 'file-list' }, ...fileRows),
            ),
          ),
        ),
      ),
    ),
  );
};

export default Home;
