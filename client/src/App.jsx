import { useEffect, useMemo, useState } from "react";
import { ArrowDown, BriefcaseBusiness, GraduationCap, Search, Users } from "lucide-react";
import Header from "./components/Header";
import OpportunityCard from "./components/OpportunityCard";
import OpportunityModal from "./components/OpportunityModal";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import { getOpportunities } from "./api";

export default function App() {
  const [page, setPage] = useState("home");
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("Todos");
  const [category, setCategory] = useState("Todas");
  const [location, setLocation] = useState("Todas");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadItems() {
    try {
      setLoading(true);
      setError("");
      setItems(await getOpportunities());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (page === "home") loadItems();
  }, [page]);

  const categories = useMemo(() => [...new Set(items.map((item) => item.category))].sort(), [items]);
  const locations = useMemo(() => [...new Set(items.map((item) => item.location))].sort(), [items]);

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();

    return items.filter((item) => {
      const text = `${item.title} ${item.organization} ${item.description} ${item.category}`.toLowerCase();
      return (!term || text.includes(term))
        && (type === "Todos" || item.type === type)
        && (category === "Todas" || item.category === category)
        && (location === "Todas" || item.location === location);
    });
  }, [items, search, type, category, location]);

  function resetFilters() {
    setSearch("");
    setType("Todos");
    setCategory("Todas");
    setLocation("Todas");
  }

  return (
    <>
      <Header page={page} setPage={setPage} />

      {page === "admin" ? <AdminPanel /> : (
        <main>
          <section className="hero">
            <div className="container hero-grid">
              <div className="hero-copy">
                <span className="eyebrow"><BriefcaseBusiness size={16} /> Oportunidades para você</span>
                <h1>Encontre sua próxima <span>oportunidade.</span></h1>
                <p>Vagas de emprego e cursos de capacitação reunidos em uma plataforma simples e organizada.</p>
                <a className="hero-button" href="#oportunidades">Explorar oportunidades <ArrowDown size={18} /></a>
              </div>

              <div className="hero-card">
                <div className="hero-card-icon"><GraduationCap size={27} /></div>
                <strong>Uma busca mais simples</strong>
                <p>Pesquise e filtre oportunidades de acordo com seus interesses.</p>
                <div className="mini-stats">
                  <div><strong>{items.length}</strong><span>oportunidades</span></div>
                  <div><strong>{categories.length}</strong><span>categorias</span></div>
                  <div><strong>API</strong><span>PostgreSQL</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="container content-section" id="oportunidades">
            <div className="filters-panel">
              <div className="filter-heading">
                <div>
                  <span className="eyebrow"><Search size={15} /> Pesquisa</span>
                  <h2>Encontre uma oportunidade</h2>
                </div>
                <p>Use os filtros para refinar sua busca.</p>
              </div>

              <div className="filters-grid">
                <label className="search-field"><span>Pesquisar</span>
                  <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ex.: programação..." />
                </label>

                <label><span>Tipo</span>
                  <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option>Todos</option><option>Vaga</option><option>Curso</option>
                  </select>
                </label>

                <label><span>Categoria</span>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>Todas</option>{categories.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>

                <label><span>Localização</span>
                  <select value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option>Todas</option>{locations.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
              </div>
            </div>

            <div className="results-header">
              <div><span className="eyebrow"><Users size={15} /> Resultados</span><h2>Oportunidades disponíveis</h2></div>
              <span className="result-count">{filtered.length} resultado(s)</span>
            </div>

            {error && <div className="alert error">{error}. Verifique se a API e o PostgreSQL estão executando.</div>}
            {loading ? <div className="empty-state"><h3>Carregando oportunidades...</h3></div> :
              filtered.length ? (
                <div className="cards-grid">
                  {filtered.map((item) => <OpportunityCard key={item.id} opportunity={item} onDetails={setSelected} />)}
                </div>
              ) : (
                <div className="empty-state">
                  <h3>Nenhuma oportunidade encontrada</h3>
                  <p>Tente alterar os filtros.</p>
                  <button onClick={resetFilters}>Limpar filtros</button>
                </div>
              )
            }
          </section>
        </main>
      )}

      <Footer />
      <OpportunityModal opportunity={selected} onClose={() => setSelected(null)} />
    </>
  );
}
