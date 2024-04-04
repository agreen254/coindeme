import type { DropdownUnit } from "@/hooks/useDropdownStore";

export function replaceArrayUnit(array: DropdownUnit[], newUnit: DropdownUnit) {
  return [...array.filter((unit) => unit.id !== newUnit.id), newUnit];
}
