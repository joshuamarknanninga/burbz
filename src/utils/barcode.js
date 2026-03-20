export function normalizeBarcode(payload) {
  if (!payload) {
    return null;
  }

  const rawValue = String(payload.data ?? '').trim();
  const rawType = String(payload.type ?? '').trim().toLowerCase();

  if (!rawValue) {
    return null;
  }

  if (rawType === 'ean13' && rawValue.length === 13 && rawValue.startsWith('0')) {
    return {
      value: rawValue.slice(1),
      sourceType: rawType,
      normalizedType: 'upc_a',
      transformed: true,
    };
  }

  return {
    value: rawValue,
    sourceType: rawType || 'unknown',
    normalizedType: rawType || 'unknown',
    transformed: false,
  };
}

export function buildNutritionSummary(item) {
  if (!item) {
    return [];
  }

  return [
    `${item.carbs}g carbs`,
    `${item.fiber}g fiber`,
    `${item.sugar}g sugar`,
    `${item.protein}g protein`,
    `${item.fat}g fat`,
    `${item.sodium}mg sodium`,
  ];
}
