import { useEffect, useRef } from 'react'
import Matter from 'matter-js'

/* -----------------------------------------------------------------------
   Raw SVG shape definitions for each food icon — small, single-color,
   line/fill vector illustrations (burger, croissant, tomato, etc). These
   are built directly with the DOM (not React JSX) because the animation
   loop below manipulates elements every physics tick for performance,
   bypassing React re-renders entirely.
   '__fill__' is swapped for a random brand accent color at spawn time.
----------------------------------------------------------------------- */
const ICON_PATHS = {
  burger: [
    { tag: 'path', attrs: { d: 'M10 27c0-9 10-16 22-16s22 7 22 16', fill: 'none', stroke: '#2A1D54', 'stroke-width': '3', 'stroke-linecap': 'round' } },
    { tag: 'rect', attrs: { x: '8', y: '27', width: '48', height: '7', rx: '3.5', fill: '__fill__', stroke: '#2A1D54', 'stroke-width': '2' } },
    { tag: 'rect', attrs: { x: '11', y: '37', width: '42', height: '6', rx: '3', fill: '#2A1D54', opacity: '0.25' } },
    { tag: 'rect', attrs: { x: '8', y: '46', width: '48', height: '9', rx: '4.5', fill: '__fill__', stroke: '#2A1D54', 'stroke-width': '2' } },
  ],
  croissant: [
    {
      tag: 'path',
      attrs: {
        d: 'M9 42C11 24 26 12 40 15c9 2 13 10 9 15-2 3-6 2-7-2-1-3-5-4-8-2 5 2 7 7 4 11-2 3-6 2-7-1-1-3-5-4-7-2 3 3 3 7 0 9-3 2-7 0-8-3-3 2-7 1-8-2-1-3-1-3 2-3z',
        fill: '__fill__',
        stroke: '#2A1D54',
        'stroke-width': '2.5',
        'stroke-linejoin': 'round',
      },
    },
  ],
  tomato: [
    { tag: 'circle', attrs: { cx: '32', cy: '37', r: '19', fill: '__fill__', stroke: '#2A1D54', 'stroke-width': '2.5' } },
    { tag: 'path', attrs: { d: 'M23 19c3-4 6-6 9-6s6 2 9 6', fill: 'none', stroke: '#3F7D3A', 'stroke-width': '3', 'stroke-linecap': 'round' } },
    { tag: 'path', attrs: { d: 'M32 13v7', stroke: '#3F7D3A', 'stroke-width': '3', 'stroke-linecap': 'round' } },
  ],
  lemon: [
    { tag: 'ellipse', attrs: { cx: '32', cy: '32', rx: '21', ry: '16', fill: '__fill__', stroke: '#2A1D54', 'stroke-width': '2.5', transform: 'rotate(-18 32 32)' } },
    { tag: 'path', attrs: { d: 'M11 27c-3 0-5 2-5 5s2 5 5 5', fill: 'none', stroke: '#2A1D54', 'stroke-width': '2', opacity: '0.4' } },
  ],
  bread: [
    { tag: 'path', attrs: { d: 'M10 31c0-12 10-21 22-21s22 9 22 21v16a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4z', fill: '__fill__', stroke: '#2A1D54', 'stroke-width': '2.5' } },
    { tag: 'path', attrs: { d: 'M21 27c2-4 6-6 11-6s9 2 11 6', fill: 'none', stroke: '#2A1D54', 'stroke-width': '2', opacity: '0.35', 'stroke-linecap': 'round' } },
  ],
  coffee: [
    { tag: 'path', attrs: { d: 'M13 23h31v17a12 12 0 0 1-12 12H25a12 12 0 0 1-12-12z', fill: '__fill__', stroke: '#2A1D54', 'stroke-width': '2.5' } },
    { tag: 'path', attrs: { d: 'M44 27h4a7 7 0 0 1 0 14h-4', fill: 'none', stroke: '#2A1D54', 'stroke-width': '3' } },
    { tag: 'path', attrs: { d: 'M19 17c1-3-1-4 0-7M27 17c1-3-1-4 0-7', stroke: '#2A1D54', 'stroke-width': '2', 'stroke-linecap': 'round', fill: 'none', opacity: '0.4' } },
  ],
  pasta: [
    {
      tag: 'path',
      attrs: {
        d: 'M10 20c9 4 9 11 0 15s-9 11 0 15M24 18c9 4 9 11 0 15s-9 11 0 15M38 20c9 4 9 11 0 15s-9 11 0 15',
        fill: 'none',
        stroke: '__fill__',
        'stroke-width': '4.5',
        'stroke-linecap': 'round',
      },
    },
  ],
  cherry: [
    { tag: 'circle', attrs: { cx: '21', cy: '45', r: '10', fill: '__fill__', stroke: '#2A1D54', 'stroke-width': '2.5' } },
    { tag: 'circle', attrs: { cx: '41', cy: '45', r: '10', fill: '__fill__', stroke: '#2A1D54', 'stroke-width': '2.5' } },
    { tag: 'path', attrs: { d: 'M21 35c2-11 7-17 7-23M41 35c-1-11-5-17-5-23', fill: 'none', stroke: '#3F7D3A', 'stroke-width': '2.5', 'stroke-linecap': 'round' } },
  ],
  leaf: [
    { tag: 'path', attrs: { d: 'M12 53C9 29 27 10 49 11c3 21-14 38-37 42z', fill: '__fill__', stroke: '#2A1D54', 'stroke-width': '2.5', 'stroke-linejoin': 'round' } },
    { tag: 'path', attrs: { d: 'M16 48C23 33 31 23 45 15', fill: 'none', stroke: '#2A1D54', 'stroke-width': '2', opacity: '0.3', 'stroke-linecap': 'round' } },
  ],
  pizza: [
    { tag: 'path', attrs: { d: 'M32 7 57 55H7z', fill: '__fill__', stroke: '#2A1D54', 'stroke-width': '2.5', 'stroke-linejoin': 'round' } },
    { tag: 'circle', attrs: { cx: '27', cy: '31', r: '3', fill: '#8A2A2F' } },
    { tag: 'circle', attrs: { cx: '39', cy: '38', r: '3', fill: '#8A2A2F' } },
    { tag: 'circle', attrs: { cx: '29', cy: '45', r: '2.5', fill: '#8A2A2F' } },
  ],
}

const FOOD_KEYS = Object.keys(ICON_PATHS)

// Letters spell short brand fragments — mixed and drawn from at random.
// Pool combines LINA / EAT / FRESH / TASTE so letters vary each spawn.
const LETTER_POOL = ['L', 'I', 'N', 'A', 'E', 'A', 'T', 'F', 'R', 'E', 'S', 'H', 'T', 'A', 'S', 'T', 'E']

// Brand palette only — matches the site's existing sticker-badge accents
// (cream / dark green-teal / mustard gold / coral / pink), no blue/purple
// hues borrowed from the reference site.
const ACCENT_COLORS = ['#C6E86B', '#F4633A', '#FF8FD8', '#DDBB6B']

const LIFESPAN_MS = 13000 // how long an item stays before fading out and being removed
const FADE_MS = 700

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Builds one SVG element from ICON_PATHS directly via the DOM API.
function buildIconSvg(key, color) {
  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttribute('viewBox', '0 0 64 64')
  svg.setAttribute('width', '100%')
  svg.setAttribute('height', '100%')

  ICON_PATHS[key].forEach((shape) => {
    const node = document.createElementNS(svgNS, shape.tag)
    Object.entries(shape.attrs).forEach(([attr, value]) => {
      node.setAttribute(attr, value === '__fill__' ? color : value)
    })
    svg.appendChild(node)
  })

  return svg
}

/**
 * Decorative, physics-based falling elements — small food SVG icons and
 * brand letters that drop from the top, collide, bounce slightly and pile
 * up near the bottom of this component's box, then fade out over time as
 * new ones trickle in. Entirely pointer-events-none so it never blocks
 * clicks on whatever sits above/around it (e.g. the navbar).
 */
export default function FallingIntro() {
  const containerRef = useRef(null)
  const stageRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined

    const container = containerRef.current
    const stage = stageRef.current
    if (!container || !stage) return undefined

    const { Engine, Bodies, Composite, Runner, Events, Body } = Matter

    const engine = Engine.create()
    engine.gravity.y = 0.55

    let width = container.clientWidth
    let height = container.clientHeight

    // Static invisible floor + side walls so items collide and settle
    // inside this box instead of spilling out or falling forever.
    let ground = Bodies.rectangle(width / 2, height + 14, width * 2, 28, { isStatic: true })
    let wallLeft = Bodies.rectangle(-14, height / 2, 28, height * 2, { isStatic: true })
    let wallRight = Bodies.rectangle(width + 14, height / 2, 28, height * 2, { isStatic: true })
    Composite.add(engine.world, [ground, wallLeft, wallRight])

    const runner = Runner.create()
    Runner.run(runner, engine)

    // Responsive item cap — fewer elements on smaller screens so the
    // effect stays decorative rather than cluttered.
    const getMaxItems = () => {
      const w = window.innerWidth
      if (w < 640) return 4
      if (w < 1024) return 7
      return 11
    }

    let maxItems = getMaxItems()
    const entities = [] // { id, body, el, size, addedAt }
    let entityId = 0
    let disposed = false

    function spawnOne() {
      if (disposed || entities.length >= maxItems) return

      const isFood = Math.random() < 0.42
      const size = isFood ? randomBetween(30, 46) : randomBetween(30, 48)
      const x = randomBetween(size, Math.max(size, width - size))
      const y = -size * 1.5
      const angle = randomBetween(-0.6, 0.6)

      const body = Bodies.circle(x, y, size / 2, {
        restitution: 0.42,
        friction: 0.35,
        frictionAir: 0.012,
        angle,
        density: 0.0018,
      })
      Body.setAngularVelocity(body, randomBetween(-0.08, 0.08))
      Composite.add(engine.world, body)

      const el = document.createElement('div')
      el.style.position = 'absolute'
      el.style.left = '0'
      el.style.top = '0'
      el.style.width = `${size}px`
      el.style.height = `${size}px`
      el.style.willChange = 'transform, opacity'
      el.style.opacity = '0'
      el.style.transition = `opacity ${FADE_MS}ms ease`
      el.style.pointerEvents = 'none'

      if (isFood) {
        const key = pick(FOOD_KEYS)
        const color = pick(ACCENT_COLORS)
        const wrapper = document.createElement('div')
        wrapper.style.width = '100%'
        wrapper.style.height = '100%'
        wrapper.style.filter = 'drop-shadow(2px 3px 0px rgba(42,29,84,0.25))'
        wrapper.appendChild(buildIconSvg(key, color))
        el.appendChild(wrapper)
      } else {
        const letter = pick(LETTER_POOL)
        const color = pick(ACCENT_COLORS)
        el.style.display = 'flex'
        el.style.alignItems = 'center'
        el.style.justifyContent = 'center'
        el.style.fontFamily = "'Baloo 2', sans-serif"
        el.style.fontWeight = '800'
        el.style.fontSize = `${size * 0.72}px`
        el.style.color = color
        el.style.webkitTextStroke = '2px #2A1D54'
        el.style.textTransform = 'uppercase'
        el.textContent = letter
      }

      stage.appendChild(el)
      requestAnimationFrame(() => {
        el.style.opacity = '1'
      })

      entities.push({ id: entityId++, body, el, size, addedAt: Date.now() })
    }

    function removeEntity(entity) {
      entity.el.style.opacity = '0'
      setTimeout(() => entity.el.remove(), FADE_MS)
      Composite.remove(engine.world, entity.body)
    }

    function tick() {
      const now = Date.now()
      for (let i = entities.length - 1; i >= 0; i--) {
        const entity = entities[i]
        if (now - entity.addedAt > LIFESPAN_MS) {
          removeEntity(entity)
          entities.splice(i, 1)
          continue
        }
        const { x, y } = entity.body.position
        const angle = entity.body.angle
        const half = entity.size / 2
        entity.el.style.transform = `translate(${x - half}px, ${y - half}px) rotate(${angle}rad)`
      }
    }

    Events.on(engine, 'afterUpdate', tick)

    // Small initial burst, then a slow trickle — never a flood of items at once.
    const initialBurst = setTimeout(() => {
      spawnOne()
      setTimeout(spawnOne, 260)
      setTimeout(spawnOne, 520)
    }, 400)

    const spawnInterval = setInterval(spawnOne, 1900)

    function handleResize() {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      maxItems = getMaxItems()

      Composite.remove(engine.world, [ground, wallLeft, wallRight])
      ground = Bodies.rectangle(newWidth / 2, newHeight + 14, newWidth * 2, 28, { isStatic: true })
      wallLeft = Bodies.rectangle(-14, newHeight / 2, 28, newHeight * 2, { isStatic: true })
      wallRight = Bodies.rectangle(newWidth + 14, newHeight / 2, 28, newHeight * 2, { isStatic: true })
      Composite.add(engine.world, [ground, wallLeft, wallRight])

      width = newWidth
      height = newHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      disposed = true
      clearTimeout(initialBurst)
      clearInterval(spawnInterval)
      window.removeEventListener('resize', handleResize)
      Events.off(engine, 'afterUpdate', tick)
      Runner.stop(runner)
      Composite.clear(engine.world, false)
      Engine.clear(engine)
      entities.forEach((entity) => entity.el.remove())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[220px] overflow-hidden sm:h-[280px] lg:h-[340px]"
      aria-hidden="true"
    >
      <div ref={stageRef} className="relative h-full w-full" />
    </div>
  )
}
