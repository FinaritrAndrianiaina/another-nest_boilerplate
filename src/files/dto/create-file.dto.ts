import { ApiProperty } from "@nestjs/swagger";

export class CreateFileDto {
    
    @ApiProperty()
    title?: string;

    @ApiProperty()
    description?: string;
}
