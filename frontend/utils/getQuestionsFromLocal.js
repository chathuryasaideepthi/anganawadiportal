import fs from "fs";
import path from "path";

const getQuestionsFromLocal = (concern, stage) => {
  const filePath = path.resolve("data/questions.json");
  const file = fs.readFileSync(filePath, "utf-8");
  const questionBank = JSON.parse(file);

  const match = questionBank.find(
    (item) =>
      item.concern.toLowerCase() === concern.toLowerCase() &&
      item.stage.toLowerCase() === stage.toLowerCase()
  );

  if (!match || !match.questions) return [];

  // Shuffle and return 2 random questions
  const shuffled = match.questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
};

export default getQuestionsFromLocal;
