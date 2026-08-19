import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Publications from "./pages/Publications";
import AcademicSupervision from "./pages/AcademicSupervision";
import FundedProjects from "./pages/FundedProjects";
import Gallery from "./pages/Gallery";
import Lectures from "./pages/Lectures";
import NotFound from "./pages/NotFound";
import AmbientCanvas from "./components/AmbientCanvas";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/*
        The generative field, as one page-wide fixed layer rather than a canvas
        per section.

        Fixed and behind everything, so it runs the whole length of the page and
        across every route instead of only the hero. One canvas rather than one
        per section: nine canvases would each need their own loop and observer to
        animate the same field, at nine times the cost, and they would seam at
        every section boundary.

        Sections above it are transparent (see index.css) so the field is the
        page's ground everywhere; content that needs a quiet backdrop sits on an
        opaque .ds-plane.
      */}
      <AmbientCanvas className="ds-field fixed inset-0 -z-10 h-full w-full" />

      {/* BASE_URL is "/" for a root build and "/variants/" for the sub-app
          deployment. Router basename wants it without the trailing slash. */}
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/academic-supervision" element={<AcademicSupervision />} />
          <Route path="/funded-projects" element={<FundedProjects />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/lectures" element={<Lectures />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
