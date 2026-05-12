import { useEffect, useState } from "react";
import { api, extractError } from "../api.js";

const DEFAULT_SECTIONS = [
  {
    title: "Protection",
    items: [
      { name: "Floor protection pad + plywood on walking area", qty: "", unit: "pcs", done: false, note: "" },
      { name: "PVC main door + frame", qty: "", unit: "pcs", done: false, note: "" },
      { name: "Protection pad", qty: "3", unit: "pcs", done: false, note: "" },
      { name: "Painter tape", qty: "10", unit: "rolls", done: false, note: "" },
      { name: "Plywood", qty: "12", unit: "sheets", done: false, note: "" },
      { name: "PVC", qty: "2", unit: "pcs", done: false, note: "" },
    ],
  },
  {
    title: "Hacking / Removal",
    items: [
      { name: "Kitchen cabinet only", qty: "", unit: "", done: false, note: "" },
      { name: "Toilet 1 – wall and floor, false ceiling keep if can", qty: "", unit: "", done: false, note: "" },
      { name: "Toilet 2 – wall and floor, false ceiling keep if can", qty: "", unit: "", done: false, note: "" },
    ],
  },
  {
    title: "Living",
    items: [
      { name: "Tall cabinet", qty: "9", unit: "ft", done: false, note: "" },
      { name: "TV console", qty: "10", unit: "ft", done: false, note: "" },
      { name: "TV feature wall", qty: "10", unit: "ft", done: false, note: "" },
      { name: "Blinds", qty: "", unit: "set", done: false, note: "" },
      { name: "L-box", qty: "", unit: "", done: false, note: "" },
    ],
  },
  {
    title: "Kitchen",
    items: [
      { name: "Glass door", qty: "", unit: "pcs", done: false, note: "" },
    ],
  },
  {
    title: "Maid Room",
    items: [
      { name: "Half height cabinet", qty: "5", unit: "ft", done: false, note: "" },
      { name: "Shelving", qty: "", unit: "", done: false, note: "" },
    ],
  },
  {
    title: "Balcony",
    items: [
      { name: "Tiles + screed (6×4)", qty: "24", unit: "sqft", done: false, note: "" },
      { name: "Half height wall", qty: "6", unit: "ft", done: false, note: "" },
      { name: "Window", qty: "", unit: "pcs", done: false, note: "" },
      { name: "Window grill", qty: "", unit: "pcs", done: false, note: "" },
      { name: "Hanger throw", qty: "", unit: "pcs", done: false, note: "" },
    ],
  },
  {
    title: "Walkway",
    items: [
      { name: "Full height cabinet", qty: "7", unit: "ft", done: false, note: "" },
    ],
  },
  {
    title: "Room 1",
    items: [
      { name: "Window & frame", qty: "7", unit: "ft", done: false, note: "" },
      { name: "Wall-hang cabinet", qty: "7", unit: "ft", done: false, note: "" },
      { name: "Wardrobe", qty: "7", unit: "ft", done: false, note: "" },
      { name: "Blinds", qty: "", unit: "set", done: false, note: "" },
      { name: "Partition", qty: "4", unit: "ft", done: false, note: "" },
      { name: "Glass", qty: "5", unit: "ft", done: false, note: "" },
      { name: "L-box", qty: "", unit: "", done: false, note: "" },
      { name: "Door and frame", qty: "", unit: "set", done: false, note: "" },
    ],
  },
  {
    title: "Room 2",
    items: [
      { name: "L-box", qty: "", unit: "", done: false, note: "" },
      { name: "Vanity", qty: "1", unit: "ft", done: false, note: "" },
      { name: "Wardrobe", qty: "6", unit: "ft", done: false, note: "" },
      { name: "Door and frame", qty: "", unit: "set", done: false, note: "" },
    ],
  },
  {
    title: "Master Bedroom",
    items: [
      { name: "Door and frame", qty: "", unit: "set", done: false, note: "" },
      { name: "L-box", qty: "", unit: "", done: false, note: "" },
      { name: "Wardrobe", qty: "8", unit: "ft", done: false, note: "" },
      { name: "Balcony decking (10×6)", qty: "60", unit: "sqft", done: false, note: "" },
      { name: "Toilet glass door", qty: "", unit: "pcs", done: false, note: "" },
    ],
  },
  {
    title: "Misc",
    items: [
      { name: "Toilet door and frame (1 set)", qty: "1", unit: "set", done: false, note: "" },
    ],
  },
];

const UNIT_OPTIONS = ["", "ft", "sqft", "pcs", "set", "sheets", "rolls", "m", "sqm"];

function blankMiscItem() {
  return { name: "", qty: "", unit: "", done: false };
}

export default function RenovationSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const [projectId, setProjectId] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [lockCode, setLockCode] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState(JSON.parse(JSON.stringify(DEFAULT_SECTIONS)));
  const [miscItems, setMiscItems] = useState([blankMiscItem()]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, []);

  async function fetchSchedules() {
    setLoading(true);
    try {
      const { data } = await api.get("/renovations");
      setSchedules(data.schedules);
    } catch (err) {
      setError(extractError(err, "Failed to load schedules"));
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setProjectId("");
    setCompany("");
    setAddress("");
    setLockCode("");
    setDate("");
    setDescription("");
    setSections(JSON.parse(JSON.stringify(DEFAULT_SECTIONS)));
    setMiscItems([blankMiscItem()]);
    setActiveId(null);
    setError("");
    setSuccess("");
  }

  async function loadSchedule(id) {
    try {
      const { data } = await api.get(`/renovations/${id}`);
      const s = data.schedule;
      setActiveId(s._id);
      setProjectId(s.projectId);
      setCompany(s.company);
      setAddress(s.address);
      setLockCode(s.lockCode);
      setDate(s.date);
      setDescription(s.description);
      setSections(s.sections.length > 0 ? s.sections : JSON.parse(JSON.stringify(DEFAULT_SECTIONS)));
      setMiscItems(s.miscItems.length > 0 ? s.miscItems : [blankMiscItem()]);
      setError("");
      setSuccess("");
    } catch (err) {
      setError(extractError(err, "Failed to load schedule"));
    }
  }

  function updateItem(sIdx, iIdx, field, value) {
    setSections((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[sIdx].items[iIdx][field] = value;
      return copy;
    });
  }

  function addItemToSection(sIdx) {
    setSections((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[sIdx].items.push({ name: "", qty: "", unit: "", done: false, note: "" });
      return copy;
    });
  }

  function removeItemFromSection(sIdx, iIdx) {
    setSections((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[sIdx].items.splice(iIdx, 1);
      return copy;
    });
  }

  function addSection() {
    setSections((prev) => [...prev, { title: "New Section", items: [{ name: "", qty: "", unit: "", done: false, note: "" }] }]);
  }

  function removeSectionAt(sIdx) {
    setSections((prev) => prev.filter((_, i) => i !== sIdx));
  }

  function updateSectionTitle(sIdx, title) {
    setSections((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[sIdx].title = title;
      return copy;
    });
  }

  function updateMisc(idx, field, value) {
    setMiscItems((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  }

  function addMisc() {
    setMiscItems((prev) => [...prev, blankMiscItem()]);
  }

  function removeMisc(idx) {
    setMiscItems((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    const payload = { projectId, company, address, lockCode, date, description, sections, miscItems };
    try {
      if (activeId) {
        await api.put(`/renovations/${activeId}`, payload);
        setSuccess("Schedule updated successfully.");
      } else {
        const { data } = await api.post("/renovations", payload);
        setActiveId(data.schedule._id);
        setSuccess("Schedule created successfully.");
      }
      fetchSchedules();
    } catch (err) {
      setError(extractError(err, "Save failed"));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this schedule?")) return;
    try {
      await api.delete(`/renovations/${id}`);
      if (activeId === id) resetForm();
      fetchSchedules();
    } catch (err) {
      setError(extractError(err, "Delete failed"));
    }
  }

  const doneCount = sections.reduce((sum, s) => sum + s.items.filter((i) => i.done).length, 0);
  const totalCount = sections.reduce((sum, s) => sum + s.items.length, 0);
  const progressPct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Renovation Daily Schedule
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your renovation work items, track progress, and update daily.
          </p>
        </div>
        <button type="button" className="btn-primary" onClick={resetForm}>
          + New Schedule
        </button>
      </div>

      {/* Saved schedules list */}
      {loading ? (
        <p className="text-sm text-slate-500">Loading schedules…</p>
      ) : schedules.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {schedules.map((s) => (
            <div
              key={s._id}
              className={[
                "card cursor-pointer transition hover:shadow-md",
                activeId === s._id ? "ring-2 ring-brand-500" : "",
              ].join(" ")}
              onClick={() => loadSchedule(s._id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{s.projectId}</p>
                  <p className="text-xs text-slate-500">{s.company}</p>
                  <p className="text-xs text-slate-400">{s.date}</p>
                </div>
                <button
                  type="button"
                  className="text-xs text-rose-500 hover:text-rose-700"
                  onClick={(e) => { e.stopPropagation(); handleDelete(s._id); }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* Main form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project info */}
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900">Project Info</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="label" htmlFor="projectId">ID / Name</label>
              <input id="projectId" className="input" value={projectId} onChange={(e) => setProjectId(e.target.value)} required placeholder="e.g. Ming Gang" />
            </div>
            <div>
              <label className="label" htmlFor="company">Company</label>
              <input id="company" className="input" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. FAN CHEN STUDIOS PTE LTD" />
            </div>
            <div>
              <label className="label" htmlFor="address">Address</label>
              <input id="address" className="input" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. 586 Yio Chu Kang Road 06-04" />
            </div>
            <div>
              <label className="label" htmlFor="lockCode">Lock Code</label>
              <input id="lockCode" className="input" value={lockCode} onChange={(e) => setLockCode(e.target.value)} placeholder="e.g. 7288" />
            </div>
            <div>
              <label className="label" htmlFor="date">Date</label>
              <input id="date" type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="description">Description</label>
              <input id="description" className="input" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Protection 3BR Condo" />
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Progress</h2>
            <span className="text-sm font-medium text-brand-600">{doneCount}/{totalCount} items · {progressPct}%</span>
          </div>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        {/* Sections */}
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="card">
            <div className="flex items-center justify-between gap-2">
              <input
                className="w-full border-0 bg-transparent text-lg font-semibold text-slate-900 focus:outline-none focus:ring-0"
                value={section.title}
                onChange={(e) => updateSectionTitle(sIdx, e.target.value)}
              />
              <button type="button" className="text-xs text-rose-500 hover:text-rose-700 whitespace-nowrap" onClick={() => removeSectionAt(sIdx)}>
                Remove section
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {/* Header row */}
              <div className="hidden sm:grid sm:grid-cols-[2rem_1fr_5rem_5rem_1fr_2rem] gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
                <span></span>
                <span>Item</span>
                <span>Qty</span>
                <span>Unit</span>
                <span>Note</span>
                <span></span>
              </div>

              {section.items.map((item, iIdx) => (
                <div key={iIdx} className="grid grid-cols-1 sm:grid-cols-[2rem_1fr_5rem_5rem_1fr_2rem] gap-2 items-center rounded-lg border border-slate-100 bg-slate-50 p-2 sm:border-0 sm:bg-transparent sm:p-0">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={(e) => updateItem(sIdx, iIdx, "done", e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    />
                  </div>
                  <input
                    className={["input text-sm", item.done ? "line-through text-slate-400" : ""].join(" ")}
                    value={item.name}
                    onChange={(e) => updateItem(sIdx, iIdx, "name", e.target.value)}
                    placeholder="Item name"
                  />
                  <input
                    className="input text-sm text-center"
                    value={item.qty}
                    onChange={(e) => updateItem(sIdx, iIdx, "qty", e.target.value)}
                    placeholder="Qty"
                  />
                  <select
                    className="input text-sm"
                    value={item.unit}
                    onChange={(e) => updateItem(sIdx, iIdx, "unit", e.target.value)}
                  >
                    {UNIT_OPTIONS.map((u) => (
                      <option key={u} value={u}>{u || "—"}</option>
                    ))}
                  </select>
                  <input
                    className="input text-sm"
                    value={item.note}
                    onChange={(e) => updateItem(sIdx, iIdx, "note", e.target.value)}
                    placeholder="Note"
                  />
                  <button type="button" className="text-slate-400 hover:text-rose-500 text-lg leading-none" onClick={() => removeItemFromSection(sIdx, iIdx)}>
                    ×
                  </button>
                </div>
              ))}

              <button type="button" className="text-sm text-brand-600 hover:text-brand-800" onClick={() => addItemToSection(sIdx)}>
                + Add item
              </button>
            </div>
          </div>
        ))}

        <button type="button" className="btn-secondary w-full" onClick={addSection}>
          + Add New Section
        </button>

        {/* Extra misc materials */}
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900">Extra Materials / Supplies</h2>
          <div className="mt-4 space-y-3">
            <div className="hidden sm:grid sm:grid-cols-[2rem_1fr_5rem_5rem_2rem] gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
              <span></span>
              <span>Name</span>
              <span>Qty</span>
              <span>Unit</span>
              <span></span>
            </div>
            {miscItems.map((m, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-[2rem_1fr_5rem_5rem_2rem] gap-2 items-center">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={m.done}
                    onChange={(e) => updateMisc(idx, "done", e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                </div>
                <input className="input text-sm" value={m.name} onChange={(e) => updateMisc(idx, "name", e.target.value)} placeholder="Material name" />
                <input className="input text-sm text-center" value={m.qty} onChange={(e) => updateMisc(idx, "qty", e.target.value)} placeholder="Qty" />
                <select className="input text-sm" value={m.unit} onChange={(e) => updateMisc(idx, "unit", e.target.value)}>
                  {UNIT_OPTIONS.map((u) => (
                    <option key={u} value={u}>{u || "—"}</option>
                  ))}
                </select>
                <button type="button" className="text-slate-400 hover:text-rose-500 text-lg leading-none" onClick={() => removeMisc(idx)}>
                  ×
                </button>
              </div>
            ))}
            <button type="button" className="text-sm text-brand-600 hover:text-brand-800" onClick={addMisc}>
              + Add material
            </button>
          </div>
        </div>

        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        {success ? <p className="text-sm text-emerald-600">{success}</p> : null}

        <div className="flex gap-3">
          <button type="submit" className="btn-primary flex-1" disabled={saving}>
            {saving ? "Saving…" : activeId ? "Update Schedule" : "Save Schedule"}
          </button>
          <button type="button" className="btn-secondary" onClick={resetForm}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
