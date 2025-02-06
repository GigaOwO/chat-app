"use client"
import { UserContext } from "../../User/context";
import { UserTabPresentation } from "./presentational";
export function UserTabContainer ({user}:{user:UserContext|null;}){
  return <UserTabPresentation user={user} />;
}