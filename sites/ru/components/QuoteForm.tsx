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
    "Автомобильные весы",
    "Напольные весы",
    "Настольные весы",
    "Тензодатчик",
    "Весовой терминал",
    "Лабораторные весы",
    "Пока не определился",
  ];

  const templates = [
    {
      label: "Автомобильные весы",
      text: "Автомобильные весы: грузоподъёмность __ т, размер платформы __ м, установка надземная / в приямке.",
    },
    {
      label: "Напольные весы",
      text: "Напольные весы: грузоподъёмность __ кг, размер платформы __, материал — углеродистая / нержавеющая сталь.",
    },
    {
      label: "Настольные весы",
      text: "Настольные весы: грузоподъёмность __ кг, цена деления __ г, применение — упаковка / подсчёт / контроль.",
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
      setError("Укажите email или WhatsApp и страну.");
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
        throw new Error(data.error || "Не удалось отправить запрос.");
      }
      setContact("");
      setCountry("");
      setQuantity("");
      setRequirement("");
      setSelectedProduct("");
      setStep(1);
      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Не удалось отправить запрос. Напишите нам: ida@asiaweigh.com.");
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
        <h3>Запрос получен</h3>
        <p>Спасибо! Наш отдел продаж свяжется с вами в ближайшее время.</p>
        <button className="text-button" onClick={() => setSent(false)}>
          Отправить ещё один запрос
        </button>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={submit}>
      <div className="quote-form-head">
        <strong>Быстрый запрос</strong>
        <span>Укажите тип продукции и кратко опишите задачу. Детали уточним позже.</span>
        {step === 1 ? (
          <a className="quote-whatsapp-card" href="https://wa.me/8613775237471?text=Здравствуйте%2C%20я%20хочу%20узнать%20больше%20о%20вашем%20весовом%20оборудовании." target="_blank" rel="noreferrer">
            <span>Предпочитаете WhatsApp?</span>
            <strong>Отправить запрос в WhatsApp</strong>
          </a>
        ) : null}
      </div>

      {step === 1 ? (
        <div className="quote-step quote-step-first">
          <span className="quote-step-label">1. Что вы ищете?</span>
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
                setError("Сначала выберите тип продукции.");
                return;
              }
              setError("");
              setStep(2);
            }}
          >
            Продолжить
          </button>
        </div>
      ) : (
        <>
          <div className="quote-step">
            <span className="quote-step-label">2. Как с вами связаться?</span>
            <div className="selected-product-row">
              <span>{selectedProduct}</span>
              <button type="button" onClick={() => setStep(1)}>Изменить</button>
            </div>
            <div className="quick-form-grid">
              <label>
                <span>Email или WhatsApp *</span>
                <input
                  autoComplete="email"
                  placeholder="name@company.com или +86..."
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  required
                />
              </label>
              <label>
                <span>Страна *</span>
                <input
                  autoComplete="country-name"
                  placeholder="Страна назначения"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  required
                />
              </label>
              <label>
                <span>Количество</span>
                <input
                  inputMode="numeric"
                  placeholder="1 комплект, 5 шт..."
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="quote-step">
        <span className="quote-step-label">3. Добавьте детали, если они есть</span>
        <label>
          <span>Требования</span>
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
                placeholder="Например: Мне нужны автомобильные весы на 60 т для экспорта в Индонезию."
                value={requirement}
                onChange={(event) => setRequirement(event.target.value)}
              />
            </label>
          </div>
          {error ? <p className="form-error" role="alert">{error}</p> : null}
          <button className="button form-submit" type="submit" disabled={sending}>
            {sending ? "Отправка..." : "Отправить быстрый запрос"}
          </button>
        </>
      )}
      <p className="form-note">
        Полная спецификация пока не нужна. Мы поможем её уточнить.
      </p>
    </form>
  );
}
