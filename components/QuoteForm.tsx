"use client";

import { FormEvent, useState } from "react";
import { Check } from "./icons";

export function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [requirement, setRequirement] = useState("");

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
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
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
      form.reset();
      setRequirement("");
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
        <strong>Free project quote</strong>
        <span>Fill in the basics. We will help complete the technical selection.</span>
      </div>
      <div className="form-grid">
        <label>
          <span>Name *</span>
          <input name="name" autoComplete="name" placeholder="Your name" required />
        </label>
        <label>
          <span>Business email *</span>
          <input name="email" type="email" autoComplete="email" placeholder="name@company.com" required />
        </label>
        <label>
          <span>WhatsApp</span>
          <input name="whatsapp" type="tel" autoComplete="tel" placeholder="+ country code and number" />
        </label>
        <label>
          <span>Country *</span>
          <input name="country" autoComplete="country-name" placeholder="Destination country" required />
        </label>
        <label>
          <span>Product</span>
          <select name="product" defaultValue="">
            <option value="" disabled>
              Choose product type
            </option>
            <option>Truck scale / weighbridge</option>
            <option>Floor scale / platform scale</option>
            <option>Bench scale</option>
            <option>Axle scale</option>
            <option>Crane scale</option>
            <option>Indicator / load cell / accessories</option>
            <option>Balance / test weights</option>
            <option>Custom weighing system</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          <span>Required quantity</span>
          <input name="quantity" inputMode="numeric" placeholder="1 set, 5 pcs..." />
        </label>
      </div>
      <label>
        <span>Product requirement *</span>
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
          name="requirement"
          rows={4}
          placeholder="Example: I need a 60 ton truck scale, 3 x 16 m platform, export to Indonesia, above-ground installation."
          value={requirement}
          onChange={(event) => setRequirement(event.target.value)}
          required
        />
      </label>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <button className="button form-submit" type="submit" disabled={sending}>
        {sending ? "Sending..." : "Submit Request"}
      </button>
      <p className="form-note">
        Your information is only used to prepare the quotation. No spam.
      </p>
    </form>
  );
}
