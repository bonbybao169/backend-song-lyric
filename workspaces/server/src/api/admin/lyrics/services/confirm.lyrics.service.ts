import { Injectable } from '@nestjs/common';

import type { Status } from '@prisma/client';

import { UpdateLyricsService } from './update.lyrics.service';

@Injectable()
export class ConfirmLyricsService {
  constructor(private updateLyricsService: UpdateLyricsService) {}

  confirm(id: number, status: Status) {
    return this.updateLyricsService.update(id, { status });
  }
}
