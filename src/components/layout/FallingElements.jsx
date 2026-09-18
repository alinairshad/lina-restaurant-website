import { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'

/* ---------------------------------------------------------------------
   Palette — cream / dark green / mustard / coral-pink, matching the
   Lina site. Kept as plain hex here (not Tailwind classes) because the
   colors are picked per-item at random and set via inline style.
--------------------------------------------------------------------- */
const CREAM = '#F4EFE3'
const DARK_GREEN = '#2F4A3D'
const MUSTARD = '#D9A441'
const CORAL = '#F4633A'
const PINK = '#FF8FD8'
const INK = '#2A1D54'

const LETTER_COLORS = [CORAL, MUSTARD, PINK, DARK_GREEN]

/* Short fragments to mix in — one is picked at random per batch. */
const LETTER_SETS = [
  ['L', 'I', 'N', 'A'],
  ['E', 'A', 'T'],
  ['F', 'R', 'E', 'S', 'H'],
  ['T', 'A', 'S', 'T', 'E'],
]

export const FOOD_TYPES = [
  'burger', 'croissant', 'pizza', 'tomato', 'lemon',
  'bread', 'coffee', 'pasta', 'cherry', 'leaf',
]

/* ---------------------------------------------------------------------
   Small flat vector-style food icons — hand-built SVG shapes, not
   emoji and not photos. Kept simple/geometric on purpose so they read
   as clean illustrations rather than cartoon stickers.
--------------------------------------------------------------------- */
export function FoodIcon({ type, size }) {
  switch (type) {
    case 'burger':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48">
          <path d="M6 20c0-8 8-13 18-13s18 5 18 13H6Z" fill={MUSTARD} />
          <circle cx="16" cy="13.5" r="1.1" fill={CREAM} />
          <circle cx="24" cy="10.5" r="1.1" fill={CREAM} />
          <circle cx="32" cy="13.5" r="1.1" fill={CREAM} />
          <rect x="6" y="20" width="36" height="4.5" rx="2" fill={DARK_GREEN} />
          <rect x="6" y="24.5" width="36" height="6" rx="2" fill="#9A5A3D" />
          <rect x="6" y="30.5" width="36" height="3.5" rx="1.5" fill={CORAL} />
          <rect x="4" y="34" width="40" height="7" rx="3.5" fill={MUSTARD} />
        </svg>
      )
    case 'croissant':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48">
          <path
            d="M5 30c1-14 10-22 20-22 9 0 16 6 18 16-6-6-13-6-18-1 5-1 9 2 8 8-6-4-11-3-14 2-4-3-6-2-9 1-3-2-5-2-5-4Z"
            fill={MUSTARD}
          />
        </svg>
      )
    case 'pizza':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48">
          <path d="M24 4 44 40A20 20 0 0 1 4 40Z" fill={CORAL} />
          <path d="M5 39A20 20 0 0 1 43 39" fill="none" stroke={MUSTARD} strokeWidth="4" strokeLinecap="round" />
          <circle cx="20" cy="23" r="2.3" fill="#7A2A2A" />
          <circle cx="28" cy="29" r="2.3" fill="#7A2A2A" />
          <circle cx="22" cy="33" r="2" fill="#7A2A2A" />
        </svg>
      )
    case 'tomato':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48">
          <circle cx="24" cy="27" r="15" fill={CORAL} />
          <path d="M24 11c-3-3-7-2-9 0 3-1 6 0 7 3 1-3 4-4 7-3-2-2-6-3-9-1Z" fill={DARK_GREEN} />
        </svg>
      )
    case 'lemon':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48">
          <ellipse cx="24" cy="24" rx="16" ry="11.5" fill="#F3D250" />
          <path d="M9 24c8-4 22-4 30 0" stroke="#DDB335" strokeWidth="1" fill="none" />
          <path d="M22 12c-2-3-5-3-7-1 3 0 5 1 5 3Z" fill={DARK_GREEN} />
        </svg>
      )
    case 'bread':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48">
          <path d="M4 30C4 16 12 12 24 12s20 4 20 18c0 8-9 8-20 8S4 38 4 30Z" fill={MUSTARD} />
          <path d="M15 17 11 29M24 15 20 31M33 17 29 29" stroke={DARK_GREEN} strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )
    case 'coffee':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48">
          <path d="M9 18h23v13a11.5 11.5 0 0 1-23 0Z" fill={DARK_GREEN} />
          <path d="M32 20c7-1 8 5 7 8-1 4-4 5-7 5" fill="none" stroke={DARK_GREEN} strokeWidth="3" />
          <path d="M15 10q2-3 0-6M23 10q2-3 0-6" stroke={MUSTARD} strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      )
    case 'pasta':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48">
          <path d="M8 15 24 24 8 33Z" fill={MUSTARD} />
          <path d="M40 15 24 24 40 33Z" fill={MUSTARD} />
          <circle cx="24" cy="24" r="3" fill={CORAL} />
        </svg>
      )
    case 'cherry':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48">
          <circle cx="17" cy="32" r="8" fill={CORAL} />
          <circle cx="31" cy="34" r="8" fill={CORAL} />
          <path d="M17 24Q19 10 29 6M31 26Q31 14 29 6" stroke={DARK_GREEN} strokeWidth="2" fill="none" />
        </svg>
      )
    case 'leaf':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48">
          <path d="M24 6c18 4 16 22 14 28-10 8-26 6-30-6C4 16 12 8 24 6Z" fill={DARK_GREEN} />
          <path d="M23 9c1 14-8 20-14 26" stroke={CREAM} strokeWidth="1.4" fill="none" />
        </svg>
      )
    default:
      return null
  }
}

/* Fewer items on smaller screens. */
function useItemCount() {
  const [count, setCount] = useState(8)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setCount(3)
      else if (w < 1024) setCount(5)
      else setCount(8)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return count
}

let uid = 0

export default function FallingElements() {
  const containerRef = useRef(null)
  const itemsRef = useRef([]) // { id, body, el, size, type, char, color, fading }
  const [renderItems, setRenderItems] = useState([])
  const itemCount = useItemCount()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    const engine = Matter.Engine.create()
    engine.gravity.y = 0.6
    const world = engine.world

    // Invisible floor + side walls — items land and bounce near the
    // navbar instead of falling forever or flying off-screen.
    const ground = Matter.Bodies.rectangle(width / 2, height + 10, width * 2, 20, { isStatic: true })
    const leftWall = Matter.Bodies.rectangle(-10, height / 2, 20, height * 2, { isStatic: true })
    const rightWall = Matter.Bodies.rectangle(width + 10, height / 2, 20, height * 2, { isStatic: true })
    Matter.World.add(world, [ground, leftWall, rightWall])

    const runner = Matter.Runner.create()
    Matter.Runner.run(runner, engine)

    let rafId
    const tick = () => {
      itemsRef.current.forEach((item) => {
        if (item.el) {
          const { x, y } = item.body.position
          item.el.style.transform = `translate(${x - item.size / 2}px, ${y - item.size / 2}px) rotate(${item.body.angle}rad)`
        }
      })
      rafId = requestAnimationFrame(tick)
    }
    tick()

    const spawnBatch = () => {
      const w = containerRef.current ? containerRef.current.clientWidth : width
      const fragment = LETTER_SETS[Math.floor(Math.random() * LETTER_SETS.length)]
      const newItems = []

      for (let i = 0; i < itemCount; i++) {
        const isLetter = i < fragment.length && Math.random() > 0.35
        const size = isLetter ? 34 + Math.random() * 14 : 30 + Math.random() * 16
        const x = 40 + Math.random() * Math.max(w - 80, 40)
        const y = -40 - Math.random() * 200

        const body = Matter.Bodies.circle(x, y, size / 2, {
          restitution: 0.35 + Math.random() * 0.2,
          friction: 0.4,
          frictionAir: 0.012 + Math.random() * 0.01,
          density: 0.0016,
        })
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.15)
        Matter.World.add(world, body)

        const item = {
          id: uid++,
          body,
          size,
          type: isLetter ? 'letter' : FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)],
          char: isLetter ? fragment[i % fragment.length] : null,
          color: LETTER_COLORS[i % LETTER_COLORS.length],
          fading: false,
        }
        itemsRef.current.push(item)
        newItems.push(item)
      }
      setRenderItems((prev) => [...prev, ...newItems])

      // Let the batch sit for a while, fade it out, then remove it and
      // spawn the next one.
      setTimeout(() => {
        const ids = new Set(newItems.map((n) => n.id))
        setRenderItems((prev) => prev.map((it) => (ids.has(it.id) ? { ...it, fading: true } : it)))
        setTimeout(() => {
          newItems.forEach((it) => Matter.World.remove(world, it.body))
          itemsRef.current = itemsRef.current.filter((it) => !ids.has(it.id))
          setRenderItems((prev) => prev.filter((it) => !ids.has(it.id)))
        }, 900)
      }, 7000)
    }

    spawnBatch()
    const interval = setInterval(spawnBatch, 8200)

    return () => {
      clearInterval(interval)
      cancelAnimationFrame(rafId)
      Matter.Runner.stop(runner)
      Matter.World.clear(world)
      Matter.Engine.clear(engine)
    }
  }, [itemCount])

  return (
    <div
      ref={containerRef}
      // pointer-events-none on the whole layer guarantees the navbar and
      // "Reserve a Table" button stay fully clickable no matter what.
      className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[220px] overflow-hidden sm:h-[260px]"
      aria-hidden="true"
    >
      {renderItems.map((item) => (
        <div
          key={item.id}
          ref={(el) => {
            const found = itemsRef.current.find((it) => it.id === item.id)
            if (found) found.el = el
          }}
          className="absolute left-0 top-0 transition-opacity duration-[900ms] ease-out"
          style={{
            opacity: item.fading ? 0 : 1,
            width: item.size,
            height: item.size,
            filter: 'drop-shadow(2px 3px 3px rgba(42,29,84,0.25))',
          }}
        >
          {item.type === 'letter' ? (
            <span
              className="flex h-full w-full items-center justify-center font-display text-2xl font-bold sm:text-3xl"
              style={{ color: item.color, textShadow: `1px 1px 0 ${INK}` }}
            >
              {item.char}
            </span>
          ) : (
            <FoodIcon type={item.type} size={item.size} />
          )}
        </div>
      ))}
    </div>
  )
}
