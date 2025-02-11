"use client"
import { UserContext } from "../../User/context";
import { UserTabPresentation } from "./presentational";
export function UserTabContainer ({user,setUser}:{user:UserContext|null,setUser:(user:UserContext)=>void;}){
  return <UserTabPresentation user={user} setUser={setUser} />;
}