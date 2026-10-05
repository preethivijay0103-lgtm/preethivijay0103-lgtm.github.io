import { Link } from 'react-router-dom'
import { CANCELLATION_POLICY } from '../content/legal'
import { LegalDocument } from '../components/LegalDocument'
import { ButtonLink, Section } from '../ui'

/** @deprecated Use CANCELLATION_POLICY from ../content/legal */
export const POLICY = CANCELLATION_POLICY.map((section) => ({
  title: section.title,
  text: section.paragraphs.join(' '),
}))

export function Policy() {
  return (
    <Section
      eyebrow="Cancellation policy"
      title="Clear rules, no surprises"
      subtitle="Please read this before you order. You will be asked to accept our Terms, Privacy Policy, and this cancellation policy when you register."
    >
      <LegalDocument sections={CANCELLATION_POLICY} />
      <p className="mt-6 max-w-3xl text-sm text-stone-600">
        Full legal terms (including food safety and illness) are in our{' '}
        <Link to="/terms-and-conditions" className="font-semibold text-leaf-900 underline">
          Terms and Conditions
        </Link>{' '}
        and{' '}
        <Link to="/privacy-policy" className="font-semibold text-leaf-900 underline">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink to="/register">I understand, register and order</ButtonLink>
        <ButtonLink to="/terms-and-conditions" variant="secondary">Terms and Conditions</ButtonLink>
      </div>
    </Section>
  )
}
