import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function App() {
  return (
    <>
      <div className="grid grid-cols-2 h-screen w-screen gap-2 p-2">
        <div className="grid grid-rows-2 gap-2">
          <div className="grid grid-cols-2 gap-2 p-2">
            <div className="h-full border-2 border-dashed rounded-lg flex flex-row items-center justify-center">
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div className="border">
            </div>
          </div> 
          <div className="grid grid-cols-2 gap-2 p-2"> 
            <div className="h-full border-2 border-dashed rounded-lg flex flex-row items-center justify-center">
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div className="border">
            </div>
          </div> 
        </div> 
        <div className="border-2">
        </div>
      
      </div> 
    </>
   )
}
