// Unique long-form content for each standard organic service page, keyed
// by service id. Rendered by components/templates/ServicePageTemplate.tsx.
// Water Softeners, Emergency Plumbing, and the Cedar City service-area
// page use their own dedicated page components/templates instead, since
// they warrant a different structure — this file covers the remaining
// organic service pages so each still gets genuinely unique copy rather
// than one template with names swapped.

export interface ServicePageContent {
  serviceId: string;
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImageLabel: string;
  problemHeadline: string;
  problemBody: string;
  symptoms: string[];
  explanationHeadline: string;
  explanationBody: string[];
  benefits: string[];
  processSteps: string[];
  faqKey: string;
  primaryCtaLabel: string;
}

export const servicePageContent: Record<string, ServicePageContent> = {
  "plumbing-repair": {
    serviceId: "plumbing-repair",
    metaTitle: "Plumbing Repair in Cedar City, UT",
    metaDescription:
      "Halladay Plumbing diagnoses and repairs plumbing problems throughout Cedar City and Southern Utah — fixtures, pipes, and everyday plumbing issues.",
    heroEyebrow: "Cedar City Plumbing Repair",
    heroHeadline: "Get Your Plumbing Problem Diagnosed and Fixed",
    heroSubheadline:
      "From a dripping faucet to a bigger repair, Halladay Plumbing figures out what's wrong and fixes it right the first time.",
    heroImageLabel: "Plumber repairing a fixture in a Cedar City home",
    problemHeadline: "When Something in Your Plumbing Isn't Working Right",
    problemBody:
      "Plumbing problems rarely announce themselves clearly. A running toilet, a faucet that won't shut off all the way, a fixture that's suddenly loud, or a slow drip under the sink can all point to different underlying issues. Left alone, small plumbing problems tend to get more expensive to fix.",
    symptoms: [
      "Dripping or leaking faucets",
      "Running or constantly cycling toilets",
      "Low water pressure at a fixture",
      "Noisy pipes",
      "Fixtures that won't fully shut off",
      "Visible pipe corrosion or wear",
    ],
    explanationHeadline: "How We Approach a Repair",
    explanationBody: [
      "We start by understanding what you're experiencing, then inspect the affected fixture or line to identify the actual cause rather than just treating the symptom.",
      "Once we know what's going on, we explain the recommended repair in plain language before any work begins.",
    ],
    benefits: [
      "A clear diagnosis before any work begins",
      "Repairs suited to your home's actual plumbing",
      "Straightforward explanations of what was fixed",
    ],
    processSteps: [
      "Describe the problem when you contact us",
      "We inspect and diagnose the issue on site",
      "We explain the recommended repair and complete the work",
    ],
    faqKey: "plumbing-repair",
    primaryCtaLabel: "Schedule Plumbing Service",
  },
  "water-heaters": {
    serviceId: "water-heaters",
    metaTitle: "Water Heater Repair & Installation in Cedar City, UT",
    metaDescription:
      "Water heater repair, replacement, and installation in Cedar City and Southern Utah. Halladay Plumbing restores reliable hot water for gas, electric, and tankless units.",
    heroEyebrow: "Cedar City Water Heaters",
    heroHeadline: "Restore Reliable Hot Water",
    heroSubheadline:
      "Repair, replacement, or new installation — Halladay Plumbing diagnoses the problem and gets your hot water working the way it should.",
    heroImageLabel: "Water heater installation in a residential mechanical room",
    problemHeadline: "Water Heater Acting Up?",
    problemBody:
      "No hot water, water that doesn't stay hot, strange noises, or a unit that's visibly leaking are all signs your water heater needs attention. The right fix depends on the type of unit, its age, and what's actually happening.",
    symptoms: [
      "No hot water at all",
      "Not enough hot water for the household",
      "Water temperature fluctuates",
      "Leaking around the base of the unit",
      "Rumbling, popping, or banging noises",
      "Discolored or rusty-smelling water",
    ],
    explanationHeadline: "Repair or Replace?",
    explanationBody: [
      "Whether repair or replacement makes more sense depends on your unit's age, the type of problem, and the cost of fixing it versus replacing it. We'll walk you through the tradeoffs so you can make an informed call.",
      "If you're considering a switch to tankless, we can also explain how that option compares for your household.",
    ],
    benefits: [
      "Diagnosis before any repair or replacement recommendation",
      "Options explained for gas, electric, and tankless units",
      "Installation completed and explained clearly",
    ],
    processSteps: [
      "Tell us what your water heater is doing",
      "We diagnose the unit and walk through your options",
      "We complete the repair or installation",
    ],
    faqKey: "water-heaters",
    primaryCtaLabel: "Get My Water Heater Fixed",
  },
  "tankless-water-heaters": {
    serviceId: "tankless-water-heaters",
    metaTitle: "Tankless Water Heater Installation in Cedar City, UT",
    metaDescription:
      "Halladay Plumbing installs tankless water heaters for Cedar City homes that want continuous hot water and more space where a tank used to sit.",
    heroEyebrow: "Cedar City Tankless Water Heaters",
    heroHeadline: "Upgrade to On-Demand Hot Water",
    heroSubheadline:
      "A tankless water heater heats water as you use it instead of storing and continuously heating a full tank.",
    heroImageLabel: "Tankless water heater mounted on an interior wall",
    problemHeadline: "Running Out of Hot Water or Out of Space?",
    problemBody:
      "A traditional tank water heater stores a set amount of hot water — once it's used, you wait for it to reheat. A tankless unit heats water on demand, and its smaller footprint frees up the space a tank takes up.",
    symptoms: [
      "Running out of hot water with multiple showers back to back",
      "Wanting to free up closet, garage, or utility space",
      "Replacing an aging tank water heater",
      "Interested in a more space-efficient hot water setup",
    ],
    explanationHeadline: "Is Tankless Right for Your Home?",
    explanationBody: [
      "Tankless systems work differently than tank units, and switching involves evaluating your home's gas or electric supply, water usage, and installation requirements.",
      "We'll assess your home and walk you through whether a tankless system is a good fit before recommending it.",
    ],
    benefits: [
      "Continuous hot water instead of a limited tank supply",
      "Reclaimed space where a tank used to sit",
      "Installation sized to your household's usage",
    ],
    processSteps: [
      "Tell us about your current setup and goals",
      "We evaluate your home's requirements",
      "We install and configure the tankless unit",
    ],
    faqKey: "water-heaters",
    primaryCtaLabel: "Get My Water Heater Fixed",
  },
  "drain-cleaning": {
    serviceId: "drain-cleaning",
    metaTitle: "Drain Cleaning in Cedar City, UT",
    metaDescription:
      "Halladay Plumbing clears clogged drains throughout Cedar City and Southern Utah — from a single slow drain to a backed-up main line.",
    heroEyebrow: "Cedar City Drain Cleaning",
    heroHeadline: "Clear the Clog and Get Your Drains Moving Again",
    heroSubheadline:
      "From a single slow drain to a backed-up main line, Halladay Plumbing clears it so your plumbing flows the way it should.",
    heroImageLabel: "Plumber clearing a residential drain line",
    problemHeadline: "Slow, Clogged, or Backed-Up Drain?",
    problemBody:
      "Drains slow down or clog for a range of reasons — grease and soap buildup, hair, mineral scale, or a problem further down the line. A clog that keeps coming back usually points to something beyond what a store-bought drain cleaner can fix.",
    symptoms: [
      "Slow-draining sink, tub, or shower",
      "Gurgling sounds from drains",
      "Toilet that backs up or drains slowly",
      "Multiple fixtures clogging at once",
      "Recurring clogs in the same drain",
      "Unpleasant odor coming from a drain",
    ],
    explanationHeadline: "How We Clear a Drain",
    explanationBody: [
      "We identify where the clog is and use the appropriate method — typically drain snaking or other professional drain-clearing equipment — to clear the line.",
      "If a clog keeps recurring, we'll look further down the line to identify what's actually causing it.",
    ],
    benefits: [
      "Clogs cleared at the source, not just pushed through",
      "Multiple fixtures and main-line clogs both handled",
      "Straightforward explanation of what caused the clog",
    ],
    processSteps: [
      "Tell us which drain is affected and what's happening",
      "We locate and clear the clog",
      "We explain what caused it and how to avoid a repeat",
    ],
    faqKey: "drain-cleaning",
    primaryCtaLabel: "Clear My Drain",
  },
  "leak-repair": {
    serviceId: "leak-repair",
    metaTitle: "Leak Repair in Cedar City, UT",
    metaDescription:
      "Halladay Plumbing finds and repairs active plumbing leaks throughout Cedar City and Southern Utah before they cause more damage.",
    heroEyebrow: "Cedar City Leak Repair",
    heroHeadline: "Get the Leak Fixed Before It Causes More Damage",
    heroSubheadline:
      "Halladay Plumbing finds and repairs active leaks — from a dripping pipe under a sink to a leak inside a wall.",
    heroImageLabel: "Plumber repairing a leaking pipe",
    problemHeadline: "Found a Leak — Now What?",
    problemBody:
      "A leak doesn't have to be dramatic to cause real damage. A slow drip under a cabinet, a damp spot on a ceiling, or a wet patch in the yard can all point to a leak that's been going on for a while.",
    symptoms: [
      "Visible dripping or pooling water",
      "Damp spots on walls, ceilings, or floors",
      "Unexplained increase in your water usage",
      "Musty odor or mold near plumbing",
      "Warm spot on the floor (possible water heater or line leak)",
      "Sound of running water with fixtures off",
    ],
    explanationHeadline: "Finding the Source",
    explanationBody: [
      "Some leaks are obvious; others are hidden behind walls, under floors, or underground. We track down where the water is actually coming from before repairing it, so the fix addresses the real problem.",
      "If the leak is active, shutting off the water at the fixture or the main line — if you can safely do so — helps limit damage while you wait.",
    ],
    benefits: [
      "The actual source of the leak identified, not just the visible symptom",
      "Repairs aimed at preventing repeat leaks",
      "Guidance on shutting off water safely if needed",
    ],
    processSteps: [
      "Tell us where you're seeing water and what's happening",
      "We locate the source of the leak",
      "We repair it and explain what caused it",
    ],
    faqKey: "leak-repair",
    primaryCtaLabel: "Get My Leak Fixed",
  },
  "commercial-plumbing": {
    serviceId: "commercial-plumbing",
    metaTitle: "Commercial Plumbing in Cedar City & Southern Utah",
    metaDescription:
      "Halladay Plumbing provides commercial plumbing repairs, maintenance, and installations for Southern Utah businesses.",
    heroEyebrow: "Southern Utah Commercial Plumbing",
    heroHeadline: "Keep Your Business Running With Plumbing That Works",
    heroSubheadline:
      "Halladay Plumbing provides repairs, maintenance, and installations for offices, retail, restaurants, and other Southern Utah businesses.",
    heroImageLabel: "Commercial plumbing work at a Southern Utah business",
    problemHeadline: "Plumbing Problems Don't Wait for a Convenient Time",
    problemBody:
      "A leak, clog, or fixture failure at a commercial property can affect customers, staff, and operations. We work to understand your business's needs and respond accordingly.",
    symptoms: [
      "Fixture or line repairs needed",
      "Recurring drain or sewer issues",
      "Water heater problems affecting operations",
      "Plumbing needs for a remodel or buildout",
      "Routine maintenance overdue",
    ],
    explanationHeadline: "Working With Your Business",
    explanationBody: [
      "We ask about how your business operates and what's affected before recommending a plan, so the work fits your schedule and property as much as possible.",
      "From single repairs to ongoing maintenance, we aim to keep small issues from becoming operational problems.",
    ],
    benefits: [
      "Repairs, maintenance, and installation from one plumbing team",
      "Communication aimed at minimizing disruption to your business",
      "Straightforward recommendations for your property",
    ],
    processSteps: [
      "Tell us about your property and the issue",
      "We evaluate and recommend a plan",
      "We complete the work with your operations in mind",
    ],
    faqKey: "commercial-plumbing",
    primaryCtaLabel: "Request Commercial Service",
  },
  "plumbing-maintenance": {
    serviceId: "plumbing-maintenance",
    metaTitle: "Plumbing Maintenance in Cedar City, UT",
    metaDescription:
      "Routine plumbing maintenance for Cedar City and Southern Utah homes — catch small plumbing problems before they become expensive ones.",
    heroEyebrow: "Cedar City Plumbing Maintenance",
    heroHeadline: "Catch Small Problems Before They Become Expensive Ones",
    heroSubheadline:
      "Routine plumbing maintenance helps you stay ahead of leaks, water heater issues, and hard-water buildup.",
    heroImageLabel: "Plumber performing routine maintenance on home plumbing",
    problemHeadline: "Plumbing Problems Are Easier to Prevent Than Fix",
    problemBody:
      "Many plumbing failures — a burst supply line, a failed water heater, a hidden slow leak — show warning signs beforehand. Routine maintenance is a chance to catch those signs early.",
    symptoms: [
      "Aging water heater that hasn't been inspected recently",
      "Water softener that hasn't been serviced",
      "Fixtures or supply lines showing wear",
      "No recent plumbing inspection",
    ],
    explanationHeadline: "What Maintenance Can Cover",
    explanationBody: [
      "Maintenance visits can include inspecting fixtures and connections, checking your water heater's condition, and evaluating your water softener's performance — the specifics depend on your home and system age.",
      "Contact us to discuss what makes sense for your home.",
    ],
    benefits: [
      "Small issues caught before they become bigger repairs",
      "A clearer picture of your plumbing system's condition",
      "Peace of mind between visits",
    ],
    processSteps: [
      "Tell us about your home's plumbing and systems",
      "We inspect and identify any developing issues",
      "We explain findings and recommend next steps",
    ],
    faqKey: "plumbing-maintenance",
    primaryCtaLabel: "Schedule Plumbing Service",
  },
  "water-treatment": {
    serviceId: "water-treatment",
    metaTitle: "Water Treatment in Cedar City, UT",
    metaDescription:
      "Halladay Plumbing installs water treatment systems to improve water quality throughout Cedar City and Southern Utah homes.",
    heroEyebrow: "Cedar City Water Treatment",
    heroHeadline: "Improve the Water Quality Throughout Your Home",
    heroSubheadline:
      "Beyond softening, water treatment systems can address a range of water quality concerns for your home.",
    heroImageLabel: "Water treatment system installed in a home mechanical room",
    problemHeadline: "Concerned About Your Water Quality?",
    problemBody:
      "Water quality concerns vary by home and water source. Evaluating what's actually in your water is the first step to recommending the right treatment approach.",
    symptoms: [
      "Water that tastes or smells different than expected",
      "Visible sediment in water",
      "Concerns about mineral content",
      "General interest in improving water quality",
    ],
    explanationHeadline: "Finding the Right System",
    explanationBody: [
      "We evaluate your home's water and talk through what treatment options make sense for your specific concerns.",
      "This often works alongside water softening as part of a broader water treatment approach.",
    ],
    benefits: [
      "Treatment matched to your home's actual water",
      "Explained in plain terms before installation",
      "Can be paired with water softening",
    ],
    processSteps: [
      "Tell us about your water quality concerns",
      "We evaluate your home's water",
      "We recommend and install the right system",
    ],
    faqKey: "water-heaters",
    primaryCtaLabel: "Schedule Plumbing Service",
  },
  "water-softeners": {
    serviceId: "water-softeners",
    metaTitle: "Water Softener Installation in Cedar City, UT",
    metaDescription:
      "Whole-house water softener installation for Cedar City and Southern Utah homes. Protect fixtures, appliances, and your plumbing from hard water.",
    heroEyebrow: "Cedar City Water Softener Installation",
    heroHeadline: "Protect Your Home From Southern Utah's Hard Water",
    heroSubheadline:
      "Halladay Plumbing installs whole-house water softener systems for Cedar City homes. Tell us about your home and get a personalized estimate.",
    heroImageLabel: "Water softener system installed in a Cedar City home mechanical room",
    problemHeadline: "Noticing Signs of Hard Water?",
    problemBody:
      "Hard water is common throughout Southern Utah. Over time, the minerals it carries build up in pipes, fixtures, and appliances — showing up as scale, spotting, and reduced soap effectiveness.",
    symptoms: [
      "White mineral buildup on fixtures",
      "Spots on dishes and glassware",
      "Scale around faucets and showerheads",
      "Buildup inside water-using appliances",
      "Water feels hard or leaves residue",
      "Wanting to protect a new water heater or fixtures",
    ],
    explanationHeadline: "How a Water Softener Helps",
    explanationBody: [
      "A whole-house water softener treats water as it enters your home, reducing the minerals responsible for hard-water buildup before they reach your fixtures and appliances.",
      "We evaluate your home's water and size a system to match your household's usage.",
    ],
    benefits: [
      "Reduce mineral scale throughout your plumbing",
      "Help protect fixtures and appliances",
      "Improve how well soap and detergent work",
      "Reduce hard-water residue and cleaning",
    ],
    processSteps: [
      "Evaluate your water and home's requirements",
      "Recommend a system sized for your household",
      "Install, configure, and explain the system",
    ],
    faqKey: "water-softeners",
    primaryCtaLabel: "Get My Water Softener Estimate",
  },
  "emergency-plumbing": {
    serviceId: "emergency-plumbing",
    metaTitle: "Emergency Plumber in Cedar City, UT",
    metaDescription:
      "Emergency plumbing service for Cedar City and Southern Utah — burst pipes, active leaks, sewer backups, and other urgent plumbing issues.",
    heroEyebrow: "Cedar City Emergency Plumbing",
    heroHeadline: "Urgent Plumbing Help for Cedar City",
    heroSubheadline:
      "Burst pipe, active leak, or sewer backup — call Halladay Plumbing now or request emergency service below.",
    heroImageLabel: "Plumber responding to an urgent residential plumbing call",
    problemHeadline: "Dealing With an Urgent Plumbing Issue?",
    problemBody:
      "Burst pipes, active leaks, sewer backups, and water heater leaks can cause damage quickly. Calling is the fastest way to reach us for anything urgent.",
    symptoms: [
      "Burst or actively leaking pipe",
      "Sewer or major drain backup",
      "Overflowing toilet, tub, or sink",
      "Water heater leak",
      "Loss of water",
    ],
    explanationHeadline: "What Happens Next",
    explanationBody: [
      "Call us directly for the fastest response to an active emergency. If you're unable to call, the request form below gets your information to us.",
      "While you wait, shut off the affected fixture or your main water supply if you can safely do so.",
    ],
    benefits: ["Direct line for urgent situations", "Guidance on limiting damage while you wait", "Straightforward assessment once we arrive"],
    processSteps: ["Call or submit an emergency request", "Tell us what's happening", "We respond to assess and address the issue"],
    faqKey: "emergency-plumbing",
    primaryCtaLabel: "Request Emergency Service",
  },
};

export function getServicePageContent(serviceId: string): ServicePageContent | undefined {
  return servicePageContent[serviceId];
}
