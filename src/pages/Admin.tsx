import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  RotateCcw,
  Youtube,
  Save,
  X,
  Home,
  AlertTriangle,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useVideoStore, extractYouTubeId, type StoredVideo } from "@/hooks/useVideoStore";

const EmptyForm = { url: "", title: "", description: "" };

const Admin = () => {
  const { videos, addVideo, updateVideo, removeVideo, move, reset } = useVideoStore();
  const [form, setForm] = useState(EmptyForm);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });

  const previewId = useMemo(() => extractYouTubeId(form.url), [form.url]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      addVideo(form);
      setForm(EmptyForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const startEdit = (v: StoredVideo) => {
    setEditingId(v.id);
    setEditDraft({ title: v.title, description: v.description });
  };

  const saveEdit = (id: string) => {
    updateVideo(id, editDraft);
    setEditingId(null);
  };

  return (
    <>
      <Helmet>
        <title>Admin — Manage Videos | Nextup Studio</title>
        <meta name="description" content="Private admin editor to manage the videos shown on Nextup Studio." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-6 py-10 max-w-5xl space-y-10">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-blur-in">
          <div className="flex items-center gap-4">
            <div className="neu-icon-well w-14 h-14">
              <Youtube className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight text-foreground">
                Video <span className="text-gradient-primary">Editor</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Add, reorder, edit or remove videos shown on the site.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/" className="neu-btn px-4 py-2.5 inline-flex items-center gap-2 text-sm font-medium">
              <Home className="h-4 w-4" /> Home
            </Link>
            <button
              onClick={reset}
              className="neu-btn px-4 py-2.5 inline-flex items-center gap-2 text-sm font-medium"
              title="Reset to defaults"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>
        </header>

        {/* Add form */}
        <section className="neu-card p-6 md:p-8 space-y-5 animate-slide-up">
          <div className="flex items-center gap-3">
            <div className="neu-icon-well w-10 h-10">
              <Plus className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-display font-bold text-xl text-foreground">Add a video</h2>
          </div>

          <form onSubmit={handleAdd} className="grid gap-4 md:grid-cols-2">
            <label className="md:col-span-2 space-y-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                YouTube URL or ID
              </span>
              <input
                type="text"
                required
                placeholder="https://youtu.be/… or https://youtube.com/watch?v=…"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                className="neu-inset w-full px-4 py-3 rounded-2xl bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              {form.url && (
                <p className={`text-xs ${previewId ? "text-primary" : "text-destructive"}`}>
                  {previewId ? `Detected video ID: ${previewId}` : "Could not detect a YouTube ID"}
                </p>
              )}
            </label>

            <label className="space-y-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Title
              </span>
              <input
                type="text"
                required
                placeholder="Video title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="neu-inset w-full px-4 py-3 rounded-2xl bg-transparent text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Description
              </span>
              <input
                type="text"
                placeholder="Short description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="neu-inset w-full px-4 py-3 rounded-2xl bg-transparent text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </label>

            {error && (
              <div
                role="alert"
                className="md:col-span-2 neu-inset rounded-2xl px-4 py-3 flex items-center gap-3"
              >
                <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                <span className="text-sm text-destructive">{error}</span>
              </div>
            )}

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="neu-btn-primary px-6 py-3 inline-flex items-center gap-2 font-semibold text-sm"
              >
                <Plus className="h-4 w-4" /> Add video
              </button>
            </div>
          </form>
        </section>

        {/* Video list */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display font-bold text-xl text-foreground">
              Current videos
            </h2>
            <span className="text-xs text-muted-foreground">{videos.length} total</span>
          </div>

          {videos.length === 0 ? (
            <div className="neu-card p-10 text-center text-muted-foreground">
              No videos yet. Add your first one above.
            </div>
          ) : (
            <ul className="space-y-4">
              {videos.map((v, i) => {
                const isEditing = editingId === v.id;
                return (
                  <li
                    key={v.id}
                    className="neu-card p-4 md:p-5 flex flex-col md:flex-row gap-4 animate-fade-in"
                  >
                    <div className="neu-inset-deep rounded-2xl p-1.5 shrink-0 w-full md:w-56">
                      <img
                        src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                        alt={v.title}
                        loading="lazy"
                        className="w-full aspect-video object-cover rounded-xl"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            value={editDraft.title}
                            onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })}
                            className="neu-inset w-full px-3 py-2 rounded-xl bg-transparent text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                          />
                          <textarea
                            value={editDraft.description}
                            onChange={(e) =>
                              setEditDraft({ ...editDraft, description: e.target.value })
                            }
                            rows={2}
                            className="neu-inset w-full px-3 py-2 rounded-xl bg-transparent text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                          />
                        </div>
                      ) : (
                        <>
                          <h3 className="font-display font-bold text-base text-foreground line-clamp-1">
                            {v.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {v.description || <span className="italic">No description</span>}
                          </p>
                        </>
                      )}
                      <p className="text-xs text-muted-foreground font-mono">ID: {v.id}</p>
                    </div>

                    <div className="flex md:flex-col items-center gap-2 justify-end shrink-0">
                      <button
                        onClick={() => move(v.id, -1)}
                        disabled={i === 0}
                        aria-label="Move up"
                        className="neu-btn h-9 w-9 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => move(v.id, 1)}
                        disabled={i === videos.length - 1}
                        aria-label="Move down"
                        className="neu-btn h-9 w-9 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                      <a
                        href={`https://youtu.be/${v.id}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Open on YouTube"
                        className="neu-btn h-9 w-9 flex items-center justify-center"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => saveEdit(v.id)}
                            className="neu-btn-primary px-3 h-9 inline-flex items-center gap-1.5 text-xs font-semibold"
                          >
                            <Save className="h-3.5 w-3.5" /> Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            aria-label="Cancel"
                            className="neu-btn h-9 w-9 flex items-center justify-center"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => startEdit(v)}
                          className="neu-btn px-3 h-9 text-xs font-medium"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (confirm(`Remove "${v.title}"?`)) removeVideo(v.id);
                        }}
                        aria-label="Delete"
                        className="neu-btn h-9 w-9 flex items-center justify-center text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <p className="text-xs text-muted-foreground text-center">
          Videos are saved to this browser's local storage. Clearing site data will reset them.
        </p>
      </div>
    </>
  );
};

export default Admin;
