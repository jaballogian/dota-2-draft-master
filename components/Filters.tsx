import Stack from '@mui/material/Stack'

type IconsViewProps = {
  icons: FilterIcons[],
  onClick: (label: string) => void
}

const IconsView = ({ icons, onClick }: IconsViewProps) => {
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
          onClick={() => onClick(icon.label)}
          sx={{
            filter: icon.isSelected ? 'brightness(100%)' : 'brightness(50%)',
            transition: '.15s',
            '&:hover': {
              filter: icon.isSelected ? 'brightness(100%)' : 'brightness(75%)',
              transform: 'scale(1.6)',
              transition: 'transform .15s ease-in-out',
              zIndex: 2
            }
          }}
        />
      ))}
    </Stack>
  )
}

const Filters = ({ filters, onIconClick }: { 
  filters: FilterIcons[], 
  onIconClick: (label: string) => void }
) => {
  return (
    <Stack 
      direction='row' 
      spacing={2}
    >
      <IconsView 
        icons={filters.slice(0, 2)} 
        onClick={onIconClick}
      />
      <IconsView 
        icons={filters.slice(2, 4)}  
        onClick={onIconClick}
      />
      <IconsView 
        icons={filters.slice(-6)} 
        onClick={onIconClick}
      />
    </Stack>
  )
}

export default Filters