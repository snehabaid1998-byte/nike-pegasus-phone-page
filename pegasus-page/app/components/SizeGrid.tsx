"use client";

import { effectiveStatus, fullLabel, type SizeEntry } from "@/lib/stock";

type SizeGridProps = {
  sizes: SizeEntry[];
  selectedSku: string | null;
  onSelect: (sku: string) => void;
  showError: boolean;
  labelledBy: string;
};

/**
 * Plan Option 1: 5 buttons per row, each 62 x 64 px, 8 px gaps.
 * Inside the 16 px side padding of the Sizes section:
 * 16 + (5 x 62) + (4 x 8) + 16 = 374 px.
 *
 * Every size keeps its own display_order position. Sold-out sizes are greyed
 * out in place, never hidden or moved, and stay tappable for "Notify me".
 */
export default function SizeGrid({ sizes, selectedSku, onSelect, showError, labelledBy }: SizeGridProps) {
  return (
    <div
      role="group"
      aria-labelledby={labelledBy}
      data-testid="size-grid"
      className={`grid grid-cols-[repeat(5,62px)] gap-2 rounded-[4px] ${
        showError ? "outline-2 outline-offset-2 outline-red-600" : ""
      }`}
    >
      {sizes.map((size) => {
        const status = effectiveStatus(size);
        const selected = size.sku === selectedSku;
        const soldOut = status === "sold_out";
        const lowStock = status === "low_stock";

        const stateText = soldOut ? ", sold out" : lowStock ? `, only ${size.stock_quantity} left` : "";

        return (
          <button
            key={size.sku}
            type="button"
            data-testid={soldOut ? "size-button-sold-out" : "size-button"}
            data-sku={size.sku}
            data-status={status}
            data-display-order={size.display_order}
            aria-pressed={selected}
            aria-label={`${fullLabel(size)}${stateText}`}
            onClick={() => onSelect(size.sku)}
            className={[
              "relative flex h-[64px] w-[62px] flex-col items-center justify-center rounded-[4px] border px-[6px]",
              "text-center leading-4 whitespace-nowrap select-none",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
              soldOut
                ? "border-dashed border-neutral-400 bg-neutral-100 text-neutral-400 sold-out-strike"
                : "border-neutral-300 bg-white text-neutral-900",
              selected ? "shadow-[inset_0_0_0_2px_#111]" : "",
            ].join(" ")}
          >
            <span aria-hidden="true" className="text-[13px] font-medium">
              M {size.size_us_men}
            </span>
            <span aria-hidden="true" className="text-[13px]">
              W {size.size_us_women}
            </span>
            <span aria-hidden="true" className="text-[12px]">
              EU {size.size_eu}
            </span>
            {lowStock && (
              <span
                aria-hidden="true"
                data-testid="low-stock-dot"
                className="absolute top-[5px] right-[5px] h-[6px] w-[6px] rounded-full bg-orange-500"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
