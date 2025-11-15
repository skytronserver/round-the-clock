import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { FeedbackProvider } from "@/contexts/FeedbackContext";
import { RecipeProvider } from "@/contexts/RecipeContext";
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
import ItemMix from "./pages/settings/ItemMix";
import UnitMeasurement from "./pages/settings/UnitMeasurement";
import Purchase from "./pages/Purchase";
import CompanyPurchase from "./pages/purchase/CompanyPurchase";
import OutletPurchase from "./pages/purchase/OutletPurchase";
import PurchaseApproval from "./pages/purchase/PurchaseApproval";
import Inward from "./pages/Inward";
import Inventory from "./pages/Inventory";
import CompanyInventory from "./pages/inventory/CompanyInventory";
import RawIngredientsInventory from "./pages/inventory/RawIngredientsInventory";
import ItemMixInventory from "./pages/inventory/ItemMixInventory";
import CompleteItemsInventory from "./pages/inventory/CompleteItemsInventory";
import ReadyMadeInventory from "./pages/inventory/ReadyMadeInventory";
import OutletInventory from "./pages/inventory/OutletInventory";
import Sale from "./pages/Sale";
import Billing from "./pages/Billing";
import Return from "./pages/Return";
import Wastage from "./pages/Wastage";
import FreshlyPreparedItems from "./pages/FreshlyPreparedItems";
import OutletPreparation from "./pages/OutletPreparation";
import CompanyPreparation from "./pages/CompanyPreparation";
import CompanyItemPreparation from "./pages/CompanyItemPreparation";
import Check from "./pages/Check";
import Dispatch from "./pages/Dispatch";
import Report from "./pages/Report";
import Promotion from "./pages/Promotion";
import ItemsTimeReport from "./pages/reports/ItemsTimeReport";
import OutletReport from "./pages/reports/OutletReport";
import ProfitLossReport from "./pages/reports/ProfitLossReport";
import ItemWiseSalesReport from "./pages/reports/ItemWiseSalesReport";
import DailySalesReport from "./pages/reports/DailySalesReport";
import BestSellingItemsReport from "./pages/reports/BestSellingItemsReport";
import PaymentModeReport from "./pages/reports/PaymentModeReport";
import CustomerFeedbackItemsReport from "./pages/reports/CustomerFeedbackItemsReport";
import CustomerFeedbackOutletsReport from "./pages/reports/CustomerFeedbackOutletsReport";
import OutletwiseSaleToggleReport from "./pages/reports/OutletwiseSaleToggleReport";
import ItemwiseSaleToggleReport from "./pages/reports/ItemwiseSaleToggleReport";
import EventBasedOffers from "./pages/promotions/EventBasedOffers";
import HappyHourDeals from "./pages/promotions/HappyHourDeals";
import OutletBasedDiscounts from "./pages/promotions/OutletBasedDiscounts";
import ItemBasedOffers from "./pages/promotions/ItemBasedOffers";
import PaymentBasedOffers from "./pages/promotions/PaymentBasedOffers";
import BankAccountBasedOffers from "./pages/promotions/BankAccountBasedOffers";
import LoyalCustomer from "./pages/promotions/LoyalCustomer";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FeedbackProvider>
        <OrderProvider>
          <CartProvider>
            <RecipeProvider>
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
                <Route path="/mis/settings/item-mix" element={
                  <ProtectedRoute>
                    <ItemMix />
                  </ProtectedRoute>
                } />
                <Route path="/mis/settings/unit-measurement" element={
                  <ProtectedRoute>
                    <UnitMeasurement />
                  </ProtectedRoute>
                } />
                <Route path="/mis/purchase/company" element={
                  <ProtectedRoute>
                    <CompanyPurchase />
                  </ProtectedRoute>
                } />
                <Route path="/mis/purchase/outlet" element={
                  <ProtectedRoute>
                    <OutletPurchase />
                  </ProtectedRoute>
                } />
                <Route path="/mis/purchase/approval" element={
                  <ProtectedRoute>
                    <PurchaseApproval />
                  </ProtectedRoute>
                } />
                <Route path="/mis/purchase" element={
                  <ProtectedRoute>
                    <Purchase />
                  </ProtectedRoute>
                } />
                <Route path="/mis/inward" element={
                  <ProtectedRoute>
                    <Inward />
                  </ProtectedRoute>
                } />
                <Route path="/mis/inventory/company/raw-ingredients" element={
                  <ProtectedRoute>
                    <RawIngredientsInventory />
                  </ProtectedRoute>
                } />
                  <Route path="/mis/inventory/company/ready-made" element={
                  <ProtectedRoute>
                    <ReadyMadeInventory />
                  </ProtectedRoute>
                } />
                <Route path="/mis/inventory/company/item-mix" element={
                  <ProtectedRoute>
                    <ItemMixInventory />
                  </ProtectedRoute>
                } />
                <Route path="/mis/inventory/company/complete-items" element={
                  <ProtectedRoute>
                    <CompleteItemsInventory />
                  </ProtectedRoute>
                } />
              
                <Route path="/mis/inventory/company" element={
                  <ProtectedRoute>
                    <CompanyInventory />
                  </ProtectedRoute>
                } />
                <Route path="/mis/inventory/outlet" element={
                  <ProtectedRoute>
                    <OutletInventory />
                  </ProtectedRoute>
                } /> 
                <Route path="/mis/inventory" element={
                  <ProtectedRoute>
                    <Inventory />
                  </ProtectedRoute>
                } />
                <Route path="/mis/sale" element={
                  <ProtectedRoute>
                    <Sale />
                  </ProtectedRoute>
                } />
                <Route path="/mis/billing" element={
                  <ProtectedRoute>
                    <Billing />
                  </ProtectedRoute>
                } />
                <Route path="/mis/return" element={
                  <ProtectedRoute>
                    <Return />
                  </ProtectedRoute>
                } />
                <Route path="/mis/wastage" element={
                  <ProtectedRoute>
                    <Wastage />
                  </ProtectedRoute>
                } />
                <Route path="/mis/freshly-prepared" element={
                  <ProtectedRoute>
                    <FreshlyPreparedItems />
                  </ProtectedRoute>
                } />
                <Route path="/mis/outlet-preparation" element={
                  <ProtectedRoute>
                    <OutletPreparation />
                  </ProtectedRoute>
                } />
                <Route path="/mis/company-preparation" element={
                  <ProtectedRoute>
                    <CompanyPreparation />
                  </ProtectedRoute>
                } />
                <Route path="/mis/company-item-preparation" element={
                  <ProtectedRoute>
                    <CompanyItemPreparation />
                  </ProtectedRoute>
                } />
                <Route path="/mis/check" element={
                  <ProtectedRoute>
                    <Check />
                  </ProtectedRoute>
                } />
                <Route path="/mis/dispatch" element={
                  <ProtectedRoute>
                    <Dispatch />
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
                <Route path="/mis/report/items-time" element={
                  <ProtectedRoute>
                    <ItemsTimeReport />
                  </ProtectedRoute>
                } />
                <Route path="/mis/report/outlet" element={
                  <ProtectedRoute>
                    <OutletReport />
                  </ProtectedRoute>
                } />
                <Route path="/mis/report/profit-loss" element={
                  <ProtectedRoute>
                    <ProfitLossReport />
                  </ProtectedRoute>
                } />
                <Route path="/mis/report/item-wise-sales" element={
                  <ProtectedRoute>
                    <ItemWiseSalesReport />
                  </ProtectedRoute>
                } />
                <Route path="/mis/report/daily-sales" element={
                  <ProtectedRoute>
                    <DailySalesReport />
                  </ProtectedRoute>
                } />
                <Route path="/mis/report/best-selling" element={
                  <ProtectedRoute>
                    <BestSellingItemsReport />
                  </ProtectedRoute>
                } />
                <Route path="/mis/report/payment-mode" element={
                  <ProtectedRoute>
                    <PaymentModeReport />
                  </ProtectedRoute>
                } />
                <Route path="/mis/report/customer-feedback-items" element={
                  <ProtectedRoute>
                    <CustomerFeedbackItemsReport />
                  </ProtectedRoute>
                } />
                <Route path="/mis/report/customer-feedback-outlets" element={
                  <ProtectedRoute>
                    <CustomerFeedbackOutletsReport />
                  </ProtectedRoute>
                } />
                <Route path="/mis/report/outletwise-sale-toggle" element={
                  <ProtectedRoute>
                    <OutletwiseSaleToggleReport />
                  </ProtectedRoute>
                } />
                <Route path="/mis/report/itemwise-sale-toggle" element={
                  <ProtectedRoute>
                    <ItemwiseSaleToggleReport />
                  </ProtectedRoute>
                } />
                <Route path="/mis/promotion/event-based-offers" element={
                  <ProtectedRoute>
                    <EventBasedOffers />
                  </ProtectedRoute>
                } />
                <Route path="/mis/promotion/happy-hour-deals" element={
                  <ProtectedRoute>
                    <HappyHourDeals />
                  </ProtectedRoute>
                } />
                <Route path="/mis/promotion/outlet-based-discounts" element={
                  <ProtectedRoute>
                    <OutletBasedDiscounts />
                  </ProtectedRoute>
                } />
                <Route path="/mis/promotion/item-based-offers" element={
                  <ProtectedRoute>
                    <ItemBasedOffers />
                  </ProtectedRoute>
                } />
                <Route path="/mis/promotion/payment-based-offers" element={
                  <ProtectedRoute>
                    <PaymentBasedOffers />
                  </ProtectedRoute>
                } />
                <Route path="/mis/promotion/bank-account-based-offers" element={
                  <ProtectedRoute>
                    <BankAccountBasedOffers />
                  </ProtectedRoute>
                } />
                <Route path="/mis/promotion/loyal-customer" element={
                  <ProtectedRoute>
                    <LoyalCustomer />
                  </ProtectedRoute>
                } />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            </RecipeProvider>
          </CartProvider>
        </OrderProvider>
      </FeedbackProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
