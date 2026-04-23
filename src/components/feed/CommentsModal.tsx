import { Heart, Send, Smile } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCount, type Comment, type Post } from "./types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: Post;
}

export const CommentsModal = ({ open, onOpenChange, post }: Props) => {
  const [comments, setComments] = useState<Comment[]>(post.comments ?? []);
  const [draft, setDraft] = useState("");

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;
    setComments((prev) => [
      {
        id: crypto.randomUUID(),
        author: { name: "Вы", avatar: post.author.avatar },
        text,
        time: "только что",
        likes: 0,
      },
      ...prev,
    ]);
    setDraft("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden bg-card border-border">
        <DialogTitle className="sr-only">Комментарии к посту {post.author.name}</DialogTitle>

        <header className="flex items-center gap-3 p-4 border-b border-border">
          <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden shrink-0">
            {post.author.avatar && (
              <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">{post.author.name}</div>
            <div className="text-xs text-muted-foreground">
              {formatCount(comments.length)} комментариев
            </div>
          </div>
        </header>

        <ScrollArea className="h-[420px]">
          <div className="p-4 flex flex-col gap-4">
            {comments.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground py-12">
                Пока нет комментариев. Будьте первым!
              </div>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-secondary overflow-hidden shrink-0">
                    {c.author.avatar && (
                      <img src={c.author.avatar} alt={c.author.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-secondary/50 rounded-2xl px-3 py-2">
                      <div className="text-xs font-semibold mb-0.5">{c.author.name}</div>
                      <div className="text-sm leading-relaxed">{c.text}</div>
                    </div>
                    <div className="flex items-center gap-3 mt-1 px-3 text-xs text-muted-foreground">
                      <span>{c.time}</span>
                      <button className="hover:text-foreground transition-colors">Ответить</button>
                      <button className="ml-auto flex items-center gap-1 hover:text-foreground transition-colors">
                        <Heart className="w-3.5 h-3.5" />
                        {c.likes > 0 && <span>{c.likes}</span>}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        <footer className="flex items-center gap-2 p-3 border-t border-border bg-card">
          <button className="w-9 h-9 rounded-full hover:bg-secondary flex items-center justify-center text-muted-foreground transition-colors">
            <Smile className="w-5 h-5" />
          </button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Написать комментарий..."
            className="flex-1 h-10 bg-secondary/40 rounded-full px-4 text-sm outline-none focus:bg-secondary/70 transition-colors placeholder:text-muted-foreground"
          />
          <button
            onClick={handleSend}
            disabled={!draft.trim()}
            className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 transition-opacity"
            aria-label="Отправить"
          >
            <Send className="w-4 h-4" />
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
};
