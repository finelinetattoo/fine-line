import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';
import { JwtPayload } from '../types/jwt-payload.interface';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const extractJwtFromAuthHeader =
  ExtractJwt.fromAuthHeaderAsBearerToken() as JwtFromRequestFunction;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      jwtFromRequest: extractJwtFromAuthHeader,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      username: payload.username,
    };
  }
}
