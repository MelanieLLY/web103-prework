import { Link } from 'react-router-dom';
import type { Creator } from '../types';

interface Props {
  creator: Creator;
}

export default function CreatorCard({ creator }: Props) {
  return (
    <article className="card" aria-label={`Creator card for ${creator.name}`}>
      {creator.imageURL ? (
        <img src={creator.imageURL} alt={creator.name} />
      ) : (
        <div
          style={{
            width: 112,
            height: 112,
            borderRadius: 12,
            background: '#f3f4f6',
            display: 'grid',
            placeItems: 'center',
            color: '#9ca3af',
          }}
        >
          No Image
        </div>
      )}

      <div>
        <h3>
          <Link to={`/creators/${creator.id}`}>{creator.name}</Link>
        </h3>
        <p className="muted">{creator.description}</p>
        <div className="actions" style={{ marginTop: 8 }}>
          <a href={creator.url} target="_blank" rel="noreferrer">
            Website
          </a>
          <Link to={`/creators/${creator.id}/edit`}>Edit</Link>
        </div>
      </div>
    </article>
  );
}
