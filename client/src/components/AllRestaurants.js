import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import DeleteRestaurant from './DeleteRestaurant';
import Header from './Header';
import _ from 'lodash';

const AllRestaurants = (props) =>{
    const [ errors, setErrors ] = useState({});
    const [ user, setUser ] = useState({});

    //set state for list of all restaurants
    const [ restaurantList, setRestaurantList] = useState([]);
    const [ isAscendingOrder, setIsAscendingOrder] = useState({
        name: false,
        category: false,
        rating: false,
        addedBy: false
    });

    //useEffect renders when the page loads and when the state changes
    //all of this in useEffect is an asynchronous operation
    useEffect(() => {
        axios.get('http://localhost:8000/api/restaurants', 
        AllRestaurants,
        {withCredentials: true})
            .then((res) =>{
                console.log(res);
                console.log(res.data);
                setUser(res.data);
                setRestaurantList(res.data);
            })
            .catch((err)=> {
                console.log(err);
                console.log(err.response.data.errors);
                if(err.response.status === 401){
                    console.log("No user logged in.  Invalid Attempt to Edit")
                    navigate("/");
                }
                if(err.response.data.errors){
                    setErrors(err.response.data.errors);
                }
            })

    }, [])

    //sorting with lodash.com
    const orderByHandler = (e) => {
        let orderBy = e.currentTarget.name;
        let orderList = restaurantList;
        console.log(orderList);

        if(orderBy === "name"){
            if(!isAscendingOrder.name)
                orderList = _.orderBy(restaurantList, ['name'], ['desc'])
            else
                orderList = _.orderBy(restaurantList, ['name'], ['asc'])
            setIsAscendingOrder({...setIsAscendingOrder, name:!isAscendingOrder.name});
        }
        else if(orderBy === "category"){
            if(!isAscendingOrder.category)
                orderList = _.orderBy(restaurantList, ['category'], ['desc'])
            else
                orderList = _.orderBy(restaurantList, ['category'], ['asc'])
            setIsAscendingOrder({...setIsAscendingOrder, category:!isAscendingOrder.category});
        }
        else if(orderBy === "rating"){
            if(!isAscendingOrder.rating)
                orderList = _.orderBy(restaurantList, ['rating'], ['desc'])
            else
                orderList = _.orderBy(restaurantList, ['rating'], ['asc'])
            setIsAscendingOrder({...setIsAscendingOrder, rating:!isAscendingOrder.rating});
        }
        else if(orderBy === "addedBy"){
            if(!isAscendingOrder.addedBy)
                orderList = _.orderBy(restaurantList, ['addedBy'], ['desc'])
            else
                orderList = _.orderBy(restaurantList, ['addedBy'], ['asc'])
            setIsAscendingOrder({...setIsAscendingOrder, addedBy:!isAscendingOrder.addedBy});
        }
        console.log(orderList);
        setRestaurantList(orderList);
    };

    return(
        <body>

        <div className="body">
            <Header/>
            <h2>Favorite Restaurants </h2>
            <table className="table-sortable" style={{borderCollapse: "collapse", width: "100%"}} >
                    <tr className="tableHeadRow2">
                        <th><button name="name" onClick={ orderByHandler } className="headerRowBtn">Restaurant Name<small>&#9660;&#9650;</small></button></th>
                        <th><button name="category" onClick={ orderByHandler } className="headerRowBtn">Cuisine<small>&#9660;&#9650;</small></button></th>
                        <th>Website</th>
                        <th><button name="rating" onClick={ orderByHandler } className="headerRowBtn">Rating<small>&#9660;&#9650;</small></button></th>
                        <th><button name="addedBy" onClick={ orderByHandler } className="headerRowBtn">Added By<small>&#9660;&#9650;</small></button></th>
                        <th>Actions</th>

                    </tr>
                    <tbody>
                    {
                        restaurantList.map((restaurant, index) => (
                            <tr key={index}>
                                <td><Link to={`/restaurant/${restaurant._id}`}>{restaurant.name}</Link></td>
                                <td>{restaurant.category}</td>
                                <td><a href={restaurant.website} target="_blank" rel="noreferrer">{restaurant.website}</a></td>  {/* <-- how to make this link to the restaurant's website */}
                                    {/* //this is a ternary operator */}
                                <td style={{fontSize: "14px", color: "rgb(255, 187, 0)"}}>

                                    {
                                        restaurant.rating === 1?
                                        <p>&#9733;</p>
                                        :null
                                    }
                                        {
                                            restaurant.rating === 2?
                                            <p>&#9733;&#9733;</p>
                                            :null
                                        }
                                            {
                                                restaurant.rating === 3?
                                                <p>&#9733;&#9733;&#9733;</p>
                                                :null
                                            }
                                                {
                                                    restaurant.rating === 4?
                                                    <p>&#9733;&#9733;&#9733;&#9733;</p>
                                                    :null
                                                }
                                                    {
                                                        restaurant.rating === 5?
                                                        <p>&#9733;&#9733;&#9733;&#9733;&#9733;</p>
                                                        :null
                                                    }
                                </td>
                                <td><Link to={`/user/profile/${restaurant.user_id?._id}`}>{restaurant.user_id?.username}</Link></td>  {/*user.username not working*/}
                                <td style={{border: "0px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Link to={`/restaurant/edit/${restaurant._id}`}><button>EDIT</button></Link>&nbsp;
                                    <DeleteRestaurant 
                                        id={restaurant._id} 
                                        restaurantList={restaurantList} 
                                        setRestaurantList={setRestaurantList}
                                    />
                                </td>

                            </tr>
                        ))
                    }
                    </tbody>
            </table>
        </div>
    </body>
    )
}

export default AllRestaurants;