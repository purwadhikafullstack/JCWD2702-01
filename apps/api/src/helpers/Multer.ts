import multer from 'multer'
import fs from 'fs';

const defaultDirectory = 'src/public'

const storage = multer.diskStorage({
    destination: function (req, file: any, cb) {
        const childDirectoryBasedOnMimetype = file.mimetype.split('/')[0]
        const isDirectoryExist = fs.existsSync(`${defaultDirectory}/${childDirectoryBasedOnMimetype}`)

        if (isDirectoryExist === false) {
            fs.mkdirSync(`${defaultDirectory}/${childDirectoryBasedOnMimetype}`, { recursive: true })
        }
        cb(null, `${defaultDirectory}/${childDirectoryBasedOnMimetype}`) // 'images/webp or application/pdf'
    },
    filename: function (req, file, cb) {
        const randomNumber = Math.ceil(Math.random() * 10000000000000)
        const splitOriginalName = file.originalname.split('.')
        const fileExtension = splitOriginalName[splitOriginalName.length - 1]

        cb(null, `${Date.now()}_${randomNumber}.${fileExtension}`)
    }
})

const fileFilter = (req: any, file: any, cb: any) => {
    const fileAccepted = ['webp', 'jpg', 'jpeg', 'png']

    const splitOriginalName = file.originalname.split('.')
    const fileExtension = splitOriginalName[splitOriginalName.length - 1]

    if (fileAccepted.includes(fileExtension)) {
        cb(null, true)
    } else {
        cb(new Error('Format Not Accepted!'))
    }
}

export const multerUpload = multer({ storage: storage, fileFilter: fileFilter })