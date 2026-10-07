import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { createOpportunity, deleteOpportunity, getOpportunities, updateOpportunity } from "../api";

const emptyForm = {
  type: "Vaga",
  title: "",
  organization: "",
  location: "",
  modality: "Presencial",
  category: "Tecnologia",
  description: "",
  details: "",
  link: ""
};

export default function AdminPanel() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);
      setItems(await getOpportunities());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function change(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function openNew() {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
    setError("");
    setShowForm(true);
  }

  function openEdit(item) {
    setEditingId(item.id);
    setForm({
      type: item.type,
      title: item.title,
      organization: item.organization,
      location: item.location,
      modality: item.modality,
      category: item.category,
      description: item.description,
      details: item.details,
      link: item.link
    });
    setMessage("");
    setError("");
    setShowForm(true);
  }

  async function submit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      if (editingId) {
        await updateOpportunity(editingId, form);
        setMessage("Oportunidade atualizada com sucesso.");
      } else {
        await createOpportunity(form);
        setMessage("Oportunidade cadastrada com sucesso.");
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    if (!window.confirm("Deseja realmente excluir esta oportunidade?")) return;

    try {
      await deleteOpportunity(id);
      setMessage("Oportunidade excluída com sucesso.");
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="container admin-section">
      <div className="admin-heading">
        <div>
          <span className="eyebrow">Área administrativa</span>
          <h1>Gerenciar oportunidades</h1>
          <p>Cadastre, edite e remova vagas e cursos.</p>
        </div>
        <button className="primary-button" onClick={openNew}><Plus size={18} /> Nova oportunidade</button>
      </div>

      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}

      {showForm && (
        <form className="admin-form" onSubmit={submit}>
          <div className="form-title">
            <h2>{editingId ? "Editar oportunidade" : "Cadastrar oportunidade"}</h2>
            <button type="button" className="close-button" onClick={() => setShowForm(false)} aria-label="Fechar formulário">
              <X size={20} />
            </button>
          </div>

          <div className="form-grid">
            <label>Tipo
              <select name="type" value={form.type} onChange={change}>
                <option>Vaga</option>
                <option>Curso</option>
              </select>
            </label>

            <label>Título
              <input name="title" value={form.title} onChange={change} required />
            </label>

            <label>Empresa / instituição
              <input name="organization" value={form.organization} onChange={change} required />
            </label>

            <label>Localização
              <input name="location" value={form.location} onChange={change} required />
            </label>

            <label>Modalidade
              <select name="modality" value={form.modality} onChange={change}>
                <option>Presencial</option>
                <option>Híbrido</option>
                <option>Online</option>
              </select>
            </label>

            <label>Categoria
              <input name="category" value={form.category} onChange={change} required />
            </label>

            <label className="full">Descrição curta
              <textarea name="description" value={form.description} onChange={change} required rows="3" />
            </label>

            <label className="full">Detalhes
              <textarea name="details" value={form.details} onChange={change} required rows="5" />
            </label>

            <label className="full">Link da oportunidade
              <input type="url" name="link" value={form.link} onChange={change} placeholder="https://..." required />
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="secondary-button" onClick={() => setShowForm(false)}>Cancelar</button>
            <button type="submit" className="primary-button">{editingId ? "Salvar alterações" : "Cadastrar"}</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap">
        {loading ? <p>Carregando...</p> : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Título</th>
                <th>Organização</th>
                <th>Local</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td><span className={`type-badge ${item.type === "Curso" ? "course" : "job"}`}>{item.type}</span></td>
                  <td>{item.title}</td>
                  <td>{item.organization}</td>
                  <td>{item.location}</td>
                  <td className="actions">
                    <button onClick={() => openEdit(item)} aria-label={`Editar ${item.title}`}><Pencil size={17} /></button>
                    <button onClick={() => remove(item.id)} aria-label={`Excluir ${item.title}`}><Trash2 size={17} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
