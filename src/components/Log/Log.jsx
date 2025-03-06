export default function Log({ logs }) {
  return (
    <ol id="log">
      { logs.map(({ square, player }) =>
        <li key={`${square.row}${square.col}`}>
          { player } selected ({ (square.row + 1) + ', ' + (square.col + 1) })
        </li>) }
    </ol>
  )
}
