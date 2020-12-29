import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { isEmail, IsNotEmpty, isUUID } from 'class-validator';

export class LoginDto {
	@ApiProperty()
	username?: string;

	@ApiProperty()
	id?: string;

	@ApiProperty()
	email?: string;

	@ApiProperty({ required: true })
	@IsNotEmpty()
	password: string;

	badrequest(
		message: string[] = ['Veuiller fournir les informations nécessaires. [id,username,email]'],
	) {
		throw new BadRequestException({
			message,
		});
	}

	checkDto() {
		let msg: string[] = [];

		if (Boolean(this.id) && !isUUID(this.id))
			msg.push('Veuillez entrer un id valide');

		if (Boolean(this.email) && !isEmail(this.email))
			msg.push('Veuillez entrer un email valide');

		if (msg.length > 0) this.badrequest(msg);
		return Boolean(this.email) || Boolean(this.username) || Boolean(this.id)
			? true
			: this.badrequest();
	}
}
