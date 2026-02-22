const subjects = [
    { id: 'korean', name: '국어', icon: '📖', desc: '의사소통과 문학적 소양' },
    { id: 'math', name: '수학', icon: '🔢', desc: '논리적 사고와 문제 해결' },
    { id: 'english', name: '영어', icon: '🔤', desc: '글로벌 커뮤니케이션' },
    { id: 'social', name: '사회/역사', icon: '🌍', desc: '사회 현상과 역사의 이해' },
    { id: 'science', name: '과학', icon: '🧪', desc: '자연 현상 탐구와 원리' },
    { id: 'ethics', name: '도덕', icon: '⚖️', desc: '바른 삶과 가치 판단' },
    { id: 'informatics', name: '정보', icon: '💻', desc: '디지털 소양과 컴퓨팅 사고' },
    { id: 'tech-home', name: '기술·가정', icon: '🛠️', desc: '생활 기술과 가정 생활' },
    { id: 'pe', name: '체육', icon: '⚽', desc: '건강한 신체와 정신' },
    { id: 'music', name: '음악', icon: '🎵', desc: '예술적 감수성과 표현' },
    { id: 'art', name: '미술', icon: '🎨', desc: '시각적 소통과 창의성' }
];

/**
 * Subject Card Component
 */
class SubjectCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const id = this.getAttribute('subject-id');
        const name = this.getAttribute('name');
        const icon = this.getAttribute('icon');
        const desc = this.getAttribute('desc');

        this.innerHTML = `
            <div class="subject-card" data-id="${id}">
                <div class="icon">${icon}</div>
                <h3>${name}</h3>
                <p>${desc}</p>
            </div>
        `;

        this.querySelector('.subject-card').addEventListener('click', () => {
            this.navigateToSubject(id, name);
        });
    }

    navigateToSubject(id, name) {
        console.log(`Navigating to ${name} (${id})`);
        // 향후 교과별 상세 페이지 로직 구현 위치
        alert(`${name} 교과의 성취기준 및 성취수준 화면으로 이동합니다.`);
    }
}

customElements.define('subject-card', SubjectCard);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const subjectList = document.getElementById('subject-list');
    
    if (subjectList) {
        subjects.forEach(subject => {
            const card = document.createElement('subject-card');
            card.setAttribute('subject-id', subject.id);
            card.setAttribute('name', subject.name);
            card.setAttribute('icon', subject.icon);
            card.setAttribute('desc', subject.desc);
            subjectList.appendChild(card);
        });
    }
});
