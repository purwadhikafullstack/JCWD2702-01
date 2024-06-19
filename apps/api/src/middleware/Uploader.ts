import { NextFunction, Request, Response } from "express";
import { multerUpload } from "@/helpers/Multer";
import { DeletedUploadedFiles } from "@/helpers/DeletedUploadedFiles";

export const uploader = (req: Request, res: Response, next: NextFunction) => {
    const upload = multerUpload.fields([{ name: 'images', maxCount: 1 }])

    upload(req, res, function (err) {
        try {
            if (err) {
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    return next({
                        status: 400,
                        message: 'Too many files to upload. Maximum allowed is 1.',
                    });
                }
                throw err;
            }

            if (req.files) {
                const uploadedFiles = Array.isArray(req.files) ? req.files : req.files['images'];

                if (Array.isArray(uploadedFiles)) {
                    if (uploadedFiles.length > 5) {
                        throw { message: 'Too many files to upload. Maximum allowed is 1.' };
                    }

                    uploadedFiles.forEach((item) => {
                        if (item.size > 1000000) {
                            throw { message: `${item.originalname} is too large, maximum file size is 1MB` };
                        }
                    });
                }
            }

            next()
        } catch (error: any) {
            DeletedUploadedFiles(req.files)

            next({
                status: 500,
                message: error.message
            })
        }
    })
}

export const listingUploader = (req: Request, res: Response, next: NextFunction) => {
    const upload = multerUpload.fields([{ name: 'listingImages', maxCount: 5 }, { name: 'roomtypeImages', maxCount: 5 }])

    upload(req, res, function (err) {
        try {
            if (err) {
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    return next({
                        status: 400,
                        message: 'Too many files to upload. Maximum allowed is 5.',
                    });
                }
                throw err;
            }

            if (req.files) {
                console.log(req.files)
                const uploadedListingFiles = Array.isArray(req.files) ? req.files : req.files['listingImages'];
                const uploadedRoomtypeFiles = Array.isArray(req.files) ? req.files : req.files['roomtypeImages'];

                if (Array.isArray(uploadedListingFiles)) {
                    if (uploadedListingFiles.length > 5) {
                        throw { message: 'Too many files to upload. Maximum allowed is 5.' };
                    }

                    uploadedListingFiles.forEach((item) => {
                        if (item.size > 1000000) {
                            throw { message: `${item.originalname} is too large, maximum file size is 1MB` };
                        }
                    });
                }
                if (Array.isArray(uploadedRoomtypeFiles)) {
                    if (uploadedRoomtypeFiles.length > 5) {
                        throw { message: 'Too many files to upload. Maximum allowed is 5.' };
                    }
                    uploadedRoomtypeFiles.forEach((item) => {
                        if (item.size > 1000000) {
                            throw { message: `${item.originalname} is too large, maximum file size is 1MB` };
                        }
                    });
                }
            }

            next()
        } catch (error: any) {
            DeletedUploadedFiles(req.files)

            next({
                status: 500,
                message: error.message
            })
        }
    })
}