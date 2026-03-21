// posts.js - BangYunseo Blog Post Data
// 새 글을 추가하려면 아래 posts 배열에 항목을 추가하고
// posts/ 폴더에 해당 HTML 파일을 생성하세요.

const posts = [
  {
    id: 1,
    title: '포트폴리오 사이트를 직접 만들어 보며 배운 것들',
    summary:
      '순수 HTML/CSS/JS로 정적 사이트를 구성하면서 겪은 시행착오와 배운 점들을 정리했습니다. 프레임워크 없이도 충분히 아름다운 결과물을 만들 수 있습니다.',
    date: '2026-03-21',
    category: '개발',
    tags: ['HTML', 'CSS', 'JavaScript', 'Portfolio'],
    file: 'posts/hello-portfolio.html',
  },
];

// 날짜 포맷 변환
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

// 블로그 카드 생성
function createBlogCard(post) {
  const card = document.createElement('a');
  card.href = post.file;
  card.className = 'blog-card fade-in';

  card.innerHTML = `
    <div class="blog-card-meta">
      <span class="blog-card-category">${post.category}</span>
      <span>${formatDate(post.date)}</span>
    </div>
    <h3>${post.title}</h3>
    <p>${post.summary}</p>
    <div class="blog-card-tags">
      ${post.tags.map((t) => `<span class="blog-tag">#${t}</span>`).join('')}
    </div>
    <span class="blog-card-read-more">읽기 →</span>
  `;

  return card;
}

// 블로그 목록 렌더링
function loadBlogPosts() {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  if (posts.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:3rem 0;">아직 작성된 글이 없습니다.</p>';
    return;
  }

  // 최신순 정렬
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  sorted.forEach((post) => grid.appendChild(createBlogCard(post)));
}

document.addEventListener('DOMContentLoaded', loadBlogPosts);
