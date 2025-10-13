const BASE = import.meta.env.VITE_API_BASE || ''
export async function getMenuItems(){
  const r=await fetch(`${BASE}/api/menu-items`)
  if(!r.ok) throw new Error('menu error')
  return r.json()
}
export async function createReservation(data){
  const r=await fetch(`${BASE}/api/reservation`,{
    method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)
  })
  if(!r.ok) throw new Error('reservation error')
  return r.json()
}
