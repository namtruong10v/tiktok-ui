import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        console.log(pathname, 'pathname')

        window.scrollTo(0, 0);
        if (pathname == '/' || pathname == "/following") {
            const element = document.getElementById("App_dnt_reacjs")
            // document.getElementById("App_dnt_reacjs")
            element.style.overflow = 'hidden';
            element.style.height = '100vh';
        } else {
            const element = document.getElementById("App_dnt_reacjs")
            // document.getElementById("App_dnt_reacjs")
            element.style.overflow = 'auto';
            element.style.height = 'auto';
        }

    }, [pathname]);



    return null;
}