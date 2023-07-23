import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';
import { Navigate } from 'react-router-dom';

const UpdateRestaurant = (props) => {
    const {id} = useParams();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [price_range, setPriceRange] = useState("");
    const nav = useNavigate();

    useEffect(() => {
        const fetchData = async() => {
            const response = await RestaurantFinder.get(`/${id}`);
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);
        };
        
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const UpdateRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range
        });
        nav('/');
    }

  return (
    <div>
        <form action="">
            <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" className="form-control" type="text"
            value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="form-group">
            <label htmlFor="location">Location</label>
            <input id="location" className="form-control" type="text" 
            value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>

            <div className="form-group">
            <label htmlFor="price_range">Price Range</label>
            <input id="price_range" className="form-control" type="text" 
            value={price_range} onChange={(e) => setPriceRange(e.target.value)}/>
            
            <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateRestaurant