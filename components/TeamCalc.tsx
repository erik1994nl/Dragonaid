import { Paddler } from "../types/Types";

export class TeamCalc {
  static getTotalWeight(team: Paddler[]) {
    return team.reduce((prevWeight, paddler) => {
      return prevWeight + paddler.weight;
    }, 0);
  }

  static permutator = (inputArr: string[]): string[][] => {
    let result: string[][] = [];

    const permute = (arr: string[], m = []) => {
      if (arr.length === 0) {
        result.push(m);
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next as any));
        }
      }
    };

    permute(inputArr);

    return result;
  };
}
