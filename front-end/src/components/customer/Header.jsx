import React from "react";
import Carousel from "react-material-ui-carousel";
import { slide_list1, slide_list2 } from "../../components/assets/assets";

const Header = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "1", marginRight: "8px" }}>
        <Carousel indicators={false}>
          {slide_list1.map((item, index) => (
            <img
              key={index}
              src={item.slide}
              alt={`Slide ${index}`}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          ))}
        </Carousel>
      </div>
      <div style={{ flex: "1", marginLeft: "8px" }}>
        <Carousel indicators={false}>
          {slide_list2.map((item, index) => (
            <img
              key={index}
              src={item.slide}
              alt={`Slide ${index}`}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Header;
