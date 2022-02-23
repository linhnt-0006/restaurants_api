import { SetMetadata } from "@nestjs/common";
import { UserRoles } from "../schemas/user.schema";

export const Roles = (...roles: UserRoles[]) => SetMetadata("roles", roles);
