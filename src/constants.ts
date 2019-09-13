import { IEventType } from './types';

const FI_LOCAL = {
  months: [
    'Tammikuu',
    'Helmikuu',
    'Maaliskuu',
    'Huhtikuu',
    'Toukokuu',
    'Kesäkuu',
    'Heinäkuu',
    'Elokuu',
    'Syyskuu',
    'Lokakuu',
    'Marraskuu',
    'Joulukuu',
  ],
  weekdaysLong: [
    'Sunnuntai',
    'Maanantai',
    'Tiistai',
    'Keskiviikko',
    'Torstai',
    'Perjantai',
    'Lauantai',
  ],
  weekdaysShort: ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'],
  firstDayOfWeek: 1,
  labels: {
    nextMonth: 'Seuraava kuu',
    previousMonth: 'Edellinen kuu',
  },
};

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
const PROFILE_PATH = '/profile';

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
  profile: PROFILE_PATH,
  profileSubscriptions: `${PROFILE_PATH}/subscriptions`,
  register: '/register',
  registerSuccess: '/registerSuccess',
};

export { FI_LOCAL, EVENT_TYPES, WEEK_DAYS, ROUTES, GRAPHQL_TYPES };
