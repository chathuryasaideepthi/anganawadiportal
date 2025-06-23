import questionBank from "../data/questions";

export const getQuestions = (concern, stage) => {
  const match = questionBank.find(
    (item) =>
      item.concern.toLowerCase() === concern.toLowerCase() &&
      item.stage.toLowerCase() === stage.toLowerCase()
  );

  if (match) {
    const shuffled = match.questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2); // random 2 questions
  }

  return [];
};

export const generateSuggestions = (questions, answers) => {
  const topics = new Set();
  const notes = [];

  questions.forEach((q, i) => {
    const ans = answers[i]?.toLowerCase();
    const lowerQ = q.toLowerCase();

    if (ans === "no") {
      if (lowerQ.includes("breastfed")) {
        topics.add("IYCF");
        notes.push("Encourage exclusive breastfeeding.");
      } else if (lowerQ.includes("weight")) {
        topics.add("Growth Monitoring");
        notes.push("Refer the child for a weight check.");
      } else if (lowerQ.includes("iron") || lowerQ.includes("tired")) {
        topics.add("Anemia");
        notes.push("Ensure regular IFA and iron-rich diet.");
      } else {
        topics.add("Nutrition Counselling");
        notes.push("Provide tailored advice to mother/child.");
      }
    }
  });

  return {
    topics: Array.from(topics),
    notes: notes.join(" "),
  };
};
