import { signOut } from "next-auth/react";

function Header({ session }) {
  const { user } = session;

  return (
    <header>
      <nav className="flex flex-wrap items-center justify-between p-6 bg-black">
        <div className="flex items-center flex-shrink-0 mr-6 text-white">
          <svg
            className="w-8 h-8 mr-2 fill-current"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 text-teal-200 border border-teal-400 rounded hover:text-white hover:border-white"></button>
        </div>
        <div className="flex-grow block w-full lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow"></div>
          <div>
            {/* Bref dans l'idée c'est de faire un logout ici */}
            {user && (
              <a
                href="#"
                className="inline-block px-4 py-2 mt-4 text-sm leading-none text-white border border-white rounded hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0"
                onClick={() => signOut()}
              >
                Logout
              </a>
            )}

            {!user && (
              <a
                href="#"
                className="inline-block px-4 py-2 mt-4 text-sm leading-none text-white border border-white rounded hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0"
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
