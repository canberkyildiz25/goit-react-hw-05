const Cast = ({ cast = [] }) => {
  return (
    <section className="details-section">
      <h2>Cast</h2>
      {!cast.length ? (
        <p className="muted">No cast info.</p>
      ) : (
        <ul className="simple-list">
          {cast.map((member) => (
            <li key={member.id}>{member.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Cast;
