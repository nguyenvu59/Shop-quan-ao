import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import router from './routes/Router';
import swaggerDocument from '../swagger-output.json';
import { createConnection } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 8280;

// Sử dụng middleware bodyParser và cors trước khi định nghĩa các routes
app.use(bodyParser.json());
app.use(cors());

// Định nghĩa các routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", router);
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Khởi tạo kết nối với cơ sở dữ liệu
createConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.log('Error connecting to database:', error);
});
