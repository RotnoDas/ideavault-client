"use client";

import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a skeleton or invisible switch to prevent layout shift during hydration
    return <div className="w-14 h-8" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Switch
      isSelected={isDark}
      onValueChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
      onChange={(e) => {
        if (typeof e === "boolean") {
          setTheme(e ? "dark" : "light");
        } else if (e && e.target) {
          setTheme(e.target.checked ? "dark" : "light");
        }
      }}
      size="md"
      color="primary"
    >
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb>
            {isDark ? (
              <Moon className="w-3 h-3 text-slate-900" />
            ) : (
              <Sun className="w-3 h-3 text-amber-500" />
            )}
          </Switch.Thumb>
        </Switch.Control>
      </Switch.Content>
    </Switch>
  );
}
