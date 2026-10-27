
"use client";

import { useState } from "react";
import Link from "next/link";
import rules from "./rules.json";

type Rule = {
  intent: string;
  keywords: string[];
  reply: string;
};

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

const chatbotRules = rules as Rule[];

const greeting =
  "Assalam-o-Alaikum! 👋 Welcome to UOS Helpdesk Bot. I can help you with fees, admissions, university timings, library services, and hostels. How can I help you today?";

const services = [
  {
    icon: "💰",
    title: "Fee Information",
    description: "Get guidance about fees, payments, and scholarships.",
  },
  {
    icon: "🎓",
    title: "Admissions",
    description: "Learn about eligibility, applications, and merit lists.",
  },
  {
    icon: "🕒",
    title: "University Timings",
    description: "Get guidance about classes and office hours.",
  },
  {
    icon: "📚",
    title: "Library Services",
    description: "Explore library facilities, books, and membership.",
  },
  {
    icon: "🏠",
    title: "Hostel Facilities",
    description: "Learn about hostel applications and accommodation.",
  },
];

const quickQuestions = [
  "What is the fee structure?",
  "How can I apply for admission?",
  "What are the university timings?",
  "Tell me about the library",
  "How can I get a hostel room?",
];

function normalizeMessage(message: string) {
  return message.toLowerCase().trim().replace(/\s+/g, " ");
}

function getBotReply(message: string) {
  const normalized = normalizeMessage(message);

  for (const rule of chatbotRules) {
    const matched = rule.keywords.some((keyword) =>
      normalized.includes(normalizeMessage(keyword))
    );

    if (matched) return rule.reply;
  }

  return "Sorry, I couldn't find a matching answer. 😊 Please ask about fees, admissions, university timings, library services, or hostels. For other queries, contact the relevant UOS department.";
}

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [nextId, setNextId] = useState(2);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "bot", text: greeting },
  ]);

  function sendMessage(messageText: string = input) {
    const text = messageText.trim();
    if (!text) return;

    setMessages((previous) => [
      ...previous,
      { id: nextId, sender: "user", text },
      {
        id: nextId + 1,
        sender: "bot",
        text: getBotReply(text),
      },
    ]);

    setNextId((previous) => previous + 2);
    setInput("");
  }

  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Navigation */}
      <nav className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-2xl">
              🎓
            </div>
            <div>
              <h1 className="font-bold text-slate-900">UOS Helpdesk</h1>
              <p className="text-xs text-slate-500">Student Support Portal</p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setIsChatOpen(true)}
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:px-5"
          >
            Ask a Question
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-medium text-indigo-700">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Your virtual university assistant
            </span>

            <h2 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              University help,
              <span className="block text-indigo-600">
                just a chat away.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Welcome to the UOS Helpdesk Bot. Find guidance about fees,
              admissions, university timings, library services, and hostel
              facilities in one convenient place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setIsChatOpen(true)}
                className="rounded-xl bg-indigo-600 px-7 py-4 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-1 hover:bg-indigo-700"
              >
                Start Chatting →
              </button>

              <a
                href="#services"
                className="rounded-xl border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 transition hover:bg-indigo-50"
              >
                Explore Services
              </a>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Simple. Helpful. Student-friendly.
            </p>
          </div>

          {/* Chat preview */}
          <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-indigo-100">
            <div className="flex items-center gap-3 rounded-t-3xl bg-indigo-600 p-5 text-white">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-2xl">
                🎓
              </div>
              <div>
                <h3 className="font-bold">UOS Helpdesk Bot</h3>
                <p className="text-xs text-indigo-100">
                  Here to help you
                </p>
              </div>
              <span className="ml-auto h-2.5 w-2.5 rounded-full bg-green-300" />
            </div>

            <div className="space-y-5 bg-slate-50 p-5">
              <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-slate-100 bg-white p-4">
                <p className="text-xs font-semibold text-indigo-600">
                  UOS Assistant
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Assalam-o-Alaikum! 👋 How can I help you today?
                </p>
              </div>

              <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-indigo-600 p-4 text-sm text-white">
                I need admission information.
              </div>

              <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-slate-100 bg-white p-4">
                <p className="text-sm leading-6 text-slate-600">
                  Ask me about admission eligibility, applications, and merit
                  lists.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsChatOpen(true)}
                className="w-full rounded-xl border border-indigo-100 bg-indigo-50 p-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-100"
              >
                Try the chatbot →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Student services
            </p>
            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              How can we help you?
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Select a service to open the chatbot and ask your question.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <button
                key={service.title}
                type="button"
                onClick={() => {
                  setIsChatOpen(true);
                  setInput(service.title);
                }}
                className="group rounded-2xl border border-slate-200 p-6 text-left transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-3xl group-hover:bg-indigo-100">
                  {service.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {service.description}
                </p>
                <span className="mt-5 block text-sm font-semibold text-indigo-600">
                  Ask the chatbot →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-r from-indigo-700 to-blue-600 px-6 py-14 text-center text-white sm:py-16">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Have a question?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-indigo-100">
            Start a conversation with your virtual university assistant.
          </p>
          <button
            type="button"
            onClick={() => setIsChatOpen(true)}
            className="mt-8 rounded-xl bg-white px-7 py-4 font-bold text-indigo-700 transition hover:bg-indigo-50"
          >
            Chat with UOS Bot →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-slate-50 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
          <div>
            <p className="font-bold text-slate-800">UOS Helpdesk Bot</p>
            <p className="mt-1 text-sm text-slate-500">
              A student support chatbot project.
            </p>
          </div>
          <p className="text-center text-xs leading-6 text-slate-500">
            Verify official university information with the relevant department.
          </p>
        </div>
      </footer>

      {/* Floating chat launcher */}
      {!isChatOpen && (
        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          aria-label="Open UOS Helpdesk chat"
          className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-3xl text-white shadow-xl shadow-indigo-300 transition hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 sm:bottom-7 sm:right-7"
        >
          <svg
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
          </svg>
          <span className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full border-2 border-white bg-green-400" />
        </button>
      )}

      {/* Floating chat window */}
      {isChatOpen && (
        <section
          aria-label="UOS Helpdesk chat window"
          className="fixed bottom-4 right-4 z-50 flex h-[min(600px,calc(100dvh-32px))] w-[min(400px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20 sm:bottom-7 sm:right-7"
        >
          {/* Chat header */}
          <header className="flex items-center gap-3 bg-gradient-to-r from-indigo-700 to-blue-600 px-4 py-4 text-white">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-xl">
              🎓
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold">UOS Helpdesk Bot</h2>
              <p className="mt-0.5 text-xs text-blue-100">
                Student support assistant
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsChatOpen(false)}
              aria-label="Minimize chat"
              className="flex h-9 w-9 items-center justify-center rounded-full text-2xl transition hover:bg-white/15"
            >
              ×
            </button>
          </header>

          {/* Chat messages */}
          <div
            aria-live="polite"
            className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4"
          >
            {messages.map((message) => {
              const isUser = message.sender === "user";

              return (
                <div
                  key={message.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-3 text-sm leading-6 ${
                      isUser
                        ? "rounded-br-sm bg-indigo-600 text-white"
                        : "rounded-bl-sm border border-slate-200 bg-white text-slate-700 shadow-sm"
                    }`}
                  >
                    {!isUser && (
                      <p className="mb-1 text-[11px] font-bold text-indigo-600">
                        UOS Assistant
                      </p>
                    )}
                    {message.text}
                  </div>
                </div>
              );
            })}

            {messages.length === 1 && (
              <div className="pt-2">
                <p className="mb-2 text-xs font-medium text-slate-500">
                  Try asking:
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => sendMessage(question)}
                      className="rounded-full border border-indigo-100 bg-white px-3 py-2 text-left text-xs text-indigo-700 transition hover:bg-indigo-50"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chat input */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            className="border-t border-slate-200 bg-white p-3"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your question..."
                aria-label="Type your question"
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Send
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-slate-400">
              Rule-based assistant • Verify important details with UOS
            </p>
          </form>
        </section>
      )}
    </main>
  );
}
