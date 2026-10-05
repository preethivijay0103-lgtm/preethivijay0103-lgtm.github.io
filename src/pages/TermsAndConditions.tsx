import { TERMS_AND_CONDITIONS } from '../content/legal'
import { LegalDocument } from '../components/LegalDocument'
import { ButtonLink, Section } from '../ui'

export function TermsAndConditions() {
  return (
    <Section
      eyebrow="Legal"
      title="Terms and Conditions"
      subtitle="Please read before you order. These terms include food safety, pickup, and what to do if you feel unwell after a meal."
    >
      <LegalDocument sections={TERMS_AND_CONDITIONS} />
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink to="/privacy-policy" variant="secondary">Privacy Policy</ButtonLink>
        <ButtonLink to="/cancellation-policy" variant="secondary">Cancellation Policy</ButtonLink>
        <ButtonLink to="/register">Register and order</ButtonLink>
      </div>
    </Section>
  )
}
