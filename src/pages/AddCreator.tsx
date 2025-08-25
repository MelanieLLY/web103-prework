import { FormEvent, useState } from 'react';
import { addCreator } from '../store/creators';
import { useNavigate } from 'react-router-dom';

export default function AddCreator() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saving) return;
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') || '').trim();
    const url = String(fd.get('url') || '').trim();
    const description = String(fd.get('description') || '').trim();
    const imageURL = String(fd.get('imageURL') || '').trim() || undefined;

    if (!name || !url) return alert('Name and URL are required.');

    try {
      setSaving(true);
      const created = await addCreator({ name, url, description, imageURL });
      navigate(`/creators/${created.id}`);
    } catch (e: any) {
      alert(e.message ?? String(e));
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="container">
      <h1>Add Creator</h1>
      <form
        className="grid"
        onSubmit={onSubmit}
        style={{ gap: 12, maxWidth: 560 }}
      >
        <input name="name" placeholder="Name*" className="input" />
        <input name="url" placeholder="URL*" className="input" />
        <input name="imageURL" placeholder="Image URL" className="input" />
        <textarea
          name="description"
          placeholder="Description"
          className="textarea"
        />
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? 'Creating…' : 'Create'}
        </button>
      </form>
    </main>
  );
}
