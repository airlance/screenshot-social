import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useStories, type StoryUser } from "@/context/StoriesContext";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  startUserId: string | null;
};

const DURATION = 5000;

export const StoryViewer = ({ open, onOpenChange, startUserId }: Props) => {
  const { users, markSeen } = useStories();
  const visibleUsers = users.filter((u) => u.items.length > 0);

  const [userIdx, setUserIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>();
  const startRef = useRef<number>(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (!open || !startUserId) return;
    const idx = visibleUsers.findIndex((u) => u.id === startUserId);
    setUserIdx(idx >= 0 ? idx : 0);
    setItemIdx(0);
    setProgress(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, startUserId]);

  const currentUser: StoryUser | undefined = visibleUsers[userIdx];
  const currentItem = currentUser?.items[itemIdx];

  const next = () => {
    if (!currentUser) return;
    if (itemIdx + 1 < currentUser.items.length) {
      setItemIdx((i) => i + 1);
      setProgress(0);
    } else {
      markSeen(currentUser.id);
      if (userIdx + 1 < visibleUsers.length) {
        setUserIdx((i) => i + 1);
        setItemIdx(0);
        setProgress(0);
      } else {
        onOpenChange(false);
      }
    }
  };

  const prev = () => {
    if (itemIdx > 0) {
      setItemIdx((i) => i - 1);
      setProgress(0);
    } else if (userIdx > 0) {
      const prevUser = visibleUsers[userIdx - 1];
      setUserIdx((i) => i - 1);
      setItemIdx(prevUser.items.length - 1);
      setProgress(0);
    }
  };

  // progress loop
  useEffect(() => {
    if (!open || !currentItem) return;
    startRef.current = performance.now();
    let lastP = 0;
    const tick = (t: number) => {
      if (!pausedRef.current) {
        const elapsed = t - startRef.current;
        const p = Math.min(1, elapsed / DURATION);
        if (p !== lastP) {
          lastP = p;
          setProgress(p);
        }
        if (p >= 1) {
          next();
          return;
        }
      } else {
        startRef.current = t - lastP * DURATION;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, userIdx, itemIdx]);

  if (!currentUser || !currentItem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md p-0 bg-black border-none overflow-hidden"
        onPointerDown={() => (pausedRef.current = true)}
        onPointerUp={() => (pausedRef.current = false)}
        onPointerLeave={() => (pausedRef.current = false)}
      >
        <div className="relative w-full aspect-[9/16] bg-black">
          {/* Progress bars */}
          <div className="absolute top-2 left-2 right-2 z-20 flex gap-1">
            {currentUser.items.map((_, i) => (
              <div key={i} className="flex-1 h-0.5 bg-white/30 rounded overflow-hidden">
                <div
                  className="h-full bg-white"
                  style={{
                    width: `${i < itemIdx ? 100 : i === itemIdx ? progress * 100 : 0}%`,
                    transition: i === itemIdx ? "none" : undefined,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-5 left-2 right-2 z-20 flex items-center gap-2 mt-2">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover" />
            <span className="text-sm font-medium text-white">{currentUser.name}</span>
            <button
              onClick={() => onOpenChange(false)}
              className="ml-auto w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          {currentItem.image ? (
            <img src={currentItem.image} alt="story" className="w-full h-full object-cover" />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: currentItem.background || "hsl(var(--muted))" }}
            >
              <p className="px-6 text-center text-2xl font-semibold text-white break-words">
                {currentItem.text}
              </p>
            </div>
          )}
          {currentItem.image && currentItem.text && (
            <p className="absolute bottom-10 left-0 right-0 px-4 text-center text-lg font-semibold text-white drop-shadow z-10">
              {currentItem.text}
            </p>
          )}

          {/* Nav zones */}
          <button
            onClick={prev}
            className="absolute left-0 top-0 bottom-0 w-1/3 z-10 flex items-center justify-start pl-2 text-white/0 hover:text-white/70"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-0 bottom-0 w-1/3 z-10 flex items-center justify-end pr-2 text-white/0 hover:text-white/70"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
