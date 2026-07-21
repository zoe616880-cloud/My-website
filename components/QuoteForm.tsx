"use client";

import { FormEvent, useState } from "react";
import { Check } from "./icons";

export function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

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
      <div className="form-grid">
        <label>
          <span>Name *</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>Business email *</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>WhatsApp</span>
          <input name="whatsapp" type="tel" autoComplete="tel" />
        </label>
        <label>
          <span>Country *</span>
          <input name="country" autoComplete="country-name" required />
        </label>
        <label>
          <span>Product</span>
          <select name="product" defaultValue="">
            <option value="" disabled>
              Select a product
            </option>
            <option>Bench scale</option>
            <option>Floor scale</option>
            <option>Mobile or U-shape scale</option>
            <option>Animal or special scale</option>
            <option>Custom weighing system</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          <span>Required quantity</span>
          <input name="quantity" inputMode="numeric" />
        </label>
      </div>
      <label>
        <span>Product requirement *</span>
        <textarea
          name="requirement"
          rows={4}
          placeholder="Application, capacity, platform size, material and other requirements"
          required
        />
      </label>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <button className="button form-submit" type="submit" disabled={sending}>
        {sending ? "Sending..." : "Submit Request"}
      </button>
      <p className="form-note">
        Your information is used only to prepare your quotation.
      </p>
    </form>
  );
}
