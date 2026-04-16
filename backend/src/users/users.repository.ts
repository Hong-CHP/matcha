import { Inject, Injectable } from '@nestjs/common';
import { PG_POOL } from '../db/db.provider';
import { Pool } from 'pg';

@Injectable()

export class UserRepository {
	constructor(
		@Inject(PG_POOL) private readonly pool : Pool,
	){}
	async createUser(data: any) {
		const query = `INSERT INTO users (
		username,
		email,
		password_hash,
		firstname,
		lastname)
		VALUES($1, $2, $3, $4, $5)
		RETURNING id, username, email
		`
		const values = [
			data.username,
			data.email,
			data.password_hash,
		data.firstname,
		data.lastname
	]
	
	const result = await this.pool.query(query, values)
	return result.rows[0]
}
}