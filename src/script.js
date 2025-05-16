// 联系方式数据
const contactData = [
  {
    icon: "fas fa-envelope",
    info: "l13704095419@163.com",
    link: "mailto:l13704095419@163.com",
  },
  {
    icon: "fab fa-git-alt",
    info: "https://gitee.com/lyDevelop",
    link: "https://gitee.com/lyDevelop",
  },
  {
    icon: "fas fa-phone-alt",
    info: "137-0409-5419",
    link: "tel:13704095419",
  },
];

// 技能数据
const skillsData = [
  {
    icon: "fas fa-code",
    title: "前端开发",
    description:
      "HTML5, CSS3, JavaScript, Typescript, Vue全家桶, React, 微信小程序",
  },
  {
    icon: "fas fa-database",
    title: "后端开发",
    description:
      "Node.js, Express, Python, Django, SQL(Postgres、MySQL、SQLServer), Java, SpringBoot, SpringCloud, Redis",
  },
  {
    icon: "fas fa-mobile-alt",
    title: "响应式设计",
    description: "Bootstrap, Media Queries",
  },
  {
    icon: "fas fa-server",
    title: "运维技术",
    description: "Docker, CI/CD, Linux, Shell, Nginx, AWS/阿里云",
  },
];

// 项目数据
const projectsData = [
  {
    title: "个人博客网站",
    description: "使用HTML、CSS和JavaScript开发的响应式个人博客网站。",
    links: [
      {
        url: "https://gitee.com/lyDevelop/my-blog",
        text: "查看源码",
        icon: "fab fa-git-alt",
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
      },
      {
        url: "https://gitee.com/lyDevelop/vue3-template",
        text: "前端源码",
        icon: "fab fa-git-alt",
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
      },
    ],
    tags: ["Vue", "uni-app"],
  },
];

// 等待DOM完全加载
document.addEventListener("DOMContentLoaded", function () {
  // 获取DOM元素
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const nav = document.querySelector("nav");
  const navHeight = nav.offsetHeight;
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links li a");
  const now = new Date();
  const year = now.getFullYear();
  document.getElementById("currentYear").textContent = year;

  // 渲染技能卡片
  function renderSkills() {
    const skillsContainer = document.querySelector(".skills-content");
    if (!skillsContainer) return;

    skillsContainer.innerHTML = "";

    skillsData.forEach((skill) => {
      const skillCard = document.createElement("div");
      skillCard.className = "skill-card";

      skillCard.innerHTML = `
        <i class="${skill.icon}"></i>
        <h3>${skill.title}</h3>
        <p>${skill.description}</p>
      `;

      skillsContainer.appendChild(skillCard);
    });
  }

  // 渲染项目卡片
  function renderProjects() {
    const projectsContainer = document.querySelector(".projects-content");
    if (!projectsContainer) return;

    projectsContainer.innerHTML = "";

    projectsData.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.className = "project-card";

      // 创建链接HTML
      const linksHTML = project.links
        .map(
          (link) => `
        <a href="${link.url}" class="project-link" target="_blank">
          <i class="${link.icon}"></i> ${link.text}
        </a>
      `
        )
        .join("");

      // 创建标签HTML
      const tagsHTML = `
        <div class="project-tags">
          ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
      `;

      projectCard.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        ${linksHTML}
        ${tagsHTML}
      `;

      projectsContainer.appendChild(projectCard);
    });
  }

  // 渲染联系方式
  function renderContacts() {
    const contactContainer = document.querySelector(".contact-info");
    if (!contactContainer) return;

    contactContainer.innerHTML = "";

    contactData.forEach((contact) => {
      const contactItem = document.createElement("div");
      contactItem.className = "contact-item";

      // 创建带有链接的内容
      contactItem.innerHTML = `
        <i class="${contact.icon}"></i>
        <p>${contact.info}</p>
      `;

      // 为整个联系项添加点击事件
      if (contact.link) {
        contactItem.style.cursor = "pointer";
        contactItem.addEventListener("click", () => {
          window.location.href = contact.link;
        });

        // 添加悬停效果
        contactItem.addEventListener("mouseenter", () => {
          contactItem.style.transform = "translateY(-5px)";
          contactItem.querySelector("i").style.color = "var(--primary-color)";
        });

        contactItem.addEventListener("mouseleave", () => {
          contactItem.style.transform = "translateY(0)";
          contactItem.querySelector("i").style.color = "";
        });
      }

      contactContainer.appendChild(contactItem);
    });
  }

  // 调用渲染函数
  renderSkills();
  renderProjects();
  renderContacts();

  // 打字机效果类
  class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = "";
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }

    type() {
      // 当前单词索引
      const current = this.wordIndex % this.words.length;
      // 获取完整的单词
      const fullTxt = this.words[current];

      // 检查是否处于删除状态
      if (this.isDeleting) {
        // 删除字符
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // 添加字符
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      // 插入txt到元素
      this.txtElement.innerHTML = this.txt;

      // 初始打字速度
      let typeSpeed = 100;

      if (this.isDeleting) {
        typeSpeed /= 2; // 删除速度更快
      }

      // 如果单词完成
      if (!this.isDeleting && this.txt === fullTxt) {
        // 在单词结束时暂停
        typeSpeed = this.wait;
        // 设置删除状态
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        // 移动到下一个单词
        this.wordIndex++;
        // 在开始打字前暂停
        typeSpeed = 500;
      }

      setTimeout(() => this.type(), typeSpeed);
    }
  }

  // 初始化打字机效果
  const txtElement = document.querySelector(".typing-text");
  const words = ["前端开发者", "后端工程师", "全栈开发者", "技术爱好者"];
  const wait = 2000;

  if (txtElement) {
    new TypeWriter(txtElement, words, wait);
  }

  // 菜单按钮点击事件
  menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    // 切换菜单图标
    const icon = menuBtn.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // 点击导航链接关闭菜单
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        const icon = menuBtn.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  });

  // 滚动事件处理
  window.addEventListener("scroll", function () {
    // 导航栏滚动效果
    if (window.scrollY > 50) {
      nav.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
      nav.style.background = "rgba(255, 255, 255, 0.95)";
    } else {
      nav.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
      nav.style.background = "white";
    }

    // 高亮当前部分的导航链接
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navHeight - 10;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href").substring(1) === current) {
        item.classList.add("active");
      }
    });
  });

  // 添加平滑滚动效果
  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      const targetPosition = targetSection.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  // 为logo链接也添加平滑滚动效果
  const logoLink = document.querySelector(".logo a");
  if (logoLink) {
    logoLink.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      const targetPosition = targetSection.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  }

  // 添加滚动动画 - 针对技能、项目卡片和联系项
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".skill-card, .project-card, .contact-item"
    );

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      const windowHeight = window.innerHeight;

      // 检查元素是否在视口内
      const isInViewport =
        elementTop < windowHeight * 0.9 && // 元素顶部进入视口的90%位置（更早触发）
        elementBottom > 0; // 元素底部还没有完全离开视口顶部

      if (isInViewport) {
        // 元素在视口内，显示它
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      } else {
        // 元素不在视口内，隐藏它
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
      }
    });
  };

  // 初始化元素样式
  const initElements = function () {
    // 初始化技能和项目卡片 - 设置为隐藏状态
    const animatedElements = document.querySelectorAll(
      ".skill-card, .project-card"
    );
    animatedElements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = "all 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)";
    });

    // 初始化联系部分 - 设置为隐藏状态，以便有动画效果
    const contactElements = document.querySelectorAll(".contact-item");
    contactElements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = "all 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)";
    });
  };

  // 调用初始化函数
  initElements();

  // 监听滚动事件
  window.addEventListener("scroll", animateOnScroll);

  // 初始加载时也执行一次
  animateOnScroll();

  // 确保联系部分的元素在页面加载后会自动显示
  setTimeout(function () {
    const contactElements = document.querySelectorAll(".contact-item");
    contactElements.forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    });
  }, 1500); // 1.5秒后显示联系部分
});
