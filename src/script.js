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
