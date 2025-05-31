import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const API_URL = "https://www.opensource.observer/api/v1/graphql";
const API_KEY = process.env.API_KEY;

async function fetchSBOMCount(repoUrl) {
  const metaQuery = `
    query GetRepositoryMetadata {
      oso_repositoriesV0(where: { artifactUrl: { _eq: "${repoUrl}" } }) {
        artifactId
      }
    }
  `;

  const metaRes = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": API_KEY,
    },
    body: JSON.stringify({ query: metaQuery }),
  });

  const metaData = await metaRes.json();
  const artifactId = metaData?.data?.oso_repositoriesV0?.[0]?.artifactId;

  if (!artifactId) return null;

  const sbomQuery = `
    query GetSBOMs {
      oso_sbomsV0(where: { fromArtifactId: { _eq: "${artifactId}" } }) {
        toPackageArtifactName
      }
    }
  `;

  const sbomRes = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": API_KEY,
    },
    body: JSON.stringify({ query: sbomQuery }),
  });

  const sbomData = await sbomRes.json();
  return sbomData?.data?.oso_sbomsV0?.length || 0;
}

export default fetchSBOMCount;
