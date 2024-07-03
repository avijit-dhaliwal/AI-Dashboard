import React from 'react';

function ExplanationView({ explanation }) {
  if (!explanation) return null;

  return (
    <div>
      <h2>Explanation</h2>
      <pre>{JSON.stringify(explanation, null, 2)}</pre>
    </div>
  );
}

export default ExplanationView;