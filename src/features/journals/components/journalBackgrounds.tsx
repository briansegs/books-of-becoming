import { JSX } from 'react'

const BgWovenFabric = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0"
    style={{
      backgroundImage: `
          repeating-linear-gradient(0deg, rgba(75, 85, 99, 0.08), rgba(75, 85, 99, 0.08) 2px, transparent 2px, transparent 6px),
          repeating-linear-gradient(90deg, rgba(107, 114, 128, 0.06), rgba(107, 114, 128, 0.06) 2px, transparent 2px, transparent 6px),
          repeating-linear-gradient(0deg, rgba(55, 65, 81, 0.04), rgba(55, 65, 81, 0.04) 1px, transparent 1px, transparent 12px),
          repeating-linear-gradient(90deg, rgba(55, 65, 81, 0.04), rgba(55, 65, 81, 0.04) 1px, transparent 1px, transparent 12px)
        `,
    }}
  />
)

const BgDiagonalGrid = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0"
    style={{
      backgroundImage: `
            repeating-linear-gradient(45deg, rgba(255, 0, 100, 0.1) 0, rgba(255, 0, 100, 0.1) 1px, transparent 1px, transparent 20px),
          repeating-linear-gradient(-45deg, rgba(255, 0, 100, 0.1) 0, rgba(255, 0, 100, 0.1) 1px, transparent 1px, transparent 20px)
          `,
      backgroundSize: '40px 40px',
    }}
  />
)

const BgCrosshatchArt = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0"
    style={{
      backgroundImage: `
          repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px)
        `,
    }}
  />
)

const BgZigzagLightning = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0"
    style={{
      backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(75, 85, 99, 0.08) 20px, rgba(75, 85, 99, 0.08) 21px),
          repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(107, 114, 128, 0.06) 30px, rgba(107, 114, 128, 0.06) 31px),
          repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(55, 65, 81, 0.05) 40px, rgba(55, 65, 81, 0.05) 41px),
          repeating-linear-gradient(150deg, transparent, transparent 35px, rgba(31, 41, 55, 0.04) 35px, rgba(31, 41, 55, 0.04) 36px)
        `,
    }}
  />
)

const BgCircuitBoard = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0"
    style={{
      backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
          repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
          radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
          radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
        `,
      backgroundSize: '40px 40px, 40px 40px, 40px 40px, 40px 40px',
    }}
  />
)

const BgPaperTexture = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0"
    style={{
      backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
          repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),
          repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)
        `,
      backgroundSize: '8px 8px, 32px 32px, 32px 32px',
    }}
  />
)

const backgroundComponents = {
  none: null,
  wovenFabric: BgWovenFabric,
  diagonalGrid: BgDiagonalGrid,
  crosshatchArt: BgCrosshatchArt,
  zigzagLightning: BgZigzagLightning,
  circuitBoard: BgCircuitBoard,
  paperTexture: BgPaperTexture,
}

export const journalBackgrounds = Object.entries(backgroundComponents).reduce(
  (acc, [key, Component]) => ({
    ...acc,
    [key]: Component ? <Component /> : null,
  }),
  {} as Record<keyof typeof backgroundComponents, JSX.Element | null>,
)
