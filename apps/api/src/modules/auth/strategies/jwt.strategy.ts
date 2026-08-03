import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
constructor(config: ConfigService) {
  const secret = config.get<string>('JWT_ACCESS_SECRET')!;

  console.log('JWT SECRET =', secret);

  super({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: secret,
  });
}
async validate(payload: any) {
    console.log("JWT Payload:", payload);
  return payload;
}}