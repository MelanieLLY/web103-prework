import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import ShowCreators from '../pages/ShowCreators';
import ViewCreator from '../pages/ViewCreator';
import AddCreator from '../pages/AddCreator';
import EditCreator from '../pages/EditCreator';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/" style={{ fontWeight: 600 }}>
          Home
        </Link>
        <Link to="/creators">Creators</Link>
        <Link to="/creators/new">Add</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/creators" replace />} />
        <Route path="/creators" element={<ShowCreators />} />
        <Route path="/creators/new" element={<AddCreator />} />
        <Route path="/creators/:id" element={<ViewCreator />} />
        <Route path="/creators/:id/edit" element={<EditCreator />} />
        <Route
          path="*"
          element={
            <main className="container">
              <p>Not Found</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
