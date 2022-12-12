import React from "react";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import ProportyList from "../../components/proportyList/ProportyList";
import "./home.css";
const Home = () => {
  return (
    <React.Fragment>
            <div>
                <title>les meilleurs randonnée tunisie</title>
                <link rel="icon" href={"path"}/>
                <meta name="description" content={"les meilleurs randonnées  tunisie que plusieurs personnes s'interssent de visiter"}/>
                <meta property="og:title" content={"og:title"}/>
                <meta property="og:description" content={"og:description"}/>
             </div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle"> Browse by property type </h1>
        <ProportyList />
        <h1 className="homeTitle"> Homes guests love </h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Home;
