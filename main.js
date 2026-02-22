const banners = [
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
        link: '#' 
    },
    { 
        id: 'archive', 
        name: '수업 사례 아카이브', 
        icon: '📂', 
        desc: '교과별 하이러닝 수업 사례 모음', 
        link: '#' 
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

        // 카드 전체에 클릭 가능한 스타일과 링크 연결
        this.innerHTML = `
            <div class="subject-card" data-id="${id}" style="cursor: pointer;">
                <div class="icon">${icon}</div>
                <h3>${name}</h3>
                <p>${desc}</p>
            </div>
        `;

        this.querySelector('.subject-card').addEventListener('click', (e) => {
            if (link && link !== '#') {
                // 패들렛 링크로 이동
                window.location.href = link; 
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
        banners.forEach(banner => {
            const card = document.createElement('banner-card');
            card.setAttribute('banner-id', banner.id);
            card.setAttribute('name', banner.name);
            card.setAttribute('icon', banner.icon);
            card.setAttribute('desc', banner.desc);
            card.setAttribute('link', banner.link);
            subjectList.appendChild(card);
        });
    }
});
