import { useNavigate } from "react-router-dom"


const Header = () => {
  const nav = useNavigate()

  const navItems = [
    {
      id: 2,
      title: "Búsqueda",
      path:"/"
    },
    {
      id: 0,
      title: "Servicios",
      path: "/services"
    },
    {
      id: 1,
      title: "Autos",
      path: "/cars"
    }
  ]

  return (
    <div className="w-full h-[50px] p-[15px] flex justify-between align-center border-b-2 px-[50px]">
      <div>
        <h1 className="font-bold text-blue-950">Gestión de Servicios de Mantenimiento</h1>
      </div>
      <div>
        <h1 className="text-blue-950">Daniela Mondragón</h1>
      </div>
      <div className="flex gap-[30px]">
        {
          navItems.map((item) => (
            <div key={item.id} onClick={() => { nav(item.path) }} className="text-blue-950 hover:cursor-pointer hover:text-blue-500 ">
              <p>
                {item.title}
              </p>
            </div>
          ))
        }
      </div>
    </div>

  )
}
export default Header
