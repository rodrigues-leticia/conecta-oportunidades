import { ExternalLink, MapPin, Monitor, Tag, X } from "lucide-react";

export default function OpportunityModal({ opportunity, onClose }) {
  if (!opportunity) return null;

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="close-button" onClick={onClose} aria-label="Fechar">
          <X size={21} />
        </button>

        <span className={`type-badge ${opportunity.type === "Curso" ? "course" : "job"}`}>
          {opportunity.type}
        </span>

        <h2 id="modal-title">{opportunity.title}</h2>
        <p className="organization">{opportunity.organization}</p>

        <div className="modal-meta">
          <span><MapPin size={17} /> {opportunity.location}</span>
          <span><Monitor size={17} /> {opportunity.modality}</span>
          <span><Tag size={17} /> {opportunity.category}</span>
        </div>

        <p className="modal-description">{opportunity.details}</p>

        <a className="primary-button" href={opportunity.link} target="_blank" rel="noreferrer">
          Acessar oportunidade <ExternalLink size={17} />
        </a>
      </section>
    </div>
  );
}
