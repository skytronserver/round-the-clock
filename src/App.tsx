import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { FeedbackProvider } from "@/contexts/FeedbackContext";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";
import MIS from "./pages/MIS";
import Settings from "./pages/Settings";
import CreateOutlet from "./pages/settings/CreateOutlet";
import RawIngredients from "./pages/settings/RawIngredients";
import ReadyToSale from "./pages/settings/ReadyToSale";
import FreshlyPrepared from "./pages/settings/FreshlyPrepared";
import Purchase from "./pages/Purchase";
import Report from "./pages/Report";
import Promotion from "./pages/Promotion";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FeedbackProvider>
        <OrderProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/mis" element={
                  <ProtectedRoute>
                    <MIS />
                  </ProtectedRoute>
                } />
                <Route path="/mis/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="/mis/settings/create-outlet" element={
                  <ProtectedRoute>
                    <CreateOutlet />
                  </ProtectedRoute>
                } />
                <Route path="/mis/settings/raw-ingredients" element={
                  <ProtectedRoute>
                    <RawIngredients />
                  </ProtectedRoute>
                } />
                <Route path="/mis/settings/ready-to-sale" element={
                  <ProtectedRoute>
                    <ReadyToSale />
                  </ProtectedRoute>
                } />
                <Route path="/mis/settings/freshly-prepared" element={
                  <ProtectedRoute>
                    <FreshlyPrepared />
                  </ProtectedRoute>
                } />
                <Route path="/mis/purchase" element={
                  <ProtectedRoute>
                    <Purchase />
                  </ProtectedRoute>
                } />
                <Route path="/mis/report" element={
                  <ProtectedRoute>
                    <Report />
                  </ProtectedRoute>
                } />
                <Route path="/mis/promotion" element={
                  <ProtectedRoute>
                    <Promotion />
                  </ProtectedRoute>
                } />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </OrderProvider>
      </FeedbackProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
