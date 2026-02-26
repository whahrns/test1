const banners = [
    { 
        id: 'guide', 
        name: '하이러닝 이용가이드', 
        icon: '📚', 
        desc: '역할별(교사/학생/학부모/관리자) 가이드 다운로드', 
        link: 'guide.html' 
    },
    { 
        id: 'padlet', 
        name: '하이러닝 연수 패들렛', 
        icon: '📋', 
        desc: '연수 자료 공유', 
        link: 'https://padlet.com/whahrns/padlet-kqqtii6px2olapiy' 
    },
    { 
        id: 'manual', 
        name: '하이러닝 활용 가이드', 
        icon: '📘', 
        desc: '단계별 활용 매뉴얼 및 팁', 
        link: 'https://trashcanai.com/2026popup/' 
    },
    { 
        id: 'youtube', 
        name: '하이러닝 유튜브로', 
        icon: '📺', 
        desc: '영상으로 익히는 하이러닝 활용법', 
        link: 'learning.html' 
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

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
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
