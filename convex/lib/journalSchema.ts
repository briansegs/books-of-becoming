import { v } from 'convex/values'

export const journalType = v.union(v.literal('default'), v.literal('future'))

export const journalColors = v.union(
  v.literal('red'),
  v.literal('blue'),
  v.literal('green'),
  v.literal('pink'),
  v.literal('yellow'),
  v.literal('slate'),
  v.literal('black'),
  v.literal('white'),
)

export const journalTextColors = v.union(
  v.literal('black'),
  v.literal('white'),
  v.literal('gold'),
  v.literal('silver'),
)

export const journalBackgrounds = v.union(
  v.literal('none'),
  v.literal('wovenFabric'),
  v.literal('diagonalGrid'),
  v.literal('crosshatchArt'),
  v.literal('zigzagLightning'),
  v.literal('circuitBoard'),
  v.literal('paperTexture'),
)
