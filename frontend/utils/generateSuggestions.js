const generateSuggestions = (que, ans) => {
  const topics = new Set();
  const notes = [];

  que.forEach((q, i) => {
    const a = ans[i]?.toLowerCase();
    const question = q.toLowerCase();

    if (a === "no") {
      if (question.includes("breastfed")) {
        topics.add("Infant & Young Child Feeding (IYCF)");
        notes.push("Counsel the mother to ensure exclusive breastfeeding for the first 6 months.");
      } else if (question.includes("weight") || question.includes("growth")) {
        topics.add("Growth Monitoring");
        notes.push("Refer the child for a weight check. Monitor growth on MCP card.");
      } else if (question.includes("complementary")) {
        topics.add("Nutrition Counselling");
        notes.push("Guide the caregiver to introduce homemade semi-solid food at 6 months.");
      } else if (question.includes("iron") || question.includes("ifa")) {
        topics.add("Anemia Prevention");
        notes.push("Ensure daily IFA tablet intake and promote iron-rich diet.");
      } else if (question.includes("meals") || question.includes("diet")) {
        topics.add("Maternal Nutrition");
        notes.push("Encourage 3 full meals + 2 snacks for pregnant/lactating women.");
      } else if (question.includes("vaccination")) {
        topics.add("Immunization");
        notes.push("Ensure child is vaccinated as per schedule. Refer to health center.");
      } else {
        topics.add("General Counselling");
        notes.push("Provide health guidance based on the mother's or child's condition.");
      }
    }
  });

  return {
    topics: Array.from(topics),
    notes: notes.join(" "),
  };
};

export default generateSuggestions;
