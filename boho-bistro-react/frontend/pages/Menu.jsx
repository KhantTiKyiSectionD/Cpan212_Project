import { useEffect, useState } from 'react'
import { getMenuItemsByCategory } from '../services/api.js'

const SECTIONS = ['starters', 'appetizers', 'foods', 'drinks']

export default function Menu() {
  const [active, setActive] = useState('starters')
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const el = document.querySelector('.menu-container')
    if (el) el.style.opacity = '1'
  }, [])

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await getMenuItemsByCategory(active)
        setItems(res.data || []) // backend returns {success, data, ...}
      } catch (err) {
        console.error(err)
        setItems([])
      }
    }
    fetchItems()
  }, [active])

  const filteredItems = Array.isArray(items)
    ? items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    : []

  return (
    <>
      <style>{`
        body { font-family: "Marcellus", "serif"; }
        .menu-container { padding:20px; max-width:1200px; margin:0 auto; background-size:cover; background-position:center;
          border-radius:15px; opacity:0; animation: fadeIn 1s ease-in-out forwards; }
        .menu-header { text-align:center; margin-bottom:30px; color:#8C4126; }
        .tabs { display:flex; justify-content:center; margin-bottom:20px; cursor:pointer; }
        .tab { margin:0 15px; padding:10px 20px; background:transparent; color:#734E40; border-radius:5px; transition: .3s; position:relative;
          text-transform:uppercase; letter-spacing:.15em; text-decoration:none; }
        .tab:after { content:""; display:block; height:2px; width:0; background:#734E40; position:absolute; bottom:-2px; left:50%; transition: width .3s ease, left .3s ease; }
        .tab:hover:after, .tab.active:after { width:100%; left:0; }
        .menu-items { display:flex; flex-wrap:wrap; justify-content:space-between; }
        .menu-item { width:30%; margin-bottom:20px; padding:10px; border-radius:10px; transition: transform .3s; }
        .menu-item:hover { transform: scale(1.05); }
        .menu-item h4 { font-size:18px; color:#8C4126; margin-bottom:5px; }
        .menu-item p { font-size:14px; color:#734E40; margin-bottom:10px; }
        .menu-item .price { font-size:16px; color:#BF8563; }
        .search-bar { margin-bottom:20px; padding:8px; width:300px; border-radius:5px; border:1px solid #ccc; }
        @keyframes fadeIn { to { opacity:1; } }
        @media (max-width: 992px) { .menu-item { width:48%; } }
        @media (max-width: 576px) { .menu-item { width:100%; } }
      `}</style>

      <div className="menu-container">
        <div className="menu-header"><h1>Menu</h1></div>

        <input
          type="text"
          className="search-bar"
          placeholder="Search menu..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="tabs">
          {SECTIONS.map(sec => (
            <div
              key={sec}
              className={`tab ${active === sec ? 'active' : ''}`}
              onClick={() => setActive(sec)}
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </div>
          ))}
        </div>

        <div className="menu-items">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div className="menu-item" key={item._id}>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <span className="price">${item.price.toFixed(2)}</span>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', width: '100%' }}>No items found</p>
          )}
        </div>
      </div>
    </>
  )
}
