import { BrowserRouter } from "react-router-dom";

import { CarritoProvider } from "./context/CarritoContext";

import AppContent from "./AppContent";



function App() {

 return (

  <CarritoProvider>

   <BrowserRouter>

    <AppContent />

   </BrowserRouter>

  </CarritoProvider>

 );

}



export default App;

