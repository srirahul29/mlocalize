import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  FileText,
  Globe,
  Languages,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MessageSquare,
  Phone,
  Search,
  Shield,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ── helpers ──────────────────────────────────────────────────────────────────

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── WhatsApp Floating Button ──────────────────────────────────────────────────

function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap"
          >
            Chat on WhatsApp
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />
        <a
          href="https://wa.me/?text=Hi%2C%20I%27m%20interested%20in%20MLocalize%20translation%20services"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          data-ocid="whatsapp.button"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:bg-[#20c05c] transition-colors"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* WhatsApp SVG icon */}
          <svg
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            role="img"
            aria-label="WhatsApp"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ── Chatbot Widget ────────────────────────────────────────────────────────────

type ChatMessage = {
  role: "bot" | "user";
  text: string;
};

const FAQ_ITEMS = [
  {
    q: "What services do you offer?",
    a: "We offer Document Translation, Software Localization, Cultural Adaptation, and Website Localization — all handled by certified native-speaking linguists.",
  },
  {
    q: "How fast is delivery?",
    a: "Our average turnaround is 24 hours for standard documents. Rush delivery is available. We'll give you an exact timeline in your quote.",
  },
  {
    q: "How do I get a quote?",
    a: "Fill out the quote form on this page and we'll respond within 2 business hours with a detailed, transparent price — no hidden fees.",
  },
  {
    q: "What languages do you support?",
    a: "We support 12+ languages including English, Spanish, French, German, Chinese, Japanese, Arabic, Portuguese, Russian, Italian, Korean, and Dutch.",
  },
  {
    q: "What are your prices?",
    a: "Pricing depends on language pair, word count, and document type. Most projects start from $0.10/word. Request a free quote for an exact estimate.",
  },
];

function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Hi! 👋 I'm the MLocalize assistant. How can I help you today?",
    },
  ]);
  const [showMenu, setShowMenu] = useState(true);

  function handleFAQ(item: (typeof FAQ_ITEMS)[0]) {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: item.q },
      { role: "bot", text: item.a },
    ]);
    setShowMenu(false);
  }

  function handleBack() {
    setMessages((prev) => [
      ...prev,
      { role: "bot", text: "Sure! Here are some more things I can help with:" },
    ]);
    setShowMenu(true);
  }

  function handleQuote() {
    setOpen(false);
    scrollTo("contact");
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-80 h-96 bg-white rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden"
            data-ocid="chatbot.panel"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.23 0.058 221) 0%, oklch(0.28 0.065 221) 100%)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    MLocalize Assistant
                  </div>
                  <div className="text-white/50 text-xs">
                    Typically replies instantly
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
                aria-label="Close chat"
                data-ocid="chatbot.close_button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2 bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: chat messages are append-only
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-navy text-white rounded-br-sm"
                        : "bg-white text-foreground shadow-sm border border-border rounded-bl-sm"
                    }`}
                    style={
                      msg.role === "user"
                        ? { background: "oklch(0.23 0.058 221)" }
                        : {}
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* FAQ quick replies */}
              {showMenu && (
                <div className="flex flex-col gap-1.5 mt-1">
                  {FAQ_ITEMS.map((item) => (
                    <button
                      key={item.q}
                      type="button"
                      onClick={() => handleFAQ(item)}
                      className="text-left text-xs px-3 py-2 rounded-lg border border-border bg-white hover:border-gold hover:text-gold transition-colors font-medium"
                      data-ocid="chatbot.button"
                    >
                      {item.q}
                    </button>
                  ))}
                </div>
              )}

              {/* Back to menu */}
              {!showMenu && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="self-start text-xs px-3 py-1.5 rounded-lg border border-border bg-white hover:border-gold hover:text-gold transition-colors font-medium mt-1"
                  data-ocid="chatbot.secondary_button"
                >
                  ← Back to menu
                </button>
              )}
            </div>

            {/* Footer CTA */}
            <div className="flex-shrink-0 px-4 py-3 border-t border-border bg-white">
              <Button
                size="sm"
                onClick={handleQuote}
                className="w-full bg-gold hover:bg-gold-hover text-white font-semibold text-xs"
                data-ocid="chatbot.primary_button"
              >
                Request a Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat assistant"
        data-ocid="chatbot.open_modal_button"
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all hover:scale-105"
        style={{ background: "oklch(0.23 0.058 221)" }}
      >
        {open ? (
          <X className="w-6 h-6 text-gold" />
        ) : (
          <MessageCircle className="w-6 h-6 text-gold" />
        )}
      </button>
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Services", id: "services" },
    { label: "Languages", id: "languages" },
    { label: "Process", id: "process" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-header" : "border-b border-border"
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-2 group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-ocid="nav.link"
        >
          <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <Globe className="w-5 h-5 text-gold" />
          </div>
          <span className="font-bold text-lg text-foreground tracking-tight">
            M<span className="text-gold">Localize</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-7"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="nav.link"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Button
            onClick={() => scrollTo("contact")}
            className="bg-gold hover:bg-gold-hover text-white font-semibold px-5"
            data-ocid="nav.primary_button"
          >
            Request a Quote
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          data-ocid="nav.toggle"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  onClick={() => {
                    scrollTo(link.id);
                    setMenuOpen(false);
                  }}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground text-left transition-colors"
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => {
                  scrollTo("contact");
                  setMenuOpen(false);
                }}
                className="bg-gold hover:bg-gold-hover text-white font-semibold w-full"
                data-ocid="nav.primary_button"
              >
                Request a Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-[90vh] flex items-center bg-navy-dark overflow-hidden"
      style={{
        backgroundImage: "url('/assets/generated/hero-bg.dim_1400x700.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(11,42,58,0.92) 0%, rgba(11,42,58,0.75) 50%, rgba(11,42,58,0.40) 100%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 max-w-7xl pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-4">
            Global Language Solutions
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Breaking Language Barriers,{" "}
            <span className="text-gold">Connecting the World</span>
          </h1>
          <p className="text-lg text-white/80 mb-10 leading-relaxed">
            Professional translation and localization services in 12+ languages.
            We help your business communicate authentically with audiences
            worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() => scrollTo("contact")}
              className="bg-gold hover:bg-gold-hover text-white font-semibold px-8 py-3 text-base"
              data-ocid="hero.primary_button"
            >
              Get a Free Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("services")}
              className="border-white/60 text-white hover:bg-white/10 hover:text-white font-semibold px-8 py-3 text-base bg-transparent"
              data-ocid="hero.secondary_button"
            >
              Explore Our Services
            </Button>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-16 flex flex-wrap gap-8"
        >
          {[
            { value: "12+", label: "Languages" },
            { value: "500+", label: "Projects Delivered" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "24h", label: "Avg. Turnaround" },
          ].map((stat) => (
            <div key={stat.label} className="text-white">
              <div className="text-3xl font-bold text-gold">{stat.value}</div>
              <div className="text-sm text-white/70 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────

const services = [
  {
    icon: FileText,
    title: "Document Translation",
    desc: "Precise, context-aware translation of legal, technical, medical, and business documents by certified linguists.",
  },
  {
    icon: Languages,
    title: "Software Localization",
    desc: "End-to-end localization of apps, websites, and software platforms — from UI strings to cultural adaptation.",
  },
  {
    icon: Users,
    title: "Cultural Adaptation",
    desc: "Beyond words — we adapt tone, imagery, idioms, and formatting to resonate authentically in every market.",
  },
];

function Services() {
  return (
    <section id="services" aria-label="Services" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            What We Offer
          </span>
          <h2 className="text-4xl font-bold text-foreground mt-3">
            Our Services
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Comprehensive language solutions tailored to help your brand thrive
            across borders and cultures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white rounded-xl p-8 shadow-card border border-border hover:shadow-header transition-shadow group"
              data-ocid={`services.item.${i + 1}`}
            >
              <div className="w-12 h-12 rounded-lg bg-navy/8 flex items-center justify-center mb-5 group-hover:bg-gold/10 transition-colors">
                <svc.icon className="w-6 h-6 text-navy group-hover:text-gold transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {svc.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {svc.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Languages ─────────────────────────────────────────────────────────────────

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Arabic",
  "Portuguese",
  "Russian",
  "Italian",
  "Korean",
  "Dutch",
];

function SupportedLanguages() {
  return (
    <section
      id="languages"
      aria-label="Supported Languages"
      className="py-24"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.23 0.058 221) 0%, oklch(0.19 0.052 221) 100%)",
      }}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-14">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-2/5"
          >
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              Global Reach
            </span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-5">
              Supported Languages
            </h2>
            <p className="text-white/70 leading-relaxed">
              We offer professional translation and localization in 12 of the
              world's most widely spoken languages, covering over 4.5 billion
              native speakers across 6 continents.
            </p>
            <Button
              className="mt-8 bg-gold hover:bg-gold-hover text-white font-semibold"
              onClick={() => scrollTo("contact")}
              data-ocid="languages.primary_button"
            >
              Request Your Language Pair
            </Button>
          </motion.div>

          {/* Right chip grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:w-3/5 grid grid-cols-3 sm:grid-cols-4 gap-3"
          >
            {languages.map((lang, i) => (
              <motion.div
                key={lang}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-center text-white text-sm font-medium hover:bg-gold/20 hover:border-gold/50 transition-colors cursor-default"
                data-ocid={`languages.item.${i + 1}`}
              >
                {lang}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Process ───────────────────────────────────────────────────────────────────

const steps = [
  {
    num: "01",
    icon: FileText,
    title: "Submit Request",
    desc: "Tell us about your project — document type, language pair, deadline, and any special requirements.",
  },
  {
    num: "02",
    icon: Search,
    title: "Get a Quote",
    desc: "Receive a detailed, transparent quote within 2 hours. No hidden fees, no surprises.",
  },
  {
    num: "03",
    icon: Sparkles,
    title: "Expert Translation",
    desc: "A certified native-speaking linguist translates your content with precision and cultural nuance.",
  },
  {
    num: "04",
    icon: Shield,
    title: "Quality Review",
    desc: "A second linguist reviews the translation for accuracy, tone, and cultural appropriateness.",
  },
];

function Process() {
  return (
    <section
      id="process"
      aria-label="Our Process"
      className="py-24 bg-background"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            How We Work
          </span>
          <h2 className="text-4xl font-bold text-foreground mt-3">
            Our Process
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            A streamlined four-step process designed to deliver high-quality
            translations efficiently.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative"
              data-ocid={`process.item.${i + 1}`}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+2.5rem)] right-0 h-px bg-border z-0" />
              )}
              <div className="bg-white rounded-xl p-7 shadow-card border border-border text-center relative z-10 h-full flex flex-col items-center">
                <div className="text-gold/40 font-bold text-4xl mb-3 leading-none">
                  {step.num}
                </div>
                <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────

const testimonials = [
  {
    quote:
      "MLocalize helped us launch our SaaS platform in 6 new markets simultaneously. The turnaround was lightning-fast and the quality was flawless.",
    name: "Sarah Mitchell",
    title: "VP of Marketing, TechForward Inc.",
    initial: "S",
  },
  {
    quote:
      "Their cultural adaptation team understood the nuances of the Japanese market perfectly. Our engagement rates tripled after the localization.",
    name: "James Okafor",
    title: "Global Expansion Lead, NovaBrand",
    initial: "J",
  },
  {
    quote:
      "We've been using MLocalize for all our legal document translations for two years. Precise, confidential, and always on time.",
    name: "Claudia Ferrara",
    title: "Head of Legal, Meridian Group",
    initial: "C",
  },
];

function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className="py-24 bg-white"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Client Stories
          </span>
          <h2 className="text-4xl font-bold text-foreground mt-3">
            What Our Clients Say
          </h2>
          <div className="flex justify-center gap-1 mt-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} className="w-5 h-5 fill-gold text-gold" />
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white rounded-2xl p-8 shadow-card border border-border flex flex-col gap-5"
              data-ocid={`testimonials.item.${i + 1}`}
            >
              <div className="text-gold text-3xl leading-none">&ldquo;</div>
              <p className="text-foreground/80 text-sm leading-relaxed flex-1">
                {t.quote}
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {t.initial}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">
                    {t.name}
                  </div>
                  <div className="text-muted-foreground text-xs">{t.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Quote Form + Footer ───────────────────────────────────────────────────────

const footerLinks = {
  "Site Links": [
    { label: "Services", id: "services" },
    { label: "Languages", id: "languages" },
    { label: "Our Process", id: "process" },
    { label: "Testimonials", id: "testimonials" },
  ],
  Services: [
    { label: "Document Translation" },
    { label: "Software Localization" },
    { label: "Cultural Adaptation" },
    { label: "Website Localization" },
  ],
};

function ContactFooter() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    langPair: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Quote request sent! We'll get back to you within 2 hours.");
    setForm({ name: "", email: "", service: "", langPair: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <footer
      className="pt-24 pb-0"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.23 0.058 221) 0%, oklch(0.16 0.045 221) 100%)",
      }}
    >
      {/* Quote form */}
      <section
        id="contact"
        aria-label="Request a Quote"
        className="container mx-auto px-6 max-w-3xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Get Started
          </span>
          <h2 className="text-4xl font-bold text-white mt-3">
            Request a Free Quote
          </h2>
          <p className="text-white/60 mt-3">
            Fill in the form below and we'll respond within 2 business hours.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/10 border border-gold/40 rounded-2xl p-12 text-center"
              data-ocid="contact.success_state"
            >
              <CheckCircle className="w-14 h-14 text-gold mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-white/70">
                Your quote request has been received. We'll be in touch shortly.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="bg-white/8 border border-white/15 rounded-2xl p-8 md:p-10 flex flex-col gap-5"
              data-ocid="contact.modal"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    className="text-white/80 text-sm font-medium"
                    htmlFor="q-name"
                  >
                    Your Name
                  </label>
                  <Input
                    id="q-name"
                    required
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold focus-visible:ring-gold/30"
                    data-ocid="contact.input"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-white/80 text-sm font-medium"
                    htmlFor="q-email"
                  >
                    Email Address
                  </label>
                  <Input
                    id="q-email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold focus-visible:ring-gold/30"
                    data-ocid="contact.input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    className="text-white/80 text-sm font-medium"
                    htmlFor="q-service"
                  >
                    Service Type
                  </label>
                  <Select
                    value={form.service}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, service: v }))
                    }
                    required
                  >
                    <SelectTrigger
                      id="q-service"
                      className="bg-white/10 border-white/20 text-white [&>span]:text-white/40 data-[state=open]:border-gold"
                      data-ocid="contact.select"
                    >
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">
                        Document Translation
                      </SelectItem>
                      <SelectItem value="software">
                        Software Localization
                      </SelectItem>
                      <SelectItem value="cultural">
                        Cultural Adaptation
                      </SelectItem>
                      <SelectItem value="website">
                        Website Localization
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-white/80 text-sm font-medium"
                    htmlFor="q-langpair"
                  >
                    Language Pair
                  </label>
                  <Select
                    value={form.langPair}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, langPair: v }))
                    }
                    required
                  >
                    <SelectTrigger
                      id="q-langpair"
                      className="bg-white/10 border-white/20 text-white [&>span]:text-white/40 data-[state=open]:border-gold"
                      data-ocid="contact.select"
                    >
                      <SelectValue placeholder="Select pair" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-es">English → Spanish</SelectItem>
                      <SelectItem value="en-fr">English → French</SelectItem>
                      <SelectItem value="en-de">English → German</SelectItem>
                      <SelectItem value="en-zh">English → Chinese</SelectItem>
                      <SelectItem value="en-ja">English → Japanese</SelectItem>
                      <SelectItem value="en-ar">English → Arabic</SelectItem>
                      <SelectItem value="en-pt">
                        English → Portuguese
                      </SelectItem>
                      <SelectItem value="en-ru">English → Russian</SelectItem>
                      <SelectItem value="other">Other / Multiple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-white/80 text-sm font-medium"
                  htmlFor="q-message"
                >
                  Project Details
                </label>
                <Textarea
                  id="q-message"
                  required
                  rows={4}
                  placeholder="Describe your project, document type, word count estimate, and any deadline requirements..."
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold focus-visible:ring-gold/30 resize-none"
                  data-ocid="contact.textarea"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="bg-gold hover:bg-gold-hover text-white font-semibold w-full mt-2"
                data-ocid="contact.submit_button"
              >
                Send Quote Request
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </section>

      {/* Footer columns */}
      <div className="container mx-auto px-6 max-w-7xl mt-20 pb-10 border-t border-white/10 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-gold" />
              </div>
              <span className="font-bold text-white text-lg">
                M<span className="text-gold">Localize</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Professional translation and localization services connecting
              businesses with the world.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-sm mb-4">{title}</h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {"id" in link ? (
                      <button
                        type="button"
                        onClick={() =>
                          scrollTo((link as { label: string; id: string }).id)
                        }
                        className="text-white/50 hover:text-gold text-sm transition-colors"
                        data-ocid="nav.link"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <span className="text-white/50 text-sm">
                        {link.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">
              Contact Info
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2 text-white/50 text-sm">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" />
                hello@mlocalize.com
              </li>
              <li className="flex items-start gap-2 text-white/50 text-sm">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" />
                +1 (800) 555-0199
              </li>
              <li className="flex items-start gap-2 text-white/50 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" />
                123 Global Ave, San Francisco, CA 94102
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 max-w-7xl py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} MLocalize. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 text-xs hover:text-white/50 transition-colors"
          >
            Built with ❤ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen">
      <Toaster position="top-right" richColors />
      <Header />
      <main>
        <Hero />
        <Services />
        <SupportedLanguages />
        <Process />
        <Testimonials />
      </main>
      <ContactFooter />
      <WhatsAppButton />
      <ChatbotWidget />
    </div>
  );
}
