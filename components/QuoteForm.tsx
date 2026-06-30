"use client";

import { FormEvent, useState } from "react";
import { Check } from "./icons";

export function QuoteForm() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
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
      <button className="button form-submit" type="submit">
        Submit Request
      </button>
      <p className="form-note">
        Your information is used only to prepare your quotation.
      </p>
    </form>
  );
}
