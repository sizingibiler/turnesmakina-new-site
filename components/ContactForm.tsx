"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export function ContactForm({ dict }: { dict: any }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto mt-12 bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={dict.contact.form.name}
          required
          className="w-full bg-white/10 text-white p-4 rounded-xl border border-white/20 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={dict.contact.form.email}
          required
          className="w-full bg-white/10 text-white p-4 rounded-xl border border-white/20 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={dict.contact.form.message}
          required
          rows={5}
          className="md:col-span-2 w-full bg-white/10 text-white p-4 rounded-xl border border-white/20 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
        />
      </div>
      <div className="mt-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "sending" ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Gönderiliyor...</span>
            </>
          ) : (
            <>
              <Send size={20} />
              <span>{dict.contact.form.send}</span>
            </>
          )}
        </button>
      </div>
      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center justify-center gap-2 text-green-400"
        >
          <CheckCircle size={20} />
          <span>Mesajınız başarıyla gönderildi!</span>
        </motion.div>
      )}
      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center justify-center gap-2 text-red-400"
        >
          <AlertCircle size={20} />
          <span>Bir hata oluştu, lütfen tekrar deneyin.</span>
        </motion.div>
      )}
    </motion.form>
  );
}
