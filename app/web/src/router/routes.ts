import { ThisPavementCracks, PageNotFound } from '@views'

const unauthenticatedRoutes: RouteRecordRaw[] = []

/**
 * Routes that only require the user to be authenticated and don't need any role check
 */
const authenticatedRoutes: RouteRecordRaw[] = []

const routes: RouteRecordRaw[] = [
  ...unauthenticatedRoutes,
  ...authenticatedRoutes,
  {
    path: '/',
    name: 'home',
    component: ThisPavementCracks,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'pageNotFound',
    component: PageNotFound,
  },
]

export default routes
