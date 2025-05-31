import './App.css'
import burgerPic from './assets/burger.jpg'
import {useState, useEffect} from "react";

const meals = ['Pasta', 'Pizza', 'Burger', 'Salad', 'Sushi', 'Tacos', 'Falafel'];

const mealsList = meals.map((name, index) => ({
    id: index,
    name: name
}));


function Header({restaurantName}) {
    return (
        <header>
            <h1>Welcome to {restaurantName} Restaurant</h1>
        </header>
    );
}

function MealsList({mealsList}) {
    return (
        <ul>
            {mealsList.map((meal) => (
                <li key={meal.id} style={{listStyleType: 'none'}}>
                    {meal.name}
                </li>
            ))}
        </ul>
    );
}

function App() {

    const [state, setState] = useState("Opens");
    console.log("j");
    return (

        <div>
            <FetchData/>
            <Comments/>
            <Header restaurantName="Joud's"/>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around',}}>

                <h5>Our Restaurant is {state}</h5>
                <button onClick={() => setState(state === "Opens" ? "Closed" : "Opens")}>Toggle</button>

            </div>

            <img src={burgerPic} alt={'Burger Photo'}/>
            <MealsList mealsList={mealsList}/>
            <LiveInput/>

            <Footer/>
        </div>
    );
}

function Footer() {
    return (
        <footer>
            <p>© {new Date().getFullYear()} My Restaurant App</p>
        </footer>
    );
}

function FetchData() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("https://my-json-server.typicode.com/typicode/demo/posts")
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setLoading(false);

            })


            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false)
            });

    }, []);
    console.log(posts);

    if (loading) {
        return <p>Loading...</p>;
    }


    return (
        <ul>

            {posts.map((post, index) => <li key={index}>{post.id} {post.title}</li>)}

        </ul>


    );


}

function LiveInput() {
    const [text, setText] = useState('');

    return (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h2>You typed: {text}</h2>
            <input
                type="text"
                placeholder="Type something..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{padding: '8px', fontSize: '16px'}}
            />
        </div>
    );
}

function Comments() {

    const [comments, setComments] = useState([]);
    useEffect(() => {
            fetch("https://jsonplaceholder.typicode.com/comments")
                .then(response => response.json())
                .then(data => setComments(data))
        }, []
    )
    //console.log(comments);


    return (
        <ul>
            {comments.slice(0,10).map((comment, index) => (
                    <li key={index}>

                        <strong>{comment.name}</strong>: {comment.body} {comment.email}


                    </li>

                    // <li>{comment.postId}</li>,


                )
            )}


        </ul>


    )
        ;
}


export default App;