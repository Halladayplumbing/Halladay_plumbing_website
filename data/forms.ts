// Qualification form engine configuration.
//
// Each entry fully describes a multi-step qualification form: its
// questions, option cards, select mode, and the dynamic CTA copy. The
// <QualificationForm /> component (components/forms/QualificationForm.tsx)
// renders any form purely from this data — adding a new service form
// means adding a config object here, not building a new form.

export type StepType = "single-select" | "multi-select" | "contact";

export interface StepOption {
  value: string;
  label: string;
  /** If true, selecting this option surfaces the emergency phone CTA. */
  isEmergencyFlag?: boolean;
}

export interface FormStep {
  id: string;
  type: StepType;
  title: string;
  helpText?: string;
  options?: StepOption[];
  /** Contact steps only: show a "Company / Builder Name" field. */
  showCompanyField?: boolean;
}

export interface QualificationFormConfig {
  id: string;
  serviceId: string;
  formName: string;
  ctaText: string; // dynamic final CTA, e.g. "Get My Water Softener Estimate"
  leadType: string;
  defaultPriority: "urgent" | "high" | "standard" | "nurture";
  steps: FormStep[];
}

const contactStep: FormStep = {
  id: "contact",
  type: "contact",
  title: "How can we reach you?",
};

const shortContactStep: FormStep = {
  id: "contact",
  type: "contact",
  title: "Where should we send help?",
  helpText: "We'll call you right away to confirm details.",
};

export const forms: QualificationFormConfig[] = [
  {
    id: "water-softener",
    serviceId: "water-softeners",
    formName: "Water Softener Qualification",
    ctaText: "Get My Water Softener Estimate",
    leadType: "water_softener_lead",
    defaultPriority: "high",
    steps: [
      {
        id: "intent",
        type: "single-select",
        title: "What are you looking for?",
        options: [
          { value: "new-install", label: "New water softener installation" },
          { value: "replace-existing", label: "Replace my existing system" },
          { value: "service-repair", label: "Service or repair my current system" },
          { value: "not-sure", label: "Not sure yet" },
        ],
      },
      {
        id: "symptoms",
        type: "multi-select",
        title: "What are you noticing in your home?",
        helpText: "Select all that apply.",
        options: [
          { value: "white-buildup", label: "White mineral buildup" },
          { value: "spots-fixtures", label: "Spots on fixtures" },
          { value: "spotty-dishes", label: "Spotty dishes or glassware" },
          { value: "scale-faucets", label: "Scale around faucets" },
          { value: "shower-buildup", label: "Shower buildup" },
          { value: "appliance-buildup", label: "Appliance buildup" },
          { value: "hard-water-feel", label: "Water feels hard" },
          { value: "protect-home", label: "Mainly looking to protect my home" },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "current-softener",
        type: "single-select",
        title: "Do you currently have a water softener?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "not-sure", label: "Not sure" },
        ],
      },
      {
        id: "property-type",
        type: "single-select",
        title: "What type of property is this?",
        options: [
          { value: "single-family", label: "Single-family home" },
          { value: "townhome-condo", label: "Townhome or condo" },
          { value: "rental", label: "Rental property" },
          { value: "commercial", label: "Commercial property" },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "timeline",
        type: "single-select",
        title: "When are you looking to have this completed?",
        options: [
          { value: "asap", label: "As soon as possible" },
          { value: "1-2-weeks", label: "Within 1–2 weeks" },
          { value: "30-days", label: "Within 30 days" },
          { value: "researching", label: "Researching options" },
        ],
      },
      contactStep,
    ],
  },
  {
    id: "water-heater",
    serviceId: "water-heaters",
    formName: "Water Heater Qualification",
    ctaText: "Get My Water Heater Fixed",
    leadType: "water_heater_lead",
    defaultPriority: "standard",
    steps: [
      {
        id: "problem",
        type: "single-select",
        title: "What's happening with your water heater?",
        options: [
          { value: "no-hot-water", label: "No hot water" },
          { value: "not-enough-hot-water", label: "Not enough hot water" },
          { value: "temp-fluctuates", label: "Temperature fluctuates" },
          { value: "leaking", label: "Leaking", isEmergencyFlag: true },
          { value: "strange-noises", label: "Strange noises" },
          { value: "replacement", label: "Replacement" },
          { value: "interested-tankless", label: "Interested in tankless" },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "type",
        type: "single-select",
        title: "What type do you have?",
        options: [
          { value: "gas", label: "Gas" },
          { value: "electric", label: "Electric" },
          { value: "tankless", label: "Tankless" },
          { value: "not-sure", label: "Not sure" },
        ],
      },
      {
        id: "age",
        type: "single-select",
        title: "How old is it?",
        options: [
          { value: "under-5", label: "Under 5 years" },
          { value: "5-10", label: "5–10 years" },
          { value: "10-plus", label: "10+ years" },
          { value: "not-sure", label: "Not sure" },
        ],
      },
      {
        id: "urgency",
        type: "single-select",
        title: "How urgent is it?",
        options: [
          { value: "need-now", label: "Need help now", isEmergencyFlag: true },
          { value: "today", label: "Today" },
          { value: "within-days", label: "Within several days" },
          { value: "planning-ahead", label: "Planning ahead" },
        ],
      },
      contactStep,
    ],
  },
  {
    id: "drain-cleaning",
    serviceId: "drain-cleaning",
    formName: "Drain Cleaning Qualification",
    ctaText: "Clear My Drain",
    leadType: "drain_cleaning_lead",
    defaultPriority: "standard",
    steps: [
      {
        id: "problem",
        type: "single-select",
        title: "What's happening?",
        options: [
          { value: "one-clogged-drain", label: "One clogged drain" },
          { value: "multiple-clogged-drains", label: "Multiple clogged drains" },
          { value: "toilet-backup", label: "Toilet backup" },
          { value: "kitchen-sink", label: "Kitchen sink" },
          { value: "shower-tub", label: "Shower/tub" },
          { value: "main-line-clog", label: "Possible main-line clog" },
          { value: "recurring-clog", label: "Recurring clog" },
          { value: "not-sure", label: "Not sure" },
        ],
      },
      {
        id: "backing-up",
        type: "single-select",
        title: "Is water backing up?",
        options: [
          { value: "yes", label: "Yes", isEmergencyFlag: true },
          { value: "no", label: "No" },
          { value: "not-sure", label: "Not sure" },
        ],
      },
      {
        id: "timeline",
        type: "single-select",
        title: "When do you need help?",
        options: [
          { value: "immediately", label: "Immediately", isEmergencyFlag: true },
          { value: "today", label: "Today" },
          { value: "within-days", label: "Within several days" },
          { value: "flexible", label: "Flexible" },
        ],
      },
      shortContactStep,
    ],
  },
  {
    id: "leak-repair",
    serviceId: "leak-repair",
    formName: "Leak Repair Qualification",
    ctaText: "Get My Leak Fixed",
    leadType: "leak_repair_lead",
    defaultPriority: "standard",
    steps: [
      {
        id: "location",
        type: "single-select",
        title: "Where is the leak?",
        options: [
          { value: "kitchen", label: "Kitchen" },
          { value: "bathroom", label: "Bathroom" },
          { value: "water-heater", label: "Water heater" },
          { value: "ceiling-wall", label: "Ceiling/wall" },
          { value: "outdoor", label: "Outdoor plumbing" },
          { value: "main-line", label: "Main water line", isEmergencyFlag: true },
          { value: "not-sure", label: "Not sure" },
        ],
      },
      {
        id: "actively-flowing",
        type: "single-select",
        title: "Is water actively flowing?",
        options: [
          { value: "yes", label: "Yes", isEmergencyFlag: true },
          { value: "no", label: "No" },
          { value: "not-sure", label: "Not sure" },
        ],
      },
      {
        id: "can-shut-off",
        type: "single-select",
        title: "Can you shut off the water?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "not-sure", label: "Not sure" },
        ],
      },
      {
        id: "timeline",
        type: "single-select",
        title: "When do you need service?",
        options: [
          { value: "immediately", label: "Immediately", isEmergencyFlag: true },
          { value: "today", label: "Today" },
          { value: "within-days", label: "Within several days" },
          { value: "flexible", label: "Flexible" },
        ],
      },
      shortContactStep,
    ],
  },
  {
    id: "commercial",
    serviceId: "commercial-plumbing",
    formName: "Commercial Plumbing Qualification",
    ctaText: "Request Commercial Service",
    leadType: "commercial_plumbing_lead",
    defaultPriority: "standard",
    steps: [
      {
        id: "property-type",
        type: "single-select",
        title: "Property type",
        options: [
          { value: "office", label: "Office" },
          { value: "retail", label: "Retail" },
          { value: "restaurant", label: "Restaurant" },
          { value: "multi-family", label: "Multi-family" },
          { value: "industrial", label: "Industrial" },
          { value: "education", label: "Education" },
          { value: "hospitality", label: "Hospitality" },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "need",
        type: "single-select",
        title: "What do you need?",
        options: [
          { value: "repair", label: "Repair" },
          { value: "drain-sewer", label: "Drain/sewer" },
          { value: "water-heater", label: "Water heater" },
          { value: "fixture-installation", label: "Fixture installation" },
          { value: "maintenance", label: "Maintenance" },
          { value: "remodel-buildout", label: "Remodel/buildout" },
          { value: "emergency", label: "Emergency", isEmergencyFlag: true },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "operations-affected",
        type: "single-select",
        title: "Is business operation affected?",
        options: [
          { value: "yes", label: "Yes", isEmergencyFlag: true },
          { value: "partially", label: "Partially" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "timeline",
        type: "single-select",
        title: "Timeline",
        options: [
          { value: "emergency", label: "Emergency", isEmergencyFlag: true },
          { value: "today", label: "Today" },
          { value: "this-week", label: "This week" },
          { value: "planned", label: "Planned" },
        ],
      },
      {
        id: "contact",
        type: "contact",
        title: "Tell us about your business",
      },
    ],
  },
  {
    id: "plumbing-repair",
    serviceId: "plumbing-repair",
    formName: "General Plumbing Qualification",
    ctaText: "Schedule Plumbing Service",
    leadType: "plumbing_repair_lead",
    defaultPriority: "standard",
    steps: [
      {
        id: "problem",
        type: "single-select",
        title: "What do you need help with?",
        options: [
          { value: "fixture-repair", label: "Fixture repair" },
          { value: "pipe-repair", label: "Pipe repair" },
          { value: "installation", label: "New installation" },
          { value: "leak", label: "Leak", isEmergencyFlag: true },
          { value: "maintenance", label: "General maintenance" },
          { value: "not-sure", label: "Not sure — need a diagnosis" },
        ],
      },
      {
        id: "property-type",
        type: "single-select",
        title: "What type of property is this?",
        options: [
          { value: "single-family", label: "Single-family home" },
          { value: "townhome-condo", label: "Townhome or condo" },
          { value: "rental", label: "Rental property" },
          { value: "commercial", label: "Commercial property" },
        ],
      },
      {
        id: "timeline",
        type: "single-select",
        title: "When do you need service?",
        options: [
          { value: "immediately", label: "Immediately", isEmergencyFlag: true },
          { value: "today", label: "Today" },
          { value: "within-days", label: "Within several days" },
          { value: "flexible", label: "Flexible" },
        ],
      },
      contactStep,
    ],
  },
  {
    id: "emergency",
    serviceId: "emergency-plumbing",
    formName: "Emergency Plumbing Request",
    ctaText: "Request Emergency Service",
    leadType: "emergency_plumbing_lead",
    defaultPriority: "urgent",
    steps: [
      {
        id: "problem",
        type: "single-select",
        title: "What is happening?",
        options: [
          { value: "burst-pipe", label: "Burst pipe", isEmergencyFlag: true },
          { value: "active-leak", label: "Active leak", isEmergencyFlag: true },
          { value: "sewer-backup", label: "Sewer backup", isEmergencyFlag: true },
          { value: "overflow", label: "Overflow", isEmergencyFlag: true },
          { value: "no-water", label: "No water" },
          { value: "water-heater-leak", label: "Water heater leak", isEmergencyFlag: true },
          { value: "major-drain-backup", label: "Major drain backup", isEmergencyFlag: true },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "causing-damage",
        type: "single-select",
        title: "Is water actively causing damage?",
        options: [
          { value: "yes", label: "Yes", isEmergencyFlag: true },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "property-type",
        type: "single-select",
        title: "Property type",
        options: [
          { value: "residential", label: "Residential" },
          { value: "rental", label: "Rental" },
          { value: "commercial", label: "Commercial" },
        ],
      },
      {
        id: "contact",
        type: "contact",
        title: "Name, phone, and address/city",
        helpText: "Calling is the fastest way to reach us for an active emergency.",
      },
    ],
  },
  {
    id: "new-construction",
    serviceId: "new-construction",
    formName: "New Construction Qualification",
    ctaText: "Request a New Construction Quote",
    leadType: "new_construction_lead",
    defaultPriority: "high",
    steps: [
      {
        id: "project-type",
        type: "single-select",
        title: "What type of project is this?",
        options: [
          { value: "single-family", label: "Single-family home" },
          { value: "custom-home", label: "Custom home" },
          { value: "multi-family", label: "Multi-family / townhomes" },
          { value: "commercial-development", label: "Commercial development" },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "project-stage",
        type: "single-select",
        title: "What stage is the project at?",
        options: [
          { value: "pre-construction", label: "Pre-construction / planning" },
          { value: "foundation", label: "Foundation" },
          { value: "framing", label: "Framing" },
          { value: "rough-in-needed", label: "Rough-in plumbing needed" },
          { value: "finish-trim", label: "Finish / trim-out" },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "role",
        type: "single-select",
        title: "Are you a builder, GC, or homeowner?",
        options: [
          { value: "builder-gc", label: "Builder / General Contractor" },
          { value: "homeowner", label: "Homeowner" },
          { value: "architect-designer", label: "Architect / Designer" },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "timeline",
        type: "single-select",
        title: "When do you need plumbing on site?",
        options: [
          { value: "asap", label: "As soon as possible" },
          { value: "30-days", label: "Within 30 days" },
          { value: "1-3-months", label: "1–3 months" },
          { value: "planning-ahead", label: "Planning ahead" },
        ],
      },
      {
        id: "contact",
        type: "contact",
        title: "Tell us about your project",
        helpText: "We'll follow up to discuss scope, timeline, and next steps.",
        showCompanyField: true,
      },
    ],
  },
];

export function getFormById(id: string): QualificationFormConfig | undefined {
  return forms.find((f) => f.id === id);
}

export function getFormByServiceId(serviceId: string): QualificationFormConfig | undefined {
  return forms.find((f) => f.serviceId === serviceId);
}

// Resolves the qualification form for a service: an explicit
// service.formId override (for services that share a closely related
// form — e.g. tankless water heaters reusing the water heater form)
// takes precedence, falling back to a form whose serviceId matches
// directly.
export function getFormForService(service: { id: string; formId?: string }): QualificationFormConfig | undefined {
  if (service.formId) return getFormById(service.formId);
  return getFormByServiceId(service.id);
}
