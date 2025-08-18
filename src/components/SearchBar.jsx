import { Search } from "lucide-react"
import '../styles/components.css'

export default function SearchBar({ placeholder = "Search...", value, onChange }) {
  return (
    <div className="search-bar-wrapper">
      <Search className="search-bar-icon" />
      <input type="text" placeholder={placeholder} value={value} onChange={onChange} className="search-bar-input" />
    </div>
  )
}
