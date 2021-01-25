import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicatefieldException extends HttpException {
	constructor(response: string | Record<string, any>) {
		super(response, HttpStatus.CONFLICT);
	}
}
