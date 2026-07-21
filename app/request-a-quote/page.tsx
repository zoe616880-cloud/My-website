import type { Metadata } from "next";
import { Check, Mail, MapPin, MessageCircle } from "@/components/icons";
import { GoogleMapCard } from "@/components/GoogleMapCard";
import { QuoteForm } from "@/components/QuoteForm";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Request an Industrial Scale Quote",
  description:
    "Send your industrial weighing scale requirements to Asia Weighing.",
  alternates: { canonical: "/request-a-quote" },
};

export default function QuotePage() {
  return (
    <>
      <main className="quote-page">
        <section className="quote-page-inner">
          <div className="quote-page-intro">
            <p>Request a quotation</p>
            <h1>Get the right scale proposal faster.</h1>
            <span>
              Share a few details about your weighing job. We will recommend a
              suitable model, capacity and configuration for your project.
            </span>
            <div className="quote-promise-list">
              <span><Check size={15} /> Reply within 24 hours on working days</span>
              <span><Check size={15} /> Model, capacity and option guidance</span>
              <span><Check size={15} /> Export packing and project support</span>
            </div>
            <div className="quote-contact-list">
              <a href="mailto:ida@asiaweigh.com"><Mail size={20} /><span><small>Email</small>ida@asiaweigh.com</span></a>
              <a href="https://wa.me/8613775237471"><MessageCircle size={20} /><span><small>WhatsApp</small>+86 137 7523 7471</span></a>
              <div><MapPin size={20} /><span><small>Location</small>Changzhou, Jiangsu, China</span></div>
            </div>
          </div>
          <div className="quote-page-form">
            <QuoteForm />
          </div>
        </section>
        <GoogleMapCard className="quote-map-card" />
      </main>
      <SiteFooter />
    </>
  );
}
