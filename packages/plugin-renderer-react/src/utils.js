import * as React from "react";

export function getDisplayName(Component: React.ComponentType<*>) {
  return Component.displayName || Component.name || "Unknown";
}
