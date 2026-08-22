import { business } from "@/data/business";

export function UtilityBar() {
  return (
    <div className="hidden bg-primary-dark py-2 text-sm text-white/90 md:block">
      <div className="container-page flex items-center justify-between">
        <span>
          Serving {business.primaryCity}, {business.state} &amp; {business.serviceRegion}
        </span>
        {business.hours.confirmed && <span>{business.hours.display}</span>}
      </div>
    </div>
  );
}
