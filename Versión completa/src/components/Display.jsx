import React from "react"

const Display = ({ value }) => {
  const formatValue = value.length > 9 ? "ERROR" : value

  return (
    <div className="display">
      <span>{formatValue}</span>
    </div>
  )
}

export default Display
