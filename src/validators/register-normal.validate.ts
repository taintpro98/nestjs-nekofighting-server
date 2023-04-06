import { LoginDefaultDto } from '@dtos';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class LoginDefaultValidationPipe
  implements PipeTransform<LoginDefaultDto>
{
  private validateUsername(username: string): boolean {
    return true;
  }

  async transform(value: LoginDefaultDto, metadata: ArgumentMetadata) {
    const { username } = value;
    this.validateUsername(username);
    return value;
  }
}
