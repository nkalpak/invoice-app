/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from './invoice.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from './entities/invoice-item.entity';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { InvoiceNotFoundException } from './interfaces/invoice';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
function createMockRepository<T = any>(): MockRepository<T> {
  return {
    findOne: jest.fn(),
    create: jest.fn(),
    preload: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
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
      it('should throw the "InvoiceNotFoundException"', async function () {
        const invoiceId = '1';
        invoiceRepository.findOne?.mockReturnValue(undefined);

        await expect(service.findOne(invoiceId)).rejects.toThrow(
          InvoiceNotFoundException,
        );
      });
    });
  });

  describe('update', function () {
    describe('when the invoice is already deleted', function () {
      it('should throw a "InvoiceNotFoundException"', async function () {
        const invoiceId = '1';
        const updateInvoiceDto = { isDeleted: true, invoiceItems: [] };
        invoiceRepository.update?.mockReturnValue(updateInvoiceDto);

        await expect(
          service.update(invoiceId, updateInvoiceDto),
        ).rejects.toThrow(InvoiceNotFoundException);
      });
    });
  });

  describe('delete', function () {
    describe('when the invoice with the given ID exists', function () {
      it('should mark it as deleted', async function () {
        const invoiceId = '1';
        const invoice = {};
        invoiceRepository.findOne?.mockReturnValue(invoice);

        await service.delete(invoiceId);

        expect(invoiceRepository.update).toHaveBeenCalledWith(
          { id: invoiceId },
          {
            isDeleted: true,
          },
        );
      });
    });

    describe('otherwise', function () {
      it('should throw a "InvoiceNotFoundException"', async function () {
        const invoiceId = '1';

        await expect(service.delete(invoiceId)).rejects.toThrow(
          InvoiceNotFoundException,
        );
      });
    });
  });

  describe('undelete', function () {
    describe('when the invoice does not exist', function () {
      it('should throw a "InvoiceNotFoundException"', async function () {
        const invoiceId = '1';
        invoiceRepository.findOne?.mockReturnValue(undefined);

        await expect(service.undelete(invoiceId)).rejects.toThrow(
          InvoiceNotFoundException,
        );
      });
    });

    describe('when the invoice is not deleted', function () {
      it('should throw a "ConflictException"', async function () {
        const invoiceId = '1';
        const invoice = { isDeleted: false };
        invoiceRepository.findOne?.mockReturnValue(invoice);

        await expect(service.undelete(invoiceId)).rejects.toThrow(
          ConflictException,
        );
      });
    });
  });
});
