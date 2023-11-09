import rateLimit from 'express-rate-limit';
import { BASELINE_API_RATE_LIMIT } from 'shared/const';

export const apiLimiter = rateLimit({
  max: BASELINE_API_RATE_LIMIT,
  windowMs: 15 * 60 * 1000
});
