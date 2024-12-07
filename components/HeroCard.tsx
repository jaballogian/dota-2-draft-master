import Stack from '@mui/material/Stack'

type Prop = {
  hero: CompleteHero
}

const HeroCard = ({ hero }: Prop) => {
  return (
    <Stack
      component='img'
      alt={hero.name_loc}
      src={hero.thumbnail}
      width={60}
      height={80}
    />
  )
}

export default HeroCard