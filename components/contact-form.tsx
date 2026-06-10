"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useWhatsAppNumber } from "@/lib/site-settings-context";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const whatsappNumber = useWhatsAppNumber();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const message = [
      `Hello PV Designer Studio, my name is ${form.name || "____"}.`,
      form.email && `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      "",
      form.message || "I'd like to know more about your collections.",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(buildWhatsAppLink(message, whatsappNumber), "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp to send your message...");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Your name" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Your phone number" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about the outfit you're dreaming of..."
        />
      </div>
      <Button type="submit" size="lg" className="self-start">
        <MessageCircle className="h-4 w-4" /> Send via WhatsApp
      </Button>
    </form>
  );
}
