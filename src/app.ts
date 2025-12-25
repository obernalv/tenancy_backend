import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

// ( async () =>{
    app.use(helmet());
    app.use(cors({
        origin: process.env.client_url,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }))

    const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { message: "Demasiadas solicitudes, intente más tarde." }
  });
  app.use(limiter);

    // Middlewares globales
  app.use(morgan("dev")); // logs cortos y coloridos(desarrollo	)
    // app.use(morgan("combined")); // formato estándar de Apache,(En producción se recomendada)
  app.use(express.json());
//   app.use(hpp());
  //  app.use(compression());

  // Rutas
//   app.use("/api/v1/auth", authRoutes);
//   app.use("/api/v1/users", userRoutes);

  // Error handler al final
  //  app.use(errorHandler);

// })()

export default app;