"use client";

import { useState } from "react";
import { FaGithub,FaXTwitter, FaMoon, FaSun } from "react-icons/fa6";

const CircleProgress = ({ progress = 0 , dark}: { progress: number, dark:boolean }) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width="100" height="100">
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke={`${dark? "#392c23" : "#eee"}`}
        strokeWidth="3"
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
    </svg>
  );
};


const EnvelopeIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);

const CheckIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export default function CraftlyLanding() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dark, setDark] = useState(false);
  const progress = 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/launchpad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (res.ok && result.status === "success") {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        setEmail("");
      }
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${dark ? "dark" : ""} min-h-screen craft-bg craft-text font-display transition-all`}>
      <div className="flex justify-center pt-12 pb-8">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
            <CircleProgress progress={progress} dark={dark} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-semibold">{progress}%</span>
            </div>
          </div>
          <p className="text-sm opacity-70 font-medium tracking-wide">Building Craftly...</p>
        </div>
      </div>

      <div className="mx-auto w-fit mb-4">
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-full bg-[#8F6D5A] text-white hover:bg-[#7A5D4A] transition cursor-pointer"
          aria-label="Toggle theme"
        >
          {dark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
        </button>
      </div>

      <header className="text-center py-8">
        <h1 className="text-5xl md:text-6xl tracking-tight font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>
          Craftly
        </h1>
      </header>

      <main className="max-w-3xl mx-auto px-6 text-center">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl mb-8 leading-relaxed font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>
            &quot;Creativity deserves a storefront.&quot;
          </h2>
          <p className="text-lg md:text-xl opacity-80 leading-relaxed max-w-2xl mx-auto mb-12 font-light">
            We&apos;re crafting a beautiful marketplace where artisans and creators can showcase their handmade treasures.
          </p>
        </div>

        <div className="mb-16">
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-craft border-opacity-15 craft-bg focus:outline-none focus:bg-transparent  placeholder-craft placeholder-opacity-50 text-lg"
                  disabled={isLoading || isSubmitted}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || isSubmitted || !email}
                className="px-8 py-4 rounded-xl border-craft border hover:scale-105 duration-300 ease-in-out font-medium text-lg disabled:craft-bg disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed min-w-[140px]"
              >
                {isLoading ? (
                  <span className="text-sm">Loading...</span>
                ) : isSubmitted ? (
                  <span className="flex items-center gap-2 text-sm w-fit mx-auto">
                    <CheckIcon className="w-3 h-3" />
                    <span>Notified!</span>
                  </span>
                ) : (
                  "Notify Me"
                )}
              </button>
            </div>
            {isSubmitted && (
              <p className="opacity-70 text-sm">Thank you! We&apos;ll notify you when Craftly launches.</p>
            )}
          </form>
        </div>

        <div className="mb-16">
          <p className="text-sm opacity-80 mb-3">Follow our journey</p>
          <div className="flex justify-center gap-6">
            <a href="https://x.com/whoshnri" target="blank" className="w-12 h-12 rounded-full bg-opacity-10 flex items-center justify-center">
              <FaXTwitter className="w-6 h-6" />
            </a>
            <a href="https://github.com/whoshnri/craftly" target="blank" className="w-12 h-12 rounded-full bg-opacity-10 flex items-center justify-center">
              <FaGithub className="w-6 h-6" />
            </a>
          </div>
        </div>
      </main>

      <footer className="text-center py-12 border-t border-[#8F6D5A] border-opacity-10">
        <p className="text-sm opacity-90">© 2025 Craftly. Crafted with love.</p>
      </footer>
    </div>
  );
}
