import heroImage from "../assets/hero-img.png";
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="container mx-auto px-3">
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 items-center">
        <div>
            <p className="text-secondary text-xl mb-3">Build the future</p>
            <p className="font-bold text-3xl lg:text-5xl mb-1 lg:mb-3">Transforming healthcare</p>
            <p className="font-bold text-3xl lg:text-5xl mb-1 lg:mb-3">with technology for a</p>
            <p className="font-bold text-3xl lg:text-5xl mb-1 lg:mb-3">better tomorrow.</p>

            <div className="flex gap-5 md:gap-10 mt-10 flex-col md:flex-row">
                <Link to='/recording' className="bg-secondary font-semibold text-black text-center py-4 px-8 rounded-md shadow-lg shadow-secondary/50 transition hover:-translate-y-3">Begin recording</Link>
                <Link to='/upload' className="bg-blue font-semibold text-white text-center py-4 px-8 rounded-md shadow-lg shadow-blue/50 transition hover:-translate-y-3">Upload recording</Link>
            </div>
        </div>
        <img src={heroImage} alt="" className="w-full hidden lg:block" />
      </div>
    </div>
  )
}

export default Home
