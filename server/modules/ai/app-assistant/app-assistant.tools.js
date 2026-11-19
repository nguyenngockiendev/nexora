const AppFeatures = require("./AppFeatures");
const { GeminiEmbedding } = require("../providers/ai-provider.service");

const AIassistantService = async (queryText, signal, role) => {
  if (typeof queryText !== "string" || !queryText.trim()) {
    throw {
      status: 400,
      message: "Câu truy vấn tìm tính năng không hợp lệ.",
    };
  }
  const topsimilar = [];
  const query = `task: search result | query: ${queryText.trim()}`;
  signal?.throwIfAborted();
  const questionEmbedding = await GeminiEmbedding(query, signal);
  signal?.throwIfAborted();
  const questionNorm = Math.sqrt(
    questionEmbedding.reduce((sum, value) => sum + value ** 2, 0),
  );
  if (questionNorm === 0) return null;

  const features = await AppFeatures.find({ roles: role }).lean();

  for (const feature of features) {
    const featureEmbedding = feature.embedding;
    if (!Array.isArray(featureEmbedding)) continue;
    if (questionEmbedding.length !== featureEmbedding.length) continue;

    let dot = 0;
    let featureSquaredNorm = 0;
    for (let i = 0; i < featureEmbedding.length; i++) {
      dot += questionEmbedding[i] * featureEmbedding[i];
      featureSquaredNorm += featureEmbedding[i] ** 2;
    }

    const denominator = questionNorm * Math.sqrt(featureSquaredNorm);
    if (denominator === 0) continue;

    const similar = dot / denominator;
    if (Number.isFinite(similar) && similar >= 0.6) {
      topsimilar.push({
        featureCode: feature.featureCode,
        feature: feature.name,
        description: feature.description,
        steps: feature.steps,
        route: feature.route,
        similar,
      });
    }
  }

  if (topsimilar.length === 0) {
    throw {
      status: 404,
      message: "Không tìm thấy tính năng phù hợp với câu hỏi.",
    };
  }

  topsimilar.sort((a, b) => b.similar - a.similar);
  return topsimilar.slice(0, 3);
};

module.exports = {
  AIassistantService,
};
