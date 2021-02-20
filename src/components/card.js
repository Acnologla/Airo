import React, { useRef } from 'react';
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';


export default function Card(props) {
    return (
        <div>
            <div className="p-5 flex">
                <img src="https://pbs.twimg.com/profile_images/1098817973484105729/ECyNxjXX_400x400.png" 
                     className="sm:h-36 sm:w-36 h-16 w-16 bg-grey flex-shrink-0 border-none" />
                <div className="ml-5">
                    <div>
                        <div className="sm:text-xl text-md font-semibold"> { props.title } </div>
                        <div className="text-sm text-gray-400"> Submited 8 hours ago </div>
                        <div className="text-sm mt-2 text-gray-600 sm:h-9 overflow-hidden"> { props.desc } </div>
                    </div>
                    <div className="mt-5 items-end text-sm">
                        <button className="ring-1 px-5 py-1 text-sm text-red-500 ring-red-500">
                            192 Comments
                        </button>
                        <button className="py-1 text-gray-600">
                            <FontAwesomeIcon className="fa-lg ml-5" icon={faBookmark}/>
                        </button>
                        <button className="py-1 text-gray-600">
                            <FontAwesomeIcon className="fa-lg ml-5" icon={faEllipsisH}/>
                        </button>
                    </div>
                </div>
            </div>
            <hr></hr>
        </div>
    )
}