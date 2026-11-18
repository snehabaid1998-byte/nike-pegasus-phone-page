import stockData from "@/data/pegasus_stock_snapshot_2026-12-08.json";

export type StockStatus = "in_stock" | "low_stock" | "sold_out";

export type SizeEntry = {
  sku: string;
  style_code: string;
  product_name: string;
  colorway: string;
  price: number;
  size_label: string;
  size_us_men: number;
  size_us_women: number;
  size_eu: string;
  display_order: number;
  in_stock: boolean;
  stock_quantity: number;
  stock_status: StockStatus;
  launch_date: string;
};

/** All sizes from the stock JSON, sorted by display_order (1 → 26). */
export const sizes: SizeEntry[] = [...(stockData as SizeEntry[])].sort(
  (a, b) => a.display_order - b.display_order,
);

/**
 * The stock state used by the page. It comes from stock_status. If in_stock
 * ever disagrees and says false, the size is treated as sold out (plan, section 6).
 */
export function effectiveStatus(size: SizeEntry): StockStatus {
  return size.in_stock ? size.stock_status : "sold_out";
}

/** Full label for screen readers and the selection line, e.g. "M 10.5 / W 12 · EU 44.5". */
export function fullLabel(size: SizeEntry): string {
  return `${size.size_label} · EU ${size.size_eu}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-12-10" → "10 Dec". Built by hand so the server and browser give the same text. */
export function shortLaunchDate(launchDate: string): string {
  const [, month, day] = launchDate.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]}`;
}

/**
 * Launch moment: 00:00 on launch_date in the shopper's local time.
 * TODO: launch_date has no time or time zone. 00:00 local is a guess from the
 * plan (question 5). Confirm it, and move the check to the server if needed.
 */
export function launchMoment(launchDate: string): Date {
  const [year, month, day] = launchDate.split("-").map(Number);
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}
