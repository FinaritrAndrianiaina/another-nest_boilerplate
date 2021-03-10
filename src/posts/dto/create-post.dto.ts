import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNumber } from "class-validator";

export class CreatePostDto {
	@ApiProperty()
	title: string;
	@ApiProperty()
	description: string;

    @ApiProperty()
    @IsNumber()
    goal: number;
    
}
