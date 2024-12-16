import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'

type Props = {
  hero: GeneralHero
}

const Icon = ({ hero }: Props) => {
  return (
    <Tooltip 
      title={hero.name_loc} 
      placement='top'
    >
      <Stack
        component='img'
        alt={`${hero.name_loc} Icon`}
        src={hero.icon}
        // WIDTH:HEIGHT = 1:1
        width={32}
        height={32}
      />
    </Tooltip>
  )
}

export default Icon