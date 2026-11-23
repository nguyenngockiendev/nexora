const {
  AIlearningassistantService,
  AIleaninganalyze,
} = require("./learning-assistant.tools");

const LearningAssistantTools = [
  {
    path: "AIlearningassistantService",
    name: AIlearningassistantService,
    capacity: 3,
  },

  {
    path: "AIleaninganalyze",
    name: AIleaninganalyze,
    capacity: 4,
  },
];

module.exports = LearningAssistantTools;
