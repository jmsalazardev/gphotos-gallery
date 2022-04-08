import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main style={{ padding: '1rem 0' }}>
      <h2>Home</h2>
      <nav>
        <Link to='/albums'>Albums</Link>
      </nav>
    </main>
  );
}
