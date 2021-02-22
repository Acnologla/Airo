import client from "../../models/client"

export default (id) => {
    return client.query("SELECT id, created, username FROM  Users WHERE id = $1",[id]).then(result => result.rows[0])
}