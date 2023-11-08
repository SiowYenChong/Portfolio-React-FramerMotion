const particlesConfigCustom = {
  fpsLimit: 60,
  particles: {
    number: {
      value: 139,
      density: { enable: true, value_area: 2886.1417095579413 }
    },
    color: { value: "#000000" },
    shape: {
      type: "star",
      stroke: { width: 13, color: "#19ebc6" },
      polygon: { nb_sides: 4 },
      image: { src: "img/github.svg", width: 80, height: 100 }
    },
    opacity: {
      value: 0.21646062821684559,
      random: true,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 28.05971106514665,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: false,
      distance: 400.85301521638075,
      color: "#000000",
      opacity: 0.32068241217310456,
      width: 1.4430708547789706
    },
    move: {
      enable: true,
      speed: 6,
      direction: "bottom",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "repulse" },
      resize: true
    },
    modes: {
      grab: { distance: 414.159378273686, line_linked: { opacity: 0.5 } },
      bubble: { distance: 400, size: 4, duration: 0.3, opacity: 1, speed: 3 },
      repulse: { distance: 407.5924075924076, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
}
export default particlesConfigCustom;
