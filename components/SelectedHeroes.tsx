import Stack from '@mui/material/Stack'
import SelectedHero from './SelectedHero'

type Props = {
  list: SelectionHero[],
  selectedBy: SelectionOptions
}

const SelectedHeroes = ({ list, selectedBy }: Props) => {
  return (
    <Stack direction='row'>
      {[ 0, 1, 2, 3, 4 ].map(position => (
        <SelectedHero
          key={position}
          hero={list[position]}
          selectedBy={selectedBy}
        />
      ))}
    </Stack>
  )
}

export default SelectedHeroes