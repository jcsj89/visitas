import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
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
