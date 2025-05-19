export default function Navbar() {
    return <nav className="p-4 bg-gray-200">IRIS Navbar</nav>
  }
  
  {unreadCount > 0 && <span className="text-red-500 ml-1">({unreadCount})</span>}
