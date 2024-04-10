import { IsNotEmpty, IsString } from 'class-validator';
import { IsOldEnough } from 'src/common/validate-decorator/age.decorator';
import { IsEmail } from 'src/common/validate-decorator/email.decorator';

export class SignUpDto {
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmail({ message: 'Your email is not in the correct formal' })
  email: string;

  @IsOldEnough({ message: 'Your age must be greater than or equal to 18' })
  dateOfBirth?: string;
}
