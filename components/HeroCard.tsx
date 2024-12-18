import Stack from '@mui/material/Stack'

type Props = OnHeroClick & {
  hero: SelectionHero
}

// TODO: ADD BANNED HERO UI

const HeroCard = ({ 
  hero,
  onLeftClick,
  onRightClick
}: Props) => {
  return (
    <Stack
      component='img'
      alt={hero.name_loc}
      src={hero.thumbnail_vertical}
      onClick={() => (!hero.selectedBy && hero.isFiltered) && onLeftClick(hero.id, 'your')}
      onContextMenu={event => {
        event.preventDefault()
        if (!hero.selectedBy && hero.isFiltered) onRightClick(hero.id, 'opponent')
      }}
      // WIDTH:HEIGHT = 3:4
      width={60}
      height={80}
      sx={{
        filter: (hero.selectedBy || !hero.isFiltered) ? 'grayscale(100%)' : 'none',
        transition: '.15s',
        '&:hover': {
          transform: 'scale(2)',
          transition: 'transform .15s ease-in-out',
          zIndex: 2
        }
      }}
    />
  )
}

export default HeroCard