import { useEffect, useState } from 'react'

const SECTIONS = ['starters', 'appetizers', 'foods', 'drinks']

export default function Menu() {
  useEffect(() => {
    const el = document.querySelector('.menu-container')
    if (el) el.style.opacity = '1'
  }, [])

  const [active, setActive] = useState('starters')

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
        .menu-section { display:none; }
        .menu-section.active { display:block; }
        .menu-items { display:flex; flex-wrap:wrap; justify-content:space-between; }
        .menu-item { width:30%; margin-bottom:20px; padding:10px; border-radius:10px; transition: transform .3s; }
        .menu-item:hover { transform: scale(1.05); }
        .menu-item h4 { font-size:18px; color:#8C4126; margin-bottom:5px; }
        .menu-item p { font-size:14px; color:#734E40; margin-bottom:10px; }
        .menu-item .price { font-size:16px; color:#BF8563; }
        @keyframes fadeIn { to { opacity:1; } }
        @media (max-width: 992px) { .menu-item { width:48%; } }
        @media (max-width: 576px) { .menu-item { width:100%; } }
      `}</style>

      <div className="menu-container">
        <div className="menu-header"><h1>Menu</h1></div>

        <div className="tabs">
          {SECTIONS.map((sec) => (
            <div
              key={sec}
              className={`tab ${active === sec ? 'active' : ''}`}
              onClick={() => setActive(sec)}
              data-tab={sec}
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </div>
          ))}
        </div>

        {/* Starters */}
        <div className={`menu-section ${active === 'starters' ? 'active' : ''}`} id="starters">
          <div className="menu-items">
            {[
              ['Seared Scallops','With pea purée and crispy pancetta.',18],
              ['Foie Gras','Served with fig jam and toasted brioche.',22],
              ['Truffle Soup','Rich and creamy with a hint of black truffle.',15],
              ['Oysters Rockefeller','Classic preparation with spinach and hollandaise.',20],
              ['Beef Tartare','Hand-cut beef with capers and quail egg.',19],
              ['Crab Cakes','With remoulade and microgreens.',18],
              ['Escargot','In garlic butter and parsley.',16],
              ['Duck Liver Parfait','With toasted brioche and apple chutney.',21],
              ['Gazpacho','Chilled tomato soup with a touch of basil.',12],
            ].map(([name,desc,price])=>(
              <div className="menu-item" key={name}>
                <h4>{name}</h4>
                <p>{desc}</p>
                <span className="price">${price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Appetizers */}
        <div className={`menu-section ${active === 'appetizers' ? 'active' : ''}`} id="appetizers">
          <div className="menu-items">
            {[
              ['Carpaccio','Thinly sliced raw beef with parmesan and arugula.',18],
              ['Grilled Octopus','Served with lemon and paprika.',25],
              ['Spring Rolls','With a sweet chili dipping sauce.',12],
              ['Bruschetta','Tomato, basil, and mozzarella on toasted bread.',10],
              ['Smoked Salmon','With dill cream cheese and capers.',17],
              ['Stuffed Mushrooms','With garlic and herb cheese.',14],
              ['Calamari','Fried with lemon and aioli.',15],
              ['Prosciutto and Melon','With balsamic reduction.',16],
              ['Goat Cheese Tart','With caramelized onions and thyme.',14],
            ].map(([name,desc,price])=>(
              <div className="menu-item" key={name}>
                <h4>{name}</h4>
                <p>{desc}</p>
                <span className="price">${price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Foods */}
        <div className={`menu-section ${active === 'foods' ? 'active' : ''}`} id="foods">
          <div className="menu-items">
            {[
              ['Grilled Salmon','Served with a side of seasonal vegetables.',25],
              ['Beef Wellington','With mushroom duxelles and red wine jus.',35],
              ['Risotto','Creamy risotto with wild mushrooms and truffle oil.',22],
              ['Roast Chicken','With rosemary potatoes and jus.',28],
              ['Filet Mignon','With garlic mashed potatoes and asparagus.',40],
              ['Lamb Chops','Served with mint sauce and roasted vegetables.',38],
              ['Vegetarian Pasta','With seasonal vegetables and marinara sauce.',20],
              ['Seafood Paella','With saffron rice, shrimp, and mussels.',30],
              ['Chicken Alfredo','Creamy alfredo sauce with grilled chicken.',22],
            ].map(([name,desc,price])=>(
              <div className="menu-item" key={name}>
                <h4>{name}</h4>
                <p>{desc}</p>
                <span className="price">${price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Drinks */}
        <div className={`menu-section ${active === 'drinks' ? 'active' : ''}`} id="drinks">
          <div className="menu-items">
            {[
              ['Țuică de prune','Homemade plum brandy 50% alc/vol',12],
              ['Old Fashioned','Bourbon, bitters, and a twist of orange.',12],
              ['Margarita','Tequila, lime juice, and triple sec.',11],
              ['Espresso Martini','Vodka, coffee liqueur, and espresso.',13],
              ['Negroni','Gin, Campari, and sweet vermouth.',12],
              ['Pina Colada','Rum, coconut cream, and pineapple juice.',10],
              ['Moscow Mule','Vodka, ginger beer, and lime.',11],
              ['Whiskey Sour','Whiskey, lemon juice, and simple syrup.',12],
              ['Ursus','Romanian pale lager with a crisp, refreshing finish.',10],
            ].map(([name,desc,price])=>(
              <div className="menu-item" key={name}>
                <h4>{name}</h4>
                <p>{desc}</p>
                <span className="price">${price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="spacing"></div>
      <div className="spacing"></div>
    </>
  )
}
