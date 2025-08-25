import { FormEvent, useEffect, useState } from 'react';
import { deleteCreator, getCreator, updateCreator } from '../store/creators';
import { useNavigate, useParams } from 'react-router-dom';
import type { Creator } from '../types';

export default function EditCreator() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [creator, setCreator] = useState<Creator | undefined>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        setCreator(await getCreator(id));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!creator || saving) return;
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') || creator.name).trim();
    const url = String(fd.get('url') || creator.url).trim();
    const description = String(
      fd.get('description') || creator.description
    ).trim();
    const imageURL =
      String(fd.get('imageURL') || creator.imageURL || '').trim() || undefined;

    try {
      setSaving(true);
      await updateCreator(creator.id, { name, url, description, imageURL });
      navigate(`/creators/${creator.id}`);
    } catch (e: any) {
      alert(e.message ?? String(e));
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return (
      <main className="container">
        <p className="muted">Loading…</p>
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
      <h1>Edit Creator</h1>
      <form
        className="grid"
        onSubmit={onSubmit}
        style={{ gap: 12, maxWidth: 560 }}
      >
        <input name="name" defaultValue={creator.name} className="input" />
        <input name="url" defaultValue={creator.url} className="input" />
        <input
          name="imageURL"
          defaultValue={creator.imageURL}
          className="input"
        />
        <textarea
          name="description"
          defaultValue={creator.description}
          className="textarea"
        />
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button
          className="btn btn-danger"
          onClick={async () => {
            if (!confirm('Are you sure you want to delete this creator？'))
              return;
            try {
              await deleteCreator(creator.id);
              navigate('/creators');
            } catch (e: any) {
              alert(e.message ?? String(e));
            }
          }}
        >
          Delete
        </button>
      </form>
    </main>
  );
}
