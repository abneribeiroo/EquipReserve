import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { connectDB } from './config/db'; 
import userRoutes from './routes/userRoutes';
import equipmentRoutes from './routes/equipmentRoutes';
import reservationRoutes from './routes/reservationRoutes';
import authMiddleware from './middlewares/authMiddleware';
import swaggerDocs from './swagger.json';


const app = express();

// Conectar ao banco de dados
// connectDB();

// Middleware para permitir o uso de JSON nas requisições
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rota de boas-vindas
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Equipment Reservation API!');
});

app.use('/api/users', userRoutes);
app.use('/api/equipment', authMiddleware as express.RequestHandler, equipmentRoutes); // Ensure authMiddleware matches RequestHandler type
app.use('/api/reservations', reservationRoutes);

// Configuração do servidor
const PORT = process.env.PORT || 8080;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;  // Exporta o app para fins de teste