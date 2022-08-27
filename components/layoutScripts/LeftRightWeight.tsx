import { BoatLayout, Paddler, RaceRestrictions } from "../../types/Types";
import { TeamCalc } from "../TeamCalc";
import { LayoutRule } from "./LayoutRules";

export class LeftRightWeight implements LayoutRule {
  private acceptableDifference = 5;

  getFeasibleLayouts(
    team: Paddler[],
    raceRestrictions: RaceRestrictions
  ): BoatLayout[] {
    const feasibleLayouts: BoatLayout[] = [];
    // Consider half of the paddlers,
    // they need to account for half of the total weight
    const halfTeam = Math.ceil(raceRestrictions.paddlersInBoat / 2);
    const halfWeight = TeamCalc.getTotalWeight(team) / 2;

    // Sort team on weight
    team.sort((paddlerA, paddlerB) => {
      return paddlerA.weight - paddlerB.weight;
    });

    // Get initial position
    let lastIdx = 0;
    for (const idx of [...Array(team.length - halfTeam + 1).keys()]) {
      let groupWeight = TeamCalc.getTotalWeight(
        team.slice(idx, idx + halfTeam)
      );
      if (groupWeight < halfWeight) {
        lastIdx = idx;
      }
    }

    for (const idx of [...Array(halfTeam + 1).keys()]) {
      const leftPaddlersToConsider = [
        ...team.slice(lastIdx, idx + lastIdx),
        ...team.slice(lastIdx + idx + 1),
      ];
      let groupWeight = TeamCalc.getTotalWeight(leftPaddlersToConsider);
      if (Math.abs(groupWeight - halfWeight) < this.acceptableDifference) {
        const rightPaddlers = team.filter(
          (paddler) =>
            !leftPaddlersToConsider
              .map((lPaddler) => lPaddler.name)
              .includes(paddler.name)
        );
        feasibleLayouts.push({
          spots: leftPaddlersToConsider
            .map((paddler, paddlerIdx) => [paddler, rightPaddlers[paddlerIdx]])
            .flat(),
        });
      }
    }
    return feasibleLayouts;
  }
}
