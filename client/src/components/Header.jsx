import { BriefcaseBusiness, LayoutDashboard } from "lucide-react";

export default function Header({ page, setPage }) {
  return (
    <header className="site-header">
      <div className="container header-content">
        <button className="brand" onClick={() => setPage("home")} aria-label="Ir para início">
          <span className="brand-icon"><BriefcaseBusiness size={22} /></span>
          <span>
            <strong>Conecta</strong>
            <small>Oportunidades</small>
          </span>
        </button>

        <nav aria-label="Navegação principal">
          <button className={page === "home" ? "active" : ""} onClick={() => setPage("home")}>Início</button>
          <button className={page === "admin" ? "active" : ""} onClick={() => setPage("admin")}>
            <LayoutDashboard size={16} /> Administração
          </button>
        </nav>
      </div>
    </header>
  );
}
