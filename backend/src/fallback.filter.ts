import { ArgumentsHost, Catch, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { SsrService } from "./ssr/ssr.service";
import { Request, Response } from "express";
import { STATUS_CODES } from "http";

@Injectable()
@Catch()
export class FallbackFilter {
	constructor(private readonly ssrService: SsrService) {}

	async catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();

		const isApi = request.url.startsWith('/api');
		if (!isApi && exception instanceof NotFoundException) {
			const html = await this.ssrService.render(request.url)
			return response.status(200).send(html)
		}

		const status = exception instanceof HttpException
						? exception.getStatus()
						: HttpStatus.INTERNAL_SERVER_ERROR
		const body = exception instanceof HttpException
						? exception.getResponse()
						: {
							status_code: HttpStatus.INTERNAL_SERVER_ERROR,
							message: "Internal server error."
						}
		return response.status(status).json(body)
	}
}