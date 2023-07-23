import React, {useState} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { useNavigate, useParams } from 'react-router-dom';

const AddReview = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const [name, setName] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState('Rating');

    const handleSubmitReview = async (e) => {
        // e.preventDefault();
        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`, {
                name,
                comment: reviewText,
                rating
            });
            console.log(response);
            nav(`/${id}`);
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div className="mb-2">
        <form action="">
            <div className="form-group col-8">
                <label htmlFor="name">Name</label>
                <input value={name} onChange={e => setName(e.target.value)}
                id="name" placeholder="name" type="text" className="form-control" />
            </div>
            <div className="form-group col-4">
                <label htmlFor="rating">Rating</label>
                <select id="" className="custom-select" value={rating} onChange={e => setRating(e.target.value)}>
                    <option disabled>Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor="Review">Review</label>
                <textarea name="" id="" className='form-control' value={reviewText} onChange={e => setReviewText(e.target.value)}></textarea>
            </div>
            <button className="btn btn-primary" onClick={handleSubmitReview} type="submit">Submit</button>
        </form>

    </div>
  )
}

export default AddReview;