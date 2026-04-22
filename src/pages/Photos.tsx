import { AppLayout } from "@/components/layout/AppLayout";
import { Image as ImageIcon, MoreHorizontal, Settings } from "lucide-react";
import photo1 from "@/assets/photo-1.jpg";

const Photos = () => (
  <AppLayout variant="wide">
    <div className="vk-card p-5">
      <h1 className="text-xl font-bold mb-4">Мои фотографии</h1>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1">
          <button className="vk-pill bg-secondary flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Фото</button>
          <button className="vk-pill bg-transparent text-muted-foreground">Альбомы</button>
        </div>
        <div className="flex items-center gap-2">
          <button className="vk-pill flex items-center gap-2"><ImageIcon className="w-4 h-4 text-primary" /> Загрузить фото</button>
          <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center"><MoreHorizontal className="w-4 h-4" /></button>
          <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center"><Settings className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="text-xs font-semibold text-muted-foreground mb-3">2026</div>
      <div className="grid grid-cols-3 gap-2">
        <img src={photo1} alt="photo" className="w-full aspect-square object-cover rounded-xl" loading="lazy" />
      </div>
    </div>
  </AppLayout>
);

export default Photos;
