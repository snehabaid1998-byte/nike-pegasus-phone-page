import SizePicker from "./components/SizePicker";
import { sizes } from "@/lib/stock";

// TODO: the price has no currency field in the JSON. USD is a guess (plan, question 11).
const priceFormat = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function Page() {
  const product = sizes[0];

  return (
    <main className="mx-auto w-full max-w-[375px] bg-white text-neutral-900">
      {/* 1. Photos. This box is the real photo slot. It is always exactly
          375 x 375 CSS px (width, height and aspect-ratio 1 / 1), so a photo that
          arrives later can never change its height or move the size grid.
          TODO: there are no photos in the JSON yet. When there are, swap the label
          for next/image inside this same box: width={375}, height={375}, priority,
          and a source at least 1125 px wide (375 px x 3 for 3x phone screens). */}
      <section aria-label="Photos">
        <div
          role="img"
          aria-label="Nike Pegasus 43 photo (placeholder)"
          data-testid="main-photo"
          className="flex aspect-square h-[375px] w-[375px] shrink-0 items-center justify-center overflow-hidden bg-neutral-200 text-sm text-neutral-600"
        >
          <span aria-hidden="true">Photo placeholder (375 x 375)</span>
        </div>
      </section>

      {/* 2. Name and price: shown once, all three from the JSON. */}
      <section aria-label="Name and price" data-testid="name-and-price" className="px-4 pt-4">
        <h1 className="text-[22px] leading-7 font-semibold">{product?.product_name}</h1>
        <p className="mt-1 text-sm leading-5 text-neutral-600">{product?.colorway}</p>
        <p data-testid="price" className="mt-2 text-lg leading-6 font-medium">{product ? priceFormat.format(product.price) : ""}</p>
      </section>

      {/* 3. Sizes, with the Add to bag / Notify me button directly under the size buttons. */}
      <SizePicker sizes={sizes} />

      {/* 4. Tech copy. TODO: placeholder, there's no tech copy in the JSON. */}
      <section aria-labelledby="tech-heading" data-testid="tech-copy" className="px-4 pt-6">
        <h2 id="tech-heading" className="text-base leading-6 font-semibold">
          Tech copy
        </h2>
        <p className="mt-2 rounded-[4px] border border-dashed border-neutral-400 p-4 text-sm leading-5 text-neutral-600">
          Tech copy goes here
        </p>
        {product && <p className="mt-2 text-sm leading-5 text-neutral-600">Style: {product.style_code}</p>}
      </section>

      {/* 5. Reviews. TODO: placeholder, there are no reviews in the JSON. */}
      <section aria-labelledby="reviews-heading" data-testid="reviews" className="px-4 pt-6 pb-10">
        <h2 id="reviews-heading" className="text-base leading-6 font-semibold">
          Reviews
        </h2>
        <p className="mt-2 text-sm leading-5 text-neutral-600">No reviews yet</p>
      </section>
    </main>
  );
}
