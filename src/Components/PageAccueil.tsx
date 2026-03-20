import { useState, useEffect, useRef, MouseEvent, FC } from "react";

interface MenuItem {
  nom: string;
  prix: string;
  emoji: string;
  desc: string;
}

interface SocialLink {
  icon: string;
  label: string;
  color: string;
}

interface FoodCardProps {
  item: MenuItem;
  onAdd: (nom: string) => void;
  delay?: number;
  accent?: string;
}

const FoodCard: FC<FoodCardProps> = ({ item, onAdd, delay = 0, accent = "#e74c3c" }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
        backdropFilter: "blur(24px)",
        border: hovered ? `1px solid ${accent}55` : "1px solid rgba(255,255,255,0.1)",
        borderRadius: 24,
        padding: "32px 28px",
        cursor: "pointer",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-6px)" : visible ? "translateY(0)" : "translateY(30px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${delay}ms`,
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${accent}22`
          : "0 8px 32px rgba(0,0,0,0.2)",
      }}
    >
      <div style={{
        fontSize: 52, marginBottom: 20,
        transform: hovered ? "scale(1.15) rotate(-5deg)" : "scale(1) rotate(0deg)",
        transition: "transform 0.35s ease",
        display: "inline-block",
      }}>
        {item.emoji}
      </div>

      <h3 style={{
        fontSize: 22, fontWeight: 900, color: "#fff",
        marginBottom: 8, fontFamily: "'Playfair Display', serif",
      }}>
        {item.nom}
      </h3>

      <p style={{
        fontSize: 14, color: "rgba(255,255,255,0.55)",
        fontFamily: "'Nunito', sans-serif", lineHeight: 1.6,
        marginBottom: 20,
      }}>
        {item.desc}
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: accent, fontFamily: "'Nunito', sans-serif" }}>
          {item.prix}
        </span>

        <button
          onClick={(e: MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); onAdd(item.nom); }}
          style={{
            background: hovered ? accent : "transparent",
            border: `2px solid ${accent}`,
            borderRadius: 50,
            color: hovered ? "#fff" : accent,
            padding: "8px 20px", fontSize: 13,
            fontFamily: "'Nunito', sans-serif", fontWeight: 800,
            cursor: "pointer", letterSpacing: 1,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.background = accent;
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
            if (!hovered) {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = accent;
            }
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          + Ajouter
        </button>
      </div>
    </div>
  );
};

export default function PageAccueil(): JSX.Element {
  const [scrollY, setScrollY] = useState<number>(0);
  const [activeSection] = useState<string>("accueil");
  const [cartCount, setCartCount] = useState<number>(0);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const plats: MenuItem[] = [
    { nom: "Pizza Italienne",  prix: "5000 FCFA", emoji: "🍕", desc: "Pâte fine, mozzarella fondante, basilic frais" },
    { nom: "Burger Américain", prix: "4500 FCFA", emoji: "🍔", desc: "Viande grillée, cheddar affiné, sauce maison" },
    { nom: "Sushi Japonais",   prix: "6000 FCFA", emoji: "🍣", desc: "Riz vinaigré, poisson frais du jour" },
    { nom: "Tacos Mexicain",   prix: "4000 FCFA", emoji: "🌮", desc: "Tortilla croustillante, guacamole, épices douces" },
    { nom: "Poulet Africain",  prix: "3500 FCFA", emoji: "🍗", desc: "Marinade traditionnelle, épices du terroir" },
    { nom: "Riz au poisson",   prix: "5000 FCFA", emoji: "🐟", desc: "Thiéboudienne, légumes du marché" },
    { nom: "Pâtes Italiennes", prix: "4000 FCFA", emoji: "🍝", desc: "Sauce tomate mijotée, parmesan râpé" },
  ];

  const collations: MenuItem[] = [
    { nom: "Eau minérale",   prix: "1500 FCFA", emoji: "💧", desc: "Pure et fraîche, toujours disponible" },
    { nom: "Muffin chocolat",prix: "2000 FCFA", emoji: "🧁", desc: "Moelleux, cœur fondant, fait maison" },
    { nom: "Bissap",          prix: "1000 FCFA", emoji: "🌺", desc: "Jus d'hibiscus, recette traditionnelle" },
    { nom: "Smoothie fruité", prix: "2500 FCFA", emoji: "🥤", desc: "Fruits frais mixés, sans sucre ajouté" },
  ];

  const socialLinks: SocialLink[] = [
    { icon: "📘", label: "Facebook",  color: "#3b5998" },
    { icon: "📸", label: "Instagram", color: "#e1306c" },
    { icon: "📞", label: "Téléphone", color: "#27ae60" },
  ];

  const navSections: string[] = ["accueil", "menu", "collations", "contact"];

  const addToCart = (nom: string): void => {
    setCartCount((c) => c + 1);
    setToast(nom);
    setTimeout(() => setToast(null), 2500);
  };

  const scrollToSection = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1a1a1a", overflowX: "hidden" }}>

      {/* ── BACKGROUND FIXE SUR TOUT LE SITE ── */}
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: "url('/télécharger (7).jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        zIndex: 0,
        transform: `scale(1.05) translateY(${scrollY * 0.02}px)`,
        transition: "transform 0.1s ease-out",
      }} />
      <div style={{
        position: "fixed", inset: 0,
        background: "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(20,10,5,0.65) 100%)",
        zIndex: 1,
      }} />

      {/* ── TOAST ── */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 32, right: 32, zIndex: 9999,
          background: "#c0392b", color: "#fff",
          padding: "14px 24px", borderRadius: 50,
          fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 15,
          boxShadow: "0 8px 32px rgba(192,57,43,0.5)",
          animation: "slideIn 0.3s ease",
        }}>
          ✓ {toast} ajouté au panier
        </div>
      )}

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 48px",
        background: scrollY > 60 ? "rgba(10,5,2,0.9)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(20px)" : "none",
        borderBottom: scrollY > 60 ? "1px solid rgba(192,57,43,0.2)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28 }}>🍴</span>
          <div>
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 900, letterSpacing: 1, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
              Les Délices
            </div>
            <div style={{ color: "#e74c3c", fontSize: 11, letterSpacing: 4, fontFamily: "'Nunito', sans-serif", fontWeight: 700, textTransform: "uppercase" }}>
              de Ibeau
            </div>
          </div>
        </div>

        <ul style={{ display: "flex", gap: 40, listStyle: "none", margin: 0, padding: 0 }}>
          {navSections.map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(section)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "#fff", fontSize: 14, letterSpacing: 2,
                  fontFamily: "'Nunito', sans-serif", fontWeight: 700,
                  textTransform: "uppercase", padding: "4px 0",
                  borderBottom: activeSection === section ? "2px solid #e74c3c" : "2px solid transparent",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = "#e74c3c"; }}
                onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = "#fff"; }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        <button
          style={{
            background: "#e74c3c", border: "none", borderRadius: 50,
            color: "#fff", fontFamily: "'Nunito', sans-serif", fontWeight: 800,
            padding: "10px 22px", cursor: "pointer", fontSize: 14,
            display: "flex", alignItems: "center", gap: 8,
            boxShadow: "0 4px 20px rgba(231,76,60,0.4)", transition: "all 0.3s ease",
          }}
          onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 6px 28px rgba(231,76,60,0.6)";
          }}
          onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(231,76,60,0.4)";
          }}
        >
          🛒 <span>{cartCount}</span>
        </button>
      </nav>

      {/* ── HERO ── */}
      <section id="accueil" style={{
        position: "relative", zIndex: 2,
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", textAlign: "center",
        padding: "0 24px",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(231,76,60,0.15)", border: "1px solid rgba(231,76,60,0.4)",
          borderRadius: 50, padding: "8px 20px", marginBottom: 32,
          backdropFilter: "blur(10px)",
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#e74c3c", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ color: "#f5a78c", fontFamily: "'Nunito', sans-serif", fontSize: 13, letterSpacing: 2, fontWeight: 700 }}>
            OUVERT MAINTENANT
          </span>
        </div>

        <h1 style={{
          fontSize: "clamp(48px, 8vw, 96px)",
          fontWeight: 900, color: "#fff",
          lineHeight: 1.1, marginBottom: 24,
          textShadow: "0 4px 40px rgba(0,0,0,0.6)", letterSpacing: -1,
        }}>
          Voyage culinaire<br />
          <span style={{ color: "#e74c3c", fontStyle: "italic" }}>à travers le monde</span>
        </h1>

        <p style={{
          fontSize: 18, color: "rgba(255,255,255,0.75)",
          maxWidth: 540, lineHeight: 1.8, marginBottom: 48,
          fontFamily: "'Nunito', sans-serif", fontWeight: 400,
        }}>
          Des saveurs authentiques venues des quatre coins du globe,<br />
          préparées avec passion à Dakar. 🌍
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => scrollToSection("menu")}
            style={{
              background: "#e74c3c", color: "#fff", border: "none",
              padding: "16px 40px", borderRadius: 50, fontSize: 16,
              fontFamily: "'Nunito', sans-serif", fontWeight: 800, cursor: "pointer",
              boxShadow: "0 8px 32px rgba(231,76,60,0.5)",
              letterSpacing: 1, transition: "all 0.3s ease",
            }}
            onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 16px 40px rgba(231,76,60,0.6)";
            }}
            onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(231,76,60,0.5)";
            }}
          >
            Découvrir le menu ↓
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            style={{
              background: "transparent", color: "#fff",
              border: "2px solid rgba(255,255,255,0.4)",
              padding: "16px 40px", borderRadius: 50, fontSize: 16,
              fontFamily: "'Nunito', sans-serif", fontWeight: 700, cursor: "pointer",
              backdropFilter: "blur(10px)", letterSpacing: 1, transition: "all 0.3s ease",
            }}
            onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.borderColor = "#e74c3c";
              e.currentTarget.style.color = "#e74c3c";
            }}
            onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              e.currentTarget.style.color = "#fff";
            }}
          >
            Nous contacter
          </button>
        </div>

        {/* Stats */}
        <div style={{ position: "absolute", bottom: 48, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 48 }}>
          {([ ["11", "Spécialités"], ["🌍", "Cuisines du monde"], ["⭐", "Qualité premium"] ] as [string, string][]).map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#e74c3c" }}>{val}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "'Nunito', sans-serif", letterSpacing: 1 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", animation: "bounce 2s infinite" }}>
          <div style={{ width: 2, height: 40, background: "rgba(255,255,255,0.3)", margin: "0 auto", borderRadius: 2 }} />
        </div>
      </section>

      {/* ── SÉPARATEUR ── */}
      {(["NOS SPÉCIALITÉS", "COLLATIONS & BOISSONS"] as const).slice(0, 1).map((label) => (
        <Divider key={label} label={label} />
      ))}

      {/* ── MENU PLATS ── */}
      <section id="menu" style={{ position: "relative", zIndex: 2, padding: "60px 48px 80px" }}>
        <SectionTitle title="Nos spécialités 🍽️" sub="Des plats authentiques, mijotés avec amour" />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24, maxWidth: 1100, margin: "0 auto",
        }}>
          {plats.map((plat, i) => (
            <FoodCard key={plat.nom} item={plat} onAdd={addToCart} delay={i * 80} />
          ))}
        </div>
      </section>

      <Divider label="COLLATIONS & BOISSONS" />

      {/* ── COLLATIONS ── */}
      <section id="collations" style={{ position: "relative", zIndex: 2, padding: "60px 48px 80px" }}>
        <SectionTitle title="Nos collations 🍩" sub="Pour accompagner chaque moment de la journée" />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 24, maxWidth: 1100, margin: "0 auto",
        }}>
          {collations.map((snack, i) => (
            <FoodCard key={snack.nom} item={snack} onAdd={addToCart} delay={i * 80} accent="#f39c12" />
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ position: "relative", zIndex: 2, padding: "80px 48px" }}>
        <div style={{
          maxWidth: 700, margin: "0 auto", textAlign: "center",
          background: "rgba(0,0,0,0.45)", backdropFilter: "blur(20px)",
          borderRadius: 32, padding: "64px 48px",
          border: "1px solid rgba(231,76,60,0.2)",
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🍴</div>
          <h2 style={{ fontSize: 42, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Trouvez-nous</h2>
          <p style={{
            color: "rgba(255,255,255,0.6)", fontFamily: "'Nunito', sans-serif",
            fontSize: 16, lineHeight: 1.8, marginBottom: 40,
          }}>
            Venez nous rendre visite ou commandez en ligne.<br />
            Nous sommes là pour vous régaler chaque jour.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            {socialLinks.map(({ icon, label, color }) => (
              <button
                key={label}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: `${color}22`, border: `1px solid ${color}55`,
                  borderRadius: 50, padding: "12px 28px", cursor: "pointer",
                  color: "#fff", fontFamily: "'Nunito', sans-serif", fontWeight: 700,
                  fontSize: 15, transition: "all 0.3s ease",
                }}
                onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.background = color;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.background = `${color}22`;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {icon} {label}
              </button>
            ))}
          </div>

          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32,
            color: "rgba(255,255,255,0.4)", fontFamily: "'Nunito', sans-serif",
            fontSize: 13, letterSpacing: 1,
          }}>
            © 2026 Les Délices de Ibeau · Dakar, Sénégal · Tous droits réservés
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Nunito:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </div>
  );
}

/* ── Helpers ── */

const Divider: FC<{ label: string }> = ({ label }) => (
  <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "24px 0" }}>
    <div style={{
      display: "inline-block",
      border: "1px solid rgba(231,76,60,0.4)", borderRadius: 50,
      padding: "8px 32px", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(10px)",
      color: "rgba(255,255,255,0.5)", fontFamily: "'Nunito', sans-serif",
      fontSize: 13, letterSpacing: 3,
    }}>
      ✦ {label} ✦
    </div>
  </div>
);

const SectionTitle: FC<{ title: string; sub: string }> = ({ title, sub }) => (
  <div style={{ textAlign: "center", marginBottom: 56 }}>
    <h2 style={{
      fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#fff",
      marginBottom: 12, textShadow: "0 2px 20px rgba(0,0,0,0.5)",
    }}>
      {title}
    </h2>
    <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Nunito', sans-serif", fontSize: 16 }}>
      {sub}
    </p>
  </div>
);
