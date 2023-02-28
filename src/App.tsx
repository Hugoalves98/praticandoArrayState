import { useEffect, useState } from "react"

interface Carro {
  id: number
  marca: string
  preco: string
  modelo: string
  check: boolean
}

function App() {
  
const [carros,setCarros] = useState<Carro[]>([
  { id: 1 , marca: "honda", preco: "10000", modelo: "civic", check: false},
  { id: 2, marca: "land rover", preco: "40000", modelo: "evoque", check: false},
  { id: 3, marca: "ferrari", preco: "200000", modelo: "spider", check: false},
  { id: 4, marca: "audi", preco: "80000", modelo: "A3", check: false},
])

const[marca, setMarca]   = useState('')
const[preco, setPreco]   = useState('')
const[modelo, setModelo] = useState('')

const [pesquisaMarca, setPesquisaMarca] = useState('')

const [carrosPesquisados, setCarrosPesquisados] = useState<Carro[]>([])


 useEffect(() => {

  setCarrosPesquisados(carros.filter(car => car.marca === pesquisaMarca))

 }, [pesquisaMarca, carros])
 
 function SelecionarCheckBox(id: number) {
  const carUpdate = carros.map(carro => {
    if ( carro.id === id ) {
      carro.check = !carro.check
    }
    return carro
  })
  setCarros(carUpdate)
  console.log(carUpdate)
 }

 const deletaCarro = () => {
  console.log( carros)
  setCarros(carros.filter( car => car.check === false))
}

const addNewCar = () => {
  setCarros([...carros, {
    id: carros.length +1,
    marca,
    preco,
    modelo,
    check: false
  }])
  setMarca('')
  setPreco('')
  setModelo('')
}

  return (
    <div style={ { backgroundColor: 'darkgreen' }}>
      
      <div style={{ padding: "1rem" , display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
        <label>Marca:</label>
        <input value={marca} onChange={event => setMarca(event.target.value)}></input>
        <label>Preco:</label>
        <input value={preco} onChange={event => setPreco(event.target.value)}></input>
        <label>Modelo:</label>
        <input value={modelo} onChange={event => setModelo(event.target.value)}></input>
        <button 
          style={{ marginLeft: "0.5rem", marginTop: "0.5rem" }}
          onClick={addNewCar}
        >
          Add car
        </button>
      </div>

        <table style={{ }}>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Preço</th>
            <th>Msodelo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
        { pesquisaMarca.length > 0 ? carrosPesquisados.map ( (carros) => 
          <tr key={carros.id}>
            <td>{carros.marca}</td>
            <td>{carros.preco}</td>
            <td>{carros.modelo}</td>
            <td>
              <input 
                type="checkbox" 
                onChange={() => SelecionarCheckBox(carros.id)}
              />
            </td>
          </tr>
          )
          :
          carros.map ( (carros) => 
          <tr key={carros.id}>
            <td>{carros.marca}</td>
            <td>{carros.preco}</td>
            <td>{carros.modelo}</td>
            <td>
              <input
                type="checkbox"
                onChange={() => SelecionarCheckBox(carros.id)}
              />
            </td>
          </tr>
          ) 
        }
        </tbody>
       
        <button 
          style={{ margin: "10px", backgroundColor: 'red', color: "white" }}
          onClick={deletaCarro}
        >
          Apague os checked
        </button>
      </table>
      
      <div style={ { padding: "1rem", backgroundColor: 'yellow' }}>
        <label style={ { marginRight: '5px' }}>Pesquise sua marca:</label>
        <input
          placeholder="Digite uma marca"
          onChange={ (evento => setPesquisaMarca(evento.target.value) ) }
        />
      </div>
    </div>
  )
}

export default App
