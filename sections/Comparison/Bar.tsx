import BarChart from '@/components/Charts/Bar'

type Props = {
  type: TypeOptions,
  heroes: SelectionHero[]
}
type TypeOptions = 'attributes' | 'roles'

const Bar = ({ type, heroes }: Props) => {
  return (
    <BarChart
      labels={[ 'Carry', 'Support', 'Nuker', 'Disabler', 'Jungler', 'Durable', 'Escape', 'Pusher', 'Initiator' ]}
      yourData={[ 0, 1, 2, 3, 4, 5, 6, 7, 8 ].reverse().map(number => -(number))}
      opponentData={[ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]}
    />
  )
}

export default Bar