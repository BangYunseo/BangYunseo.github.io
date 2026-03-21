// 💡 새 글을 작성하는 방법 (분리 원칙 적용)
// 1. posts/ 폴더에 '[20260322]_파일이름.md' 형식으로 마크다운을 만들어 본문을 적어주세요.
// 2. 아래 posts 배열에 연결해주세요. 제목(title)의 첫 부분에 '[20260322]' 같은 대괄호를 쓰면 강조 표시됩니다!

const posts = [
  {
    id: 1,
    title: '첫 글',
    date: '2026-03-22T08:30:00', 
    category: '회고',
    tags: ['HTML', 'CSS', 'JavaScript'],
    file: 'posts/[20260322]_1.md'
  },
  {
    id: 2,
    title: '백준 1000번 A+B 풀이 방식',
    date: '2026-03-22T15:00:00', 
    category: '알고리즘',
    tags: ['C++', '백준', '알고리즘'],
    file: 'posts/[20260322]_2.md'
  },
];

// 날짜 포맷 변환 (시간 포함)
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString('ko-KR', { 
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

// 블로그 카드 생성
function createBlogCard(post) {
  const card = document.createElement('a');
  card.href = 'post.html?id=' + post.id;
  card.className = 'blog-card fade-in';

  // 제목에서 [20260322] 패턴 분리 후 뱃지 디자인 적용
  let displayTitle = post.title;
  const match = displayTitle.match(/^(\[\d+\])\s*(.*)/);
  if (match) {
    displayTitle = `<span style="color: var(--accent); font-family: var(--font-mono); font-size: 0.85em; margin-right: 0.5rem; background: rgba(88, 166, 255, 0.1); padding: 0.2rem 0.4rem; border-radius: 4px; vertical-align: middle;">${match[1]}</span><span style="vertical-align: middle;">${match[2]}</span>`;
  }

  card.innerHTML = `
    <div class="blog-card-meta">
      <span class="blog-card-category">${post.category}</span>
      <span>${formatDate(post.date)}</span>
    </div>
    <h3 style="display: flex; align-items: center; line-height: 1.4;">${displayTitle}</h3>
    <div class="blog-card-tags" style="margin-top: 1rem;">
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

// 개별 포스트 화면 렌더링 (post.html 용)
function loadPostDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get('id'));
  
  if (!postId) return; // 상세 페이지가 아니면 종료

  const post = posts.find((p) => p.id === postId);
  if (!post) {
    const container = document.getElementById('post-container');
    if (container) {
      container.innerHTML = '<h2 style="text-align:center; padding: 4rem 0;">존재하지 않는 글입니다.</h2>';
    }
    return;
  }

  // 메타 정보 주입
  const metaContainer = document.getElementById('post-meta');
  if (metaContainer) {
    metaContainer.innerHTML = `
      <span class="blog-card-category">${post.category}</span>
      <span style="color: var(--text-muted); font-size: 0.85rem;">${formatDate(post.date)}</span>
    `;
  }

  // 제목 주입
  const titleEl = document.getElementById('post-title');
  if (titleEl) {
    titleEl.textContent = post.title;
    document.title = post.title + ' - BangYunseo';
  }

  // 태그 주입
  const tagsContainer = document.getElementById('post-tags');
  if (tagsContainer) {
    tagsContainer.innerHTML = post.tags.map((t) => `<span class="blog-tag">#${t}</span>`).join('');
  }

  // 본문 Markdown 비동기 렌더링 (Fetch)
  const contentEl = document.getElementById('post-content');
  if (contentEl && typeof marked !== 'undefined') {
    if (post.file) {
      contentEl.innerHTML = '<p style="text-align:center; padding: 2rem; color: var(--text-muted);">글을 불러오는 중입니다...</p>';
      
      fetch(post.file)
        .then(response => {
          if (!response.ok) throw new Error('파일을 찾을 수 없습니다.');
          return response.text();
        })
        .then(markdownText => {
          contentEl.innerHTML = marked.parse(markdownText);
        })
        .catch(err => {
          console.error(err);
          contentEl.innerHTML = '<p style="text-align:center; color:#ff7b72;">글 내용을 불러오는 데 실패했습니다.</p>';
        });
    } else {
      contentEl.innerHTML = '<p>본문 내용이 없습니다.</p>';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadBlogPosts();
  loadPostDetail();
});
