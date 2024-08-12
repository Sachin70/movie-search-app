import Link from "next/link";

const Header = () => {
  return (
    <header className="p-4 bg-blue-600 text-white sticky top-0">
      <nav className="container mx-auto flex justify-between w-full max-w-[1280px] px-4">
        <Link href="/" legacyBehavior>
          <a className="text-lg font-bold">Home</a>
        </Link>
        <Link href="/favorites" legacyBehavior>
          <a className="text-lg font-bold">Favorites</a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
