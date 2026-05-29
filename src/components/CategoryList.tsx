import Link from "next/link";

import type { Category } from "@/types";

interface CategoryListProps {
  categories: Category[];
  onSelect?: (id: string) => void;
  linkMode?: boolean;
}

export default function CategoryList({
  categories,
  onSelect,
  linkMode = false,
}: CategoryListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const cardClassName =
          "block rounded-xl border border-zinc-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700";

        if (linkMode) {
          return (
            <Link
              key={category.id}
              href={`/test/${category.id}`}
              className={cardClassName}
            >
              <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {category.name}
              </span>
            </Link>
          );
        }

        if (onSelect) {
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              className={cardClassName}
            >
              <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {category.name}
              </span>
            </button>
          );
        }

        return (
          <div key={category.id} className={cardClassName}>
            <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {category.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
