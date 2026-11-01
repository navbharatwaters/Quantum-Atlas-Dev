/** Contact page + form copy. contact.en.ts and contact.ru.ts must both satisfy this. */
export interface ContactContent {
  eyebrow: string
  heading: string
  intro: string
  bullets: string[]
  direct: {
    label: string
    /** Optional extra line under the contact details (e.g. response time in EN, delivery note in RU). */
    note: string
  }
  form: {
    name: string
    namePlaceholder: string
    company: string
    companyPlaceholder: string
    email: string
    emailPlaceholder: string
    phone: string
    phonePlaceholder: string
    service: string
    servicePlaceholder: string
    services: { value: string; label: string }[]
    message: string
    messagePlaceholder: string
    submit: string
    submitting: string
    footnote: string
    successTitle: string
    successBody: string
    errorGeneric: string
    validation: {
      name: string
      company: string
      email: string
      service: string
      message: string
    }
  }
}
