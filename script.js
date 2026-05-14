const tiers = [
  {
    min: 50,
    prices: { 500: 6600, 250: 3575 },
    retail: { 500: 11000, 250: 5500 },
  },
  {
    min: 35,
    prices: { 500: 7700, 250: 3850 },
    retail: { 500: 11000, 250: 5500 },
  },
  {
    min: 20,
    prices: { 500: 8250, 250: 4125 },
    retail: { 500: 11000, 250: 5500 },
  },
];

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const quantityInput = document.querySelector("#quantity");
const sizeSelect = document.querySelector("#size");
const unitPrice = document.querySelector("#unit-price");
const investment = document.querySelector("#investment");
const totalProfit = document.querySelector("#total-profit");

function findTier(quantity) {
  return tiers.find((tier) => quantity >= tier.min) ?? tiers.at(-1);
}

function updateCalculator() {
  const quantity = Math.max(Number(quantityInput.value) || 20, 20);
  const size = sizeSelect.value;
  const tier = findTier(quantity);
  const purchasePrice = tier.prices[size];
  const retailPrice = tier.retail[size];
  const profitPerUnit = retailPrice - purchasePrice;

  quantityInput.value = quantity;
  unitPrice.textContent = currency.format(purchasePrice);
  investment.textContent = currency.format(purchasePrice * quantity);
  totalProfit.textContent = currency.format(profitPerUnit * quantity);
}

quantityInput.addEventListener("input", updateCalculator);
sizeSelect.addEventListener("change", updateCalculator);
updateCalculator();
