import { Link , useNavigate} from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/90 p-10 text-center shadow-soft">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
        Page not found
      </p>

      <h2 className="mt-5 text-4xl font-semibold text-white">
        404 — Not found
      </h2>

      <p className="mt-4 max-w-md text-slate-300">
        The page you are looking for doesn’t exist yet, or it may have been
        moved.
      </p>

      <button
      type="button"
          onClick={() => navigate(-1)}
        className="mt-8 inline-flex rounded-3xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
      >
        Return to dashboard
      </button>
    </section>
  );
}