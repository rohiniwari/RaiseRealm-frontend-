import { Link } from 'react-router-dom';
import Button from '../components/ui/button';
import Card from '../components/ui/card';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="p-8 text-center max-w-md">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link to="/">
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link to="/projects">
              Browse Projects
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;