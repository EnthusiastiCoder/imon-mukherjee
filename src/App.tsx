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
import AppearanceSwitcher from "./components/AppearanceSwitcher";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
        {/* Renders only with ?variants=1 — temporary, for choosing between the
            appearance axes. Built from the AXES registry, so it grows by itself. */}
        <AppearanceSwitcher />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
