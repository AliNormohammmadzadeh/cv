import React from 'react';

const BentoBox = () => {
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // 3 equal columns
    gridTemplateRows: 'repeat(2, 200px)', // 2 rows, 200px high
    gap: '16px',
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
  };

  const cardStyle = {
    backgroundColor: '#f3f4f6',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333'
  };

  return (
    <div style={containerStyle}>
      {/* Spans 2 columns */}
      <div style={{ ...cardStyle, gridColumn: 'span 2' }}>Featured Project</div>
      {/* Spans 1 column, 1 row */}
      <div style={{ ...cardStyle }}>GitHub Link</div>
      {/* Spans 1 column, 1 row */}
      <div style={{ ...cardStyle }}>Tech Stack</div>
      {/* Spans 2 columns */}
      <div style={{ ...cardStyle, gridColumn: 'span 2' }}>About Me</div>
    </div>
  );
};

export default BentoBox;