import { IEventType } from './types';

const EVENT_TYPES: IEventType[] = [
  {
    img: 'cycling',
    title: 'Pyöräily',
    type: 'Cycling',
  },
  {
    img: 'running',
    title: 'Juoksu',
    type: 'Running',
  },
  {
    img: 'orienteering',
    title: 'Suunnistus',
    type: 'Orienteering',
  },
  {
    img: 'track-running',
    title: 'Ratajuoksu',
    type: 'TrackRunning',
  },
  {
    img: 'spinning',
    title: 'Spinning',
    type: 'Spinning',
  },
  {
    img: 'triathlon',
    title: 'Triathlon',
    type: 'Triathlon',
  },
  {
    img: 'swimming',
    title: 'Uinti',
    type: 'Swimming',
  },
  {
    img: 'ultras',
    title: 'Ultras',
    type: 'Ultras',
  },
  {
    img: 'other',
    title: 'Muu',
    type: 'Other',
  },
  {
    img: 'skiing',
    title: 'Hiihto',
    type: 'Skiing',
  },
  {
    img: 'karonkka',
    title: 'Karonkka',
    type: 'Karonkka',
  },
  {
    img: 'meeting',
    title: 'Kokous',
    type: 'Meeting',
  },
];

const WEEK_DAYS = ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su'];

const EVENTS_PATH = '/events';

const GRAPHQL_TYPES = {
  LOCAL_USER: 'LocalUser',
};

const ROUTES = {
  createEvent: '/create-event',
  editEvent: `${EVENTS_PATH}/edit/:id`,
  event: `${EVENTS_PATH}/:id`,
  events: EVENTS_PATH,
  forgotPassword: '/forgot-password',
  home: '/',
  login: '/login',
  logout: '/logout',
  notFound: '/404',
  profile: '/profile',
  register: '/register',
};

export { EVENT_TYPES, WEEK_DAYS, ROUTES, GRAPHQL_TYPES };
