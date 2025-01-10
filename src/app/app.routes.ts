import { inject } from '@angular/core';
import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';

import { routes as userRoutes } from './users/users.routes';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccesses = Math.random();
  if (shouldGetAccesses < 0.5) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  {
    path: '', // <your-domain>
    component: NoTaskComponent,
    // redirectTo: '/users/u1',
    // pathMatch: 'full',
    title: 'No tasks selected',
  },
  {
    path: 'users/:userId', // <your-domain>/users/<uid>
    component: UserTasksComponent,
    children: userRoutes,
    canMatch: [dummyCanMatch],
    data: {
      message: 'Hello!',
    },
    resolve: {
      userName: resolveUserName,
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
