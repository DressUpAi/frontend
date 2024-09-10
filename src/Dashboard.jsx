import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from 'axios';
import {useUser}  from "./Context";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"

const Arr_img = ({data, setFunction}) => {
  const string = `data:image/png;base64, ${data.imageUrl}`;
  return (
    <>
      <img src={string} className="h-[15vh] w-[13vh] rounded-md" alt="Image Description" onClick={()=>{
        setFunction(data.imageUrl);
      }}/>
    </>
  );
}

export default function Dashboard() {

  const [cloth, setCloth] = useState(null);
  const [person, setPerson] = useState(null);
  const [result, setResult] = useState(null);

  const [clothArray, setClothArray] = useState([]);
  const [personArray, setPersonArray] = useState([]);

  const [clothIsLoading, setClothIsLoading] = useState(false);
  const [personIsLoading, setPersonIsLoading] = useState(false);

  const { userInfo, Auth } = useUser();

  //TODO
  // useEffect(()=>{
  //   const getClothData = async() => {
  //     if(!Auth){
  //       try{
  //         const response = await axios.get('/default/clothes');
  //         if(response.status == 200)
  //           setClothArray(response.data);
  //       } catch(e){
  //         console.log("error in fetching default clothes");
  //         console.log(e);
  //       }
  //       try{
  //         const response = await axios.get('/default/person');
  //         if(response.status == 200)
  //           setPersonArray(response.data);
  //       } catch(e){
  //         console.log("error in fetching defaulth person");
  //         console.log(e);
  //       }
  //     }else{
  //                   } 
  //   }
  //   getClothData();
  // },[])

  useEffect(()=>{
    if(!Auth){
      const getClothNoAuth = async() => {
        try{
          setClothIsLoading(true);
          const response = await axios.get('/default/clothes');
          if(response.status == 200){
            setClothArray(response.data);
            setClothIsLoading(false);
          }
        } catch(e){
          setClothIsLoading(false);
          console.log("error in fetching default clothes");
          console.log(e);
        }
      }
      getClothNoAuth();
    }
  },[])

  useEffect(()=>{
    if(!Auth){
      const getPersonNoAuth = async() => {
        try{
          setPersonIsLoading(true);
          const response = await axios.get('/default/person');
          if(response.status == 200){
            setPersonArray(response.data);
            setPersonIsLoading(false);
          }
        } catch(e){
          setPersonIsLoading(false);
          console.log("error in fetching defaulth person");
          console.log(e);
        }
      }
      getPersonNoAuth();
    }
  },[])

  return (
    <>
      <div className="sm:grid grid-cols-2 gap-2 p-2 m-2"> 
        <div className="grid grid-rows-2 gap-4">
          <div className="grid sm:grid-cols-2 gap-2 p-2 sm:h-[45vh]">
            <div className="border-2 border-dashed h-[46vh] rounded-lg flex flex-row items-center justify-center"> 
              {cloth && (
                <img className="h-[45vh] max-w-full lounded-lg" src={`data:image/png;base64, ${cloth}`} />
              )} 
            </div>
            <div className="sm:grid sm:grid-cols-3 flex flex-row gap-2 p-2 overflow-y-auto sm:overflow-x-auto">
              {
                clothIsLoading ? <div>Loading</div> : <>
                  {clothArray.map((item, index)=>(<Arr_img key={index} data={item} setFunction={setCloth}/>))}
                  <div className="h-[15vh] w-[13vh] border-2 rounded-md flex flex-row justify-center items-center">
                    <FontAwesomeIcon icon={faPlus}/>
                  </div>
                </>
              }
            </div>
          </div> 
          <div className="grid sm:grid-cols-2 gap-2 p-2 sm:h-[45vh]"> 
            <div className="border-2 border-dashed h-[46vh] rounded-lg flex flex-row items-center justify-center">
              {person && (
                <img  className="max-w-full rounded-lg h-[45vh]" src={`data:image/png;base64, ${person}`} />
              )} 
            </div>
            <div className="sm:grid sm:grid-cols-3 flex flex-row gap-2 p-2 overflow-y-auto sm:overflow-x-auto">
              {
                personIsLoading ? <div>Loading</div> :  <>
                  {personArray.map((item, index)=>(<Arr_img key={index} data={item} setFunction={setPerson}/>))}
                  <div className="h-[15vh] w-[13vh] border-2 rounded-md flex flex-row justify-center items-center">
                    <FontAwesomeIcon icon={faPlus}/>
                  </div>
                </>

              }            
            </div>
          </div> 
        </div> 
        <div className="flex flex-col justify-center items-center space-y-3">
          <div className="border-2 h-[47vh] rounded-lg w-[40vh]">
            {result && (
              <img className="h-[47vh] rounded-lg" src={`data:image/png;base64, ${cloth}`} />
            )}
          </div>
          <Button>Submit</Button>
        </div> 
      </div> 
    </>
  )
}
