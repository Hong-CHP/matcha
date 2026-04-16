import { ConfigService } from '@nestjs/config'
import { Pool } from 'pg'

// nestjs provider structure:
// {
	//   provide: string | symbol,
	//   useFactory: fn,
	//   inject: []
	// }
	
export const PG_POOL = 'PG_POOL'

export const databaseProviders = [
	{
		provide: PG_POOL,
		inject: [ConfigService],
		useFactory: (configService: ConfigService)=>{
			return new Pool({
				connectionString: configService.get<string>('DATABASE_URL'),
			})
		}
	}
]