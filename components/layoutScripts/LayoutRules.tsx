import { BoatLayout, Paddler, RaceRestrictions } from "../../types/Types";
import { LeftRightWeight } from "./LeftRightWeight";

export class LayoutCreator {
  private team: Paddler[];
  private raceRestrictions: RaceRestrictions;
  private layoutRule: LayoutRule;

  constructor(team: Paddler[], raceRestrictions: RaceRestrictions) {
    this.team = team;
    this.raceRestrictions = raceRestrictions;
    this.layoutRule = new LeftRightWeight();
  }

  public setLayoutRule(layoutRule: LayoutRule) {
    this.layoutRule = layoutRule;
  }

  public createLayouts(): BoatLayout[] {
    return this.layoutRule.getFeasibleLayouts(this.team, this.raceRestrictions);
  }
}

export type LayoutRule = {
  getFeasibleLayouts(
    team: Paddler[],
    raceRestrictions: RaceRestrictions
  ): BoatLayout[];
};
