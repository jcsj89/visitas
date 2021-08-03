import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(path.join(__dirname, '..', '..', 'uploads/'));
        cb(null, path.join(__dirname, '..', '..', 'uploads/'));
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + '-' + file.originalname.toLowerCase();
        cb(null, fileName);
    },
});

export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        try {
            if (
                file &&
                file.mimetype ===
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ) {
                cb(null, true);
            } else {
                return cb(new Error('Só arquivos .xlsx'));
            }
        } catch (error) {
            console.log(error);
        }
    },
});
