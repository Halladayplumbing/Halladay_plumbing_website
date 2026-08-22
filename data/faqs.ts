// FAQ content, grouped by key so pages can pull the relevant set.
// Answers stick to general, verifiable-by-nature information (how hard
// water works, what a water softener does, general process) and avoid
// any specific unverified business claims (hours, pricing, licensing,
// response times) per the no-fabrication policy in data/business.ts.

export interface FAQ {
  question: string;
  answer: string;
}

export const faqGroups: Record<string, FAQ[]> = {
  homepage: [
    {
      question: "What plumbing services does Halladay Plumbing offer?",
      answer:
        "Halladay Plumbing handles residential and commercial plumbing throughout Cedar City and Southern Utah, including plumbing repair, leak repair, drain cleaning, water heater repair and installation, tankless water heaters, water softener installation, water treatment, and plumbing maintenance.",
    },
    {
      question: "Does Halladay offer emergency plumbing?",
      answer:
        "Yes. For burst pipes, active leaks, sewer backups, and other urgent issues, call Halladay Plumbing directly so we can get details about your situation and respond appropriately.",
    },
    {
      question: "Do you install water softeners?",
      answer:
        "Yes, water softener installation is one of our core services. We evaluate your home's water and recommend a system suited to it.",
    },
    {
      question: "Does Cedar City have hard water?",
      answer:
        "Hard water — water with a higher mineral content — is common in Southern Utah. Many homeowners in the area notice mineral buildup on fixtures and appliances, which is why water softeners are a frequent request.",
    },
    {
      question: "Do you install tankless water heaters?",
      answer:
        "Yes, we install tankless water heaters for homeowners who want continuous hot water or want to free up the space a traditional tank uses.",
    },
    {
      question: "Do you provide commercial plumbing?",
      answer:
        "Yes, Halladay Plumbing provides commercial plumbing repairs, maintenance, and installations for Southern Utah businesses.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "Halladay Plumbing is based in Cedar City and serves the surrounding Southern Utah area. See our service areas page for confirmed locations.",
    },
    {
      question: "How do I schedule service?",
      answer:
        "Call Halladay Plumbing directly or use the Schedule Service form on this site. We'll ask a few questions about the job so we're prepared before we contact you.",
    },
  ],
  "water-softeners": [
    {
      question: "Does Cedar City have hard water?",
      answer:
        "Hard water is common throughout Southern Utah. It contains higher levels of dissolved minerals like calcium and magnesium, which can build up in plumbing, fixtures, and appliances over time.",
    },
    {
      question: "What does a water softener do?",
      answer:
        "A water softener treats water as it enters your home, reducing the minerals that cause scale buildup, spotting, and reduced soap effectiveness.",
    },
    {
      question: "How can hard water affect appliances?",
      answer:
        "Mineral buildup from hard water can accumulate inside water-using appliances and fixtures over time, which is why many homeowners look to treat their water before problems develop.",
    },
    {
      question: "Does a water softener help protect a water heater?",
      answer:
        "Reducing mineral content in your water can help reduce the scale buildup that accumulates inside a water heater over time.",
    },
    {
      question: "How often do I add salt?",
      answer:
        "Salt refill frequency depends on your household's water usage and the system installed. We'll walk you through your specific system's maintenance needs at installation.",
    },
    {
      question: "Where is the system installed?",
      answer:
        "Water softeners are typically installed near your home's main water line, often in a garage, basement, or utility area, so all water entering the home is treated.",
    },
    {
      question: "How much maintenance is required?",
      answer:
        "Water softeners generally require periodic salt refills and occasional system checks. We'll explain the maintenance schedule for your specific system.",
    },
    {
      question: "What size softener does my home need?",
      answer:
        "System sizing depends on your household size, water usage, and water hardness. We evaluate this during our in-home assessment.",
    },
    {
      question: "Should I replace my existing water softener?",
      answer:
        "It depends on the age and condition of your current system. We can evaluate your existing softener and let you know whether repair or replacement makes more sense.",
    },
  ],
  "plumbing-repair": [
    {
      question: "How do I know if a plumbing problem needs a professional?",
      answer:
        "A slow drip, a running toilet, or a fixture that's harder to operate than it should be are all worth having looked at — small issues like these tend to get more expensive to fix the longer they're left alone.",
    },
    {
      question: "Can you diagnose a problem before recommending a repair?",
      answer:
        "Yes. We inspect the fixture or line first to identify the actual cause, then explain the recommended repair before any work begins.",
    },
    {
      question: "Do you repair both fixtures and pipes?",
      answer:
        "Yes, we handle general plumbing repairs across fixtures, supply lines, and drain lines for residential and commercial properties.",
    },
    {
      question: "What if the repair reveals a bigger issue?",
      answer:
        "We'll explain what we find and walk through your options before doing any additional work — no surprise repairs without your sign-off.",
    },
  ],
  "water-heaters": [
    {
      question: "How do I know if I need a repair or a replacement?",
      answer:
        "It depends on the age of your unit, the type of problem, and the cost of repair versus replacement. We'll diagnose the issue and walk you through your options.",
    },
    {
      question: "How long do water heaters typically last?",
      answer:
        "Lifespan varies by unit type, water quality, and maintenance history. Units showing age-related issues are often worth evaluating for replacement.",
    },
    {
      question: "What's the difference between tank and tankless water heaters?",
      answer:
        "A tank water heater stores and continuously heats a reservoir of hot water. A tankless unit heats water on demand as it flows through, which can save space and provide continuous hot water.",
    },
    {
      question: "Can hard water affect my water heater?",
      answer:
        "Mineral buildup from hard water can accumulate inside a water heater over time, which is one reason water treatment is often considered alongside water heater service.",
    },
  ],
  "drain-cleaning": [
    {
      question: "What causes a clogged drain?",
      answer:
        "Common causes include grease buildup, hair, soap residue, mineral scale, and foreign objects. Recurring clogs can also point to a deeper line issue.",
    },
    {
      question: "How is a drain cleared?",
      answer:
        "Depending on the clog, we use methods such as drain snaking or other professional-grade drain cleaning equipment to clear the line.",
    },
    {
      question: "What if the clog keeps coming back?",
      answer:
        "A recurring clog often signals a problem further down the line. We can evaluate the line to determine the underlying cause.",
    },
    {
      question: "Is a main-line backup an emergency?",
      answer:
        "A backed-up main line affecting multiple fixtures should be treated urgently, since it can lead to water damage. Call us directly if this is happening.",
    },
  ],
  "leak-repair": [
    {
      question: "How urgent is a plumbing leak?",
      answer:
        "It depends on the leak. An actively flowing leak, especially near electrical equipment or a main water line, should be treated as urgent — shut off the water if you safely can and call us.",
    },
    {
      question: "Should I shut off my water if I find a leak?",
      answer:
        "If you can safely access the shutoff valve for the fixture or your main line, shutting off the water can help limit damage while you wait for help.",
    },
    {
      question: "Can a small leak cause real damage?",
      answer:
        "Yes. Even a slow leak can lead to water damage, mold, or structural issues over time, which is why it's worth having leaks addressed promptly.",
    },
  ],
  "commercial-plumbing": [
    {
      question: "What types of commercial properties do you work with?",
      answer:
        "We work with a range of commercial property types, including office, retail, restaurant, multi-family, and other business properties throughout Southern Utah.",
    },
    {
      question: "Can you work around our business hours?",
      answer:
        "Tell us about your operational needs when you request service and we'll work to accommodate your business's schedule where possible.",
    },
    {
      question: "Do you handle both repairs and maintenance?",
      answer:
        "Yes, we handle commercial plumbing repairs, maintenance, and installations.",
    },
  ],
  "emergency-plumbing": [
    {
      question: "What counts as a plumbing emergency?",
      answer:
        "Situations like burst pipes, active leaks, sewer backups, overflowing fixtures, and water heater leaks are all considered plumbing emergencies.",
    },
    {
      question: "What should I do while I wait for help?",
      answer:
        "If it's safe to do so, shut off the water at the affected fixture or your main line, move valuables away from the water, and avoid contact with any affected electrical equipment. Then call us.",
    },
    {
      question: "Should I call or fill out the form for an emergency?",
      answer:
        "For an active emergency, calling is the fastest way to reach us. The emergency request form is available if you're unable to call.",
    },
  ],
  "plumbing-maintenance": [
    {
      question: "What does plumbing maintenance include?",
      answer:
        "Maintenance can include inspecting fixtures and connections, checking water heater condition, evaluating water softener performance, and identifying small issues before they become bigger problems. Specific plan inclusions are confirmed at signup.",
    },
    {
      question: "How often should plumbing be inspected?",
      answer:
        "Routine inspection schedules vary by home and system age. We can recommend a schedule based on your home's plumbing.",
    },
  ],
  "new-construction": [
    {
      question: "Do you work with builders and general contractors?",
      answer:
        "Yes. New construction is a dedicated line of work for us, separate from residential repair and service calls, so builder and GC projects get their own scheduling and point of contact.",
    },
    {
      question: "What stages of a project do you handle?",
      answer:
        "We can come in as early as pre-construction planning through rough-in, and back again for finish and trim-out once the home is ready.",
    },
    {
      question: "Can you plumb for a water softener during rough-in?",
      answer:
        "Yes, planning for a water softener or water treatment system during rough-in is common and straightforward to coordinate.",
    },
    {
      question: "How do I get in touch about a new build?",
      answer:
        "Call our new construction line directly or use the new construction request form so we have your project details before we follow up.",
    },
  ],
};

export function getFaqsFor(key: string): FAQ[] {
  return faqGroups[key] ?? [];
}
