import { BoatLayout, Paddler, RaceRestrictions } from "../../types/Types";
import { LayoutRestrictions, LayoutRestrictor } from "./LayoutRestrictions";
import { LeftRightWeight } from "./LeftRightWeight";

export class LayoutCreator {
  private team: Paddler[];
  private raceRestrictions: RaceRestrictions;
  private layoutRule: LayoutRule;
  private restrictor;

  constructor(team: Paddler[], raceRestrictions: RaceRestrictions) {
    this.team = team;
    this.raceRestrictions = raceRestrictions;
    this.layoutRule = new LeftRightWeight();
    this.restrictor = new LayoutRestrictor(raceRestrictions);
  }

  public setLayoutRule(layoutRule: LayoutRule) {
    this.layoutRule = layoutRule;
  }

  public applyRule(): void {
    this.layoutRule.applyRule(
      this.team,
      this.raceRestrictions,
      this.restrictor
    );
  }

  public createLayouts(): BoatLayout[] {
    // return this.layoutRule.getFeasibleLayouts(this.team, this.raceRestrictions);
    return this.restrictor.buildLayouts();
  }
}

export type LayoutRule = {
  getFeasibleLayouts(
    team: Paddler[],
    raceRestrictions: RaceRestrictions
  ): BoatLayout[];

  applyRule(
    team: Paddler[],
    raceRestriction: RaceRestrictions,
    restrictor: LayoutRestrictor
  ): void;
};
