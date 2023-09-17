import { Injectable } from '@nestjs/common';
import { CreateQuotoDto } from './dto/create-quoto.dto';
import { UpdateQuotoDto } from './dto/update-quoto.dto';

@Injectable()
export class QuotoService {
  create(createQuotoDto: CreateQuotoDto) {
    return 'This action adds a new quoto';
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
    return `This action returns a #${id} quoto`;
  }

  update(id: number, updateQuotoDto: UpdateQuotoDto) {
    return `This action updates a #${id} quoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} quoto`;
  }
}
