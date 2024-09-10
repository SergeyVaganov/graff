export interface ServerToClientEvents {
    message:(data:MessageData) => void
    disconnectMessage:(id:string)=>void
    
  }
  
export interface ClientToServerEvents {
      message:(data:MessageData) => void
  }
    
  
export interface MessageData {
    text:string, 
    name:string, 
    id:string
    chat:string 
  }


