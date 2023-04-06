import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class Accel3LinkGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log("Accel3LinkGuard")
    return true
    // throw new Error("Method not implemented.");
  }

}