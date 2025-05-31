import fetchSBOMCount from "../lib/fetchSBOMCount.js";
import { getBadgeSVG } from "../lib/generateBadge.js";

let cache = {};
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

export default async function handler(req, res) {
  const repoUrl = req.query.repo;

  if (!repoUrl) {
    res.status(400).send("Missing 'repo' query param");
    return;
  }

  const now = Date.now();
  const cacheKey = repoUrl;
  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_DURATION_MS) {
    const svg = getBadgeSVG("SBOMs", cache[cacheKey].count);
    res.setHeader("Content-Type", "image/svg+xml");
    return res.status(200).send(svg);
  }

  const count = await fetchSBOMCount(repoUrl);
  if (count === null) {
    return res.status(404).send("Repository not found");
  }

  cache[cacheKey] = { count, timestamp: now };

  const svg = getBadgeSVG("SBOMs", count);
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "no-cache");
  res.status(200).send(svg);
}
