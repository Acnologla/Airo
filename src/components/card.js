import React from 'react';
import Link from 'next/link'
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';


export default function Card({post}) {
    return (
        <Link href={`/posts/${post.id}`}>
            <a>
            <div className="p-5 flex">
                <img src={`/api/images/user/${post.author}`} 
                     className="sm:h-36 sm:w-36 h-16 w-16 bg-grey flex-shrink-0 border-none" />
                <div className="ml-5">
                    <div>
                        <div className="sm:text-xl text-md font-semibold"> { post.title } </div>
                        <div className="text-sm text-gray-400"> Submited {post.created} </div>
                        <div className="text-sm mt-2 text-gray-600 sm:h-9 overflow-hidden"> { post.desc} </div>
                    </div>
                    <div className="mt-5 items-end text-sm">
                        <button className="ring-1 px-5 py-1 text-sm text-red-500 ring-red-500">
                            {post.comments} Comments
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
            </a>
        </Link>
    )
}