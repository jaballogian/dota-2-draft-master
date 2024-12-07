import Stack from '@mui/material/Stack'

type Props = {
  hero: CompleteHero
}

const HeroCard = ({ hero }: Props) => {
  return (
    <Stack
      component='img'
      alt={hero.name_loc}
      src={hero.thumbnail}
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