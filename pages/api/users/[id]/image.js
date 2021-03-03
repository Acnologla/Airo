import { rateLimit, patchRateLimit } from "@/src/lib/rateLimit"
import needAuth from "@/src/utils/needAuth"
import formidable from 'formidable'

const fileTypes = ['image/jpeg', 'image/png']

export default rateLimit(patchRateLimit, needAuth(async (req, res) => {
    if (req.method === "POST") {
        const form = new formidable({multiples: true})
        form.uploadDir = `${process.cwd()}/assets/avatar`
        form.keepExtensions = true
        form.on('fileBegin', function (_, file) {
            file.path = `${form.uploadDir}/${req.userID}.${file.name.split(".").pop()}`
        })
        form.onPart = part => {
            if (part.filename && fileTypes.indexOf(part.mime) === -1) {
                form._error(new Error('File type is not supported'))
            }else{
                form.handlePart(part)
            }
        };
        return form.parse(req, (err) => {
            if (err) return res.status(500).end()
            else return res.status(200).end()
        })
    }

}))

export const config = {
    api: {
      bodyParser: false,
    },
}