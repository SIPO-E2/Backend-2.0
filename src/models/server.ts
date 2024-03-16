import express, {Application} from 'express';
// import fileUpload from 'express-fileupload';
import {routerUser, routerClient} from '../routes';
// import cors from 'cors';

    class Server  {
    private app: Application ;
    private port: string | undefined; 
    // path for routes
    private routePaths = {
        users: '/api/users',
        clients: '/api/clients',
        projects: '/api/projects',
        jobPositions: '/api/jobPositions',
        openings: '/api/openings',
        employees: '/api/employees',
    }

    constructor(){
        this.app  = express();
        this.port = process.env.PORT;

        // DB
        // this.dbConnection();

        // middlewares
        this.middlewares();
        // routes
        this.routes();
        

    }


    middlewares(){

        // // CORS
        // this.app.use(cors());

        // Parsing body
        this.app.use(express.json());

        // this.app.use(fileUpload({
        //     useTempFiles : true,
        //     tempFileDir : '/tmp/',
        //     createParentPath: true
        // }));
    }

    routes(){
        //TODO: upload
        this.app.use(this.routePaths.users, routerUser);
        this.app.use(this.routePaths.clients, routerClient);
        // this.app.use(this.routePaths.projects, routerProject);
        // this.app.use(this.routePaths.jobPositions, routerJobPosition);
        // this.app.use(this.routePaths.openings, routerOpening);
        // this.app.use(this.routePaths.employees, routerEmployee);

    }


    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`This Server is running in port ${this.port}`);
        });
    }

}

export default Server;