import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdatePage from "./routes/UpdatePage";
import { RestaurantContextProvider } from "./context/RestaurantsContext";

const App = () => {
    return (
    <RestaurantContextProvider>
        <div className="container">
            <Router>
                {/* prevent react router loading multiple components */}
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/restaurants/:id/update" element={<UpdatePage />}/>
                    <Route path="/restaurants/:id" element={<RestaurantDetailPage />}/>
                </Routes>
            </Router>
        </div>
    </RestaurantContextProvider> 
    )
}

export default App;
