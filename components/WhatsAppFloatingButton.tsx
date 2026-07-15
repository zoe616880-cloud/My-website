"use client";

import { useState } from "react";

const defaultMessage =
  "Hello, I am interested in your products. Please send me more details.";

function buildWhatsappUrl(message: string) {
  return `https://wa.me/8613775237471?text=${encodeURIComponent(message)}`;
}

export function WhatsAppFloatingButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(defaultMessage);
  const whatsappUrl = buildWhatsappUrl(message || defaultMessage);
  const quickMessages = [
    "Please send me your product catalog.",
    "I need a quotation for industrial floor scales.",
    "Can you recommend a weighing scale for my application?",
  ];

  return (
    <div className="whatsapp-widget">
      {open ? (
        <div className="whatsapp-chat" role="dialog" aria-label="WhatsApp chat window">
          <div className="whatsapp-chat-header">
            <div>
              <strong>Asia Weighing</strong>
              <span>Usually replies on WhatsApp</span>
            </div>
            <button type="button" aria-label="Close WhatsApp chat" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>
          <div className="whatsapp-chat-body">
            <div className="whatsapp-message received">
              Hello, how can we help with your weighing scale project?
            </div>
            <div className="whatsapp-quick-list" aria-label="Quick WhatsApp messages">
              {quickMessages.map((quickMessage) => (
                <button
                  key={quickMessage}
                  type="button"
                  onClick={() => setMessage(quickMessage)}
                >
                  {quickMessage}
                </button>
              ))}
            </div>
            <label htmlFor="whatsapp-message">Your message</label>
            <textarea
              id="whatsapp-message"
              value={message}
              rows={4}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>
          <a className="whatsapp-send" href={whatsappUrl} target="_blank" rel="noreferrer">
            Start WhatsApp Chat
          </a>
        </div>
      ) : null}

      <button
        className="whatsapp-float"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close WhatsApp chat window" : "Open WhatsApp chat window"}
        aria-expanded={open}
      >
        <span className="whatsapp-float-ring" aria-hidden="true" />
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          width="30"
          height="30"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M16.04 3.2c-6.96 0-12.62 5.62-12.62 12.54 0 2.2.58 4.36 1.68 6.26L3.32 28.8l6.98-1.82a12.7 12.7 0 0 0 5.74 1.38c6.96 0 12.62-5.62 12.62-12.54S23 3.2 16.04 3.2Zm0 22.98c-1.82 0-3.6-.48-5.16-1.4l-.38-.22-4.14 1.08 1.1-4.02-.26-.42a10.28 10.28 0 0 1-1.58-5.46c0-5.7 4.68-10.36 10.42-10.36s10.42 4.66 10.42 10.36-4.68 10.44-10.42 10.44Zm5.72-7.82c-.32-.16-1.86-.92-2.14-1.02-.28-.1-.48-.16-.68.16-.2.32-.78 1.02-.96 1.22-.18.22-.36.24-.68.08-.32-.16-1.34-.49-2.56-1.58-.94-.84-1.58-1.88-1.76-2.2-.18-.32-.02-.5.14-.66.14-.14.32-.36.48-.54.16-.18.2-.32.3-.52.1-.22.05-.4-.02-.56-.08-.16-.68-1.64-.94-2.24-.24-.58-.5-.5-.68-.5h-.58c-.2 0-.52.08-.8.4-.28.32-1.04 1.02-1.04 2.48s1.06 2.88 1.22 3.08c.16.22 2.1 3.22 5.1 4.5.72.3 1.28.48 1.72.62.72.22 1.38.18 1.9.12.58-.08 1.86-.76 2.12-1.5.26-.74.26-1.36.18-1.5-.08-.14-.28-.22-.6-.38Z"
          />
        </svg>
        <span className="whatsapp-float-text">WhatsApp</span>
      </button>
    </div>
  );
}
