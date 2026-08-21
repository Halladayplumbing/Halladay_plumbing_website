"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/data/faqs";
import { cn } from "@/lib/utils";

export function FAQAccordion({ faqs, title = "Frequently Asked Questions" }: { faqs: FAQ[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="container-page mx-auto max-w-3xl">
        <h2 className="text-section-title font-extrabold text-ink">{title}</h2>
        <div className="mt-8 divide-y divide-border rounded-lg border border-border bg-background">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink hover:bg-surface"
                  >
                    {faq.question}
                    <ChevronDown
                      className={cn("h-5 w-5 shrink-0 text-ink-muted transition-transform duration-200", open && "rotate-180")}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn("grid overflow-hidden transition-all duration-200", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
                >
                  <div className="overflow-hidden px-5 pb-4 text-sm text-ink-muted">{faq.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
