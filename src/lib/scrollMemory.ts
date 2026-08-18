// Remembers where the user was on Home when they navigate away to the
// Projects page, so the "Back" button can restore it exactly rather than
// relying on the browser's own (inconsistent, for pushState navigation)
// scroll restoration.
let savedHomeScrollY: number | null = null;

export function saveHomeScroll() {
  savedHomeScrollY = window.scrollY;
}

export function consumeHomeScroll(): number | null {
  const y = savedHomeScrollY;
  savedHomeScrollY = null;
  return y;
}
