import Stack from '@mui/material/Stack'

type Props = OnHeroClick & {
  hero: CompleteHero
}

const HeroCard = ({ 
  hero,
  onLeftClick,
  onRightClick
}: Props) => {
  return (
    <Stack
      component='img'
      alt={hero.name_loc}
      src={hero.thumbnail}
      onClick={() => onLeftClick(hero.id, 'your')}
      onContextMenu={event => {
        event.preventDefault()
        onRightClick(hero.id, 'opponent')
      }}
      width={60}
      height={80}
      sx={{
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