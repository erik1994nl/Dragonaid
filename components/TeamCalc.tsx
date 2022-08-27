import { Paddler } from "../types/Types";

export class TeamCalc {
  static getTotalWeight(team: Paddler[]) {
    return team.reduce((prevWeight, paddler) => {
      return prevWeight + paddler.weight;
    }, 0);
  }
}
