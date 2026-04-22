import { Plus, Compass } from "lucide-react";
import story1 from "@/assets/story-1.jpg";

export const Stories = () => {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-none">
      <button className="relative shrink-0 w-[110px] h-[150px] rounded-2xl overflow-hidden bg-secondary group">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-secondary" />
          </div>
          <span className="text-xs font-medium">История</span>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-primary border-[3px] border-card flex items-center justify-center">
          <Plus className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />
        </div>
      </button>

      <button className="relative shrink-0 w-[110px] h-[150px] rounded-2xl overflow-hidden group">
        <img src={story1} alt="story" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-2 left-2 w-9 h-9 rounded-full border-2 border-foreground bg-background/30 backdrop-blur flex items-center justify-center">
          <Compass className="w-4 h-4 text-foreground" />
        </div>
        <span className="absolute bottom-2 left-2 right-2 text-xs font-medium text-foreground">Интересное</span>
      </button>
    </div>
  );
};
