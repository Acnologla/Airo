import { useRouter } from 'next/router'
import useSWR from "swr"
import axios from "axios"
import Card from "@/src/components/card"
import UserCard from "@/src/components/UserCard"


export default function search(){
    const router = useRouter()
    const {data} = useSWR(`/api/search?query=${router.query.query}`, (...args) => axios.get(...args).then(res => res.data))
    if (!data) return <h1>Loading</h1>
    console.log(data)
    return (
        <div>
            {data.users.map((user, i) => <UserCard user={user} key={i} />)}
            {data.posts.map((post, i) => <Card post={post} key={i} />)}
        </div>
    )
}  