import { useEffect, useMemo, useState } from "react";
import { PRODUCTS, SIZES, fmt } from "./data/products.js";

const CATS = ["All", "Tees", "Hoodies", "Bottoms", "Accessories"];
const TICKER = "FREE DELIVERY IN LAGOS OVER ₦50,000 · NATIONWIDE SHIPPING 2–5 DAYS · ÈKÓ Ò NÍ BÀJÉ · NEW DROP LIVE NOW · ";

function loadCart() {
  try { return JSON.parse(localStorage.getItem("eko-cart")) || []; } catch { return []; }
}

export default function App() {
  const [view, setView] = useState({ page: "home" });
  const [cat, setCat] = useState("All");
  const [cart, setCart] = useState(loadCart);
  const [drawer, setDrawer] = useState(false);
  const [size, setSize] = useState(null);
  const [paid, setPaid] = useState(false);

  useEffect(() => { localStorage.setItem("eko-cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { window.scrollTo(0, 0); setSize(null); }, [view]);

  const items = useMemo(() => cat === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat), [cat]);
  const count = cart.reduce((n, i) => n + i.qty, 0);
  const subtotal = cart.reduce((n, i) => n + i.qty * i.price, 0);
  const delivery = subtotal === 0 || subtotal >= 50000 ? 0 : 3500;

  const addToCart = (p, s) => {
    const key = p.id + "|" + s;
    setCart(c => {
      const hit = c.find(i => i.key === key);
      return hit ? c.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i)
                 : [...c, { key, id: p.id, name: p.name, price: p.price, size: s, img: p.img, qty: 1 }];
    });
    setPaid(false);
    setDrawer(true);
  };
  const setQty = (key, d) => setCart(c => c.map(i => i.key === key ? { ...i, qty: Math.max(1, i.qty + d) } : i));
  const removeItem = (key) => setCart(c => c.filter(i => i.key !== key));
  const goShop = (c = "All") => { setCat(c); setView({ page: "home" }); setTimeout(() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }), 40); };

  const product = view.page === "product" ? PRODUCTS.find(p => p.id === view.id) : null;

  return (
    <>
      <div className="ticker" aria-hidden="true"><div className="ticker-track">{TICKER.repeat(4)}</div></div>

      <nav className="nav">
        <button className="brand" onClick={() => setView({ page: "home" })}>ÈK<span>Ó</span></button>
        <ul className="nav-links">
          {CATS.map(c => (
            <li key={c}><button className={c === cat && view.page === "home" ? "active" : ""} onClick={() => goShop(c)}>{c}</button></li>
          ))}
        </ul>
        <button className="cart-btn" onClick={() => setDrawer(true)} aria-label={`Open cart, ${count} items`}>CART [{count}]</button>
      </nav>

      {product ? (
        <section className="pview">
          <div className="pview-img">
            <img src={product.img} alt={product.name} />
          </div>
          <div className="pview-info">
            <button className="back-link" onClick={() => goShop(cat)}>← Back to shop</button>
            <span className="psku">{product.id} / {product.cat.toUpperCase()}</span>
            <h1>{product.name}</h1>
            <div className="pview-price">{fmt(product.price)}</div>
            <p className="pview-desc">{product.desc}</p>
            <div>
              <div className="size-label" style={{ marginBottom: 8 }}>Select size</div>
              <div className="sizes">
                {SIZES[product.cat].map(s => (
                  <button key={s} className={"size" + (size === s ? " on" : "")} onClick={() => setSize(s)}>{s}</button>
                ))}
              </div>
            </div>
            <button className="add-btn" onClick={() => size ? addToCart(product, size) : null} disabled={!size} style={{ opacity: size ? 1 : 0.45 }}>
              {size ? "Add to cart — " + fmt(product.price) : "Pick a size first"}
            </button>
            <div className="pview-meta">
              LAGOS DELIVERY: 24–48HRS<br />
              NATIONWIDE: 2–5 WORKING DAYS<br />
              RETURNS: 7 DAYS, UNWORN, TAGS ON
            </div>
          </div>
        </section>
      ) : (
        <>
          <header className="hero">
            <div className="hero-copy">
              <span className="hero-eyebrow">STREETWEAR · MADE IN LAGOS · EST. 2026</span>
              <h1>Worn by <em>the city</em> that never rests.</h1>
              <p>Heavyweight cuts built for Lagos — from Ojuelegba to the Island. Danfo yellow, hazard stripes, no wahala.</p>
              <div className="hero-cta">
                <button className="btn btn-yellow" onClick={() => goShop("All")}>Shop the drop</button>
                <button className="btn" onClick={() => goShop("Hoodies")}>Hoodies</button>
              </div>
            </div>
            <div className="hero-art">
              <img src="/img/hero.webp" alt="Model wearing the Ojuelegba Hoodie on a Lagos street" loading="eager" />
              <span className="hero-stamp">EK-004 / OJUELEGBA HOODIE</span>
            </div>
          </header>

          <div className="hazard" aria-hidden="true"></div>

          <section className="shop" id="shop">
            <div className="shop-head">
              <h2>The Shop</h2>
              <div className="filters">
                {CATS.map(c => (
                  <button key={c} className={"chip" + (c === cat ? " on" : "")} onClick={() => setCat(c)}>{c}</button>
                ))}
              </div>
            </div>
            <div className="grid">
              {items.map(p => (
                <button key={p.id} className="pcard" onClick={() => setView({ page: "product", id: p.id })}>
                  <div className="pcard-img">
                    {p.tag && <span className="ptag">{p.tag}</span>}
                    <img src={p.img} alt={p.name} loading="lazy" />
                  </div>
                  <div className="pcard-info">
                    <span className="psku">{p.id}</span>
                    <span className="pname">{p.name}</span>
                    <span className="pprice">{fmt(p.price)}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <div className="hazard" aria-hidden="true"></div>

          <section className="street">
            <img src="/img/street.webp" alt="ÈKÓ streetwear worn in the city" loading="lazy" />
            <div className="street-caption">WORN ON THE STREET — <em>ÈKÓ Ò NÍ BÀJÉ</em></div>
          </section>

          <div className="hazard" aria-hidden="true"></div>

          <section className="about-band">
            <div className="band-cell"><h3>Cut heavy</h3><p>280–480gsm fabrics only. Nothing flimsy — everything is built to outlast the hype.</p></div>
            <div className="band-cell"><h3>Lagos first</h3><p>Designed, sampled and shot in Lagos. Free delivery on the mainland and island over ₦50,000.</p></div>
            <div className="band-cell"><h3>Small runs</h3><p>Every drop is limited. When a size sells out, it's gone until the next run.</p></div>
          </section>
        </>
      )}

      <footer className="footer">
        <div className="footer-brand">ÈKÓ Ò NÍ BÀJÉ</div>
        <div className="footer-row">
          <span>© 2026 ÈKÓ SUPPLY — LAGOS, NIGERIA</span>
          <span>DEMO STORE · BUILT BY AJIBADE EMMANUEL</span>
        </div>
      </footer>

      {drawer && (
        <>
          <div className="overlay" onClick={() => setDrawer(false)}></div>
          <aside className="drawer" role="dialog" aria-label="Shopping cart">
            <div className="drawer-head">
              <h2>Your cart [{count}]</h2>
              <button className="drawer-close" onClick={() => setDrawer(false)} aria-label="Close cart">✕</button>
            </div>
            <div className="drawer-items">
              {cart.length === 0 && <div className="drawer-empty">CART IS EMPTY.<br />NO WAHALA — GO ADD SOMETHING.</div>}
              {cart.map(i => (
                <div className="cart-row" key={i.key}>
                  <div className="cart-thumb"><img src={i.img} alt={i.name} /></div>
                  <div>
                    <div className="cart-name">{i.name}</div>
                    <div className="cart-meta">{i.id} · SIZE {i.size}</div>
                    <div className="qty">
                      <button onClick={() => setQty(i.key, -1)} aria-label="Decrease quantity">−</button>
                      <span>{i.qty}</span>
                      <button onClick={() => setQty(i.key, 1)} aria-label="Increase quantity">+</button>
                    </div>
                  </div>
                  <div className="cart-right">
                    <span className="cart-price">{fmt(i.price * i.qty)}</span>
                    <button className="rm" onClick={() => removeItem(i.key)}>remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="drawer-foot">
              <div className="total-row"><span>SUBTOTAL</span><span>{fmt(subtotal)}</span></div>
              <div className="total-row"><span>DELIVERY</span><span>{delivery === 0 ? "FREE" : fmt(delivery)}</span></div>
              <div className="total-row big"><span>TOTAL</span><span>{fmt(subtotal + delivery)}</span></div>
              <span className="note">Free Lagos delivery over ₦50,000. This is a portfolio demo — no real payment is processed.</span>
              {paid ? (
                <div className="paid-msg">ORDER PLACED ✓ (DEMO) — THANK YOU!</div>
              ) : (
                <button className="checkout-btn" disabled={cart.length === 0} style={{ opacity: cart.length ? 1 : 0.45 }}
                  onClick={() => { setPaid(true); setCart([]); }}>
                  Checkout — {fmt(subtotal + delivery)}
                </button>
              )}
            </div>
          </aside>
        </>
      )}
    </>
  );
}
