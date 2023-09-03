import './index.css'

const AllTags = props => {
  const {itemDetails, isActive, tagChanged} = props
  const isActiveCss = isActive ? 'activeButton' : ''
  console.log(isActive)

  const changeTag = () => {
    tagChanged(itemDetails.displayText)
  }
  return (
    <li className="tagListItem">
      <button
        type="button"
        className={`button2 ${isActiveCss}`}
        onClick={changeTag}
      >
        {itemDetails.displayText}
      </button>
    </li>
  )
}
export default AllTags
