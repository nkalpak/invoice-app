/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from './invoice.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from './entities/invoice-item.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
function createMockRepository<T = any>(): MockRepository<T> {
  return {
    findOne: jest.fn(),
    create: jest.fn(),
  };
}

describe('InvoiceService', () => {
  let service: InvoiceService;
  let invoiceRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceService,
        {
          provide: getRepositoryToken(Invoice),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(InvoiceItem),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<InvoiceService>(InvoiceService);
    invoiceRepository = module.get<MockRepository>(getRepositoryToken(Invoice));
  });

  describe('findOne', function () {
    describe('when invoice with ID exists', function () {
      it('should return the invoice object', async function () {
        const invoiceId = '1';
        const expectedInvoice = {};
        invoiceRepository.findOne?.mockReturnValue(expectedInvoice);

        const invoice = await service.findOne(invoiceId);
        expect(invoice).toEqual(expectedInvoice);
      });
    });
    describe('otherwise', function () {
      it('should throw the "NotFoundException"', async function () {
        const invoiceId = '1';
        invoiceRepository.findOne?.mockReturnValue(undefined);

        await expect(service.findOne(invoiceId)).rejects.toThrow(
          NotFoundException,
        );
      });
    });
  });
});
