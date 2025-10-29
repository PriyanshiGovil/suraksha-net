// src/components/Common/Loader.jsx
const Loader = ({ small = false }) => {
  return (
    <div className={`loader ${small ? 'small' : ''}`}>
      <div className="loader-spinner"></div>
    </div>
  )
}

export default Loader