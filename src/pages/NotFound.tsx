
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-aidea-black">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-aidea-green">404</h1>
        <p className="text-2xl text-white mb-8">אופס! הדף שחיפשת לא נמצא</p>
        <Button asChild className="bg-aidea-green text-black hover:bg-aidea-green/90 font-bold">
          <Link to="/">
            חזרה לדף הבית
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
