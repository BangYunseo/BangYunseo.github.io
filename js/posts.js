// posts.js - BangYunseo Blog Post Data
// 새 글을 추가하려면 아래 posts 배열에 객체를 추가하세요.
// content 필드에 Markdown 문법으로 글의 본문을 작성하면 됩니다.

const posts = [
  {
    id: 1,
    title: '나만의 프로젝트 사이트를 직접 만들어 보며 배운 것들',
    summary:
      '순수 HTML/CSS/JS로 정적 사이트를 구성하면서 겪은 시행착오와 배운 점들을 정리했습니다. 프레임워크 없이도 충분히 아름다운 결과물을 만들 수 있습니다.',
    date: '2026-03-21',
    category: '개발',
    tags: ['HTML', 'CSS', 'JavaScript', 'Project'],
    content: `
개인 프로젝트 사이트를 만들기로 결심했을 때, 처음에는 React나 Next.js 같은 프레임워크를 사용할까 고민했습니다. 
그런데 막상 시작하니 "나를 소개하는 페이지 하나에 그렇게 무거운 도구가 필요할까?" 싶었습니다.
그래서 순수한 HTML, CSS, JavaScript만으로 사이트를 구성하기로 했고, 그 과정에서 배운 것들을 기록합니다.

## CSS 변수로 디자인 시스템 만들기

CSS \`:root\`에 변수를 선언해두면, 색상·폰트·여백 등을 일관성 있게 관리할 수 있습니다.
버튼 하나의 색을 바꾸고 싶을 때 파일 전체를 검색하는 대신, 변수 값 하나만 수정하면 됩니다.

\`\`\`css
:root {
  --accent: #58a6ff;
  --bg-primary: #0d1117;
  --radius: 12px;
}
\`\`\`

처음에는 귀찮게 느껴지지만, 반응형 대응이나 테마 변경 시 작업량이 10배는 줄어듭니다.

## Intersection Observer로 스크롤 애니메이션 구현하기

요소가 뷰포트에 진입할 때 페이드인 효과를 주고 싶었습니다. 예전에는 \`scroll\` 이벤트를 감지해서 처리했지만,
\`IntersectionObserver\` API를 사용하면 성능 걱정 없이 깔끔하게 구현할 수 있습니다.

\`\`\`javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in')
  .forEach(el => observer.observe(el));
\`\`\`

## 정적 블로그 시스템 설계

이번 개편을 통해 동적 페이지가 아닌 정적 구조에서도 마크다운만으로 글을 작성할 수 있도록 템플릿화하였습니다.
빌드 도구 없이도 "내가 관리하는 콘텐츠"와 "레이아웃"을 완벽히 분리할 수 있습니다.

## 마치며

프레임워크 없는 순수 웹 기술만으로도 충분히 아름답고 관리하기 쉬운 프로젝트 사이트를 만들 수 있다는 것을 확인했습니다.
오히려 빌드 과정이나 의존성 관리에서 자유로워 GitHub Pages에 바로 배포할 수 있는 간편함이 좋았습니다.
앞으로 여러 글들을 이 블로그에 채워나갈 예정입니다. 😊
    `
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
  card.href = 'post.html?id=' + post.id;
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

  // 본문 Markdown 렌더링
  const contentEl = document.getElementById('post-content');
  if (contentEl && typeof marked !== 'undefined') {
    contentEl.innerHTML = marked.parse(post.content);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadBlogPosts();
  loadPostDetail();
});
