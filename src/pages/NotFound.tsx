import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container max-w-lg text-center py-16">
        <p className="text-display-xl font-bold ds-display">
          404
        </p>
        <h1 className="text-display-md font-bold text-ink-1 mt-2 mb-4">
          Page not found
        </h1>
        <p className="text-base sm:text-lg text-ink-2 mb-8 break-words">
          We couldn&rsquo;t find <span className="font-mono break-all">{location.pathname}</span>.
          It may have been moved or never existed.
        </p>
        {/* The page previously offered a bare <a href="/">, which forces a full
            document reload in a SPA. Link keeps it client-side. */}
        <Button
          asChild
          className="min-h-[44px] bg-signal text-signal-ink hover:opacity-90"
        >
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
