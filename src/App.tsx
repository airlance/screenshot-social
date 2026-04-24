import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Feed from "./pages/Feed.tsx";
import Profile from "./pages/Profile.tsx";
import Friends from "./pages/Friends.tsx";
import Music from "./pages/Music.tsx";
import Photos from "./pages/Photos.tsx";
import Groups from "./pages/Groups.tsx";
import Market from "./pages/Market.tsx";
import Messenger from "./pages/Messenger.tsx";
import Analytics from "./pages/Analytics.tsx";
import SimplePage from "./pages/SimplePage.tsx";
import NotFound from "./pages/NotFound.tsx";
import { PlayerProvider } from "./context/PlayerContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PlayerProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/calls" element={<SimplePage title="Звонки" />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/music" element={<Music />} />
          <Route path="/video" element={<SimplePage title="Видео" />} />
          <Route path="/clips" element={<SimplePage title="Клипы" />} />
          <Route path="/games" element={<SimplePage title="Игры" />} />
          <Route path="/stickers" element={<SimplePage title="Стикеры" />} />
          <Route path="/market" element={<Market />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/services" element={<SimplePage title="Сервисы" />} />
          <Route path="/voices" element={<SimplePage title="Голоса" />} />
          <Route path="/bookmarks" element={<SimplePage title="Закладки" />} />
          <Route path="/ads" element={<SimplePage title="Реклама" />} />
          <Route path="/help" element={<SimplePage title="Помощь" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </PlayerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
