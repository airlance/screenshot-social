import { Plus, Sparkles, AlignLeft } from "lucide-react";

export const CreatePost = () => (
  <div className="vk-card flex items-center gap-2 p-2 pl-4">
    <button className="flex-1 flex items-center gap-2 h-10 rounded-xl hover:bg-secondary/60 px-3 text-sm text-muted-foreground transition-colors">
      <Plus className="w-4 h-4" />
      <span>Создать пост</span>
    </button>
    <button className="w-10 h-10 rounded-xl hover:bg-secondary/60 flex items-center justify-center text-muted-foreground transition-colors">
      <Sparkles className="w-4 h-4" />
    </button>
    <button className="w-10 h-10 rounded-xl hover:bg-secondary/60 flex items-center justify-center text-muted-foreground transition-colors">
      <AlignLeft className="w-4 h-4" />
    </button>
  </div>
);
