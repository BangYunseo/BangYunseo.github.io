const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'posts');
const outputFile = path.join(__dirname, 'js', 'posts-data.js');

// 1. posts 폴더 내의 모든 .md 파일 읽기
const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));

const posts = files.map((file, index) => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // 첫 번째 # 또는 ## 제목 추출
    const titleMatch = content.match(/^(?:#|\#\#)\s+(.*)$/m);
    let title = titleMatch ? titleMatch[1].trim() : file.replace('.md', '');
    
    // 파일명에서 대괄호 형태의 날짜 추출 (예: [20260322]_1.md -> 2026-03-22)
    let date = new Date().toISOString();
    let displayBadge = '';
    const dateMatch = file.match(/^\[(\d{4})(\d{2})(\d{2})\]/);
    if (dateMatch) {
        date = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}T00:00:00`;
        displayBadge = `[${dateMatch[1]}${dateMatch[2]}${dateMatch[3]}] `;
    }

    // 파일 내 카테고리와 태그, 썸네일(옵션) 메타 데이터가 있다면 추출
    // 예: 
    // Category: 알고리즘
    // Tags: C++, 백준
    // Thumb: images/thumb1.png
    let category = '기타';
    const categoryMatch = content.match(/^Category:\s*(.*)$/im);
    if (categoryMatch) category = categoryMatch[1].trim();

    let tags = [];
    const tagsMatch = content.match(/^Tags:\s*(.*)$/im);
    if (tagsMatch) {
        tags = tagsMatch[1].split(',').map(tag => tag.trim());
    }

    let thumb = null;
    const thumbMatch = content.match(/^Thumb:\s*(.*)$/im);
    if (thumbMatch) thumb = thumbMatch[1].trim();

    // 혹시라도 내용이 없는 제목이면 날짜 배지라도 붙여줌
    const fullTitle = (displayBadge + title).trim();

    return {
        id: index + 1,
        title: fullTitle,
        date,
        category,
        tags,
        thumb,
        file: `posts/${file}`
    };
});

// 최신 글이 위로 오도록 정렬
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// 2. js/posts-data.js 파일로 배열 저장
const fileContent = `// 💡 이 파일은 자동 생성된 데이터입니다. (build-posts.js를 통해 생성됨)
// 직접 수정하지 마시고, 마크다운 파일을 수정한 후 터미널에서 'node build-posts.js'를 실행하세요!
const posts = ${JSON.stringify(posts, null, 2)};
`;

fs.writeFileSync(outputFile, fileContent);
console.log(`✅ 성공적으로 ${posts.length}개의 포스트를 스캔하여 js/posts-data.js 를 생성했습니다!`);
