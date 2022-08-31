import { signIn, signOut, useSession } from "next-auth/react";
import { IoLogOut } from "react-icons/io5";
import Right from "./Right";
import SearchArea from "./SearchArea";

function Header() {
  const { data: session, loading } = useSession();

  return (
    <header>
      <nav className="flex flex-wrap items-center justify-between bg-black ">
        <SearchArea />

        <div className="flex w-full lg:flex lg:items-center lg:w-auto">
          {/* <div className="text-sm lg:flex-grow"></div> */}
          <div className="px-20 lg:flex-grow ">
            <div className="logi">
              {/* Bref dans l'idée c'est de faire un logout ici */}
              {session && (
                <a
                  href="#"
                  className="inline-block px-4 py-2 mt-4 text-sm leading-none text-white border border-white rounded hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0"
                  onClick={() => signOut()}
                >
                  <IoLogOut className="inline-block" />
                </a>
              )}

              {/* {!loading && !session && (
                <a
                  href="#"
                  onClick={() => signIn()}
                  className="inline-block px-4 py-2 mt-4 text-sm leading-none text-white border border-white rounded hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0"
                >
                  Sign In
                </a>
              )} */}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
