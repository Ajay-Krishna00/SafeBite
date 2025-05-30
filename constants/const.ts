export const commonAllergies = [
  "Nuts",
  "Dairy",
  "Shellfish",
  "Gluten",
  "Soy",
  "Eggs",
  "Wheat",
  "Sesame",
  "Fish",
  "Peanuts",
  "None",
];
export const medicalConditions = [
  "Diabetes", // sugar, carbs
  "Hypertension", // sodium, caffeine
  "High Cholesterol", // saturated/trans fats
  "Celiac Disease", // gluten
  "Lactose Intolerance", // dairy
  "Irritable Bowel Syndrome (IBS)",
  "Gout", // red meat, alcohol
  "Kidney Disease", // protein, potassium
  "Heart Disease", // sodium, cholesterol
  "Thyroid Disorder", // soy, cruciferous veggies
  "Food Sensitivities (general)", // fallback option
  "None",
];
export const dietaryRestrictions = [
  "Vegan", // no animal products
  "Vegetarian", // no meat, but maybe dairy/eggs
  "Pescatarian", // no meat, but eats fish
  "Keto", // high fat, very low carb
  "Low Carb",
  "Low Sodium",
  "Low Sugar",
  "Gluten-Free",
  "Lactose-Free",
  "Halal",
  "Kosher",
  "Intermittent Fasting", // useful for time-based intake
  "Paleo",
  "None",
];
export const questions: { text: string; type: string; relatedTo: string }[] = [
  {
    text: "Do you have any food allergies?",
    type: "list",
    relatedTo: "allergies",
  },
  {
    text: "Do you have any medical conditions or diseases?",
    type: "list",
    relatedTo: "medicalConditions",
  },
  {
    text: "Are you on a specific diet or have any dietary restrictions?",
    type: "list",
    relatedTo: "dietaryRestrictions",
  },
  {
    text: "Do you take any medication that interacts with food?",
    type: "yesno",
    relatedTo: "medicationInteractions",
  },
  {
    text: "How severe are your allergic reactions?",
    type: "select",
    relatedTo: "allergySeverity",
  },
  {
    text: "Which age group do you belong to?",
    type: "select",
    relatedTo: "ageGroup",
  },
  {
    text: "Which age group do you belong to?",
    type: "select",
    relatedTo: "ageGroup",
  },
];
