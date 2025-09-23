import express from 'express';
import { injectable, container } from 'tsyringe';
import type { Response, Request } from 'express';

import { IBaseRoute } from '../interfaces';
import { BankControllerSymbol } from '../symbols';
import { BanksController } from '../controllers';
import { DeleteBankRequestParams, GetBankByIdRequestParams, UpdateBankRequestData } from '../types';

type BanksRouter = ReturnType<typeof express.Router>;

@injectable()
export class BanksRoutes implements IBaseRoute {
    router?: BanksRouter = null;
    controller: BanksController;

    constructor() {
        this.controller = container.resolve<BanksController>(BankControllerSymbol);
    }

    private registerRoutes(): void {
        this.router = express.Router();

        this.router.get('/', (req: Request, res: Response) =>
            this.controller.getAllBanks(req, res),
        );
        this.router.post('/', (req: Request, res: Response) =>
            this.controller.createBank(req, res),
        );
        this.router.put('/', (req: Request<null, null, UpdateBankRequestData>, res: Response) =>
            this.controller.updateBank(req, res),
        );
        this.router.get('/:bankId', (req: Request<GetBankByIdRequestParams>, res: Response) =>
            this.controller.getBankById(req, res),
        );
        this.router.delete('/:bankId', (req: Request<DeleteBankRequestParams>, res: Response) =>
            this.controller.deleteBank(req, res),
        );
    }

    public getRouter(): BanksRouter {
        if (!this.router) {
            this.registerRoutes();
        }
        return this.router;
    }
}
