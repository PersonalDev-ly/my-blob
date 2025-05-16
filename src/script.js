// 常量配置
const CONFIG = {
  // 动画配置
  ANIMATION: {
    DURATION: "1.2s",
    EASING: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    DELAY: 1500,
  },
  // TypeWriter配置
  TYPEWRITER: {
    WORDS: ["前端开发者", "后端工程师", "全栈开发者", "技术爱好者"],
    WAIT: 2000,
    TYPE_SPEED: 100,
    DELETE_SPEED: 50,
    START_DELAY: 500,
  },
};

// 数据模块
const DataService = {
  // 获取联系方式数据
  contactData: Object.freeze([
    {
      icon: "fas fa-envelope",
      info: "l13704095419@163.com",
      link: "mailto:l13704095419@163.com",
      ariaLabel: "发送邮件",
    },
    {
      icon: "fab fa-git-alt",
      info: "https://gitee.com/lyDevelop",
      link: "https://gitee.com/lyDevelop",
      ariaLabel: "访问Gitee仓库",
    },
    {
      icon: "fas fa-phone-alt",
      info: "137-0409-5419",
      link: "tel:13704095419",
      ariaLabel: "拨打电话",
    },
  ]),

  // 获取技能数据
  skillsData: Object.freeze([
    {
      icon: "fas fa-code",
      title: "前端开发",
      description:
        "HTML5, CSS3, JavaScript, Typescript, Vue全家桶, React, 微信小程序",
      ariaHidden: "false",
    },
    {
      icon: "fas fa-database",
      title: "后端开发",
      description:
        "Node.js, Express, Python, Django, SQL(Postgres、MySQL、SQLServer), Java, SpringBoot, SpringCloud, Redis",
      ariaHidden: "false",
    },
    {
      icon: "fas fa-mobile-alt",
      title: "响应式设计",
      description: "Bootstrap, Media Queries",
      ariaHidden: "false",
    },
    {
      icon: "fas fa-server",
      title: "运维技术",
      description: "Docker, CI/CD, Linux, Shell, Nginx, AWS/阿里云",
      ariaHidden: "false",
    },
  ]),

  // 获取项目数据
  projectsData: Object.freeze([
    {
      title: "个人博客网站",
      description: "使用HTML、CSS和JavaScript开发的响应式个人博客网站。",
      links: [
        {
          url: "https://gitee.com/lyDevelop/my-blog",
          text: "查看源码",
          icon: "fab fa-git-alt",
          ariaLabel: "查看博客源码",
        },
      ],
      tags: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "后台管理系统模板",
      description:
        "一个基于Vue3、TypeScript、Vite、Element-Plus、SpringBoot构建的前后端分离的后台管理系统模板",
      links: [
        {
          url: "https://gitee.com/lyDevelop/vue3-template-server",
          text: "后端源码",
          icon: "fab fa-git-alt",
          ariaLabel: "查看后端源码",
        },
        {
          url: "https://gitee.com/lyDevelop/vue3-template",
          text: "前端源码",
          icon: "fab fa-git-alt",
          ariaLabel: "查看前端源码",
        },
      ],
      tags: ["SpringBoot", "Vue", "Element-Plus"],
    },
    {
      title: "社区团购平台-微服务端",
      description: "SpringCloud实现的社区团购微服务端接口",
      links: [
        {
          url: "https://gitee.com/lyDevelop/youxuan-parent",
          text: "服务端源码",
          icon: "fab fa-git-alt",
          ariaLabel: "查看微服务端源码",
        },
      ],
      tags: ["SpringCloud", "Redis", "RabbitMQ", "ElasticSearch", "MySQL"],
    },
    {
      title: "社区团购平台-平台管理端",
      description: "vue + Element-UI 实现的后台管理端",
      links: [
        {
          url: "https://gitee.com/lyDevelop/ssyx-admin",
          text: "管理端源码",
          icon: "fab fa-git-alt",
          ariaLabel: "查看管理端源码",
        },
      ],
      tags: ["Vue", "Element-UI"],
    },
    {
      title: "社区团购平台-小程序",
      description: "uniapp 实现的小程序端",
      links: [
        {
          url: "https://gitee.com/lyDevelop/groupby-mp",
          text: "小程序源码",
          icon: "fab fa-git-alt",
          ariaLabel: "查看小程序源码",
        },
      ],
      tags: ["Vue", "uni-app"],
    },
  ]),
};

/**
 * RenderEngine 对象 - 页面渲染引擎
 *
 * 负责初始化页面DOM元素、设置模板、渲染内容以及处理交互逻辑。
 * 主要功能包括：
 * 1. 缓存DOM元素引用
 * 2. 定义HTML模板（技能卡、项目卡、联系方式）
 * 3. 渲染技能、项目和联系信息
 * 4. 实现打字机效果
 * 5. 设置事件监听器（菜单、导航、滚动等）
 * 6. 管理交互动画和视口观察
 *
 * 使用示例：
 * RenderEngine.init(); // 初始化整个渲染引擎
 *
 * @namespace RenderEngine
 * @property {Object} dom - 缓存的DOM元素集合
 * @property {Object} templates - HTML模板集合
 */
const RenderEngine = {
  init() {
    this.cacheDOM();
    this.setupTemplates();
    this.renderAll();
    this.setupIntersectionObserver();
  },

  // 缓存DOM元素引用
  cacheDOM() {
    this.dom = {
      skillsContainer: document.querySelector(".skills-content"),
      projectsContainer: document.querySelector(".projects-content"),
      contactContainer: document.querySelector(".contact-info"),
      txtElement: document.querySelector(".typing-text"),
      menuBtn: document.querySelector(".menu-btn"),
      navLinks: document.querySelector(".nav-links"),
      nav: document.querySelector("nav"),
      navItems: document.querySelectorAll(".nav-links li a"),
      sections: document.querySelectorAll("section"),
      logoLink: document.querySelector(".logo a"),
    };

    this.dom.navHeight = this.dom.nav.offsetHeight;
    document.getElementById("currentYear").textContent =
      new Date().getFullYear();
  },

  // 定义HTML模板（技能卡、项目卡、联系方式）
  setupTemplates() {
    this.templates = {
      // 技能卡模板
      skillCard: (skill) => `
        <div class="skill-card" aria-hidden="${skill.ariaHidden}">
          <i class="${skill.icon}" aria-hidden="true"></i>
          <h3>${skill.title}</h3>
          <p>${skill.description}</p>
        </div>
      `,
      // 项目卡模板
      projectCard: (project) => {
        const linksHTML = project.links
          .map(
            (link) => `
          <a href="${link.url}" class="project-link" target="_blank" rel="noopener" aria-label="${link.ariaLabel}">
            <i class="${link.icon}" aria-hidden="true"></i> ${link.text}
          </a>
        `
          )
          .join("");

        return `
          <div class="project-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            ${linksHTML}
            <div class="project-tags">
              ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
          </div>
        `;
      },
      // 联系方式模板
      contactItem: (contact) => `
        <div class="contact-item" role="button" tabindex="0" aria-label="${contact.ariaLabel}">
          <i class="${contact.icon}" aria-hidden="true"></i>
          <p>${contact.info}</p>
        </div>
      `,
    };
  },

  // 渲染技能、项目和联系信息
  renderAll() {
    this.renderSkills();
    this.renderProjects();
    this.renderContacts();
    this.initTypeWriter();
    this.setupEventListeners();
    this.initSkeleton();
  },

  // 渲染技能信息
  renderSkills() {
    if (!this.dom.skillsContainer) return;
    this.dom.skillsContainer.innerHTML = DataService.skillsData
      .map((skill) => this.templates.skillCard(skill))
      .join("");
  },

  // 渲染项目信息
  renderProjects() {
    if (!this.dom.projectsContainer) return;
    this.dom.projectsContainer.innerHTML = DataService.projectsData
      .map((project) => this.templates.projectCard(project))
      .join("");
  },

  // 渲染联系方式信息
  renderContacts() {
    if (!this.dom.contactContainer) return;
    this.dom.contactContainer.innerHTML = DataService.contactData
      .map((contact) => this.templates.contactItem(contact))
      .join("");

    // 添加联系项交互
    document.querySelectorAll(".contact-item").forEach((item) => {
      const link = DataService.contactData.find(
        (c) => c.info === item.querySelector("p").textContent
      )?.link;

      if (link) {
        item.addEventListener("click", () => {
          window.location.href = link;
        });

        item.addEventListener("keydown", (e) => {
          if (e.key === "Enter") window.location.href = link;
        });

        // 悬停效果
        item.addEventListener("mouseenter", () => {
          item.style.transform = "translateY(-5px)";
          item.querySelector("i").style.color = "var(--primary-color)";
        });

        // 离开效果
        item.addEventListener("mouseleave", () => {
          item.style.transform = "translateY(0)";
          item.querySelector("i").style.color = "";
        });
      }
    });
  },

  // 打字机动画效果初始化
  initTypeWriter() {
    if (!this.dom.txtElement) return;

    class TypeWriter {
      constructor(txtElement, words, wait) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = "";
        this.wordIndex = 0;
        this.wait = wait;
        this.isDeleting = false;
        this.type();
      }

      type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span aria-live="polite">${this.txt}</span>`;

        let typeSpeed = this.isDeleting
          ? CONFIG.TYPEWRITER.DELETE_SPEED
          : CONFIG.TYPEWRITER.TYPE_SPEED;

        if (!this.isDeleting && this.txt === fullTxt) {
          typeSpeed = this.wait;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
          this.isDeleting = false;
          this.wordIndex++;
          typeSpeed = CONFIG.TYPEWRITER.START_DELAY;
        }

        setTimeout(() => this.type(), typeSpeed);
      }
    }

    new TypeWriter(
      this.dom.txtElement,
      CONFIG.TYPEWRITER.WORDS,
      CONFIG.TYPEWRITER.WAIT
    );
  },

  // 事件监听器初始化
  setupEventListeners() {
    // 菜单切换
    this.dom.menuBtn.addEventListener("click", this.toggleMenu.bind(this));

    // 导航项事件委托
    this.dom.navLinks.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      e.preventDefault();
      this.handleNavClick(link);

      if (this.dom.navLinks.classList.contains("active")) {
        this.toggleMenu();
      }
    });

    // 平滑滚动
    if (this.dom.logoLink) {
      this.dom.logoLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.scrollToSection(this.dom.logoLink.getAttribute("href"));
      });
    }

    // 滚动事件
    window.addEventListener("scroll", this.handleScroll.bind(this));
  },

  // 菜单切换
  toggleMenu() {
    this.dom.navLinks.classList.toggle("active");
    const icon = this.dom.menuBtn.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  },

  // 导航项点击事件处理
  handleNavClick(link) {
    this.scrollToSection(link.getAttribute("href"));
    this.updateActiveNav(link);
  },

  // 滚动到指定位置
  scrollToSection(selector) {
    const target = document.querySelector(selector);
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop - this.dom.navHeight,
      behavior: "smooth",
    });
  },

  // 更新活动导航项
  updateActiveNav(activeLink) {
    this.dom.navItems.forEach((item) => {
      item.classList.toggle("active", item === activeLink);
    });
  },

  // 滚动事件处理
  handleScroll() {
    // 导航栏样式
    const scrollClass = window.scrollY > 50 ? "scrolled" : "";
    this.dom.nav.className = scrollClass;

    // 更新活动导航项
    let current = "";
    this.dom.sections.forEach((section) => {
      const sectionTop = section.offsetTop - this.dom.navHeight - 10;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    this.dom.navItems.forEach((item) => {
      const href = item.getAttribute("href").substring(1);
      item.classList.toggle("active", href === current);
    });
  },

  // 初始化骨架屏
  initSkeleton() {
    // 设置初始动画状态
    const animateElements = [
      ...document.querySelectorAll(".skill-card"),
      ...document.querySelectorAll(".project-card"),
      ...document.querySelectorAll(".contact-item"),
    ];

    animateElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = `all ${CONFIG.ANIMATION.DURATION} ${CONFIG.ANIMATION.EASING}`;
    });
  },

  // 初始化 IntersectionObserver
  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.style.opacity = entry.isIntersecting ? "1" : "0";
          entry.target.style.transform = entry.isIntersecting
            ? "translateY(0)"
            : "translateY(30px)";
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    document
      .querySelectorAll(".skill-card, .project-card, .contact-item")
      .forEach((el) => observer.observe(el));
  },
};

// 初始化应用
document.addEventListener("DOMContentLoaded", () => {
  // 预加载关键资源
  const links = document.querySelectorAll('link[rel="preload"]');
  links.forEach((link) => {
    if (link.href) {
      const as = link.getAttribute("as");
      if (as) {
        const preloadLink = document.createElement("link");
        preloadLink.href = link.href;
        preloadLink.rel = "preload";
        preloadLink.as = as;
        document.head.appendChild(preloadLink);
      }
    }
  });

  // 启动渲染引擎
  RenderEngine.init();
});
