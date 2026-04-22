import { AppLayout } from "@/components/layout/AppLayout";
import { CreatePost } from "@/components/feed/CreatePost";
import { Pencil, TrendingUp, ChevronDown, Plus, Image, Video, Film, Music, FileText, Search, X } from "lucide-react";
import photo1 from "@/assets/photo-1.jpg";

const tabs = [
  { label: "Фото", icon: Image, active: true },
  { label: "Видео", icon: Video },
  { label: "Клипы", icon: Film },
  { label: "Музыка", icon: Music },
  { label: "Статьи", icon: FileText },
  { label: "Альбомы", icon: Image },
];

const Profile = () => {
  return (
    <AppLayout
      right={
        <>
          <div className="vk-card p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Plus className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Подпишитесь на сообщества</div>
                  <div className="text-xs text-muted-foreground">Следите за новостями интересных вам сообществ</div>
                </div>
              </div>
              <button className="text-muted-foreground"><X className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="vk-card p-4">
            <div className="font-semibold text-sm mb-4">Друзья</div>
            <div className="flex flex-col items-center gap-2 py-6">
              <div className="text-sm text-muted-foreground">У вас пока нет друзей</div>
              <button className="vk-pill flex items-center gap-2 mt-2">
                <Plus className="w-4 h-4 text-primary" /> Добавить друзей
              </button>
            </div>
          </div>
        </>
      }
    >
      <div className="vk-card overflow-hidden">
        <div className="h-44 bg-gradient-to-br from-secondary to-muted relative">
          <button className="absolute top-3 right-3 vk-pill flex items-center gap-2 bg-background/70 backdrop-blur">
            <Pencil className="w-3.5 h-3.5" /> Изменить обложку
          </button>
        </div>
        <div className="p-5 flex items-start gap-5 -mt-16">
          <div className="relative shrink-0">
            <div className="w-32 h-32 rounded-full bg-muted border-4 border-card flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-secondary" />
            </div>
            <button className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-primary border-[3px] border-card flex items-center justify-center">
              <Plus className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />
            </button>
          </div>
          <div className="flex-1 min-w-0 mt-16">
            <h1 className="text-xl font-bold">Mark Roberts</h1>
            <button className="text-sm text-primary hover:underline mt-0.5 flex items-center gap-0.5">
              Укажите информацию о себе ›
            </button>
          </div>
          <div className="flex items-center gap-2 mt-16">
            <button className="vk-pill">Редактировать профиль</button>
            <button className="w-9 h-9 rounded-full bg-secondary hover:bg-accent flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </button>
            <button className="vk-pill flex items-center gap-1">Ещё <ChevronDown className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      </div>

      <div className="vk-card p-3">
        <div className="flex gap-1 overflow-x-auto scrollbar-none mb-3">
          {tabs.map(({ label, icon: Icon, active }) => (
            <button key={label} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm shrink-0 transition-colors ${active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60"}`}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          <img src={photo1} alt="photo" className="w-full aspect-square object-cover rounded-xl" loading="lazy" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="vk-pill !bg-secondary/70">Загрузить фото</button>
          <button className="vk-pill !bg-secondary/70">Показать всё</button>
        </div>
      </div>

      <CreatePost />

      <div className="vk-card p-8 flex justify-center">
        <Search className="w-6 h-6 text-muted-foreground" />
      </div>
    </AppLayout>
  );
};

export default Profile;
