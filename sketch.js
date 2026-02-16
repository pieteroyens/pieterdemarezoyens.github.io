let scrollTarget01 = 0; // raw scroll, 0..1
let scrollSmooth01 = 0; // smoothed scroll, 0..1
var num_circles = 0;
const min_diameter = 20;

let lastMs = 0;
let idle = 0;

function updateScrollTarget() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollTarget01 = docHeight > 0 ? scrollTop / docHeight : 0;
  scrollTarget01 = constrain(scrollTarget01, 0, 1);
}

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.parent("sketch-holder");
  noStroke();

  updateScrollTarget();
  scrollSmooth01 = scrollTarget01;

  window.addEventListener("scroll", updateScrollTarget, { passive: true });

  num_circles = width / 5;
  print(num_circles)
}

function draw() {

  const now = millis();
  const dt = lastMs ? (now - lastMs) / 1000 : 1 / 60;
  lastMs = now;

  background(8, 10, 18);

  // 0.08–0.2 is a good range. Higher = snappier, lower = smoother.
  const ease = 0.01;
  scrollSmooth01 = lerp(scrollSmooth01, scrollTarget01, ease);

  // Idle drift: always advances, but small
  // Increase 0.05 -> more motion, decrease -> subtler
  idle += dt * 0.06;

  const scrollScale = 0.1;
  const idleScale = 0.1;

  // Use smoothed scroll to drive noise "time"
  // const t = scrollSmooth01 * 0.2; // scale controls how far positions travel
  const t = scrollSmooth01 * scrollScale + idle * idleScale;
  // var t = scrollTarget01 * 0.2;

  draw_circles(t, num_circles)

}

function draw_circles(t, num_circles) {
  // print(t)
  for (let i = 0; i < num_circles; i++) {
    const nx = noise(i * 10, t);
    const ny = noise(i * 10 + 1000, t);

    const x = nx * width;
    const y = ny * height;

    const r = min_diameter + 120 * noise(i * 10 + 2000, t);
    fill(120 + 80 * nx, 90 + 80 * ny, 200, 22);
    circle(x, y, r);
  }
}
