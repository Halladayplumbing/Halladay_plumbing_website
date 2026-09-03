"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";
import { submitLead, type Lead } from "@/lib/leads";

interface ContactFormProps {
  initialServiceId?: string;
  initialOfferId?: string;
  initialCity?: string;
}

export function ContactForm({ initialServiceId, initialOfferId, initialCity }: ContactFormProps) {
  const router = useRouter();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: initialServiceId ?? "",
    city: initialCity ?? "",
    preferredContact: "phone" as "phone" | "text" | "email",
    message: "",
    // Honeypot field — real users never see or fill this. Bots that
    // auto-fill every input will trip it.
    company: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (values.company) {
      // Honeypot tripped — silently pretend success.
      router.push("/thank-you/");
      return;
    }

    if (!values.firstName.trim() || !values.phone.trim()) {
      setError("Please enter your first name and phone number.");
      return;
    }

    setSubmitting(true);
    const attribution = captureAttribution();

    const lead: Lead = {
      contact: {
        firstName: values.firstName,
        lastName: values.lastName || undefined,
        phone: values.phone,
        email: values.email || undefined,
        city: values.city || undefined,
        preferredContact: values.preferredContact,
      },
      service: values.service || "general",
      leadType: "contact_page_lead",
      leadPriority: "standard",
      qualificationAnswers: values.message ? { message: values.message } : {},
      leadContext: { city: values.city || undefined },
      attribution,
      funnel: {
        id: "contact-page",
        page: typeof window !== "undefined" ? window.location.pathname : "",
        offerId: initialOfferId,
      },
      timestamp: new Date().toISOString(),
    };

    const result = await submitLead(lead);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error ?? "Something went wrong. Please call us instead.");
      return;
    }

    trackEvent("form_complete", { form_id: "contact-page", service: lead.service });
    router.push("/thank-you/");
  }

  return (
    <form
      id="halladay-contact-form"
      name="halladay-contact-form"
      onSubmit={handleSubmit}
      className="space-y-4"
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="First name"
          name="firstName"
          required
          autoComplete="given-name"
          value={values.firstName}
          onChange={(v) => setValues((s) => ({ ...s, firstName: v }))}
        />
        <TextField
          label="Last name"
          name="lastName"
          autoComplete="family-name"
          value={values.lastName}
          onChange={(v) => setValues((s) => ({ ...s, lastName: v }))}
        />
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          value={values.phone}
          onChange={(v) => setValues((s) => ({ ...s, phone: v }))}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(v) => setValues((s) => ({ ...s, email: v }))}
        />

        <label className="block text-sm font-medium text-ink">
          Service
          <select
            name="service"
            className="form-input mt-1.5"
            value={values.service}
            onChange={(e) => setValues((s) => ({ ...s, service: e.target.value }))}
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
            <option value="other">Other</option>
          </select>
        </label>

        <TextField
          label="City"
          name="city"
          autoComplete="address-level2"
          value={values.city}
          onChange={(v) => setValues((s) => ({ ...s, city: v }))}
        />
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-ink">Preferred contact method</legend>
        <div className="mt-2 flex gap-4">
          {(["phone", "text", "email"] as const).map((method) => (
            <label key={method} className="flex items-center gap-2 text-sm text-ink">
              <input
                type="radio"
                name="preferredContact"
                value={method}
                checked={values.preferredContact === method}
                onChange={() => setValues((s) => ({ ...s, preferredContact: method }))}
                className="h-4 w-4"
              />
              {method === "phone" ? "Phone call" : method === "text" ? "Text message" : "Email"}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block text-sm font-medium text-ink">
        Message
        <textarea
          name="message"
          className="form-input mt-1.5 min-h-[120px]"
          value={values.message}
          onChange={(e) => setValues((s) => ({ ...s, message: e.target.value }))}
        />
      </label>

      {/* Honeypot — hidden from real users via CSS, not display:none, to
          discourage bots that skip hidden inputs. Deliberately NOT named
          "company" (even though the state field above is called that) —
          a name like that would read as a legitimate business/company
          field to GHL's External Tracking field-mapping, so this uses an
          obviously-internal name instead to keep it out of any real
          contact record. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Company
          <input
            type="text"
            name="halladay_hp_field"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={(e) => setValues((s) => ({ ...s, company: e.target.value }))}
          />
        </label>
      </div>

      {error && <p className="rounded-md bg-danger/10 px-4 py-3 text-sm font-medium text-danger">{error}</p>}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={submitting}
        icon={submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : undefined}
      >
        {submitting ? "Sending..." : "Send Request"}
      </Button>
    </form>
  );
}

function TextField({
  label,
  name,
  required,
  type = "text",
  autoComplete,
  value,
  onChange,
}: {
  label: string;
  name?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block text-sm font-medium text-ink">
      {label}
      {required && <span className="text-danger"> *</span>}
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input mt-1.5"
      />
    </label>
  );
}
