"use client";

import { Moon, Sun } from "lucide-react";

function toggle() {
  const next = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", next);
  localStorage.setItem("theme", next ? "dark" : "light");
}

export default function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="press flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground/70 hover:bg-accent-soft hover:text-accent"
    >
      <Moon size={16} aria-hidden className="block dark:hidden" />
      <Sun size={16} aria-hidden className="hidden dark:block" />
    </button>
  );
}
