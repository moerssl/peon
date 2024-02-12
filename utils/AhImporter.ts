import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AhImporter {
  async importData(data) {
    try {
      for (const entry of data) {
        if (entry.itemId) {
          await prisma.item.create({
            data: {
              itemId: entry.itemId,
              quantity: entry.quantity,
              marketValue: entry.marketValue,
              avgSalePrice: entry.avgSalePrice,
              saleRate: entry.saleRate,
              soldPerDay: entry.soldPerDay,
              historical: entry.historical
            }
          });
        } else if (entry.petSpeciesId) {
          await prisma.pet.create({
            data: {
              petSpeciesId: entry.petSpeciesId,
              quantity: entry.quantity,
              marketValue: entry.marketValue,
              avgSalePrice: entry.avgSalePrice,
              saleRate: entry.saleRate,
              soldPerDay: entry.soldPerDay,
              historical: entry.historical
            }
          });
        }
        
        // Optional: Also record history
        await this.recordHistory(entry);
      }
      console.log('Data import successful.');
    } catch (error) {
      console.error('Error importing data:', error);
    }
  }

  async recordHistory(entry) {
    try {
      if (entry.itemId) {
        await prisma.itemHistory.create({
          data: {
            itemId: entry.itemId,
            quantity: entry.quantity,
            marketValue: entry.marketValue,
            avgSalePrice: entry.avgSalePrice,
            saleRate: entry.saleRate,
            soldPerDay: entry.soldPerDay,
            historical: entry.historical
          }
        });
      } else if (entry.petSpeciesId) {
        await prisma.petHistory.create({
          data: {
            petSpeciesId: entry.petSpeciesId,
            quantity: entry.quantity,
            marketValue: entry.marketValue,
            avgSalePrice: entry.avgSalePrice,
            saleRate: entry.saleRate,
            soldPerDay: entry.soldPerDay,
            historical: entry.historical
          }
        });
      }
    } catch (error) {
      console.error('Error recording history:', error);
    }
  }
}