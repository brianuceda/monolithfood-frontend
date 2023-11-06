import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const circle = trigger('toggle', [
  state(
    'inactive',
    style({
      opacity: 0,
      transform: 'scale(0)',
    })
  ),
  state(
    'active',
    style({
      opacity: 1,
      transform: 'scale(1)',
    })
  ),
  transition('inactive <=> active', animate('0.5s ease')),
]);
