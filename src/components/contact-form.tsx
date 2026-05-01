"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";

const USE_CASES = ["Fintech", "Public benefits", "Healthcare", "Travel", "Education", "Other"];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setTimeout(() => {
      setPending(false);
      setSubmitted(true);
    }, 700);
  }

  return (
    <div className="rounded-2xl border border-border-dark bg-off-black p-6 md:p-8 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="py-12 text-center"
          >
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-green/15 text-green border border-green/30">
              <Check size={20} />
            </div>
            <h3 className="mt-5 font-display text-2xl text-white">Request received.</h3>
            <p className="mt-2 text-sm text-grey-on-black max-w-sm mx-auto">
              A solutions engineer will reach out within one business day to schedule your demo.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="grid gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" name="firstName" required />
              <Field label="Last name" name="lastName" required />
            </div>
            <Field label="Work email" name="email" type="email" required />
            <Field label="Company" name="company" required />

            <div>
              <label className="text-xs text-grey-on-black">
                Use case
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {USE_CASES.map((uc) => (
                  <label
                    key={uc}
                    className="cursor-pointer rounded-md border border-border-dark bg-rich-black px-3 py-1.5 text-xs text-grey-on-black transition-colors has-[:checked]:bg-blue/10 has-[:checked]:text-white has-[:checked]:border-blue/40"
                  >
                    <input type="radio" name="useCase" value={uc} className="sr-only" />
                    {uc}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-grey-on-black">
                Anything we should know?
              </label>
              <textarea
                name="notes"
                rows={3}
                className="mt-2 w-full rounded-md bg-rich-black border border-border-dark px-3 py-2 text-sm text-white placeholder:text-grey-on-black focus:outline-none focus:border-blue/50 transition-colors"
                placeholder="Volumes, regions, integration timeline…"
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-blue hover:bg-[#0058d9] px-5 py-2.5 text-[15px] font-medium text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {pending ? "Sending…" : "Request a demo"}
              {!pending && <ArrowUpRight size={16} strokeWidth={2.25} />}
            </button>
            <p className="text-[11px] text-grey-on-black">
              We&apos;ll only use this to coordinate your demo.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs text-grey-on-black">
        {label} {required && <span className="text-blue-eyebrow">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-md bg-rich-black border border-border-dark px-3 py-2 text-sm text-white placeholder:text-grey-on-black focus:outline-none focus:border-blue/50 transition-colors"
      />
    </label>
  );
}
