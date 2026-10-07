import { ExternalLink, MapPin, Monitor, Tag } from "lucide-react";

export default function OpportunityCard({ opportunity, onDetails }) {
  const isCourse = opportunity.type === "Curso";

  return (
    <article className="opportunity-card">
      <div className="card-top">
        <span className={`type-badge ${isCourse ? "course" : "job"}`}>{opportunity.type}</span>
        <span className="category-badge">{opportunity.category}</span>
      </div>

      <h3>{opportunity.title}</h3>
      <p className="organization">{opportunity.organization}</p>
      <p className="description">{opportunity.description}</p>

      <div className="metadata">
        <span><MapPin size={16} /> {opportunity.location}</span>
        <span><Monitor size={16} /> {opportunity.modality}</span>
        <span><Tag size={16} /> {opportunity.category}</span>
      </div>

      <button className="details-button" onClick={() => onDetails(opportunity)}>
        Ver detalhes <ExternalLink size={16} />
      </button>
    </article>
  );
}
