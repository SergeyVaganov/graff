import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";


function useGetName(initialName:string) { 								
    const [name, setName] = useState<string>(initialName);
    const [searchParams, _] = useSearchParams();

    useEffect(()=>{
        const firstname = searchParams.get("name") ?? ''
        const surname = searchParams.get("surname") ?? ''
        if (firstname+surname){
            setName(firstname + ' ' + surname)
        }
    },[])

													
    return name;								 
} 																							

export default useGetName; 