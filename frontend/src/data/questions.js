// src/data/questions.js

const questionBank = [
  {
    concern: "anemia",
    stage: "Pregnant",
    questions: [
      "Are you taking iron tablets regularly?",
      "Do you feel tired frequently?",
      "Are you including green leafy vegetables in your meals?",
    ],
  },
  {
    concern: "malnutrition",
    stage: "0-6 months",
    questions: [
      "Is the child exclusively breastfed?",
      "Is the child gaining weight normally?",
      "Are there signs of weakness in the baby?",
    ],
  },
  {
    concern: "malnutrition",
    stage: "6-24 months",
    questions: [
      "Is the child receiving complementary feeding?",
      "Are meals given 3-4 times a day?",
      "Does the child eat a variety of foods?",
    ],
  },
];

// ✅ Correct export
export default questionBank;
