export const apps = [
  {
    id: 'chat',
    label: 'Llama Chat',
    icon: '◉',
    headline: 'Plan, ask, and queue local tasks without leaving the cockpit.',
    summary:
      'Use cached prompts and lightweight guidance to keep your AI workflow usable when the network is gone and battery matters.',
    primaryAction: 'Run local prompt',
    secondaryAction: 'Queue task',
  },
  {
    id: 'files',
    label: 'Vault',
    icon: '▣',
    headline: 'Inspect your offline files and keep critical knowledge close.',
    summary:
      'Quickly surface field notes, playbooks, and model assets that were synced before going off-grid.',
    primaryAction: 'Open selected file',
    secondaryAction: 'Refresh cache map',
  },
  {
    id: 'models',
    label: 'Models',
    icon: '△',
    headline: 'Switch between fast, efficient, and fallback model profiles.',
    summary:
      'See which model is active, how much memory is available, and when to shift into a lower power inference mode.',
    primaryAction: 'Apply model profile',
    secondaryAction: 'Benchmark locally',
  },
  {
    id: 'power',
    label: 'Power',
    icon: '⬢',
    headline: 'Balance inference quality against battery and solar conditions.',
    summary:
      'Track the energy budget so long-running tasks stay predictable in the field.',
    primaryAction: 'Enable eco schedule',
    secondaryAction: 'View energy guide',
  },
];

export const quickPrompts = [
  'Summarize my field notes from today.',
  'Draft a low-power comms plan for the cabin.',
  'Convert this maintenance checklist into markdown.',
  'What should I cache before going offline for a week?',
];

export const files = [
  {
    name: 'mission-brief.md',
    type: 'Markdown',
    size: '12 KB',
    detail: 'Field-ready operating brief for the next 72 hours.',
  },
  {
    name: 'radio-frequencies.txt',
    type: 'Text',
    size: '3 KB',
    detail: 'Primary and fallback comms channels.',
  },
  {
    name: 'llama-3-8b-q4.gguf',
    type: 'Model',
    size: '4.1 GB',
    detail: 'Balanced local inference model for battery mode.',
  },
  {
    name: 'solar-log.csv',
    type: 'Data',
    size: '86 KB',
    detail: 'Seven-day rolling solar generation log.',
  },
];

export const systemStats = [
  { label: 'Runtime', value: 'Local only' },
  { label: 'Model', value: 'Llama 3 8B Q4' },
  { label: 'Battery mode', value: 'Eco / 6 hrs' },
];

export const healthChecks = [
  { label: 'Context cache', value: '18.2 GB ready' },
  { label: 'Vector store', value: 'Synced yesterday' },
  { label: 'Power source', value: 'Solar + battery' },
  { label: 'Fallback mode', value: 'CPU-only standby' },
];

export const modelProfiles = [
  {
    name: 'Eco 4-bit',
    latency: '1.1 tok/s',
    memory: '4.8 GB',
    note: 'Best fit for sustained battery sessions.',
  },
  {
    name: 'Balanced 8B',
    latency: '2.6 tok/s',
    memory: '7.2 GB',
    note: 'General-purpose local assistant profile.',
  },
  {
    name: 'CPU Standby',
    latency: '0.4 tok/s',
    memory: '2.1 GB',
    note: 'Emergency fallback when the GPU is offline.',
  },
];

export const powerPlan = [
  { label: 'Battery reserve', value: '74%' },
  { label: 'Solar input', value: '182 W' },
  { label: 'Projected uptime', value: '6h 12m' },
  { label: 'Queue budget', value: '3 medium tasks' },
];

export const suggestedResponse = [
  'Run llama.cpp or Ollama on a compact local node.',
  'Cache docs, prompts, maps, and maintenance procedures.',
  'Use energy profiles to switch between fast and eco inference.',
];
