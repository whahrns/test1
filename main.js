const banners = [
    { 
        id: 'padlet', 
        name: '하이러닝 연수 패들렛', 
        icon: '📋', 
        desc: '연수 자료 공유', 
        link: 'https://padlet.com/whahrns/padlet-kqqtii6px2olapiy' 
    },
    { 
        id: 'hi-learning-kr', 
        name: '연수 신청 및 문의', 
        icon: '🔗', 
        desc: '공식 연수 사이트로 이동', 
        link: 'https://hi-learning.kr/' 
    },
    { 
        id: 'manual', 
        name: '하이러닝 둘러보기', 
        icon: '📘', 
        desc: '하이러닝 사용법 익히기', 
        link: 'https://trashcanai.com/2026popup/' 
    },
    { 
        id: 'guide', 
        name: '하이러닝 이용 가이드', 
        icon: '📚', 
        desc: '하이러닝 이용가이드 다운로드', 
        link: 'guide.html' 
    },
    { 
        id: 'youtube', 
        name: '하이러닝 유튜브', 
        icon: '📺', 
        desc: '영상으로 익히는 하이러닝 활용법', 
        link: 'learning.html' 
    },
    { 
        id: 'contact', 
        name: '1:1 문의', 
        icon: '✉️', 
        desc: '궁금한 점을 이메일로 개별 문의', 
        link: 'contact.html' 
    }
];

/**
 * Banner Card Component
 */
class BannerCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const id = this.getAttribute('banner-id');
        const name = this.getAttribute('name');
        const icon = this.getAttribute('icon');
        const desc = this.getAttribute('desc');
        const link = this.getAttribute('link');
        const index = this.getAttribute('index') || 0;

        // 카드 전체에 클릭 가능한 스타일과 링크 연결
        // Add animation-delay based on index
        const delay = 0.3 + (index * 0.15);
        
        this.innerHTML = `
            <div class="subject-card" data-id="${id}" style="cursor: pointer; animation-delay: ${delay}s;">
                <div class="icon">${icon}</div>
                <h3>${name}</h3>
                <p>${desc}</p>
            </div>
        `;

        this.querySelector('.subject-card').addEventListener('click', (e) => {
            if (link && link !== '#') {
                // 내부 링크인지 외부 링크인지 확인
                if (link.startsWith('http')) {
                    window.open(link, '_blank');
                } else {
                    window.location.href = link; 
                }
            } else {
                alert(`${name} 서비스는 준비 중입니다.`);
            }
        });
    }
}

customElements.define('banner-card', BannerCard);

/**
 * Theme Manager
 */
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.body = document.body;
        this.init();
    }

    init() {
        // Load saved theme or check system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            this.body.classList.add('dark-mode');
            this.updateIcon('dark');
        }

        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        const isDark = this.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.updateIcon(isDark ? 'dark' : 'light');
    }

    updateIcon(theme) {
        if (!this.themeToggle) return;
        this.themeToggle.textContent = theme === 'dark' ? '🌙' : '🌞';
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    const subjectList = document.getElementById('subject-list');
    
    if (subjectList) {
        // 기존 내용 삭제 후 재생성
        subjectList.innerHTML = '';
        banners.forEach((banner, index) => {
            const card = document.createElement('banner-card');
            card.setAttribute('banner-id', banner.id);
            card.setAttribute('name', banner.name);
            card.setAttribute('icon', banner.icon);
            card.setAttribute('desc', banner.desc);
            card.setAttribute('link', banner.link);
            
            // Add staggered animation delay
            // We need to wait for the shadow DOM to be attached, but styles penetrate or we style the host.
            // The animation is on .subject-card inside the shadow DOM.
            // Let's pass the index as an attribute so the component can set the style.
            card.setAttribute('index', index);
            
            subjectList.appendChild(card);
        });
    }
});
