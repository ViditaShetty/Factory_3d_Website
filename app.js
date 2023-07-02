const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 79;

const currentFrame = (index) => `./FactoryImgs/${(index + 10001).toString().slice(1)}.jpg`;

const images = [];
let ball = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  console.log(currentFrame(i));
  images.push(img);
}

gsap.to(ball, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.5,
    pin: "canvas",
    end: "500%",
  },
  onUpdate: render,
});

gsap.fromTo(
  ".ball-text",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    scrollTrigger: {
      scrub: 1,

      start: "30%",
      end: "35%",
    },
    onComplete: () => {
      gsap.to(".ball-text", { opacity: 0 });
    },
  }
);

images[0].onload = render;

function render() {
  context.canvas.width = images[0].width;
  context.canvas.height = images[0].height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[ball.frame], 0, 0);
}



/* =========== Show Navbar =========== */
const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("show");
});

/* =========== Scroll Position =========== */

const header = document.querySelector(".header");
const scrollLink = document.querySelectorAll(".navbar a:not(:last-child)");

/* =========== Smooth Scroll =========== */
Array.from(scrollLink).map((link) => {
  link.addEventListener("click", (e) => {
    // Prevent Default
    e.preventDefault();

    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    let position = element.offsetTop - 90;

    window.scrollTo({
      left: 0,
      top: position,
      behavior: "smooth",
    });
    navbar.classList.remove("show");
  });
});

/* =========== Preloader =========== */
const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.style.display = "none";
  }, 2000);
});

/* =========== Scroll Top =========== */
const scrollTop = document.querySelector(".scroll-top");

scrollTop.addEventListener("click", () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", (e) => {
  const scrollHeight = window.pageYOffset;

  if (scrollHeight > 300) {
    scrollTop.classList.add("show");
  } else {
    scrollTop.classList.remove("show");
  }
});


if("serviceWorker" in navigator){
    navigator.serviceWorker.register("service_worker.js").then(registration=>{
      console.log("SW Registered!");
    }).catch(error=>{
      console.log("SW Registration Failed");
    });
}else{
  console.log("Not supported");
}

