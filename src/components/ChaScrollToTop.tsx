"use client";

import { LuChevronUp } from "react-icons/lu";
import { Button } from "./ui/Button";
import { useCallback, useEffect, useState } from "react";
import { cn } from "fumadocs-ui/utils/cn";

export const ChaScrollToTop = () => {
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
        "fixed bottom-6 rounded-full cursor-pointer transition-opacity duration-300",
        !isVisible && "opacity-0 pointer-events-none",
      )}
      style={{ right: "calc(40px + var(--removed-body-scroll-bar-size, 0px))" }}
      variant="outline"
      size="icon"
      title="Scroll to top"
      aria-label="Scroll to top"
      onClick={scrollToTop}
    >
      <LuChevronUp />
    </Button>
  );
};
