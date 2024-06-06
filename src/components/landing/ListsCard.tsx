"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";
import { Skeleton } from "../ui/skeleton";

interface Item {
  icon: string;
  color: string;
}

let notifications = [
  {
    icon: "💸",
    color: "#00C9A7",
  },
  {
    icon: "👤",
    color: "#FFB800",
  },
  {
    icon: "💬",
    color: "#FF3D71",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({icon, color }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] transform cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
      style={{backgroundColor : color}}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
        >
  
        </div>
        <div className="flex flex-col overflow-hidden">
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>
    </figure>
  );
};

export function ListCard() {
  return (
    <div className="relative flex max-h-[20rem] min-h-[400px] w-full max-w-[23rem] flex-col overflow-hidden p-6">
      <div className="min-h-[100px] flex justify-center items-center mb-2">
        <Skeleton className="h-20 w-20 rounded-full" />
      </div>
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
