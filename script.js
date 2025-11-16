// VALORANT Team Website JavaScript

// DOM要素の取得
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeScrollEffects();
    initializeNavigation();
    initializeTabs();
    initializeAnimations();
});

// パーティクルエフェクトの初期化
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // 既存のパーティクルをクリア
    particlesContainer.innerHTML = '';

    // パーティクルを生成
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }

    // 定期的に新しいパーティクルを追加
    setInterval(() => {
        if (particlesContainer.children.length < 50) {
            createParticle(particlesContainer);
        }
    }, 200);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // ランダムな位置とアニメーション設定
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    
    // ランダムな色
    const colors = ['#00ff96', '#9333ea', '#ff0064', '#0096ff'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(particle);
    
    // アニメーション終了後に削除
    particle.addEventListener('animationend', () => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    });
}

// スクロールエフェクトの初期化
function initializeScrollEffects() {
    // ナビゲーションバーのスクロール効果
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // アクティブセクションの検出
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                updateActiveNavLink(sectionId);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ナビゲーションの初期化
function initializeNavigation() {
    // ハンバーガーメニューの切り替え
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // ナビゲーションリンクのクリックイベント
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            scrollToSection(sectionId);
            
            // モバイルメニューを閉じる
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // 外部クリックでメニューを閉じる
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// タブ機能の初期化
function initializeTabs() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId, button);
        });
    });
}

// アニメーションの初期化
function initializeAnimations() {
    // スクロールアニメーションの観察
    const animatedElements = document.querySelectorAll('.about-card, .member-card, .contact-card, .result-card, .gallery-item');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });

    // ホバーエフェクトの強化
    const hoverElements = document.querySelectorAll('.member-card, .gallery-item, .sponsor-slot');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.05) translateY(-5px)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1) translateY(0)';
        });
    });
}

// セクションへのスムーススクロール
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // ナビゲーションバーの高さを考慮
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// アクティブナビゲーションリンクの更新
function updateActiveNavLink(sectionId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

// タブの切り替え
function switchTab(tabId, activeButton) {
    // すべてのタブボタンからactiveクラスを削除
    const tabContainer = activeButton.closest('.results-tabs, .gallery-tabs');
    const buttons = tabContainer.querySelectorAll('.tab-btn');
    const panes = tabContainer.querySelectorAll('.tab-pane');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    panes.forEach(pane => pane.classList.remove('active'));
    
    // アクティブなタブを設定
    activeButton.classList.add('active');
    const targetPane = document.getElementById(tabId);
    if (targetPane) {
        targetPane.classList.add('active');
    }
}

// グリッチエフェクトの動的制御
function triggerGlitchEffect(element) {
    element.classList.add('glitch-active');
    setTimeout(() => {
        element.classList.remove('glitch-active');
    }, 1000);
}

// ネオンエフェクトの強化
function enhanceNeonEffect() {
    const neonElements = document.querySelectorAll('.neon-text-green, .neon-text-purple, .neon-text-red');
    
    neonElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.textShadow = `
                0 0 5px currentColor,
                0 0 10px currentColor,
                0 0 15px currentColor,
                0 0 20px currentColor,
                0 0 35px currentColor
            `;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.textShadow = `
                0 0 5px currentColor,
                0 0 10px currentColor,
                0 0 15px currentColor,
                0 0 20px currentColor
            `;
        });
    });
}

// パフォーマンス最適化
function optimizePerformance() {
    // スクロールイベントのスロットリング
    let ticking = false;
    
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // スクロール関連の処理
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll);
}

// ローディングアニメーション
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="spinner"></div>
        <p>覚醒中...</p>
    `;
    document.body.appendChild(loader);
    
    // ページ読み込み完了後にローダーを削除
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }, 1000);
    });
}

// エラーハンドリング
function handleErrors() {
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
    });
}

// ユーティリティ関数
const utils = {
    // 要素が画面内にあるかチェック
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // ランダムな数値を生成
    random: function(min, max) {
        return Math.random() * (max - min) + min;
    },
    
    // 要素にクラスを切り替え
    toggleClass: function(element, className) {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        } else {
            element.classList.add(className);
        }
    },
    
    // デバウンス関数
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// 特殊エフェクト
const effects = {
    // 画面シェイク効果
    screenShake: function(duration = 500) {
        document.body.style.animation = `shake 0.1s infinite`;
        setTimeout(() => {
            document.body.style.animation = '';
        }, duration);
    },
    
    // フラッシュ効果
    flash: function(color = '#00ff96') {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${color};
            opacity: 0.3;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => {
                if (flash.parentNode) {
                    flash.parentNode.removeChild(flash);
                }
            }, 200);
        }, 100);
    },
    
    // パーティクル爆発
    particleExplosion: function(x, y) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #00ff96;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${x}px;
                top: ${y}px;
            `;
            
            const angle = (Math.PI * 2 * i) / 20;
            const velocity = utils.random(50, 150);
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            document.body.appendChild(particle);
            
            let posX = x;
            let posY = y;
            let opacity = 1;
            
            const animate = () => {
                posX += vx * 0.02;
                posY += vy * 0.02;
                opacity -= 0.02;
                
                particle.style.left = posX + 'px';
                particle.style.top = posY + 'px';
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }
            };
            
            animate();
        }
    }
};

// イベントリスナーの追加
document.addEventListener('DOMContentLoaded', () => {
    enhanceNeonEffect();
    optimizePerformance();
    handleErrors();
    
    // 特殊エフェクトのトリガー
    const teamLogo = document.querySelector('.team-logo');
    if (teamLogo) {
        teamLogo.addEventListener('click', (e) => {
            effects.particleExplosion(e.clientX, e.clientY);
            effects.flash('#00ff96');
            triggerGlitchEffect(teamLogo);
        });
    }
    
    // メンバーカードのクリックエフェクト
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const rect = card.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            effects.particleExplosion(x, y);
        });
    });
});

// CSS アニメーション用のキーフレームを動的に追加
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-2px); }
        75% { transform: translateX(2px); }
    }
    
    .animate-in {
        animation-delay: 0.1s;
        animation-fill-mode: both;
    }
    
    .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 10, 15, 0.95);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        color: #00ff96;
        font-family: 'Orbitron', monospace;
        transition: opacity 0.5s ease;
    }
    
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(0, 255, 150, 0.3);
        border-top: 4px solid #00ff96;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// エクスポート（モジュール使用時）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToSection,
        utils,
        effects
    };
}