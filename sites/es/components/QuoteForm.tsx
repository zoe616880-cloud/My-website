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
    "Báscula camionera",
    "Báscula de piso",
    "Báscula de mesa",
    "Celda de carga",
    "Indicador",
    "Balanza",
    "Aún no estoy seguro",
  ];

  const templates = [
    {
      label: "Báscula camionera",
      text: "Báscula camionera: capacidad __ toneladas, tamaño de plataforma __ m, instalación sobre el suelo / en foso.",
    },
    {
      label: "Báscula de piso",
      text: "Báscula de piso: capacidad __ kg, tamaño de plataforma __, material acero al carbono / acero inoxidable.",
    },
    {
      label: "Báscula de mesa",
      text: "Báscula de mesa: capacidad __ kg, división __ g, uso para empaque / conteo / verificación.",
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
      setError("Indique su email o WhatsApp y el país.");
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
        throw new Error(data.error || "No se pudo enviar la consulta.");
      }
      setContact("");
      setCountry("");
      setQuantity("");
      setRequirement("");
      setSelectedProduct("");
      setStep(1);
      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "No se pudo enviar la consulta. Escríbanos a ida@asiaweigh.com.");
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
        <h3>Consulta recibida</h3>
        <p>Gracias. Nuestro equipo comercial se pondrá en contacto con usted pronto.</p>
        <button className="text-button" onClick={() => setSent(false)}>
          Enviar otra consulta
        </button>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={submit}>
      <div className="quote-form-head">
        <strong>Consulta rápida</strong>
        <span>Comience con un tipo de producto y una frase. Podemos confirmar los detalles con usted más tarde.</span>
        {step === 1 ? (
          <a className="quote-whatsapp-card" href="https://wa.me/8613775237471?text=Hola%2C%20quiero%20consultar%20sobre%20sus%20productos%20de%20pesaje." target="_blank" rel="noreferrer">
            <span>¿Prefiere chatear?</span>
            <strong>Enviar requisitos por WhatsApp</strong>
          </a>
        ) : null}
      </div>

      {step === 1 ? (
        <div className="quote-step quote-step-first">
          <span className="quote-step-label">1. ¿Qué está buscando?</span>
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
                setError("Primero elija un tipo de producto.");
                return;
              }
              setError("");
              setStep(2);
            }}
          >
            Continuar
          </button>
        </div>
      ) : (
        <>
          <div className="quote-step">
            <span className="quote-step-label">2. ¿Cómo podemos responderle?</span>
            <div className="selected-product-row">
              <span>{selectedProduct}</span>
              <button type="button" onClick={() => setStep(1)}>Cambiar</button>
            </div>
            <div className="quick-form-grid">
              <label>
                <span>Email o WhatsApp *</span>
                <input
                  autoComplete="email"
                  placeholder="nombre@empresa.com o +86..."
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  required
                />
              </label>
              <label>
                <span>País *</span>
                <input
                  autoComplete="country-name"
                  placeholder="País de destino"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  required
                />
              </label>
              <label>
                <span>Cantidad</span>
                <input
                  inputMode="numeric"
                  placeholder="1 equipo, 5 unidades..."
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="quote-step">
        <span className="quote-step-label">3. Añada detalles si los tiene</span>
        <label>
          <span>Requisito</span>
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
                placeholder="Ejemplo: Necesito una báscula camionera de 60 toneladas para exportar a Indonesia."
                value={requirement}
                onChange={(event) => setRequirement(event.target.value)}
              />
            </label>
          </div>
          {error ? <p className="form-error" role="alert">{error}</p> : null}
          <button className="button form-submit" type="submit" disabled={sending}>
            {sending ? "Enviando..." : "Enviar consulta rápida"}
          </button>
        </>
      )}
      <p className="form-note">
        Por ahora no se necesita una especificación completa. Le ayudaremos a confirmarla.
      </p>
    </form>
  );
}
