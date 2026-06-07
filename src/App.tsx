import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Feed from "./pages/Feed.tsx";
import Profile from "./pages/Profile.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import Friends from "./pages/Friends.tsx";
import Music from "./pages/Music.tsx";
import Photos from "./pages/Photos.tsx";
import Video from "./pages/Video.tsx";
import Groups from "./pages/Groups.tsx";
import Market from "./pages/Market.tsx";
import Messenger from "./pages/Messenger.tsx";
import Calls from "./pages/Calls.tsx";
import Analytics from "./pages/Analytics.tsx";
import Stickers from "./pages/Stickers.tsx";
import Clips from "./pages/Clips.tsx";
import Games from "./pages/Games.tsx";
import Bookmarks from "./pages/Bookmarks.tsx";
import ArticleEditor from "./pages/ArticleEditor.tsx";
import SimplePage from "./pages/SimplePage.tsx";
import Services from "./pages/Services.tsx";
import Settings from "./pages/Settings.tsx";
import Notifications from "./pages/Notifications.tsx";
import Login from "./pages/Login.tsx";
import Accounts from "./pages/Accounts.tsx";
import Search from "./pages/Search.tsx";
import NotFound from "./pages/NotFound.tsx";
import { PlayerProvider } from "./context/PlayerContext";
import { StoriesProvider } from "./context/StoriesContext";
import { RepostsProvider } from "./context/RepostsContext";
import { MessengerProvider } from "./context/MessengerContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import { AccountsProvider } from "./context/AccountsContext";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PlayerProvider>
      <StoriesProvider>
      <RepostsProvider>
      <AccountsProvider>
      <MessengerProvider>
      <NotificationsProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />

          <Route path="/feed" element={<Feed />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/calls" element={<Calls />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/music" element={<Music />} />
          <Route path="/video" element={<Video />} />
          <Route path="/clips" element={<Clips />} />
          <Route path="/games" element={<Games />} />
          <Route path="/stickers" element={<Stickers />} />
          <Route path="/market" element={<Market />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/services" element={<Services />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/search" element={<Search />} />
          <Route path="/voices" element={<SimplePage title="Голоса" />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/article/new" element={<ArticleEditor />} />
          <Route path="/ads" element={<SimplePage title="Реклама" />} />
          <Route path="/help" element={<SimplePage title="Помощь" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </NotificationsProvider>
      </MessengerProvider>
      </AccountsProvider>
      </RepostsProvider>
      </StoriesProvider>
      </PlayerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
