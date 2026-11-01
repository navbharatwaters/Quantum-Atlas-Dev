/**
 * Social profile URLs shown as icons in the footer.
 * OWNER: fill in the full https:// URL of each profile. While a value is an
 * empty string the footer renders that icon as a disabled, non-link placeholder.
 */
export const SOCIAL = {
  linkedin: '',
  facebook: '',
  youtube: '',
  instagram: '',
  x: '',
} as const satisfies Record<string, string>

export type SocialKey = keyof typeof SOCIAL
