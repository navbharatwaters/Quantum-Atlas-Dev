/** About page copy. about.en.ts and about.ru.ts must both satisfy this. */
export interface AboutContent {
  hero: { heading: string; body: string }
  philosophy: { eyebrow: string; pillars: { title: string; body: string }[] }
  proof: {
    eyebrow: string
    heading: string
    items: { system: string; description: string; status: string }[]
  }
  founders: {
    eyebrow: string
    founder: { initial: string; name: string; role: string; bio: string }
  }
  group: { eyebrow: string; body: string }
  cta: { heading: string; body: string; button: string }
}
