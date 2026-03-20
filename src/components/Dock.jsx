export function Dock({ apps, activeApp, onSelect }) {
  return (
    <aside className="dock" aria-label="Applications">
      <div className="dock-brand" aria-hidden="true">
        BO
      </div>
      {apps.map((app) => (
        <button
          key={app.id}
          type="button"
          className={`dock-app ${activeApp === app.id ? 'is-active' : ''}`}
          onClick={() => onSelect(app.id)}
          aria-pressed={activeApp === app.id}
        >
          <span className="dock-icon" aria-hidden="true">
            {app.icon}
          </span>
          <span>{app.label}</span>
        </button>
      ))}
    </aside>
  );
}
