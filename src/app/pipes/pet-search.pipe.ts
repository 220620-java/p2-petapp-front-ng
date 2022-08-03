import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'petSearch' // this is the name of the pipe when you use it (i.e. pets | petSearch:searchText)
})
export class PetSearchPipe implements PipeTransform {

  // in a pipe, you need to implement the transform method.
  // the transform method takes in the value (and any additional parameters 
  // that you might want) and returns the filtered/formatted value.
  transform(pets: any[], searchText: string): any[] {
    let filteredPets: any[] = [];

    for (let pet of pets) {
      if (pet.name.toLowerCase().includes(searchText.toLowerCase())
        || pet.species.name.toLowerCase().includes(searchText.toLowerCase())
        || pet.description.toLowerCase().includes(searchText.toLowerCase())) {
        filteredPets.push(pet);
      }
    }

    return filteredPets;
  }

}
