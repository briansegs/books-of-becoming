const blackButton = 'text-black hover:bg-black/10 hover:text-black'

const whiteButton = 'text-white hover:bg-white/10 hover:text-white'

const goldButton = 'text-amber-500 hover:bg-white/10 hover:text-amber-400'

const silverButton = 'text-zinc-300 hover:bg-zinc-300/10 hover:text-zinc-300'

const goldText =
  'bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600 bg-clip-text text-transparent'

const silverText =
  'bg-gradient-to-r from-zinc-400 via-slate-200 to-zinc-500 bg-clip-text text-transparent'

export const textColors = {
  black: 'text-black',
  white: 'text-white',
  gold: goldText,
  silver: silverText,
}

export const buttonColors = {
  black: blackButton,
  white: whiteButton,
  gold: goldButton,
  silver: silverButton,
}

export const journalColors = {
  red: {
    bg: 'bg-red-900',
    border: 'border-red-950/50',
    textColors: textColors,
  },
  blue: {
    bg: 'bg-indigo-900',
    border: 'border-indigo-950/50',
    textColors: textColors,
  },
  green: {
    bg: 'bg-emerald-900',
    border: 'border-emerald-950/50',
    textColors: textColors,
  },
  pink: {
    bg: 'bg-pink-800',
    border: 'border-pink-900',
    textColors: textColors,
  },
  yellow: {
    bg: 'bg-yellow-300',
    border: 'border-yellow-500',
    textColors: {
      black: textColors.black,
      white: textColors.white,
      gold: 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 bg-clip-text text-transparent',
      silver:
        'bg-gradient-to-r from-zinc-400 via-slate-300 to-zinc-500 bg-clip-text text-transparent',
    },
  },
  slate: {
    bg: 'bg-slate-900',
    border: 'border-slate-950',
    textColors: textColors,
  },
  black: {
    bg: 'bg-zinc-900',
    border: 'border-zinc-950',
    textColors: textColors,
  },
  white: {
    bg: 'bg-stone-100',
    border: 'border-stone-200',
    textColors: {
      black: textColors.black,
      white: textColors.white,
      gold: 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 bg-clip-text text-transparent',
      silver:
        'bg-gradient-to-r from-zinc-400 via-slate-300 to-zinc-500 bg-clip-text text-transparent',
    },
  },
}
