import {
  BoatLayout,
  Paddler,
  RaceRestrictions,
  SideEnum,
} from "../types/Types";

export class Boat {
  layout: BoatLayout;
  constructor(raceRestriction: RaceRestrictions) {
    this.layout = {
      spots: new Array<Paddler>(raceRestriction.paddlersInBoat),
    };
  }

  /////////////////////////////////////////
  // Public functions
  /////////////////////////////////////////
  public setLayout(layout: BoatLayout) {
    this.layout = layout;
  }

  public addPaddler(
    paddler: Paddler,
    bench = undefined,
    side: SideEnum = SideEnum.NoSide
  ) {
    if (!bench && side === SideEnum.NoSide) {
      this.addToFirstAvailableSpot(paddler);
    } else if (!bench) {
      this.addToFirstAvailableBench(paddler, side);
    } else if (side === SideEnum.NoSide) {
      this.addToFirstAvailableSide(paddler, bench);
    } else {
      const sideNumber = side === SideEnum.Left ? 0 : 1;
      this.layout.spots[(bench - 1) * 2 + sideNumber] = paddler;
    }
  }

  public printLayout() {
    console.log("-----BOAT LAYOUT-----");
    console.log("\tFRONT");
    for (let bench = 0; bench < this.layout.spots.length / 2; bench++) {
      console.log(
        `    ${this.layout.spots[bench * 2]?.name} - ${
          this.layout.spots[bench * 2 + 1]?.name
        }`
      );
    }
    console.log("\tBACK");
    console.log("-----END LAYOUT-----");
  }

  /////////////////////////////////////////
  // Private functions
  /////////////////////////////////////////
  private addToFirstAvailableSpot(paddler: Paddler): void {
    const freeSpot = this.layout.spots.findIndex((spot) => {
      spot.name === "";
    });
    this.setPaddler(paddler, freeSpot);
  }

  private addToFirstAvailableBench(paddler: Paddler, side: SideEnum): void {
    const sideNumber = side === SideEnum.Left ? 0 : 1;
    const freeSpot = this.layout.spots.findIndex((spot, idx) => {
      return idx % 2 === sideNumber && spot.name === "";
    });
    this.setPaddler(paddler, freeSpot);
  }

  private addToFirstAvailableSide(paddler: Paddler, bench: number): void {
    const benchToCheck = this.layout.spots.slice(
      (bench - 1) * 2,
      (bench - 1) * 2 + 2
    );
    const freeSpot = benchToCheck.findIndex((spot, idx) => {
      return spot.name === "";
    });
    this.setPaddler(paddler, (bench - 1) * 2 + freeSpot);
  }

  private setPaddler(paddler: Paddler, spot: number): void {
    if (spot === -1) {
      return;
    } else {
      this.layout.spots[spot] = paddler;
    }
  }
}
