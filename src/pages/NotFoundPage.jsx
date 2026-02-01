import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section>
      <h1>Page not found</h1>
      <p className="muted">The page you are looking for does not exist.</p>
      <Link className="button" to="/">
        Go to Home
      </Link>
    </section>
  );
};

export default NotFoundPage;
