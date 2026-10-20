"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { itemsById, type Item } from "@/content/wardrobe";
import { defaultLook, withItem, type AvatarLook } from "@/lib/avatar";
import { Icon } from "./ui";

// Original vector art on a 100×100 canvas, clipped to a circle.
const TORSO = "M10 100 C10 82 28 74 50 74 C72 74 90 82 90 100 Z";
const SHADE = "rgba(0,0,0,0.14)";
const INK = "#1c1917";

function get(id: string | null, fallback: string | null): Item | null {
  return (id && itemsById[id]) || (fallback ? itemsById[fallback] : null) || null;
}

function Background({ item }: { item: Item }) {
  const { shape, color, accent = SHADE } = item;
  const marks: ReactNode[] = [];
  if (shape === "dots") {
    for (let x = 6; x < 100; x += 12) for (let y = 6; y < 100; y += 12) marks.push(<circle key={`${x}-${y}`} cx={x} cy={y} r={1.8} fill={accent} />);
  }
  if (shape === "stripes") {
    for (let i = -100; i < 100; i += 14) marks.push(<path key={i} d={`M${i} 100 L${i + 100} 0`} stroke={accent} strokeWidth={4} opacity={0.6} />);
  }
  if (shape === "grid") {
    for (let i = 10; i < 100; i += 10) {
      marks.push(<path key={`v${i}`} d={`M${i} 0 V100`} stroke={accent} strokeWidth={0.8} />);
      marks.push(<path key={`h${i}`} d={`M0 ${i} H100`} stroke={accent} strokeWidth={0.8} />);
    }
  }
  if (shape === "stars") {
    const at = [[16, 18], [80, 14], [86, 52], [12, 60], [30, 40], [72, 32], [50, 8]];
    at.forEach(([x, y], i) =>
      marks.push(
        <path
          key={i}
          transform={`translate(${x} ${y}) scale(${i % 2 ? 0.18 : 0.26})`}
          d="M0 -12 L3.5 -3.5 L12 0 L3.5 3.5 L0 12 L-3.5 3.5 L-12 0 L-3.5 -3.5 Z"
          fill={accent}
        />,
      ),
    );
  }
  if (shape === "rays") {
    for (let i = 0; i < 12; i += 2) {
      const a1 = (Math.PI * i) / 12, a2 = (Math.PI * (i + 1)) / 12;
      marks.push(
        <path
          key={i}
          d={`M50 100 L${50 - 140 * Math.cos(a1)} ${100 - 140 * Math.sin(a1)} L${50 - 140 * Math.cos(a2)} ${100 - 140 * Math.sin(a2)} Z`}
          fill={accent}
          opacity={0.35}
        />,
      );
    }
  }
  if (shape === "rainbow") {
    ["#ef4444", "#f97316", "#facc15", "#22c55e", "#3b82f6", "#8b5cf6"].forEach((c, i) =>
      marks.push(<path key={c} d={`M${-38 + i * 7} 100 A${88 - i * 7} ${88 - i * 7} 0 0 1 ${138 - i * 7} 100`} fill="none" stroke={c} strokeWidth={7} opacity={0.6} />),
    );
  }
  if (shape === "rings") {
    for (const r of [14, 26, 38, 50]) marks.push(<circle key={r} cx={50} cy={50} r={r} fill="none" stroke={accent} strokeWidth={5} opacity={0.5} />);
  }
  return (
    <g>
      <rect width={100} height={100} fill={color} />
      {marks}
    </g>
  );
}

function HairBack({ shape, color }: { shape: string; color: string }) {
  if (shape === "long") return <path d="M28 42 C28 22 40 16 50 16 C60 16 72 22 72 42 L75 82 Q50 88 25 82 Z" fill={color} />;
  if (shape === "curly")
    return (
      <g fill={color}>
        {[[30, 52], [70, 52], [28, 42], [72, 42]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r={7} />)}
      </g>
    );
  return null;
}

function HairFront({ shape, color }: { shape: string; color: string }) {
  switch (shape) {
    case "short":
      return <path d="M30 44 C28 24 40 17 51 17 C63 17 72 25 70 44 C67 35 60 30 52 29 C46 33 38 35 30 44 Z" fill={color} />;
    case "long":
      return <path d="M30 42 C30 24 40 18 50 18 C60 18 70 24 70 42 C64 32 56 28 50 28 C44 28 36 32 30 42 Z" fill={color} />;
    case "buzz":
      return <path d="M31.5 38 C33 24 43 20 50 20 C57 20 67 24 68.5 38 C62 31 38 31 31.5 38 Z" fill={color} opacity={0.85} />;
    case "bun":
      return (
        <g fill={color}>
          <circle cx={50} cy={15} r={8} />
          <path d="M30 42 C30 24 40 19 50 19 C60 19 70 24 70 42 C64 32 56 29 50 29 C44 29 36 32 30 42 Z" />
        </g>
      );
    case "spiky":
      return <path d="M30 42 L27 27 L36 30 L36 17 L44 24 L50 12 L56 24 L64 17 L64 30 L73 27 L70 42 C64 32 56 29 50 29 C44 29 36 32 30 42 Z" fill={color} />;
    case "curly":
      return (
        <g fill={color}>
          {[[33, 34, 7], [40, 25, 8], [50, 21, 8], [60, 25, 8], [67, 34, 7], [45, 30, 6], [55, 30, 6]].map(([x, y, r]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r={r} />
          ))}
        </g>
      );
    default:
      return null;
  }
}

function Top({ item, skin, clip }: { item: Item; skin: string; clip: string }) {
  const { shape, color, accent = SHADE } = item;
  const neckline = <path d="M42 73 Q50 83 58 73 Z" fill={skin} />;
  switch (shape) {
    case "hoodie":
      return (
        <g>
          <path d={TORSO} fill={color} />
          <path d="M33 77 Q50 94 67 77 Q59 72 50 72 Q41 72 33 77 Z" fill={accent} />
          <path d="M42 73 Q50 83 58 73 Z" fill={skin} />
          <path d="M46 84 V93 M54 84 V93" stroke="#fff" strokeWidth={1.4} strokeLinecap="round" />
        </g>
      );
    case "stripes":
      return (
        <g>
          <path d={TORSO} fill={color} />
          <g clipPath={`url(#${clip})`}>
            {[82, 90, 98].map((y) => <rect key={y} x={0} y={y} width={100} height={4} fill={accent} />)}
          </g>
          {neckline}
        </g>
      );
    case "vest":
      return (
        <g>
          <path d={TORSO} fill={accent} />
          {neckline}
          <path d="M10 100 C10 82 28 74 43 74 L47 100 Z M90 100 C90 82 72 74 57 74 L53 100 Z" fill={color} />
          <path d="M18 88 H32 M68 88 H82" stroke={SHADE} strokeWidth={2} />
        </g>
      );
    case "jacket":
      return (
        <g>
          <path d={TORSO} fill={color} />
          <path d="M43 74 L50 94 L57 74 Z" fill={accent} />
          <path d="M43 74 L50 94 L39 84 Z M57 74 L50 94 L61 84 Z" fill={SHADE} />
          <circle cx={50} cy={97} r={1.4} fill={SHADE} />
        </g>
      );
    case "turtleneck":
      return (
        <g>
          <path d={TORSO} fill={color} />
          <rect x={41} y={65} width={18} height={12} rx={4} fill={color} />
          <path d="M41 70 H59 M41 73 H59" stroke={SHADE} strokeWidth={1} />
        </g>
      );
    case "spacesuit":
      return (
        <g>
          <path d={TORSO} fill={color} />
          <ellipse cx={50} cy={75} rx={14} ry={4} fill="#94a3b8" />
          <rect x={56} y={84} width={14} height={9} rx={2} fill={accent} />
          <circle cx={36} cy={88} r={4} fill="#2563eb" />
        </g>
      );
    case "varsity":
      return (
        <g>
          <path d={TORSO} fill={color} />
          <path d="M10 100 C10 86 18 79 28 77 L32 100 Z M90 100 C90 86 82 79 72 77 L68 100 Z" fill="#f5f5f4" />
          <path d="M41 74 Q50 84 59 74" fill="none" stroke={accent} strokeWidth={3} />
          <text x={39} y={96} fontSize={11} fontWeight={800} fill={accent} fontFamily="ui-sans-serif, system-ui">P</text>
        </g>
      );
    default:
      return (
        <g>
          <path d={TORSO} fill={color} />
          {neckline}
        </g>
      );
  }
}

function Face({ item }: { item: Item }) {
  const { shape, color, accent = "rgba(255,255,255,0.4)" } = item;
  switch (shape) {
    case "round":
      return (
        <g fill="rgba(255,255,255,0.18)" stroke={color} strokeWidth={1.8}>
          <circle cx={43} cy={45} r={5.5} />
          <circle cx={57} cy={45} r={5.5} />
          <path d="M48.5 45 H51.5" fill="none" />
        </g>
      );
    case "square":
      return (
        <g fill="rgba(255,255,255,0.18)" stroke={color} strokeWidth={1.8}>
          <rect x={37} y={40.5} width={11} height={9} rx={2} />
          <rect x={52} y={40.5} width={11} height={9} rx={2} />
          <path d="M48 44 H52" fill="none" />
        </g>
      );
    case "shades":
      return (
        <g>
          <rect x={36} y={40} width={12.5} height={9} rx={3.5} fill={color} />
          <rect x={51.5} y={40} width={12.5} height={9} rx={3.5} fill={color} />
          <path d="M48.5 43 H51.5" stroke={color} strokeWidth={1.8} />
          <path d="M38.5 42.5 L41.5 42.5 M54 42.5 L57 42.5" stroke="rgba(255,255,255,0.6)" strokeWidth={1.2} strokeLinecap="round" />
        </g>
      );
    case "goggles":
      return (
        <g>
          <path d="M31 45 H35 M65 45 H69" stroke={color} strokeWidth={2.5} />
          <rect x={35} y={39} width={30} height={12} rx={6} fill={accent} fillOpacity={0.55} stroke={color} strokeWidth={2.5} />
        </g>
      );
    default:
      return null;
  }
}

function Hat({ item }: { item: Item }) {
  const { shape, color, accent = SHADE } = item;
  switch (shape) {
    case "beanie":
      return (
        <g>
          <path d="M29 36 C29 14 71 14 71 36 Z" fill={color} />
          <rect x={28} y={31} width={44} height={8} rx={4} fill={accent} />
          <circle cx={50} cy={13} r={4.5} fill={accent} />
        </g>
      );
    case "cap":
      return (
        <g>
          <path d="M48 32 Q72 30 85 36 Q70 40 48 36 Z" fill={accent} />
          <path d="M30 34 C30 16 70 16 70 34 Z" fill={color} />
          <circle cx={50} cy={17} r={2} fill={accent} />
        </g>
      );
    case "beret":
      return (
        <g>
          <rect x={47} y={11} width={3} height={6} rx={1.5} fill={color} />
          <ellipse cx={46} cy={24} rx={25} ry={9} fill={color} transform="rotate(-8 46 24)" />
        </g>
      );
    case "gradcap":
      return (
        <g>
          <path d="M35 24 L35 33 Q50 39 65 33 L65 24 Z" fill={color} />
          <path d="M19 22 L50 11 L81 22 L50 32 Z" fill={color} />
          <path d="M19 22 L50 11 L81 22 L50 32 Z" fill="rgba(255,255,255,0.12)" />
          <path d="M50 21 L73 26 L73 37" fill="none" stroke={accent} strokeWidth={1.6} />
          <circle cx={73} cy={38} r={2.5} fill={accent} />
        </g>
      );
    case "explorer":
      return (
        <g>
          <ellipse cx={50} cy={32} rx={33} ry={6.5} fill={color} />
          <path d="M31 32 C31 13 69 13 69 32 Z" fill={color} />
          <rect x={31} y={26} width={38} height={5} fill={accent} />
        </g>
      );
    case "hardhat":
      return (
        <g>
          <path d="M28 33 C28 12 72 12 72 33 Z" fill={color} />
          <rect x={46} y={13} width={8} height={20} rx={3} fill="rgba(255,255,255,0.35)" />
          <rect x={22} y={31} width={56} height={6} rx={3} fill={accent} />
        </g>
      );
    case "fedora":
      return (
        <g>
          <ellipse cx={50} cy={31} rx={32} ry={5.5} fill={color} />
          <path d="M33 31 L36 15 Q50 9 64 15 L67 31 Z" fill={color} />
          <rect x={34} y={24} width={32} height={5} fill={accent} />
          <path d="M44 13 Q50 18 56 13" fill="none" stroke={SHADE} strokeWidth={1.5} />
        </g>
      );
    case "crown":
      return (
        <g>
          <path d="M30 31 L30 12 L40 21 L50 7 L60 21 L70 12 L70 31 Z" fill={color} />
          <rect x={30} y={26} width={40} height={6} fill="rgba(0,0,0,0.12)" />
          {[38, 50, 62].map((x) => <circle key={x} cx={x} cy={29} r={2} fill={accent} />)}
        </g>
      );
    case "headphones":
      return (
        <g>
          <path d="M27 46 C27 10 73 10 73 46" fill="none" stroke={color} strokeWidth={4.5} strokeLinecap="round" />
          <rect x={22} y={38} width={10} height={17} rx={4} fill={color} />
          <rect x={68} y={38} width={10} height={17} rx={4} fill={color} />
          <rect x={25} y={41} width={4} height={11} rx={2} fill={accent} />
          <rect x={71} y={41} width={4} height={11} rx={2} fill={accent} />
        </g>
      );
    case "helmet":
      return (
        <g>
          <circle cx={50} cy={44} r={31} fill="rgba(186,230,253,0.25)" stroke={color} strokeWidth={4.5} />
          <path d="M29 38 Q32 24 46 18" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth={3} strokeLinecap="round" />
        </g>
      );
    case "halo":
      return (
        <g>
          <ellipse cx={50} cy={11} rx={17} ry={4.5} fill="none" stroke={color} strokeWidth={6} opacity={0.3} />
          <ellipse cx={50} cy={11} rx={17} ry={4.5} fill="none" stroke={color} strokeWidth={2.5} />
        </g>
      );
    case "wizard":
      return (
        <g>
          <ellipse cx={50} cy={29} rx={30} ry={5} fill={color} />
          <path d="M31 29 L55 1 L69 29 Z" fill={color} />
          <path d="M33 25 H67" stroke={accent} strokeWidth={3} />
          <circle cx={52} cy={14} r={1.8} fill={accent} />
          <circle cx={58} cy={21} r={1.3} fill={accent} />
        </g>
      );
    case "cone":
      return (
        <g>
          <path d="M36 30 L50 3 L64 30 Z" fill={color} />
          <path d="M40 22 L60 22 M44 14 L56 14" stroke={accent} strokeWidth={2.5} />
          <circle cx={50} cy={4} r={3.5} fill={accent} />
        </g>
      );
    default:
      return null;
  }
}

function Mouth({ expression }: { expression: string }) {
  if (expression === "grin") return <path d="M44 52 Q50 61 56 52 Z" fill={INK} />;
  if (expression === "calm") return <path d="M46 54 H54" stroke={INK} strokeWidth={1.8} strokeLinecap="round" />;
  return <path d="M45 53 Q50 57.5 55 53" fill="none" stroke={INK} strokeWidth={1.8} strokeLinecap="round" />;
}

/** Flat vector avatar, used when 3D rendering is unavailable. */
export function AvatarFlat({ look, size = 96, className = "", title }: { look: AvatarLook; size?: number; className?: string; title?: string }) {
  const uid = useId().replace(/:/g, "");
  const circle = `av-${uid}`;
  const torso = `avt-${uid}`;
  const hair = get(look.hair, defaultLook.hair)!;
  const top = get(look.top, defaultLook.top)!;
  const bg = get(look.bg, defaultLook.bg)!;
  const hat = get(look.hat, null);
  const face = get(look.face, null);
  // Big hats sit over the hair; tall hair would poke through them.
  const hairShape = hat && hat.shape !== "headphones" && hat.shape !== "helmet" && hair.shape !== "long" ? "buzz" : hair.shape;

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} role="img" aria-label={title ?? "Your avatar"}>
      <defs>
        <clipPath id={circle}>
          <circle cx={50} cy={50} r={50} />
        </clipPath>
        <clipPath id={torso}>
          <path d={TORSO} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${circle})`}>
        <Background item={bg} />
        <HairBack shape={hair.shape} color={look.hairColor} />
        <rect x={43} y={58} width={14} height={20} rx={4} fill={look.skin} />
        <Top item={top} skin={look.skin} clip={torso} />
        <circle cx={31} cy={46} r={4} fill={look.skin} />
        <circle cx={69} cy={46} r={4} fill={look.skin} />
        <ellipse cx={50} cy={42} rx={19} ry={21} fill={look.skin} />
        <HairFront shape={hairShape} color={look.hairColor} />
        <circle cx={43} cy={45} r={2.2} fill={INK} />
        <circle cx={57} cy={45} r={2.2} fill={INK} />
        <circle cx={38.5} cy={51} r={3} fill="#f472b6" opacity={0.25} />
        <circle cx={61.5} cy={51} r={3} fill="#f472b6" opacity={0.25} />
        <Mouth expression={look.expression} />
        {face && <Face item={face} />}
        {hat && <Hat item={hat} />}
      </g>
    </svg>
  );
}

type Lib = typeof import("@/lib/avatar3d");
/** "portrait" crops to head and shoulders; "full" shows the whole body. */
export type Framing = "portrait" | "full";
let lib: Promise<Lib> | null = null;
const load3d = () => (lib ??= import("@/lib/avatar3d"));
let canUse3d: boolean | null = null;

// Renders run a few per frame so a page full of tiles never freezes scrolling.
const queue: (() => void)[] = [];
let pumping = false;
function pump() {
  const start = performance.now();
  while (queue.length && performance.now() - start < 12) queue.shift()!();
  if (queue.length) requestAnimationFrame(pump);
  else pumping = false;
}
function enqueue(job: () => void) {
  queue.push(job);
  if (!pumping) {
    pumping = true;
    requestAnimationFrame(pump);
  }
}

const BUCKETS = [64, 96, 128, 192, 256, 384];
const pixels = (size: number) => BUCKETS.find((b) => b >= size * 2) ?? 384;

function useAvatarImage(look: AvatarLook, size: number, framing: Framing): string | null | "flat" {
  const [img, setImg] = useState<string | null | "flat">(null);
  const key = JSON.stringify(look);
  useEffect(() => {
    let live = true;
    load3d()
      .then((m) => {
        canUse3d ??= m.webglAvailable();
        if (!canUse3d) return live && setImg("flat");
        enqueue(() => {
          if (!live) return;
          try {
            setImg(m.renderAvatarImage(JSON.parse(key), pixels(size), framing));
          } catch {
            setImg("flat");
          }
        });
      })
      .catch(() => live && setImg("flat"));
    return () => {
      live = false;
    };
  }, [key, size, framing]);
  return img;
}

/** The learner's 3D avatar as a still image. Falls back to the flat version without WebGL. */
export function Avatar({
  look,
  size = 96,
  className = "",
  title,
  framing = "portrait",
}: {
  look: AvatarLook;
  size?: number;
  className?: string;
  title?: string;
  framing?: Framing;
}) {
  const img = useAvatarImage(look, size, framing);
  if (img === "flat") return <AvatarFlat look={look} size={size} className={className} title={title} />;
  if (!img) {
    const bg = get(look.bg, defaultLook.bg)!;
    return <span className={`inline-block rounded-full align-middle ${className}`} style={{ width: size, height: size, background: bg.color }} aria-hidden />;
  }
  // A generated data URL, so next/image adds nothing here.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={img} width={size} height={size} alt={title ?? "Your avatar"} className={`inline-block rounded-full align-middle ${className}`} draggable={false} />;
}

/** A live 3D avatar you can drag to spin. */
export function AvatarViewer({ look, size = 200, className = "" }: { look: AvatarLook; size?: number; className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const back = useRef<HTMLCanvasElement>(null);
  const [flat, setFlat] = useState(false);
  // Set once the scene is running; swaps the model when the look changes.
  const show = useRef<((look: AvatarLook) => void) | null>(null);
  const latest = useRef(look);
  latest.current = look;
  const key = JSON.stringify(look);

  useEffect(() => {
    let stop = false;
    let cleanup = () => {};
    load3d()
      .then((m) => {
        if (stop || !canvas.current || !back.current) return;
        if (!m.webglAvailable()) return setFlat(true);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const px = Math.round(size * dpr);
        const bctx = back.current.getContext("2d")!;
        back.current.width = back.current.height = px;

        const renderer = m.createRenderer(canvas.current);
        renderer.setPixelRatio(dpr);
        renderer.setSize(size, size, false);
        const { scene, camera } = m.createScene("full");
        let avatar = m.buildAvatar(latest.current);
        scene.add(avatar);
        m.drawBackdrop(bctx, get(latest.current.bg, defaultLook.bg), px);
        show.current = (next) => {
          scene.remove(avatar);
          m.disposeGroup(avatar);
          avatar = m.buildAvatar(next);
          scene.add(avatar);
          bctx.clearRect(0, 0, px, px);
          m.drawBackdrop(bctx, get(next.bg, defaultLook.bg), px);
        };

        // Drag to spin; when idle, it sways gently near the front.
        let yaw = -0.18, velocity = 0, dragging = false, lastX = 0, idle = 0;
        const el = canvas.current;
        const down = (e: PointerEvent) => {
          dragging = true;
          lastX = e.clientX;
          el.setPointerCapture(e.pointerId);
        };
        const move = (e: PointerEvent) => {
          if (!dragging) return;
          velocity = (e.clientX - lastX) * 0.012;
          lastX = e.clientX;
          yaw += velocity;
          idle = 0;
        };
        const up = () => (dragging = false);
        el.addEventListener("pointerdown", down);
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerup", up);
        el.addEventListener("pointercancel", up);

        let frame = 0;
        const t0 = performance.now();
        const tick = () => {
          const t = (performance.now() - t0) / 1000;
          if (!dragging) {
            velocity *= 0.92;
            yaw += velocity;
            idle += 1 / 60;
            if (idle > 1.5) {
              const target = -0.18 + Math.sin(t * 0.8) * 0.22;
              const wrapped = yaw - Math.round((yaw - target) / (Math.PI * 2)) * Math.PI * 2;
              yaw = wrapped + (target - wrapped) * 0.04;
            }
          }
          avatar.rotation.y = yaw;
          avatar.position.y = Math.sin(t * 1.6) * 0.03;
          renderer.render(scene, camera);
          frame = requestAnimationFrame(tick);
        };
        tick();
        cleanup = () => {
          cancelAnimationFrame(frame);
          show.current = null;
          el.removeEventListener("pointerdown", down);
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerup", up);
          el.removeEventListener("pointercancel", up);
          m.disposeGroup(avatar);
          renderer.dispose();
          renderer.forceContextLoss();
        };
      })
      .catch(() => setFlat(true));
    return () => {
      stop = true;
      cleanup();
    };
  }, [size]);

  useEffect(() => {
    show.current?.(JSON.parse(key));
  }, [key]);

  if (flat) return <AvatarFlat look={look} size={size} className={className} />;
  return (
    <div className={`relative overflow-hidden rounded-full ${className}`} style={{ width: size, height: size }}>
      <canvas ref={back} className="absolute inset-0 h-full w-full" aria-hidden />
      <canvas
        ref={canvas}
        className="absolute inset-0 h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
        role="img"
        aria-label="Your avatar. Drag to spin it."
      />
    </div>
  );
}

/** A small avatar wearing one item, used for item tiles and reward chips. */
export function ItemPreview({
  look,
  item,
  size = 64,
  locked = false,
  framing = "portrait",
}: {
  look: AvatarLook;
  item: Item;
  size?: number;
  locked?: boolean;
  framing?: Framing;
}) {
  return (
    <span className={`relative inline-block ${locked ? "opacity-50 grayscale" : ""}`}>
      <Avatar look={withItem(look, item)} size={size} title={item.name} framing={framing} />
      {locked && (
        <span className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white">
          <Icon name="lock" className="h-3 w-3" />
        </span>
      )}
    </span>
  );
}
