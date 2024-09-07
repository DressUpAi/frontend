import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from 'axios';
import {useUser}  from "./Context";
import { useEffect, useState } from "react";


const Arr_img = ({base64_data, setFunction}) => {
  const string = `data:image/png;base64, ${base64_data}`;
  return (
    <>
      <img src={string} className="h-[15vh] w-[13vh] rounded-md" alt="Image Description" onClick={()=>{
        setFunction(base64_data);
      }}/>
    </>
  );
}

export default function Dashboard() {
 
  const [cloth, setCloth] = useState(null);
  const [person, setPerson] = useState(null);
  const [clothArray, setClothArray] = useState([]);
  const [personArray, setPersonArray] = useState([]);
  const { userInfo } = useUser();

  return (
    <>
      <div className="grid grid-cols-2 h-screen w-screen gap-2 p-2">
        <div className="grid grid-rows-2 gap-2">
          <div className="grid grid-cols-2 gap-2 p-2">
            <div className="h-[47vh] border-2 border-dashed rounded-lg flex flex-row items-center justify-center">
              {cloth && (
                <img  className="h-[47vh] rounded-lg" src={`data:image/png;base64, ${cloth}`} />
              )} 
            </div>
            <div className="grid grid-cols-3 overflow-auto h-[47vh] gap-2 p-2">
              {clothArray.map((item, index)=>(<Arr_img key={index} base64_data={item} setFunction={setCloth}/>))}
              <div className="h-[15vh] w-[13vh] border-2 rounded-md flex flex-row justify-center items-center">
                <FontAwesomeIcon icon={faPlus}/>
              </div>
            </div>
          </div> 
          <div className="grid grid-cols-2 gap-2 p-2"> 
            <div className="h-[47vh] border-2 border-dashed rounded-lg flex flex-row items-center justify-center">
              {person&& (
                <img  className="h-[47vh] rounded-lg" src={`data:image/png;base64, ${cloth}`} />
              )} 
            </div>
            <div className="grid grid-cols-3 overflow-auto h-[47vh] gap-2 p-2">
              {personArray.map((item, index)=>(<Arr_img key={index} base64_data={item} setFunction={setCloth}/>))}
              <div className="h-[15vh] w-[13vh] border-2 rounded-md flex flex-row justify-center items-center">
                <FontAwesomeIcon icon={faPlus}/>
              </div>
            </div>
          </div> 
        </div> 
        <div className="border-2">
        </div>
      
      </div> 
    </>
   )
}
