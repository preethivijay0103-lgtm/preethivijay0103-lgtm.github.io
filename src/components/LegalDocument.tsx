import type { LegalSection } from '../content/legal'
import { LEGAL_LAST_UPDATED, LEGAL_NOTICE } from '../content/legal'
import { Card } from '../ui'

type Props = {
  sections: LegalSection[]
  showLastUpdated?: boolean
}

export function LegalDocument({ sections, showLastUpdated = true }: Props) {
  return (
    <div className="max-w-3xl space-y-6">
      <p className="rounded-2xl bg-stone-100/80 p-4 text-sm text-stone-600">{LEGAL_NOTICE}</p>
      {showLastUpdated && (
        <p className="text-sm text-stone-500">Last updated: {LEGAL_LAST_UPDATED}</p>
      )}
      <Card className="divide-y divide-stone-100">
        {sections.map((section, index) => (
          <article key={section.id} id={section.id} className="scroll-mt-28 p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold text-leaf-900">{section.title}</h3>
            <div className="mt-3 space-y-3 text-stone-700 leading-relaxed">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul className="list-disc space-y-2 pl-5">
                  {section.bullets.map((item) => (
                    <li key={item.slice(0, 48)}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
            <span className="sr-only">Section {index + 1}</span>
          </article>
        ))}
      </Card>
    </div>
  )
}
