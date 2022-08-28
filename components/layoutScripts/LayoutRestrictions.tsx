import {
  BoatLayout,
  Paddler,
  RaceRestrictions,
  SideEnum,
  Spot,
} from "../../types/Types";
import { TeamCalc } from "../TeamCalc";

export class LayoutRestrictor {
  blueprints: LayoutRestrictions[];
  raceRestrictions: RaceRestrictions;

  // These variables contian hard rules that apply to all layout blueprints
  specificSpots: { spot: Spot; paddler: Paddler }[];
  specificBenches: { bench: number; paddler: Paddler }[];

  constructor(raceRestrictions: RaceRestrictions) {
    this.raceRestrictions = raceRestrictions;
    this.blueprints = [];
    this.specificSpots = [];
    this.specificBenches = [];
  }

  addBlueprint(blueprint: LayoutRestrictions) {
    this.blueprints.push({
      specific: {
        spots: this.specificSpots,
        benches: this.specificBenches,
      },
      direction: {
        left: blueprint.direction?.left ?? [],
        right: blueprint.direction?.right ?? [],
        front: blueprint.direction?.front ?? [],
        back: blueprint.direction?.back ?? [],
      },
    });
  }

  addSpecficSpot(spot: Spot, paddler: Paddler) {
    this.specificSpots.push({ spot: spot, paddler: paddler });
  }

  addSpecificBench(bench: number, paddler: Paddler) {
    this.specificBenches.push({ bench: bench, paddler: paddler });
  }

  addLeftRight(leftPaddlers: Paddler[], rightPaddlers: Paddler[]) {
    this.addBlueprint({
      specific: {
        spots: [],
        benches: [],
      },
      direction: {
        left: leftPaddlers,
        right: rightPaddlers,
        front: [],
        back: [],
      },
    });
  }

  buildLayouts(): BoatLayout[] {
    return this.blueprints
      .map((blueprint) => {
        return this.blueprintToLayouts(blueprint);
      })
      .flat();
  }

  private blueprintToLayouts(blueprint: LayoutRestrictions): BoatLayout[] {
    let boatLayouts: BoatLayout[] = [];
    const layout: Paddler[] = Array(this.raceRestrictions.paddlersInBoat);

    // Assign specific spots
    blueprint.specific.spots.forEach((spot) => {
      const sideNumber = spot.spot.side === SideEnum.Left ? 0 : 1;
      layout[(spot.spot.bench - 1) * 2 + sideNumber] = spot.paddler;
    });

    boatLayouts.push({
      spots: layout,
    });

    // Handle left, right, front, back seating
    if (!blueprint.direction.front.length) {
      console.log("a");
      const leftNameCombinations = TeamCalc.permutator(
        blueprint.direction.left.map((paddler) => paddler.name)
      );
      console.log("b");
      //   const rightNameCombinations = TeamCalc.permutator(
      //     blueprint.direction.right.map((paddler) => paddler.name)
      //   );

      const leftCombinations = leftNameCombinations.map((names) => {
        return names.map((name) => {
          return blueprint.direction.left.find(
            (paddler) => paddler.name === name
          );
        });
      });
      console.log(
        `names: ${leftNameCombinations[0]} - paddlers: ${leftCombinations[0]}`
      );

      console.log(
        `names: ${leftNameCombinations[1]} - paddlers: ${leftCombinations[1]}`
      );
      console.log(
        `names: ${leftNameCombinations[2]} - paddlers: ${leftCombinations[2]}`
      );
      // blueprint.direction.left.find(paddler => paddler.name === name))
    }

    return boatLayouts;
  }
}

export type LayoutRestrictions = {
  specific: {
    spots: { spot: Spot; paddler: Paddler }[];
    benches: { bench: number; paddler: Paddler }[];
  };
  direction: {
    left: Paddler[];
    right: Paddler[];
    front: Paddler[];
    back: Paddler[];
  };
};
