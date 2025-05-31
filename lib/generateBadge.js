export function getBadgeSVG(label, count) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="180" height="20">
    <rect width="180" height="20" fill="#555"/>
    <rect x="100" width="80" height="20" fill="#4c1"/>
    <text x="10" y="14" fill="#fff" font-family="Verdana" font-size="11">${label}</text>
    <text x="120" y="14" fill="#fff" font-family="Verdana" font-size="11">${count}</text>
  </svg>`;
}
