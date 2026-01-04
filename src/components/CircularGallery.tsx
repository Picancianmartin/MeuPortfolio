import React, { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Program, Mesh, Texture, Vec2 } from 'ogl';

interface CircularGalleryProps {
  items: Array<{ image: string; text: string }>;
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollEase?: number;
  font?: string;
}

// Utility functions
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

function autoBind(instance: any) {
  const proto = Object.getPrototypeOf(instance);
  const propertyNames = Object.getOwnPropertyNames(proto);
  propertyNames.forEach((name) => {
    const descriptor = Object.getOwnPropertyDescriptor(proto, name);
    if (descriptor && typeof descriptor.value === 'function' && name !== 'constructor') {
      instance[name] = instance[name].bind(instance);
    }
  });
}

function getFontSize(font: string): number {
  const match = font.match(/(\d+)px/);
  return match ? parseInt(match[1]) : 30;
}

function createTextTexture(text: string, font: string, color: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const fontSize = getFontSize(font);
  
  canvas.width = 512;
  canvas.height = 128;
  
  ctx.fillStyle = 'transparent';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  
  return canvas;
}

// Title class for text rendering
class Title {
  private gl: any;
  private scene: Transform;
  private text: string;
  private font: string;
  private color: string;
  public mesh: Mesh;
  private geometry: any;
  private program: Program;
  private texture: Texture;

  constructor(gl: any, scene: Transform, text: string, font: string, color: string) {
    this.gl = gl;
    this.scene = scene;
    this.text = text;
    this.font = font;
    this.color = color;

    this.createTexture();
    this.createMesh();
  }

  createTexture() {
    const canvas = createTextTexture(this.text, this.font, this.color);
    this.texture = new Texture(this.gl, {
      generateMipmaps: false,
    });
    this.texture.image = canvas;
  }

  createMesh() {
    const aspect = 4;
    
    this.geometry = {
      position: { size: 3, data: new Float32Array([
        -aspect, -1, 0,
        aspect, -1, 0,
        -aspect, 1, 0,
        aspect, 1, 0,
      ])},
      uv: { size: 2, data: new Float32Array([
        0, 1,
        1, 1,
        0, 0,
        1, 0,
      ])},
      index: { data: new Uint16Array([0, 1, 2, 1, 3, 2]) },
    };

    this.program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 texColor = texture2D(tMap, vUv);
          gl_FragColor = texColor;
        }
      `,
      uniforms: {
        tMap: { value: this.texture },
      },
      transparent: true,
    });

    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.mesh.setParent(this.scene);
  }

  update(x: number, y: number) {
    this.mesh.position.x = x;
    this.mesh.position.y = y - 2;
    this.mesh.scale.set(0.3);
  }

  destroy() {
    if (this.mesh && this.mesh.parent) {
      this.mesh.setParent(null);
    }
  }
}

// Media class for gallery items
class Media {
  private gl: any;
  private scene: Transform;
  private index: number;
  private imageUrl: string;
  private text: string;
  private font: string;
  private textColor: string;
  private borderRadius: number;
  public mesh: Mesh;
  private geometry: any;
  private program: Program;
  private texture: Texture;
  private title: Title;
  public extra: number = 0;
  public width: number = 3;
  public height: number = 4;

  constructor(
    gl: any,
    scene: Transform,
    index: number,
    imageUrl: string,
    text: string,
    font: string,
    textColor: string,
    borderRadius: number
  ) {
    this.gl = gl;
    this.scene = scene;
    this.index = index;
    this.imageUrl = imageUrl;
    this.text = text;
    this.font = font;
    this.textColor = textColor;
    this.borderRadius = borderRadius;

    this.createTexture();
    this.createMesh();
    this.createTitle();
  }

  createTexture() {
    this.texture = new Texture(this.gl, {
      generateMipmaps: false,
    });

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      this.texture.image = img;
    };
    img.src = this.imageUrl;
  }

  createMesh() {
    this.geometry = {
      position: { size: 3, data: new Float32Array([
        -this.width / 2, -this.height / 2, 0,
        this.width / 2, -this.height / 2, 0,
        -this.width / 2, this.height / 2, 0,
        this.width / 2, this.height / 2, 0,
      ])},
      uv: { size: 2, data: new Float32Array([
        0, 1,
        1, 1,
        0, 0,
        1, 0,
      ])},
      index: { data: new Uint16Array([0, 1, 2, 1, 3, 2]) },
    };

    this.program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z += sin(uTime * 0.5 + position.x * 0.5) * uSpeed * 0.1;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        uniform vec2 uResolution;
        varying vec2 vUv;
        
        float sdRoundBox(vec2 p, vec2 b, float r) {
          vec2 q = abs(p) - b + r;
          return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
        }
        
        void main() {
          vec2 uv = vUv;
          vec4 texColor = texture2D(tMap, uv);
          
          vec2 p = (vUv - 0.5) * 2.0;
          vec2 size = vec2(1.0, uResolution.y / uResolution.x);
          float d = sdRoundBox(p * size, size, uBorderRadius);
          float alpha = 1.0 - smoothstep(-0.01, 0.01, d);
          
          gl_FragColor = vec4(texColor.rgb, texColor.a * alpha);
        }
      `,
      uniforms: {
        tMap: { value: this.texture },
        uTime: { value: 0 },
        uSpeed: { value: 0 },
        uBorderRadius: { value: this.borderRadius },
        uResolution: { value: new Vec2(this.width, this.height) },
      },
      transparent: true,
    });

    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.mesh.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title(this.gl, this.scene, this.text, this.font, this.textColor);
  }

  update(scroll: number, speed: number, time: number, bend: number) {
    const position = this.index * (this.width + 1);
    
    this.mesh.position.x = position + scroll + this.extra;
    this.mesh.position.y = Math.sin((this.mesh.position.x / bend) * Math.PI * 0.1) * bend;
    
    this.program.uniforms.uTime.value = time;
    this.program.uniforms.uSpeed.value = speed;
    
    if (this.title) {
      this.title.update(this.mesh.position.x, this.mesh.position.y);
    }
  }

  destroy() {
    if (this.mesh && this.mesh.parent) {
      this.mesh.setParent(null);
    }
    if (this.title) {
      this.title.destroy();
    }
  }
}

// Main App class
class App {
  private container: HTMLElement;
  private renderer: Renderer;
  private gl: any;
  private camera: Camera;
  private scene: Transform;
  private items: Array<{ image: string; text: string }>;
  private medias: Media[] = [];
  private scroll: { current: number; target: number; last: number } = {
    current: 0,
    target: 0,
    last: 0,
  };
  private speed: { current: number; target: number; lerp: number } = {
    current: 0,
    target: 0,
    lerp: 0.1,
  };
  private isDragging: boolean = false;
  private dragStart: number = 0;
  private time: number = 0;
  private bend: number;
  private textColor: string;
  private borderRadius: number;
  private scrollEase: number;
  private font: string;

  constructor(
    container: HTMLElement,
    items: Array<{ image: string; text: string }>,
    options: {
      bend: number;
      textColor: string;
      borderRadius: number;
      scrollEase: number;
      font: string;
    }
  ) {
    this.container = container;
    this.items = items;
    this.bend = options.bend;
    this.textColor = options.textColor;
    this.borderRadius = options.borderRadius;
    this.scrollEase = options.scrollEase;
    this.font = options.font;

    autoBind(this);
    this.init();
  }

  init() {
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.createMedias();
    this.addEventListeners();
    this.update();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
    this.onResize();
  }

  createCamera() {
    this.camera = new Camera(this.gl, { fov: 45 });
    this.camera.position.z = 10;
  }

  createScene() {
    this.scene = new Transform();
  }

  createMedias() {
    this.medias = this.items.map((item, index) => {
      return new Media(
        this.gl,
        this.scene,
        index,
        item.image,
        item.text,
        this.font,
        this.textColor,
        this.borderRadius
      );
    });
  }

  onResize() {
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height,
    });

    const fov = this.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.medias.forEach((media) => {
      media.width = width / 4;
      media.height = (width / 4) * 1.33;
    });
  }

  onTouchDown(e: TouchEvent | MouseEvent) {
    this.isDragging = true;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    this.dragStart = x;
    this.scroll.last = this.scroll.current;
  }

  onTouchMove(e: TouchEvent | MouseEvent) {
    if (!this.isDragging) return;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const distance = (this.dragStart - x) * 0.01;
    this.scroll.target = this.scroll.last + distance;
  }

  onTouchUp() {
    this.isDragging = false;
  }

  onWheel(e: WheelEvent) {
    this.scroll.target += e.deltaY * 0.001;
  }

  addEventListeners() {
    window.addEventListener('resize', debounce(this.onResize, 200));
    
    this.container.addEventListener('mousedown', this.onTouchDown);
    window.addEventListener('mousemove', this.onTouchMove);
    window.addEventListener('mouseup', this.onTouchUp);
    
    this.container.addEventListener('touchstart', this.onTouchDown);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onTouchUp);
    
    this.container.addEventListener('wheel', this.onWheel);
  }

  removeEventListeners() {
    window.removeEventListener('resize', this.onResize);
    
    this.container.removeEventListener('mousedown', this.onTouchDown);
    window.removeEventListener('mousemove', this.onTouchMove);
    window.removeEventListener('mouseup', this.onTouchUp);
    
    this.container.removeEventListener('touchstart', this.onTouchDown);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchUp);
    
    this.container.removeEventListener('wheel', this.onWheel);
  }

  update() {
    this.time += 0.01;
    
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scrollEase);
    
    const scrollDiff = this.scroll.current - this.scroll.last;
    this.speed.target = scrollDiff;
    this.speed.current = lerp(this.speed.current, this.speed.target, this.speed.lerp);
    this.scroll.last = this.scroll.current;

    this.medias.forEach((media, index) => {
      const totalWidth = (media.width + 1) * this.medias.length;
      media.extra = 0;
      
      const scrollPos = media.index * (media.width + 1) + this.scroll.current;
      
      if (scrollPos < -(media.width + 5)) {
        media.extra = totalWidth;
      }
      if (scrollPos > totalWidth - media.width) {
        media.extra = -totalWidth;
      }
      
      media.update(this.scroll.current, this.speed.current, this.time, this.bend);
    });

    this.renderer.render({ scene: this.scene, camera: this.camera });
    requestAnimationFrame(this.update);
  }

  destroy() {
    this.removeEventListeners();
    this.medias.forEach((media) => media.destroy());
    if (this.gl.canvas && this.gl.canvas.parentNode) {
      this.gl.canvas.parentNode.removeChild(this.gl.canvas);
    }
  }
}

// React Component
export function CircularGallery({
  items,
  bend = 3,
  textColor = '#a78bfa',
  borderRadius = 0.05,
  scrollEase = 0.02,
  font = 'bold 30px Space Grotesk',
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<App | null>(null);

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    appRef.current = new App(containerRef.current, items, {
      bend,
      textColor,
      borderRadius,
      scrollEase,
      font,
    });

    return () => {
      if (appRef.current) {
        appRef.current.destroy();
        appRef.current = null;
      }
    };
  }, [items, bend, textColor, borderRadius, scrollEase, font]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '600px',
        position: 'relative',
        cursor: 'grab',
        touchAction: 'none',
      }}
      onMouseDown={(e) => {
        if (containerRef.current) {
          containerRef.current.style.cursor = 'grabbing';
        }
      }}
      onMouseUp={(e) => {
        if (containerRef.current) {
          containerRef.current.style.cursor = 'grab';
        }
      }}
    />
  );
}
