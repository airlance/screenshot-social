import { useState } from "react";
import { Plus, Sparkles, AlignLeft } from "lucide-react";
import { CreatePostModal } from "./CreatePostModal";

export const CreatePost = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="vk-card flex items-center gap-2 p-2 pl-4">
        <button
          onClick={() => setOpen(true)}
          className="flex-1 flex items-center gap-2 h-10 rounded-xl hover:bg-secondary/60 px-3 text-sm text-muted-foreground transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Создать пост</span>
        </button>
        <button
          onClick={() => setOpen(true)}
          className="w-10 h-10 rounded-xl hover:bg-secondary/60 flex items-center justify-center text-muted-foreground transition-colors"
        >
          <Sparkles className="w-4 h-4" />
        </button>
        <button
          onClick={() => setOpen(true)}
          className="w-10 h-10 rounded-xl hover:bg-secondary/60 flex items-center justify-center text-muted-foreground transition-colors"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
      </div>
      <CreatePostModal open={open} onOpenChange={setOpen} />
    </>
  );
};
