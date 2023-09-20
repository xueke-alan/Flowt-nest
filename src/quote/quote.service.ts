import { Injectable } from '@nestjs/common';
import { CreatequoteDto } from './dto/create-quote.dto';
import { UpdatequoteDto } from './dto/update-quote.dto';

@Injectable()
export class quoteService {
  create(createquoteDto: CreatequoteDto) {
    return 'This action adds a new quote';
  }

  async findAll(query: { q: string }) {
    const q = query.q;
    const temp = [
      {
        lable: q,
        suffix: [
          {
            type: 'strander',
            text: '标准号',
          },
        ],
      },
      {
        lable: q + '+1',
        suffix: [
          {
            type: 'type',
            text: '测试类别',
          },
        ],
      },
      {
        lable: q + '+2',
        suffix: [
          {
            type: 'strander',
            text: '样品类别',
          },
        ],
      },
      {
        lable: q + '+3',
        suffix: [
          {
            type: 'strander',
            text: '标准号',
          },
        ],
      },
      {
        lable: q + '+4',
        suffix: [
          {
            type: 'strander',
            text: '标准号',
          },
        ],
      },
      {
        lable: q + '+5',
        suffix: [
          {
            type: 'strander',
            text: '标准号',
          },
        ],
      },
      {
        lable: q + '+6',
        suffix: [
          {
            type: 'strander',
            text: '标准号',
          },
        ],
      },
      {
        lable: q + '+7',
        suffix: [
          {
            type: 'strander',
            text: '标准号',
          },
        ],
      },
      {
        lable: q + '+8',
        suffix: [
          {
            type: 'strander',
            text: '标准号',
          },
        ],
      },
      {
        lable: q + '+9',
        suffix: [
          {
            type: 'strander',
            text: '标准号',
          },
        ],
      },
    ];
    async function waitForOneSecond() {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 300); // 1000 毫秒等于 1 秒
      });
    }
    await waitForOneSecond();
    return temp;
  }

  findOne(id: number) {
    return `This action returns a #${id} quote`;
  }

  update(id: number, updatequoteDto: UpdatequoteDto) {
    return `This action updates a #${id} quote`;
  }

  remove(id: number) {
    return `This action removes a #${id} quote`;
  }
}
