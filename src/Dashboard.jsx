import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from 'axios';
import { useUser } from "./Context";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button"

const Arr_img = ({ data, setFunction }) => {
  const string = `data:image/png;base64, ${data.imageUrl}`;
  return (
    <>
      <img src={string} className="h-[15vh] w-[13vh] rounded-md" alt="Image Description" onClick={() => {
        setFunction(data.imageUrl);
      }} />
    </>
  );
}

export default function Dashboard() {

  const [cloth, setCloth] = useState(null);
  const [person, setPerson] = useState(null);
  const [result, setResult] = useState(null);

  const [clothArray, setClothArray] = useState([]);
  const [personArray, setPersonArray] = useState([]);

  const [clothIsLoading, setClothIsLoading] = useState(true);
  const [personIsLoading, setPersonIsLoading] = useState(true);
  const [resultIsLoading, setResultIsLoading] = useState(false);

  const { userInfo, Auth } = useUser();

  useEffect(()=>{
    const getPersonAuth = async() => {
      if(Auth){
        try{
          setPersonIsLoading(true);
          const response = await axios.get('/person');
          if(response.status == 200){
            setPersonArray(response.data);
            setPersonIsLoading(false);
          }
        } catch(e){
          setClothIsLoading(false);
          console.log("error in fetching defaulth person");
          console.log(e);
        }
      }
    }
    getPersonAuth();
  },[Auth])

 useEffect(()=>{
    const getClothAuth = async() => {
      if(Auth){
        try{
          setClothIsLoading(true);
          const response = await axios.get('/clothes');
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
    }
    getClothAuth();
  },[Auth])

  useEffect(()=>{
    const getPersonNoAuth = async() => {
      if(!Auth){
        try{
          setPersonIsLoading(true);
          const response = await axios.get('/default/person');
          if(response.status == 200){
            setPersonArray(response.data);
            console.log(response);
            setPersonIsLoading(false);
          }
        } catch(e){
          setPersonIsLoading(false);
          console.log("error in fetching defaulth person");
          console.log(e);
        }
      }
    }
    getPersonNoAuth();
  },[Auth])

  useEffect(()=>{
    const getClothNoAuth = async() => {
      if(!Auth){
        try{
          setClothIsLoading(true);
          const response = await axios.get('/default/clothes');
          if (response.status == 200) {
            setClothArray(response.data);
            setClothIsLoading(false);
          }
        } catch (e) {
          setClothIsLoading(false);
          console.log("error in fetching default clothes");
          console.log(e);
        }
      } 
    }
   getClothNoAuth();
  },[Auth])

  const handlePredict = async() => {
    try{
      if(!cloth || !person){
        return;
      }
      setResult(null);
      setResultIsLoading(true);
      const response = await axios.post('/predict',{
        image : person,
        cloth: cloth
      });
      if(response.status === 200){
        setResultIsLoading(false);
        setResult(response.data.image);
      } 
    } catch(e){
      setResultIsLoading(false);
      console.log("error in doing prediction");
      console.log(e);
    }
  } 

  return (
    <>
      <div className="sm:grid grid-cols-2 gap-2 p-2 m-2">
        <div className="grid grid-rows-2 gap-4">
          <div className="grid sm:grid-cols-2 gap-2 p-2 sm:h-[45vh]">
            <div className="border-2 border-dashed h-[46vh] rounded-lg flex flex-row items-center justify-center">
              {person && (
                <img className="max-w-full rounded-lg h-[45vh]" src={`data:image/png;base64, ${person}`} />
              )}
            </div>
            {
              personIsLoading ? (
                <div className="flex flex-row justify-center items-center">
                  <ClipLoader color='black' loading={personIsLoading} size={50} />
                </div>
              ) :
                <div className="sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:w-full flex flex-row flex-grow gap-2 items-start p-2 overflow-y-auto sm:overflow-x-auto">
                  {personArray.map((item, index)=>(<Arr_img key={index} data={item} setFunction={setPerson}/>))}
                  <div className="h-[15vh] sm:w-[13vh] sm:flex-initial flex-none w-[11vh]"> 
                    <div className="flex flex-row items-center justify-center border-2 rounded-lg h-full">
                      <FontAwesomeIcon icon={faPlus}/>
                    </div>
                  </div>
                </div>
            }
          </div>
          <div className="grid sm:grid-cols-2 gap-2 p-2 sm:h-[45vh]">
            <div className="border-2 border-dashed h-[46vh] rounded-lg flex flex-row items-center justify-center">
              {cloth && (
                <img className="h-[45vh] max-w-full lounded-lg" src={`data:image/png;base64, ${cloth}`} />
              )}
            </div>
            {
              clothIsLoading ? (
                <div className="flex justify-center items-center">
                  <ClipLoader color='black' loading={clothIsLoading} size={50} />
                </div>
              ) :
                <div className="sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:w-full flex flex-row flex-grow gap-2 items-start p-2 overflow-y-auto sm:overflow-x-auto">
                  {clothArray.map((item, index)=>(<Arr_img key={index} data={item} setFunction={setCloth}/>))}
                  <div className="h-[15vh] sm:w-[13vh] sm:flex-initial flex-none w-[11vh]">
                    <div className="flex flex-row items-center justify-center border-2 h-full rounded-lg">
                      <FontAwesomeIcon icon={faPlus}/>
                    </div>
                  </div>
                </div>
            }
          </div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-3">
          <div className="border-2 h-[47vh] flex flex-row items-center justify-center rounded-lg w-[40vh]">
        {
          resultIsLoading ? (
                <div className="flex justify-center items-center">
                  <ClipLoader color='black' loading={setResultIsLoading} size={50} />
                </div>
              ) :
            result && (
              <img className="h-[47vh] rounded-lg" src={`data:image/png;base64, ${result}`} />
            )
        }
        </div>
          <Button onClick={handlePredict}>Submit</Button>
        </div>
      </div>
    </>
  )
}
