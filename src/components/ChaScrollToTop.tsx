"use client";

import { LuChevronUp } from "react-icons/lu";
import { Button } from "./shadcn-ui/Button";
import { useCallback, useEffect, useState } from "react";
import { cn } from "fumadocs-ui/utils/cn";

export function ChaScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Button
      className={cn(
        "fixed bottom-6 right-10 rounded-full cursor-pointer transition-opacity duration-300",
        !isVisible && "opacity-0 pointer-events-none",
      )}
      variant="outline"
      size="icon"
      title="Scroll to top"
      aria-label="Scroll to top"
      onClick={scrollToTop}
    >
      <LuChevronUp />
    </Button>
  );
}
