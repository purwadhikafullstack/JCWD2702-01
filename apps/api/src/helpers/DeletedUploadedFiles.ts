import fs from 'fs';
import path from 'path';

export const DeletedUploadedFiles = (files: any) => {
    const uploadedFiles = Array.isArray(files) ? files : files['images'];
    if (Array.isArray(uploadedFiles)) {
        uploadedFiles.forEach((file) => {
            const filePath = path.resolve(file.path);
            if (fs.existsSync(filePath)) {
                try {
                    fs.unlinkSync(filePath);
                } catch (err) {
                    console.error(`Error deleting file: ${filePath}`, err);
                }
            } else {
                console.warn(`File not found, skipping deletion: ${filePath}`);
            }
        });
    }
};