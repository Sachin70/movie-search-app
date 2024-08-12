import Link from "next/link";
import { FaSearch } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-50 shadow-lg border-b border-gray-200 rounded-full w-11/12 mx-auto mt-4 sticky top-4 z-50">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-gray-500">
          Movie
        </Link>
        <div className="flex space-x-6 items-center">
          <Link
            href="/"
            className="text-lg font-medium text-gray-700 hover:text-green-500 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/favorites"
            className="text-lg font-medium text-gray-700 hover:text-green-500 transition-colors"
          >
            Favorites
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
