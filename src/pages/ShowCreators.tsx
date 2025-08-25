import { useEffect, useState } from 'react';
import CreatorCard from '../components/CreatorCard';
import type { Creator } from '../types';
import { listCreators } from '../store/creators';
import { Link } from 'react-router-dom';

export default function ShowCreators() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setCreators(await listCreators());
      } catch (e: any) {
        setError(e.message ?? String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="container">
      <div className="header">
        <h1>Creatorverse</h1>

        <Link to="/creators/new" className="btn btn-primary">
          Add Creator
        </Link>
      </div>
      <h2>My Favorite Content Creators</h2>
      {loading && <p className="muted">Loading…</p>}
      {error && <p className="muted">{error}</p>}

      {!loading && !creators.length && (
        <p className="muted">No creators yet. Click “Add Creator”.</p>
      )}

      <section className="grid">
        {creators.map((c) => (
          <CreatorCard key={c.id} creator={c} />
        ))}
      </section>
    </main>
  );
}
