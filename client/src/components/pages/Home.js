import HomeJumbotron from '../presentational/HomeJumbotron';

const Home = () => {
    return (
        <div>
            <HomeJumbotron 
                image = "./images/3.jpg"
                position = 'head'
                title = "Lorem Ipsum" 
                text = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis autem veniam voluptatibus eum neque earum quibusdam unde debitis odio cum." 
            />
            <div className = "py-5 text-center">
                <span className = "brand-font">What we do</span>
            </div>
            <HomeJumbotron
                image = "./images/1.jpg"
                position = "body" 
                text = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis autem veniam voluptatibus eum neque earum quibusdam unde debitis odio cum. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis autem veniam voluptatibus eum neque earum quibusdam unde debitis odio cum. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis autem veniam voluptatibus eum neque earum quibusdam unde debitis odio cum. Lorem, ipsum dolo." 
            />
        </div>
    )
}

export default Home
