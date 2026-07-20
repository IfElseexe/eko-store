import { useEffect, useMemo, useState, createContext, useContext } from "react";
import { Routes, Route, Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { PRODUCTS, SIZES, fmt, slug } from "./data/products.js";

// Set your Paystack TEST public key (pk_test_...) to enable card checkout.
const PAYSTACK_PUBLIC_KEY = "";

const CATS = ["All", "Tees", "Hoodies", "Bottoms", "Accessories"];
const TICKER = "FREE DELIVERY IN LAGOS OVER ₦50,000 · SECURE CHECKOUT · ÈKÓ Ò NÍ BÀJÉ · NEW DROP LIVE NOW · ";
const CartCtx = createContext(null);

function loadCart(){ try { return JSON.parse(localStorage.getItem("eko-cart")) || []; } catch { return []; } }

function Stars({ p }) {
  return <span className="stars">★ {p.rating} <em>({p.reviews})</em></span>;
}

function Nav() {
  const { count } = useContext(CartCtx);
  return (<>
    <div className="ticker" aria-hidden="true"><div className="ticker-track">{TICKER.repeat(4)}</div></div>
    <nav className="nav">
      <Link className="brand" to="/">ÈK<span>Ó</span></Link>
      <ul className="nav-links">
        <li><Link to="/#shop">Shop</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/help">Help</Link></li>
      </ul>
      <Link className="cart-btn" to="/cart" aria-label={`Cart, ${count} items`}>CART [{count}]</Link>
    </nav>
  </>);
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">ÈKÓ Ò NÍ BÀJÉ</div>
      <div className="footer-cols">
        <div><b>Shop</b><Link to="/#shop">All items</Link><Link to="/#shop">New drops</Link><Link to="/#shop">Limited</Link></div>
        <div><b>Help</b><Link to="/help">FAQ</Link><Link to="/help">Delivery &amp; returns</Link><a href="https://wa.me/2347062723107?text=Hi%20%C3%88K%C3%93%2C%20I%20have%20a%20question." target="_blank" rel="noopener">Contact us</a></div>
        <div><b>Company</b><Link to="/about">About ÈKÓ</Link><a href="https://portfolio1-lemon-omega-85.vercel.app" target="_blank" rel="noopener">Built by Ajibade Emmanuel</a></div>
      </div>
      <div className="footer-row">
        <span>ÈKÓ is a portfolio demo store. No real products are sold.</span>
        <span>© 2026 ÈKÓ SUPPLY — LAGOS</span>
      </div>
    </footer>
  );
}

function Home() {
  const [cat, setCat] = useState("All");
  const items = useMemo(() => cat === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat), [cat]);
  const { hash } = useLocation();
  useEffect(() => { if (hash === "#shop") document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }, [hash]);
  return (<>
    <header className="hero">
      <div className="hero-copy">
        <span className="hero-eyebrow">STREETWEAR · MADE IN LAGOS · EST. 2026</span>
        <h1>Worn by <em>the city</em> that never rests.</h1>
        <p>Heavyweight cuts built for Lagos, from Ojuelegba to the Island. Danfo yellow, hazard stripes, no wahala.</p>
        <div className="hero-cta">
          <Link className="btn btn-yellow" to="/#shop">Shop the drop</Link>
          <Link className="btn" to={"/product/" + slug(PRODUCTS[3])}>Best seller</Link>
        </div>
      </div>
      <div className="hero-art">
        <img src="/img/hero.webp" alt="Model wearing the Ojuelegba Hoodie" loading="eager" />
        <span className="hero-stamp">EK-004 / OJUELEGBA HOODIE</span>
      </div>
    </header>
    <div className="hazard" aria-hidden="true"></div>
    <section className="shop" id="shop">
      <div className="shop-head">
        <h2>The Shop</h2>
        <div className="filters">{CATS.map(c => <button key={c} className={"chip" + (c === cat ? " on" : "")} onClick={() => setCat(c)}>{c}</button>)}</div>
      </div>
      <div className="grid">
        {items.map(p => (
          <Link key={p.id} className="pcard" to={"/product/" + slug(p)}>
            <div className="pcard-img">{p.tag && <span className="ptag">{p.tag}</span>}<img src={p.img} alt={p.name} loading="lazy" /></div>
            <div className="pcard-info">
              <span className="pname">{p.name}</span>
              <Stars p={p} />
              <span className="prow"><span className="pprice">{fmt(p.price)}</span><span className="parrow">→</span></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
    <div className="hazard" aria-hidden="true"></div>
    <section className="street">
      <img src="/img/street.webp" alt="ÈKÓ streetwear worn in the city" loading="lazy" />
      <div className="street-caption">WORN ON THE STREET — <em>ÈKÓ Ò NÍ BÀJÉ</em></div>
    </section>
  </>);
}

function ProductPage() {
  const { pslug } = useParams();
  const p = PRODUCTS.find(x => slug(x) === pslug);
  const [size, setSize] = useState(null);
  const { add } = useContext(CartCtx);
  const nav = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); setSize(null); }, [pslug]);
  if (!p) return <div className="notfound">Item not found. <Link to="/">Back to shop</Link></div>;
  const others = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 3);
  return (<>
    <section className="pview">
      <div className="pview-img"><img src={p.img} alt={p.name} /></div>
      <div className="pview-info">
        <Link className="back-link" to="/#shop">← Back to shop</Link>
        <span className="psku">{p.id} / {p.cat.toUpperCase()}</span>
        <h1>{p.name}</h1>
        <Stars p={p} />
        <div className="pview-price">{fmt(p.price)}</div>
        <p className="pview-desc">{p.desc}</p>
        <div>
          <div className="size-label" style={{ marginBottom: 8 }}>Select size</div>
          <div className="sizes">{SIZES[p.cat].map(s => <button key={s} className={"size" + (size === s ? " on" : "")} onClick={() => setSize(s)}>{s}</button>)}</div>
        </div>
        <button className="add-btn" disabled={!size} style={{ opacity: size ? 1 : 0.45 }}
          onClick={() => { if (size) { add(p, size); nav("/cart"); } }}>
          {size ? "Add to cart — " + fmt(p.price) : "Pick a size first"}
        </button>
        <div className="pview-meta">LAGOS DELIVERY: 24–48HRS<br />NATIONWIDE: 2–5 WORKING DAYS<br />RETURNS: 7 DAYS, UNWORN, TAGS ON</div>
      </div>
    </section>
    <section className="also">
      <h2>You might also like</h2>
      <div className="grid">
        {others.map(o => (
          <Link key={o.id} className="pcard" to={"/product/" + slug(o)}>
            <div className="pcard-img"><img src={o.img} alt={o.name} loading="lazy" /></div>
            <div className="pcard-info"><span className="pname">{o.name}</span><span className="prow"><span className="pprice">{fmt(o.price)}</span><span className="parrow">→</span></span></div>
          </Link>
        ))}
      </div>
    </section>
  </>);
}

function CartPage() {
  const { cart, setQty, remove, subtotal, delivery, clear } = useContext(CartCtx);
  const [paid, setPaid] = useState(false);
  const total = subtotal + delivery;
  function checkout() {
    if (!cart.length) return;
    if (PAYSTACK_PUBLIC_KEY && window.PaystackPop) {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: "customer@ekostore.demo",
        amount: total * 100,
        currency: "NGN",
        callback: () => { setPaid(true); clear(); },
        onClose: () => {},
      });
      handler.openIframe();
    } else { setPaid(true); clear(); }
  }
  return (
    <section className="cartpage">
      <h1>Your Cart</h1>
      {paid && <div className="paid-msg">ORDER PLACED ✓ — THANK YOU! A CONFIRMATION IS ON ITS WAY.</div>}
      {!cart.length && !paid && <div className="drawer-empty">CART IS EMPTY.<br />NO WAHALA — <Link to="/#shop" style={{color:"var(--danfo-deep)"}}>GO ADD SOMETHING</Link>.</div>}
      {cart.length > 0 && (<div className="cart-grid">
        <div className="cart-items">
          {cart.map(i => (
            <div className="cart-row" key={i.key}>
              <div className="cart-thumb"><img src={i.img} alt={i.name} /></div>
              <div>
                <div className="cart-name">{i.name}</div>
                <div className="cart-meta">{i.id} · SIZE {i.size}</div>
                <div className="qty">
                  <button onClick={() => setQty(i.key, -1)} aria-label="Decrease">−</button><span>{i.qty}</span><button onClick={() => setQty(i.key, 1)} aria-label="Increase">+</button>
                </div>
              </div>
              <div className="cart-right"><span className="cart-price">{fmt(i.price * i.qty)}</span><button className="rm" onClick={() => remove(i.key)}>remove</button></div>
            </div>
          ))}
        </div>
        <aside className="summary">
          <h2>Summary</h2>
          <div className="total-row"><span>SUBTOTAL</span><span>{fmt(subtotal)}</span></div>
          <div className="total-row"><span>DELIVERY</span><span>{delivery === 0 ? "FREE" : fmt(delivery)}</span></div>
          <div className="total-row big"><span>TOTAL</span><span>{fmt(total)}</span></div>
          <button className="checkout-btn" onClick={checkout}>{PAYSTACK_PUBLIC_KEY ? "Pay with Paystack" : "Checkout"} — {fmt(total)}</button>
          <span className="note">{PAYSTACK_PUBLIC_KEY ? "Secure checkout by Paystack (test mode)." : "Demo checkout — no real payment is processed."} Free Lagos delivery over ₦50,000.</span>
        </aside>
      </div>)}
    </section>
  );
}

function About() {
  return (
    <section className="page">
      <h1>About ÈKÓ</h1>
      <p>ÈKÓ (the Yoruba name for Lagos) is a streetwear label built on one idea: clothes as tough and loud as the city that inspires them. Heavyweight fabrics, small runs, danfo-yellow energy.</p>
      <p>Every piece is named for the city — Ojuelegba, Surulere, Third Mainland — and cut for how Lagos actually moves. Nothing flimsy. Nothing quiet.</p>
      <p className="note">ÈKÓ is a portfolio demonstration store built by <a href="https://portfolio1-lemon-omega-85.vercel.app" target="_blank" rel="noopener">Ajibade Emmanuel</a>. No real products are sold.</p>
    </section>
  );
}

function Help() {
  const faqs = [
    ["How long does delivery take?", "Lagos orders arrive in 24–48 hours. Nationwide delivery takes 2–5 working days."],
    ["What is the return policy?", "7 days, unworn with tags on. Message us on WhatsApp to start a return."],
    ["How do sizes run?", "ÈKÓ cuts are boxy and true to size. If you prefer a slimmer fit, size down."],
    ["Is checkout secure?", "Card payments are handled by Paystack. We never see or store your card details."],
    ["How do I contact ÈKÓ?", "Fastest is WhatsApp — tap Contact us in the footer and we'll reply quickly."],
  ];
  return (
    <section className="page">
      <h1>Help &amp; FAQ</h1>
      {faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
    </section>
  );
}

export default function App() {
  const [cart, setCart] = useState(loadCart);
  useEffect(() => { localStorage.setItem("eko-cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => {
    if (PAYSTACK_PUBLIC_KEY && !document.getElementById("ps-js")) {
      const s = document.createElement("script"); s.id = "ps-js"; s.src = "https://js.paystack.co/v1/inline.js"; document.body.appendChild(s);
    }
  }, []);
  const api = {
    cart,
    count: cart.reduce((n, i) => n + i.qty, 0),
    subtotal: cart.reduce((n, i) => n + i.qty * i.price, 0),
    get delivery() { return this.subtotal === 0 || this.subtotal >= 50000 ? 0 : 3500; },
    add(p, size) {
      const key = p.id + "|" + size;
      setCart(c => { const hit = c.find(i => i.key === key);
        return hit ? c.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i)
          : [...c, { key, id: p.id, name: p.name, price: p.price, size, img: p.img, qty: 1 }]; });
    },
    setQty(key, d) { setCart(c => c.map(i => i.key === key ? { ...i, qty: Math.max(1, i.qty + d) } : i)); },
    remove(key) { setCart(c => c.filter(i => i.key !== key)); },
    clear() { setCart([]); },
  };
  return (
    <CartCtx.Provider value={api}>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:pslug" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<div className="notfound">Page not found. <Link to="/">Go home</Link></div>} />
      </Routes>
      <Footer />
    </CartCtx.Provider>
  );
}
