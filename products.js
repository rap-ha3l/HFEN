// Edit products and prices here (prices in naira).
// Format: [name, category, tag, INCI name ('' if unknown), variants]
const ML = ['50 ml', '100 ml', '250 ml', '500 ml', '1 L'];
const G = ['50 g', '100 g', '250 g', '500 g', '1 kg'];
const mk = (labels, prices) => prices.map((price, i) => ({ label: labels[i], price }));
const oil = prices => mk(ML, prices);
const gr = prices => mk(G, prices);
const two = (a, pa, b, pb) => [{ label: a, price: pa }, { label: b, price: pb }];
const STD = [1000, 2000, 3500, 6500, 12000];
const MID = [1000, 2000, 4000, 7500, 14000];
const HIGH = [1000, 2000, 4500, 8000, 15000];
const SK = 'Skin & hair';

const PRODUCTS = [
  /* ---------- Oils, butters & liquids ---------- */
  ['Sweet Almond Oil', 'oil', SK, 'Prunus Amygdalus Dulcis Oil', oil(STD)],
  ['Bitter Almond Oil', 'oil', SK, 'Prunus Amygdalus Amara Kernel Oil', oil(STD)],
  ['Argan Oil', 'oil', SK, 'Argania Spinosa Kernel Oil', oil(STD)],
  ['Apricot Oil', 'oil', SK, 'Prunus Armeniaca Kernel Oil', oil(STD)],
  ['Aloe Vera Oil', 'oil', SK, '', oil(STD)],
  ['Amla Oil', 'oil', SK, '', oil(STD)],
  ['Avocado Oil', 'oil', SK, 'Persea Gratissima Oil', oil(STD)],
  ['Black Seed Oil (Carrier)', 'oil', SK, 'Nigella Sativa Seed Oil', oil(STD)],
  ['Baobab Oil', 'oil', SK, 'Adansonia Digitata Seed Oil', oil(STD)],
  ['Bearberry Oil', 'oil', SK, '', oil(MID)],
  ['Mulberry Oil', 'oil', SK, '', oil(MID)],
  ['Batana Oil', 'oil', SK, 'Elaeis Oleifera Kernel Oil', oil(HIGH)],
  ['Camellia Oil', 'oil', SK, 'Camellia Oleifera Seed Oil', oil(STD)],
  ['Chamomile Oil', 'oil', SK, '', oil([1000, 2000, 4500, 7500, 14000])],
  ['Carrot Oil', 'oil', SK, '', oil(STD)],
  ['Carrot Seed Oil', 'oil', SK, 'Daucus Carota Sativa Seed Oil', oil([1000, 2000, 3500, 8500, 12000])],
  ['Castor Oil (Hair/Skin Care)', 'oil', SK, 'Ricinus Communis Seed Oil', oil(HIGH)],
  ['Jamaican Black Castor Oil', 'oil', SK, 'Ricinus Communis Seed Oil', oil(HIGH)],
  ['Coconut Oil', 'oil', SK, 'Cocos Nucifera Oil', oil([1000, 2000, 3500, 5500, 10000])],
  ['Cucumber Oil', 'oil', SK, '', oil(STD)],
  ['Evening Primrose Oil', 'oil', SK, 'Oenothera Biennis Oil', oil(STD)],
  ['Flaxseed Oil (Carrier)', 'oil', SK, 'Linum Usitatissimum Seed Oil', oil([1000, 2000, 4500, 8500, 12000])],
  ['Grapeseed Oil', 'oil', SK, 'Vitis Vinifera Seed Oil', oil(STD)],
  ['Grapefruit Oil', 'oil', SK, '', oil(STD)],
  ['Hempseed Oil', 'oil', SK, 'Cannabis Sativa Seed Oil', oil(STD)],
  ['Jojoba Oil', 'oil', SK, 'Simmondsia Chinensis Seed Oil', oil(STD)],
  ['Macadamia Nut Oil', 'oil', SK, 'Macadamia Ternifolia Seed Oil', oil(STD)],
  ['Moringa Seed Oil', 'oil', SK, 'Moringa Oleifera Seed Oil', oil(MID)],
  ['Moringa Leaf Oil', 'oil', SK, '', oil(MID)],
  ['Mustard Seed Oil', 'oil', SK, '', oil(MID)],
  ['Olive Carrier Oil', 'oil', SK, 'Olea Europaea Fruit Oil', two('100 ml', 2000, '1 L', 12000)],
  ['Lavender Carrier Oil', 'oil', SK, 'Lavandula Angustifolia Oil', two('100 ml', 2000, '1 L', 12000)],
  ['Vitamin E Oil', 'oil', 'Vitamin oil', '', oil(HIGH)],
  ['Vitamin A Oil', 'oil', 'Vitamin oil', '', oil([5500, 10000, 22000, 40000, 78000])],
  ['Vitamin C Oil', 'oil', 'Vitamin oil', '', oil(HIGH)],
  ['Black Seed Oil (Edible)', 'oil', 'Edible grade', 'Nigella Sativa Seed Oil', oil(MID)],
  ['Castor Oil (Edible)', 'oil', 'Edible grade', 'Ricinus Communis Seed Oil', oil(HIGH)],
  ['Flaxseed Oil (Edible)', 'oil', 'Edible grade', 'Linum Usitatissimum Seed Oil', oil(MID)],
  ['Mustard Seed Oil (Edible)', 'oil', 'Edible grade', '', oil([1000, 2000, 7500, 14500, 28000])],
  ['Raw Shea Butter', 'oil', 'Butter', 'Butyrospermum Parkii Butter', [{ label: '100 g', price: 1500 }, { label: '250 g', price: 2800 }, { label: '500 g', price: 5250 }, { label: '1 kg', price: 10000 }]],
  ['Pure Mango Butter', 'oil', 'Butter', 'Mangifera Indica Seed Butter', [{ label: '100 g', price: 1500 }, { label: '250 g', price: 3000 }, { label: '500 g', price: 5500 }, { label: '1 kg', price: 10000 }]],
  ['Pure Vegetable Glycerin', 'oil', 'Liquid', 'Glycerin', oil([500, 1000, 2300, 4300, 8000])],
  ['Dehyquart A', 'oil', 'Liquid', 'Cetrimonium Chloride', two('100 ml', 2000, '1 L', 12000)],
  ['Original Thick Honey', 'oil', 'Honey', '', [{ label: '1 L', price: 12000 }]],

  /* ---------- Powders & extracts ---------- */
  ['Moroccan Blue Nila Powder', 'powder', 'Powder', '', two('50 g', 3500, '1 kg', 60000)],
  ['Creatine Monohydrate Powder', 'powder', 'Supplement', '', gr([3500, 7000, 16000, 31000, 60000])],
  ['BCAA Powder', 'powder', 'Supplement', '', gr([3500, 7000, 16000, 31000, 60000])],
  ['L-Arginine Powder', 'powder', 'Supplement', '', gr([3000, 6000, 13500, 26000, 50000])],
  ['Custard Apple Extract Powder', 'powder', 'Extract', '', gr([2500, 5000, 12000, 23000, 45000])],
  ['Maca Root Extract Powder', 'powder', 'Extract', '', gr([2500, 5000, 12000, 23000, 45000])],
  ['Pueraria Mirifica Extract (White)', 'powder', 'Extract', '', gr([2500, 5000, 12000, 23000, 45000])],
  ['Organic Shatavari Extract Powder', 'powder', 'Extract', '', gr([2500, 5000, 12000, 23000, 45000])],
  ['Saw Palmetto Extract', 'powder', 'Extract', 'Serenoa Repens Extract', gr([2300, 4500, 10500, 20500, 40000])],
  ['Saw Palmetto Berry Powder', 'powder', 'Powder', '', gr([2300, 4500, 10500, 20500, 40000])],
  ['Pure Spirulina Powder', 'powder', 'Powder', 'Arthrospira Platensis', gr([3000, 5500, 13000, 25500, 50000])],
  ['Cetyl Alcohol Powder', 'powder', 'Powder', 'Cetyl Alcohol', gr([500, 1000, 2500, 5000, 9500])],
  ['Xanthan Gum Powder', 'powder', 'Powder', 'Xanthan Gum', gr([1000, 1500, 3200, 6200, 12000])],
  ['Cashew Nut Powder', 'powder', 'Powder', '', gr([1500, 3000, 7000, 13000, 25000])],
  ['Coconut Powder', 'powder', 'Powder', '', gr([1000, 2000, 4500, 8500, 16000])],
  ['Oat Powder', 'powder', 'Powder', '', [{ label: '50 g', price: 1000 }, { label: '250 g', price: 3000 }, { label: '500 g', price: 5500 }, { label: '1 kg', price: 10000 }]],
  ['Milk Thistle Powder', 'powder', 'Powder', '', two('50 g', 2300, '1 kg', 42000)],
  ['Organic Brown Rice Powder', 'powder', 'Powder', '', two('50 g', 1000, '1 kg', 15000)],
  ['Rose Powder', 'powder', 'Powder', '', two('50 g', 2000, '1 kg', 35000)],
  ['Colloidal Oatmeal', 'powder', 'Powder', '', two('100 g', 2000, '1 kg', 10000)],

  /* ---------- Leaves & herbs ---------- */
  ['Parsley Leaf Powder', 'leaf', 'Leaf powder', '', two('50 g', 2000, '1 kg', 30000)],
  ['Mint Leaves', 'leaf', 'Dried leaf', '', two('50 g', 2000, '1 kg', 30000)],
  ['Senna Leaves', 'leaf', 'Dried leaf', '', two('50 g', 2300, '1 kg', 40000)],
  ['Dried Rosemary', 'leaf', 'Dried herb', '', two('50 g', 1500, '1 kg', 20000)],
  ['Dandelion Leaf', 'leaf', 'Dried leaf', '', two('50 g', 2500, '1 kg', 42000)]
].map(([name, cat, tag, inci, variants]) => ({ name, cat, tag, inci, variants }));
