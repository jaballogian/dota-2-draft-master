import Stack from '@mui/material/Stack'

type Icons = { 
  label: string, 
  iconUrl: string
}

const typeIcons: Icons[] = [
  { label: 'Carry', iconUrl: '/images/icons/filter_carry_png.png' },
  { label: 'Support', iconUrl: '/images/icons/filter_support_png.png' }
]

const attackTypeIcons: Icons[] = [
  { label: 'Melee', iconUrl: '/images/icons/filter_melee_png.png' },
  { label: 'Range', iconUrl: '/images/icons/filter_ranges_png.png' }
]

const tagIcons: Icons[] = [
  { label: 'Disabler', iconUrl: '/images/icons/filter_disabler_png.png' },
  { label: 'Durable', iconUrl: '/images/icons/filter_durable_png.png' },
  { label: 'Escape', iconUrl: '/images/icons/filter_escape_png.png' },
  { label: 'Initiator', iconUrl: '/images/icons/filter_initiator_png.png' },
  { label: 'Nuker', iconUrl: '/images/icons/filter_nuker_png.png' },
  { label: 'Pusher', iconUrl: '/images/icons/filter_pusher_png.png' }
]

const IconsView = ({ icons }: { icons: Icons[]}) => {
  return (
    <Stack direction='row'>
      {icons.map((icon) => (
        <Stack
          key={icon.label}
          component='img'
          alt={`Filter by ${icon.label}`}
          src={icon.iconUrl}
          // WIDTH : HEIGHT = 10 : 8
          width={30}
          height={24}
        />
      ))}
    </Stack>
  )
}

const Filters = () => {
  return (
    <Stack 
      direction='row' 
      spacing={2}
    >
      <IconsView icons={typeIcons}/>
      <IconsView icons={attackTypeIcons}/>
      <IconsView icons={tagIcons}/>
    </Stack>
  )
}

export default Filters