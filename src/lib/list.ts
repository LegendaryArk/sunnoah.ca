export interface NumberedBullet {
  n: string;
  t: string;
}

export function numberBullets(bullets: string[]): NumberedBullet[] {
  return bullets.map((t, i) => ({ n: String(i + 1).padStart(2, "0"), t }));
}

export interface KeyValue {
  k: string;
  v: string;
}

export function toKeyValues(pairs: [string, string][]): KeyValue[] {
  return pairs.map(([k, v]) => ({ k, v }));
}

export interface LabeledLink {
  label: string;
  arrow: string;
}

export function toLinks(pairs: [string, string][]): LabeledLink[] {
  return pairs.map(([label, arrow]) => ({ label, arrow }));
}
