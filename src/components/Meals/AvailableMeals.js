import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Paneer Bhurji',
        description: 'Scrambled paneer',
        price: 139.00,
    },
    {
        id: 'm2',
        name: 'Kadhai Soya Chaap',
        description: 'Vegetarian food prepared with soyabean chunks and curry',
        price: 149.00,
    },
    {
        id: 'm3',
        name: 'Malai Kofta',
        description: 'Fried balls with cream',
        price: 119.00,
    },
    {
        id: 'm4',
        name: 'Mix Veg',
        description: 'Diced vegetables cooked on low heat for long time',
        price: 99.00,
    },
];
const AvailableMeals = () => {
    const mealsList = DUMMY_MEALS.map(meal =>
        <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />
    );
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}
export default AvailableMeals;