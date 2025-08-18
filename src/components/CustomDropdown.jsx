
import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import '../styles/components.css'

export default function CustomDropdown({ label, options, selectedValue, onSelect }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  const handleItemClick = (value) => {
    onSelect(value)
    setIsOpen(false)
  }

  return (
    <div className="custom-dropdown-wrapper" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="custom-dropdown-button"
          id={`menu-button-${label}`}
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {label}: {selectedValue}
          <ChevronDown className="icon" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div
          className="custom-dropdown-menu"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={`menu-button-${label}`}
          tabIndex="-1"
        >
          <div className="custom-dropdown-menu-items" role="none">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleItemClick(option)}
                className="custom-dropdown-menu-item"
                role="menuitem"
                tabIndex="-1"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

