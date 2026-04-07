(function () {
  const site = {
    title: 'Welbing Journal',
    intro: '把旧博客升级成更适合长期书写、展示和打磨审美的个人空间。',
    notes: [
      '新版主题走暖雾、玻璃感与杂志化排版。',
      '新增独立 React 编辑台，方便你预演标题、公告和主题色。',
      '鼠标点击动效与看板娘提示都做成了更轻盈的风格。',
    ],
    mascotLines: [
      '今天也写一点真的东西吧。',
      '右上角新加了 Studio，可以预览版式和主题色。',
      '如果内容太少，先把首页当成你的数字名片。',
      '看板娘和点击动效都已经换成更轻盈的版本了。',
    ],
  };

  const ready = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  };

  const create = (tag, className, html) => {
    const element = document.createElement(tag);
    if (className) {
      element.className = className;
    }
    if (html !== undefined) {
      element.innerHTML = html;
    }
    return element;
  };

  const addEditorLinks = () => {
    const targets = document.querySelectorAll('.menus_items, .card-info-data');
    if (!targets.length) {
      return;
    }

    document.querySelectorAll('[data-editor-entry]').forEach((node) => node.remove());

    targets.forEach((target) => {
      const item = create(
        'div',
        target.classList.contains('card-info-data') ? 'headline editor-entry' : 'menus_item'
      );

      if (target.classList.contains('card-info-data')) {
        item.innerHTML = '<a href="/editor/" data-editor-entry>Studio</a>';
      } else {
        item.innerHTML =
          '<a class="site-page enhance-link" href="/editor/" data-editor-entry><i class="fa-fw fas fa-wand-magic-sparkles"></i><span> Studio</span></a>';
      }

      target.appendChild(item);
    });
  };

  const removeBrokenEmbeds = () => {
    document
      .querySelectorAll('script[src^="http://localhost"], script[src*="/embed.min.js"], script#Xh3L4H6lvhRB11OU')
      .forEach((script) => script.remove());
    if (window.difyChatbotConfig) {
      delete window.difyChatbotConfig;
    }
  };

  const decorateHome = () => {
    if (!document.body.querySelector('#recent-posts') || document.querySelector('.hero-showcase')) {
      return;
    }

    const posts = [...document.querySelectorAll('#recent-posts .recent-post-item')];
    const stats = {
      posts: document.querySelectorAll('.recent-post-item').length || 3,
      tags: document.querySelectorAll('.card-tag-cloud a').length || 2,
      sections: document.querySelectorAll('.menus_items .menus_item').length || 4,
    };

    const hero = create(
      'section',
      'hero-showcase',
      `
        <article class="hero-showcase__card">
          <div class="hero-showcase__eyebrow">Editorial Refresh</div>
          <h2 class="hero-showcase__title">你的博客已经不再只是一个旧模板。</h2>
          <p class="hero-showcase__lead">${site.intro}</p>
          <div class="hero-showcase__actions">
            <a class="hero-button hero-button--primary" href="/editor/">打开可视化编辑台</a>
            <a class="hero-button hero-button--ghost" href="/archives/">查看归档</a>
          </div>
          <div class="hero-showcase__chips">
            <span>Refined Typography</span>
            <span>React Studio</span>
            <span>Mouse Motion</span>
            <span>Live2D Companion</span>
          </div>
          <div class="hero-showcase__stats">
            <article><strong>${stats.posts}</strong><span>篇文章</span></article>
            <article><strong>${stats.tags}</strong><span>个标签</span></article>
            <article><strong>${stats.sections}</strong><span>个入口</span></article>
          </div>
        </article>
        <aside class="hero-showcase__panel">
          <div class="hero-showcase__eyebrow">What Changed</div>
          <ul class="hero-showcase__list">
            ${site.notes
              .map(
                (note) => `
                  <li>
                    <span class="hero-showcase__dot"></span>
                    <span>${note}</span>
                  </li>`
              )
              .join('')}
          </ul>
        </aside>
      `
    );

    const contentInner = document.getElementById('content-inner');
    contentInner.parentNode.insertBefore(hero, contentInner);

    const siteTitle = document.getElementById('site-title');
    if (siteTitle) {
      siteTitle.textContent = site.title;
    }
  };

  const decoratePost = () => {
    const article = document.getElementById('article-container');
    if (!article || article.querySelector('.post-polish-note')) {
      return;
    }

    const note = create(
      'div',
      'post-polish-note',
      `
        <strong>阅读体验已升级</strong>
        这一页现在会使用更柔和的段落节奏、卡片式代码块和更清爽的颜色层次来承接正文内容。
        <div class="post-palette">
          <span>Warm Mist</span>
          <span>Readable Chinese Layout</span>
          <span>Cleaner Motion</span>
        </div>
      `
    );
    article.insertBefore(note, article.firstChild);
  };

  const addBadge = () => {
    const subtitle = document.getElementById('site-subtitle');
    if (subtitle && !subtitle.querySelector('.enhance-badge')) {
      subtitle.innerHTML = '<span class="enhance-badge">Refined Blog Experience</span>';
    }
  };

  const rotateLive2dTips = () => {
    if (document.querySelector('.live2d-tips')) {
      return;
    }

    const tip = create(
      'div',
      'live2d-tips',
      `<span class="mascot-hint__title">Live2D Guide</span><span data-live2d-tip>${site.mascotLines[0]}</span>`
    );
    document.body.appendChild(tip);
    const text = tip.querySelector('[data-live2d-tip]');
    let index = 0;
    window.setInterval(() => {
      index = (index + 1) % site.mascotLines.length;
      text.textContent = site.mascotLines[index];
    }, 4200);
  };

  const positionLive2d = () => {
    const candidates = [
      document.getElementById('live2d-widget'),
      document.getElementById('live2dcanvas'),
      document.querySelector('canvas[id^="live2d"]'),
      document.querySelector('.live2d-widget-container'),
    ].filter(Boolean);

    if (!candidates.length) {
      return;
    }

    candidates.forEach((node) => {
      node.style.left = '18px';
      node.style.right = 'auto';
      node.style.bottom = '14px';
      node.style.transform = 'scale(1.05)';
      node.style.zIndex = '60';
      node.style.filter = 'drop-shadow(0 18px 32px rgba(24, 37, 56, 0.18))';
    });
  };

  const initLive2dFix = () => {
    let attempts = 0;
    const timer = window.setInterval(() => {
      positionLive2d();
      attempts += 1;
      if (attempts > 12) {
        window.clearInterval(timer);
      }
    }, 700);
  };

  const addMascotHint = () => {
    if (document.querySelector('.mascot-hint')) {
      return;
    }

    const box = create(
      'div',
      'mascot-hint',
      `<span class="mascot-hint__title">Studio Shortcut</span><span>已经新增可视化编辑台，你可以去 <strong>/editor/</strong> 里调整标题、简介和主题色。</span>`
    );
    document.body.appendChild(box);
  };

  const initClickBurst = () => {
    if (document.querySelector('.click-burst')) {
      return;
    }

    const root = create('div', 'click-burst');
    document.body.appendChild(root);

    document.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch') {
        return;
      }

      for (let index = 0; index < 10; index += 1) {
        const particle = create(
          'span',
          `click-burst__particle${index % 2 === 0 ? ' click-burst__particle--mint' : ''}`
        );
        const angle = (Math.PI * 2 * index) / 10;
        const radius = 28 + Math.random() * 18;
        particle.style.left = `${event.clientX - 5}px`;
        particle.style.top = `${event.clientY - 5}px`;
        particle.style.setProperty('--dx', `${Math.cos(angle) * radius}px`);
        particle.style.setProperty('--dy', `${Math.sin(angle) * radius}px`);
        root.appendChild(particle);
        window.setTimeout(() => particle.remove(), 680);
      }
    });
  };

  const decorateTitles = () => {
    const title = document.getElementById('blog-info');
    if (title && title.textContent.trim() === 'Hello') {
      const siteName = title.querySelector('.site-name');
      if (siteName) {
        siteName.textContent = 'Welbing Journal';
      }
    }
  };

  ready(() => {
    if (document.body.classList.contains('editor-shell')) {
      return;
    }

    removeBrokenEmbeds();
    addEditorLinks();
    decorateHome();
    decoratePost();
    addBadge();
    decorateTitles();
    rotateLive2dTips();
    addMascotHint();
    initClickBurst();
    initLive2dFix();
  });
})();
