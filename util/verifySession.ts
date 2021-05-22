import { Request } from 'express';

export default (r: Request) => r.session.client && r.session.client.email; 