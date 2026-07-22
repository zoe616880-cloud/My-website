"use client";

import { FormEvent, useState } from "react";
import { Check } from "./icons";

export function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [contact, setContact] = useState("");
  const [country, setCountry] = useState("");
  const [quantity, setQuantity] = useState("");
  const [requirement, setRequirement] = useState("");

  const productOptions = [
    "Truck scale",
    "Floor scale",
    "Bench scale",
    "Load cell",
    "Indicator",
    "Balance",
    "Not sure yet",
  ];

  const templates = [
    {
      label: "Truck scale",
      text: "Truck scale: capacity __ tons, platform size __ m, installation above ground / pit mounted.",
    },
    {
      label: "Floor scale",
      text: "Floor scale: capacity __ kg, platform size __, material carbon steel / stainless steel.",
    },
    {
      label: "Bench scale",
      text: "Bench scale: capacity __ kg, division __ g, used for packing / counting / checking.",
    },
  ];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    const cleanContact = contact.trim();
    const payload = {
      name: "Quick website inquiry",
      email: cleanContact.includes("@") ? cleanContact : "",
      whatsapp: cleanContact.includes("@") ? "" : cleanContact,
      country: country.trim(),
      product: selectedProduct,
      quantity: quantity.trim(),
      requirement: requirement.trim(),
    };

    if (!cleanContact || !payload.country) {
      setError("Please leave your email or WhatsApp and country.");
      setSending(false);
      return;
    }

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.error) {
        throw new Error(data.error || "Submission failed.");
      }
      setContact("");
      setCountry("");
      setQuantity("");
      setRequirement("");
      setSelectedProduct("");
      setStep(1);
      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Submission failed. Please email ida@asiaweigh.com.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="form-success" role="status">
        <span>
          <Check size={28} />
        </span>
        <h3>Request received</h3>
        <p>Thank you. Our sales team will contact you soon.</p>
        <button className="text-button" onClick={() => setSent(false)}>
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={submit}>
      <div className="quote-form-head">
        <strong>Quick inquiry</strong>
        <span>Start with one product type and one sentence. We can confirm the details with you later.</span>
        {step === 1 ? (
          <a className="quote-whatsapp-card" href="https://wa.me/8613775237471?text=Hello%2C%20I%20want%20to%20ask%20about%20weighing%20scale%20products." target="_blank" rel="noreferrer">
            <span>Prefer chatting?</span>
            <strong>Send requirements on WhatsApp</strong>
          </a>
        ) : null}
      </div>

      {step === 1 ? (
        <div className="quote-step quote-step-first">
          <span className="quote-step-label">1. What are you looking for?</span>
          <div className="product-choice-grid">
            {productOptions.map((option) => (
              <button
                className={selectedProduct === option ? "active" : ""}
                key={option}
                type="button"
                onClick={() => setSelectedProduct(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {error ? <p className="form-error" role="alert">{error}</p> : null}
          <button
            className="button form-submit"
            type="button"
            onClick={() => {
              if (!selectedProduct) {
                setError("Please choose a product type first.");
                return;
              }
              setError("");
              setStep(2);
            }}
          >
            Continue
          </button>
        </div>
      ) : (
        <>
          <div className="quote-step">
            <span className="quote-step-label">2. How can we reply?</span>
            <div className="selected-product-row">
              <span>{selectedProduct}</span>
              <button type="button" onClick={() => setStep(1)}>Change</button>
            </div>
            <div className="quick-form-grid">
              <label>
                <span>Email or WhatsApp *</span>
                <input
                  autoComplete="email"
                  placeholder="name@company.com or +86..."
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  required
                />
              </label>
              <label>
                <span>Country *</span>
                <input
                  autoComplete="country-name"
                  placeholder="Destination country"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  required
                />
              </label>
              <label>
                <span>Quantity</span>
                <input
                  inputMode="numeric"
                  placeholder="1 set, 5 pcs..."
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="quote-step">
        <span className="quote-step-label">3. Add details if you have them</span>
        <label>
          <span>Requirement</span>
              <div className="requirement-helper">
                {templates.map((template) => (
                  <button
                    key={template.label}
                    type="button"
                    onClick={() => setRequirement(template.text)}
                  >
                    {template.label}
                  </button>
                ))}
              </div>
              <textarea
                rows={2}
                placeholder="Example: I need a 60 ton truck scale for export to Indonesia."
                value={requirement}
                onChange={(event) => setRequirement(event.target.value)}
              />
            </label>
          </div>
          {error ? <p className="form-error" role="alert">{error}</p> : null}
          <button className="button form-submit" type="submit" disabled={sending}>
            {sending ? "Sending..." : "Send Quick Inquiry"}
          </button>
        </>
      )}
      <p className="form-note">
        No full specification needed now. We will help you confirm it.
      </p>
    </form>
  );
}
