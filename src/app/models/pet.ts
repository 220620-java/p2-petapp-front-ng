import { SpecialNeed } from "./special-need";
import { Species } from "./species";
import { Status } from "./status";

export class Pet {
    // this makes a constructor that takes all of the fields,
    // but thanks to the question marks, they can also be
    // undefined so we can use this constructor with no arguments as well
    constructor(
        public id?: number,
        public name?: string,
        public age?: number,
        public species?: Species,
        public description?: string,
        public status?: Status,
        public needs?: SpecialNeed[]
    ) {}
}
