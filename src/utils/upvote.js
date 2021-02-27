import authRequest from "./authRequest"

export default function upvote(target, type, isDislike) {
    authRequest("/api/upvote", {
        method: "POST",
        data: {
            isDislike,
            type,
            target
        }
    }).then(result => {
        if (result.data) alert("Não mudou")
        else alert("Mudou")
    }).catch((e) => alert(e.message))
}