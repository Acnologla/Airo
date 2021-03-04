import authRequest from "@/src/utils/authRequest"
import { useRef, useContext } from "react"
import mainContext from "@/src/context/main"
export default function image() {
    const image2 = useRef(null)
    const auth = useContext(mainContext)
    const sendImage = (image) => {
        const data = new FormData()
        data.append('image', image.target.files[0])
        authRequest("/api/users/@me/image", {
            method: "POST",
            data,
            headers: { "Content-Type": "multipart/form-data" }
        }).then(() => alert("Image trocada")).catch((e) => alert(e.message))
    }
    return (
        <div> {auth ? <img width="80" height="80" src={`/api/images/user/${auth.auth.id}`}/> : <input ref={image2} onChange={sendImage} type="file" accept=".jpg, .png, .jpeg" />}
        </div>
    )
}