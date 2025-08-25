import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import type { Creator } from '../types';
import { getCreator, deleteCreator } from '../store/creators';

export default function ViewCreator() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [creator, setCreator] = useState<Creator | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        setCreator(await getCreator(id));
      } catch (e: any) {
        setError(e.message ?? String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function onDelete() {
    if (!creator) return;
    if (!confirm('Delete this creator?')) return;
    try {
      await deleteCreator(creator.id);
      navigate('/creator');
    } catch (e: any) {
      alert(e.message ?? String(e));
    }
  }

  if (loading)
    return (
      <main className="container">
        <p className="muted">Loading…</p>
      </main>
    );
  if (error)
    return (
      <main className="container">
        <p className="muted">{error}</p>
      </main>
    );
  if (!creator)
    return (
      <main className="container">
        <p>Creator not found.</p>
      </main>
    );

  return (
    <main className="container">
      <button className="btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="card" style={{ marginTop: 16 }}>
        {creator.imageURL && <img src={creator.imageURL} alt={creator.name} />}
        <div>
          <h1 style={{ marginTop: 0 }}>{creator.name}</h1>
          <p className="muted">{creator.description}</p>
          <p>
            <a href={creator.url} target="_blank" rel="noreferrer">
              {creator.url}
            </a>
          </p>
          <div className="actions">
            <Link
              to={`/creators/${creator.id}/edit`}
              className="btn btn-primary"
            >
              Edit
            </Link>
            <button className="btn btn-danger" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
