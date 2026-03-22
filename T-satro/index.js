/* ===== MENU BUTTON TOGGLE ===== */
const menuButton = document.querySelector(".menu-button");
const sideMenu = document.querySelector(".side-menu");

if (menuButton && sideMenu) {
  menuButton.addEventListener("click", () => {
    menuButton.classList.toggle("open");
    sideMenu.classList.toggle("active");
  });
}

/* ===== ELEMENTS ===== */
const planets = document.querySelectorAll(".planet");
const solarContainer = document.querySelector(".solar-system-container");
const startButton = document.querySelector(".start-button");
const zoomContainer = document.querySelector(".zoom-container");
const title = document.querySelector(".project-title");
const modal = document.getElementById("myModal");
const closeModal = document.getElementsByClassName("close");

/* ===== INITIAL STATE ===== */
// make the sun huge before the system starts
if (zoomContainer) {
  zoomContainer.style.transform = "scale(2)";
}

// hide planets until the system appears
planets.forEach((p) => {
  p.style.display = "none";
});

let selectedPlanet = null;
let rotation = 0;
let systemStarted = false;

const ROTATION_INCREMENT = 0.0025;

/* ===== PLANET DATA ===== */
const planetData = [
  {
    name: "Mercury",
    AU: 0.39,
    speed: 0.05,
    size: 0.9,
    speedInfo:
      " Around sun 88 days with the speed 47km/s. Around itself: 59 days, one day on Mercury=176 earth days.",
    distanceInfo: "Minimum 77 million km, maximum 222 million km.",
    distanceInfo1: "Minimum 46 million km, maximum 70 million km.",
    sizeInfo: "Area  : 74 800 000km^2. Radius: 2.440km.",
    tempInfo: "Day temperature: 430”C, night temperature: -180”C.",
    addInfo:
      "Mercury formed about 4.5 billion years ago. Mercury is named for the swiftest of the ancient Roman gods. Mercury is not the hottest planet despite its proximity to the Sun. It is not known exactly when the planet was first discovered - although it was first observed through telescopes in the 17th century by astronomers Galileo Galilei and Thomas Harriot.",
    source1: "https://science.nasa.gov/mercury/facts/  ",
    source2: "https://www.nhm.ac.uk/discover/planet-mercury.html",
    source3: "https://www.space.com/18646-mercury-distance.html",
  },
  {
    name: "Venus",
    AU: 0.72,
    speed: 0.035,
    size: 1.8,
    speedInfo:
      " Around sun: 225 Earth days with the speed 35km/s. Around itself is 243 Earth days. .",
    distanceInfo: "Minimum: 38 million km, maximum: 261 million km.",
    distanceInfo1: "108 million km",
    sizeInfo: "Area : 460 000 000km^2. Radius: 6.050 km.",
    tempInfo: "475*C",
    addInfo:
      "Venus formed approximately 4.6 billion years ago. Venus is named for the ancient Roman goddess of love and beauty, who was known as Aphrodite to the ancient Greeks. The first person to point a telescope at Venus was Galileo Galilei in 1610.",
    source1: "https://science.nasa.gov/venus/venus-facts/",
    source2: "https://www.universetoday.com/articles/how-big-is-venus",
    source3: " https://www.britannica.com/place/Venus-planet",
    source4: "https://www.universetoday.com/articles/discovery-of-venus",
  },
  {
    name: "Earth",
    AU: 1.0,
    speed: 0.03,
    size: 2.3,
    speedInfo:
      "Around sun: 365.25 Earth days with the speed: 29.78km/s. Around itself: one solar day (day on Earth)=23.9h",
    distanceInfo1: "150 million km",
    sizeInfo: "Area : 510 000 000km^2. Radius: 6,373km.",
    tempInfo: "14*C",
    addInfo:
      "Earth formed approximately 4.5 billion years ago. The name Earth is about 1000 years old. The name is a Germanic word, which simply means 'the ground.'",
    source1: "https://science.nasa.gov/earth/facts/",
    source2: "https://www.universetoday.com/articles/earth-surface-temperature",
    source3: "https://www.britannica.com/place/Earth",
  },
  {
    name: "Mars",
    AU: 1.52,
    speed: 0.02,
    size: 1.3,
    speedInfo:
      "Around sun: 687 Earth days with the speed 24.1km/. Around itself: one day on Mars=24.6h.",
    distanceInfo: "54,6 minimum million km, 401 maximum million km.",
    distanceInfo1: "206 minimum million km, 249 maximum million km.",
    sizeInfo: "Area : 1.44*10^8km^2. Radius: 3.390km.",
    tempInfo: "Day temperature: up to 20”C, night temperature: -90”C.",
    addInfo:
      "Mars formed approximately 4.5 billion years ago. Mars was named by the ancient Romans for their god of war because its reddish color was reminiscent of blood. The earliest telescopic observations of Mars in which the disk of the planet was seen were those of the Italian astronomer Galileo Galilei in 1610.",
    source1: "https://science.nasa.gov/mars/facts/",
    source2: "https://www.britannica.com/place/Mars-planet",
    source3: " https://www.universetoday.com/articles/size-of-mars",
    source4:
      "https://study.com/academy/lesson/mars-distance-earth-fact-measurement.html",
  },
  {
    name: "Jupiter",
    AU: 5.2,
    speed: 0.012,
    size: 11.2,
    speedInfo:
      "Around sun: 4,333 Earth days(11,86 years) with the speed 13.1km/s. Around itself: one day on Jupiter=9,9h.",
    distanceInfo: "629 minimum million km, 928 maximum  million km.",
    distanceInfo1: "778 million km",
    sizeInfo: "Area : 61,5*10^9km^2. Radius: 69,911km.",
    tempInfo:
      "Temperature: -110”C at the level with the same pressure as Earth.",
    addInfo:
      "Jupiter was formed 4.6 billion years ago. Jupiter, being the biggest planet, gets its name from the king of the ancient Roman gods. Jupiter was first observed through telescope by Galileo Galilei in 1610.",
    source1: "https://science.nasa.gov/jupiter/jupiter-facts/      ",
    source2:
      "https://www.esa.int/Science_Exploration/Space_Science/Juice/Facts_about_Jupiter",
    source3:
      "https://www.britannica.com/place/Jupiter-planet/Basic-astronomical-data",
    source4:
      "https://www.universetoday.com/articles/how-far-is-jupiter-from-earth",
  },
  {
    name: "Saturn",
    AU: 9.58,
    speed: 0.008,
    size: 23.35,
    speedInfo:
      "Around sun: 10.756 Earth days with the speed 9.6km/s. Around itself: one day on Saturn=10.7h.",
    distanceInfo: "Average 1.2 minimum billion km.",
    distanceInfo1: "Average 1.4 billion km",
    sizeInfo: "Area: 42.7 billion km^2, radius: 60,050km.",
    tempInfo: "Temperature: -178”C.",
    addInfo:
      "The farthest planet from Earth discovered by the unaided human eye. The planet is named for the Roman god of agriculture and wealth. Saturn took shape when the rest of the solar system formed about 4.5 billion years ago. Galileo Galilei was the first to observe Saturn with a telescope in 1610.",
    source1: "https://science.nasa.gov/saturn/facts/",
    source2: "https://www.britannica.com/place/Saturn-planet",
    source3: "https://www.space.com/18473-saturn-temperature.html ",
    source4: "https://science.gsfc.nasa.gov/attic/huygensgcms/Shistory.htm ",
    source5: "https://www.universetoday.com/articles/how-big-is-saturn",
  },
  {
    name: "Uranus",
    AU: 19.22,
    speed: 0.005,
    size: 4,
    speedInfo:
      "Around sun: 30.687 Earth days with the speed 6.81km/s. Around itself: one day on Uranus=17h.",
    distanceInfo: "2,6 minimum billion km, maximum 3.2 billion km.",
    distanceInfo1: "average 2.9 billion km.",
    sizeInfo: "8.1*10^9km^2, radius: 25.559km.",
    tempInfo: "Temperature: -195”C.",
    addInfo:
      "Uranus took shape when the rest of the solar system formed about 4.5 billion years ago. Uranus was the first planet found with the aid of a telescope. It was discovered in 1781 by astronomer William Herschel, although he originally thought it was either a comet or a star. It was two years later that the object was universally accepted as a new planet, in part because of observations by astronomer Johann Elert Bode. The planet was named for Uranus, the Greek god of the sky, as suggested by Johann Bode.",
    source1: "https://science.nasa.gov/uranus/facts/",
    source2: "https://www.space.com/18709-uranus-distance.html",
    source3: "https://www.universetoday.com/articles/size-of-uranus",
    source4: " https://www.space.com/18707-uranus-temperature.html ",
  },
  {
    name: "Neptune",
    AU: 30.05,
    speed: 0.003,
    size: 3.9,
    speedInfo:
      "Around sun: 60.190 Earth days with the speed 5.5 km/s. Around itself: one day on Neptune=16h.",
    distanceInfo: "Minimum 4.3 billion km, maximum 4.7 billion km.",
    distanceInfo1: "Average 4.5 billion km.",
    sizeInfo: "7.64*10^9km^2, radius: 24,764km.",
    tempInfo: "Temperature: -214”C.",
    addInfo:
      "Neptune took shape when the rest of the solar system formed about 4.5 billion years ago. Galileo recorded Neptune as a fixed star during observations with his small telescope in 1612 and 1613. More than 200 years later, the ice giant became the first planet located through mathematical predictions rather than through regular observations of the sky. Johann Gottfried Galle at the Berlin Observatory, found Neptune on his first night of searching in 1846. Neptune was named after the Roman god of the sea",
    source1: "https://science.nasa.gov/neptune/neptune-facts/",
    source2:
      "https://coolcosmos.ipac.caltech.edu/ask/139-how-did-neptune-get-its-name-",
    source3: "https://www.space.com/18921-neptune-temperature.html",
    source4: "https://www.space.com/18923-neptune-distance.html",
    source5: "https://lco.global/spacebook/solar-system/neptune/",
    source6: "https://www.universetoday.com/articles/how-big-is-neptune",
  },
];

/* ===== ORBIT RADIUS ===== */
function getPlanetRadius(AU) {
  const maxAU = 30.05;
  const minScreen = Math.min(window.innerWidth, window.innerHeight);
  const maxRadius = minScreen * 0.45;

  return 200 + (AU / maxAU) * maxRadius;
}

/* ===== CREATE ORBITS ===== */
function createOrbits() {
  solarContainer.querySelectorAll(".orbit").forEach((o) => o.remove());

  planetData.forEach((data) => {
    const orbit = document.createElement("div");
    orbit.classList.add("orbit");

    const radius = getPlanetRadius(data.AU);

    orbit.style.width = radius * 2 + "px";
    orbit.style.height = radius * 2 + "px";

    solarContainer.appendChild(orbit);
  });
}

/* ===== PLANET SIZE ===== */
function applyPlanetSizes() {
  const baseSize = window.innerWidth * 0.02;

  planets.forEach((planet, i) => {
    const visualSize = Math.pow(planetData[i].size, 0.6) * baseSize;

    planet.style.width = visualSize + "px";
    planet.style.height = visualSize + "px";

    planet.style.display = "block";
  });
}

/* ===== INITIAL POSITION ===== */
function positionPlanets() {
  planets.forEach((planet, i) => {
    const radius = getPlanetRadius(planetData[i].AU);

    const x = radius;
    const y = 0;

    planet.style.left = `calc(50% + ${x}px - ${planet.offsetWidth / 2}px)`;
    planet.style.top = `calc(50% + ${y}px - ${planet.offsetHeight / 2}px)`;
  });
}

/* ===== SHOW SOLAR SYSTEM ===== */
function showSolarSystem() {
  systemStarted = true;

  // start with a huge sun
  zoomContainer.style.transition = "none";
  zoomContainer.style.transform = "scale(0.8)";

  createOrbits();
  applyPlanetSizes();
  positionPlanets();

  // show planets
  planets.forEach((p) => {
    p.style.display = "block";
  });

  // smooth zoom OUT to reveal the solar system
  requestAnimationFrame(() => {
    // zoomContainer.style.transition = "transform 1.6s ease";
    zoomContainer.style.transform = "scale(0.8)";
  });
}

/* ===== PLANET CLICK ===== */
planets.forEach((planet, i) => {
  planet.addEventListener("click", (e) => {
    e.stopPropagation();
    selectedPlanet = planet;
    title.style.display = "none";
    modal.style.display = "block";
    //Code hehre <------
    document.getElementById("planetName").textContent = planetData[i].name;
    document.getElementById("sizeInfo").textContent = planetData[i].sizeInfo;
    document.getElementById("speedInfo").textContent = planetData[i].speedInfo;
    document.getElementById("distanceInfo").textContent =
      planetData[i].distanceInfo;
    document.getElementById("distanceInfo1").textContent =
      planetData[i].distanceInfo1;
    document.getElementById("tempInfo").textContent = planetData[i].tempInfo;
    document.getElementById("addInfo").textContent = planetData[i].addInfo;
    if (planetData[i].source1) {
      document.getElementById("source1").href = planetData[i].source1;
      document.getElementById("source1").textContent = "source 1";
    } else {
      document.getElementById("source1").href = "";
      document.getElementById("source1").textContent = "";
    }
    if (planetData[i].source2) {
      document.getElementById("source2").href = planetData[i].source2;
      document.getElementById("source2").textContent = "source 2";
    } else {
      document.getElementById("source2").href = "";
      document.getElementById("source2").textContent = "";
    }
    if (planetData[i].source3) {
      document.getElementById("source3").href = planetData[i].source3;
      document.getElementById("source3").textContent = "source 3";
    } else {
      document.getElementById("source3").href = "";
      document.getElementById("source3").textContent = "";
    }
    if (planetData[i].source4) {
      document.getElementById("source4").href = planetData[i].source4;
      document.getElementById("source4").textContent = "source 4";
    } else {
      document.getElementById("source4").href = "";
      document.getElementById("source4").textContent = "";
    }
    if (planetData[i].source5) {
      document.getElementById("source5").href = planetData[i].source5;
      document.getElementById("source5").textContent = "source 5";
    } else {
      document.getElementById("source5").href = "";
      document.getElementById("source5").textContent = "";
    }
    if (planetData[i].source6) {
      document.getElementById("source6").href = planetData[i].source6;
      document.getElementById("source6").textContent = "source 6";
    } else {
      document.getElementById("source6").href = "";
      document.getElementById("source6").textContent = "";
    }
    //duplicate -> sourse2....
  });
});

/* ===== CLICK EMPTY SPACE ===== */
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("planet")) {
    selectedPlanet = null;
    title.style.display = "block";
    modal.style.display = "none";
  }
});

/* ===== PLANET ANIMATION ===== */
function animatePlanets() {
  if (!selectedPlanet) {
    rotation += ROTATION_INCREMENT;
  }

  let followX = 0;
  let followY = 0;

  planets.forEach((planet, i) => {
    const radius = getPlanetRadius(planetData[i].AU);
    const angle = rotation * planetData[i].speed * 100;

    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    planet.style.left = `calc(50% + ${x}px - ${planet.offsetWidth / 2}px)`;
    planet.style.top = `calc(50% + ${y}px - ${planet.offsetHeight / 2}px)`;

    if (planet === selectedPlanet) {
      followX = x;
      followY = y;
    }
  });

  if (selectedPlanet) {
    const zoom = 7.5;

    zoomContainer.style.transform = `translate(${-followX * zoom}px, ${-followY * zoom}px) scale(${zoom})`;
  } else if (systemStarted) {
    // normal solar system view
    zoomContainer.style.transform = `translate(0px,0px) scale(0.8)`;
  }

  requestAnimationFrame(animatePlanets);
}

/* ===== START BUTTON ===== */
if (startButton) {
  startButton.addEventListener("click", () => {
    showSolarSystem();
    animatePlanets();
    startButton.style.display = "none";
  });
}

/* ===== RESIZE ===== */
window.addEventListener("resize", () => {
  createOrbits();
  applyPlanetSizes();
  positionPlanets();
});
