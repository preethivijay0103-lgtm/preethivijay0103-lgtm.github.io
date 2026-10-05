import { PRIVACY_POLICY } from '../content/legal'
import { LegalDocument } from '../components/LegalDocument'
import { ButtonLink, Section } from '../ui'

export function PrivacyPolicy() {
  return (
    <Section
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle="How Lite Weight uses your name, phone number, and order details — aligned with Indian data protection rules."
    >
      <LegalDocument sections={PRIVACY_POLICY} />
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink to="/terms-and-conditions" variant="secondary">Terms and Conditions</ButtonLink>
        <ButtonLink to="/cancellation-policy" variant="secondary">Cancellation Policy</ButtonLink>
      </div>
    </Section>
  )
}
