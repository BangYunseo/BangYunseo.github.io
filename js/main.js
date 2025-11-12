// 프로젝트 데이터 (임시)
const projects = [
  {
    id: 1,
    title: "Shisen-Sho 퍼즐 게임",
    description: "C++와 SDL2로 제작한 웹 기반 퍼즐 게임",
    image: "assets/images/project1.jpg",
    techStack: ["C++", "SDL2", "WebAssembly"],
  },
  {
    id: 2,
    title: "핫딜 크롤러",
    description: "실시간 쇼핑 핫딜 정보 수집 시스템",
    image: "assets/images/project2.jpg",
    techStack: ["Node.js", "Puppeteer", "PostgreSQL"],
  },
  {
    id: 3,
    title: "포트폴리오 웹사이트",
    description: "권한 관리 시스템을 갖춘 개인 포트폴리오",
    image: "assets/images/project3.jpg",
    techStack: ["JavaScript", "Node.js", "JWT"],
  },
];

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
});

// 프로젝트 카드 렌더링
function loadProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  projects.forEach((project) => {
    const card = createProjectCard(project);
    grid.appendChild(card);
  });
}

function createProjectCard(project) {
  const card = document.createElement("div");
  card.className = "project-card";

  card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" 
             onerror="this.src='https://via.placeholder.com/300x200?text=Project+Image'">
        <div class="project-card-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech-stack">
                ${project.techStack
                  .map((tech) => `<span class="tech-tag">${tech}</span>`)
                  .join("")}
            </div>
        </div>
    `;

  return card;
}
