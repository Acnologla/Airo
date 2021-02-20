import React, { useState } from 'react';
import Card from "./card.js"

export default function Content() {

    const [cards, setCards] = useState([
      {title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ALorem ipsum dolor sit amet, consectetur adipiscing elit. ALorem ipsum dolor sit amet, consectetur adipiscing elit. AAenean non velit ante. "},
      
       {title: "Hello", 
       desc: "Ma Broda"},
      
       {title: "Hello", 
       desc: "Ma Broda"},
    ]);

    return (
      <div className="content-center w-full sm:mt-10 relative top-7 ">
        <div className="md:w-9/12 m-auto">
          <div className="bg-white sm:bg-transparent sm:mt-0 justify-center flex mt-5 pt-4 pb-4">
            <div className="bg-white rounded-full">
              <button className="bg-red-500 px-5 py-2 mr-6 text-white rounded-full shadow-lg">POPULAR</button>
              <button className="text-gray-500  px-5 ">NEW</button>
              <button className="text-gray-500  px-5 mr-6">RISING</button>
            </div>
          </div>
          <div className="bg-white border  m-auto shadow-lg">
              {cards.map((el, i) => 
                <Card 
                  key={i}
                  title={el.title}
                  desc={el.desc}
                  url={el.url}
                  comments={el.comments}
                ></Card>  
              )}
          </div>
        </div>
      </div>)
}