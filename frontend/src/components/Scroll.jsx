import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Scroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "document.documentElement.scrollTo"
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}
