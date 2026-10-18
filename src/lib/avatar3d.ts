// 3D avatar built from simple shapes with three.js. Loaded only in the browser, on demand.
import * as THREE from "three";
import { itemsById, type Item } from "@/content/wardrobe";
import { defaultLook, type AvatarLook } from "./avatar";

const HEAD_Y = 0.75;
const SEG = 40;

type Mat = THREE.MeshStandardMaterial;

function mat(color: string, opts: Partial<THREE.MeshStandardMaterialParameters> = {}): Mat {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.65, metalness: 0, ...opts });
}

function mesh(geo: THREE.BufferGeometry, m: THREE.Material, pos: [number, number, number] = [0, 0, 0], rot: [number, number, number] = [0, 0, 0], scale: [number, number, number] = [1, 1, 1]) {
  const o = new THREE.Mesh(geo, m);
  o.position.set(...pos);
  o.rotation.set(...rot);
  o.scale.set(...scale);
  return o;
}

const sphere = (r: number, thetaLength = Math.PI, phiStart = 0, phiLength = Math.PI * 2) =>
  new THREE.SphereGeometry(r, SEG, Math.round(SEG * 0.75), phiStart, phiLength, 0, thetaLength);

function darker(hex: string, amount = 0.25) {
  const c = new THREE.Color(hex);
  c.offsetHSL(0, 0, -amount);
  return `#${c.getHexString()}`;
}

function get(id: string | null, fallback: string | null): Item | null {
  return (id && itemsById[id]) || (fallback ? itemsById[fallback] : null) || null;
}

/** Horizontal bands for striped tops, mapped on the torso sphere's UVs. */
function stripeTexture(base: string, stripe: string) {
  const c = document.createElement("canvas");
  c.width = 4;
  c.height = 64;
  const g = c.getContext("2d")!;
  g.fillStyle = base;
  g.fillRect(0, 0, 4, 64);
  g.fillStyle = stripe;
  for (let y = 34; y < 64; y += 10) g.fillRect(0, y, 4, 4);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.magFilter = THREE.NearestFilter;
  return t;
}

function buildHair(shape: string, color: string, g: THREE.Group, underHat = false) {
  const m = mat(color, { roughness: 0.8 });
  const cap = (r: number, theta: number, tilt = -0.28) => mesh(sphere(r, theta), m, [0, HEAD_Y, 0], [tilt, 0, 0]);
  switch (shape) {
    case "short":
      g.add(cap(1.05, 1.2));
      g.add(mesh(new THREE.SphereGeometry(0.42, SEG, 24), m, [-0.32, HEAD_Y + 0.72, 0.6], [0.3, 0, 0.45], [1.5, 0.55, 0.8]));
      break;
    case "long":
      g.add(cap(1.05, 1.3, -0.2));
      g.add(mesh(new THREE.CapsuleGeometry(0.9, 1.1, 8, SEG), m, [0, HEAD_Y - 0.55, -0.32], [0, 0, 0], [1.08, 1, 0.7]));
      for (const x of [-0.82, 0.82]) g.add(mesh(new THREE.CapsuleGeometry(0.26, 1.0, 8, 20), m, [x, HEAD_Y - 0.45, 0.12]));
      break;
    case "curly": {
      const curl = new THREE.SphereGeometry(0.34, 20, 16);
      for (let i = 0; i < 26; i++) {
        // Spread curls over the top and back of the head.
        const t = (i / 26) * Math.PI * 2 * 3.1;
        const v = 0.15 + (i / 26) * 0.95;
        const theta = v * 1.35;
        const x = Math.sin(theta) * Math.cos(t);
        const z = Math.sin(theta) * Math.sin(t);
        const y = Math.cos(theta);
        if (z > 0.55 && y < 0.6) continue; // keep the face clear
        if (underHat && y > 0.45) continue;
        g.add(mesh(curl, m, [x * 1.02, HEAD_Y + y * 1.02, z * 1.0 - 0.05]));
      }
      if (!underHat) g.add(cap(1.0, 1.35, -0.15));
      break;
    }
    case "bun":
      g.add(cap(1.05, 1.25));
      g.add(mesh(new THREE.SphereGeometry(0.4, SEG, 24), m, [0, HEAD_Y + 1.1, -0.25]));
      break;
    case "buzz":
      g.add(cap(1.025, 1.1));
      break;
    case "tucked":
      // Hair under a hat: covers the back and sides so the head never looks bald.
      g.add(cap(1.04, 1.55, -0.45));
      break;
    case "spiky": {
      g.add(cap(1.05, 1.15));
      const cone = new THREE.ConeGeometry(0.2, 0.55, 16);
      for (const [x, z] of [[0, 0], [-0.45, 0.2], [0.45, 0.2], [-0.3, -0.35], [0.3, -0.35], [0, 0.45], [-0.6, -0.1], [0.6, -0.1]]) {
        const p = new THREE.Vector3(x, 1, z).normalize();
        const s = mesh(cone, m, [p.x * 1.05, HEAD_Y + p.y * 1.05, p.z * 1.05]);
        s.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), p);
        g.add(s);
      }
      break;
    }
  }
}

// Torso outline (radius, height), spun around the vertical axis.
const TORSO_PROFILE: [number, number][] = [
  [0.001, -0.36], [0.3, -0.38], [0.55, -0.46], [0.68, -0.6], [0.72, -0.85], [0.7, -1.3], [0.66, -1.75], [0.64, -2.0], [0.5, -2.12], [0.001, -2.15],
];
const TORSO_SCALE: [number, number, number] = [1.12, 1, 0.78];
const CHEST_Z = 0.56;
const SHOULDER_X = 0.86;

function torsoGeo(gap = 0) {
  const pts = TORSO_PROFILE.map(([r, y]) => new THREE.Vector2(r, y));
  return gap ? new THREE.LatheGeometry(pts, 48, gap, Math.PI * 2 - gap * 2) : new THREE.LatheGeometry(pts, 48);
}

/** Arm hanging from the shoulder: sleeve, forearm and hand. Sleeve color comes from the top. */
function buildArm(side: -1 | 1, sleeve: THREE.Material, skin: THREE.Material, g: THREE.Group, longSleeve: boolean) {
  const arm = new THREE.Group();
  arm.position.set(side * SHOULDER_X, -0.66, 0);
  arm.rotation.z = side * 0.16;
  arm.add(mesh(new THREE.SphereGeometry(0.25, 24, 16), sleeve, [0, 0, 0]));
  arm.add(mesh(new THREE.CapsuleGeometry(0.22, longSleeve ? 0.95 : 0.35, 8, 20), sleeve, [0, longSleeve ? -0.5 : -0.24, 0]));
  if (!longSleeve) arm.add(mesh(new THREE.CapsuleGeometry(0.17, 0.62, 8, 20), skin, [0, -0.72, 0]));
  arm.add(mesh(new THREE.SphereGeometry(0.21, 20, 16), skin, [0, -1.18, 0.02], [0, 0, 0], [0.95, 1.1, 0.85]));
  g.add(arm);
}

function buildTop(item: Item, skinMat: THREE.Material, g: THREE.Group) {
  const { shape, color } = item;
  const accent = item.accent ?? darker(color);
  const torso = (m: THREE.Material, gap = 0, grow = 1) => {
    m.side = THREE.DoubleSide;
    return mesh(torsoGeo(gap), m, [0, 0, 0], [0, 0, 0], [TORSO_SCALE[0] * grow, 1, TORSO_SCALE[2] * grow]);
  };
  const side = new THREE.MeshStandardMaterial({ color, roughness: 0.7, side: THREE.DoubleSide });
  let sleeve: THREE.Material = mat(color, { roughness: 0.75 });
  let longSleeve = false;

  switch (shape) {
    case "stripes": {
      const striped = new THREE.MeshStandardMaterial({ map: stripeTexture(color, accent), roughness: 0.75 });
      g.add(torso(striped));
      longSleeve = true;
      break;
    }
    case "hoodie":
      g.add(torso(mat(color, { roughness: 0.85 })));
      g.add(mesh(new THREE.TorusGeometry(0.46, 0.17, 16, 40), mat(accent, { roughness: 0.85 }), [0, -0.46, -0.04], [Math.PI / 2 - 0.3, 0, 0]));
      for (const x of [-0.14, 0.14]) g.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.45), mat("#fafaf9"), [x, -0.82, CHEST_Z + 0.02], [-0.1, 0, 0]));
      g.add(mesh(new THREE.BoxGeometry(0.8, 0.32, 0.06), mat(accent, { roughness: 0.85 }), [0, -1.55, CHEST_Z - 0.02]));
      longSleeve = true;
      break;
    case "vest":
      g.add(torso(mat(accent)));
      g.add(torso(side, 0.5, 1.04));
      sleeve = mat(accent);
      break;
    case "jacket":
      g.add(torso(mat(accent)));
      g.add(torso(side, 0.3, 1.04));
      longSleeve = true;
      break;
    case "turtleneck":
      g.add(torso(mat(color, { roughness: 0.9 })));
      g.add(mesh(new THREE.CylinderGeometry(0.36, 0.42, 0.36, 32), mat(color, { roughness: 0.9 }), [0, -0.4, 0]));
      longSleeve = true;
      break;
    case "spacesuit":
      g.add(torso(mat(color, { roughness: 0.5 })));
      g.add(mesh(new THREE.TorusGeometry(0.42, 0.11, 16, 40), mat("#94a3b8", { metalness: 0.4, roughness: 0.35 }), [0, -0.45, 0], [Math.PI / 2, 0, 0]));
      g.add(mesh(new THREE.BoxGeometry(0.42, 0.28, 0.1), mat(accent), [0.32, -1.0, CHEST_Z + 0.03]));
      g.add(mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.06, 24), mat("#2563eb"), [-0.34, -1.0, CHEST_Z + 0.03], [Math.PI / 2, 0, 0]));
      longSleeve = true;
      break;
    case "varsity":
      g.add(torso(mat(color)));
      g.add(mesh(new THREE.TorusGeometry(0.4, 0.07, 12, 40), mat(accent), [0, -0.46, 0.02], [Math.PI / 2 - 0.25, 0, 0]));
      g.add(mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.05, 24), mat(accent), [-0.34, -0.95, CHEST_Z + 0.02], [Math.PI / 2, 0, 0]));
      sleeve = mat("#f5f5f4");
      longSleeve = true;
      break;
    default:
      g.add(torso(mat(color)));
  }
  buildArm(-1, sleeve, skinMat, g, longSleeve);
  buildArm(1, sleeve, skinMat, g, longSleeve);
}

/** Jeans and sneakers, the same for everyone for now. */
function buildLegs(g: THREE.Group) {
  const denim = mat("#3f5f8f", { roughness: 0.9 });
  const sole = mat("#f5f5f4", { roughness: 0.6 });
  const shoe = mat("#1c1917", { roughness: 0.5 });
  g.add(mesh(new THREE.SphereGeometry(0.7, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), denim, [0, -2.0, 0], [Math.PI, 0, 0], [1.08, 0.55, 0.78]));
  for (const x of [-0.34, 0.34]) {
    g.add(mesh(new THREE.CapsuleGeometry(0.27, 1.0, 8, 20), denim, [x, -2.75, 0]));
    g.add(mesh(new THREE.SphereGeometry(0.3, 24, 16), shoe, [x, -3.42, 0.12], [0, 0, 0], [1, 0.62, 1.45]));
    g.add(mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.08, 24), sole, [x, -3.58, 0.12], [0, 0, 0], [1, 1, 1.45]));
  }
}

function buildFace(item: Item, g: THREE.Group) {
  const { shape, color } = item;
  const m = mat(color, { roughness: 0.4 });
  const eyeY = HEAD_Y + 0.07;
  const z = 0.93;
  switch (shape) {
    case "round":
    case "square": {
      const sq = shape === "square";
      const frame = new THREE.TorusGeometry(sq ? 0.27 : 0.23, 0.045, 10, sq ? 4 : 32);
      for (const x of [-0.33, 0.33]) g.add(mesh(frame, m, [x, eyeY, z], [0, 0, sq ? Math.PI / 4 : 0], sq ? [1.15, 0.85, 1] : [1, 1, 1]));
      g.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.18), m, [0, eyeY + 0.03, z + 0.02], [0, 0, Math.PI / 2]));
      break;
    }
    case "shades":
      for (const x of [-0.33, 0.33]) g.add(mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.06, 32), mat(color, { roughness: 0.15, metalness: 0.3 }), [x, eyeY, z], [Math.PI / 2, 0, 0], [1.1, 1, 0.75]));
      g.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.2), m, [0, eyeY + 0.05, z + 0.02], [0, 0, Math.PI / 2]));
      break;
    case "goggles":
      g.add(mesh(new THREE.CylinderGeometry(0.97, 0.97, 0.18, 48, 1, true), mat(color, { side: THREE.DoubleSide }), [0, eyeY, -0.02], [0, 0, 0], [1, 1, 1]));
      g.add(
        mesh(
          new THREE.CapsuleGeometry(0.22, 0.55, 8, 24),
          new THREE.MeshStandardMaterial({ color: item.accent ?? "#99f6e4", transparent: true, opacity: 0.6, roughness: 0.1 }),
          [0, eyeY, 0.88],
          [0, 0, Math.PI / 2],
          [1, 1, 0.5],
        ),
      );
      break;
  }
}

function buildHat(item: Item, g: THREE.Group) {
  const { shape, color } = item;
  const accent = item.accent ?? darker(color);
  const m = mat(color);
  const a = mat(accent);
  const top = HEAD_Y + 1;
  const dome = (r: number, theta: number, tilt = -0.15) => mesh(sphere(r, theta), m, [0, HEAD_Y, 0], [tilt, 0, 0]);
  const disc = (r: number, h: number, y: number, material: THREE.Material, z = 0) => mesh(new THREE.CylinderGeometry(r, r, h, 48), material, [0, y, z]);
  switch (shape) {
    case "beanie":
      g.add(dome(1.09, 1.3, -0.1));
      g.add(mesh(new THREE.CylinderGeometry(1.03, 1.06, 0.34, 48), a, [0, HEAD_Y + 0.38, -0.02], [-0.1, 0, 0]));
      g.add(mesh(new THREE.SphereGeometry(0.22, 24, 16), a, [0, top + 0.15, -0.08]));
      break;
    case "cap":
      g.add(dome(1.08, 1.35, -0.12));
      g.add(mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.06, 40, 1, false, -Math.PI / 2, Math.PI), a, [0, HEAD_Y + 0.42, 0.72], [0.12, 0, 0], [1.05, 1, 1]));
      g.add(mesh(new THREE.SphereGeometry(0.08, 16, 12), a, [0, top + 0.08, -0.12]));
      break;
    case "beret":
      g.add(mesh(new THREE.SphereGeometry(1, SEG, 24), m, [-0.18, top - 0.02, -0.05], [0.1, 0, 0.22], [1.25, 0.32, 1.18]));
      g.add(mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.2), m, [-0.25, top + 0.32, -0.05], [0, 0, 0.22]));
      break;
    case "gradcap": {
      g.add(mesh(new THREE.CylinderGeometry(0.85, 0.9, 0.5, 40), m, [0, top - 0.1, -0.05]));
      g.add(mesh(new THREE.BoxGeometry(2.3, 0.07, 2.3), m, [0, top + 0.18, -0.05], [0, Math.PI / 4, 0]));
      g.add(mesh(new THREE.SphereGeometry(0.09, 16, 12), a, [0, top + 0.25, -0.05]));
      g.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.05), a, [0.6, top + 0.21, 0.55], [0, 0, Math.PI / 2 - 0.25], [1, 1, 1]));
      g.add(mesh(new THREE.CylinderGeometry(0.05, 0.08, 0.35, 12), a, [1.08, top - 0.05, 0.55]));
      break;
    }
    case "explorer":
      g.add(dome(1.06, 1.25, -0.08));
      g.add(disc(1.75, 0.06, HEAD_Y + 0.4, m));
      g.add(mesh(new THREE.CylinderGeometry(0.98, 1.0, 0.2, 48), a, [0, HEAD_Y + 0.52, -0.03]));
      break;
    case "hardhat":
      g.add(mesh(sphere(1.12, Math.PI / 2), m, [0, HEAD_Y + 0.25, -0.02]));
      g.add(mesh(new THREE.CylinderGeometry(1.32, 1.32, 0.08, 48), a, [0, HEAD_Y + 0.28, 0.12], [0, 0, 0], [1, 1, 1.05]));
      break;
    case "fedora":
      g.add(disc(1.6, 0.06, HEAD_Y + 0.62, m));
      g.add(mesh(new THREE.CylinderGeometry(0.72, 0.9, 0.75, 40), m, [0, HEAD_Y + 1.0, -0.02]));
      g.add(mesh(new THREE.CylinderGeometry(0.86, 0.91, 0.17, 40), a, [0, HEAD_Y + 0.73, -0.02]));
      break;
    case "crown": {
      const gold = mat(color, { metalness: 0.6, roughness: 0.3, side: THREE.DoubleSide });
      g.add(mesh(new THREE.CylinderGeometry(0.78, 0.8, 0.42, 40, 1, true), gold, [0, top + 0.05, -0.05]));
      const spike = new THREE.ConeGeometry(0.16, 0.42, 12);
      const gem = new THREE.SphereGeometry(0.09, 16, 12);
      for (let i = 0; i < 6; i++) {
        const t = (i / 6) * Math.PI * 2;
        g.add(mesh(spike, gold, [Math.sin(t) * 0.76, top + 0.45, Math.cos(t) * 0.76 - 0.05]));
        g.add(mesh(gem, mat(accent, { roughness: 0.2 }), [Math.sin(t) * 0.8, top + 0.05, Math.cos(t) * 0.8 - 0.05]));
      }
      break;
    }
    case "headphones":
      g.add(mesh(new THREE.TorusGeometry(1.14, 0.08, 16, 48, Math.PI), m, [0, HEAD_Y, 0]));
      for (const x of [-1.1, 1.1]) {
        g.add(mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.26, 32), m, [x, HEAD_Y, 0], [0, 0, Math.PI / 2]));
        g.add(mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.28, 32), a, [x * 1.03, HEAD_Y, 0], [0, 0, Math.PI / 2]));
      }
      break;
    case "helmet":
      g.add(mesh(new THREE.SphereGeometry(1.5, SEG, 32), new THREE.MeshStandardMaterial({ color: "#e0f2fe", transparent: true, opacity: 0.22, roughness: 0.05, metalness: 0.1, depthWrite: false }), [0, HEAD_Y - 0.05, 0]));
      g.add(mesh(new THREE.TorusGeometry(0.85, 0.16, 16, 48), mat(color, { metalness: 0.3, roughness: 0.35 }), [0, HEAD_Y - 1.35, 0], [Math.PI / 2, 0, 0]));
      break;
    case "cone":
      g.add(mesh(new THREE.ConeGeometry(0.55, 1.0, 32), m, [0.1, top + 0.38, -0.05], [0, 0, -0.12]));
      for (const y of [0.2, 0.55]) g.add(mesh(new THREE.TorusGeometry(0.47 - y * 0.55, 0.05, 8, 32), a, [0.1 + y * 0.12, top + y, -0.05], [Math.PI / 2, 0.12, 0]));
      g.add(mesh(new THREE.SphereGeometry(0.15, 16, 12), a, [0.22, top + 0.9, -0.05]));
      break;
  }
}

function buildMouth(expression: string, g: THREE.Group) {
  const ink = mat("#3b1d14", { roughness: 0.5 });
  const y = HEAD_Y - 0.32;
  if (expression === "grin") {
    g.add(mesh(new THREE.SphereGeometry(0.22, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), ink, [0, y + 0.06, 0.83], [Math.PI / 2 - 0.1, 0, 0], [1.1, 0.5, 0.75]));
  } else if (expression === "calm") {
    g.add(mesh(new THREE.CapsuleGeometry(0.035, 0.22, 4, 8), ink, [0, y, 0.88], [0, 0, Math.PI / 2]));
  } else {
    g.add(mesh(new THREE.TorusGeometry(0.17, 0.04, 8, 24, Math.PI), ink, [0, y + 0.1, 0.87], [0.15, 0, Math.PI]));
  }
}

/** The whole avatar as a three.js group, centered for the default camera. */
export function buildAvatar(look: AvatarLook): THREE.Group {
  const g = new THREE.Group();
  const skin = mat(look.skin, { roughness: 0.6 });
  const hair = get(look.hair, defaultLook.hair)!;
  const top = get(look.top, defaultLook.top)!;
  const hat = get(look.hat, null);
  const face = get(look.face, null);

  // Head, ears, nose, neck
  g.add(mesh(new THREE.SphereGeometry(1, SEG * 1.5, SEG), skin, [0, HEAD_Y, 0], [0, 0, 0], [0.93, 1, 0.92]));
  for (const x of [-0.9, 0.9]) g.add(mesh(new THREE.SphereGeometry(0.2, 20, 16), skin, [x, HEAD_Y - 0.02, 0], [0, 0, 0], [0.6, 1, 0.8]));
  g.add(mesh(new THREE.SphereGeometry(0.12, 20, 16), skin, [0, HEAD_Y - 0.12, 0.92]));
  g.add(mesh(new THREE.CylinderGeometry(0.3, 0.33, 0.6, 32), skin, [0, -0.3, 0]));

  // Eyes with a highlight, and cheeks
  const eye = mat("#1c1917", { roughness: 0.2 });
  const shine = new THREE.MeshBasicMaterial({ color: "#ffffff" });
  for (const x of [-0.33, 0.33]) {
    g.add(mesh(new THREE.SphereGeometry(0.1, 20, 16), eye, [x, HEAD_Y + 0.07, 0.83], [0, 0, 0], [1, 1.15, 0.6]));
    g.add(mesh(new THREE.SphereGeometry(0.03, 10, 8), shine, [x + 0.03, HEAD_Y + 0.11, 0.89]));
    g.add(mesh(new THREE.CircleGeometry(0.14, 24), new THREE.MeshBasicMaterial({ color: "#f472b6", transparent: true, opacity: 0.22 }), [x * 1.55, HEAD_Y - 0.18, 0.75], [0, x * 1.4, 0]));
  }
  buildMouth(look.expression, g);

  // Small hats (crown, party cone) and over-ear gear leave the hair as it is.
  const brimmed = hat && !["headphones", "helmet", "crown", "cone"].includes(hat.shape);
  // Under a hat, short styles tuck in; long hair and curls still show below the brim.
  const tuck = brimmed && !["long", "shaved", "curly"].includes(hair.shape);
  buildHair(tuck ? "tucked" : hair.shape, look.hairColor, g, !!brimmed);
  buildLegs(g);
  buildTop(top, skin, g);
  if (face) buildFace(face, g);
  if (hat) buildHat(hat, g);
  return g;
}

export function disposeGroup(g: THREE.Object3D) {
  g.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.geometry.dispose();
      const m = o.material as THREE.Material & { map?: THREE.Texture | null };
      m.map?.dispose();
      m.dispose();
    }
  });
}

export type Framing = "portrait" | "full";

function aim(camera: THREE.PerspectiveCamera, framing: Framing) {
  if (framing === "full") {
    camera.position.set(0, 0.1, 12.9);
    camera.lookAt(0, -0.45, 0);
  } else {
    camera.position.set(0, 0.8, 8.6);
    camera.lookAt(0, 0.5, 0);
  }
}

export function createScene(framing: Framing = "portrait") {
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight("#ffffff", "#e7d6c8", 1.9));
  const key = new THREE.DirectionalLight("#ffffff", 2.2);
  key.position.set(3, 4, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight("#dbeafe", 1.1);
  rim.position.set(-4, 3, -4);
  scene.add(rim);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  aim(camera, framing);
  return { scene, camera };
}

export function createRenderer(canvas?: HTMLCanvasElement, preserve = false) {
  const r = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: preserve });
  r.setClearColor(0x000000, 0);
  r.outputColorSpace = THREE.SRGBColorSpace;
  return r;
}

/** Draws a backdrop item (solid color plus pattern) into a 2D canvas. */
export function drawBackdrop(ctx: CanvasRenderingContext2D, item: Item | null, size: number) {
  const bg = item ?? itemsById[defaultLook.bg];
  const s = size / 100;
  ctx.save();
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = bg.color;
  ctx.fillRect(0, 0, size, size);
  const accent = bg.accent ?? "rgba(0,0,0,0.14)";
  ctx.fillStyle = accent;
  ctx.strokeStyle = accent;
  switch (bg.shape) {
    case "dots":
      for (let x = 6; x < 100; x += 12) for (let y = 6; y < 100; y += 12) {
        ctx.beginPath();
        ctx.arc(x * s, y * s, 1.8 * s, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    case "stripes":
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = 4 * s;
      for (let i = -100; i < 100; i += 14) {
        ctx.beginPath();
        ctx.moveTo(i * s, 100 * s);
        ctx.lineTo((i + 100) * s, 0);
        ctx.stroke();
      }
      break;
    case "grid":
      ctx.lineWidth = 0.8 * s;
      for (let i = 10; i < 100; i += 10) {
        ctx.beginPath();
        ctx.moveTo(i * s, 0);
        ctx.lineTo(i * s, size);
        ctx.moveTo(0, i * s);
        ctx.lineTo(size, i * s);
        ctx.stroke();
      }
      break;
    case "stars":
      for (const [x, y, k] of [[16, 18, 1.3], [80, 14, 1], [86, 52, 1.3], [12, 60, 1], [30, 40, 0.9], [72, 32, 1.2], [50, 8, 0.9]]) {
        ctx.beginPath();
        const r = 3 * k * s;
        ctx.moveTo(x * s, y * s - r);
        ctx.lineTo(x * s + r * 0.3, y * s - r * 0.3);
        ctx.lineTo(x * s + r, y * s);
        ctx.lineTo(x * s + r * 0.3, y * s + r * 0.3);
        ctx.lineTo(x * s, y * s + r);
        ctx.lineTo(x * s - r * 0.3, y * s + r * 0.3);
        ctx.lineTo(x * s - r, y * s);
        ctx.lineTo(x * s - r * 0.3, y * s - r * 0.3);
        ctx.fill();
      }
      break;
    case "rays":
      ctx.globalAlpha = 0.35;
      for (let i = 0; i < 12; i += 2) {
        const a1 = (Math.PI * i) / 12, a2 = (Math.PI * (i + 1)) / 12;
        ctx.beginPath();
        ctx.moveTo(50 * s, 100 * s);
        ctx.lineTo((50 - 140 * Math.cos(a1)) * s, (100 - 140 * Math.sin(a1)) * s);
        ctx.lineTo((50 - 140 * Math.cos(a2)) * s, (100 - 140 * Math.sin(a2)) * s);
        ctx.fill();
      }
      break;
    case "rings":
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 5 * s;
      for (const r of [14, 26, 38, 50]) {
        ctx.beginPath();
        ctx.arc(50 * s, 50 * s, r * s, 0, Math.PI * 2);
        ctx.stroke();
      }
      break;
  }
  ctx.restore();
}

// One shared renderer turns looks into still images for tiles, badges and rewards.
let shared: { renderer: THREE.WebGLRenderer; scene: THREE.Scene; camera: THREE.PerspectiveCamera } | null = null;
const cache = new Map<string, string>();

export function renderAvatarImage(look: AvatarLook, px: number, framing: Framing = "portrait"): string {
  const key = `${px}:${framing}:${JSON.stringify(look)}`;
  const hit = cache.get(key);
  if (hit) return hit;
  if (!shared) shared = { renderer: createRenderer(undefined, true), ...createScene() };
  const { renderer, scene, camera } = shared;
  aim(camera, framing);
  renderer.setPixelRatio(1);
  renderer.setSize(px, px, false);
  const avatar = buildAvatar(look);
  avatar.rotation.y = -0.18;
  scene.add(avatar);
  renderer.render(scene, camera);
  scene.remove(avatar);
  disposeGroup(avatar);

  const out = document.createElement("canvas");
  out.width = out.height = px;
  const ctx = out.getContext("2d")!;
  drawBackdrop(ctx, get(look.bg, defaultLook.bg), px);
  ctx.save();
  ctx.beginPath();
  ctx.arc(px / 2, px / 2, px / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(renderer.domElement, 0, 0);
  ctx.restore();
  const url = out.toDataURL("image/png");
  if (cache.size > 400) cache.clear();
  cache.set(key, url);
  return url;
}

export function webglAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}
