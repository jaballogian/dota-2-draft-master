import HeroCard from './HeroCard'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

type Props = OnHeroClick & {
  primaryAttribute: PrimaryAttributeOptions,
  list: CompleteHero[]
}

const getPrimaryAttributeLabel = (number: PrimaryAttributeOptions): string => {
  switch (number) {
  case 0:
    return 'Strength'
  case 1:
    return 'Agility'
  case 2:
    return 'Intelligence'
  case 3:
    return 'Universal'
  default:
    return ''
  }
}

const HeroPoolSection = ({ 
  primaryAttribute, 
  list = [], 
  onLeftClick,
  onRightClick
}: Props) => {
  return (
    <Stack spacing={1}>
      {/* HEADER */}
      <Stack
        direction='row'
        alignItems='center'
        spacing={1}
      >
        {/* ICON */}
        <Stack
          component='img'
          alt={`${getPrimaryAttributeLabel(primaryAttribute)} Icon`}
          src={`/images/icons/primary_attribute_${primaryAttribute}.png`}
          width={20}
          height={20}
        />

        {/* LABEL */}
        <Typography>
          {getPrimaryAttributeLabel(primaryAttribute)}
        </Typography>
      </Stack>

      {/* HERO OPTIONS */}
      <Stack
        direction='row'
        gap={1}
        flexWrap='wrap'
      >
        {list.filter(item => item.primary_attr === primaryAttribute)
          .map(hero => (
            <HeroCard
              key={hero.id}
              hero={hero}
              onLeftClick={onLeftClick}
              onRightClick={onRightClick}
            />
          ))}
      </Stack>
    </Stack>
  )
}

export default HeroPoolSection