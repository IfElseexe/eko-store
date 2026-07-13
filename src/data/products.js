export const PRODUCTS = [
  { id: "EK-001", name: "Danfo Heavyweight Tee", cat: "Tees", price: 18500, garment: "tee", base: "#FFD02F", ink: "#111110", tag: "NEW DROP", desc: "280gsm heavyweight cotton tee in signature danfo yellow. Boxy Lagos fit, drop shoulder, screen-printed ÈKÓ crest on the chest." },
  { id: "EK-002", name: "Third Mainland Tee", cat: "Tees", price: 16000, garment: "tee", base: "#1a1a1a", ink: "#FFD02F", desc: "Jet-black heavyweight tee with the Third Mainland Bridge skyline printed across the back. Pre-shrunk, true to size." },
  { id: "EK-003", name: "No Wahala Tee", cat: "Tees", price: 15500, garment: "tee", base: "#EDEAE3", ink: "#111110", desc: "Off-white staple tee. 'NO WAHALA' embroidered small on the left chest. The everyday one." },
  { id: "EK-004", name: "Ojuelegba Hoodie", cat: "Hoodies", price: 42000, garment: "hoodie", base: "#111110", ink: "#FFD02F", tag: "BEST SELLER", desc: "480gsm fleece-back hoodie in ink black. Oversized hood, kangaroo pocket, danfo-yellow drawcords. Built for harmattan nights." },
  { id: "EK-005", name: "Surulere Zip Hoodie", cat: "Hoodies", price: 45000, garment: "hoodie", base: "#4A5A48", ink: "#EDEAE3", desc: "Full-zip hoodie in faded olive. Heavy brass zip, ribbed cuffs, ÈKÓ woven label at the hem." },
  { id: "EK-006", name: "Èkó Crest Hoodie", cat: "Hoodies", price: 43500, garment: "hoodie", base: "#FFD02F", ink: "#111110", desc: "The loud one. Danfo-yellow fleece hoodie with the full ÈKÓ crest chain-stitched across the chest." },
  { id: "EK-007", name: "Okada Cargo Pant", cat: "Bottoms", price: 38000, garment: "cargo", base: "#3B3A36", ink: "#EDEAE3", tag: "RESTOCKED", desc: "Six-pocket ripstop cargo in charcoal. Adjustable ankle bungees, gusseted crotch — cut to move through Lagos traffic." },
  { id: "EK-008", name: "Island Wide Cargo", cat: "Bottoms", price: 39500, garment: "cargo", base: "#C9BFA8", ink: "#111110", desc: "Wide-leg cargo in sand ripstop. Relaxed through the thigh, stacked at the ankle." },
  { id: "EK-009", name: "Gidi Snapback", cat: "Accessories", price: 12000, garment: "cap", base: "#111110", ink: "#FFD02F", desc: "Structured 6-panel snapback, ÈKÓ raised embroidery in danfo yellow. One size." },
  { id: "EK-010", name: "Market Tote", cat: "Accessories", price: 9500, garment: "tote", base: "#EDEAE3", ink: "#111110", desc: "18oz canvas tote inspired by Balogun market carriers. Reinforced handles, inner zip pocket." },
  { id: "EK-011", name: "Hazard Socks (2-Pack)", cat: "Accessories", price: 6500, garment: "socks", base: "#FFD02F", ink: "#111110", desc: "Ribbed crew socks with the black/yellow hazard stripe at the cuff. Two pairs per pack." },
  { id: "EK-012", name: "Eko O Ni Baje Tee", cat: "Tees", price: 17000, garment: "tee", base: "#7A2E1D", ink: "#EDEAE3", tag: "LIMITED", desc: "Burnt-clay tee with 'ÈKÓ Ò NÍ BÀJÉ' printed in serif across the chest. Limited run of 200." },
];

export const SIZES = { Tees: ["S", "M", "L", "XL", "XXL"], Hoodies: ["S", "M", "L", "XL", "XXL"], Bottoms: ["28", "30", "32", "34", "36"], Accessories: ["ONE SIZE"] };

export const fmt = (n) => "₦" + n.toLocaleString("en-NG");
