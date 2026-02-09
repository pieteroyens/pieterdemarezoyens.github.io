let scrollTarget01 = 0; // raw scroll, 0..1
let scrollSmooth01 = 0; // smoothed scroll, 0..1

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
}

function draw() {
  background(8, 10, 18);

  // 0.08–0.2 is a good range. Higher = snappier, lower = smoother.
  const ease = 0.08;
  scrollSmooth01 = lerp(scrollSmooth01, scrollTarget01, ease);

  // Use smoothed scroll to drive noise "time"
  const t = scrollSmooth01 * 1.0; // scale controls how far positions travel

  for (let i = 0; i < 30; i++) {
    const nx = noise(i * 10, t);
    const ny = noise(i * 10 + 1000, t);

    const x = nx * width;
    const y = ny * height;

    const r = 160 + 120 * noise(i * 10 + 2000, t);
    fill(120 + 80 * nx, 90 + 80 * ny, 200, 22);
    circle(x, y, r);
  }
}
