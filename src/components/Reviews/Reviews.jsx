const Reviews = ({ reviews = [] }) => {
  return (
    <section className="details-section">
      <h2>Reviews</h2>
      {!reviews.length ? (
        <p className="muted">No reviews yet.</p>
      ) : (
        <ul className="simple-list">
          {reviews.map((review) => (
            <li key={review.id}>
              <p className="review__author">{review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Reviews;
