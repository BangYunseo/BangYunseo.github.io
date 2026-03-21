/**
 * components.js
 * 전역 네비게이션과 푸터를 동적으로 생성하여 각 페이지에 삽입합니다.
 */

function renderNav() {
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (!navPlaceholder) return;

  // 현재 페이지 경로 확인
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  
  // posts 폴더 안에 있는 경우 경로 조정
  const isPostPage = path.includes('/posts/');
  const rootPath = isPostPage ? '../' : '';

  navPlaceholder.innerHTML = `
    <nav>
      <div class="logo"><a href="${rootPath}index.html">BangYunseo</a></div>
      <ul class="nav-links">
        <li><a href="${rootPath}about.html" class="${page === 'about.html' ? 'active' : ''}">소개</a></li>
        <li><a href="${rootPath}project.html" class="${page === 'project.html' ? 'active' : ''}">프로젝트</a></li>
        <li><a href="${rootPath}blog.html" class="${page === 'blog.html' || isPostPage ? 'active' : ''}">블로그</a></li>
        <li><a href="${rootPath}contact.html" class="${page === 'contact.html' ? 'active' : ''}">연락처</a></li>
      </ul>
    </nav>
  `;
}

function renderFooter() {
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (!footerPlaceholder) return;

  footerPlaceholder.innerHTML = `
    <footer>
      <p>&copy; 2026 BangYunseo. All rights reserved. &nbsp;·&nbsp;
        <a href="https://github.com/BangYunseo" target="_blank">GitHub</a>
      </p>
    </footer>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
});
