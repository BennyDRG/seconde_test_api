import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignorExplication: false,
            secretOrKey: "my-secret",
        })
    }

    async validate(payload: any) {
        const { userId } = payload

        if (!userId || typeof userId !== "number") {
            throw new UnauthorizedException("invalid token")
        }

        const user = await this.prisma.user.findUnique({ where: { id: userId } })

        if (!user) {
            throw new UnauthorizedException("invalid token")
        }

        return user;
    }
}