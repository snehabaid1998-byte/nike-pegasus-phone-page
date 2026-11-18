"use client";

import { useEffect, useRef, useState } from "react";
import SizeGrid from "./SizeGrid";
import {
  effectiveStatus,
  fullLabel,
  launchMoment,
  shortLaunchDate,
  type SizeEntry,
  type StockStatus,
} from "@/lib/stock";

type Phase =
  | { kind: "idle" }
  | { kind: "adding" }
  | { kind: "added" }
  | { kind: "error"; message: string }
  | { kind: "notify-form" }
  | { kind: "notify-sending" }
  | { kind: "notified" };

type FakeResult = "ok" | "sold_out" | "failed";

/**
 * TODO: there is no backend. This waits a short time, then always succeeds.
 * Replace it with the real Add to bag call. Return "sold_out" if the size sold
 * out after the page loaded, or "failed" for a network or server error. The page
 * already handles both.
 */
function fakeAddToBag(sku: string): Promise<FakeResult> {
  void sku;
  return new Promise((resolve) => setTimeout(() => resolve("ok"), 800));
}

/**
 * TODO: there is no backend. This waits a short time, then always succeeds.
 * Replace it with the real "Notify me" sign-up. How people sign up (email,
 * account or push) is still an open question in the plan (question 10).
 */
function fakeNotifyMe(sku: string, email: string): Promise<FakeResult> {
  void sku;
  void email;
  return new Promise((resolve) => setTimeout(() => resolve("ok"), 800));
}

export default function SizePicker({ sizes }: { sizes: SizeEntry[] }) {
  const launchDate = sizes[0]?.launch_date ?? "";
  const [launched, setLaunched] = useState(false);
  const [selectedSku, setSelectedSku] = useState<string | null>(null);
  const [soldOutSinceLoad, setSoldOutSinceLoad] = useState<Set<string>>(new Set());
  const [showSelectError, setShowSelectError] = useState(false);
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const [email, setEmail] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The launch check runs in the browser, so a page built before 10 Dec still
  // switches to "Add to bag" on the day. The page starts in the pre-launch state.
  // "?preview=after-launch" shows the after-launch state, for checking only.
  useEffect(() => {
    if (!launchDate) return;
    const preview = new URLSearchParams(window.location.search).get("preview");
    const check = () => setLaunched(preview === "after-launch" || Date.now() >= launchMoment(launchDate).getTime());
    check();
    const timer = setInterval(check, 60_000);
    return () => clearInterval(timer);
  }, [launchDate]);

  useEffect(() => () => {
    if (addedTimer.current) clearTimeout(addedTimer.current);
  }, []);

  // A size that sold out after the page loaded is greyed out in the same place.
  const liveSizes: SizeEntry[] = sizes.map((s) =>
    soldOutSinceLoad.has(s.sku) ? { ...s, stock_status: "sold_out" as StockStatus, in_stock: false, stock_quantity: 0 } : s,
  );
  const selected = liveSizes.find((s) => s.sku === selectedSku) ?? null;
  const selectedStatus = selected ? effectiveStatus(selected) : null;
  const notifyMode = !launched || selectedStatus === "sold_out";
  const busy = phase.kind === "adding" || phase.kind === "notify-sending";

  const mainLabel = !launched
    ? `Notify me · Launches ${shortLaunchDate(launchDate)}`
    : selectedStatus === "sold_out"
      ? "Notify me"
      : "Add to bag";

  function handleSelect(sku: string) {
    setSelectedSku(sku);
    setShowSelectError(false);
    setPhase({ kind: "idle" });
  }

  async function handleMain() {
    if (busy) return;
    if (!selected) {
      setShowSelectError(true);
      headingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (notifyMode) {
      setPhase({ kind: "notify-form" });
      return;
    }
    setPhase({ kind: "adding" });
    const result = await fakeAddToBag(selected.sku);
    if (result === "ok") {
      setPhase({ kind: "added" });
      if (addedTimer.current) clearTimeout(addedTimer.current);
      addedTimer.current = setTimeout(() => setPhase({ kind: "idle" }), 2000);
    } else if (result === "sold_out") {
      setSoldOutSinceLoad((prev) => new Set(prev).add(selected.sku));
      setPhase({ kind: "error", message: "Sorry, that size just sold out." });
    } else {
      setPhase({ kind: "error", message: "Couldn't add to bag. Try again." });
    }
  }

  async function handleNotifySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || busy) return;
    setPhase({ kind: "notify-sending" });
    const result = await fakeNotifyMe(selected.sku, email);
    setPhase(result === "ok" ? { kind: "notified" } : { kind: "error", message: "Couldn't sign you up. Try again." });
  }

  if (liveSizes.length === 0) {
    return (
      <section aria-labelledby="sizes-heading" className="px-4 pt-6 pb-6">
        <h2 id="sizes-heading" className="text-base leading-6 font-semibold">
          Select size
        </h2>
        <p className="mt-3 text-sm leading-5 text-neutral-600">No sizes available</p>
        <div className="py-3">
          <button type="button" disabled className="h-14 w-full rounded-full bg-neutral-300 text-base font-medium text-neutral-600">
            {mainLabel}
          </button>
        </div>
      </section>
    );
  }

  const selectionText = selected
    ? `${fullLabel(selected)}${
        selectedStatus === "sold_out"
          ? " · Sold out"
          : selectedStatus === "low_stock"
            ? ` · Only ${selected.stock_quantity} left`
            : ""
      }`
    : "";

  return (
    <section aria-labelledby="sizes-heading" data-testid="sizes-section" className="px-4 pt-6">
      <div className="flex h-6 items-center justify-between">
        <h2 id="sizes-heading" ref={headingRef} className="scroll-mt-4 text-base leading-6 font-semibold">
          Select size
        </h2>
        {showSelectError && (
          <p role="alert" className="text-sm leading-6 font-medium text-red-600">
            Select a size
          </p>
        )}
      </div>

      <div className="mt-3">
        <SizeGrid
          sizes={liveSizes}
          selectedSku={selectedSku}
          onSelect={handleSelect}
          showError={showSelectError}
          labelledBy="sizes-heading"
        />
      </div>

      <p data-testid="selection-line" aria-live="polite" className="mt-2 h-5 truncate text-sm leading-5 text-neutral-700">
        {selectionText}
      </p>

      {/* Plan Option B: directly under the size buttons, and sticky at the bottom
          of the screen while the Sizes section is in view. 12 + 56 + 12 = 80 px. */}
      <div data-testid="main-button-bar" className="sticky bottom-0 z-10 -mx-4 bg-white px-4 py-3">
        <button
          type="button"
          data-testid="main-button"
          onClick={handleMain}
          aria-busy={busy}
          className={`flex h-14 w-full items-center justify-center gap-2 rounded-full text-base font-medium text-white ${
            busy ? "bg-neutral-700" : "bg-neutral-900 active:bg-neutral-700"
          }`}
        >
          {phase.kind === "adding" ? (
            <>
              <span aria-hidden="true" className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              <span className="sr-only">Adding to bag</span>
            </>
          ) : phase.kind === "added" ? (
            "Added to bag ✓"
          ) : (
            mainLabel
          )}
        </button>

        <div aria-live="polite">
          {phase.kind === "added" && (
            <p className="mt-2 text-center text-sm leading-5">
              {/* TODO: no bag page exists yet. Point this at the real bag. */}
              <a href="#" className="inline-flex min-h-11 items-center underline">
                View bag
              </a>
            </p>
          )}

          {phase.kind === "error" && (
            <p role="alert" className="mt-2 text-sm leading-5 font-medium text-red-600">
              {phase.message}
            </p>
          )}

          {(phase.kind === "notify-form" || phase.kind === "notify-sending") && selected && (
            <form onSubmit={handleNotifySubmit} className="mt-3 flex gap-2">
              <label htmlFor="notify-email" className="sr-only">
                Email for {fullLabel(selected)}
              </label>
              <input
                id="notify-email"
                type="email"
                required
                autoComplete="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 min-w-0 flex-1 rounded-[4px] border border-neutral-400 px-3 text-base"
              />
              <button
                type="submit"
                disabled={phase.kind === "notify-sending"}
                className="h-11 shrink-0 rounded-[4px] bg-neutral-900 px-4 text-sm font-medium text-white disabled:bg-neutral-600"
              >
                {phase.kind === "notify-sending" ? "Sending…" : "Notify me"}
              </button>
            </form>
          )}

          {phase.kind === "notified" && (
            <p className="mt-2 text-sm leading-5 text-neutral-800">We&apos;ll email you.</p>
          )}
        </div>
      </div>
    </section>
  );
}
