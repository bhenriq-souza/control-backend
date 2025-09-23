import { inject, injectable } from 'tsyringe';

import type { IBankRepository, IBankService } from '../interfaces';
import { BanksRepositorySymbol } from '../symbols';
import { Bank } from '../entities';

@injectable()
export class BanksService implements IBankService {
    constructor(@inject(BanksRepositorySymbol) private bankRepository: IBankRepository) {}

    public async getAllBanks(): Promise<Bank[]> {
        return (await this.bankRepository.getAll()) as Bank[];
    }

    public async getBankById(id: string): Promise<Bank | null> {
        return (await this.bankRepository.getById(id)) as Bank | null;
    }

    public async createBank(bank: Bank): Promise<string> {
        const result = await this.bankRepository.insert(bank);
        return result.id;
    }

    public async updateBank(id: string, bank: Partial<Bank>): Promise<boolean> {
        const result = await this.bankRepository.update(id, bank);
        return result.modifiedCount > 0;
    }

    public async deleteBank(id: string): Promise<boolean> {
        const result = await this.bankRepository.delete(id);
        return result.deletedCount > 0;
    }
}
