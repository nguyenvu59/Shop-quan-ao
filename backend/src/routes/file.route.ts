import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const router = express.Router();

// Thiết lập multer để tải lên file vào thư mục 'images'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        const fileId = uuidv4(); // Sinh random id
        const extension = path.extname(file.originalname);
        const fileName = fileId + extension;
        cb(null, fileName);
    }
});
const upload = multer({ storage: storage });

// API upload file ảnh
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileName = req.file.filename;
    return res.status(200).json({ imageUrl: `D:/imageDoAn-shop-quan-ao/${fileName}` }); // Thay bằng đường dẫn trên máy anh
});

// API lấy file ảnh
// router.get('/image/:imageName', (req, res) => {
//     const imageName = req.params.imageName;
//     const imagePath = 'file:///D:/KrizPham/2.%20Work/3.%20DoAn/Shop-quan-ao/backend/images/' + imageName; // Đường dẫn đến thư mục images
//     res.send(imagePath);
// });

export default router;
