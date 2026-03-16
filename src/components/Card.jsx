export const Card = ({ title, subtitle, children, action }) => (
  <section className="card">
    <div className="card-head">
      <div>
        <h3>{title}</h3>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {action}
    </div>
    {children}
  </section>
);
