
"use client";

import { useState } from "react";
import Link from "next/link";
import rules from "../rules.json";

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
  "Assalam-o-Alaikum! 👋 Welcome to UOS Helpdesk Bot. I can help you with fees, admissions, university timings, library services, and hostels. What would you like to know?";

const quickQuestions = [
  "What is the fee structure?",
  "How can I apply for admission?",
  "What are the university timings?",
  "Tell me about the library",
  "How can I get a hostel room?",
];

function normalizeMessage(message: string): string {
  return message.toLowerCase().trim().replace(/\s+/g, " ");
}

function getBotReply(message: string): string {
  const normalized = normalizeMessage(message);

  for (const rule of chatbotRules) {
    const matched = rule.keywords.some((keyword) =>
      normalized.includes(normalizeMessage(keyword))
    );

    if (matched) {
      return rule.reply;
    }
  }

  return "I'm sorry, I couldn't understand your question. 😊 Please ask me about fees, admissions, university timings, library services, or hostels. For other queries, contact the relevant University of Sargodha department.";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "bot", text: greeting },
  ]);

  const [input, setInput] = useState("");
  const [nextId, setNextId] = useState(2);

  function sendMessage(textToSend: string = input) {
    const text = textToSend.trim();

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
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto flex min-h-[85vh] max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-indigo-100/60">
        {/* Header */}
        <header className="flex items-center gap-4 bg-gradient-to-r from-indigo-700 to-blue-600 px-5 py-5 text-white sm:px-7">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl">
            🎓
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold">UOS Helpdesk Bot</h1>
            <p className="mt-1 text-xs text-blue-100">
              University of Sargodha • Student Support
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl bg-white/15 px-4 py-2 text-sm font-medium transition hover:bg-white/25"
          >
            Home
          </Link>
        </header>

        {/* Introduction */}
        <div className="border-b border-indigo-100 bg-indigo-50/70 px-5 py-3 text-center text-sm text-slate-600">
          Ask a question and get quick guidance.
        </div>

        {/* Messages */}
        <section
          aria-label="Chat conversation"
          aria-live="polite"
          className="flex-1 space-y-5 overflow-y-auto bg-slate-50/70 px-4 py-6 sm:px-7"
        >
          {messages.map((message) => {
            const isUser = message.sender === "user";

            return (
              <div
                key={message.id}
                className={`flex items-end gap-2.5 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isUser && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg">
                    🎓
                  </div>
                )}

                <div
                  className={`flex max-w-[85%] flex-col ${
                    isUser ? "items-end" : "items-start"
                  }`}
                >
                  <span className="mb-1.5 px-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {isUser ? "You" : "UOS Assistant"}
                  </span>

                  <div
                    className={`whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                      isUser
                        ? "rounded-br-md bg-indigo-600 text-white"
                        : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>

                {isUser && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
                    U
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Quick Questions */}
        <div className="border-t border-slate-100 bg-white px-4 pt-4 sm:px-7">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Quick questions
          </p>

          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => sendMessage(question)}
                className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-700 transition hover:bg-indigo-100"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage();
          }}
          className="border-t border-slate-100 bg-white p-4 sm:px-7 sm:py-5"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about fees, admissions..."
              aria-label="Type your question"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Send →
            </button>
          </div>

          <p className="mt-3 text-center text-[11px] text-slate-400">
            Rule-based assistant • Verify important details with UOS
          </p>
        </form>
      </div>
    </main>
  );
}
