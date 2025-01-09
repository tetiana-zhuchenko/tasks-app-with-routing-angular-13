import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  userId = input<string>();
  message = input.required<string>();
  private userService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  userName = '';
  private destroyRef = inject(DestroyRef);
  // userName = computed(
  //   () => this.userService.users.find((u) => u.id === this.userId())?.name
  // );

  ngOnInit(): void {
    console.log('Input Data: ' + this.message());

    console.log(this.activatedRoute.snapshot);
    // this approach can be used when you need static data
    console.log(this.activatedRoute.snapshot.paramMap.get('userId'));

    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.userName =
          this.userService.users.find((u) => u.id === paramMap.get('userId'))
            ?.name || '';
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
