import Stack from '@mui/material/Stack'

type Props = {
  hero: SelectionHero,
  selectedBy: SelectionOptions,
  onRightClick: (id: number) => void
}

const getClipPath = (selectedBy: SelectionOptions): string => {
  switch (selectedBy) {
  case 'your':
    return 'polygon(0 0, 90% 0, 100% 100%, 10% 100%)'
  case 'opponent':
    return 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)'
  default:
    return ''
  }
}

const SelectedHero = ({ 
  hero, 
  selectedBy, 
  onRightClick
}: Props) => {
  return (
    <Stack
      component='img'
      alt={hero?.name_loc}
      src={hero?.thumbnail_horizontal || '/images/backgrounds/empty_hero.jpg'}
      // WIDTH:HEIGHT = 9:5
      width={90}
      height={50}
      sx={{
        clipPath: getClipPath(selectedBy),
        border: 'none !important'
      }}
      onContextMenu={event => {
        event.preventDefault()
        onRightClick(hero?.id)
      }}
    />
  )
}

export default SelectedHero