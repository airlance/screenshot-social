import { Plus } from "lucide-react";
import avatarMe from "@/assets/avatar-me.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";
import avatar7 from "@/assets/avatar-7.jpg";

type Story = {
  name: string;
  avatar: string;
  seen?: boolean;
};

const stories: Story[] = [
  { name: "Skylar R.", avatar: avatar1 },
  { name: "Mira D.", avatar: avatar2 },
  { name: "Nolan M.", avatar: avatar3 },
  { name: "Leah C.", avatar: avatar4 },
  { name: "Ethan W.", avatar: avatar5 },
  { name: "Mamie C.", avatar: avatar6 },
  { name: "Evan W.", avatar: avatar7, seen: true },
  { name: "Nannie W.", avatar: avatar1, seen: true },
  { name: "Vicente C.", avatar: avatar2, seen: true },
];

const StoryRing = ({ children, seen }: { children: React.ReactNode; seen?: boolean }) => (
  <div
    className="p-[2.5px] rounded-full"
    style={{
      background: seen
        ? "hsl(var(--border))"
        : "var(--gradient-ig-ring)",
    }}
  >
    <div className="p-[2px] rounded-full bg-card">{children}</div>
  </div>
);

export const Stories = () => {
  return (
    <div className="vk-card px-4 py-4">
      <div className="flex gap-4 overflow-x-auto scrollbar-none">
        {/* My story */}
        <button className="flex flex-col items-center gap-1.5 shrink-0 group">
          <div className="relative">
            <div className="p-[2.5px] rounded-full bg-border">
              <div className="p-[2px] rounded-full bg-card">
                <img
                  src={avatarMe}
                  alt="My story"
                  width={64}
                  height={64}
                  loading="lazy"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-primary border-2 border-card flex items-center justify-center">
              <Plus className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
            </div>
          </div>
          <span className="text-xs text-foreground max-w-[72px] truncate">Моя история</span>
        </button>

        {stories.map((story, i) => (
          <button key={i} className="flex flex-col items-center gap-1.5 shrink-0 group">
            <StoryRing seen={story.seen}>
              <img
                src={story.avatar}
                alt={story.name}
                width={64}
                height={64}
                loading="lazy"
                className="w-16 h-16 rounded-full object-cover transition-transform group-hover:scale-105"
              />
            </StoryRing>
            <span className={`text-xs max-w-[72px] truncate ${story.seen ? "text-muted-foreground" : "text-foreground"}`}>
              {story.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
