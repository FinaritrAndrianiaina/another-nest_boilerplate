import { ApiProperty } from '@nestjs/swagger';

export class UpdateFileDto {
	@ApiProperty()
	title?: string;

	@ApiProperty()
	description?: string;
}
