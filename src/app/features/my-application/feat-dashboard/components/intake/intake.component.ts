import { Component, Input } from '@angular/core';
import { CategoryIntake } from '../../interfaces/MacrosDetailedDTO';

@Component({
  selector: 'app-intake',
  templateUrl: './intake.component.html',
  styleUrls: ['./intake.component.scss'],
})
export class IntakeComponent {
  @Input() intakes!: CategoryIntake;

  isDetailType(intake: CategoryIntake): intake is {
    id: number;
    name: string;
    imgUrl: string;
    // categoryFood: string;
    quantity: number;
    unitOfMeasurement: string;
    // date: string;
  } {
    return (intake as any).id !== undefined;
  }

  isMessageType(intake: CategoryIntake): intake is { message: string } {
    return (intake as any).message !== undefined;
  }
  showId(id: number): void {
    console.log('El ID del alimento es:', id);
  }

  convertUnitOfMeasurement(unit: string): string {
    return unit.toLowerCase();
  }
}
