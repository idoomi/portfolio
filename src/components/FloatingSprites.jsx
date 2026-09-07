import { useLocation } from 'react-router-dom'
import AnimatedSprite from './AnimatedSprite.jsx'
import './FloatingSprites.css'

const SPRITES = {
  bow: '/sprites/bow.png',
  bowGold: '/sprites/bow-gold.png',
  bowRed: '/sprites/bow-red.png',
  wings: '/sprites/wings.png',
  halo: '/sprites/halo.png',
  hearts: '/sprites/hearts.png',
  heartsRed: '/sprites/hearts-red.png',
  arrowBlue: '/sprites/arrow-blue.png',
}

// Each page gets its own combo of sprites across the same four corner slots
const PAGE_SETS = {
  '/about': [SPRITES.bow, SPRITES.wings, SPRITES.halo, SPRITES.hearts],
  '/projects': [SPRITES.bowGold, SPRITES.arrowBlue, SPRITES.wings, SPRITES.heartsRed],
  '/resume': [SPRITES.bowRed, SPRITES.halo, SPRITES.hearts, SPRITES.arrowBlue],
  '/contact': [SPRITES.bow, SPRITES.heartsRed, SPRITES.wings, SPRITES.bowGold],
}

const SLOTS = ['sprite-slot-tl', 'sprite-slot-bl', 'sprite-slot-tr', 'sprite-slot-br']

// Each page shows the cat doing something different, picked from the
// "Free pack" sheet's row-indexed animation loops (see Frame indexes.png)
const CAT_ANIMS = {
  '/about': { row: 0, frameCount: 6 }, // idle look-around
  '/projects': { row: 6, frameCount: 8 }, // walk cycle
  '/resume': { row: 3, frameCount: 10 }, // curled up loaf
  '/contact': { row: 8, frameCount: 6 }, // tail flick
}

function FloatingSprites({ showCat = true }) {
  const { pathname } = useLocation()
  const set = PAGE_SETS[pathname] || PAGE_SETS['/about']
  const cat = CAT_ANIMS[pathname] || CAT_ANIMS['/about']

  return (
    <div className="floating-sprites" aria-hidden="true">
      {set.map((src, i) => (
        <img key={src + i} src={src} alt="" className={`floating-sprite ${SLOTS[i]}`} />
      ))}
      {showCat && (
        <AnimatedSprite
          row={cat.row}
          frameCount={cat.frameCount}
          size={110}
          className="sprite-slot-bc sprite-cat"
        />
      )}
    </div>
  )
}

export default FloatingSprites
