import { QuoteForm } from "@/components/QuoteForm";
import { faqs } from "@/data/site-data";

export function FAQAndQuote() {
  return (
    <section className="faq-quote section" id="quote">
      <div className="faq-column">
        <p className="section-index">06 / Common questions</p>
        <h2>What buyers usually ask first.</h2>
        <div className="faq-list">
          {faqs.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
      <div className="quote-column">
        <p className="section-index light">Request a quotation</p>
        <h2>Tell us what you need to weigh.</h2>
        <p>
          Share the basic requirement below. Ida and the sales team will
          review it and follow up by email or WhatsApp.
        </p>
        <QuoteForm />
      </div>
    </section>
  );
}
