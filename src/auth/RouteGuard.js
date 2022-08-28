import {useRouter} from "next/router";
import {useAppContext} from "../context/state";
import {useEffect} from "react";


function RouteGuard({ children }) {
    const router = useRouter();
    const { session, status } = useAppContext();

    useEffect(() => {
        if (status === "authenticated" && session) {
            return children;
        }
        if (!session) {
            return router.push("login");
        }
    }
    , [session, status]);

  return null;
}

export default RouteGuard;