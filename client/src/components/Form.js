import React from 'react';

const Form = (props) =>{



    // submit handler will either = editRestaurantHandler ORRR newSubmitHandler
    // based upon which value it was given when it was passed as a prop. 
    const {submitHandler, buttonText, restaurant, setRestaurant, errors} = props;

    // keeps us from needing to repeat
    const newChangeHandler = (e) => {
        let newStateObject = {...restaurant};
        newStateObject[e.target.name] = e.target.value;
        console.log(e.target);
        setRestaurant(newStateObject);
        }

    return(
        //will equal editRestaurantHandler ORRR newSubmitHandler
        //depending on which component is rendering and sending it down
    <form onSubmit={submitHandler}>
        <div className="container">
            <div>
                <label htmlFor="name"><strong>Restaurant Name</strong></label><br/>
                <input onChange={newChangeHandler} name="name" placeholder="Enter Restaurant's name." type="text" value={restaurant.name} />
                    {
                        errors.name ?
                        //change to className error-text
                        <span style={{backgroundColor: "yellow", color: "red"}}>{errors.name.message}</span>
                        : null
                    }
            </div>


            <div>
                <label htmlFor="category"><strong>Type</strong></label><br/>
                <input onChange={newChangeHandler} name="category" placeholder="Enter Type of Restaurant" type="text" value={restaurant.category} />
                    {
                        errors.category ?
                        //change to className error-text
                        <span style={{backgroundColor: "yellow", color: "red"}}>{errors.category.message}</span>
                        : null
                    }
            </div>


            <div>
                <label htmlFor="website"><strong>Website</strong></label><br/>
                <input onChange={newChangeHandler} name="website" placeholder="Enter Restaurant's Website" type="url" value={restaurant.website} />
                    {
                        errors.website ?
                        //change to className error-text
                        <span style={{backgroundColor: "yellow", color: "red"}}>{errors.website.message}</span>
                        : null
                    }
            </div>

            <div>
                <label htmlFor="rating"><strong>Rating</strong></label><br/>
                <select onChange={newChangeHandler} name="rating" value={restaurant.rating} >
                    <option value="none" defaultValue hidden>Select Rating</option>
                    <option value="1">1</option>{/*which one to use for the star &#9733; or &#9733; */}
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                {
                    errors.rating ?
                    //change to className error-text
                    <span style={{backgroundColor: "yellow", color: "red"}}>{errors.rating.message}
                    </span>
                    : null
                }
            </div>

            <button className="submitBtn" >{buttonText}</button>

        </div>
    </form>



    )

}

export default Form;