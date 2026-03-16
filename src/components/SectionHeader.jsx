export const SectionHeader = ({ title, description }) => (
  <div className="section-header">
    <h2>{title}</h2>
    {description ? <p>{description}</p> : null}
  </div>
);
