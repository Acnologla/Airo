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
      <div className="content-center w-full sm:mt-2 relative top-7 ">
        <div className="md:w-9/12 m-auto">
          <div className="m:bg-transparent sm:mt-0 justify-center flex mt-5 pt-4 pb-4">
            <center className="rounded-full">
              <button className="block border-b-2 border-red-500  text-red-500  sm:inline-block sm:mr-6">POPULAR</button>
              <button className="block text-gray-500  sm:inline-block">NEW</button>
              <button className="block text-gray-500  sm:inline-block  sm:ml-6">RISING</button>
            </center>
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