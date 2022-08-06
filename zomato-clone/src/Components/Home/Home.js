import React, { useState } from "react";
import TabOptions from "../Common/TabOptions/TabOptions";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Delivery from "../Pages/Delivery/Delivery";
import DiningOut from "../Pages/Dining Out/DiningOut";
import Nightlife from "../Pages/Nightlife/Nightlife";

const Home = () => {
  const [activeTab, setActiveTab] = useState("Delivery");
  return (
    <>
      <Header />
      <TabOptions activeTab={activeTab} setActiveTab={setActiveTab} />
      {getCorrectScreen(activeTab)}
      <Footer />
    </>
  );
};

const getCorrectScreen = (tab) => {
  switch (tab) {
    case "Delivery":
      return <Delivery />;

    case "Dining Out":
      return <DiningOut />;

    case "Nightlife":
      return <Nightlife />;

    default:
      return <div>DELIVERY</div>;
  }
};

export default Home;
