import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Paneer Bhurji',
//         description: 'Scrambled paneer',
//         price: 139.00,
//     },
//     {
//         id: 'm2',
//         name: 'Kadhai Soya Chaap',
//         description: 'Vegetarian food prepared with soyabean chunks and curry',
//         price: 149.00,
//     },
//     {
//         id: 'm3',
//         name: 'Malai Kofta',
//         description: 'Fried balls with cream',
//         price: 119.00,
//     },
//     {
//         id: 'm4',
//         name: 'Mix Veg',
//         description: 'Diced vegetables cooked on low heat for long time',
//         price: 99.00,
//     },
// ];
const ErrorCustomStyles = {
    color: "red",
    textAlign: "center"
}
const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    useEffect(() => {
        // setIsLoading(true);
        fetch('https://foodcart-b8675-default-rtdb.firebaseio.com/meals.json').then((response) => {
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            return response.json();
        })
            .catch((err) => {
                setIsLoading(false);
                setHttpError(err.message);
            }).then((data) => {
                const loadedMeals = [];
                for (const key in data) {
                    loadedMeals.push({
                        id: key,
                        name: data[key].name,
                        description: data[key].description,
                        price: data[key].price
                    })
                }
                setMeals(loadedMeals);
                setIsLoading(false);
            });


    }, [])

    const mealsList = meals.map(meal =>
        <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />
    );
    return (
        <section className={classes.meals}>
            {httpError ? <div style={ErrorCustomStyles}>{httpError}</div> : (
                <Card>
                    {
                        isLoading ? <p>Loading...</p> : <ul>{mealsList}</ul>
                    }

                </Card>
            )}

        </section>
    )
}
export default AvailableMeals;