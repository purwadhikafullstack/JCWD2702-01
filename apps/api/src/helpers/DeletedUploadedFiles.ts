import { rmSync } from 'fs';

export const DeletedUploadedFiles = (files: any) => {
    if (files) {
        const uploadedFiles = Array.isArray(files) ? files : files['images'];

        if (Array.isArray(uploadedFiles)) {
            uploadedFiles?.forEach(item => {
                rmSync(item.path)
            })
        }
    }
}