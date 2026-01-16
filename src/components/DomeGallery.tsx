// DomeGallery.tsx
import { useEffect, useMemo, useRef, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';

// --- Interface Completa ---
export interface GalleryItem {
  id: number | string;
  src: any;
  alt: string;
  title: string;
  description?: string;
}

type DomeGalleryProps = {
  images: GalleryItem[];
  fit?: number;
  fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
};

type ItemDef = GalleryItem & {
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
};

const DEFAULTS = {
  maxVerticalRotationDeg: 15,
  dragSensitivity: 20,
  enlargeTransitionMs: 500,
  segments: 30,
  openedImageWidth: '90vw', // Padrão mais largo
  openedImageHeight: '90vh', // Padrão mais alto
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};
const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {
  const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
  const n = attr == null ? NaN : parseFloat(attr);
  return Number.isFinite(n) ? n : fallback;
};

function buildItems(pool: GalleryItem[], seg: number): ItemDef[] {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) return [];

  const normalizedImages = pool.map(item => ({
    ...item,
    src: typeof item.src === 'string' ? item.src : item.src.src
  }));

  const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length]);

  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
          const tmp = usedImages[i];
          usedImages[i] = usedImages[j];
          usedImages[j] = tmp;
          break;
        }
      }
    }
  }

  return coords.map((c, i) => ({
    ...c,
    ...usedImages[i]
  }));
}

function computeItemBaseRotation(offsetX: number, offsetY: number, sizeX: number, sizeY: number, segments: number) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

export default function DomeGallery({
  images = [],
  fit = 0.5,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#09090b',
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  imageBorderRadius = '12px',
  openedImageBorderRadius = '16px',
  grayscale = true
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const focusedElRef = useRef<HTMLElement | null>(null);
  
  // Refs para elementos do modal que agora ficam no body
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const cancelTapRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const pointerTypeRef = useRef<'mouse' | 'pen' | 'touch'>('mouse');
  const tapTargetRef = useRef<HTMLElement | null>(null);
  const openingRef = useRef(false);
  const openStartedAtRef = useRef(0);
  const lastDragEndAt = useRef(0);

  const scrollLockedRef = useRef(false);
  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    document.body.style.overflow = 'hidden';
  }, []);
  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    if (openingRef.current) return;
    scrollLockedRef.current = false;
    document.body.style.overflow = '';
  }, []);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = (xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  };

  const lockedRadiusRef = useRef<number | null>(null);

  // --- Resize Observer & Layout Setup ---
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width),
        h = Math.max(1, cr.height);
      const minDim = Math.min(w, h),
        maxDim = Math.max(w, h),
        aspect = w / h;
      let basis: number;
      switch (fitBasis) {
        case 'min': basis = minDim; break;
        case 'max': basis = maxDim; break;
        case 'width': basis = w; break;
        case 'height': basis = h; break;
        default: basis = aspect >= 1.3 ? w : minDim;
      }
      let radius = basis * fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);
      lockedRadiusRef.current = Math.round(radius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty('--radius', `${lockedRadiusRef.current}px`);
      root.style.setProperty('--viewer-pad', `${viewerPad}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [fit, fitBasis, minRadius, maxRadius, padFactor, overlayBlurColor, grayscale, imageBorderRadius, openedImageBorderRadius]);

  // --- Inertia & Drag Logic ---
  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback((vx: number, vy: number) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);
      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    }, [dragDampening, maxVerticalRotationDeg, stopInertia]);

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return;
        stopInertia();
        const evt = event as PointerEvent;
        pointerTypeRef.current = (evt.pointerType as any) || 'mouse';
        if (pointerTypeRef.current === 'touch') evt.preventDefault();
        if (pointerTypeRef.current === 'touch') lockScroll();
        draggingRef.current = true;
        cancelTapRef.current = false;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: evt.clientX, y: evt.clientY };
        const potential = (evt.target as Element).closest?.('.item__image') as HTMLElement | null;
        tapTargetRef.current = potential || null;
      },
      onDrag: ({ event, last, velocity: velArr = [0, 0], direction: dirArr = [0, 0], movement }) => {
        if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;
        const evt = event as PointerEvent;
        if (pointerTypeRef.current === 'touch') evt.preventDefault();

        const dxTotal = evt.clientX - startPosRef.current.x;
        const dyTotal = evt.clientY - startPosRef.current.y;
        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > 16) movedRef.current = true;
        }
        const nextX = clamp(startRotRef.current.x - dyTotal / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg);
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity;
        if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }
        if (last) {
          draggingRef.current = false;
          let isTap = false;
          if (startPosRef.current) {
            const dx = evt.clientX - startPosRef.current.x;
            const dy = evt.clientY - startPosRef.current.y;
            const dist2 = dx * dx + dy * dy;
            const TAP_THRESH_PX = pointerTypeRef.current === 'touch' ? 10 : 6;
            if (dist2 <= TAP_THRESH_PX * TAP_THRESH_PX) isTap = true;
          }
          let [vMagX, vMagY] = velArr;
          const [dirX, dirY] = dirArr;
          let vx = vMagX * dirX;
          let vy = vMagY * dirY;
          if (!isTap && Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
            const [mx, my] = movement;
            vx = (mx / dragSensitivity) * 0.02;
            vy = (my / dragSensitivity) * 0.02;
          }
          if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) {
            startInertia(vx, vy);
          }
          startPosRef.current = null;
          cancelTapRef.current = !isTap;
          if (isTap && tapTargetRef.current && !focusedElRef.current) {
            openItemFromElement(tapTargetRef.current);
          }
          tapTargetRef.current = null;
          if (cancelTapRef.current) setTimeout(() => (cancelTapRef.current = false), 120);
          if (pointerTypeRef.current === 'touch') unlockScroll();
          if (movedRef.current) lastDragEndAt.current = performance.now();
          movedRef.current = false;
        }
      }
    },
    { target: mainRef, eventOptions: { passive: false } }
  );

  // --- Close Animation Logic ---
  const closeItem = useCallback(() => {
    if (performance.now() - openStartedAtRef.current < 250) return;
    const el = focusedElRef.current;
    const overlay = overlayRef.current;
    const scrim = scrimRef.current;
    
    if (!el || !overlay || !scrim) {
        openingRef.current = false;
        unlockScroll();
        return;
    }

    const parent = el.parentElement as HTMLElement;
    const refDiv = parent.querySelector('.item__image--reference') as HTMLElement | null;

    // Ocultar conteúdo de texto suavemente
    const content = overlay.querySelector('.enlarge-content') as HTMLElement;
    if (content) content.style.opacity = '0';

    // Calcular posição de destino (onde o card original está agora)
    let targetRect = el.getBoundingClientRect();
    if (refDiv) {
        targetRect = refDiv.getBoundingClientRect();
    }

    // Animar o overlay de volta para a posição do card
    overlay.style.transition = `all ${enlargeTransitionMs}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    overlay.style.width = `${targetRect.width}px`;
    overlay.style.height = `${targetRect.height}px`;
    overlay.style.top = `${targetRect.top}px`;
    overlay.style.left = `${targetRect.left}px`;
    overlay.style.transform = 'none';
    overlay.style.borderRadius = imageBorderRadius;
    
    // Desaparecer o scrim
    scrim.style.opacity = '0';

    const cleanup = () => {
        if (document.body.contains(overlay)) document.body.removeChild(overlay);
        if (document.body.contains(scrim)) document.body.removeChild(scrim);
        overlayRef.current = null;
        scrimRef.current = null;

        if (refDiv) refDiv.remove();
        
        // Restaurar o card original
        parent.style.setProperty('--rot-y-delta', `0deg`);
        parent.style.setProperty('--rot-x-delta', `0deg`);
        el.style.visibility = '';
        el.style.opacity = '1';
        
        focusedElRef.current = null;
        openingRef.current = false;
        unlockScroll();
    };

    overlay.addEventListener('transitionend', cleanup, { once: true });

  }, [enlargeTransitionMs, imageBorderRadius, unlockScroll]);


  // --- OPEN IMAGE LOGIC (COM CÁLCULO AUTOMÁTICO DE PROPORÇÃO) ---
  const openItemFromElement = (el: HTMLElement) => {
    if (openingRef.current) return;
    openingRef.current = true;
    openStartedAtRef.current = performance.now();
    lockScroll();

    const parent = el.parentElement as HTMLElement;
    focusedElRef.current = el;

    // 1. CÁLCULO DO TAMANHO FINAL AUTOMÁTICO
    const clickedImg = el.querySelector('img');
    let finalWidth = '90vw';  // Valor padrão de segurança
    let finalHeight = '85vh'; // Valor padrão de segurança

    if (clickedImg) {
        const naturalW = clickedImg.naturalWidth || 1000;
        const naturalH = clickedImg.naturalHeight || 1000;
        const aspect = naturalW / naturalH;

        // Limites máximos da tela (margem de segurança)
        const maxW = window.innerWidth * 0.90; // Máximo 90% da largura da tela
        const maxH = window.innerHeight * 0.85; // Máximo 85% da altura da tela

        // Tenta encaixar pela largura primeiro
        let w = maxW;
        let h = w / aspect;

        // Se a altura calculada estourar o limite da tela, recalcula baseando-se na altura
        if (h > maxH) {
            h = maxH;
            w = h * aspect;
        }

        finalWidth = `${w}px`;
        finalHeight = `${h}px`;
    }

    // Calcular rotação para trazer o item para frente (Mantido igual)
    const offsetX = getDataNumber(parent, 'offsetX', 0);
    const offsetY = getDataNumber(parent, 'offsetY', 0);
    const sizeX = getDataNumber(parent, 'sizeX', 2);
    const sizeY = getDataNumber(parent, 'sizeY', 2);
    const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);
    const parentY = normalizeAngle(parentRot.rotateY);
    const globalY = normalizeAngle(rotationRef.current.y);
    let rotY = -(parentY + globalY) % 360;
    if (rotY < -180) rotY += 360;
    const rotX = -parentRot.rotateX - rotationRef.current.x;
    parent.style.setProperty('--rot-y-delta', `${rotY}deg`);
    parent.style.setProperty('--rot-x-delta', `${rotX}deg`);

    const refDiv = document.createElement('div');
    refDiv.className = 'item__image item__image--reference opacity-0';
    refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
    parent.appendChild(refDiv);

    const tileRect = el.getBoundingClientRect();
    el.style.visibility = 'hidden';

    // --- CRIAR OS ELEMENTOS DO MODAL ---
    
    // Scrim
    const scrim = document.createElement('div');
    scrim.style.cssText = `
        position: fixed; inset: 0; z-index: 9998;
        background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px);
        opacity: 0; transition: opacity ${enlargeTransitionMs}ms ease;
    `;
    scrim.onclick = closeItem;
    document.body.appendChild(scrim);
    scrimRef.current = scrim;
    
    void scrim.offsetWidth;
    scrim.style.opacity = '1';

    // Overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; z-index: 9999;
        top: ${tileRect.top}px; left: ${tileRect.left}px;
        width: ${tileRect.width}px; height: ${tileRect.height}px;
        transform-origin: center center;
        transition: all ${enlargeTransitionMs}ms cubic-bezier(0.2, 0, 0.2, 1);
        border-radius: ${imageBorderRadius};
        overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
        background: #09090b;
    `;
    overlayRef.current = overlay;

    // Botão Fechar
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
    closeBtn.style.cssText = `
        position: absolute; top: 1rem; right: 1rem; z-index: 10;
        color: white; opacity: 0; transition: opacity 300ms ease 200ms;
        background: rgba(0,0,0,0.5); border-radius: 50%; padding: 0.5rem; border: none; cursor: pointer;
    `;
    closeBtn.onclick = (e) => { e.stopPropagation(); closeItem(); };
    overlay.appendChild(closeBtn);

    // Imagem
    const img = document.createElement('img');
    img.src = parent.dataset.src || '';
    img.alt = parent.dataset.alt || '';
    img.style.cssText = `width:100%; height:100%; object-fit:cover; filter:none; display: block;`; 
    overlay.appendChild(img);

    // Conteúdo Texto
    const title = parent.dataset.title || 'Untitled';
    const description = parent.dataset.description || '';
    const prompt = parent.dataset.prompt || '';

    const textContainer = document.createElement('div');
    textContainer.className = 'enlarge-content';
    textContainer.style.cssText = `
        position: absolute; bottom: 0; left: 0; width: 100%;
        background: linear-gradient(to top, #09090b 10%, rgba(9, 9, 11, 0.9) 40%, transparent 100%);
        padding: 2.5rem 2rem 1.5rem 2rem; color: white;
        opacity: 0; transition: opacity 500ms ease 200ms;
        display: flex; flex-direction: column; gap: 0.5rem;
    `;

    // (Aqui mantive as suas customizações de tamanho de fonte e remoção de ID)
    textContainer.innerHTML = `
        <div style="width: 40px; height: 4px; background: #6366f1; border-radius: 999px; margin-bottom: 0.5rem;"></div>
        <h2 style="font-size: 1.5rem; font-weight: 700; line-height: 1.2; margin: 0;">${title}</h2>
        ${description ? `<p style="font-size: 0.9rem; color: #d4d4d8; line-height: 1.5; max-width: 650px; margin: 0;">${description}</p>` : ''}
        ${prompt ? `
            <div style="margin-top: 1rem; background: rgba(39, 39, 42, 0.6); border: 1px solid rgba(63, 63, 70, 0.5); border-radius: 0.5rem; padding: 0.75rem; max-height: 120px; overflow-y: auto;">
                <p style="font-size: 0.7rem; color: #818cf8; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.25rem; position: sticky; top: 0;">Prompt</p>
                <p style="font-size: 0.8rem; color: #a1a1aa; font-family: monospace; line-height: 1.4;">${prompt}</p>
            </div>
        ` : ''}
        
    `;
    overlay.appendChild(textContainer);
    document.body.appendChild(overlay);

    // --- INICIAR ANIMAÇÃO USANDO AS MEDIDAS CALCULADAS ---
    void overlay.offsetWidth;

    // AQUI USAMOS AS VARIÁVEIS CALCULADAS (finalWidth / finalHeight)
    overlay.style.width = finalWidth;
    overlay.style.height = finalHeight;
    overlay.style.top = '50%';
    overlay.style.left = '50%';
    overlay.style.transform = 'translate(-50%, -50%)';
    overlay.style.borderRadius = openedImageBorderRadius;

    overlay.addEventListener('transitionend', () => {
        textContainer.style.opacity = '1';
        closeBtn.style.opacity = '1';
    }, { once: true });
  };

  // --- Event Listeners Globais ---
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeItem(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      unlockScroll(); // Garantir que o scroll seja liberado ao desmontar
      // Limpeza de emergência caso o componente desmonte com o modal aberto
      if (overlayRef.current && document.body.contains(overlayRef.current)) {
          document.body.removeChild(overlayRef.current);
      }
      if (scrimRef.current && document.body.contains(scrimRef.current)) {
          document.body.removeChild(scrimRef.current);
      }
    };
  }, [closeItem, unlockScroll]);

  // --- Styles CSS Injetados ---
  const cssStyles = `
    .sphere-root {
      --radius: 520px; --viewer-pad: 32px;
      --circ: calc(var(--radius) * 3.14);
      --rot-y: calc((360deg / var(--segments-x)) / 2);
      --rot-x: calc((360deg / var(--segments-y)) / 2);
      --item-width: calc(var(--circ) / var(--segments-x));
      --item-height: calc(var(--circ) / var(--segments-y));
    }
    .sphere-root * { box-sizing: border-box; }
    .sphere, .sphere-item, .item__image { transform-style: preserve-3d; }
    .stage {
      width: 100%; height: 100%;
      display: grid; place-items: center;
      position: absolute; inset: 0; margin: auto;
      perspective: calc(var(--radius) * 2); perspective-origin: 50% 50%;
    }
    .sphere {
      transform: translateZ(calc(var(--radius) * -1));
      will-change: transform; position: absolute;
    }
    .sphere-item {
      width: calc(var(--item-width) * var(--item-size-x));
      height: calc(var(--item-height) * var(--item-size-y));
      position: absolute; top: -999px; bottom: -999px; left: -999px; right: -999px;
      margin: auto; transform-origin: 50% 50%; backface-visibility: hidden;
      transition: transform 300ms;
      transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) 
                 rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) 
                 translateZ(var(--radius));
    }
    .item__image {
      position: absolute; inset: 10px;
      border-radius: var(--tile-radius, 12px);
      overflow: hidden; cursor: pointer;
      backface-visibility: hidden; -webkit-backface-visibility: hidden;
      transition: transform 300ms, filter 300ms, border-color 300ms; 
      pointer-events: auto; transform: translateZ(0);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border: 1px solid transparent;
    }
    .item__image:hover {
        border-color: rgba(255,255,255,0.3);
        transform: translateZ(20px) scale(1.05);
    }
    .item__image--reference {
      position: absolute; inset: 10px; pointer-events: none; opacity: 0;
    }
    .enlarge-content p::-webkit-scrollbar, .enlarge-content div::-webkit-scrollbar {
        width: 4px;
    }
    .enlarge-content p::-webkit-scrollbar-track, .enlarge-content div::-webkit-scrollbar-track {
        background: transparent;
    }
    .enlarge-content p::-webkit-scrollbar-thumb, .enlarge-content div::-webkit-scrollbar-thumb {
        background: #52525b; border-radius: 4px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      <div
        ref={rootRef}
        className="sphere-root relative w-full h-full"
        style={{
            ['--segments-x' as any]: segments,
            ['--segments-y' as any]: segments,
            ['--overlay-blur-color' as any]: overlayBlurColor,
            ['--tile-radius' as any]: imageBorderRadius,
            ['--enlarge-radius' as any]: openedImageBorderRadius,
            ['--image-filter' as any]: grayscale ? 'grayscale(1)' : 'none'
        } as React.CSSProperties}
      >
        <main
          ref={mainRef}
          className="absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent"
          style={{ touchAction: 'none', WebkitUserSelect: 'none' }}
        >
          <div className="stage">
            <div ref={sphereRef} className="sphere">
              {items.map((it, i) => (
                <div
                  key={`${it.id}-${i}`}
                  className="sphere-item absolute m-auto"
                  data-src={it.src}
                  data-alt={it.alt}
                  data-title={it.title}
                  data-description={it.description}
                  data-id={it.id}
                  data-offset-x={it.x}
                  data-offset-y={it.y}
                  data-size-x={it.sizeX}
                  data-size-y={it.sizeY}
                  style={{
                      ['--offset-x' as any]: it.x,
                      ['--offset-y' as any]: it.y,
                      ['--item-size-x' as any]: it.sizeX,
                      ['--item-size-y' as any]: it.sizeY,
                      top: '-999px', bottom: '-999px', left: '-999px', right: '-999px'
                  } as React.CSSProperties}
                >
                  <div
                    className="item__image absolute block overflow-hidden cursor-pointer bg-zinc-900"
                    onClick={e => {
                      if (draggingRef.current || movedRef.current || performance.now() - lastDragEndAt.current < 80 || openingRef.current) return;
                      openItemFromElement(e.currentTarget as HTMLElement);
                    }}
                    onPointerUp={e => {
                       if ((e.nativeEvent as PointerEvent).pointerType !== 'touch') return;
                       if (draggingRef.current || movedRef.current || performance.now() - lastDragEndAt.current < 80 || openingRef.current) return;
                       openItemFromElement(e.currentTarget as HTMLElement);
                    }}
                    style={{
                      inset: '10px',
                      borderRadius: `var(--tile-radius, ${imageBorderRadius})`,
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <img
                      src={it.src}
                      draggable={false}
                      alt={it.alt}
                      className="w-full h-full object-cover pointer-events-none transition-all duration-300"
                      style={{
                        backfaceVisibility: 'hidden',
                        filter: `var(--image-filter, ${grayscale ? 'grayscale(1)' : 'none'}) brightness(0.85)`
                      }}
                    />
                    {/* Efeito de Hover: Título e Brilho */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <h3 className="text-white font-bold text-lg translate-y-2 hover:translate-y-0 transition-transform duration-300">{it.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Camadas de Fundo/Blur */}
          <div className="absolute inset-0 m-auto z-[3] pointer-events-none"
            style={{ backgroundImage: `radial-gradient(rgba(0,0,0,0) 50%, var(--overlay-blur-color, ${overlayBlurColor}) 100%)` }} />
          <div className="absolute inset-0 m-auto z-[3] pointer-events-none"
            style={{ backdropFilter: 'blur(4px)', maskImage: `radial-gradient(rgba(0,0,0,0) 40%, black 80%)` }} />
        </main>
      </div>
    </>
  );
}