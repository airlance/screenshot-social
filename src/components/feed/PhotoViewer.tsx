import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Heart, Send, X } from "lucide-react";
import avatarMe from "@/assets/avatar-me.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import { MentionInput, renderWithMentions, type MentionInputHandle } from "./MentionInput";

export type PhotoComment = {
  id: string;
  author: { name: string; avatar: string };
  text: string;
  time: string;
  likes: number;
  liked?: boolean;
};

const seed = (key: string): PhotoComment[] => {
  const base: PhotoComment[] = [
    { id: "c1", author: { name: "Skylar R.", avatar: avatar1 }, text: "Шикарный кадр! 🔥", time: "2 ч", likes: 4 },
    { id: "c2", author: { name: "Mira D.", avatar: avatar2 }, text: "Где это снято?", time: "1 ч", likes: 1 },
  ];
  // pseudo-stable variation by key
  return key.length % 2 === 0 ? base : base.slice(0, 1);
};

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  src: string | null;
};

export const PhotoViewer = ({ open, onOpenChange, src }: Props) => {
  const [store, setStore] = useState<Record<string, PhotoComment[]>>({});
  const [draft, setDraft] = useState("");
  const inputRef = useRef<MentionInputHandle>(null);

  useEffect(() => {
    if (open && src && !store[src]) {
      setStore((p) => ({ ...p, [src]: seed(src) }));
    }
    if (open) setDraft("");
  }, [open, src, store]);

  if (!src) return null;
  const comments = store[src] ?? [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const c: PhotoComment = {
      id: `c${Date.now()}`,
      author: { name: "Mark Roberts", avatar: avatarMe },
      text,
      time: "только что",
      likes: 0,
    };
    setStore((p) => ({ ...p, [src]: [...(p[src] ?? []), c] }));
    setDraft("");
  };

  const toggleLike = (id: string) => {
    setStore((p) => ({
      ...p,
      [src]: (p[src] ?? []).map((c) =>
        c.id === id ? { ...c, liked: !c.liked, likes: c.likes + (c.liked ? -1 : 1) } : c,
      ),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden border-none bg-card">
        <div className="grid md:grid-cols-[1fr_360px] max-h-[85vh]">
          {/* Image */}
          <div className="relative bg-black flex items-center justify-center min-h-[320px]">
            <img src={src} alt="Фото" className="max-h-[85vh] w-full object-contain" />
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 md:hidden"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Comments side */}
          <div className="flex flex-col border-l border-border bg-card">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="font-semibold text-sm">Комментарии · {comments.length}</div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {comments.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-10">
                  Пока нет комментариев. Будьте первым!
                </div>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="flex gap-2.5">
                    <img src={c.author.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="rounded-2xl bg-secondary/70 px-3 py-2">
                        <div className="text-xs font-semibold">{c.author.name}</div>
                        <div className="text-sm break-words">{renderWithMentions(c.text)}</div>
                      </div>
                      <div className="mt-1 flex items-center gap-3 px-1 text-xs text-muted-foreground">
                        <span>{c.time}</span>
                        <button
                          onClick={() => toggleLike(c.id)}
                          className={`flex items-center gap-1 hover:text-foreground ${c.liked ? "text-destructive" : ""}`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${c.liked ? "fill-current" : ""}`} />
                          {c.likes > 0 && c.likes}
                        </button>
                        <button className="hover:text-foreground">Ответить</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <form onSubmit={submit} className="p-3 border-t border-border flex items-center gap-2">
              <img src={avatarMe} alt="" className="w-8 h-8 rounded-full object-cover" />
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Написать комментарий…"
                className="flex-1 h-10 px-3 rounded-full bg-secondary text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40"
                aria-label="Отправить"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
