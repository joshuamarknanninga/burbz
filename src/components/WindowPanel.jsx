export function WindowPanel({ title, compact = false, children, actions }) {
  return (
    <article className="window utility-window">
      <div className={`window-header ${compact ? 'compact' : ''}`}>
        <p>{title}</p>
        {actions ? <div className="window-actions">{actions}</div> : null}
      </div>
      {children}
    </article>
  );
}
