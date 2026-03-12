import Row from "../components/Row";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
// import { fetchTrending, fetchNetflixOriginals } from "../services/tmdb";

function Home() {

    return (

        <div>
           <Navbar />
      <Banner />


            <Row title="Trending" fetchUrl="/trending/all/week?api_key=17866d40be3a733fc9950af1b3b20909" />

            <Row title="Netflix Originals" fetchUrl="/discover/tv?api_key=17866d40be3a733fc9950af1b3b20909&with_networks=213" />

        </div>

    )

}

export default Home;