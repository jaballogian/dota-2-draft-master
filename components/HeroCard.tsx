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
      onClick={() => !hero.selectedBy && onLeftClick(hero.id, 'your')}
      onContextMenu={event => {
        event.preventDefault()
        if (!hero.selectedBy) onRightClick(hero.id, 'opponent')
      }}
      // WIDTH:HEIGHT = 3:4
      width={60}
      height={80}
      sx={hero.selectedBy ? {
        filter: 'grayscale(100%)'
      } :{
        transition: '.15s',
        '&:hover': {
          transform: 'scale(1.6)',
          transition: 'transform .15s ease-in-out',
        }
      }}
    />
  )
}

export default HeroCard