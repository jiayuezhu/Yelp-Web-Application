import React, {useEffect, useContext} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useNavigate } from 'react-router-dom';


const RestaurantList = () => {
    
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    let nav = useNavigate();
    const fetchRestaurants = async() => {
        try {
            const response = await RestaurantFinder.get("/");
            console.log(response.data);
            setRestaurants(response.data.data.restaurant);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchRestaurants();
    }, [setRestaurants]);

    const handleDelete = async (e, id) => {
        e.stopPropagation(); 
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation(); // when this button is clicked, 
        // it prevents the propagation up to the <tr>, which deals with the detail page
        try {
            nav(`/restaurants/${id}/update`);
        } catch (err) {
            console.log(err);
        }
    }

    const handleRestaurantSelect = (id) => {
        nav(`/restaurants/${id}`);
    }

  return (
    <div className='list-group'>
        <table className="table table-hover">
            <thead className="table-primary">
                <tr>
                    <th scope="col">Restaurant</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody className="table-dark">
                {restaurants && restaurants.map(element => {
                return(
                    <tr key={element.id} onClick={() => handleRestaurantSelect(element.id)}>
                        <td>{element.name}</td>
                        <td>{element.location}</td>
                        <td>{"$".repeat(element.price_range)}</td>
                        <td>reviews</td>
                        <td>
                            <button onClick={(e) => handleUpdate(e, element.id)} className="btn btn-warning">Update</button>
                        </td>
                        <td>
                            <button onClick={(e) => handleDelete(e, element.id)} className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList