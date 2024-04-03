import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <Link to="/">Go Back to Home Page</Link>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;
